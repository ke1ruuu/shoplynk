"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Store,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  ShoppingBag,
  ShieldCheck,
  Share2,
  Plus,
  Minus,
  Check,
  ArrowRight,
  Heart,
  MessageSquare,
} from "lucide-react";
import { ProductItem } from "@/components/marketplace/product-card";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { StoreChatModal } from "@/components/messages/store-chat-modal";

interface ProductDetailViewProps {
  product: ProductItem;
}

const PESO = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const isLiked = isFavorite(product.id) || (!!product.slug && isFavorite(product.slug));

  const images =
    product.images && product.images.length > 0
      ? product.images.map((img) => img.image_url)
      : [
          "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        ];

  const maxStock = product.stock > 0 ? product.stock : 1;
  const isOutOfStock = product.stock <= 0;

  function handleQuantityChange(delta: number) {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > maxStock) return maxStock;
      return next;
    });
  }

  function handleAddToCart() {
    if (isOutOfStock) return;
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  }

  function handleBuyNow() {
    if (isOutOfStock) return;
    addItem(product, quantity);
    router.push("/protected/marketplace/checkout");
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.title} — Project Kita`,
          text: `Check out ${product.title} on Project Kita Campus Marketplace`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Navigation Back & Actions */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <Link
          href="/protected/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-bold text-ink shadow-sm hover:bg-paper transition-colors"
          >
            {isCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-kita-green" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-paper-deep shadow-sm">
            <Image
              src={images[selectedImageIndex] || images[0]}
              alt={product.title}
              fill
              priority
              className="object-cover transition-all duration-300"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <span className="absolute top-4 left-4 eyebrow text-xs text-ink bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-line">
              {product.category?.name || "Product"}
            </span>
          </div>

          {/* Thumbnail selector if multiple images exist */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
              {images.map((img, idx) => {
                const isSelected = selectedImageIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-kita-green ring-2 ring-kita-green/20 scale-105"
                        : "border-line opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Info & Checkout Box (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col gap-5">
            {/* Store & Seller Badge Header */}
            <div className="flex items-center justify-between border-b border-line pb-4">
              <Link
                href={`/protected/marketplace/store/${product.store?.slug || product.store?.id}`}
                className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
              >
                {product.store?.logo_url ? (
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-line bg-paper shadow-sm flex-shrink-0">
                    <Image
                      src={product.store.logo_url}
                      alt={product.store.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kita-green text-sm font-extrabold text-white shadow-sm flex-shrink-0">
                    {product.store?.name?.substring(0, 2).toUpperCase() || "ST"}
                  </div>
                )}
                <div className="flex flex-col truncate">
                  <span className="font-display font-bold text-sm text-ink leading-tight truncate group-hover:text-kita-green transition-colors">
                    {product.store?.name}
                  </span>
                  <span className="text-xs text-muted">
                    {product.store?.owner?.full_name || "Verified Student Seller"}
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-1 rounded-full bg-kita-green-soft px-2.5 py-0.5 text-xs font-bold text-kita-green">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verified</span>
              </div>
            </div>

            {/* Title & Rating */}
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink leading-tight">
                {product.title}
              </h1>
              {product.store?.rating_count > 0 && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                  <span className="flex items-center text-amber-500 font-bold">
                    ★ {Number(product.store.rating_avg).toFixed(1)}
                  </span>
                  <span className="text-muted">
                    ({product.store.rating_count} store reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price & Stock */}
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-ink">
                {PESO(Number(product.price))}
              </span>
              {product.stock > 0 ? (
                <span className="rounded-md bg-kita-green-soft px-2 py-0.5 text-xs font-bold text-kita-green">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-700">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="flex flex-col gap-1 border-t border-line pt-4">
                <span className="eyebrow text-xs text-muted">Description</span>
                <p className="text-xs sm:text-sm text-ink/90 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Prep Time & Pickup Details */}
            <div className="flex flex-col gap-2 rounded-xl bg-paper p-4 text-xs text-muted border border-line">
              <div className="flex items-center gap-2 text-ink">
                <Clock className="h-4 w-4 text-kita-green flex-shrink-0" />
                <span>
                  {product.prep_time_minutes === 0 || !product.prep_time_minutes
                    ? "Instant Handoff (0m wait)"
                    : `Preparation time: ${product.prep_time_minutes} minutes`}
                </span>
              </div>
              {product.store?.pickup_locations && (
                <div className="flex items-start gap-2 text-ink">
                  <MapPin className="h-4 w-4 text-kita-green flex-shrink-0 mt-0.5" />
                  <span>
                    Pickup Point: <strong>{product.store.pickup_locations}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Quantity & Add to Cart Action Area */}
          <div className="flex flex-col gap-3 pt-4 border-t border-line">
            {/* Quantity Stepper */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink">Quantity</span>
              <div className="flex items-center border border-line rounded-xl bg-paper">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="flex h-9 w-9 items-center justify-center text-muted hover:text-ink transition-colors disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-mono text-xs font-bold text-ink px-4">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= maxStock || isOutOfStock}
                  className="flex h-9 w-9 items-center justify-center text-muted hover:text-ink transition-colors disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Total Subtotal for selected quantity */}
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-muted">Total Price</span>
              <span className="font-mono font-bold text-ink text-sm">
                {PESO(Number(product.price) * quantity)}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 flex h-11 items-center justify-center gap-2 rounded-xl border border-kita-green bg-kita-green-soft px-4 text-xs font-bold text-kita-green hover:bg-kita-green hover:text-white transition-all disabled:opacity-40"
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="flex-1 flex h-11 items-center justify-center gap-2 rounded-xl bg-kita-green px-4 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all disabled:opacity-40 active:scale-98"
              >
                <span>Buy Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => toggleFavorite(product)}
                aria-label={isLiked ? "Remove from favorites" : "Save to favorites"}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all ${
                  isLiked
                    ? "border-rose-500 bg-rose-500/10 text-rose-500"
                    : "border-line bg-paper text-muted hover:text-ink hover:bg-paper-deep"
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-line">
              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-kita-green transition-colors cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Chat with {product.store?.name || "Seller"}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-kita-green" />
                <span>Verified Student Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Store Chat Auto Pop-Up */}
      {product.store && (
        <StoreChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          storeId={product.store.id}
          storeName={product.store.name}
          storeSlug={product.store.slug}
          storeLogo={product.store.logo_url}
          sellerName={product.store.owner?.full_name}
          initialMessage={`Hi! I'm inquiring about "${product.title}". Is it available for pickup?`}
        />
      )}
    </div>
  );
}
