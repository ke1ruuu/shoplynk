"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Package,
  Store,
  Clock,
  Check,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Search,
  CreditCard,
  Banknote,
  Receipt,
  User,
  ShoppingBag,
  ArrowRight,
  Filter,
  Flame,
  Printer,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { StatusPill, orderStatus } from "@/components/dashboard/status-pill";
import { updateOrderStatusAction } from "@/app/actions/orders";

export interface SellerOrder {
  id: string;
  order_number: string;
  buyer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
  pickup_location: string;
  preferred_time?: string | null;
  notes: string | null;
  payment_method: string;
  reference_number?: string | null;
  items: {
    id: string;
    title: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
}

interface SellerOrdersViewProps {
  storeName: string;
  orders: SellerOrder[];
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

export function SellerOrdersView({ storeName, orders: initialOrders }: SellerOrdersViewProps) {
  const [orders, setOrders] = useState<SellerOrder[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "preparing" | "ready" | "completed" | "cancelled">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string>(initialOrders[0]?.id || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Active categories
  const pendingOrders = useMemo(() => orders.filter((o) => o.status === "PENDING"), [orders]);
  const preparingOrders = useMemo(() => orders.filter((o) => o.status === "PREPARING"), [orders]);
  const readyOrders = useMemo(() => orders.filter((o) => o.status === "READY_FOR_PICKUP"), [orders]);
  const completedOrders = useMemo(() => orders.filter((o) => o.status === "COMPLETED"), [orders]);
  const cancelledOrders = useMemo(() => orders.filter((o) => o.status === "CANCELLED"), [orders]);

  const activeOrdersCount = pendingOrders.length + preparingOrders.length + readyOrders.length;
  const totalRevenue = completedOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

  const filteredOrders = useMemo(() => {
    let list = orders;
    if (activeTab === "pending") list = pendingOrders;
    else if (activeTab === "preparing") list = preparingOrders;
    else if (activeTab === "ready") list = readyOrders;
    else if (activeTab === "completed") list = completedOrders;
    else if (activeTab === "cancelled") list = cancelledOrders;

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(
      (o) =>
        o.order_number.toLowerCase().includes(q) ||
        o.buyer_name.toLowerCase().includes(q) ||
        o.pickup_location.toLowerCase().includes(q) ||
        o.items.some((i) => i.title.toLowerCase().includes(q))
    );
  }, [orders, activeTab, pendingOrders, preparingOrders, readyOrders, completedOrders, cancelledOrders, searchQuery]);

  const activeOrder = useMemo(() => {
    return filteredOrders.find((o) => o.id === selectedOrderId) || filteredOrders[0] || orders[0];
  }, [filteredOrders, selectedOrderId, orders]);

  async function handleStatusChange(nextStatus: any) {
    if (!activeOrder) return;
    setIsUpdating(true);
    const orderId = activeOrder.id;
    const orderNum = activeOrder.order_number;

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );

    await updateOrderStatusAction({
      orderId,
      orderNumber: orderNum,
      status: nextStatus,
    });
    setIsUpdating(false);
  }

  function toggleItemChecked(itemId: string) {
    setCheckedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }

  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-kita-green">
            <Store className="h-4 w-4" />
            <span className="eyebrow">Seller Fulfillment Center</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            Store Orders Management
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Incoming customer pre-orders, kitchen prep queues, and break-time handoffs for <strong>{storeName}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/seller"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 text-xs font-bold text-ink hover:bg-paper transition-colors"
          >
            <Package className="h-3.5 w-3.5 text-muted" />
            <span>Product Catalog</span>
          </Link>

          <Link
            href="/seller/products/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-kita-green px-4 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all active:scale-95"
          >
            <span>+ Add Product</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Summary Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border border-line bg-surface rounded-2xl p-4 divide-y lg:divide-y-0 lg:divide-x divide-line shadow-xs">
        <div className="flex flex-col gap-1 px-3">
          <span className="eyebrow text-xs text-muted">Active Orders</span>
          <span className="font-mono text-2xl font-extrabold text-kita-green">
            {activeOrdersCount}
          </span>
          <span className="text-xs text-muted">Awaiting fulfillment</span>
        </div>

        <div className="flex flex-col gap-1 px-3 pt-3 lg:pt-0">
          <span className="eyebrow text-xs text-muted">In Preparation</span>
          <span className="font-mono text-2xl font-extrabold text-amber-600">
            {preparingOrders.length}
          </span>
          <span className="text-xs text-muted">Currently in kitchen / packing</span>
        </div>

        <div className="flex flex-col gap-1 px-3 pt-3 lg:pt-0">
          <span className="eyebrow text-xs text-muted">Ready for Pickup</span>
          <span className="font-mono text-2xl font-extrabold text-ink">
            {readyOrders.length}
          </span>
          <span className="text-xs text-muted">Waiting at drop point</span>
        </div>

        <div className="flex flex-col gap-1 px-3 pt-3 lg:pt-0">
          <span className="eyebrow text-xs text-muted">Fulfilled Revenue</span>
          <span className="font-mono text-2xl font-extrabold text-kita-green">
            {PESO(totalRevenue)}
          </span>
          <span className="text-xs text-muted">{completedOrders.length} completed orders</span>
        </div>
      </div>

      {/* 3. Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
        {/* Status Segmented Tabs */}
        <div
          role="tablist"
          aria-label="Order status filters"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none"
        >
          {[
            { id: "all", label: "All Orders", count: orders.length },
            { id: "pending", label: "New / Pending", count: pendingOrders.length },
            { id: "preparing", label: "Preparing", count: preparingOrders.length },
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
                      : tab.id === "pending"
                      ? pendingOrders[0]
                      : tab.id === "preparing"
                      ? preparingOrders[0]
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
            placeholder="Search by customer, order #, or item..."
            aria-label="Search incoming orders"
            className="h-9 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-xs font-semibold text-ink placeholder:text-muted/60 focus:border-kita-green focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* 4. Two-Column Master-Detail Order Management Grid */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 p-16 text-center border border-line bg-surface rounded-2xl">
          <Package className="h-10 w-10 text-muted/50" />
          <h2 className="font-display text-base font-bold text-ink">
            No orders in this queue
          </h2>
          <p className="text-xs text-muted max-w-sm leading-relaxed">
            {activeTab === "all"
              ? "Your store has no orders yet. When students pre-order from your menu, they will appear here live."
              : `No orders currently match the "${activeTab.replace("_", " ")}" filter.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN (5 Cols): Incoming Orders Queue */}
          <aside className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="eyebrow text-xs text-muted">
                {filteredOrders.length} {filteredOrders.length === 1 ? "Order" : "Orders"}
              </span>
              <span className="text-xs text-muted">Select to manage fulfillment</span>
            </div>

            <ul className="flex flex-col gap-3" role="list">
              {filteredOrders.map((order) => {
                const isSelected = activeOrder?.id === order.id;
                const { intent, label } = orderStatus(order.status);

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
                      {/* Top Row: Customer Name, Order #, Status */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 truncate">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-xs font-bold text-white flex-shrink-0">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col truncate">
                            <span className="font-bold text-xs text-ink truncate">
                              {order.buyer_name}
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
                        {order.items.map((it, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1">
                            <span className="font-bold">{it.quantity}x</span>
                            <span>{it.title}</span>
                            {idx < order.items.length - 1 && <span className="text-muted">·</span>}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Row: Location & Total */}
                      <div className="flex items-center justify-between text-xs text-muted pt-1 border-t border-line/60">
                        <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                          <MapPin className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
                          <span className="truncate">{order.pickup_location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-paper px-1.5 py-0.5 text-xs font-mono font-bold text-muted border border-line">
                            {order.payment_method === "GCASH" ? "GCash" : "Cash"}
                          </span>
                          <span className="font-mono font-bold text-kita-green text-sm">
                            {PESO(Number(order.total_amount || 0))}
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* RIGHT COLUMN (7 Cols): Order Fulfillment Workbench */}
          {activeOrder && (
            <main className="lg:col-span-7 flex flex-col gap-5 lg:sticky lg:top-6">
              <div className="flex flex-col border border-line bg-surface rounded-2xl overflow-hidden shadow-sm">
                {/* 1. Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line bg-paper/50 p-5">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-sm font-bold text-white shadow-sm flex-shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h2 className="font-display font-bold text-base text-ink">
                          {activeOrder.buyer_name}
                        </h2>
                        <span className="text-muted">·</span>
                        <span className="font-mono text-sm font-bold text-ink">
                          {activeOrder.order_number}
                        </span>
                      </div>
                      <span className="text-xs text-muted">
                        Received on {formatDay(activeOrder.created_at)}
                      </span>
                    </div>
                  </div>

                  {orderStatus(activeOrder.status) && (
                    <StatusPill intent={orderStatus(activeOrder.status).intent}>
                      {orderStatus(activeOrder.status).label}
                    </StatusPill>
                  )}
                </div>

                {/* 2. Instant Order Status Stepper Actions (Workflow Controls) */}
                <div className="flex flex-col gap-3 p-5 border-b border-line bg-kita-green-soft/10">
                  <span className="eyebrow text-xs text-muted">Fulfillment Action</span>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {activeOrder.status === "PENDING" && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange("PREPARING")}
                        className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-4 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all active:scale-95"
                      >
                        <Check className="h-4 w-4" />
                        <span>Accept &amp; Start Preparing</span>
                      </button>
                    )}

                    {activeOrder.status === "PREPARING" && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange("READY_FOR_PICKUP")}
                        className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-amber-700 transition-all active:scale-95"
                      >
                        <Clock className="h-4 w-4" />
                        <span>Mark as Ready for Pickup (Alerts Buyer)</span>
                      </button>
                    )}

                    {activeOrder.status === "READY_FOR_PICKUP" && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange("COMPLETED")}
                        className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-black transition-all active:scale-95"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Confirm Student Handoff (Complete Order)</span>
                      </button>
                    )}

                    {activeOrder.status === "COMPLETED" && (
                      <div className="flex items-center gap-2 text-xs font-bold text-kita-green bg-kita-green-soft px-3 py-2 rounded-xl border border-kita-green/20">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Order Handed Off &amp; Completed</span>
                      </div>
                    )}

                    {activeOrder.status !== "COMPLETED" && activeOrder.status !== "CANCELLED" && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange("CANCELLED")}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-muted hover:text-rose-700 hover:bg-rose-500/10 transition-colors ml-auto"
                      >
                        <span>Cancel Order</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Prep Checklist (Items with check-off controls) */}
                <div className="flex flex-col gap-3 p-5 border-b border-line">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-xs text-muted">
                      Items to Pack ({activeOrder.items.length})
                    </span>
                    <span className="text-xs text-muted">Tap to check off as packed</span>
                  </div>

                  <ul className="flex flex-col divide-y divide-line border border-line rounded-xl bg-paper/40 overflow-hidden" role="list">
                    {activeOrder.items.map((item) => {
                      const isDone = !!checkedItems[item.id];
                      return (
                        <li
                          key={item.id}
                          onClick={() => toggleItemChecked(item.id)}
                          className={`flex items-center justify-between p-3.5 cursor-pointer transition-colors ${
                            isDone ? "bg-kita-green-soft/30 line-through opacity-70" : "hover:bg-paper"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-md border text-white transition-all ${
                                isDone
                                  ? "border-kita-green bg-kita-green"
                                  : "border-line-strong bg-surface"
                              }`}
                            >
                              {isDone && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                            </div>
                            <span className="font-mono font-bold text-xs text-ink bg-surface px-2 py-0.5 rounded border border-line">
                              {item.quantity}x
                            </span>
                            <span className="font-bold text-xs text-ink">{item.title}</span>
                          </div>

                          <span className="font-mono font-bold text-ink text-sm">
                            {PESO(Number(item.price) * item.quantity)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {activeOrder.notes && (
                    <div className="flex flex-col gap-1 rounded-xl bg-paper/70 p-3 border border-line text-xs">
                      <span className="font-bold text-ink">Customer Special Instructions:</span>
                      <p className="text-muted italic">&ldquo;{activeOrder.notes}&rdquo;</p>
                    </div>
                  )}
                </div>

                {/* 4. Campus Pickup Drop Point & Break Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-line border-b border-line bg-paper/30">
                  <div className="flex flex-col gap-1 p-4 sm:p-5">
                    <span className="eyebrow text-xs text-muted flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-kita-green" />
                      <span>Handoff Location</span>
                    </span>
                    <span className="font-bold text-xs text-ink">
                      {activeOrder.pickup_location}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 p-4 sm:p-5">
                    <span className="eyebrow text-xs text-muted flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-kita-green" />
                      <span>Break Window Schedule</span>
                    </span>
                    <span className="font-bold text-xs text-ink">
                      {activeOrder.preferred_time || "Recess Break (9:45 AM - 10:15 AM)"}
                    </span>
                  </div>
                </div>

                {/* 5. Payment Details & Cash Collection Banner */}
                <div className="flex flex-col gap-3 p-5 bg-paper/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Payment Type</span>
                    <span className="font-bold text-ink flex items-center gap-1.5">
                      {activeOrder.payment_method === "GCASH" ? (
                        <>
                          <CreditCard className="h-3.5 w-3.5 text-kita-green" />
                          <span>GCash Pre-Payment</span>
                        </>
                      ) : (
                        <>
                          <Banknote className="h-3.5 w-3.5 text-kita-green" />
                          <span>Cash on Campus Pickup (COP)</span>
                        </>
                      )}
                    </span>
                  </div>

                  {activeOrder.payment_method === "CASH_ON_PICKUP" ? (
                    <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-950">
                      <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                      <span>
                        <strong>Cash Collection:</strong> Collect <strong>{PESO(Number(activeOrder.total_amount || 0))}</strong> in exact cash from student upon handoff.
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-line bg-surface p-3 text-xs">
                      <span className="text-muted">GCash Reference No.</span>
                      <span className="font-mono font-bold text-ink">
                        {activeOrder.reference_number || "Verified in App"}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-line">
                    <span className="font-display font-bold text-sm text-ink">Total Order Amount</span>
                    <span className="font-mono text-xl font-extrabold text-kita-green">
                      {PESO(Number(activeOrder.total_amount || 0))}
                    </span>
                  </div>
                </div>
              </div>
            </main>
          )}
        </div>
      )}
    </div>
  );
}
