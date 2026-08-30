"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  ArrowRight,
  Clock,
  Check,
  MapPin,
  Search,
  Store,
  CreditCard,
  Banknote,
  Receipt,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  HelpCircle,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { BuyerOrder } from "@/components/dashboard/buyer-dashboard-view";
import { StatusPill, orderStatus } from "@/components/dashboard/status-pill";
import { ProductItem } from "@/components/marketplace/product-card";
import { useCart } from "@/lib/cart-context";

interface OrdersViewProps {
  displayName: string;
  orders: BuyerOrder[];
  recommendedProducts?: ProductItem[];
}

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
  { key: "CONFIRMED", label: "Confirmed", description: "Order received by merchant" },
  { key: "PREPARING", label: "Preparing", description: "Baking & packaging items" },
  { key: "READY_FOR_PICKUP", label: "Ready", description: "Waiting at pickup drop point" },
  { key: "COMPLETED", label: "Completed", description: "Handed off to buyer" },
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

function getStatusMessage(status: string, location?: string | null, schedule?: string | null): string {
  switch (status) {
    case "READY_FOR_PICKUP":
      return `Ready for handoff right now! Head over to ${location || "the campus handoff point"}.`;
    case "PREPARING":
      return `Student merchant is currently baking and preparing your items for ${schedule || "the upcoming break"}.`;
    case "PENDING":
    case "PAYMENT_REVIEW":
    case "AWAITING_PAYMENT":
      return "Order received. Seller has been alerted and will begin preparation shortly.";
    case "COMPLETED":
      return "Order completed and handed off successfully. Salamat for supporting student entrepreneurs!";
    case "CANCELLED":
      return "This order was cancelled.";
    default:
      return "Tracking live campus fulfillment.";
  }
}

