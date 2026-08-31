"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  Store,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Package,
} from "lucide-react";
import { StatusPill, orderStatus } from "@/components/dashboard/status-pill";
import { ProductCard, ProductItem } from "@/components/marketplace/product-card";
import { ProductDetailModal } from "@/components/marketplace/product-detail-modal";
import { OrderTrackingCard } from "./order-tracking-card";

export interface BuyerOrder {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  created_at: string;
  storeName: string;
  pickupLocation: string | null;
  preferredTime?: string | null;
  paymentMethod?: string | null;
  referenceNumber?: string | null;
  notes?: string | null;
  items?: { id: string; title: string; quantity: number; price: number }[];
}

export interface BuyerCategory {
  name: string;
  slug: string;
}

interface BuyerDashboardViewProps {
  displayName: string;
  campusName: string;
  isSeller: boolean;
  orders: BuyerOrder[];
  categories: BuyerCategory[];
  products: ProductItem[];
}

const PESO = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const OPEN_STATUSES = [
  "PENDING",
  "PAYMENT_REVIEW",
  "AWAITING_PAYMENT",
  "PREPARING",
  "READY_FOR_PICKUP",
];

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", { month: "short", day: "numeric" });
}

export function BuyerDashboardView({
  displayName,
  campusName,
  isSeller,
  orders,
  categories,
  products = [],
}: BuyerDashboardViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<"all" | "instant" | "top_rated" | "under_100">("all");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const firstName = displayName.split(" ")[0];

  // Active pending pickups
  const openOrders = useMemo(() => {
    return orders
      .filter((o) => OPEN_STATUSES.includes(o.status))
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  }, [orders]);

  const readyCount = openOrders.filter((o) => o.status === "READY_FOR_PICKUP").length;
  const completed = orders.filter((o) => o.status === "COMPLETED");
  const spent = completed.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

  const activePickupOrder = openOrders[0];

  // Instant handoff items
  const instantPickupProducts = useMemo(() => {
    return products.filter((p) => p.prep_time_minutes === 0).slice(0, 4);
  }, [products]);

  // Featured stores
  const featuredStores = useMemo(() => {
    const map = new Map<string, ProductItem["store"]>();
    products.forEach((p) => {
      if (p.store && !map.has(p.store.id)) {
        map.set(p.store.id, p.store);
      }
    });
    return Array.from(map.values()).slice(0, 4);
  }, [products]);

  // Main filtered stream
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat =
        selectedCategory === "all" || p.category.slug === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.store.name.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      if (activeFilter === "instant") {
        matchesFilter = p.prep_time_minutes === 0;
      } else if (activeFilter === "top_rated") {
        matchesFilter = (p.store.rating_avg || 0) >= 4.5;
      } else if (activeFilter === "under_100") {
        matchesFilter = Number(p.price) <= 100;
      }

      return matchesCat && matchesSearch && matchesFilter;
    });
  }, [products, selectedCategory, searchQuery, activeFilter]);

  /* =========================================================================
     1. VERIFIED SELLER VIEW (Preserves Initial 2-Column Dashboard with Activity Ledger & Orders)
     ========================================================================= */
  if (isSeller) {
    return (
      <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
          <div className="flex flex-col gap-1">
            <span className="eyebrow text-muted">{campusName}</span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
              Kumusta, {firstName}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/seller"
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-kita-green px-4 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all active:scale-95"
            >
              <Store className="h-3.5 w-3.5" />
              <span>Seller Studio</span>
            </Link>
            <Link
              href="/protected/marketplace"
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-line bg-surface px-3.5 text-xs font-bold text-ink hover:bg-paper-deep transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5 text-muted" />
              <span>Marketplace</span>
            </Link>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Rail */}
          <aside className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-6">
            <div className="flex flex-col border border-line bg-surface rounded-2xl overflow-hidden divide-y divide-line">
              <div className="flex items-center justify-between px-4 py-3 bg-paper/40">
                <span className="eyebrow text-xs text-muted">Activity Ledger</span>
                <span className="text-xs font-bold text-kita-green">Verified Seller</span>
              </div>

              <div className="p-4 flex flex-col gap-1">
                <span className="eyebrow text-xs text-muted">Total Spent</span>
                <span className="font-mono text-2xl font-bold text-kita-green">
                  {PESO(spent)}
                </span>
                <span className="text-xs text-muted">Across all completed campus orders</span>
              </div>

              <div className="grid grid-cols-2 divide-x divide-line">
                <div className="flex flex-col gap-0.5 p-3.5">
                  <span className="eyebrow text-xs text-muted">Completed</span>
                  <span className="font-mono text-xl font-bold text-ink">{completed.length}</span>
                  <span className="text-xs text-muted">orders fulfilled</span>
                </div>
                <div className="flex flex-col gap-0.5 p-3.5">
                  <span className="eyebrow text-xs text-muted">Ready for Pickup</span>
                  <span
                    className={`font-mono text-xl font-bold ${
                      readyCount > 0 ? "text-amber-600" : "text-ink"
                    }`}
                  >
                    {readyCount}
                  </span>
                  <span className="text-xs text-muted">items waiting</span>
                </div>
              </div>
            </div>

            {/* Category Rail */}
            <div className="flex flex-col border border-line bg-surface p-5 rounded-2xl gap-3">
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <span className="eyebrow text-xs text-muted">Categories</span>
                <Link
                  href="/protected/marketplace"
                  className="text-xs font-bold text-kita-green hover:underline"
                >
                  All
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {categories.filter(c => c.slug !== "all").map(({ name, slug }) => (
                  <Link
                    key={slug}
                    href={`/protected/marketplace/category/${slug}`}
                    className="flex flex-col gap-1 rounded-xl border border-line bg-paper/60 p-2.5 text-left transition-all hover:border-kita-green/40 hover:bg-surface group"
                  >
                    <span className="text-xs font-bold text-ink truncate leading-tight">
                      {name}
                    </span>
                    <span className="text-xs text-muted">Browse →</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Stream */}
          <main className="lg:col-span-8 flex flex-col gap-8 min-w-0">
            <div className="flex flex-col border border-line bg-surface rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-line bg-paper/40">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-kita-green" />
                  <h2 className="font-display text-base font-bold text-ink">
                    Orders in Progress
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="eyebrow text-xs text-muted">
                    {openOrders.length} {openOrders.length === 1 ? "order" : "orders"}
                  </span>
                  <Link
                    href="/seller/orders"
                    className="text-xs font-bold text-kita-green hover:underline"
                  >
                    Fulfillment Hub →
                  </Link>
                </div>
              </div>

              {openOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                  <span className="text-xs font-semibold text-ink">No active orders</span>
                  <p className="text-xs text-muted">
                    Pre-orders and pickup statuses will appear here in real time.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {openOrders.map((order) => {
                    const { intent, label } = orderStatus(order.status);
                    return (
                      <li
                        key={order.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-paper/40 transition-colors"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-sm text-ink">
                              {order.storeName}
                            </span>
                            <StatusPill intent={intent}>{label}</StatusPill>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                            <span className="font-mono">{order.order_number}</span>
                            <span>·</span>
                            <span>{formatDay(order.created_at)}</span>
                            {order.pickupLocation && (
                              <>
                                <span>·</span>
                                <span className="flex items-center gap-1 text-ink font-medium">
                                  <MapPin className="h-3 w-3 text-muted" />
                                  {order.pickupLocation}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <span className="font-mono text-base font-bold text-kita-green sm:text-right">
                          {PESO(Number(order.total_amount || 0))}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Best Sellers */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h2 className="font-display text-lg font-bold text-ink">
                  Best Sellers on Campus
                </h2>
                <Link
                  href="/protected/marketplace"
                  className="text-xs font-bold text-kita-green hover:underline"
                >
                  View All Marketplace →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {products.slice(0, 6).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>

        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    );
  }

  /* =========================================================================
     2. BUYER SHOPPING HOME (Editorial Flatline Layout with Live Order Tracking)
     ========================================================================= */
  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      {/* 1. Subtle Active Order Notification (Links to dedicated /protected/orders page) */}
      {activePickupOrder && (
        <div className="flex items-center justify-between gap-3 border border-line bg-paper px-4 py-2.5 text-xs rounded-xl">
          <div className="flex items-center gap-2 truncate">
            <span className="h-2 w-2 rounded-full bg-kita-green flex-shrink-0 animate-pulse" />
            <span className="text-ink truncate">
              Order <strong className="font-mono">{activePickupOrder.order_number}</strong> from{" "}
              <strong>{activePickupOrder.storeName}</strong> is {activePickupOrder.status === "READY_FOR_PICKUP" ? "ready for pickup" : "being prepared"}.
            </span>
          </div>
          <Link
            href="/protected/orders"
            className="font-bold text-kita-green hover:underline text-xs flex-shrink-0"
          >
            Track in My Orders →
          </Link>
        </div>
      )}

      {/* 2. Editorial Header & Search Bar */}
      <div className="flex flex-col gap-4 border-b border-line pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="eyebrow text-xs text-muted">{campusName}</span>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Campus Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-muted">
              Pre-order homemade pastries, drinks, crafts, and reviewers from verified high school entrepreneurs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/seller/verification"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-xs font-bold text-ink hover:bg-paper-deep transition-colors"
            >
              <Store className="h-4 w-4 text-muted" />
              <span>Become a Seller</span>
            </Link>
          </div>
        </div>

        {/* Clean Line-Ruled Search Bar */}
        <div className="relative mt-2 max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, ingredients, crafts, or store name..."
            className="h-10 w-full rounded-xl border border-line bg-surface pl-10 pr-4 text-xs font-medium text-ink placeholder:text-muted/60 focus:border-kita-green focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* 3. Category Horizontal Text Navigation Strip */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-line pb-2 -mx-1 px-1 scrollbar-none">
        {categories.map(({ name, slug }) => {
          const isSelected = selectedCategory === slug;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => setSelectedCategory(slug)}
              className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-colors rounded-lg ${
                isSelected
                  ? "bg-ink text-white"
                  : "text-muted hover:text-ink hover:bg-paper"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* 4. Instant Recess Pickup Stream (0m Wait) */}
      {selectedCategory === "all" && !searchQuery && instantPickupProducts.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base font-bold text-ink">
                Instant Pickup
              </h2>
              <span className="text-xs text-muted">· Ready for immediate handoff at recess</span>
            </div>
            <span className="text-xs font-mono font-bold text-kita-green">
              0m Preparation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {instantPickupProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. Featured Verified Campus Storefronts */}
      {selectedCategory === "all" && !searchQuery && featuredStores.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <h2 className="font-display text-base font-bold text-ink">
              Verified Student Storefronts
            </h2>
            <Link
              href="/protected/marketplace"
              className="text-xs font-bold text-kita-green hover:underline"
            >
              View All Stores →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredStores.map((store) => (
              <div
                key={store.id}
                className="flex items-center justify-between p-3.5 border border-line bg-surface rounded-xl hover:bg-paper/40 transition-colors"
              >
                <div className="flex items-center gap-3 truncate">
                  {store.logo_url ? (
                    <div className="relative h-9 w-9 rounded-lg overflow-hidden border border-line bg-paper shadow-xs flex-shrink-0">
                      <Image
                        src={store.logo_url}
                        alt={store.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-kita-green text-xs font-extrabold text-white flex-shrink-0">
                      {store.name.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                  <div className="flex flex-col truncate">
                    <span className="font-bold text-xs text-ink truncate">
                      {store.name}
                    </span>
                    <span className="text-xs text-muted truncate">
                      {store.pickup_locations || "Campus Handoff"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/protected/marketplace?store=${store.slug || store.id}`}
                  className="text-xs font-bold text-kita-green hover:underline flex-shrink-0 pl-2"
                >
                  Visit →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Main Catalog Feed */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-base font-bold text-ink">
              {selectedCategory === "all" ? "All Campus Products" : categories.find(c => c.slug === selectedCategory)?.name || "Catalog"}
            </h2>
            <span className="text-xs font-mono text-muted">
              ({filteredProducts.length})
            </span>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: "all", label: "All Items" },
              { id: "instant", label: "Instant Handoff" },
              { id: "top_rated", label: "Top Rated" },
              { id: "under_100", label: "Under ₱100" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id as typeof activeFilter)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
                  activeFilter === f.id
                    ? "bg-kita-green text-white"
                    : "border border-line bg-surface text-muted hover:text-ink hover:bg-paper"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-12 text-center border border-line bg-surface rounded-2xl">
            <span className="text-xs font-bold text-ink">No items found</span>
            <p className="text-xs text-muted">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="mt-2 text-xs font-bold text-kita-green hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
