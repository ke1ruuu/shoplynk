"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ProductItem } from "@/components/marketplace/product-card";

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  storeId: string;
  storeName: string;
  pickupLocation: string | null;
  prepTimeMinutes: number | null;
  maxStock: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalCount: number;
  subtotal: number;
  itemsByStore: Record<string, { storeName: string; pickupLocation: string | null; items: CartItem[] }>;
  addItem: (product: ProductItem, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "projectkita_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync cart to localStorage on changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items, isHydrated]);

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const itemsByStore = useMemo(() => {
    const map: Record<string, { storeName: string; pickupLocation: string | null; items: CartItem[] }> = {};
    items.forEach((item) => {
      if (!map[item.storeId]) {
        map[item.storeId] = {
          storeName: item.storeName,
          pickupLocation: item.pickupLocation,
          items: [],
        };
      }
      map[item.storeId].items.push(item);
    });
    return map;
  }, [items]);

  function addItem(product: ProductItem, quantity: number = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      const mainImage =
        product.images && product.images.length > 0
          ? product.images[0].image_url
          : "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80";

      if (existing) {
        const nextQty = Math.min(existing.quantity + quantity, product.stock || 99);
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: nextQty } : i
        );
      }

      const newItem: CartItem = {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        price: Number(product.price),
        quantity: Math.min(quantity, product.stock || 99),
        imageUrl: mainImage,
        storeId: product.store?.id || "default_store",
        storeName: product.store?.name || "Campus Store",
        pickupLocation: product.store?.pickup_locations || null,
        prepTimeMinutes: product.prep_time_minutes || null,
        maxStock: product.stock || 99,
      };

      return [...prev, newItem];
    });

    setIsOpen(true);
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((i) => {
        if (i.productId === productId) {
          const validQty = Math.min(quantity, i.maxStock);
          return { ...i, quantity: validQty };
        }
        return i;
      })
    );
  }

  function clearCart() {
    setItems([]);
  }

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  function toggleCart() {
    setIsOpen((prev) => !prev);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalCount,
        subtotal,
        itemsByStore,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
