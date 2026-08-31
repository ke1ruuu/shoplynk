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

import { AdminStoresTable } from "@/components/admin/admin-stores-table";

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

      <Panel heading="Campus Store Directory" flush>
        <AdminStoresTable initialStores={stores} />
      </Panel>
    </main>
  );
}
