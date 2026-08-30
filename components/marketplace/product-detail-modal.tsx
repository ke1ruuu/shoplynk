"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  ArrowRight,
  Heart,
} from "lucide-react";
import { ProductItem } from "./product-card";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

const PESO = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const isLiked = !!product && (isFavorite(product.id) || (!!product.slug && isFavorite(product.slug)));

  if (!product) return null;

  const images =
    product.images && product.images.length > 0
      ? product.images.map((img) => img.image_url)
      : [
          "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        ];

  const currentImage = images[selectedImageIndex] || images[0];
  const isOutOfStock = product.stock <= 0;

  function handleAddToCart() {
    if (!product || isOutOfStock) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  }

  function handleBuyNow() {
    if (!product || isOutOfStock) return;
    addItem(product, quantity);
    onClose();
    router.push("/protected/marketplace/checkout");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-ink/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:text-ink hover:bg-paper transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col bg-paper p-4 justify-between gap-3 border-b md:border-b-0 md:border-r border-line">
          <div className="relative aspect-[4/3] md:aspect-square w-full overflow-hidden rounded-xl bg-paper-deep border border-line">
            <Image
              src={currentImage}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="absolute top-3 left-3 eyebrow text-xs text-ink bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm border border-line">
              {product.category?.name || "Product"}
            </span>
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border transition-all ${
                    selectedImageIndex === idx
                      ? "border-kita-green ring-2 ring-kita-green/30 scale-105"
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
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between gap-5 overflow-y-auto max-h-[60vh] md:max-h-none">
          <div className="flex flex-col gap-4">
            {/* Store & Verification Header */}
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-kita-green text-xs font-extrabold text-white">
                  {product.store.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-display font-bold text-xs text-ink leading-tight truncate">
                    {product.store.name}
                  </span>
                  <span className="text-xs text-muted">
                    {product.store.owner?.full_name || "Verified Campus Seller"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-kita-green-soft px-2.5 py-0.5 text-xs font-bold text-kita-green">
                <CheckCircle2 className="h-3 w-3" />
                <span>Verified</span>
              </div>
            </div>

            {/* Product Title & Rating */}
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-xl font-extrabold text-ink leading-tight">
                {product.title}
              </h2>
              {product.store.rating_count > 0 && (
                <div className="flex items-center gap-1 text-xs font-semibold text-ink">
                  <span className="text-amber-500">★ {Number(product.store.rating_avg).toFixed(1)}</span>
                  <span className="text-muted">
                    ({product.store.rating_count} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price Snapshot */}
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-ink">
              {PESO(Number(product.price))}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-xs text-muted leading-relaxed line-clamp-3">
                {product.description}
              </p>
            )}

            {/* Key Logistics Meta */}
            <div className="flex flex-col gap-1.5 rounded-xl bg-paper p-3 text-xs text-muted border border-line">
              <div className="flex items-center gap-1.5 text-ink">
                <Clock className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
                <span>
                  {product.prep_time_minutes === 0 || !product.prep_time_minutes
                    ? "Instant Handoff (0m wait)"
                    : `Preparation time: ${product.prep_time_minutes} minutes`}
                </span>
              </div>
              {product.store.pickup_locations && (
                <div className="flex items-start gap-1.5 text-ink">
                  <MapPin className="h-3.5 w-3.5 text-kita-green flex-shrink-0 mt-0.5" />
                  <span className="truncate">
                    Pickup: <strong>{product.store.pickup_locations}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quantity Controls & Add to Cart Action */}
          <div className="flex flex-col gap-3 pt-3 border-t border-line">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink">Quantity</span>
              <div className="flex items-center border border-line rounded-lg bg-paper">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="flex h-7 w-7 items-center justify-center text-muted hover:text-ink disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="font-mono text-xs font-bold text-ink px-2.5">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                  disabled={quantity >= (product.stock || 99) || isOutOfStock}
                  className="flex h-7 w-7 items-center justify-center text-muted hover:text-ink disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 flex h-10 items-center justify-center gap-1.5 rounded-xl border border-kita-green bg-kita-green-soft px-3 text-xs font-bold text-kita-green hover:bg-kita-green hover:text-white transition-all disabled:opacity-40"
              >
                {added ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="flex-1 flex h-10 items-center justify-center gap-1.5 rounded-xl bg-kita-green px-3 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all disabled:opacity-40 active:scale-98"
              >
                <span>Buy Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => product && toggleFavorite(product)}
                aria-label={isLiked ? "Remove from favorites" : "Save to favorites"}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                  isLiked
                    ? "border-rose-500 bg-rose-500/10 text-rose-500"
                    : "border-line bg-paper text-muted hover:text-ink hover:bg-paper-deep"
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
