import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Store, MapPin, Clock, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatRow } from "@/components/dashboard/stat-row";
import { Panel } from "@/components/dashboard/panel";
import { StatusPill } from "@/components/dashboard/status-pill";
import { EmptyState } from "@/components/dashboard/empty-state";

export const metadata: Metadata = {
  title: "Campus Stores — Admin Console",
  description: "Directory and compliance monitoring for verified student storefronts.",
};

export default async function AdminStoresPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user || (profile?.role !== "CAMPUS_ADMIN" && profile?.role !== "PLATFORM_ADMIN")) {
    redirect("/admin/login");
  }

  const supabase = await createClient();

  // Fetch all registered campus stores with user profiles and product counts
  const { data: dbStores } = await supabase
    .from("stores")
    .select(`
      id,
      user_id,
      name,
      slug,
      description,
      pickup_locations,
      operating_hours,
      rating_avg,
      rating_count,
      is_active,
      created_at,
      profile:profiles (id, full_name, email),
      products:products (id, status)
    `)
    .order("created_at", { ascending: false });

  const stores = (dbStores || []).map((s) => {
    const rawProfile = Array.isArray(s.profile) ? s.profile[0] : s.profile;
    const productsList = s.products || [];
    const activeProducts = productsList.filter((p: { status: string }) => p.status === "ACTIVE").length;

    return {
      id: s.id,
      name: s.name,
      slug: s.slug,
      description: s.description,
      pickup_locations: s.pickup_locations,
      operating_hours: s.operating_hours,
      rating_avg: Number(s.rating_avg || 0),
      rating_count: Number(s.rating_count || 0),
      is_active: s.is_active,
      created_at: s.created_at,
      sellerName: rawProfile?.full_name || "Student Seller",
      sellerEmail: rawProfile?.email || "",
      totalProducts: productsList.length,
      activeProducts,
    };
  });

  const openStores = stores.filter((s) => s.is_active).length;
  const liveListings = stores.reduce((acc, s) => acc + s.activeProducts, 0);
  const rated = stores.filter((s) => s.rating_count > 0);
  const campusRating =
    rated.length > 0 ? rated.reduce((acc, s) => acc + s.rating_avg, 0) / rated.length : 0;

  return (
    <main className="w-full max-w-[1600px] flex flex-col gap-7 px-4 py-7 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      <PageHeader
        title="Campus stores"
        description="Verified student storefronts operating at Luis Y. Ferrer Jr. Senior High School."
      />

      <StatRow
        stats={[
          { label: "Storefronts", value: String(stores.length), note: "Registered on campus" },
          {
            label: "Open for orders",
            value: String(openStores),
            note: openStores === stores.length && stores.length > 0
              ? "Every store is trading"
              : `${stores.length - openStores} paused`,
            tone: openStores > 0 ? "accent" : "default",
          },
          { label: "Live listings", value: String(liveListings), note: "Products buyers can see" },
          {
            label: "Campus rating",
            value: campusRating > 0 ? campusRating.toFixed(1) : "—",
            note: rated.length > 0 ? `Across ${rated.length} rated stores` : "No reviews yet",
          },
        ]}
      />

      <Panel heading={`Store directory (${stores.length})`} flush>
        {stores.length === 0 ? (
          <EmptyState
            icon={Store}
            title="No storefronts yet"
            body="Once you approve a student's seller verification, their storefront appears here with its pickup details, catalog size, and buyer rating."
          />
        ) : (
          <ul className="divide-y divide-line">
            {stores.map((store) => (
              <li
                key={store.id}
                className="flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-paper/60 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <div className="flex min-w-0 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <h3 className="text-sm font-semibold text-ink">{store.name}</h3>
                    <StatusPill intent={store.is_active ? "live" : "stopped"}>
                      {store.is_active ? "Open" : "Paused"}
                    </StatusPill>
                  </div>

                  <p className="text-xs text-muted">
                    {store.sellerName}
                    {store.sellerEmail && (
                      <>
                        {" · "}
                        <span className="tabular">{store.sellerEmail}</span>
                      </>
                    )}
                  </p>

                  {store.description && (
                    <p className="line-clamp-2 max-w-[64ch] text-sm leading-relaxed text-muted">
                      {store.description}
                    </p>
                  )}

                  {(store.pickup_locations || store.operating_hours) && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 text-xs text-muted">
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

                <dl className="flex flex-shrink-0 items-start gap-6 sm:gap-8">
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
                        <span className="text-sm text-muted">No reviews</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </main>
  );
}
