"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, ProductCardProps } from "@/components/common/product-card";
import { CategoryTabs } from "./category-tabs";

const SAMPLE_PRODUCTS: ProductCardProps[] = [
  {
    id: "1",
    title: "Chocolate Chip Cookies",
    price: 50,
    sellerName: "Maria Santos",
    sellerType: "Student",
    category: "food",
    imageUrl:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2",
    title: "Canvas Tote Bag",
    price: 180,
    sellerName: "Ethan Reyes",
    sellerType: "Student",
    category: "fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "3",
    title: "Day Notes: Physics",
    price: 120,
    sellerName: "Prof. Jenna Lim",
    sellerType: "Faculty",
    category: "supplies",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "4",
    title: "Iced Caramel Latte",
    price: 70,
    sellerName: "Cafe Bandala",
    sellerType: "Student",
    category: "food",
    imageUrl:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "5",
    title: "Graphic Design Service",
    price: 250,
    sellerName: "Miguel Dela Cruz",
    sellerType: "Student",
    category: "digital",
    imageUrl:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
  },
];

export function MarketplaceSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? SAMPLE_PRODUCTS
      : SAMPLE_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="marketplace" className="py-16 md:py-24 bg-paper scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-kita-green">The marketplace</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink">
              What&apos;s selling on campus
            </h2>
            <p className="text-base text-muted max-w-lg">
              Real products and services from verified students and faculty — no outsiders.
            </p>
          </div>

          <Link
            href="#marketplace"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-kita-green hover:text-kita-green-deep transition-colors self-start md:self-auto"
          >
            View all listings
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category rail */}
        <div className="mb-9">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="reveal h-full">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-corkboard rounded-2xl border border-line">
            <p className="text-ink font-semibold">Nothing pinned here yet</p>
            <p className="text-muted text-sm mt-1">
              No listings in this category. Check back soon — or be the first to post one.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
