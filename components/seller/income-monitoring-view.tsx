"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Banknote,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  Store,
  Search,
  ArrowUpRight,
  Printer,
  ChevronRight,
  User,
  ShoppingBag,
  Sparkles,
  ArrowLeft,
  Calendar,
  Flame,
} from "lucide-react";
import { peso } from "@/lib/format";
import { SellerOrder } from "./seller-orders-view";

interface IncomeMonitoringViewProps {
  storeName: string;
  storeSlug?: string;
  orders: SellerOrder[];
}

function formatDayTime(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function timeAgo(dateString: string): string {
  try {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateString).toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export function IncomeMonitoringView({
  storeName,
  storeSlug,
  orders,
}: IncomeMonitoringViewProps) {
  const [activeFilter, setActiveFilter] = useState<
    "ALL" | "COLLECTED" | "PENDING" | "GCASH" | "CASH"
  >("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Calculate Core Financial Metrics
  const nonCancelledOrders = useMemo(
    () => orders.filter((o) => o.status !== "CANCELLED"),
    [orders]
  );

  const completedOrders = useMemo(
    () => orders.filter((o) => o.status === "COMPLETED"),
    [orders]
  );

  const pendingCollectionOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.status === "PENDING" ||
          o.status === "PREPARING" ||
          o.status === "READY_FOR_PICKUP"
      ),
    [orders]
  );

  // Financial aggregates
  const totalGrossRevenue = useMemo(
    () => nonCancelledOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0),
    [nonCancelledOrders]
  );

  const realizedIncome = useMemo(
    () => completedOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0),
    [completedOrders]
  );

  const pendingIncome = useMemo(
    () =>
      pendingCollectionOrders.reduce(
        (sum, o) => sum + Number(o.total_amount || 0),
        0
      ),
    [pendingCollectionOrders]
  );

  // Today's revenue calculation
  const todayRevenue = useMemo(() => {
    const today = new Date().toDateString();
    return nonCancelledOrders
      .filter((o) => {
        try {
          return new Date(o.created_at).toDateString() === today;
        } catch {
          return false;
        }
      })
      .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
  }, [nonCancelledOrders]);

  const averageOrderValue = useMemo(() => {
    if (nonCancelledOrders.length === 0) return 0;
    return totalGrossRevenue / nonCancelledOrders.length;
  }, [nonCancelledOrders, totalGrossRevenue]);

  // Payment method breakdown
  const paymentBreakdown = useMemo(() => {
    let cashTotal = 0;
    let cashCount = 0;
    let gcashTotal = 0;
    let gcashCount = 0;

    nonCancelledOrders.forEach((o) => {
      const amt = Number(o.total_amount || 0);
      if (o.payment_method === "GCASH") {
        gcashTotal += amt;
        gcashCount += 1;
      } else {
        cashTotal += amt;
        cashCount += 1;
      }
    });

    const total = cashTotal + gcashTotal || 1;
    return {
      cash: {
        total: cashTotal,
        count: cashCount,
        percent: Math.round((cashTotal / total) * 100),
      },
      gcash: {
        total: gcashTotal,
        count: gcashCount,
        percent: Math.round((gcashTotal / total) * 100),
      },
    };
  }, [nonCancelledOrders]);

  // Break-time slot breakdown
  const breakSlotBreakdown = useMemo(() => {
    const slots: Record<string, { label: string; total: number; count: number }> = {
      m_recess_1: { label: "1st Recess Morning (8:20 AM - 8:40 AM)", total: 0, count: 0 },
      m_recess_2: { label: "2nd Recess Morning (9:30 AM - 9:50 AM)", total: 0, count: 0 },
      lunch: { label: "Lunch Break / Dismissal (12:10 PM - 12:40 PM)", total: 0, count: 0 },
      a_recess_1: { label: "1st Recess Afternoon (3:00 PM - 3:20 PM)", total: 0, count: 0 },
      a_recess_2: { label: "2nd Recess Afternoon (4:10 PM - 4:30 PM)", total: 0, count: 0 },
      custom: { label: "Buyer Preferred / Custom Time", total: 0, count: 0 },
    };

    nonCancelledOrders.forEach((o) => {
      const pref = (o.preferred_time || "").toLowerCase();
      const amt = Number(o.total_amount || 0);

      if (pref.includes("1st recess") && pref.includes("morning")) {
        slots.m_recess_1.total += amt;
        slots.m_recess_1.count += 1;
      } else if (pref.includes("2nd recess") && pref.includes("morning")) {
        slots.m_recess_2.total += amt;
        slots.m_recess_2.count += 1;
      } else if (pref.includes("1st recess") && pref.includes("afternoon")) {
        slots.a_recess_1.total += amt;
        slots.a_recess_1.count += 1;
      } else if (pref.includes("2nd recess") && pref.includes("afternoon")) {
        slots.a_recess_2.total += amt;
        slots.a_recess_2.count += 1;
      } else if (pref.includes("lunch") || pref.includes("dismissal") || pref.includes("12:10")) {
        slots.lunch.total += amt;
        slots.lunch.count += 1;
      } else if (pref.includes("recess")) {
        slots.m_recess_1.total += amt;
        slots.m_recess_1.count += 1;
      } else {
        slots.custom.total += amt;
        slots.custom.count += 1;
      }
    });

    return slots;
  }, [nonCancelledOrders]);

  // Top earning products
  const topEarningProducts = useMemo(() => {
    const map: Record<string, { title: string; count: number; revenue: number }> = {};
    nonCancelledOrders.forEach((o) => {
      (o.items || []).forEach((item) => {
        if (!map[item.title]) {
          map[item.title] = { title: item.title, count: 0, revenue: 0 };
        }
        map[item.title].count += Number(item.quantity || 1);
        map[item.title].revenue += Number(item.subtotal || item.price * item.quantity);
      });
    });

    return Object.values(map)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [nonCancelledOrders]);

  // Filtered transactions for the ledger
  const filteredOrders = useMemo(() => {
    let list = orders;

    if (activeFilter === "COLLECTED") {
      list = list.filter((o) => o.status === "COMPLETED");
    } else if (activeFilter === "PENDING") {
      list = list.filter(
        (o) =>
          o.status === "PENDING" ||
          o.status === "PREPARING" ||
          o.status === "READY_FOR_PICKUP"
      );
    } else if (activeFilter === "GCASH") {
      list = list.filter((o) => o.payment_method === "GCASH");
    } else if (activeFilter === "CASH") {
      list = list.filter((o) => o.payment_method !== "GCASH");
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(
      (o) =>
        o.order_number.toLowerCase().includes(q) ||
        o.buyer_name.toLowerCase().includes(q) ||
        (o.pickup_location && o.pickup_location.toLowerCase().includes(q)) ||
        (o.reference_number && o.reference_number.toLowerCase().includes(q)) ||
        (o.items && o.items.some((i) => i.title.toLowerCase().includes(q)))
    );
  }, [orders, activeFilter, searchQuery]);

  const filteredIncomeSum = useMemo(
    () =>
      filteredOrders
        .filter((o) => o.status !== "CANCELLED")
        .reduce((sum, o) => sum + Number(o.total_amount || 0), 0),
    [filteredOrders]
  );

  function handlePrint() {
    window.print();
  }

  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-kita-green">
            <TrendingUp className="h-4 w-4" />
            <span className="eyebrow">Financial Intelligence</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            Income &amp; Sales Monitoring
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Live revenue monitoring, incoming buyer purchases, and collection tracking for{" "}
            <strong>{storeName}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Live indicator badge */}
          <div className="inline-flex items-center gap-2 rounded-xl border border-kita-green/20 bg-kita-green-soft px-3 py-1.5 text-xs font-semibold text-kita-green">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kita-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-kita-green"></span>
            </span>
            <span>Live Purchase Sync</span>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 text-xs font-bold text-ink hover:bg-paper transition-colors shadow-xs"
          >
            <Printer className="h-3.5 w-3.5 text-muted" />
            <span>Export / Print</span>
          </button>

          <Link
            href="/seller/orders"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-kita-green px-4 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all active:scale-95"
          >
            <Package className="h-3.5 w-3.5" />
            <span>Order Fulfillment</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Gross Revenue */}
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-xs text-muted">Total Gross Sales</span>
            <Banknote className="h-4 w-4 text-muted" />
          </div>
          <span className="font-mono text-2xl sm:text-3xl font-extrabold text-ink">
            {peso(totalGrossRevenue)}
          </span>
          <span className="text-xs text-muted">
            From {nonCancelledOrders.length} student purchases
          </span>
        </div>

        {/* Metric 2: Realized Income (Completed Orders) */}
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-xs text-muted">Collected Income</span>
            <CheckCircle2 className="h-4 w-4 text-kita-green" />
          </div>
          <span className="font-mono text-2xl sm:text-3xl font-extrabold text-kita-green">
            {peso(realizedIncome)}
          </span>
          <span className="text-xs text-kita-green font-semibold">
            {completedOrders.length} orders completed &amp; collected
          </span>
        </div>

        {/* Metric 3: Pending Inflow (In Progress) */}
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-xs text-muted">Pending Collection</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-600">
            {peso(pendingIncome)}
          </span>
          <span className="text-xs text-amber-700">
            {pendingCollectionOrders.length} orders in preparation / pickup
          </span>
        </div>

        {/* Metric 4: Average Order Value / Today */}
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-xs text-muted">Today&apos;s Revenue</span>
            <Flame className="h-4 w-4 text-spark-deep" />
          </div>
          <span className="font-mono text-2xl sm:text-3xl font-extrabold text-spark-ink">
            {peso(todayRevenue)}
          </span>
          <span className="text-xs text-muted">
            Avg order: {peso(averageOrderValue)}
          </span>
        </div>
      </div>

      {/* 3. Deep Breakdowns: Payment Method & Break-Time Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (6 Cols): Break-Time Window Earnings */}
        <div className="lg:col-span-6 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-kita-green" />
              <h2 className="font-display text-base font-bold text-ink">
                Break-Time Window Incomes
              </h2>
            </div>
            <span className="text-xs text-muted">Campus schedule sync</span>
          </div>

          <div className="flex flex-col gap-4">
            {Object.entries(breakSlotBreakdown).map(([key, item]) => {
              const pct =
                totalGrossRevenue > 0
                  ? Math.round((item.total / totalGrossRevenue) * 100)
                  : 0;

              return (
                <div key={key} className="flex flex-col gap-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-kita-green">
                        {peso(item.total)}
                      </span>
                      <span className="text-muted">({item.count} orders)</span>
                    </div>
                  </div>

                  <div className="h-2 w-full rounded-full bg-paper overflow-hidden border border-line/60">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct > 40
                          ? "bg-kita-green"
                          : pct > 15
                          ? "bg-spark-deep"
                          : "bg-line-strong"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between rounded-xl bg-paper/60 p-3 text-xs border border-line mt-1">
            <span className="text-muted">Peak Revenue Window:</span>
            <span className="font-bold text-ink">
              {Object.values(breakSlotBreakdown).reduce((max, s) => (s.total > max.total ? s : max), { label: "1st Recess Morning", total: 0 }).label}
            </span>
          </div>
        </div>

        {/* Right Column (6 Cols): Payment Channels & Top Products */}
        <div className="lg:col-span-6 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-spark-deep" />
              <h2 className="font-display text-base font-bold text-ink">
                Payment Channel Split
              </h2>
            </div>
            <span className="text-xs text-muted">Collection methods</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Cash on Pickup */}
            <div className="flex flex-col gap-1.5 p-3.5 rounded-xl border border-line bg-paper/40">
              <div className="flex items-center gap-1.5 text-muted text-xs">
                <Banknote className="h-3.5 w-3.5 text-kita-green" />
                <span className="font-semibold">Cash on Pickup (COP)</span>
              </div>
              <span className="font-mono text-xl font-bold text-ink">
                {peso(paymentBreakdown.cash.total)}
              </span>
              <span className="text-xs text-muted">
                {paymentBreakdown.cash.count} cash orders ({paymentBreakdown.cash.percent}%)
              </span>
            </div>

            {/* GCash */}
            <div className="flex flex-col gap-1.5 p-3.5 rounded-xl border border-line bg-paper/40">
              <div className="flex items-center gap-1.5 text-muted text-xs">
                <CreditCard className="h-3.5 w-3.5 text-spark-ink" />
                <span className="font-semibold">GCash Pre-Payments</span>
              </div>
              <span className="font-mono text-xl font-bold text-ink">
                {peso(paymentBreakdown.gcash.total)}
              </span>
              <span className="text-xs text-muted">
                {paymentBreakdown.gcash.count} digital orders ({paymentBreakdown.gcash.percent}%)
              </span>
            </div>
          </div>

          {/* Top Selling Revenue Drivers */}
          <div className="flex flex-col gap-2 pt-2 border-t border-line">
            <span className="eyebrow text-xs text-muted">Top Revenue Products</span>
            {topEarningProducts.length === 0 ? (
              <p className="text-xs text-muted py-2">No product sales recorded yet.</p>
            ) : (
              <ul className="flex flex-col divide-y divide-line" role="list">
                {topEarningProducts.map((p, idx) => (
                  <li key={p.title} className="flex items-center justify-between py-2 text-xs">
                    <div className="flex items-center gap-2 truncate max-w-[240px]">
                      <span className="font-mono text-xs font-bold text-muted w-4">
                        #{idx + 1}
                      </span>
                      <span className="font-bold text-ink truncate">{p.title}</span>
                      <span className="text-muted font-mono">({p.count} sold)</span>
                    </div>
                    <span className="font-mono font-bold text-kita-green">
                      {peso(p.revenue)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* 4. Live Incoming Purchases & Income Ledger */}
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-xs">
        {/* Ledger Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <Banknote className="h-4 w-4 text-kita-green" />
            <h2 className="font-display text-base font-bold text-ink">
              Live Purchases &amp; Inflows ({filteredOrders.length})
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by buyer, order #, or item..."
              className="w-full rounded-xl border border-line bg-paper pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-muted/60 focus:border-kita-green focus:outline-none focus:ring-1 focus:ring-kita-green"
            />
          </div>
        </div>

        {/* Filter Segmented Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "ALL", label: `All Inflows (${orders.length})` },
            { id: "COLLECTED", label: `Collected Income (${completedOrders.length})` },
            { id: "PENDING", label: `Pending Collection (${pendingCollectionOrders.length})` },
            { id: "GCASH", label: `GCash (${paymentBreakdown.gcash.count})` },
            { id: "CASH", label: `Cash on Pickup (${paymentBreakdown.cash.count})` },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-kita-green text-white shadow-xs"
                    : "bg-paper border border-line text-muted hover:text-ink hover:bg-paper-deep"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Ledger Table */}
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted">
            <ShoppingBag className="h-9 w-9 mb-2 text-line-strong" />
            <p className="text-sm font-bold text-ink">No purchases match this filter</p>
            <p className="text-xs text-muted mt-1">
              When students buy products from your storefront, they will instantly appear here with income tracking.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line bg-paper/50 text-muted eyebrow">
                  <th className="py-3 px-4 font-bold">Purchase &amp; Buyer</th>
                  <th className="py-3 px-4 font-bold">Items Purchased</th>
                  <th className="py-3 px-4 font-bold">Handoff Schedule</th>
                  <th className="py-3 px-4 font-bold">Payment Channel</th>
                  <th className="py-3 px-4 font-bold">Collection Status</th>
                  <th className="py-3 px-4 font-bold text-right">Income Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredOrders.map((order) => {
                  const isCompleted = order.status === "COMPLETED";
                  const isCancelled = order.status === "CANCELLED";

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-paper/40 transition-colors group"
                    >
                      {/* 1. Buyer & Order # */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-ink text-xs">
                            {order.buyer_name}
                          </span>
                          <span className="font-mono text-muted text-xs">
                            {order.order_number} · {timeAgo(order.created_at)}
                          </span>
                          <span className="text-muted/70 text-[0.6875rem]">
                            {formatDayTime(order.created_at)}
                          </span>
                        </div>
                      </td>

                      {/* 2. Items Purchased */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex flex-col gap-1 max-w-[260px]">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs"
                            >
                              <span className="text-ink font-medium truncate mr-2">
                                <strong className="font-mono text-kita-green">
                                  {item.quantity}x
                                </strong>{" "}
                                {item.title}
                              </span>
                              <span className="font-mono text-muted text-xs">
                                {peso(item.subtotal || item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* 3. Schedule & Handoff */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-ink">
                            {order.preferred_time || "Recess Break"}
                          </span>
                          <span className="text-muted text-xs truncate max-w-[180px]">
                            {order.pickup_location}
                          </span>
                        </div>
                      </td>

                      {/* 4. Payment Channel */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-ink flex items-center gap-1">
                            {order.payment_method === "GCASH" ? (
                              <>
                                <CreditCard className="h-3.5 w-3.5 text-spark-deep" />
                                <span>GCash</span>
                              </>
                            ) : (
                              <>
                                <Banknote className="h-3.5 w-3.5 text-kita-green" />
                                <span>Cash on Pickup</span>
                              </>
                            )}
                          </span>
                          {order.reference_number && (
                            <span className="font-mono text-[0.6875rem] text-muted">
                              Ref: {order.reference_number}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 5. Income Collection Status */}
                      <td className="py-3.5 px-4 align-top">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-kita-green-soft px-2 py-0.5 text-xs font-semibold text-kita-green border border-kita-green/20">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Collected</span>
                          </span>
                        ) : isCancelled ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-paper px-2 py-0.5 text-xs font-semibold text-muted border border-line">
                            <span>Void / Cancelled</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-800 border border-amber-500/30">
                            <Clock className="h-3 w-3" />
                            <span>Pending Handoff</span>
                          </span>
                        )}
                      </td>

                      {/* 6. Amount */}
                      <td className="py-3.5 px-4 align-top text-right">
                        <span
                          className={`font-mono text-sm font-bold ${
                            isCancelled
                              ? "text-muted line-through"
                              : isCompleted
                              ? "text-kita-green"
                              : "text-ink"
                          }`}
                        >
                          +{peso(Number(order.total_amount || 0))}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Dynamic Summary Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-line text-xs">
          <span className="text-muted">
            Showing {filteredOrders.length} transactions in active ledger view
          </span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-ink">Filtered Inflow Total:</span>
            <span className="font-mono text-lg font-extrabold text-kita-green">
              {peso(filteredIncomeSum)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

