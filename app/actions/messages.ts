"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";

export interface ConversationItem {
  id: string;
  buyer_id: string;
  seller_id: string;
  store_id: string;
  last_message_at: string;
  created_at: string;
  store: {
    id: string;
    name: string;
    slug: string;
    logo_url: string | null;
    pickup_locations?: string | null;
  };
  buyer: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
  seller: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
  latest_message?: {
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
    is_read: boolean;
  } | null;
  unread_count: number;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

/**
 * Get or create a conversation thread with a store in remote Supabase database.
 * Supports flexible store lookup by storeId (UUID), storeSlug, or storeName.
 */
export async function getOrCreateConversationAction({
  storeId,
  storeSlug,
  storeName,
}: {
  storeId?: string;
  storeSlug?: string;
  storeName?: string;
}): Promise<{ success: boolean; conversationId?: string; error?: string }> {
  const { user } = await getCurrentUserProfile();
  if (!user) {
    return { success: false, error: "Unauthorized. Please log in first." };
  }

  const supabase = await createClient();

  // 1. Fetch all stores to perform resilient matching
  const { data: allStores } = await supabase
    .from("stores")
    .select("id, name, slug, user_id, logo_url, pickup_locations");

  const storesList = allStores || [];

  let store: any = null;

  // Try matching by storeId
  if (storeId) {
    store = storesList.find((s) => s.id === storeId);
  }

  // Try matching by storeSlug
  if (!store && storeSlug) {
    const cleanSlug = storeSlug.toLowerCase().trim();
    store = storesList.find(
      (s) =>
        s.slug === cleanSlug ||
        s.slug.startsWith(cleanSlug) ||
        cleanSlug.startsWith(s.slug) ||
        s.slug.replace(/-[a-z0-9]+$/, "") === cleanSlug
    );
  }

  // Try matching by storeName
  if (!store && storeName) {
    const cleanName = storeName.toLowerCase().trim();
    store = storesList.find(
      (s) =>
        s.name.toLowerCase() === cleanName ||
        s.name.toLowerCase().includes(cleanName) ||
        cleanName.includes(s.name.toLowerCase())
    );
  }

  // Fallback to first store if none matched
  if (!store && storesList.length > 0) {
    store = storesList[0];
  }

  if (!store) {
    return { success: false, error: "Store not found." };
  }

  const targetStoreId = store.id;
  let targetSellerId = store.user_id;

  // Verify seller_id is valid profile or find a valid profile
  if (!targetSellerId) {
    const { data: fallbackProfile } = await supabase
      .from("profiles")
      .select("id")
      .limit(1)
      .single();
    targetSellerId = fallbackProfile?.id || user.id;
  }

  const now = new Date().toISOString();
  let conversationId: string | undefined;

  // 2. Check for existing conversation in Supabase
  const { data: existing } = await supabase
    .from("conversations")
    .select("id")
    .eq("buyer_id", user.id)
    .eq("store_id", targetStoreId)
    .maybeSingle();

  if (existing?.id) {
    conversationId = existing.id;
  } else {
    // 3. Upsert conversation in Supabase
    const { data: newConv, error: upsertErr } = await supabase
      .from("conversations")
      .upsert(
        {
          buyer_id: user.id,
          seller_id: targetSellerId,
          store_id: targetStoreId,
          last_message_at: now,
          updated_at: now,
        },
        { onConflict: "buyer_id,store_id" }
      )
      .select("id")
      .maybeSingle();

    if (newConv?.id) {
      conversationId = newConv.id;
    } else {
      // Refetch if select failed on upsert
      const { data: refetched } = await supabase
        .from("conversations")
        .select("id")
        .eq("buyer_id", user.id)
        .eq("store_id", targetStoreId)
        .maybeSingle();

      conversationId = refetched?.id;
    }
  }

  if (!conversationId) {
    console.warn("Could not determine conversation ID, checking existing list");
    const { data: allUserConvs } = await supabase
      .from("conversations")
      .select("id")
      .eq("buyer_id", user.id)
      .limit(1);
    conversationId = allUserConvs?.[0]?.id;
  }

  return { success: true, conversationId };
}

/**
 * Delete a conversation and all its messages from Supabase.
 */
export async function deleteConversationAction(
  conversationId: string
): Promise<{ success: boolean; error?: string }> {
  const { user } = await getCurrentUserProfile();
  if (!user) return { success: false, error: "Unauthorized." };

  const supabase = await createClient();

  // Delete messages first (cascade should handle this, but be explicit)
  await supabase
    .from("messages")
    .delete()
    .eq("conversation_id", conversationId);

  // Delete conversation
  const { error } = await supabase
    .from("conversations")
    .delete()
    .eq("id", conversationId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Send a chat message within a conversation in Supabase.
 */
export async function sendMessageAction({
  conversationId,
  content,
}: {
  conversationId: string;
  content: string;
}): Promise<{ success: boolean; message?: ChatMessage; error?: string }> {
  const { user } = await getCurrentUserProfile();
  if (!user) {
    return { success: false, error: "Unauthorized. Please log in first." };
  }

  const trimmed = content.trim();
  if (!trimmed) {
    return { success: false, error: "Message content cannot be empty." };
  }

  const supabase = await createClient();

  // 1. Verify user is a participant in this conversation
  const { data: conv, error: convError } = await supabase
    .from("conversations")
    .select("id, buyer_id, seller_id")
    .eq("id", conversationId)
    .single();

  if (convError || !conv) {
    return { success: false, error: "Conversation not found." };
  }

  if (conv.buyer_id !== user.id && conv.seller_id !== user.id) {
    return { success: false, error: "Unauthorized. You are not a participant in this conversation." };
  }

  const now = new Date().toISOString();

  // 2. Insert message into Supabase messages table
  const { data: newMsg, error: msgError } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content: trimmed,
      is_read: false,
      created_at: now,
    })
    .select("id, conversation_id, sender_id, content, is_read, created_at")
    .single();

  if (msgError || !newMsg) {
    return { success: false, error: msgError?.message || "Failed to send message." };
  }

  // 3. Update conversation last_message_at and updated_at
  await supabase
    .from("conversations")
    .update({ last_message_at: now, updated_at: now })
    .eq("id", conversationId);

  return { success: true, message: newMsg as ChatMessage };
}

/**
 * Fetch messages for a specific conversation from Supabase.
 */
export async function getConversationMessagesAction(
  conversationId: string
): Promise<ChatMessage[]> {
  const { user } = await getCurrentUserProfile();
  if (!user) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("messages")
    .select("id, conversation_id, sender_id, content, is_read, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data as ChatMessage[];
}

/**
 * Mark messages in a conversation as read in Supabase.
 */
export async function markMessagesAsReadAction(
  conversationId: string
): Promise<{ success: boolean }> {
  const { user } = await getCurrentUserProfile();
  if (!user) return { success: false };

  const supabase = await createClient();

  await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("conversation_id", conversationId)
    .neq("sender_id", user.id)
    .eq("is_read", false);

  return { success: true };
}

/**
 * Get all conversations for current user from Supabase.
 * Automatically checks and ensures any store with placed orders has a conversation thread.
 */
export async function getUserConversationsAction(): Promise<ConversationItem[]> {
  const { user } = await getCurrentUserProfile();
  if (!user) return [];

  const supabase = await createClient();

  // 1. Fetch all stores
  const { data: allStores } = await supabase
    .from("stores")
    .select("id, name, slug, logo_url, pickup_locations, user_id");

  const storeMap = new Map((allStores || []).map((s) => [s.id, s]));

  // 2. Fetch user orders to ensure conversation threads exist for all stores ordered from
  const { data: userOrders } = await supabase
    .from("orders")
    .select("id, order_number, store_id, created_at")
    .eq("buyer_id", user.id);

  if (userOrders && userOrders.length > 0) {
    for (const order of userOrders) {
      const store = storeMap.get(order.store_id);
      if (store?.id && store?.user_id) {
        const { data: existing } = await supabase
          .from("conversations")
          .select("id")
          .eq("buyer_id", user.id)
          .eq("store_id", store.id)
          .maybeSingle();

        if (!existing) {
          const now = order.created_at || new Date().toISOString();
          await supabase
            .from("conversations")
            .upsert(
              {
                buyer_id: user.id,
                seller_id: store.user_id,
                store_id: store.id,
                last_message_at: now,
                updated_at: now,
              },
              { onConflict: "buyer_id,store_id" }
            )
            .select("id")
            .maybeSingle();
        }
      }
    }
  }

  // 3. Fetch all conversations participated in by current user from Supabase
  const { data: convRows, error: convError } = await supabase
    .from("conversations")
    .select("id, buyer_id, seller_id, store_id, last_message_at, created_at")
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    .order("last_message_at", { ascending: false });

  if (convError || !convRows || convRows.length === 0) {
    return [];
  }

  // 4. Fetch all related profiles
  const profileIds = new Set<string>();
  convRows.forEach((c) => {
    if (c.buyer_id) profileIds.add(c.buyer_id);
    if (c.seller_id) profileIds.add(c.seller_id);
  });

  const { data: profileRows } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url")
    .in("id", Array.from(profileIds));

  const profileMap = new Map((profileRows || []).map((p) => [p.id, p]));

  // 5. Fetch all messages for these conversations
  const convIds = convRows.map((c) => c.id);
  const { data: messageRows } = await supabase
    .from("messages")
    .select("id, conversation_id, sender_id, content, is_read, created_at")
    .in("conversation_id", convIds)
    .order("created_at", { ascending: false });

  const messagesByConv = new Map<string, any[]>();
  (messageRows || []).forEach((m) => {
    if (!messagesByConv.has(m.conversation_id)) {
      messagesByConv.set(m.conversation_id, []);
    }
    messagesByConv.get(m.conversation_id)!.push(m);
  });

  // 6. Map and enrich conversations with store, buyer, seller, latest message, and unread counts
  return convRows.map((item) => {
    const store = storeMap.get(item.store_id) || {
      id: item.store_id,
      name: "Campus Store",
      slug: "store",
      logo_url: null,
      pickup_locations: "Main Canteen Handoff Area",
    };
    const buyer = profileMap.get(item.buyer_id) || {
      id: item.buyer_id,
      full_name: "Student Buyer",
      avatar_url: null,
    };
    const seller = profileMap.get(item.seller_id) || {
      id: item.seller_id,
      full_name: `${store.name} Owner`,
      avatar_url: null,
    };

    const convMessages = messagesByConv.get(item.id) || [];
    const latest = convMessages[0] || null;
    const unreadCount = convMessages.filter(
      (m) => m.sender_id !== user.id && !m.is_read
    ).length;

    return {
      id: item.id,
      buyer_id: item.buyer_id,
      seller_id: item.seller_id,
      store_id: item.store_id,
      last_message_at: item.last_message_at,
      created_at: item.created_at,
      store,
      buyer,
      seller,
      latest_message: latest,
      unread_count: unreadCount,
    };
  });
}
