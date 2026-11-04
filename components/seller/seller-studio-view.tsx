"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Store,
  MapPin,
  Clock,
  CreditCard,
  Settings,
  Plus,
  ArrowUpRight,
  Package,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Truck,
  TrendingUp,
  Banknote,
  Star,
} from "lucide-react";
import { StatusPill, orderStatus } from "@/components/dashboard/status-pill";
import { ProductTable, SellerProductItem } from "./product-table";
import { CategoryOption } from "./product-editor-view";
import { DeleteProductDialog } from "./delete-product-dialog";
import { peso } from "@/lib/format";
import { updateOrderStatusAction } from "@/app/actions/orders";
import { WebsiteRatingDialog } from "@/components/ratings/website-rating-dialog";

export interface SellerOrder {
  id: string;
  order_number: string;
  buyer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
  pickup_location: string;
  notes: string | null;
  payment_method: string;
  items: {
    id: string;
    title: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
}

export interface SellerStoreData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  gcash_name: string | null;
  gcash_number: string | null;
  pickup_locations: string | null;
  operating_hours: string | null;
  rating_avg: number;
  rating_count: number;
  is_active: boolean;
}

interface SellerStudioViewProps {
  store: SellerStoreData;
  categories: CategoryOption[];
  products: SellerProductItem[];
  orders?: SellerOrder[];
}

