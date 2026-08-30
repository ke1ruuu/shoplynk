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
 * Flatline Top Search Bar
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
          placeholder="Search campus catalog, snacks, stationery, binders, or merchandise…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 pl-11 pr-10 rounded-xl border-line bg-surface text-sm text-ink placeholder:text-muted focus-visible:ring-kita-green"
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
          className={`lg:hidden flex h-11 items-center gap-2 rounded-xl border px-4 text-xs font-bold transition-all ${
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
 * Flatline Left Rail Filter Panel (Nike / Amazon line-ruled style)
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
    <div className="flex flex-col gap-5 border border-line bg-surface p-5 rounded-2xl">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider">
          Filter Catalog
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-xs font-semibold text-kita-green hover:underline flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {/* 1. Categories Filter Section */}
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-xs text-muted">Categories</span>

        <div className="flex flex-col gap-0.5">
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-all text-left ${
              selectedCategory === "all"
                ? "bg-kita-green-soft text-kita-green font-bold"
                : "text-muted hover:text-ink hover:bg-paper"
            }`}
          >
            <span>All Categories</span>
          </button>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-all text-left ${
                  isActive
                    ? "bg-kita-green-soft text-kita-green font-bold"
                    : "text-muted hover:text-ink hover:bg-paper"
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sort / Arrivals Section */}
      <div className="flex flex-col gap-2 border-t border-line pt-4">
        <span className="eyebrow text-xs text-muted">Sort By</span>

        <div className="flex flex-col gap-1">
          {SORT_OPTIONS.map((opt) => {
            const isSelected = sortBy === opt.id;
            return (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-all ${
                  isSelected
                    ? "bg-kita-green-soft text-kita-green font-bold"
                    : "text-muted hover:text-ink hover:bg-paper"
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
      <div className="flex flex-col gap-2 border-t border-line pt-4">
        <span className="eyebrow text-xs text-muted">Price Range</span>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-muted">
              ₱
            </span>
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="h-8 pl-6 pr-2 rounded-lg text-xs bg-paper border-line"
            />
          </div>
          <span className="text-xs text-muted">–</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-muted">
              ₱
            </span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="h-8 pl-6 pr-2 rounded-lg text-xs bg-paper border-line"
            />
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-1 w-full rounded-xl border border-line bg-paper py-2 text-xs font-bold text-ink hover:bg-paper-deep transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
