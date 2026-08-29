"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store,
  MapPin,
  Clock,
  CreditCard,
  Star,
  Settings,
  ExternalLink,
  Plus,
  Sparkles,
} from "lucide-react";
import { StoreSettingsModal } from "./store-settings-modal";

export interface SellerStoreData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  gcash_name: string | null;
  gcash_number: string | null;
  pickup_locations: string | null;
  operating_hours: string | null;
  rating_avg: number;
  rating_count: number;
  is_active: boolean;
}

interface SellerHeaderProps {
  store: SellerStoreData;
  onAddProduct: () => void;
}

export function SellerHeader({ store, onAddProduct }: SellerHeaderProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-flyer">
        {/* Subtle decorative background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#D92323 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Store Info */}
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-kita-green text-white shadow-flyer flex-shrink-0">
              <Store className="h-8 w-8" />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
                  {store.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-kita-green-soft px-2.5 py-0.5 text-xs font-bold text-kita-green">
                  <Sparkles className="h-3 w-3" />
                  Verified Seller Studio
                </span>
              </div>

              {store.description && (
                <p className="text-sm text-muted max-w-xl line-clamp-2">
                  {store.description}
                </p>
              )}

              {/* Meta tags (Pickup, GCash, Hours, Rating) */}
              <div className="flex items-center gap-3 pt-1 flex-wrap text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-spark text-spark" />
                  <span className="font-bold text-ink">
                    {Number(store.rating_avg || 0).toFixed(1)}
                  </span>
                  <span>({store.rating_count} reviews)</span>
                </span>

                {store.pickup_locations && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-kita-green" />
                    <span>{store.pickup_locations}</span>
                  </span>
                )}

                {store.gcash_number && (
                  <span className="flex items-center gap-1">
                    <CreditCard className="h-3.5 w-3.5 text-kita-green" />
                    <span>GCash: {store.gcash_number}</span>
                  </span>
                )}

                {store.operating_hours && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted" />
                    <span>{store.operating_hours}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep shadow-flyer"
            >
              <Settings className="h-4 w-4 text-muted" />
              <span>Store Settings</span>
            </button>

            <button
              type="button"
              onClick={onAddProduct}
              className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-5 py-2.5 text-sm font-semibold text-white shadow-flyer transition-all hover:bg-kita-green-deep active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      <StoreSettingsModal
        store={store}
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </>
  );
}
