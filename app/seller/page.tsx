import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ensureSellerStoreAction } from "@/app/actions/seller";
import { SellerStudioView } from "@/components/seller/seller-studio-view";
import { MOCK_CATEGORIES } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Seller Studio Dashboard — Project Kita",
  description: "Manage your campus store catalog, products, and inventory.",
};

export default async function SellerStudioPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?next=/seller");
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
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="rounded-3xl border border-line bg-surface p-8 shadow-flyer flex flex-col items-center gap-4">
          <h1 className="font-display text-2xl font-bold text-ink">
            Unable to Load Seller Storefront
          </h1>
          <p className="text-sm text-muted">
            {storeError || "Something went wrong while initializing your store."}
          </p>
          <a
            href="/seller"
            className="rounded-xl bg-kita-green px-5 py-2.5 text-sm font-semibold text-white shadow-flyer"
          >
            Retry Loading
          </a>
        </div>
      </main>
    );
  }

  const supabase = await createClient();

  // 2. Fetch categories
  const { data: dbCategories } = await supabase
    .from("categories")
    .select("id, name, slug, icon")
    .order("name");

  const categories =
    dbCategories && dbCategories.length > 0
      ? dbCategories
      : MOCK_CATEGORIES.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          icon: c.icon,
        }));

  // 3. Fetch seller's products
  const { data: dbProducts } = await supabase
    .from("products")
    .select(`
      id,
      store_id,
      category_id,
      title,
      slug,
      description,
      price,
      stock,
      status,
      prep_time_minutes,
      created_at,
      category:categories (id, name, slug, icon),
      images:product_images (image_url, display_order)
    `)
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  const products = (dbProducts || []).map((p) => ({
    id: p.id,
    store_id: p.store_id,
    category_id: p.category_id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    price: Number(p.price),
    stock: Number(p.stock),
    status: p.status as "ACTIVE" | "DRAFT" | "OUT_OF_STOCK" | "ARCHIVED",
    prep_time_minutes: Number(p.prep_time_minutes || 0),
    created_at: p.created_at,
    category: Array.isArray(p.category) ? p.category[0] : p.category,
    images: (p.images || []).sort(
      (a: { display_order: number }, b: { display_order: number }) =>
        a.display_order - b.display_order
    ),
  }));

  return (
    <main>
      <SellerStudioView
        store={{
          id: store.id,
          name: store.name,
          slug: store.slug,
          description: store.description,
          logo_url: store.logo_url,
          banner_url: store.banner_url,
          gcash_name: store.gcash_name,
          gcash_number: store.gcash_number,
          pickup_locations: store.pickup_locations,
          operating_hours: store.operating_hours,
          rating_avg: Number(store.rating_avg || 0),
          rating_count: Number(store.rating_count || 0),
          is_active: store.is_active,
        }}
        categories={categories}
        products={products}
      />
    </main>
  );
}
