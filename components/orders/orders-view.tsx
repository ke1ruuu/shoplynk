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
  MessageSquare,
  XCircle,
  AlertTriangle,
  X,
} from "lucide-react";
import { BuyerOrder } from "@/components/dashboard/buyer-dashboard-view";
import { StatusPill, orderStatus } from "@/components/dashboard/status-pill";
import { ProductItem } from "@/components/marketplace/product-card";
import { useCart } from "@/lib/cart-context";
import { cancelOrderAction } from "@/app/actions/orders";

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

const CANCELLATION_REASONS = [
  "Changed mind / No longer needed",
  "Ordered wrong items or quantity",
  "Class schedule or pickup time conflict",
  "Ordered by mistake / duplicate order",
  "Other reason",
];

export function OrdersView({ displayName, orders: initialOrders, recommendedProducts = [] }: OrdersViewProps) {
  const [orders, setOrders] = useState<BuyerOrder[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<"active" | "ready" | "completed" | "cancelled" | "all">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string>(initialOrders[0]?.id || "");
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Cancellation Modal State
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<BuyerOrder | null>(null);
  const [selectedReason, setSelectedReason] = useState(CANCELLATION_REASONS[0]);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const { addItem } = useCart();

  // Single-pass memoized order categories
  const { inProgressOrders, readyOrders, completedOrders, cancelledOrders, activeOrders } = useMemo(() => {
    const inProg: BuyerOrder[] = [];
    const ready: BuyerOrder[] = [];
    const completed: BuyerOrder[] = [];
    const cancelled: BuyerOrder[] = [];
    const active: BuyerOrder[] = [];

    for (const o of orders) {
      if (o.status === "COMPLETED") {
        completed.push(o);
      } else if (o.status === "CANCELLED") {
        cancelled.push(o);
      } else {
        active.push(o);
        if (o.status === "READY_FOR_PICKUP") {
          ready.push(o);
        } else {
          inProg.push(o);
        }
      }
    }

    return {
      inProgressOrders: inProg,
      readyOrders: ready,
      completedOrders: completed,
      cancelledOrders: cancelled,
      activeOrders: active,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let list = activeOrders;
    if (activeTab === "active") {
      list = activeOrders;
    } else if (activeTab === "ready") {
      list = readyOrders;
    } else if (activeTab === "completed") {
      list = completedOrders;
    } else if (activeTab === "cancelled") {
      list = cancelledOrders;
    } else if (activeTab === "all") {
      list = orders;
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
  const isCompleted = activeOrder?.status === "COMPLETED";
  const canCancel = activeOrder && !isCancelled && !isCompleted;

  function handleQuickAdd(product: ProductItem) {
    addItem(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  }

  function handleOpenCancelModal(order: BuyerOrder) {
    setOrderToCancel(order);
    setSelectedReason(CANCELLATION_REASONS[0]);
    setCancelError(null);
    setCancelModalOpen(true);
  }

  async function handleConfirmCancel() {
    if (!orderToCancel || isCancelling) return;

    setIsCancelling(true);
    setCancelError(null);

    const res = await cancelOrderAction({
      orderId: orderToCancel.id,
      orderNumber: orderToCancel.order_number,
      reason: selectedReason,
    });

    if (res.success) {
      // Optimistically update orders list
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderToCancel.id || o.order_number === orderToCancel.order_number
            ? { ...o, status: "CANCELLED" }
            : o
        )
      );
      setIsCancelling(false);
      setCancelModalOpen(false);
      setOrderToCancel(null);
    } else {
      setCancelError(res.error || "Failed to cancel order. Please try again.");
      setIsCancelling(false);
    }
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
            { id: "active", label: "Active Purchases", count: activeOrders.length },
            { id: "ready", label: "Ready for Pickup", count: readyOrders.length },
            { id: "completed", label: "Completed", count: completedOrders.length },
            { id: "cancelled", label: "Cancelled", count: cancelledOrders.length },
            { id: "all", label: "All History", count: orders.length },
          ].map((tab) => {
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isCurrent}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                  isCurrent
                    ? "bg-ink text-white shadow-sm"
                    : "border border-line bg-surface text-muted hover:bg-paper hover:text-ink hover:border-line-strong"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 font-mono text-xs ${
                    isCurrent
                      ? "bg-white/20 text-white"
                      : "bg-paper-deep text-muted"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Real-time Order Search */}
        <div className="relative w-full md:w-72 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order #, store, item..."
            className="h-9 w-full rounded-xl bg-surface border border-line pl-8 pr-3 text-xs text-ink placeholder:text-muted focus:border-kita-green focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* 3. Empty State or 2-Column Workstation */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-surface p-12 text-center shadow-xs my-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-kita-green-soft text-kita-green">
            <Package className="h-8 w-8" />
          </div>
          <div className="flex flex-col gap-1 max-w-sm">
            <h2 className="font-display text-lg font-extrabold text-ink">
              {searchQuery ? "No matching orders found" : "No campus orders in this tab"}
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              {searchQuery
                ? `No orders matched "${searchQuery}". Try searching by order number or store name.`
                : "Explore our verified student merchant catalogs across campus to place your first pre-order!"}
            </p>
          </div>
          <Link
            href="/protected/marketplace"
            className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-4 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all active:scale-95 mt-2"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Discover Campus Stores</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN (5 Cols): Orders Feed & Space Balancers */}
          <aside className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-xs text-muted">Active Handoff Feed</span>
                <span className="font-mono text-xs text-muted">{filteredOrders.length} orders</span>
              </div>

              <ul className="flex flex-col gap-2.5" role="list">
                {filteredOrders.map((order) => {
                  const isSelected = activeOrder?.id === order.id;
                  const { label, intent } = orderStatus(order.status) || {
                    label: order.status,
                    intent: "neutral" as const,
                  };

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
                        {/* Top Row: Store Name, Order #, Status */}
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
                                {order.order_number} · {formatDay(order.created_at)}
                              </span>
                            </div>
                          </div>
                          <StatusPill intent={intent}>{label}</StatusPill>
                        </div>

                        {/* Items Summary Strip */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-ink font-medium bg-paper/60 rounded-xl p-2.5 border border-line">
                          {order.items && order.items.length > 0 ? (
                            order.items.map((it, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1">
                                <span className="font-bold">{it.quantity}x</span>
                                <span>{it.title}</span>
                                {idx < (order.items?.length || 0) - 1 && (
                                  <span className="text-muted">·</span>
                                )}
                              </span>
                            ))
                          ) : (
                            <span>Campus snack pre-order</span>
                          )}
                        </div>

                        {/* Bottom Row: Location & Total */}
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
                          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
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
                href="/protected/messages"
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
                    <Link
                      href={`/protected/messages?store=${encodeURIComponent(activeOrder.storeName || "")}&message=${encodeURIComponent(`Hi! I'm inquiring about my order #${activeOrder.order_number}.`)}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-bold text-ink hover:bg-paper transition-colors"
                      title="Message Seller"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-muted" />
                      <span>Message</span>
                    </Link>

                    {canCancel && (
                      <button
                        type="button"
                        onClick={() => handleOpenCancelModal(activeOrder)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 px-3 py-1.5 text-xs font-bold hover:bg-rose-100 hover:border-rose-300 transition-colors cursor-pointer"
                        title="Cancel Order"
                      >
                        <XCircle className="h-3.5 w-3.5 text-rose-600" />
                        <span>Cancel Order</span>
                      </button>
                    )}

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
                                    ? "border-kita-green bg-surface text-kita-green ring-4 ring-kita-green/10"
                                    : "border-line bg-surface text-muted"
                                }`}
                              >
                                {isPassed ? (
                                  <Check className="h-4 w-4 stroke-[3]" />
                                ) : (
                                  <span className="font-mono text-xs">{idx + 1}</span>
                                )}
                              </div>
                              <div className="text-center">
                                <span
                                  className={`block text-xs font-bold ${
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
                            </li>
                          );
                        })}
                      </ol>
                    </nav>

                    {/* Status Alert Notification Card */}
                    <div className="rounded-xl border border-line bg-paper/60 p-3.5 flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-kita-green animate-pulse mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-ink leading-relaxed font-medium">
                        {getStatusMessage(
                          activeOrder.status,
                          activeOrder.pickupLocation,
                          activeOrder.preferredTime
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 p-5 border-b border-line bg-rose-50/50">
                    <div className="flex items-center gap-2 text-rose-700">
                      <XCircle className="h-5 w-5 flex-shrink-0" />
                      <h3 className="font-display text-sm font-bold">This order has been cancelled</h3>
                    </div>
                    <p className="text-xs text-rose-600/90 leading-relaxed">
                      The order is no longer active. If you paid via GCash, please coordinate with the student seller in Messages or campus treasury for any refund arrangements.
                    </p>
                  </div>
                )}

                {/* 3. Pickup Details Ledger Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-line border-b border-line bg-surface">
                  <div className="flex flex-col gap-1.5 p-4 sm:p-5">
                    <span className="eyebrow text-xs text-muted flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-kita-green" />
                      <span>Campus Pickup Spot</span>
                    </span>
                    <span className="font-bold text-xs text-ink leading-snug">
                      {activeOrder.pickupLocation || "LYFJSHS Main Canteen Handoff Area"}
                    </span>
                    <span className="text-xs text-muted">
                      Look for {activeOrder.storeName} banner
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
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-t border-line bg-paper/50">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/protected/marketplace`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-4 py-2 text-xs font-bold text-ink hover:bg-paper transition-colors"
                    >
                      <Store className="h-3.5 w-3.5 text-muted" />
                      <span>Visit {activeOrder.storeName}</span>
                      <ArrowUpRight className="h-3 w-3 text-muted" />
                    </Link>

                    {canCancel && (
                      <button
                        type="button"
                        onClick={() => handleOpenCancelModal(activeOrder)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 px-3.5 py-2 text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
                      >
                        <XCircle className="h-3.5 w-3.5 text-rose-600" />
                        <span>Cancel Order</span>
                      </button>
                    )}
                  </div>

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

      {/* 4. Cancellation Confirmation Modal Dialog */}
      {cancelModalOpen && orderToCancel && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-2xl flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 flex-shrink-0">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <h3
                    id="cancel-dialog-title"
                    className="font-display text-base font-bold text-ink"
                  >
                    Cancel Order {orderToCancel.order_number}?
                  </h3>
                  <span className="text-xs text-muted">
                    Store: <strong>{orderToCancel.storeName}</strong>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!isCancelling) setCancelModalOpen(false);
                }}
                className="rounded-lg p-1 text-muted hover:text-ink hover:bg-paper transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Warning Message */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-3.5 text-xs text-rose-800 leading-relaxed">
              Are you sure you want to cancel this order? Once cancelled, the student seller will be notified immediately and the items will be returned to store inventory.
            </div>

            {/* Cancellation Reason Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-ink">
                Reason for cancellation:
              </label>
              <div className="flex flex-col gap-1.5">
                {CANCELLATION_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-xs font-medium cursor-pointer transition-colors ${
                      selectedReason === reason
                        ? "border-kita-green bg-kita-green-soft/30 text-ink ring-1 ring-kita-green/40"
                        : "border-line bg-paper/50 text-muted hover:bg-paper hover:text-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="cancel_reason"
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="accent-kita-green h-4 w-4"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            {cancelError && (
              <p className="text-xs text-rose-600 font-semibold">{cancelError}</p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-line">
              <button
                type="button"
                disabled={isCancelling}
                onClick={() => setCancelModalOpen(false)}
                className="rounded-xl border border-line bg-paper px-4 py-2.5 text-xs font-bold text-ink hover:bg-paper-deep transition-colors disabled:opacity-50 cursor-pointer"
              >
                Keep Order
              </button>

              <button
                type="button"
                disabled={isCancelling}
                onClick={handleConfirmCancel}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-rose-700 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isCancelling ? (
                  <span>Cancelling...</span>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    <span>Yes, Cancel Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
