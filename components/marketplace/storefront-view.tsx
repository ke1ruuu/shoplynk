"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  CreditCard,
  Star,
  CheckCircle2,
  ShieldCheck,
  Share2,
  Check,
  Settings,
  Plus,
  Package,
  Search,
  ArrowLeft,
} from "lucide-react";
import { ProductCard, ProductItem } from "./product-card";

export interface StorefrontData {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  gcash_name: string | null;
  gcash_number: string | null;
  pickup_locations: string | null;
  operating_hours: string | null;
  is_active: boolean;
  rating_avg: number;
  rating_count: number;
  created_at: string;
  owner?: {
    full_name: string;
    role: string;
    avatar_url: string | null;
  } | null;
}

interface StorefrontViewProps {
  store: StorefrontData;
  products: ProductItem[];
  isOwner: boolean;
}

export function StorefrontView({ store, products, isOwner }: StorefrontViewProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [copied, setCopied] = useState(false);

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/protected/marketplace");
    }
  }

  function handleCopyLink() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // Extract unique categories from products
  const categories = Array.from(
    new Map(
      products
        .filter((p) => p.category?.slug && p.category?.name)
        .map((p) => [p.category.slug, p.category.name])
    ).entries()
  ).map(([slug, name]) => ({ slug, name }));

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "all" || product.category?.slug === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
      return 0;
    });

  const memberYear = store.created_at
    ? new Date(store.created_at).getFullYear()
    : new Date().getFullYear();

  return (
    <div className="min-h-screen bg-paper text-ink pb-24">
      {/* Main Responsive Centered Container */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 flex flex-col gap-6">
        {/* 1. Inline Top Navigation & Quick Actions */}
        <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-kita-green transition-colors group cursor-pointer focus:outline-none"
            aria-label="Back to Marketplace"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Marketplace</span>
          </button>

          {/* Quick Actions (Share, Owner Studio Settings) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isOwner ? (
              <>
                <Link
                  href="/seller/settings"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-paper-deep"
                >
                  <Settings className="h-3.5 w-3.5 text-muted" />
                  <span>Store Settings</span>
                </Link>
                <Link
                  href="/seller/products/new"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-kita-green px-3.5 py-1.5 text-xs font-bold text-white shadow-flyer transition-all hover:bg-kita-green-deep active:scale-95"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Product</span>
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-paper-deep cursor-pointer"
                title="Share Storefront"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-kita-green" />
                    <span className="text-kita-green font-bold">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-muted" />
                    <span>Share Store</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* 2. Hero Brand Showcase Card */}
        <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-xs">
          {/* Top Brand Identity Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              {/* Store Avatar Logo */}
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border border-line bg-paper-deep overflow-hidden flex-shrink-0 flex items-center justify-center shadow-xs">
                {store.logo_url ? (
                  <Image
                    src={store.logo_url}
                    alt={store.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-kita-green text-white flex flex-col items-center justify-center font-display font-extrabold text-3xl">
                    <span>{store.name.charAt(0).toUpperCase()}</span>
                    <span className="pin -top-1 -right-1" aria-hidden="true" />
                  </div>
                )}
              </div>

              {/* Name, Badges & Headline */}
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
                    {store.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-kita-green-soft px-2.5 py-0.5 text-xs font-bold text-kita-green">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Verified Student Seller</span>
                  </span>
                </div>

                {/* Rating, Status & Campus */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted">
                  {store.rating_count > 0 ? (
                    <div className="flex items-center gap-1 font-semibold text-ink">
                      <Star className="h-4 w-4 fill-spark text-spark" />
                      <span className="font-mono font-bold">
                        {Number(store.rating_avg).toFixed(1)}
                      </span>
                      <span className="text-muted">({store.rating_count} reviews)</span>
                    </div>
                  ) : (
                    <span className="text-muted font-medium">New Campus Merchant</span>
                  )}

                  <span>•</span>
                  <span className="font-medium text-ink">LYFJSHS Campus</span>

                  <span>•</span>
                  <span className="font-semibold">
                    {store.is_active ? (
                      <span className="text-emerald-700 font-bold">● Open for orders</span>
                    ) : (
                      <span className="text-rose-600 font-bold">● Paused</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Store Bio / Tagline */}
          {store.description && (
            <p className="max-w-3xl text-sm sm:text-base text-ink leading-relaxed font-normal">
              {store.description}
            </p>
          )}

          {/* Key Information Ledger Strip (Line-Ruled 4-Cell Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden mt-2">
            {/* Cell 1: Pickup Spot */}
            <div className="bg-surface p-4 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-muted font-semibold">
                <MapPin className="h-3.5 w-3.5 text-kita-green" />
                <span>Campus Pickup Point</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink line-clamp-1">
                {store.pickup_locations || "LYFJSHS Main Lobby"}
              </p>
            </div>

            {/* Cell 2: Break Schedule */}
            <div className="bg-surface p-4 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-muted font-semibold">
                <Clock className="h-3.5 w-3.5 text-kita-green" />
                <span>Break Schedule</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink line-clamp-1">
                {store.operating_hours || "Recess & Lunch Handoffs"}
              </p>
            </div>

            {/* Cell 3: Payment Modes */}
            <div className="bg-surface p-4 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-muted font-semibold">
                <CreditCard className="h-3.5 w-3.5 text-kita-green" />
                <span>Accepted Payments</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink line-clamp-1">
                {store.gcash_number ? "GCash Pre-order & Cash" : "Cash on Pickup"}
              </p>
            </div>

            {/* Cell 4: Student Merchant Details */}
            <div className="bg-surface p-4 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-muted font-semibold">
                <ShieldCheck className="h-3.5 w-3.5 text-kita-green" />
                <span>Merchant Verification</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink line-clamp-1">
                Student Entrepreneur ({memberYear})
              </p>
            </div>
          </div>
        </div>

        {/* 3. Store Catalog Workspace Card */}
        <section className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-xs">
          {/* Header & Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-5">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-lg sm:text-xl font-bold text-ink">
                Store Catalog
              </h2>
              <span className="rounded-full bg-paper px-2.5 py-0.5 font-mono text-xs font-bold text-muted border border-line">
                {filteredProducts.length} {filteredProducts.length === 1 ? "listing" : "listings"}
              </span>
            </div>

            {/* Search Input & Sort Selector */}
            <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search store items..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-line bg-paper text-ink text-xs placeholder:text-muted focus:outline-none focus:border-kita-green focus:ring-1 focus:ring-kita-green transition-all"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-xl border border-line bg-paper px-3 py-2 text-xs font-semibold text-ink focus:outline-none focus:border-kita-green transition-colors"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Chips Navigation */}
          {categories.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-kita-green text-white shadow-xs"
                    : "bg-paper border border-line text-muted hover:text-ink hover:bg-paper-deep"
                }`}
              >
                All Items ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat.slug
                      ? "bg-kita-green text-white shadow-xs"
                      : "bg-paper border border-line text-muted hover:text-ink hover:bg-paper-deep"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-2">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-line bg-paper p-12 text-center flex flex-col items-center justify-center gap-3">
              <div className="h-12 w-12 rounded-full bg-surface border border-line flex items-center justify-center text-muted">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-ink">
                {searchQuery || selectedCategory !== "all"
                  ? "No matching listings found"
                  : "No active products available"}
              </h3>
              <p className="text-xs text-muted max-w-sm">
                {searchQuery || selectedCategory !== "all"
                  ? "Try clearing your search query or switching to another category."
                  : "This student merchant hasn't published active listings yet. Check back soon!"}
              </p>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-2 text-xs font-bold text-kita-green hover:underline cursor-pointer"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
