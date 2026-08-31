"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Send,
  Store,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Sparkles,
  Check,
  CheckCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import {
  ChatMessage,
  getOrCreateConversationAction,
  getConversationMessagesAction,
  sendMessageAction,
  markMessagesAsReadAction,
} from "@/app/actions/messages";

interface StoreChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeId: string;
  storeName: string;
  storeSlug: string;
  storeLogo?: string | null;
  sellerName?: string | null;
  currentUserId?: string;
  initialMessage?: string;
}

const QUICK_PROMPTS = [
  "Hi! Is this item still available?",
  "When is your next campus pickup?",
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

export function StoreChatModal({
  isOpen,
  onClose,
  storeId,
  storeName,
  storeSlug,
  storeLogo,
  sellerName,
  currentUserId,
  initialMessage = "",
}: StoreChatModalProps) {
  const supabase = useMemo(() => createClient(), []);

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState(initialMessage);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // 1. Initialize or find conversation when modal opens
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);

    async function initChat() {
      try {
        const res = await getOrCreateConversationAction({
          storeId,
          storeSlug,
          storeName,
        });

        if (isMounted && res.success && res.conversationId) {
          setConversationId(res.conversationId);
          const msgs = await getConversationMessagesAction(res.conversationId);
          if (isMounted) {
            setMessages(msgs);
            setLoading(false);
            setTimeout(scrollToBottom, 100);
            markMessagesAsReadAction(res.conversationId);
          }
        } else if (isMounted) {
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to initialize store chat:", err);
        if (isMounted) setLoading(false);
      }
    }

    initChat();

    return () => {
      isMounted = false;
    };
  }, [isOpen, storeId, storeSlug, storeName, scrollToBottom]);

  // 2. Realtime listener for incoming messages
  useEffect(() => {
    if (!conversationId || !isOpen) return;

    const channel = supabase
      .channel(`store_chat_modal_${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          setTimeout(scrollToBottom, 50);
          if (newMsg.sender_id !== currentUserId) {
            markMessagesAsReadAction(conversationId);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, isOpen, supabase, currentUserId, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !loading) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, loading]);

  async function handleSend(textToSend?: string) {
    const text = (textToSend || inputText).trim();
    if (!text || isSending) return;

    setIsSending(true);
    if (!textToSend) {
      setInputText("");
    }

    let targetConvId = conversationId;

    // If conversation not resolved yet, fetch/create it on the fly
    if (!targetConvId) {
      try {
        const res = await getOrCreateConversationAction({
          storeId,
          storeSlug,
          storeName,
        });
        if (res.success && res.conversationId) {
          targetConvId = res.conversationId;
          setConversationId(res.conversationId);
        }
      } catch (e) {
        console.error("Failed to resolve conversation on send:", e);
      }
    }

    if (!targetConvId) {
      setIsSending(false);
      return;
    }

    // Optimistic message
    const tempId = `temp-${Date.now()}`;
    const optimisticMsg: ChatMessage = {
      id: tempId,
      conversation_id: targetConvId,
      sender_id: currentUserId || "me",
      content: text,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setTimeout(scrollToBottom, 50);

    try {
      const res = await sendMessageAction({
        conversationId: targetConvId,
        content: text,
      });

      if (res.success && res.message) {
        setMessages((prev) =>
          prev.map((m) => (m.id === tempId ? res.message! : m))
        );
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setIsSending(false);
      setTimeout(scrollToBottom, 50);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[480px] h-[85vh] sm:h-[600px] flex flex-col p-0 gap-0 overflow-hidden bg-surface rounded-3xl border border-line shadow-flyer-lg"
      >
        {/* 1. Modal Header */}
        <DialogHeader className="p-4 sm:p-5 border-b border-line bg-paper/50 flex flex-row items-center justify-between gap-3 space-y-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-2xl overflow-hidden bg-paper border border-line shadow-xs flex-shrink-0 flex items-center justify-center text-kita-green">
              {storeLogo ? (
                <Image
                  src={storeLogo}
                  alt={storeName}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <Store className="h-5 w-5 text-kita-green" />
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 truncate">
                <DialogTitle className="font-display text-sm font-bold text-ink truncate">
                  {storeName}
                </DialogTitle>
                <CheckCircle2 className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
              </div>
              <span className="text-[11px] text-muted truncate">
                {sellerName || "Verified Campus Merchant"} · Online
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/protected/messages?store=${storeSlug}`}
              onClick={onClose}
              className="p-2 rounded-xl text-muted hover:text-ink hover:bg-paper transition-colors"
              title="Open full chat screen"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-muted hover:text-ink hover:bg-paper transition-colors cursor-pointer"
              title="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        {/* 2. Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-3 bg-paper/20">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 text-muted text-xs">
              <Loader2 className="h-5 w-5 animate-spin text-kita-green" />
              <span>Connecting to store chat…</span>
            </div>
          ) : messages.length === 0 ? (
            /* Welcome Empty State with Quick Prompts */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 gap-4">
              <div className="h-12 w-12 rounded-2xl bg-kita-green-soft flex items-center justify-center text-kita-green shadow-xs">
                <Sparkles className="h-6 w-6" />
              </div>

              <div className="flex flex-col gap-1 max-w-xs">
                <span className="font-display font-bold text-sm text-ink">
                  Direct Message {storeName}
                </span>
                <p className="text-xs text-muted leading-relaxed">
                  Inquire about menu items, request custom orders, or confirm recess pickup spots.
                </p>
              </div>

              {/* Quick Inquiry Prompts */}
              <div className="flex flex-col gap-1.5 w-full max-w-xs pt-2">
                <span className="text-[11px] font-semibold text-muted text-left">
                  Suggested inquiries:
                </span>
                {QUICK_PROMPTS.slice(0, 3).map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isSending}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-xs p-2.5 rounded-xl border border-line bg-surface hover:bg-kita-green-soft hover:border-kita-green/30 hover:text-kita-green text-ink transition-all cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-50 flex items-center justify-between group"
                  >
                    <span>"{prompt}"</span>
                    <Send className="h-3 w-3 opacity-0 group-hover:opacity-100 text-kita-green transition-opacity flex-shrink-0 ml-1.5" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Message Bubbles */
            <>
              <div className="flex items-center justify-center my-2">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-muted/60 bg-paper px-2.5 py-0.5 rounded-full border border-line">
                  Campus Verified Direct Chat
                </span>
              </div>

              {messages.map((msg) => {
                const isMine = msg.sender_id === currentUserId || msg.sender_id === "me";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-1 max-w-[82%] ${
                      isMine ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <div
                      className={`p-3 text-xs leading-relaxed ${
                        isMine
                          ? "bg-kita-green text-white rounded-2xl rounded-br-xs shadow-xs"
                          : "bg-surface text-ink border border-line rounded-2xl rounded-bl-xs shadow-xs"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-1 px-1 text-[10px] text-muted font-mono">
                      <span>{formatTime(msg.created_at)}</span>
                      {isMine && (
                        <span>
                          {msg.is_read ? (
                            <CheckCheck className="h-3 w-3 text-kita-green inline" />
                          ) : (
                            <Check className="h-3 w-3 text-muted inline" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* 3. Quick Chips when in ongoing chat */}
        {messages.length > 0 && !loading && (
          <div className="px-4 py-2 border-t border-line/60 bg-paper/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                type="button"
                disabled={isSending}
                onClick={() => handleSend(prompt)}
                className="text-[11px] font-medium whitespace-nowrap px-2.5 py-1 rounded-lg border border-line bg-surface hover:bg-paper-deep text-muted hover:text-ink transition-colors cursor-pointer flex-shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* 4. Message Input Bar */}
        <div className="p-3 sm:p-4 border-t border-line bg-surface flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${storeName}…`}
            disabled={loading}
            className="flex-1 h-10 px-3.5 text-xs rounded-xl bg-paper border border-line text-ink placeholder:text-muted focus:outline-none focus:border-kita-green transition-colors"
          />

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isSending || loading}
            className="h-10 px-3.5 rounded-xl bg-kita-green text-white font-bold text-xs shadow-flyer hover:bg-kita-green-deep active:scale-95 transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-1.5"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Send</span>
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
