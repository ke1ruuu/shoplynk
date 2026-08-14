"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Clock, Store, CheckCircle2, Eye } from "lucide-react";

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
  onSelect: (product: ProductItem) => void;
  tiltClass?: string;
}

export function ProductCard({ product, onSelect, tiltClass = "" }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const mainImageUrl =
    product.images && product.images.length > 0
      ? product.images[0].image_url
      : "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80";

  const productHref = `/protected/marketplace/product/${product.slug || product.id}`;
  const categoryHref = `/protected/marketplace/category/${product.category?.slug || "all"}`;

  return (
    <div
      className={`group relative flex flex-col justify-between h-full bg-surface rounded-2xl border border-line shadow-flyer transition-all duration-300 hover:shadow-flyer-lg hover:-translate-y-1.5 hover:rotate-0 ${tiltClass}`}
    >
      {/* Bulletin board pushpin motif */}
      <span
        className="pin left-1/2 -translate-x-1/2 -top-1.5 z-20"
        aria-hidden="true"
      />

      {/* Image container */}
      <div className="relative w-full aspect-[4/3] bg-paper-deep overflow-hidden rounded-t-2xl">
        <Link href={productHref} className="block relative w-full h-full">
          <Image
            src={mainImageUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Category tag */}
        <Link
          href={categoryHref}
          className="absolute top-2.5 left-2.5 z-10 eyebrow text-[0.6rem] tracking-[0.12em] text-ink bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm hover:bg-white hover:text-kita-green transition-colors"
        >
          {product.category?.name || "Category"}
        </Link>

        {/* Quick View Button Overlay */}
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="absolute bottom-2.5 right-2.5 z-10 hidden group-hover:flex items-center gap-1 text-[0.65rem] font-bold text-ink bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm hover:bg-white hover:text-kita-green transition-all"
        >
          <Eye className="h-3 w-3" />
          <span>Quick View</span>
        </button>

        {/* Stock / Prep Time Overlay */}
        {product.stock <= 3 && product.stock > 0 && (
          <span className="absolute bottom-2.5 left-2.5 rounded-md bg-amber-500/90 px-2 py-0.5 text-[0.65rem] font-bold text-white backdrop-blur-sm">
            Only {product.stock} left
          </span>
        )}

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          aria-pressed={isLiked}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-kita-green ${
            isLiked
              ? "bg-surface text-rose-500 shadow-sm"
              : "bg-surface/85 text-ink/70 hover:bg-surface hover:text-ink"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isLiked ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>
      </div>

      {/* Content details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Link
            href={productHref}
            className="font-display font-bold text-base text-ink line-clamp-1 group-hover:text-kita-green transition-colors"
          >
            {product.title}
          </Link>
          {product.description && (
            <p className="text-xs text-muted line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2.5 pt-2 border-t border-dashed border-line">
          {/* Price & Rating */}
          <div className="flex items-center justify-between">
            <Link href={productHref} className="tabular text-xl font-bold text-ink leading-none hover:text-kita-green">
              ₱{Number(product.price).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </Link>
            {product.store?.rating_count > 0 ? (
              <div className="flex items-center gap-1 text-xs font-semibold text-ink">
                <Star className="h-3.5 w-3.5 fill-spark text-spark" />
                <span>{Number(product.store.rating_avg).toFixed(1)}</span>
                <span className="text-muted">({product.store.rating_count})</span>
              </div>
            ) : (
              <span className="text-[0.65rem] font-medium text-muted">New Store</span>
            )}
          </div>

          {/* Store & Seller identity */}
          <div className="flex items-center justify-between text-xs text-muted">
            <div className="flex items-center gap-1.5 truncate">
              <Store className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
              <span className="font-semibold text-ink truncate">
                {product.store?.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-kita-green text-[0.65rem] font-bold flex-shrink-0">
              <CheckCircle2 className="h-3 w-3" />
              <span>Verified</span>
            </div>
          </div>

          {/* Prep time badge if available */}
          {product.prep_time_minutes && product.prep_time_minutes > 0 ? (
            <div className="flex items-center gap-1 text-[0.65rem] text-muted">
              <Clock className="h-3 w-3 text-muted flex-shrink-0" />
              <span>Prep: {product.prep_time_minutes} mins</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
