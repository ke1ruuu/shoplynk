"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Search,
  Send,
  Store,
  User,
  ShieldCheck,
  Clock,
  Check,
  CheckCheck,
  ArrowLeft,
  ShoppingBag,
  RefreshCw,
  Sparkles,
  ExternalLink,
  MoreVertical,
  Trash2,
  Archive,
  VolumeX,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  ConversationItem,
  ChatMessage,
  sendMessageAction,
  markMessagesAsReadAction,
  getConversationMessagesAction,
  deleteConversationAction,
} from "@/app/actions/messages";

interface MessagesInboxViewProps {
  currentUserId: string;
  initialConversations: ConversationItem[];
  initialActiveId?: string;
  prefillMessage?: string;
}

const QUICK_PROMPTS = [
  "Hi! Is this item still available?",
  "When is your next canteen drop-off?",
  "Can I pay via GCash upon pickup?",
  "Can I request a custom order variation?",
];

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) {
    return d.toLocaleTimeString("en-PH", { hour: "numeric", minute: "2-digit" });
  }
  return d.toLocaleDateString("en-PH", { month: "short", day: "numeric" });
}

const MessageBubble = React.memo(function MessageBubble({
  msg,
  isMine,
}: {
  msg: ChatMessage;
  isMine: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1 max-w-[80%] ${
        isMine ? "self-end items-end" : "self-start items-start"
      }`}
    >
      <div
        className={`p-3.5 text-xs leading-relaxed ${
          isMine
            ? "bg-kita-green text-white rounded-2xl rounded-br-xs shadow-xs"
            : "bg-surface text-ink border border-line rounded-2xl rounded-bl-xs shadow-xs"
        }`}
      >
        {msg.content}
      </div>

      <div className="flex items-center gap-1 px-1 text-xs text-muted font-mono">
        <span>{formatTime(msg.created_at)}</span>
        {isMine && (
          <span className="ml-0.5">
            {msg.is_read ? (
              <CheckCheck className="h-3 w-3 text-kita-green" />
            ) : (
              <Check className="h-3 w-3 text-muted" />
            )}
          </span>
        )}
      </div>
    </div>
  );
});

export function MessagesInboxView({
  currentUserId,
  initialConversations,
  initialActiveId,
  prefillMessage,
}: MessagesInboxViewProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [conversations, setConversations] = useState<ConversationItem[]>(initialConversations);
  const [activeId, setActiveId] = useState<string>(
    initialActiveId || initialConversations[0]?.id || ""
  );
  const [filterType, setFilterType] = useState<"all" | "buyer" | "seller" | "unread">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState(prefillMessage || "");
  const [isSending, setIsSending] = useState(false);
  const [threadMenuId, setThreadMenuId] = useState<string | null>(null);
  const threadMenuRef = useRef<HTMLDivElement>(null);

  // Active conversation object
  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeId) || conversations[0] || null;
  }, [conversations, activeId]);

  // Messages in active conversation
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Fetch messages for active conversation
  useEffect(() => {
    if (!activeConversation) {
      setMessages([]);
      return;
    }

    let isMounted = true;
    async function loadThread() {
      setLoadingMessages(true);

      const fetchedMessages = await getConversationMessagesAction(activeConversation?.id || "");
      if (isMounted) {
        setMessages(
          fetchedMessages && fetchedMessages.length > 0
            ? fetchedMessages
            : activeConversation?.latest_message
            ? [
                {
                  id: activeConversation.latest_message.id,
                  conversation_id: activeConversation.id,
                  sender_id: activeConversation.latest_message.sender_id,
                  content: activeConversation.latest_message.content,
                  is_read: activeConversation.latest_message.is_read,
                  created_at: activeConversation.latest_message.created_at,
                },
              ]
            : []
        );
        setLoadingMessages(false);
        setTimeout(scrollToBottom, 50);
      }

      // Mark as read in background
      if (activeConversation?.id) {
        await markMessagesAsReadAction(activeConversation.id);
        setConversations((prev) =>
          prev.map((c) => (c.id === activeConversation.id ? { ...c, unread_count: 0 } : c))
        );
      }
    }

    loadThread();

    return () => {
      isMounted = false;
    };
  }, [activeConversation?.id, supabase]);

  // 2. Supabase Realtime Channel Subscription (Broadcast + Postgres Changes)
  useEffect(() => {
    if (!activeConversation?.id) return;

    const channel = supabase.channel(`chat_room_${activeConversation.id}`);

    channel
      .on("broadcast", { event: "new_message" }, (payload) => {
        const newMsg = payload.payload as ChatMessage;
        if (newMsg && newMsg.conversation_id === activeConversation.id) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          setTimeout(scrollToBottom, 50);
        }
      })
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeConversation.id}`,
        },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          setTimeout(scrollToBottom, 50);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeConversation?.id, supabase]);

  // Close thread menu on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (threadMenuRef.current && !threadMenuRef.current.contains(e.target as Node)) {
        setThreadMenuId(null);
      }
    }
    if (threadMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [threadMenuId]);

  // Handle deleting a conversation thread
  async function handleDeleteThread(convId: string) {
    setThreadMenuId(null);
    const res = await deleteConversationAction(convId);
    if (res.success) {
      setConversations((prev) => prev.filter((c) => c.id !== convId));
      if (activeId === convId) {
        const remaining = conversations.filter((c) => c.id !== convId);
        setActiveId(remaining[0]?.id || "");
      }
    }
  }

  // Handle message sending
  async function handleSendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConversation || isSending) return;

    const textToSend = inputText.trim();
    setInputText("");
    setIsSending(true);

    // Optimistic message update
    const tempId = `temp-${Date.now()}`;
    const optimisticMsg: ChatMessage = {
      id: tempId,
      conversation_id: activeConversation.id,
      sender_id: currentUserId,
      content: textToSend,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setTimeout(scrollToBottom, 20);

    // Update conversation in thread list immediately
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              last_message_at: optimisticMsg.created_at,
              latest_message: optimisticMsg,
            }
          : c
      )
    );

    // Broadcast over Supabase Realtime Channel
    try {
      const channel = supabase.channel(`chat_room_${activeConversation.id}`);
      channel.send({
        type: "broadcast",
        event: "new_message",
        payload: optimisticMsg,
      });
    } catch (broadcastErr) {
      console.warn("Realtime broadcast notice:", broadcastErr);
    }

    const res = await sendMessageAction({
      conversationId: activeConversation.id,
      content: textToSend,
    });

    if (res.success && res.message) {
      // Replace optimistic message with actual server message
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? (res.message as ChatMessage) : m))
      );
    }
    setIsSending(false);
  }

  // Filter conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      // Type filter
      if (filterType === "buyer" && c.buyer_id !== currentUserId) return false;
      if (filterType === "seller" && c.seller_id !== currentUserId) return false;
      if (filterType === "unread" && c.unread_count === 0) return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const counterpartName =
        c.buyer_id === currentUserId ? c.store.name : c.buyer.full_name;
      return (
        counterpartName.toLowerCase().includes(q) ||
        (c.latest_message?.content || "").toLowerCase().includes(q)
      );
    });
  }, [conversations, filterType, searchQuery, currentUserId]);

  const isCurrentBuyer = activeConversation?.buyer_id === currentUserId;
  const counterpartName = isCurrentBuyer
    ? activeConversation?.store.name
    : activeConversation?.buyer.full_name;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 flex flex-col gap-6">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-kita-green transition-colors group cursor-pointer focus:outline-none"
            aria-label="Back"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back</span>
          </button>
          <span className="text-muted">/</span>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-kita-green" />
            <h1 className="font-display text-lg sm:text-xl font-extrabold text-ink">
              Campus Messages
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2" />
      </div>

      {/* 2. Split Screen Messaging Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px] rounded-2xl border border-line bg-surface overflow-hidden shadow-xs">
        {/* Left Thread Stream (5 Cols) */}
        <aside className="lg:col-span-5 flex flex-col border-r border-line bg-paper/30 h-full overflow-hidden">
          {/* Top Search & Controls */}
          <div className="flex flex-col gap-3 p-4 border-b border-line bg-surface">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="h-9 w-full rounded-xl bg-paper border border-line pl-8 pr-3 text-xs text-ink placeholder:text-muted focus:bg-surface focus:outline-none focus:border-kita-green transition-colors"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none text-xs font-bold">
              {[
                { id: "all", label: "All" },
                { id: "buyer", label: "Buying" },
                { id: "seller", label: "Selling" },
                { id: "unread", label: "Unread" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterType(tab.id as typeof filterType)}
                  className={`rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
                    filterType === tab.id
                      ? "bg-ink text-white shadow-xs"
                      : "text-muted hover:text-ink hover:bg-paper"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Threads List */}
          <div className="flex-1 overflow-y-auto divide-y divide-line">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 p-8 text-center text-muted">
                <MessageSquare className="h-6 w-6 text-muted/50" />
                <span className="text-xs font-bold">No message threads found</span>
                <span className="text-xs">
                  Start a conversation by visiting any store on campus!
                </span>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === activeId;
                const isBuyer = conv.buyer_id === currentUserId;
                const name = isBuyer ? conv.store.name : conv.buyer.full_name;
                const hasUnread = conv.unread_count > 0;

                return (
                  <div
                    key={conv.id}
                    className={`relative w-full flex items-start gap-3 p-4 text-left transition-all group ${
                      isSelected
                        ? "bg-kita-green-soft/60 ring-1 ring-kita-green/30"
                        : "hover:bg-paper bg-surface"
                    }`}
                  >
                    {/* Clickable Area */}
                    <button
                      type="button"
                      onClick={() => setActiveId(conv.id)}
                      className="absolute inset-0 z-0 cursor-pointer"
                      aria-label={`Open conversation with ${name}`}
                    />

                    {/* Avatar */}
                    <div className="relative h-10 w-10 rounded-full bg-paper-deep border border-line flex items-center justify-center flex-shrink-0 overflow-hidden z-[1]">
                      {isBuyer && conv.store.logo_url ? (
                        <Image
                          src={conv.store.logo_url}
                          alt={name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="font-display font-extrabold text-xs text-ink">
                          {name.charAt(0).toUpperCase()}
                        </span>
                      )}
                      {isBuyer && (
                        <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-kita-green p-0.5 text-white">
                          <Store className="h-2.5 w-2.5" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1 z-[1]">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-display text-xs font-bold text-ink truncate">
                          {name}
                        </span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="font-mono text-xs text-muted">
                            {conv.latest_message
                              ? formatTime(conv.latest_message.created_at)
                              : ""}
                          </span>

                          {/* Three-dots Menu Trigger */}
                          <div className="relative" ref={threadMenuId === conv.id ? threadMenuRef : undefined}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setThreadMenuId(threadMenuId === conv.id ? null : conv.id);
                              }}
                              className="p-0.5 rounded-md text-muted opacity-0 group-hover:opacity-100 hover:text-ink hover:bg-paper transition-all cursor-pointer z-[2] relative"
                              aria-label="Thread options"
                            >
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>

                            {threadMenuId === conv.id && (
                              <div className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-line bg-surface shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setThreadMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted hover:text-ink hover:bg-paper transition-colors cursor-pointer"
                                >
                                  <Archive className="h-3.5 w-3.5" />
                                  <span>Archive</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setThreadMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted hover:text-ink hover:bg-paper transition-colors cursor-pointer"
                                >
                                  <VolumeX className="h-3.5 w-3.5" />
                                  <span>Mute</span>
                                </button>
                                <div className="border-t border-line my-1" />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteThread(conv.id);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span>Delete Thread</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-xs truncate ${
                            hasUnread
                              ? "font-bold text-ink"
                              : "text-muted font-normal"
                          }`}
                        >
                          {conv.latest_message?.content || "Start a conversation"}
                        </p>

                        {hasUnread && (
                          <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-kita-green px-1 text-xs font-bold text-white font-mono flex-shrink-0">
                            {conv.unread_count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Right Chat Stream (7 Cols) */}
        <main className="lg:col-span-7 flex flex-col h-full bg-surface overflow-hidden">
          {activeConversation ? (
            <>
              {/* Active Header */}
              <div className="flex items-center justify-between p-4 border-b border-line bg-surface">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 rounded-full bg-paper-deep border border-line flex items-center justify-center font-display font-extrabold text-xs text-ink overflow-hidden flex-shrink-0">
                    {isCurrentBuyer && activeConversation.store.logo_url ? (
                      <Image
                        src={activeConversation.store.logo_url}
                        alt={counterpartName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      counterpartName?.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-sm font-bold text-ink">
                        {counterpartName}
                      </span>
                      {isCurrentBuyer && (
                        <ShieldCheck className="h-3.5 w-3.5 text-kita-green" />
                      )}
                    </div>
                    <span className="text-xs text-muted font-medium">
                      {isCurrentBuyer ? "Official Storefront Merchant" : "Student Buyer"}
                    </span>
                  </div>
                </div>

                {isCurrentBuyer && activeConversation.store.slug && (
                  <Link
                    href={`/protected/marketplace/store/${activeConversation.store.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-paper px-3 py-1.5 text-xs font-bold text-ink hover:bg-paper-deep transition-colors"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 text-muted" />
                    <span>View Store</span>
                    <ExternalLink className="h-3 w-3 text-muted" />
                  </Link>
                )}
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 bg-paper/20">
                {/* Notice Banner */}
                <div className="flex items-center justify-center">
                  <span className="rounded-full bg-paper border border-line px-3 py-1 text-xs text-muted text-center font-medium">
                    Direct message channel between student buyer and merchant.
                  </span>
                </div>

                {messages.length === 0 && !loadingMessages && (
                  <div className="flex flex-col items-center justify-center gap-2 my-auto text-center p-6 text-muted">
                    <MessageSquare className="h-8 w-8 text-muted/40" />
                    <span className="font-bold text-xs text-ink">No messages yet</span>
                    <span className="text-xs">
                      Send a message below or tap a quick question chip to start chatting!
                    </span>
                  </div>
                )}

                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    msg={msg}
                    isMine={msg.sender_id === currentUserId}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Chips */}
              <div className="flex items-center gap-2 px-4 py-2 bg-surface border-t border-line overflow-x-auto scrollbar-none">
                <span className="text-xs font-bold text-muted flex-shrink-0 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-kita-green" />
                  Quick Ask:
                </span>
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputText(prompt);
                    }}
                    className="rounded-lg bg-paper border border-line px-2.5 py-1 text-xs text-ink hover:border-kita-green hover:bg-kita-green-soft/40 transition-colors whitespace-nowrap cursor-pointer flex-shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Message Input Box */}
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 p-3 bg-surface border-t border-line"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Message ${counterpartName || "seller"}…`}
                  className="flex-1 h-11 rounded-xl bg-paper border border-line px-4 text-xs text-ink placeholder:text-muted focus:bg-surface focus:outline-none focus:border-kita-green transition-colors"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() || isSending}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-kita-green text-white shadow-flyer hover:bg-kita-green-deep active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex-shrink-0"
                  aria-label="Send Message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 m-auto text-center p-8 text-muted">
              <div className="h-12 w-12 rounded-full bg-paper border border-line flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-kita-green" />
              </div>
              <h3 className="font-display text-sm font-bold text-ink">
                Select a conversation
              </h3>
              <p className="text-xs text-muted max-w-xs">
                Pick a chat thread from the left or visit a store on the campus marketplace to message a seller.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
