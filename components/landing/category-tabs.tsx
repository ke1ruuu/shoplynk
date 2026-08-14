"use client";

import React from "react";
import {
  LayoutGrid,
  Utensils,
  ShoppingBag,
  BookOpen,
  Briefcase,
  Palette,
  Laptop,
  Sparkles,
} from "lucide-react";

export interface CategoryItem {
  id: string;
  name: string;
  icon: React.ElementType;
}

export const CATEGORIES: CategoryItem[] = [
  { id: "all", name: "All", icon: LayoutGrid },
  { id: "food", name: "Food", icon: Utensils },
  { id: "fashion", name: "Fashion & Accessories", icon: ShoppingBag },
  { id: "supplies", name: "School Supplies", icon: BookOpen },
  { id: "services", name: "Services", icon: Briefcase },
  { id: "digital", name: "Digital & Creative", icon: Palette },
  { id: "electronics", name: "Electronics", icon: Laptop },
  { id: "other", name: "Other", icon: Sparkles },
];

interface CategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryTabs({
  activeCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none pb-1">
      <div className="flex items-center gap-2.5 min-w-max">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 px-4 h-11 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-kita-green text-white shadow-flyer"
                  : "bg-surface border border-line text-muted hover:text-ink hover:border-kita-green/40"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