const PESO = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function SellerStudioView({
  store,
  categories,
  products,
  orders = [],
}: SellerStudioViewProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const [orderList, setOrderList] = useState<SellerOrder[]>(orders);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [ratingOrderNumber, setRatingOrderNumber] = useState<string | undefined>(undefined);

  // Random pop-up when seller has an order (triggers once only; stops once they are done answering)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const alreadyAnswered = localStorage.getItem("projectkita_seller_rated") === "true";
      if (alreadyAnswered) return;

      // Only randomly pop up when the seller got an order
      if (orderList.length > 0) {
        // ~50% random chance when viewing incoming orders
        const isRandomSelected = Math.random() < 0.5;
        if (isRandomSelected) {
          const timer = setTimeout(() => {
            const latestOrder = orderList[0];
            setRatingOrderNumber(latestOrder?.order_number);
            setShowRatingDialog(true);
          }, 1500);
          return () => clearTimeout(timer);
        }
      }
    } catch (e) {
      console.warn("Storage check notice:", e);
    }
  }, [orderList]);

  function handleDeleteProduct(product: { id: string; title: string }) {
    setProductToDelete(product);
    setDeleteOpen(true);
  }

  async function handleStatusChange(orderId: string, orderNumber: string, nextStatus: any) {
    setUpdatingOrderId(orderId);
    setOrderList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
    await updateOrderStatusAction({ orderId, orderNumber, status: nextStatus });
    setUpdatingOrderId(null);

    // If seller has not yet answered, randomly pop up when an order is updated/completed (once only)
    if (typeof window !== "undefined") {
      const alreadyAnswered = localStorage.getItem("projectkita_seller_rated") === "true";
      if (!alreadyAnswered) {
        const isRandom = nextStatus === "COMPLETED" || Math.random() < 0.5;
        if (isRandom) {
          setRatingOrderNumber(orderNumber);
          setTimeout(() => setShowRatingDialog(true), 600);
        }
      }
    }
  }

  const openOrders = orderList.filter(
    (o) => o.status !== "COMPLETED" && o.status !== "CANCELLED"
  );
  const totalGrossIncome = orderList
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
  const total = products.length;
  const active = products.filter((p) => p.status === "ACTIVE").length;
  const needsRestock = products.filter(
    (p) => p.stock <= 5 || p.status === "OUT_OF_STOCK"
  ).length;
  const inventoryValue = products.reduce(
    (sum, p) => sum + Number(p.price || 0) * Number(p.stock || 0),
    0
  );

  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-kita-green">
            <Store className="h-4 w-4" />
            <span className="eyebrow">Seller Studio</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            {store.name}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/seller/income"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 text-xs font-bold text-ink hover:bg-paper-deep transition-colors shadow-xs"
          >
            <TrendingUp className="h-3.5 w-3.5 text-kita-green" />
            <span>Income Monitoring</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              setRatingOrderNumber(undefined);
              setShowRatingDialog(true);
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-spark-deep/30 bg-spark-soft/50 px-3.5 text-xs font-bold text-spark-ink hover:bg-spark-soft transition-colors"
          >
            <Star className="h-3.5 w-3.5 fill-spark text-spark" />
            <span>Rate Website</span>
          </button>

          <Link
            href="/seller/settings"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 text-xs font-bold text-ink hover:bg-paper-deep transition-colors"
          >
            <Settings className="h-3.5 w-3.5 text-muted" />
            <span>Store Settings</span>
          </Link>

          <Link
            href="/seller/products/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-kita-green px-4 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* 2. Flatline 2-Column Asymmetrical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sticky Rail (4 Cols) — Store Profile, Status & Metrics */}
        <aside className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-6">
          {/* Store Overview Card */}
          <div className="flex flex-col gap-4 border border-line bg-surface p-5 rounded-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="eyebrow text-xs text-muted">Storefront Status</span>
              <StatusPill intent={store.is_active ? "live" : "stopped"} bare>
                {store.is_active ? "Open for orders" : "Paused"}
              </StatusPill>
            </div>

            {store.description && (
              <p className="text-xs text-muted leading-relaxed">
                {store.description}
              </p>
            )}

            <div className="flex flex-col gap-2.5 text-xs border-t border-line pt-3">
              {store.pickup_locations && (
                <div className="flex items-start gap-2 text-muted">
                  <MapPin className="h-3.5 w-3.5 text-muted mt-0.5 flex-shrink-0" />
                  <span className="text-ink font-medium">{store.pickup_locations}</span>
                </div>
              )}

              {store.operating_hours && (
                <div className="flex items-center gap-2 text-muted">
                  <Clock className="h-3.5 w-3.5 text-muted flex-shrink-0" />
                  <span className="text-ink font-medium">{store.operating_hours}</span>
                </div>
              )}

              {store.gcash_number && (
                <div className="flex items-center gap-2 text-muted">
                  <CreditCard className="h-3.5 w-3.5 text-muted flex-shrink-0" />
                  <span className="font-mono text-ink font-bold">GCash: {store.gcash_number}</span>
                </div>
              )}
            </div>

            <Link
              href={`/protected/marketplace`}
              className="inline-flex items-center justify-between rounded-xl border border-line bg-paper px-3.5 py-2 text-xs font-bold text-ink hover:bg-paper-deep transition-colors"
            >
              <span>View Storefront on Campus</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
            </Link>
          </div>

          {/* Quick Metrics Line-Ruled Strip */}
          <div className="flex flex-col border border-line bg-surface rounded-2xl overflow-hidden divide-y divide-line">
            <div className="flex items-center justify-between px-4 py-3 bg-paper/40">
              <span className="eyebrow text-xs text-muted">Studio Ledger</span>
              <span className="text-xs font-semibold text-kita-green">Live Campus Sync</span>
            </div>

            <div className="grid grid-cols-2 divide-x divide-line">
              <Link
                href="/seller/orders"
                className="flex flex-col gap-0.5 p-3.5 hover:bg-paper/60 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-xs text-muted">Active Orders</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted group-hover:text-kita-green transition-colors" />
                </div>
                <span className="font-mono text-xl font-bold text-kita-green">{openOrders.length}</span>
                <span className="text-xs text-muted">Open Orders Hub →</span>
              </Link>
              <div className="flex flex-col gap-0.5 p-3.5">
                <span className="eyebrow text-xs text-muted">Live Listings</span>
                <span className="font-mono text-xl font-bold text-ink">{active}</span>
                <span className="text-xs text-muted">of {total} total</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5">
              <span className="text-xs font-bold text-ink">Catalog Net Value</span>
              <span className="font-mono text-base font-bold text-kita-green">
                {peso(inventoryValue)}
              </span>
            </div>

            {/* Income Monitoring Quick Tile */}
            <Link
              href="/seller/income"
              className="flex items-center justify-between p-3.5 bg-kita-green-soft/20 hover:bg-kita-green-soft/40 transition-colors group"
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="eyebrow text-xs text-muted">Income Monitoring</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kita-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-kita-green"></span>
                  </span>
                </div>
                <span className="font-mono text-xl font-bold text-kita-green">
                  {peso(totalGrossIncome)}
                </span>
                <span className="text-[0.6875rem] text-muted">Live Sales &amp; Purchase Tracking →</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-kita-green transition-colors" />
            </Link>
          </div>
        </aside>

        {/* Right Main Stream (8 Cols) — Navigation Tabs & Management Tables */}
        <main className="lg:col-span-8 flex flex-col gap-5 min-w-0">
          {/* Stream Tab Strip */}
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "orders"
                  ? "bg-ink text-white shadow-sm"
                  : "text-muted hover:text-ink hover:bg-paper"
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Orders in Progress</span>
              <span className={`font-mono text-xs px-1.5 py-0.2 rounded-md ${activeTab === "orders" ? "bg-white/20 text-white" : "bg-paper text-muted border border-line"}`}>
                {openOrders.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "products"
                  ? "bg-ink text-white shadow-sm"
                  : "text-muted hover:text-ink hover:bg-paper"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Products &amp; Inventory</span>
              <span className={`font-mono text-xs px-1.5 py-0.2 rounded-md ${activeTab === "products" ? "bg-white/20 text-white" : "bg-paper text-muted border border-line"}`}>
                {products.length}
              </span>
            </button>
          </div>

          {/* TAB 1: ORDERS IN PROGRESS */}
          {activeTab === "orders" && (
            <div className="flex flex-col border border-line bg-surface rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-line bg-paper/40">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-kita-green" />
                  <h2 className="font-display text-base font-bold text-ink">
                    Incoming Campus Orders
                  </h2>
                </div>
                <span className="eyebrow text-xs text-muted">
                  {openOrders.length} active
                </span>
              </div>

              {openOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 p-12 text-center">
                  <Package className="h-8 w-8 text-muted/50" />
                  <h3 className="font-display text-sm font-bold text-ink">
                    No active orders in progress
                  </h3>
                  <p className="text-xs text-muted max-w-sm leading-relaxed">
                    When students pre-order snacks or merchandise from your storefront, they will track live here for break-time handoff. Completed orders are archived.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {openOrders.map((order) => {
                    const { intent, label } = orderStatus(order.status);
                    const isUpdating = updatingOrderId === order.id;

                    return (
                      <li
                        key={order.id}
                        className="flex flex-col gap-3 p-5 hover:bg-paper/30 transition-colors"
                      >
                        {/* Top row: Order Number, Customer, Status */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono font-bold text-sm text-ink">
                              {order.order_number}
                            </span>
                            <span className="text-muted">·</span>
                            <span className="font-bold text-xs text-ink">
                              {order.buyer_name}
                            </span>
                            <StatusPill intent={intent}>{label}</StatusPill>
                          </div>

                          <span className="font-mono text-base font-bold text-kita-green">
                            {PESO(Number(order.total_amount || 0))}
                          </span>
                        </div>

                        {/* Items details */}
                        <div className="flex flex-col gap-1 rounded-xl bg-paper/70 p-3 text-xs border border-line">
                          <div className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((it, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1">
                                  <span>{it.quantity}x {it.title}</span>
                                  {idx < order.items.length - 1 && <span className="text-muted">·</span>}
                                </span>
                              ))
                            ) : (
                              <span>Campus items</span>
                            )}
                          </div>

                          {order.notes && (
                            <p className="text-muted italic pt-1 border-t border-line/60">
                              &ldquo;{order.notes}&rdquo;
                            </p>
                          )}
                        </div>

                        {/* Bottom Row: Pickup point, schedule & Status Transition Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs text-muted">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
                            <span className="font-medium text-ink truncate max-w-xs">
                              {order.pickup_location}
                            </span>
                            <span>·</span>
                            <span>{formatDay(order.created_at)}</span>
                          </div>

                          {/* Order Status Transition Stepper Actions */}
                          <div className="flex items-center gap-1.5 self-end sm:self-auto">
                            {order.status === "PENDING" && (
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleStatusChange(order.id, order.order_number, "PREPARING")}
                                className="rounded-lg bg-spark-soft border border-spark-deep/30 px-3 py-1.5 text-xs font-bold text-spark-ink hover:bg-spark-soft/80 transition-colors"
                              >
                                Accept &amp; Prepare
                              </button>
                            )}

                            {order.status === "PREPARING" && (
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleStatusChange(order.id, order.order_number, "READY_FOR_PICKUP")}
                                className="rounded-lg bg-kita-green px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-kita-green-deep transition-all"
                              >
                                Ready for Pickup
                              </button>
                            )}

                            {order.status === "READY_FOR_PICKUP" && (
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleStatusChange(order.id, order.order_number, "COMPLETED")}
                                className="rounded-lg bg-ink px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-black transition-all"
                              >
                                Complete Order
                              </button>
                            )}

                            {order.status !== "COMPLETED" && order.status !== "CANCELLED" && (
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleStatusChange(order.id, order.order_number, "CANCELLED")}
                                className="rounded-lg border border-line bg-paper px-2.5 py-1.5 text-xs font-semibold text-muted hover:text-rose-700 hover:bg-rose-500/10 transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

          {/* TAB 2: PRODUCTS TABLE */}
          {activeTab === "products" && (
            <ProductTable
              products={products}
              categories={categories}
              onDeleteProduct={handleDeleteProduct}
            />
          )}
        </main>
      </div>

      {/* Delete Product Confirmation Dialog */}
      <DeleteProductDialog
        product={productToDelete}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />

      {/* Website Rating Dialog for Sellers (triggered after order completion / earning income) */}
      <WebsiteRatingDialog
        open={showRatingDialog}
        onOpenChange={setShowRatingDialog}
        triggerSource="SELLER_INCOME"
        orderNumber={ratingOrderNumber}
        userName={store.name}
        userRole="SELLER"
      />
    </div>
  );
}
