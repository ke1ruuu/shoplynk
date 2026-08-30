"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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

const CHAT_CONVERSATIONS_COOKIE = "projectkita_chat_conversations";
const CHAT_MESSAGES_COOKIE = "projectkita_chat_messages";

/**
 * Helper to read stored conversations from cookies.
 */
async function getStoredConversations(): Promise<ConversationItem[]> {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get(CHAT_CONVERSATIONS_COOKIE)?.value;
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed to read chat conversations cookie:", e);
  }
  return [];
}

/**
 * Helper to persist conversations into cookies.
 */
async function saveStoredConversations(convs: ConversationItem[]) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(CHAT_CONVERSATIONS_COOKIE, JSON.stringify(convs.slice(0, 50)), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    });
  } catch (e) {
    console.warn("Failed to write chat conversations cookie:", e);
  }
}

/**
 * Helper to read stored messages for a conversation from cookies.
 */
async function getStoredMessages(conversationId?: string): Promise<ChatMessage[]> {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get(CHAT_MESSAGES_COOKIE)?.value;
    if (raw) {
      const all: ChatMessage[] = JSON.parse(raw);
      if (conversationId) {
        return all.filter((m) => m.conversation_id === conversationId);
      }
      return all;
    }
  } catch (e) {
    console.warn("Failed to read chat messages cookie:", e);
  }
  return [];
}

/**
 * Helper to append a message to stored messages cookie.
 */
async function saveStoredMessage(msg: ChatMessage) {
  try {
    const cookieStore = await cookies();
    const all = await getStoredMessages();
    const updated = [...all, msg].slice(-100); // keep last 100 messages
    cookieStore.set(CHAT_MESSAGES_COOKIE, JSON.stringify(updated), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  } catch (e) {
    console.warn("Failed to write chat messages cookie:", e);
  }
}

/**
 * Get or create a conversation thread with a store.
 */
export async function getOrCreateConversationAction({
  storeId,
  storeSlug,
  initialMessage,
}: {
  storeId?: string;
  storeSlug?: string;
  initialMessage?: string;
}): Promise<{ success: boolean; conversationId?: string; error?: string }> {
  const { user, profile } = await getCurrentUserProfile();
  if (!user) {
    return { success: false, error: "Unauthorized. Please log in first." };
  }

  const supabase = await createClient();

  // 1. Fetch store info from Supabase
  let store: any = null;
  if (storeSlug) {
    const { data } = await supabase
      .from("stores")
      .select("id, name, slug, logo_url, pickup_locations, user_id")
      .eq("slug", storeSlug)
      .single();
    store = data;
  } else if (storeId) {
    const { data } = await supabase
      .from("stores")
      .select("id, name, slug, logo_url, pickup_locations, user_id")
      .eq("id", storeId)
      .single();
    store = data;
  }

  // Fallback: look up in all stores if not found by exact ID/slug
  if (!store) {
    const { data: allStores } = await supabase
      .from("stores")
      .select("id, name, slug, logo_url, pickup_locations, user_id")
      .limit(5);
    store = allStores?.[0] || {
      id: storeId || "campus-store",
      name: "Campus Store",
      slug: storeSlug || "campus-store",
      logo_url: null,
      pickup_locations: "Main Canteen Handoff",
      user_id: "seller-id",
    };
  }

  const targetStoreId = store.id;
  const targetSellerId = store.user_id || "seller-id";

  // Check if conversation already exists in stored conversations
  const existingList = await getStoredConversations();
  let existing = existingList.find(
    (c) => c.buyer_id === user.id && c.store_id === targetStoreId
  );

  let conversationId = existing?.id;
  const now = new Date().toISOString();

  if (!conversationId) {
    conversationId = `conv-${user.id.substring(0, 6)}-${targetStoreId.substring(0, 6)}`;
    const newConv: ConversationItem = {
      id: conversationId,
      buyer_id: user.id,
      seller_id: targetSellerId,
      store_id: targetStoreId,
      last_message_at: now,
      created_at: now,
      store: {
        id: targetStoreId,
        name: store.name,
        slug: store.slug,
        logo_url: store.logo_url,
        pickup_locations: store.pickup_locations,
      },
      buyer: {
        id: user.id,
        full_name: profile?.full_name || "Student Buyer",
        avatar_url: profile?.avatar_url || null,
      },
      seller: {
        id: targetSellerId,
        full_name: `${store.name} Owner`,
        avatar_url: null,
      },
      latest_message: initialMessage
        ? {
            id: `msg-${Date.now()}`,
            content: initialMessage.trim(),
            sender_id: user.id,
            created_at: now,
            is_read: false,
          }
        : null,
      unread_count: 0,
    };

    existingList.unshift(newConv);
    await saveStoredConversations(existingList);
  }

  // If initial message provided, save it
  if (initialMessage && initialMessage.trim()) {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: user.id,
      content: initialMessage.trim(),
      is_read: false,
      created_at: now,
    };
    await saveStoredMessage(newMsg);

    // Update conversation last_message_at
    const updatedList = existingList.map((c) =>
      c.id === conversationId
        ? {
            ...c,
            last_message_at: now,
            latest_message: newMsg,
          }
        : c
    );
    await saveStoredConversations(updatedList);
  }

  revalidatePath("/protected/messages");
  return { success: true, conversationId };
}

