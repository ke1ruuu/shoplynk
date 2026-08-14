"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { VerificationBadge, SellerType } from "./verification-badge";

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  sellerName: string;
  sellerType: SellerType;
  imageUrl: string;
  category: string;
  initialLiked?: boolean;
  /** Optional Tailwind rotate class (e.g. "-rotate-2") for the pinned-board look. */
  tiltClass?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  food: "Food",
  fashion: "Fashion",
  supplies: "Supplies",
  services: "Service",
  digital: "Creative",
  electronics: "Tech",
  other: "Other",
};

export function ProductCard({
  title,
  price,
  sellerName,
  sellerType,
  imageUrl,
  category,
  initialLiked = false,
  tiltClass = "",
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const label = CATEGORY_LABELS[category] ?? "Listing";

  return (
    <div
      data-category={category}
      className={`group relative bg-surface rounded-2xl border border-line shadow-flyer transition-all duration-300 hover:shadow-flyer-lg hover:-translate-y-1.5 hover:rotate-0 flex flex-col h-full ${tiltClass}`}
    >
      {/* Pushpin — the flyer is tacked to the board */}
      <span
        className="pin left-1/2 -translate-x-1/2 -top-1.5 z-20"
        aria-hidden="true"
      />

      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-paper-deep overflow-hidden rounded-t-2xl">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />

        {/* Category tag */}
        <span className="absolute top-2.5 left-2.5 eyebrow text-[0.6rem] tracking-[0.12em] text-ink bg-white/85 backdrop-blur-sm px-2 py-1 rounded-md">
          {label}
        </span>

        {/* Favorite */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          aria-pressed={isLiked}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-kita-green ${
            isLiked
              ? "bg-white text-rose-500 shadow-sm"
              : "bg-white/85 text-ink/70 hover:bg-white hover:text-ink"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isLiked ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[15px] text-ink line-clamp-1 group-hover:text-kita-green transition-colors">
            {title}
          </h3>
        </div>

        <div className="mt-auto">
          <div className="tabular text-lg font-bold text-ink leading-none">
            ₱{price.toLocaleString()}
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-dashed border-line flex flex-col gap-1.5">
            <span className="text-xs text-muted truncate">by {sellerName}</span>
            <VerificationBadge type={sellerType} />
          </div>
        </div>
      </div>
    </div>
  );
}
