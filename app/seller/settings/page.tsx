import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ensureSellerStoreAction } from "@/app/actions/seller";
import { ProtectedLayout } from "@/components/shell/protected-layout";
import { StoreSettingsView, StoreData } from "@/components/seller/store-settings-view";

export const metadata: Metadata = {
  title: "Store Settings — Seller Studio | Project Kita",
  description: "Manage your campus store preferences, pickup locations, GCash account, and status.",
};

export default async function SellerSettingsPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?next=/seller/settings");
  }

  // Gate: Only verified sellers can access Seller Studio
  if (profile?.role !== "SELLER") {
    if (profile?.role === "CAMPUS_ADMIN" || profile?.role === "PLATFORM_ADMIN") {
      redirect("/admin");
    }
    redirect("/seller/verification");
  }

  // 1. Ensure user has an initialized store
  const { store, error: storeError } = await ensureSellerStoreAction();

  if (!store) {
    return (
      <ProtectedLayout user={user} profile={profile}>
        <main className="mx-auto max-w-lg px-4 py-16">
          <div className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface p-6">
            <h1 className="text-base font-semibold text-ink">
              Unable to load storefront settings
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              {storeError ||
                "Something went wrong while loading your store settings. Please try again in a moment."}
            </p>
            <a
              href="/seller/settings"
              className="mt-2 text-xs font-bold text-kita-green hover:underline"
            >
              Retry
            </a>
          </div>
        </main>
      </ProtectedLayout>
    );
  }

  const storeData: StoreData = {
    id: store.id,
    name: store.name,
    slug: store.slug,
    logo_url: store.logo_url,
    description: store.description,
    pickup_locations: store.pickup_locations,
    operating_hours: store.operating_hours,
    gcash_name: store.gcash_name,
    gcash_number: store.gcash_number,
    is_active: store.is_active ?? true,
    rating_avg: Number(store.rating_avg || 0),
    rating_count: Number(store.rating_count || 0),
    updated_at: store.updated_at,
  };

  return (
    <ProtectedLayout user={user} profile={profile}>
      <main>
        <StoreSettingsView store={storeData} />
      </main>
    </ProtectedLayout>
  );
}