/**
 * Send a chat message within a conversation.
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

  const now = new Date().toISOString();
  const newMsg: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    conversation_id: conversationId,
    sender_id: user.id,
    content: trimmed,
    is_read: false,
    created_at: now,
  };

  // 1. Save to persistent message store
  await saveStoredMessage(newMsg);

  // 2. Update conversation thread
  const convs = await getStoredConversations();
  const updatedConvs = convs.map((c) => {
    if (c.id === conversationId) {
      return {
        ...c,
        last_message_at: now,
        latest_message: newMsg,
      };
    }
    return c;
  });
  await saveStoredConversations(updatedConvs);

  revalidatePath("/protected/messages");
  return { success: true, message: newMsg };
}

/**
 * Fetch messages for a specific conversation.
 */
export async function getConversationMessagesAction(
  conversationId: string
): Promise<ChatMessage[]> {
  return await getStoredMessages(conversationId);
}

/**
 * Mark messages in a conversation as read.
 */
export async function markMessagesAsReadAction(
  conversationId: string
): Promise<{ success: boolean }> {
  const convs = await getStoredConversations();
  const updated = convs.map((c) =>
    c.id === conversationId ? { ...c, unread_count: 0 } : c
  );
  await saveStoredConversations(updated);
  revalidatePath("/protected/messages");
  return { success: true };
}

/**
 * Get all conversations for current user.
 * Automatically synchronizes and discovers stores the user has placed orders from.
 */
