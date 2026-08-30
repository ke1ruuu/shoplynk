"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  Search,
  Trash2,
  Package,
} from "lucide-react";
import { useFavorites } from "@/lib/favorites-context";
import { ProductCard, ProductItem } from "@/components/marketplace/product-card";
import { ProductDetailModal } from "@/components/marketplace/product-detail-modal";

export function FavoritesView() {
  const { favorites, clearFavorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return favorites;
    const q = searchQuery.toLowerCase();
    return favorites.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.store?.name?.toLowerCase().includes(q) ||
        p.category?.name?.toLowerCase().includes(q)
    );
  }, [favorites, searchQuery]);

  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-rose-500">
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            <span className="eyebrow">Saved Wishlist</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            My Saved Favorites
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Quickly re-order and track your favorite campus pastries, cold brews, and school merchandise.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {favorites.length > 0 && (
            <button
              type="button"
              onClick={clearFavorites}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 text-xs font-bold text-muted hover:text-rose-700 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear All</span>
            </button>
          )}

          <Link
            href="/protected/marketplace"
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-kita-green px-4 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all active:scale-95"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Marketplace</span>
          </Link>
        </div>
      </div>

      {/* 2. Search & Counter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs text-ink">
            {favorites.length} {favorites.length === 1 ? "Saved Item" : "Saved Items"}
          </span>
        </div>

        {favorites.length > 0 && (
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in your saved items..."
              className="h-9 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-xs font-semibold text-ink placeholder:text-muted/60 focus:border-kita-green focus:outline-none transition-colors"
            />
          </div>
        )}
      </div>

      {/* 3. Favorites Grid / Empty State */}
      {filteredFavorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 p-16 text-center border border-line bg-surface rounded-2xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-paper border border-line text-muted">
            <Heart className="h-7 w-7 text-rose-400" />
          </div>
          <h2 className="font-display text-base font-bold text-ink">
            {favorites.length === 0 ? "No saved favorites yet" : "No matches found in your favorites"}
          </h2>
          <p className="text-xs text-muted max-w-sm leading-relaxed">
            {favorites.length === 0
              ? "Tap the heart icon on any campus product to save it here for quick 1-click pre-ordering during break bells."
              : "Try searching with different keywords or clear your search."}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredFavorites.map((product) => (
            <ProductCard
              key={product.id || product.slug}
              product={product}
              onSelect={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
