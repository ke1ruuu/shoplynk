"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  MapPin,
  Clock,
  Star,
  Trash2,
  AlertTriangle,
  Loader2,
  Search,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { StatusPill } from "@/components/dashboard/status-pill";
import { EmptyState } from "@/components/dashboard/empty-state";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { adminRemoveStoreAction } from "@/app/actions/seller";

export interface AdminStoreItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  pickup_locations: string | null;
  operating_hours: string | null;
  rating_avg: number;
  rating_count: number;
  is_active: boolean;
  created_at: string;
  sellerName: string;
  sellerEmail: string;
  totalProducts: number;
  activeProducts: number;
}

interface AdminStoresTableProps {
  initialStores: AdminStoreItem[];
}

export function AdminStoresTable({ initialStores }: AdminStoresTableProps) {
  const router = useRouter();
  const [stores, setStores] = useState<AdminStoreItem[]>(initialStores);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "OPEN" | "PAUSED">("ALL");

  // Selected store for removal dialog
  const [targetStore, setTargetStore] = useState<AdminStoreItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletePermanently, setDeletePermanently] = useState(true);

  // Filtered stores
  const filteredStores = stores.filter((s) => {
    const matchesSearch =
      !searchQuery.trim() ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sellerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.pickup_locations?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "OPEN" && s.is_active) ||
      (statusFilter === "PAUSED" && !s.is_active);

    return matchesSearch && matchesStatus;
  });

  async function handleRemoveStore() {
    if (!targetStore || isDeleting) return;

    setIsDeleting(true);
    const res = await adminRemoveStoreAction(targetStore.id, deletePermanently);
    setIsDeleting(false);

    if (res.success) {
      if (deletePermanently) {
        setStores((prev) => prev.filter((s) => s.id !== targetStore.id));
      } else {
        setStores((prev) =>
          prev.map((s) =>
            s.id === targetStore.id ? { ...s, is_active: false, activeProducts: 0 } : s
          )
        );
      }
      setTargetStore(null);
      router.refresh();
    } else {
      alert(res.message || "Failed to remove store.");
    }
  }

  return (
    <div className="flex flex-col">
      {/* Table Toolbar & Search Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 border-b border-line bg-paper/30">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stores or sellers…"
            className="w-full h-9 pl-9 pr-3 text-xs rounded-xl bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-kita-green transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold">
          {[
            { id: "ALL", label: `All (${stores.length})` },
            { id: "OPEN", label: `Open (${stores.filter((s) => s.is_active).length})` },
            { id: "PAUSED", label: `Paused (${stores.filter((s) => !s.is_active).length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id as typeof statusFilter)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-ink text-white shadow-xs"
                  : "text-muted hover:text-ink hover:bg-paper"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Store Directory Rows */}
      {filteredStores.length === 0 ? (
        <EmptyState
          icon={Store}
          title={searchQuery ? "No matching stores found" : "No storefronts yet"}
          body={
            searchQuery
              ? "Try adjusting your search query or status filter."
              : "Once you approve a student's seller verification, their storefront appears here with its pickup details, catalog size, and buyer rating."
          }
        />
      ) : (
        <ul className="divide-y divide-line">
          {filteredStores.map((store) => (
            <li
              key={store.id}
              className="flex flex-col gap-4 px-4 sm:px-6 py-4.5 transition-colors hover:bg-paper/50 lg:flex-row lg:items-center lg:justify-between"
            >
              {/* Left Column: Store Details */}
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <h3 className="text-sm font-bold text-ink">{store.name}</h3>
                  <StatusPill intent={store.is_active ? "live" : "stopped"}>
                    {store.is_active ? "Open" : "Paused"}
                  </StatusPill>
                </div>

                <p className="text-xs text-muted">
                  <span className="font-medium text-ink/80">{store.sellerName}</span>
                  {store.sellerEmail && (
                    <>
                      {" · "}
                      <span className="tabular font-mono text-[11px]">{store.sellerEmail}</span>
                    </>
                  )}
                </p>

                {store.description && (
                  <p className="line-clamp-2 max-w-[64ch] text-xs leading-relaxed text-muted">
                    {store.description}
                  </p>
                )}

                {(store.pickup_locations || store.operating_hours) && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-muted">
                    {store.pickup_locations && (
                      <span className="flex min-w-0 items-center gap-1.5">
                        <MapPin
                          className="h-3.5 w-3.5 flex-shrink-0 text-muted"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="truncate">{store.pickup_locations}</span>
                      </span>
                    )}
                    {store.operating_hours && (
                      <span className="flex min-w-0 items-center gap-1.5">
                        <Clock
                          className="h-3.5 w-3.5 flex-shrink-0 text-muted"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="truncate">{store.operating_hours}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Stats & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between lg:justify-end gap-6 sm:gap-8 pt-2 lg:pt-0 border-t lg:border-t-0 border-line/60">
                <dl className="flex items-center gap-6 sm:gap-8">
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-muted">
                      Live
                    </dt>
                    <dd className="tabular text-sm font-bold text-ink">
                      {store.activeProducts}
                      <span className="font-normal text-muted"> / {store.totalProducts}</span>
                    </dd>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-muted">
                      Rating
                    </dt>
                    <dd className="flex items-center gap-1.5">
                      {store.rating_count > 0 ? (
                        <>
                          <Star
                            className="h-3.5 w-3.5 fill-spark text-spark"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <span className="tabular text-sm font-bold text-ink">
                            {store.rating_avg.toFixed(1)}
                          </span>
                          <span className="tabular text-xs text-muted">
                            ({store.rating_count})
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-muted">No reviews</span>
                      )}
                    </dd>
                  </div>
                </dl>

                {/* Remove Store Button */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTargetStore(store);
                      setDeletePermanently(true);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/20 active:scale-95 transition-all cursor-pointer shadow-xs"
                    title="Remove this campus store"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove Store</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Confirmation Dialog: Remove Store */}
      {targetStore && (
        <Dialog
          open={!!targetStore}
          onOpenChange={(open) => {
            if (!open) setTargetStore(null);
          }}
        >
          <DialogContent
            showCloseButton={false}
            className="sm:max-w-[460px] bg-surface rounded-3xl border border-line p-6 shadow-flyer-lg"
          >
            <DialogHeader className="gap-1.5">
              <div className="flex items-center gap-2 text-destructive font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="h-4 w-4" />
                <span>Remove Campus Storefront</span>
              </div>
              <DialogTitle className="text-lg font-bold text-ink">
                Remove "{targetStore.name}"?
              </DialogTitle>
              <DialogDescription className="text-xs text-muted leading-relaxed">
                Are you sure you want to remove this storefront owned by{" "}
                <strong className="text-ink">{targetStore.sellerName}</strong> from the campus marketplace?
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-3 my-2 text-xs">
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 text-destructive flex flex-col gap-1.5">
                <span className="font-bold">Summary of actions:</span>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-muted leading-relaxed">
                  <li>Storefront will be removed from all buyer search and category lists.</li>
                  <li>
                    {targetStore.activeProducts > 0
                      ? `${targetStore.activeProducts} active product listing(s) will be unlisted.`
                      : "Catalog listings will be deactivated."}
                  </li>
                  <li>
                    Owner <strong>{targetStore.sellerName}</strong> will be downgraded back to Student Buyer.
                  </li>
                </ul>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-ink select-none pt-1">
                <input
                  type="checkbox"
                  checked={deletePermanently}
                  onChange={(e) => setDeletePermanently(e.target.checked)}
                  className="h-4 w-4 rounded border-line text-destructive focus:ring-destructive cursor-pointer"
                />
                <span>Permanently delete store record and catalog from database</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-line">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setTargetStore(null)}
                className="rounded-xl border border-line bg-paper px-4 py-2 text-xs font-bold text-ink hover:bg-paper-deep transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleRemoveStore}
                className="inline-flex items-center gap-2 rounded-xl bg-destructive px-5 py-2 text-xs font-bold text-white shadow-flyer hover:bg-destructive/90 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Removing Store…
                  </span>
                ) : (
                  <>
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Confirm Remove Store</span>
                  </>
                )}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