export async function getUserConversationsAction(): Promise<ConversationItem[]> {
  const { user, profile } = await getCurrentUserProfile();
  if (!user) return [];

  const supabase = await createClient();

  // 1. Fetch user's orders from Supabase DB to find all stores ordered from
  const { data: dbOrders } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      store_id,
      status,
      created_at,
      store:stores (id, name, slug, logo_url, pickup_locations, user_id)
    `)
    .eq("buyer_id", user.id);

  // 2. Read session cookie orders as well
  let cookieOrders: any[] = [];
  try {
    const cookieStore = await cookies();
    const cookiePlaced = cookieStore.get("projectkita_placed_orders")?.value;
    if (cookiePlaced) {
      cookieOrders = JSON.parse(cookiePlaced);
    }
  } catch (e) {
    console.warn("Failed to read cookie orders in getUserConversationsAction:", e);
  }

  // 3. Fetch all stores from Supabase to match cookie orders & enrich data
  const { data: rawStores } = await supabase
    .from("stores")
    .select("id, name, slug, logo_url, pickup_locations, user_id");
  const allDbStores: any[] = rawStores || [];

  const existingConvs = await getStoredConversations();
  const allMessages = await getStoredMessages();

  // Map of stores where buyer has active or historical orders
  const orderedStoresMap = new Map<
    string,
    {
      store: any;
      orderNumber: string;
      createdAt: string;
    }
  >();

  // Add DB orders
  (dbOrders || []).forEach((o: any) => {
    const s = Array.isArray(o.store) ? o.store[0] : o.store;
    if (s?.id) {
      orderedStoresMap.set(s.id, {
        store: s,
        orderNumber: o.order_number,
        createdAt: o.created_at,
      });
    }
  });

  // Add Cookie orders
  cookieOrders.forEach((co: any) => {
    const matchedStore = allDbStores.find(
      (s) => s.id === co.store_id || s.name === co.storeName
    );
    const storeId = matchedStore?.id || co.store_id || "campus-store";
    if (!orderedStoresMap.has(storeId)) {
      orderedStoresMap.set(storeId, {
        store: matchedStore || {
          id: storeId,
          name: co.storeName || "Campus Store",
          slug: "campus-store",
          logo_url: null,
          pickup_locations: co.pickupLocation || "Main Canteen Handoff Area",
          user_id: "seller-id",
        },
        orderNumber: co.order_number || "Active Order",
        createdAt: co.created_at || new Date().toISOString(),
      });
    }
  });

  // If user has NO orders yet, also make sure standard campus stores are reachable
  if (orderedStoresMap.size === 0 && allDbStores.length > 0) {
    allDbStores.slice(0, 2).forEach((s) => {
      orderedStoresMap.set(s.id, {
        store: s,
        orderNumber: "Inquiry",
        createdAt: new Date().toISOString(),
      });
    });
  }

  // 4. Ensure conversation threads exist for every ordered store
  const mergedConversations: ConversationItem[] = [...existingConvs];

  for (const [storeId, info] of orderedStoresMap.entries()) {
    let conv = mergedConversations.find(
      (c) => c.buyer_id === user.id && (c.store_id === storeId || c.store.name === info.store.name)
    );

    if (!conv) {
      const convId = `conv-${user.id.substring(0, 6)}-${storeId.substring(0, 6)}`;
      const now = info.createdAt || new Date().toISOString();
      const defaultOrderMsg: ChatMessage = {
        id: `msg-order-${info.orderNumber}`,
        conversation_id: convId,
        sender_id: user.id,
        content: `Order #${info.orderNumber} placed. Ready to coordinate pickup!`,
        is_read: false,
        created_at: now,
      };

      conv = {
        id: convId,
        buyer_id: user.id,
        seller_id: info.store.user_id || "seller-id",
        store_id: storeId,
        last_message_at: now,
        created_at: now,
        store: {
          id: storeId,
          name: info.store.name,
          slug: info.store.slug || "store",
          logo_url: info.store.logo_url,
          pickup_locations: info.store.pickup_locations,
        },
        buyer: {
          id: user.id,
          full_name: profile?.full_name || "Student Buyer",
          avatar_url: profile?.avatar_url || null,
        },
        seller: {
          id: info.store.user_id || "seller-id",
          full_name: `${info.store.name} Owner`,
          avatar_url: null,
        },
        latest_message: defaultOrderMsg,
        unread_count: 0,
      };

      mergedConversations.unshift(conv);

      // Save initial order message to message store if not already saved
      if (!allMessages.some((m) => m.conversation_id === convId)) {
        await saveStoredMessage(defaultOrderMsg);
      }
    }
  }

  // Enrich conversations with actual latest message & unread count
  const finalConversations = mergedConversations.map((c) => {
    const threadMessages = allMessages.filter((m) => m.conversation_id === c.id);
    const sorted = [...threadMessages].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const latest = sorted[0] || c.latest_message || null;
    const unread = threadMessages.filter(
      (m) => m.sender_id !== user.id && !m.is_read
    ).length;

    return {
      ...c,
      latest_message: latest,
      unread_count: unread,
      last_message_at: latest?.created_at || c.last_message_at,
    };
  });

  // Sort by last message timestamp descending
  finalConversations.sort(
    (a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
  );

  await saveStoredConversations(finalConversations);
  return finalConversations;
}
