"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Store,
  ChevronDown,
  ChevronUp,
  Package,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Banknote,
  Check,
  ArrowRight,
} from "lucide-react";
import { BuyerOrder } from "./buyer-dashboard-view";

const PESO = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STAGES = [
  { key: "CONFIRMED", label: "Confirmed" },
  { key: "PREPARING", label: "Preparing" },
  { key: "READY_FOR_PICKUP", label: "Ready" },
  { key: "COMPLETED", label: "Handed Off" },
];

function getStageIndex(status: string): number {
  switch (status) {
    case "PENDING":
    case "PAYMENT_REVIEW":
    case "AWAITING_PAYMENT":
      return 0;
    case "PREPARING":
      return 1;
    case "READY_FOR_PICKUP":
      return 2;
    case "COMPLETED":
      return 3;
    case "CANCELLED":
      return -1;
    default:
      return 0;
  }
}

function getStatusMessage(status: string, location?: string | null): string {
  switch (status) {
    case "READY_FOR_PICKUP":
      return `Ready for pickup right now! Head over to ${location || "the designated campus handoff point"}.`;
    case "PREPARING":
      return "Student merchant is currently preparing and packing your order.";
    case "PENDING":
    case "PAYMENT_REVIEW":
    case "AWAITING_PAYMENT":
      return "Order received. Seller has been notified and will begin preparation shortly.";
    case "COMPLETED":
      return "Order handed off successfully. Salamat!";
    case "CANCELLED":
      return "This order was cancelled.";
    default:
      return "Tracking live campus fulfillment.";
  }
}

export function OrderTrackingCard({ order }: { order: BuyerOrder }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const stageIndex = getStageIndex(order.status);
  const isReady = order.status === "READY_FOR_PICKUP";
  const isCancelled = order.status === "CANCELLED";

  return (
    <article className="flex flex-col rounded-2xl border border-line bg-surface overflow-hidden shadow-sm transition-all hover:border-line-strong">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line bg-paper/50 p-4 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kita-green text-xs font-extrabold text-white shadow-sm flex-shrink-0">
            {order.storeName.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col truncate">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-ink truncate">
                {order.storeName}
              </span>
              <span className="text-muted">·</span>
              <span className="font-mono text-xs font-bold text-ink">
                {order.order_number}
              </span>
            </div>
            <span className="text-xs text-muted">
              Ordered {formatDay(order.created_at)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-line/60">
          <span className="font-mono text-lg font-extrabold text-kita-green">
            {PESO(Number(order.total_amount || 0))}
          </span>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-bold text-ink hover:bg-paper transition-colors"
          >
            <span>{isExpanded ? "Hide Details" : "Details"}</span>
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* 2. Visual Multi-Stage Progress Timeline Tracker */}
      {!isCancelled ? (
        <div className="flex flex-col gap-3 p-4 sm:p-5">
          {/* 4-Step Tracker Bar */}
          <div className="relative flex items-center justify-between gap-2 px-2 py-1">
            {/* Background Line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-paper-deep rounded-full z-0" />

            {/* Active Progress Fill Line */}
            <div
              className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-kita-green rounded-full z-0 transition-all duration-500"
              style={{
                width:
                  stageIndex === 0
                    ? "0%"
                    : stageIndex === 1
                    ? "33%"
                    : stageIndex === 2
                    ? "66%"
                    : "calc(100% - 3rem)",
              }}
            />

            {STAGES.map((stage, idx) => {
              const isPassed = idx < stageIndex;
              const isCurrent = idx === stageIndex;
              const isFuture = idx > stageIndex;

              return (
                <div key={stage.key} className="relative z-10 flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                      isPassed
                        ? "border-kita-green bg-kita-green text-white"
                        : isCurrent
                        ? "border-kita-green bg-surface text-kita-green ring-4 ring-kita-green/20"
                        : "border-line bg-surface text-muted"
                    }`}
                  >
                    {isPassed ? (
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    ) : (
                      <span className="font-mono text-xs">{idx + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold text-center leading-tight whitespace-nowrap ${
                      isCurrent
                        ? "text-kita-green"
                        : isPassed
                        ? "text-ink"
                        : "text-muted"
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dynamic Contextual Guidance Banner */}
          <div
            className={`flex items-start gap-2.5 rounded-xl p-3.5 text-xs transition-colors ${
              isReady
                ? "bg-amber-500/10 border border-amber-500/30 text-amber-950 font-medium"
                : "bg-paper/80 border border-line text-ink"
            }`}
          >
            <Clock
              className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                isReady ? "text-amber-600 animate-pulse" : "text-kita-green"
              }`}
            />
            <div className="flex flex-col gap-0.5">
              <span className="font-bold">
                {isReady ? "Ready for Pickup!" : STAGES[stageIndex]?.label || "Tracking"}
              </span>
              <p className="text-muted leading-relaxed">
                {getStatusMessage(order.status, order.pickupLocation)}
              </p>
            </div>
          </div>

          {/* Logistics Meta Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted pt-1">
            {order.pickupLocation && (
              <div className="flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1">
                <MapPin className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
                <span className="font-semibold text-ink">{order.pickupLocation}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-5 text-xs text-rose-700 bg-rose-500/10 border-t border-rose-500/20">
          This order was cancelled.
        </div>
      )}

      {/* 3. Expandable Itemized Receipt */}
      {isExpanded && (
        <div className="flex flex-col gap-3 border-t border-line bg-paper/60 p-4 sm:p-5 text-xs animate-in fade-in duration-200">
          <span className="eyebrow text-xs text-muted">Order Details</span>

          {order.items && order.items.length > 0 ? (
            <ul className="flex flex-col divide-y divide-line border border-line rounded-xl bg-surface overflow-hidden">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-muted bg-paper px-1.5 py-0.5 rounded border border-line">
                      {item.quantity}x
                    </span>
                    <span className="font-semibold text-ink">{item.title}</span>
                  </div>
                  <span className="font-mono font-bold text-ink">
                    {PESO(Number(item.price) * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-line bg-surface p-3 text-muted">
              Campus marketplace order items
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-line">
            <Link
              href="/protected/orders"
              className="text-xs font-bold text-kita-green hover:underline flex items-center gap-1"
            >
              <span>Manage &amp; Track Order</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <span className="font-mono text-base font-extrabold text-kita-green">
              {PESO(Number(order.total_amount || 0))}
            </span>
          </div>
        </div>
      )}
    </article>
  );
}
