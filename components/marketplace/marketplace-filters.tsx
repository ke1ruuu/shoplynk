"use client";

import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown, X, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

interface MarketplaceSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleMobileFilters?: () => void;
  hasActiveFilters?: boolean;
}

/**
 * Top Search Bar — stands alone at the top of the marketplace page.
 */
export function MarketplaceSearchBar({
  searchQuery,
  onSearchChange,
  onToggleMobileFilters,
  hasActiveFilters = false,
}: MarketplaceSearchBarProps) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
        <Input
          type="search"
          placeholder="Search products, treats, notes, or services across campus…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 pl-11 pr-10 rounded-2xl border-line bg-surface text-base text-ink placeholder:text-muted shadow-flyer focus-visible:ring-kita-green"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Mobile Filter Toggle Button */}
      {onToggleMobileFilters && (
        <button
          type="button"
          onClick={onToggleMobileFilters}
          className={`lg:hidden flex h-12 items-center gap-2 rounded-2xl border px-4 text-sm font-semibold shadow-flyer transition-all ${
            hasActiveFilters
              ? "border-kita-green bg-kita-green-soft text-kita-green"
              : "border-line bg-surface text-ink hover:bg-paper"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      )}
    </div>
  );
}

interface MarketplaceSidebarFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  sortBy: "newest" | "price-asc" | "price-desc";
  onSortChange: (sort: "newest" | "price-asc" | "price-desc") => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const SORT_OPTIONS: { id: "newest" | "price-asc" | "price-desc"; label: string }[] = [
  { id: "newest", label: "Newest Arrivals" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

/**
 * Left Sidebar Filter Panel — houses Categories, Sort/Arrivals, Price Range, and Reset.
 */
export function MarketplaceSidebarFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onClearFilters,
  hasActiveFilters,
}: MarketplaceSidebarFiltersProps) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-5 shadow-flyer">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-kita-green" />
          <h3 className="font-display text-base font-extrabold text-ink">
            Filters
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-xs font-semibold text-kita-green hover:underline flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Reset all
          </button>
        )}
      </div>

      {/* 1. Categories Filter Section */}
      <div className="flex flex-col gap-2.5">
        <span className="eyebrow text-xs text-muted flex items-center gap-1.5">
          <Tag className="h-3 w-3 text-kita-green" />
          Categories
        </span>

        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
              selectedCategory === "all"
                ? "bg-kita-green text-white shadow-flyer"
                : "text-muted hover:bg-paper hover:text-ink"
            }`}
          >
            <span>All Items</span>
          </button>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-kita-green text-white shadow-flyer"
                    : "text-muted hover:bg-paper hover:text-ink"
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sort / Arrivals Section */}
      <div className="flex flex-col gap-2.5 border-t border-line pt-4">
        <span className="eyebrow text-xs text-muted flex items-center gap-1.5">
          <ArrowUpDown className="h-3 w-3 text-kita-green" />
          Sort By
        </span>

        <div className="flex flex-col gap-1">
          {SORT_OPTIONS.map((opt) => {
            const isSelected = sortBy === opt.id;
            return (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-kita-green-soft text-kita-green font-bold"
                    : "text-muted hover:bg-paper hover:text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="sidebarSort"
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => onSortChange(opt.id)}
                  className="sr-only"
                />
                <span
                  className={`h-2 w-2 rounded-full transition-all ${
                    isSelected ? "bg-kita-green" : "bg-line"
                  }`}
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Price Range Section */}
      <div className="flex flex-col gap-2.5 border-t border-line pt-4">
        <span className="eyebrow text-xs text-muted">Price Range</span>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted">
              ₱
            </span>
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="h-9 pl-6 pr-2 rounded-lg text-xs"
            />
          </div>
          <span className="text-xs text-muted">–</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted">
              ₱
            </span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="h-9 pl-6 pr-2 rounded-lg text-xs"
            />
          </div>
        </div>
      </div>

      {/* Reset Button at bottom of sidebar panel */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-2 w-full rounded-xl border border-line bg-paper py-2.5 text-xs font-semibold text-ink hover:bg-surface transition-colors"
        >
          Reset all filters
        </button>
      )}
    </div>
  );
}