export function OrdersView({ displayName, orders, recommendedProducts = [] }: OrdersViewProps) {
  const [activeTab, setActiveTab] = useState<"all" | "in_progress" | "ready" | "completed" | "cancelled">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || "");
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const { addItem, openCart } = useCart();

  const inProgressOrders = useMemo(
    () => orders.filter((o) => ["PENDING", "PREPARING", "PAYMENT_REVIEW", "AWAITING_PAYMENT"].includes(o.status)),
    [orders]
  );

  const readyOrders = useMemo(
    () => orders.filter((o) => o.status === "READY_FOR_PICKUP"),
    [orders]
  );

  const completedOrders = useMemo(
    () => orders.filter((o) => o.status === "COMPLETED"),
    [orders]
  );

  const cancelledOrders = useMemo(
    () => orders.filter((o) => o.status === "CANCELLED"),
    [orders]
  );

  const filteredOrders = useMemo(() => {
    let list = orders;
    if (activeTab === "in_progress") {
      list = inProgressOrders;
    } else if (activeTab === "ready") {
      list = readyOrders;
    } else if (activeTab === "completed") {
      list = completedOrders;
    } else if (activeTab === "cancelled") {
      list = cancelledOrders;
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(
      (o) =>
        o.order_number.toLowerCase().includes(q) ||
        o.storeName.toLowerCase().includes(q) ||
        o.pickupLocation?.toLowerCase().includes(q) ||
        o.items?.some((i) => i.title.toLowerCase().includes(q))
    );
  }, [orders, activeTab, inProgressOrders, readyOrders, completedOrders, cancelledOrders, searchQuery]);

  const activeOrder = useMemo(() => {
    return filteredOrders.find((o) => o.id === selectedOrderId) || filteredOrders[0] || orders[0];
  }, [filteredOrders, selectedOrderId, orders]);

  const activeStageIndex = activeOrder ? getStageIndex(activeOrder.status) : 0;
  const isCancelled = activeOrder?.status === "CANCELLED";
  const isReady = activeOrder?.status === "READY_FOR_PICKUP";

  function handleQuickAdd(product: ProductItem) {
    addItem(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  }

  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-kita-green">
            <Package className="h-4 w-4" />
            <span className="eyebrow">Order Hub</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            My Campus Orders
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Track break-time handoffs, pickup locations, and student receipts in real time.
          </p>
        </div>

        <Link
          href="/protected/marketplace"
          className="inline-flex h-9 items-center gap-2 rounded-xl bg-kita-green px-4 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all active:scale-95 self-start sm:self-auto"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Browse Marketplace</span>
        </Link>
      </div>

      {/* 2. Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
        {/* Status Segmented Tabs */}
        <div
          role="tablist"
          aria-label="Order status filters"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none"
        >
          {[
            { id: "all", label: "All Orders", count: orders.length },
            { id: "in_progress", label: "In Progress", count: inProgressOrders.length },
            { id: "ready", label: "Ready for Pickup", count: readyOrders.length },
            { id: "completed", label: "Completed", count: completedOrders.length },
            { id: "cancelled", label: "Cancelled", count: cancelledOrders.length },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  const firstMatch =
                    tab.id === "all"
                      ? orders[0]
                      : tab.id === "in_progress"
                      ? inProgressOrders[0]
                      : tab.id === "ready"
                      ? readyOrders[0]
                      : tab.id === "completed"
                      ? completedOrders[0]
                      : cancelledOrders[0];
                  if (firstMatch) {
                    setSelectedOrderId(firstMatch.id);
                  }
                }}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kita-green ${
                  isSelected
                    ? "bg-ink text-white shadow-sm"
                    : "border border-line bg-surface text-muted hover:text-ink hover:bg-paper"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`font-mono text-xs px-1.5 py-0.2 rounded-md ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-paper text-muted border border-line"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order #, item, or store..."
            aria-label="Search orders"
            className="h-9 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-xs font-semibold text-ink placeholder:text-muted/60 focus:border-kita-green focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* 3. Two-Column Asymmetrical Grid */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 p-16 text-center border border-line bg-surface rounded-2xl">
          <Package className="h-10 w-10 text-muted/50" />
          <h2 className="font-display text-base font-bold text-ink">
            No orders found
          </h2>
          <p className="text-xs text-muted max-w-sm leading-relaxed">
            {activeTab === "all"
              ? "You haven't placed any campus orders yet. Pre-order freshly baked pastries and drinks for your next break."
              : `No orders currently match the "${activeTab.replace("_", " ")}" filter.`}
          </p>
          <Link
            href="/protected/marketplace"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-kita-green px-4 py-2 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all"
          >
            <span>Explore Campus Marketplace</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN (5 Cols): Orders List + Campus Schedule & Recommendations to ease blank space */}
          <aside className="lg:col-span-5 flex flex-col gap-5">
            {/* Orders List Stream */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="eyebrow text-xs text-muted">
                  {filteredOrders.length} {filteredOrders.length === 1 ? "Order" : "Orders"}
                </span>
                <span className="text-xs text-muted">Select an order to view details</span>
              </div>

              <ul className="flex flex-col gap-3" role="list">
                {filteredOrders.map((order) => {
                  const isSelected = activeOrder?.id === order.id;
                  const { intent, label } = orderStatus(order.status);
                  const sIdx = getStageIndex(order.status);

                  return (
                    <li key={order.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedOrderId(order.id)}
                        aria-selected={isSelected}
                        className={`w-full flex flex-col gap-3 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kita-green ${
                          isSelected
                            ? "border-kita-green bg-kita-green-soft/20 ring-1 ring-kita-green shadow-sm"
                            : "border-line bg-surface hover:bg-paper hover:border-line-strong"
                        }`}
                      >
                        {/* Top Row: Store, Order #, Status */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 truncate">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-kita-green text-xs font-extrabold text-white flex-shrink-0">
                              {order.storeName.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="flex flex-col truncate">
                              <span className="font-bold text-xs text-ink truncate">
                                {order.storeName}
                              </span>
                              <span className="font-mono text-xs text-muted">
                                {order.order_number}
                              </span>
                            </div>
                          </div>
                          <StatusPill intent={intent}>{label}</StatusPill>
                        </div>

                        {/* Mini Step Tracker Bar */}
                        {order.status !== "CANCELLED" && (
                          <div className="flex items-center gap-1 w-full pt-1" aria-hidden="true">
                            {STAGES.map((st, idx) => (
                              <div
                                key={st.key}
                                className={`h-1.5 flex-1 rounded-full transition-all ${
                                  idx <= sIdx
                                    ? "bg-kita-green"
                                    : "bg-paper-deep"
                                }`}
                              />
                            ))}
                          </div>
                        )}

                        {/* Items and Location Summary */}
                        <div className="flex items-center justify-between text-xs text-muted pt-1 border-t border-line/60">
                          <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                            <MapPin className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
                            <span className="truncate">{order.pickupLocation || "Campus Handoff"}</span>
                          </div>
                          <span className="font-mono font-bold text-kita-green text-sm">
                            {PESO(Number(order.total_amount || 0))}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* SPACE BALANCER 1: Campus Bell Schedule Card */}
            <div className="flex flex-col border border-line bg-surface rounded-2xl p-4 sm:p-5 gap-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-kita-green" />
                  <h3 className="font-display text-xs font-bold text-ink">
                    LYFJSHS Break Schedule
                  </h3>
                </div>
                <span className="text-xs text-muted font-mono">Today</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex flex-col gap-0.5 rounded-xl border border-line bg-paper/60 p-2.5">
                  <span className="font-bold text-ink">Recess</span>
                  <span className="font-mono text-muted text-xs">9:45 - 10:15</span>
                </div>
                <div className="flex flex-col gap-0.5 rounded-xl border border-line bg-paper/60 p-2.5">
                  <span className="font-bold text-ink">Lunch</span>
                  <span className="font-mono text-muted text-xs">11:45 - 12:45</span>
                </div>
                <div className="flex flex-col gap-0.5 rounded-xl border border-line bg-paper/60 p-2.5">
                  <span className="font-bold text-ink">Dismissal</span>
                  <span className="font-mono text-muted text-xs">4:30 PM</span>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                Student sellers hold reserved snacks at their designated drop points throughout the break.
              </p>
            </div>

            {/* SPACE BALANCER 2: Recommended Snacks & Treats */}
            {recommendedProducts.length > 0 && (
              <div className="flex flex-col border border-line bg-surface rounded-2xl p-4 sm:p-5 gap-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-line pb-2.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-kita-green" />
                    <h3 className="font-display text-xs font-bold text-ink">
                      Pre-Order for Next Break
                    </h3>
                  </div>
                  <Link
                    href="/protected/marketplace"
                    className="text-xs font-bold text-kita-green hover:underline"
                  >
                    View All →
                  </Link>
                </div>

                <div className="flex flex-col divide-y divide-line">
                  {recommendedProducts.slice(0, 3).map((prod) => {
                    const isAdded = addedProductId === prod.id;
                    const imgUrl =
                      prod.images && prod.images.length > 0
                        ? prod.images[0].image_url
                        : "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80";

                    return (
                      <div key={prod.id} className="flex items-center justify-between py-2.5 gap-3">
                        <div className="flex items-center gap-3 truncate">
                          <img
                            src={imgUrl}
                            alt={prod.title}
                            className="h-10 w-10 rounded-lg object-cover border border-line flex-shrink-0"
                          />
                          <div className="flex flex-col truncate">
                            <span className="font-bold text-xs text-ink truncate">
                              {prod.title}
                            </span>
                            <span className="font-mono text-xs font-bold text-kita-green">
                              {PESO(Number(prod.price))}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleQuickAdd(prod)}
                          aria-label={`Add ${prod.title} to cart`}
                          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                            isAdded
                              ? "bg-kita-green text-white"
                              : "border border-line bg-paper text-ink hover:bg-paper-deep hover:border-line-strong"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="h-3 w-3" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="h-3 w-3" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SPACE BALANCER 3: Handoff Help & Support */}
            <div className="flex items-center justify-between p-3.5 border border-line bg-paper/50 rounded-xl text-xs text-muted">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-muted flex-shrink-0" />
                <span>Need help with a pickup or missing item?</span>
              </div>
              <Link
                href="/protected/marketplace"
                className="font-bold text-kita-green hover:underline flex-shrink-0 pl-2"
              >
                Contact Seller →
              </Link>
            </div>
          </aside>

          {/* RIGHT COLUMN (7 Cols): In-Detailed Product & Order Information Canvas */}
          {activeOrder && (
            <main className="lg:col-span-7 flex flex-col gap-5 lg:sticky lg:top-6">
              <div className="flex flex-col border border-line bg-surface rounded-2xl overflow-hidden shadow-sm">
                {/* 1. Detail Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line bg-paper/50 p-5">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-kita-green text-sm font-extrabold text-white shadow-sm flex-shrink-0">
                      {activeOrder.storeName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h2 className="font-display font-bold text-base text-ink">
                          {activeOrder.storeName}
                        </h2>
                        <span className="text-muted">·</span>
                        <span className="font-mono text-sm font-bold text-ink">
                          {activeOrder.order_number}
                        </span>
                      </div>
                      <span className="text-xs text-muted">
                        Placed on {formatDay(activeOrder.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {orderStatus(activeOrder.status) && (
                      <StatusPill intent={orderStatus(activeOrder.status).intent}>
                        {orderStatus(activeOrder.status).label}
                      </StatusPill>
                    )}
                  </div>
                </div>

                {/* 2. Visual 4-Stage Step Progression Stepper */}
                {!isCancelled ? (
                  <div className="flex flex-col gap-4 p-5 border-b border-line">
                    <nav aria-label="Order progress">
                      <ol className="relative flex items-center justify-between gap-2 px-2 py-2">
                        {/* Background connecting line */}
                        <div
                          className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-paper-deep rounded-full z-0"
                          aria-hidden="true"
                        />

                        {/* Active Progress Fill Line */}
                        <div
                          className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-kita-green rounded-full z-0 transition-all duration-500"
                          style={{
                            width:
                              activeStageIndex === 0
                                ? "0%"
                                : activeStageIndex === 1
                                ? "33%"
                                : activeStageIndex === 2
                                ? "66%"
                                : "calc(100% - 3rem)",
                          }}
                          aria-hidden="true"
                        />

                        {STAGES.map((stage, idx) => {
                          const isPassed = idx < activeStageIndex;
                          const isCurrent = idx === activeStageIndex;

                          return (
                            <li
                              key={stage.key}
                              aria-current={isCurrent ? "step" : undefined}
                              className="relative z-10 flex flex-col items-center gap-1.5"
                            >
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                                  isPassed
                                    ? "border-kita-green bg-kita-green text-white"
                                    : isCurrent
                                    ? "border-kita-green bg-surface text-kita-green ring-4 ring-kita-green/20"
                                    : "border-line bg-surface text-muted"
                                }`}
                              >
                                {isPassed ? (
                                  <Check className="h-4 w-4 stroke-[3]" />
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
                            </li>
                          );
                        })}
                      </ol>
                    </nav>

                    {/* Accessible Live Announcement Banner */}
                    <div
                      aria-live="polite"
                      className={`flex items-start gap-3 rounded-xl p-4 text-xs transition-colors ${
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
                        <span className="font-bold text-xs">
                          {isReady ? "Ready for Campus Pickup" : STAGES[activeStageIndex]?.label || "Tracking"}
                        </span>
                        <p className="text-muted leading-relaxed">
                          {getStatusMessage(activeOrder.status, activeOrder.pickupLocation, activeOrder.preferredTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 text-xs text-rose-700 bg-rose-500/10 border-b border-rose-500/20">
                    This order was cancelled.
                  </div>
                )}

                {/* 3. Campus Pickup Logistics & Schedule */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-line border-b border-line bg-paper/30">
                  <div className="flex flex-col gap-1.5 p-4 sm:p-5">
                    <span className="eyebrow text-xs text-muted flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-kita-green" />
                      <span>Pickup Drop Point</span>
                    </span>
                    <span className="font-bold text-xs text-ink leading-snug">
                      {activeOrder.pickupLocation || "Main Canteen Handoff Area"}
                    </span>
                    <span className="text-xs text-muted">
                      LYFJSHS Campus
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 p-4 sm:p-5">
                    <span className="eyebrow text-xs text-muted flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-kita-green" />
                      <span>Break Window Schedule</span>
                    </span>
                    <span className="font-bold text-xs text-ink leading-snug">
                      {activeOrder.preferredTime || "Recess Break (9:45 AM - 10:15 AM)"}
                    </span>
                    <span className="text-xs text-muted">
                      Show Order ID {activeOrder.order_number} upon handoff
                    </span>
                  </div>
                </div>

                {/* 4. In-Detailed Line Items Breakdown Table */}
                <div className="flex flex-col gap-3 p-5 border-b border-line">
                  <span className="eyebrow text-xs text-muted">Itemized Products ({activeOrder.items?.length || 1})</span>

                  {activeOrder.items && activeOrder.items.length > 0 ? (
                    <ul className="flex flex-col divide-y divide-line border border-line rounded-xl bg-paper/40 overflow-hidden" role="list">
                      {activeOrder.items.map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between p-3.5">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-xs text-ink bg-surface px-2 py-1 rounded-md border border-line">
                              {item.quantity}x
                            </span>
                            <div className="flex flex-col">
                              <span className="font-bold text-xs text-ink">{item.title}</span>
                              <span className="font-mono text-xs text-muted">
                                {PESO(Number(item.price))} each
                              </span>
                            </div>
                          </div>
                          <span className="font-mono font-bold text-ink text-sm">
                            {PESO(Number(item.price) * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="rounded-xl border border-line bg-paper/40 p-4 text-xs text-muted">
                      Campus marketplace order items
                    </div>
                  )}

                  {activeOrder.notes && (
                    <div className="flex flex-col gap-1 rounded-xl bg-paper/60 p-3 border border-line text-xs">
                      <span className="font-bold text-ink">Special Instructions for Seller:</span>
                      <p className="text-muted italic">&ldquo;{activeOrder.notes}&rdquo;</p>
                    </div>
                  )}
                </div>

                {/* 5. Payment & Digital Receipt Summary */}
                <div className="flex flex-col gap-2.5 p-5 bg-paper/20">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>Payment Method</span>
                    <span className="font-semibold text-ink flex items-center gap-1.5">
                      {activeOrder.paymentMethod === "GCASH" ? (
                        <>
                          <CreditCard className="h-3.5 w-3.5 text-kita-green" />
                          <span>GCash Pre-Payment {activeOrder.referenceNumber ? `(Ref: ${activeOrder.referenceNumber})` : ""}</span>
                        </>
                      ) : (
                        <>
                          <Banknote className="h-3.5 w-3.5 text-kita-green" />
                          <span>Cash on Campus Pickup (COP)</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>Campus Platform Fee</span>
                    <span className="font-mono font-semibold text-kita-green">FREE (₱0.00)</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-line">
                    <span className="font-display font-bold text-sm text-ink">Total Amount</span>
                    <span className="font-mono text-xl font-extrabold text-kita-green">
                      {PESO(Number(activeOrder.total_amount || 0))}
                    </span>
                  </div>
                </div>

                {/* 6. Quick Action Buttons */}
                <div className="flex items-center justify-between gap-3 p-4 border-t border-line bg-paper/50">
                  <Link
                    href={`/protected/marketplace`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-4 py-2 text-xs font-bold text-ink hover:bg-paper transition-colors"
                  >
                    <Store className="h-3.5 w-3.5 text-muted" />
                    <span>Visit {activeOrder.storeName}</span>
                    <ArrowUpRight className="h-3 w-3 text-muted" />
                  </Link>

                  <Link
                    href="/protected/marketplace"
                    className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-4 py-2 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all active:scale-95"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Order More Items</span>
                  </Link>
                </div>
              </div>
            </main>
          )}
        </div>
      )}
    </div>
  );
}
