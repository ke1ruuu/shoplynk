import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import {
  getUserConversationsAction,
  getOrCreateConversationAction,
} from "@/app/actions/messages";
import { MessagesInboxView } from "@/components/messages/messages-inbox-view";

export const metadata: Metadata = {
  title: "Messages — Project Kita",
  description: "Direct real-time communication between campus buyers and student merchants.",
};

interface MessagesPageProps {
  searchParams: Promise<{
    store?: string;
    conversation?: string;
    message?: string;
  }>;
}

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
  const { user } = await getCurrentUserProfile();
  if (!user) {
    redirect("/login?next=/protected/messages");
  }

  const params = await searchParams;
  let activeId = params.conversation;

  // If user arrived with ?store=[slug], get or create conversation with that store
  let targetStore: any = null;
  if (params.store && !activeId) {
    const res = await getOrCreateConversationAction({
      storeSlug: params.store,
      storeName: params.store,
    });
    if (res.success && res.conversationId) {
      activeId = res.conversationId;
    }
  }

  let conversations = await getUserConversationsAction();

  // If activeId was determined but conversations array doesn't include it (e.g. brand new thread with no messages yet)
  if (params.store && (!activeId || !conversations.some((c) => c.id === activeId || c.store.slug === params.store))) {
    const supabase = await createClient();
    const { data: storeData } = await supabase
      .from("stores")
      .select("id, name, slug, logo_url, pickup_locations, user_id")
      .or(`slug.eq.${params.store},name.ilike.%${params.store}%`)
      .maybeSingle();

    if (storeData) {
      const syntheticId = activeId || `temp-conv-${storeData.id}`;
      const newConvItem = {
        id: syntheticId,
        buyer_id: user.id,
        seller_id: storeData.user_id || user.id,
        store_id: storeData.id,
        last_message_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        store: {
          id: storeData.id,
          name: storeData.name,
          slug: storeData.slug,
          logo_url: storeData.logo_url || null,
          pickup_locations: storeData.pickup_locations || null,
        },
        buyer: {
          id: user.id,
          full_name: user.full_name || "Student Buyer",
          avatar_url: (user as any).avatar_url || null,
        },
        seller: {
          id: storeData.user_id || "seller",
          full_name: `${storeData.name} Owner`,
          avatar_url: null,
        },
        unread_count: 0,
      };

      conversations = [newConvItem, ...conversations];
      if (!activeId) {
        activeId = syntheticId;
      }
    }
  }

  return (
    <MessagesInboxView
      currentUserId={user.id}
      initialConversations={conversations}
      initialActiveId={activeId}
      prefillMessage={params.message}
    />
  );
}
