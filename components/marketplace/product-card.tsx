"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Clock, Store, CheckCircle2, Eye } from "lucide-react";
import { useFavorites } from "@/lib/favorites-context";

export interface ProductItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  status: "DRAFT" | "ACTIVE" | "OUT_OF_STOCK" | "ARCHIVED";
  prep_time_minutes: number | null;
  category: {
    name: string;
    slug: string;
  };
  store: {
    id: string;
    name: string;
    slug: string;
    logo_url: string | null;
    pickup_locations: string | null;
    rating_avg: number;
    rating_count: number;
    owner?: {
      full_name: string;
      role: string;
    };
  };
  images: {
    image_url: string;
    display_order: number;
  }[];
}

interface ProductCardProps {
  product: ProductItem;
  onSelect?: (product: ProductItem) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isLiked = isFavorite(product.id) || (!!product.slug && isFavorite(product.slug));

  const mainImageUrl =
    product.images && product.images.length > 0
      ? product.images[0].image_url
      : "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80";

  const productHref = `/protected/marketplace/product/${product.slug || product.id}`;
  const categoryHref = `/protected/marketplace/category/${product.category?.slug || "all"}`;

  return (
    <article className="group flex flex-col justify-between bg-surface border-b sm:border border-line sm:rounded-2xl p-4 sm:p-5 transition-colors hover:border-kita-green/40 hover:bg-paper/30">
      {/* 1. Image Container (Nike/Amazon Aspect Ratio) */}
      <div className="relative w-full aspect-[4/3] bg-paper-deep overflow-hidden rounded-xl mb-3.5">
        <Link href={productHref} className="block relative w-full h-full">
          <Image
            src={mainImageUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Category Tag Overlay */}
        <Link
          href={categoryHref}
          className="absolute top-2.5 left-2.5 z-10 eyebrow text-xs text-ink bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm hover:text-kita-green transition-colors"
        >
          {product.category?.name || "Category"}
        </Link>

        {/* Favorite Heart Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product);
          }}
          aria-label={isLiked ? `Remove ${product.title} from favorites` : `Save ${product.title} to favorites`}
          className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 backdrop-blur-md shadow-sm hover:scale-110 active:scale-90 transition-all"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isLiked ? "fill-rose-500 text-rose-500" : "text-muted hover:text-ink"
            }`}
          />
        </button>

        {/* Quick View Button Overlay on Hover */}
        {onSelect && (
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="absolute bottom-2.5 right-2.5 z-10 hidden group-hover:flex items-center gap-1.5 text-xs font-bold text-ink bg-surface/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm hover:text-kita-green transition-all"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Quick View</span>
          </button>
        )}

        {/* Low Stock Badge */}
        {product.stock <= 3 && product.stock > 0 && (
          <span className="absolute bottom-2.5 left-2.5 rounded-md bg-amber-500/90 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* 2. Flatline Text Hierarchy */}
      <div className="flex flex-col flex-1 justify-between gap-2.5">
        <div className="flex flex-col gap-1">
          {/* Store & Verified Indicator */}
          <div className="flex items-center justify-between text-xs text-muted">
            <Link
              href={`/protected/marketplace/store/${product.store?.slug || product.store?.id}`}
              className="font-semibold truncate text-muted hover:text-kita-green transition-colors"
            >
              {product.store?.name}
            </Link>
            <div className="flex items-center gap-1 text-kita-green font-bold flex-shrink-0">
              <CheckCircle2 className="h-3 w-3" />
              <span className="text-xs">Verified</span>
            </div>
          </div>

          {/* Product Title */}
          <Link
            href={productHref}
            className="font-display font-bold text-base text-ink line-clamp-1 group-hover:text-kita-green transition-colors"
          >
            {product.title}
          </Link>

          {/* Short Description */}
          {product.description && (
            <p className="text-xs text-muted line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* 3. Price & Pickup Logistics Bottom Strip */}
        <div className="mt-auto flex items-center justify-between pt-2.5 border-t border-line">
          <Link href={productHref} className="font-mono text-lg font-bold text-kita-green leading-none">
            ₱{Number(product.price).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </Link>

          <span className="text-xs font-semibold text-muted">
            {product.prep_time_minutes === 0 || !product.prep_time_minutes
              ? "⚡ Instant"
              : `⏳ ${product.prep_time_minutes}m prep`}
          </span>
        </div>
      </div>
    </article>
  );
}
