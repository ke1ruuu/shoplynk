import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Store, MapPin, Star, Clock, Package, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";

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

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-8">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-flyer">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#D92323 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-2 text-kita-green">
            <Store className="h-5 w-5" />
            <span className="eyebrow">Campus Governance</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-ink leading-tight">
            Campus Store Directory
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            Monitor verified student storefronts operating across Luis Y. Ferrer Jr. Senior High School.
          </p>
        </div>
      </header>

      {/* Stores List */}
      <div className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-6 shadow-flyer">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-kita-green" />
            <h2 className="font-display text-xl font-bold text-ink">
              Registered Student Stores ({stores.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stores.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted text-sm">
              No student storefronts registered yet.
            </div>
          ) : (
            stores.map((store) => (
              <div
                key={store.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-line bg-paper/50 p-5 shadow-sm hover:shadow-flyer transition-shadow"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <h3 className="font-display font-bold text-base text-ink">
                        {store.name}
                      </h3>
                      <span className="text-xs text-muted">
                        Seller: {store.sellerName} ({store.sellerEmail})
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        store.is_active
                          ? "bg-kita-green-soft text-kita-green"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {store.is_active ? "Active" : "Suspended"}
                    </span>
                  </div>

                  {store.description && (
                    <p className="text-xs text-muted line-clamp-2">
                      {store.description}
                    </p>
                  )}

                  <div className="flex flex-col gap-1 text-[11px] text-muted pt-2 border-t border-line/60">
                    {store.pickup_locations && (
                      <span className="flex items-center gap-1.5 truncate">
                        <MapPin className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
                        <span className="truncate">{store.pickup_locations}</span>
                      </span>
                    )}
                    {store.operating_hours && (
                      <span className="flex items-center gap-1.5 truncate">
                        <Clock className="h-3.5 w-3.5 text-muted flex-shrink-0" />
                        <span className="truncate">{store.operating_hours}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-line text-xs font-semibold">
                  <span className="flex items-center gap-1 text-ink">
                    <Package className="h-3.5 w-3.5 text-muted" />
                    <span>{store.activeProducts} live items</span>
                  </span>

                  <span className="flex items-center gap-1 text-spark-ink">
                    <Star className="h-3.5 w-3.5 fill-spark text-spark" />
                    <span>{store.rating_avg.toFixed(1)}</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
