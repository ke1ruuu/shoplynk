"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const PESO = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function FloatingCartButton() {
  const { totalCount, subtotal, openCart } = useCart();
  const pathname = usePathname();

  // Hide on checkout page or seller studio creation
  if (
    totalCount === 0 ||
    pathname.includes("/checkout") ||
    pathname.startsWith("/seller/products/")
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        type="button"
        onClick={openCart}
        className="group flex items-center gap-3 rounded-full border border-line bg-surface/95 backdrop-blur-md px-4 py-2.5 shadow-xl hover:border-kita-green/40 hover:bg-surface transition-all active:scale-95"
        aria-label={`View cart with ${totalCount} items`}
      >
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-kita-green text-white shadow-flyer">
          <ShoppingBag className="h-4 w-4" />
          <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 font-mono text-xs font-bold text-white shadow-sm">
            {totalCount}
          </span>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-muted leading-tight">
            Cart ({totalCount})
          </span>
        </div>
      </button>
    </div>
  );
}
