"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Clock, CreditCard, Star, Settings, Plus } from "lucide-react";
import { PageHeader, MetaList } from "@/components/dashboard/page-header";
import { StatusPill } from "@/components/dashboard/status-pill";

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
  onAddProduct?: () => void;
}

export function SellerHeader({ store, onAddProduct }: SellerHeaderProps) {
  return (
    <PageHeader
      title={store.name}
      description={store.description || undefined}
      meta={
        <MetaList
          items={[
            <StatusPill key="status" intent={store.is_active ? "live" : "stopped"} bare>
              {store.is_active ? "Open for orders" : "Paused — not accepting orders"}
            </StatusPill>,
            store.rating_count > 0 ? (
              <>
                <Star
                  className="h-3.5 w-3.5 fill-spark text-spark"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="tabular font-semibold text-ink">
                  {Number(store.rating_avg || 0).toFixed(1)}
                </span>
                <span>
                  ({store.rating_count} {store.rating_count === 1 ? "review" : "reviews"})
                </span>
              </>
            ) : (
              "No reviews yet"
            ),
            store.pickup_locations ? (
              <>
                <MapPin className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} aria-hidden="true" />
                {store.pickup_locations}
              </>
            ) : null,
            store.operating_hours ? (
              <>
                <Clock className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} aria-hidden="true" />
                {store.operating_hours}
              </>
            ) : null,
            store.gcash_number ? (
              <>
                <CreditCard
                  className="h-3.5 w-3.5 text-muted"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="tabular">GCash {store.gcash_number}</span>
              </>
            ) : null,
          ]}
        />
      }
      actions={
        <>
          <Link
            href="/seller/settings"
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-line bg-surface px-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep"
          >
            <Settings className="h-4 w-4 text-muted" strokeWidth={1.75} />
            Store settings
          </Link>

          <Link
            href="/seller/products/new"
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-kita-green px-3.5 text-sm font-semibold text-white shadow-flyer transition-colors hover:bg-kita-green-deep"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add product
          </Link>
        </>
      }
    />
  );
}
