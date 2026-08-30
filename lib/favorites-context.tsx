"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ProductItem } from "@/components/marketplace/product-card";

interface FavoritesContextType {
  favorites: ProductItem[];
  favoriteIds: Set<string>;
  totalFavorites: number;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: ProductItem) => void;
  addFavorite: (product: ProductItem) => void;
  removeFavorite: (productId: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = "projectkita_favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<ProductItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (err) {
      console.warn("Failed to read favorites from localStorage:", err);
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (err) {
        console.warn("Failed to save favorites to localStorage:", err);
      }
    }
  }, [favorites, isHydrated]);

  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((p) => p.id || p.slug));
  }, [favorites]);

  const isFavorite = (productId: string) => {
    return favoriteIds.has(productId);
  };

  const addFavorite = (product: ProductItem) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === product.id || p.slug === product.slug)) {
        return prev;
      }
      return [product, ...prev];
    });
  };

  const removeFavorite = (productId: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId && p.slug !== productId));
  };

  const toggleFavorite = (product: ProductItem) => {
    if (isFavorite(product.id) || (product.slug && isFavorite(product.slug))) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    favoriteIds,
    totalFavorites: favorites.length,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
