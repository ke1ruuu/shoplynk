import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProtectedLayout } from "@/components/shell/protected-layout";
import { MarketplaceView } from "@/components/marketplace/marketplace-view";
import { ProductItem } from "@/components/marketplace/product-card";
import { Category } from "@/components/marketplace/marketplace-filters";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Marketplace — Project Kita",
  description: "Browse products and services from verified student entrepreneurs.",
};

export default async function DedicatedMarketplacePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 1. Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*, campuses(name, code)")
    .eq("id", user.id)
    .single();

  // 2. Fetch live categories from Supabase
  const { data: dbCategories } = await supabase
    .from("categories")
    .select("id, name, slug, icon")
    .order("name");

  let categories: Category[] = (dbCategories || []).map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    icon: c.icon,
  }));

  if (categories.length === 0) {
    categories = MOCK_CATEGORIES;
  }

  // 3. Fetch live active products from Supabase
  const { data: dbProducts } = await supabase
    .from("products")
    .select(`
      id,
      title,
      slug,
      description,
      price,
      stock,
      status,
      prep_time_minutes,
      category:categories (name, slug),
      store:stores (
        id,
        name,
        slug,
        logo_url,
        pickup_locations,
        rating_avg,
        rating_count,
        owner:profiles (full_name, role)
      ),
      images:product_images (image_url, display_order)
    `)
    .eq("status", "ACTIVE")
    .order("created_at", { ascending: false });

  let products: ProductItem[] = (dbProducts || []).map((p) => {
    const rawCategory = Array.isArray(p.category) ? p.category[0] : p.category;
    const rawStore = Array.isArray(p.store) ? p.store[0] : p.store;
    const rawImages = Array.isArray(p.images) ? p.images : [];

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      price: Number(p.price),
      stock: p.stock,
      status: p.status as ProductItem["status"],
      prep_time_minutes: p.prep_time_minutes,
      category: {
        name: rawCategory?.name || "Uncategorized",
        slug: rawCategory?.slug || "all",
      },
      store: {
        id: rawStore?.id || "",
        name: rawStore?.name || "Campus Store",
        slug: rawStore?.slug || "",
        logo_url: rawStore?.logo_url || null,
        pickup_locations: rawStore?.pickup_locations || null,
        rating_avg: Number(rawStore?.rating_avg || 0),
        rating_count: Number(rawStore?.rating_count || 0),
        owner: rawStore?.owner ? (Array.isArray(rawStore.owner) ? rawStore.owner[0] : rawStore.owner) : undefined,
      },
      images: rawImages
        .map((img) => ({
          image_url: img.image_url,
          display_order: img.display_order,
        }))
        .sort((a, b) => a.display_order - b.display_order),
    };
  });

  if (products.length === 0) {
    products = MOCK_PRODUCTS;
  }

  const userRole = profile?.role || "BUYER";

  return (
    <ProtectedLayout user={user} profile={profile}>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <MarketplaceView
          initialCategories={categories}
          initialProducts={products}
          userRole={userRole}
          showCta={true}
        />
      </main>
    </ProtectedLayout>
  );
}
