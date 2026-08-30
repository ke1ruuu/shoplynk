"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Store, X } from "lucide-react";
import {
  MarketplaceSearchBar,
  MarketplaceSidebarFilters,
  Category,
} from "./marketplace-filters";
import { ProductCard, ProductItem } from "./product-card";
import { ProductDetailModal } from "./product-detail-modal";

interface MarketplaceViewProps {
  initialCategories: Category[];
  initialProducts: ProductItem[];
  userRole: string;
  showCta?: boolean;
}

export function MarketplaceView({
  initialCategories,
  initialProducts,
  userRole,
  showCta = false,
}: MarketplaceViewProps) {
  const categoriesList = initialCategories || [];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeProductList = initialProducts || [];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return activeProductList
      .filter((p) => {
        // Category match
        if (selectedCategory !== "all" && p.category?.slug !== selectedCategory) {
          return false;
        }

        // Search match (title, description, store name)
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const titleMatch = p.title.toLowerCase().includes(q);
          const descMatch = p.description?.toLowerCase().includes(q) ?? false;
          const storeMatch = p.store?.name.toLowerCase().includes(q) ?? false;
          if (!titleMatch && !descMatch && !storeMatch) return false;
        }

        // Min price match
        if (minPrice !== "" && p.price < Number(minPrice)) {
          return false;
        }

        // Max price match
        if (maxPrice !== "" && p.price > Number(maxPrice)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0; // default newest
      });
  }, [activeProductList, selectedCategory, searchQuery, sortBy, minPrice, maxPrice]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    searchQuery.trim() !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    sortBy !== "newest";

  function handleClearFilters() {
    setSelectedCategory("all");
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  }

  const selectedCategoryName =
    selectedCategory === "all"
      ? "All Campus Listings"
      : categoriesList.find((c) => c.slug === selectedCategory)?.name || "Category Items";

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Top Search Bar */}
      <MarketplaceSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleMobileFilters={() => setMobileFiltersOpen(true)}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 2. Layout Grid: Left Sidebar Filter Panel + Right Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Desktop Sidebar Filter Panel (3 Cols) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-20">
          <MarketplaceSidebarFilters
            categories={categoriesList}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl bg-surface p-4 shadow-flyer-lg">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="absolute top-4 right-4 text-muted hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
              <MarketplaceSidebarFilters
                categories={categoriesList}
                selectedCategory={selectedCategory}
                onSelectCategory={(slug) => {
                  setSelectedCategory(slug);
                  setMobileFiltersOpen(false);
                }}
                sortBy={sortBy}
                onSortChange={(s) => {
                  setSortBy(s);
                  setMobileFiltersOpen(false);
                }}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
                onClearFilters={handleClearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </div>
        )}

        {/* Right Main Content Area (9 Cols) */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {/* Results Header */}
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-xl font-extrabold text-ink">
              {selectedCategoryName}
            </h2>
            <span className="eyebrow text-muted">
              {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Flatline Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={(p) => setActiveModalProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center rounded-2xl border border-line bg-corkboard shadow-flyer">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper-deep text-kita-green">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1.5 max-w-md">
                <h3 className="font-display text-xl font-bold text-ink">
                  Welcome to the Project Kita Beta!
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {searchQuery || minPrice || maxPrice
                    ? "No live listings match your filter choices. Try clearing your search parameters or toggling Demo Mode."
                    : "No student sellers have published listings in this category yet. Are you a student entrepreneur? Get verified and open your storefront to list your products first!"}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-line bg-surface px-4 text-xs font-semibold text-ink shadow-flyer hover:bg-paper"
                  >
                    Clear all filters
                  </button>
                )}
                <Link
                  href="/seller/verification"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-kita-green px-4 text-xs font-semibold text-white shadow-flyer hover:bg-kita-green-deep"
                >
                  <Store className="h-3.5 w-3.5" />
                  <span>Start Selling on Campus</span>
                </Link>
              </div>
            </div>
          )}

          {/* Seller Verification CTA Section */}
          {showCta && userRole !== "SELLER" && (
            <section className="relative overflow-hidden rounded-2xl border border-spark/50 bg-spark-soft/50 p-6 sm:p-8 shadow-flyer mt-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-xl">
                  <span className="eyebrow text-spark-ink flex items-center gap-1.5">
                    <Store className="h-3.5 w-3.5" />
                    Student Entrepreneurship
                  </span>
                  <h2 className="font-display text-2xl font-extrabold text-ink leading-tight">
                    Turn your products, crafts, or skills into kita.
                  </h2>
                  <p className="text-sm text-muted leading-relaxed">
                    Open a verified storefront, list your products, track inquiries, and sell directly to students and faculty in your campus community.
                  </p>
                </div>
                <Link
                  href="/seller/verification"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-kita-green px-6 py-3.5 text-base font-semibold text-white shadow-flyer hover:bg-kita-green-deep transition-all flex-shrink-0"
                >
                  <span>Get Verified to Sell</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Product Quick-View Inspection Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </div>
  );
}
