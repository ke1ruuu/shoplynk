"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Store, MapPin } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const PESO = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalCount, itemsByStore } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Slide-out Sheet Panel */}
      <aside
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-surface border-l border-line shadow-2xl transition-transform"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-kita-green" />
            <h2 className="font-display text-base font-bold text-ink">
              Your Campus Cart
            </h2>
            <span className="font-mono text-xs font-bold text-muted bg-paper px-2 py-0.5 rounded-md border border-line">
              {totalCount} {totalCount === 1 ? "item" : "items"}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-paper text-muted hover:bg-paper-deep hover:text-ink transition-colors"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-paper border border-line text-muted">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1 max-w-xs">
              <h3 className="font-display text-sm font-bold text-ink">
                Your cart is empty
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Explore break-time snacks, study reviewers, and student crafts in the campus marketplace.
              </p>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-kita-green px-4 py-2 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto divide-y divide-line p-5 space-y-6 scrollbar-none">
            {Object.entries(itemsByStore).map(([storeId, group]) => (
              <div key={storeId} className="flex flex-col gap-3 pt-4 first:pt-0">
                {/* Store Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <Store className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
                    <span className="font-display text-xs font-bold text-ink truncate">
                      {group.storeName}
                    </span>
                  </div>
                  {group.pickupLocation && (
                    <span className="text-xs text-muted flex items-center gap-1 truncate max-w-[160px]">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{group.pickupLocation}</span>
                    </span>
                  )}
                </div>

                {/* Store Items List */}
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item.productId}
                      className="flex items-center gap-3 rounded-xl border border-line bg-paper/60 p-3 hover:bg-surface transition-colors"
                    >
                      {/* Image */}
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-line bg-paper-deep">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info & Quantity Stepper */}
                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <span className="font-bold text-xs text-ink truncate leading-tight">
                          {item.title}
                        </span>
                        <span className="font-mono text-xs font-bold text-kita-green">
                          {PESO(item.price)}
                        </span>

                        <div className="flex items-center justify-between pt-1">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-line rounded-lg bg-surface">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="flex h-6 w-6 items-center justify-center text-muted hover:text-ink transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-ink px-2">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={item.quantity >= item.maxStock}
                              className="flex h-6 w-6 items-center justify-center text-muted hover:text-ink transition-colors disabled:opacity-30"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="text-muted hover:text-rose-600 transition-colors p-1"
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Footer with Checkout CTA */}
        {items.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-line bg-paper/80 p-5 backdrop-blur-xs">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-xs text-muted">Subtotal</span>
              <span className="font-mono text-lg font-bold text-ink">
                {PESO(subtotal)}
              </span>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              No delivery fees. Direct campus handoff during scheduled break times.
            </p>

            <Link
              href="/protected/marketplace/checkout"
              onClick={closeCart}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-kita-green px-5 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
