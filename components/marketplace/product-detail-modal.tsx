"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Store,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  ShoppingBag,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { ProductItem } from "./product-card";

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const images =
    product.images && product.images.length > 0
      ? product.images.map((img) => img.image_url)
      : [
          "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        ];

  const currentImage = images[selectedImageIndex] || images[0];

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface shadow-flyer-lg max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-ink shadow-flyer hover:bg-surface focus-visible:outline-kita-green"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col bg-paper-deep p-4 justify-between gap-3">
          <div className="relative aspect-[4/3] md:aspect-square w-full overflow-hidden rounded-xl bg-paper">
            <Image
              src={currentImage}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="absolute top-3 left-3 eyebrow text-[0.65rem] tracking-[0.14em] text-ink bg-surface/90 backdrop-blur-md px-3 py-1 rounded-md shadow-sm">
              {product.category.name}
            </span>
          </div>

          {/* Image Thumbnails if multiple exist */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-kita-green ring-2 ring-kita-green/30"
                      : "border-line opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Actions */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between gap-6 overflow-y-auto max-h-[60vh] md:max-h-none">
          <div className="flex flex-col gap-4">
            {/* Store & Verification Header */}
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-kita-green-soft text-kita-green">
                  <Store className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm text-ink leading-tight">
                    {product.store.name}
                  </span>
                  <span className="text-xs text-muted">
                    {product.store.owner?.full_name || "Verified Campus Seller"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-kita-green-soft px-2.5 py-1 text-xs font-bold text-kita-green">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verified Seller</span>
              </div>
            </div>

            {/* Product Title & Rating */}
            <div className="flex flex-col gap-1.5">
              <h2 className="font-display text-2xl font-extrabold text-ink leading-tight">
                {product.title}
              </h2>
              {product.store.rating_count > 0 && (
                <div className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <Star className="h-4 w-4 fill-spark text-spark" />
                  <span>{Number(product.store.rating_avg).toFixed(1)}</span>
                  <span className="text-xs text-muted">
                    ({product.store.rating_count} store reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price Snapshot */}
            <div className="tabular text-3xl font-extrabold text-ink">
              ₱{Number(product.price).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-muted leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Key Logistics Meta */}
            <div className="flex flex-col gap-2 rounded-xl bg-paper p-3 text-xs text-muted border border-line">
              {product.prep_time_minutes && product.prep_time_minutes > 0 ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-kita-green flex-shrink-0" />
                  <span>
                    Prep time: <strong>{product.prep_time_minutes} minutes</strong>
                  </span>
                </div>
              ) : null}
              {product.store.pickup_locations && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-kita-green flex-shrink-0 mt-0.5" />
                  <span>
                    Pickup locations: <strong>{product.store.pickup_locations}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quantity Controls & Add to Cart Action */}
          <div className="flex flex-col gap-3 pt-4 border-t border-line">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Quantity</span>
              <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-ink disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="tabular text-sm font-bold text-ink w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                  disabled={quantity >= (product.stock || 99)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-ink disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`group flex h-12 w-full items-center justify-center gap-2 rounded-xl text-base font-semibold transition-all shadow-flyer ${
                added
                  ? "bg-kita-green-deep text-white"
                  : "bg-kita-green text-white hover:bg-kita-green-deep"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add {quantity} to Cart · ₱{(product.price * quantity).toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
