import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/session";
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
  if (params.store && !activeId) {
    const res = await getOrCreateConversationAction({
      storeSlug: params.store,
      initialMessage: params.message,
    });
    if (res.success && res.conversationId) {
      activeId = res.conversationId;
    }
  }

  const conversations = await getUserConversationsAction();

  return (
    <MessagesInboxView
      currentUserId={user.id}
      initialConversations={conversations}
      initialActiveId={activeId}
    />
  );
}
