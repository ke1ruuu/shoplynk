import React from "react";
import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ProtectedLayout } from "@/components/shell/protected-layout";
import { StorefrontView, StorefrontData } from "@/components/marketplace/storefront-view";
import { ProductItem } from "@/components/marketplace/product-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} — Campus Storefront | LYNK`,
    description: `Shop directly from ${formattedTitle} on LYNK campus marketplace.`,
  };
}

export default async function StorefrontPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect(`/login?next=/protected/marketplace/store/${slug}`);
  }

  const supabase = await createClient();

  // 1. Fetch store by slug or UUID
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

  let storeQuery = supabase
    .from("stores")
    .select(`
      id,
      user_id,
      name,
      slug,
      description,
      logo_url,
      banner_url,
      gcash_name,
      gcash_number,
      pickup_locations,
      operating_hours,
      is_active,
      rating_avg,
      rating_count,
      created_at,
      owner:profiles (
        full_name,
        role,
        avatar_url
      )
    `);

  if (isUuid) {
    storeQuery = storeQuery.eq("id", slug);
  } else {
    storeQuery = storeQuery.eq("slug", slug);
  }

  const { data: store, error: storeError } = await storeQuery.maybeSingle();

  if (storeError || !store) {
    notFound();
  }

  // 2. Fetch active products for this store
  const { data: productsData } = await supabase
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
      category:categories (id, name, slug),
      images:product_images (image_url, display_order)
    `)
    .eq("store_id", store.id)
    .eq("status", "ACTIVE")
    .order("created_at", { ascending: false });

  const isOwner = user.id === store.user_id;

  const storefrontData: StorefrontData = {
    id: store.id,
    user_id: store.user_id,
    name: store.name,
    slug: store.slug,
    description: store.description,
    logo_url: store.logo_url,
    banner_url: store.banner_url,
    gcash_name: store.gcash_name,
    gcash_number: store.gcash_number,
    pickup_locations: store.pickup_locations,
    operating_hours: store.operating_hours,
    is_active: store.is_active ?? true,
    rating_avg: Number(store.rating_avg || 0),
    rating_count: Number(store.rating_count || 0),
    created_at: store.created_at,
    owner: Array.isArray(store.owner) ? store.owner[0] : store.owner,
  };

  const formattedProducts: ProductItem[] = (productsData || []).map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    price: Number(p.price || 0),
    stock: Number(p.stock || 0),
    status: p.status,
    prep_time_minutes: p.prep_time_minutes,
    category: Array.isArray(p.category) ? p.category[0] : p.category,
    store: {
      id: store.id,
      name: store.name,
      slug: store.slug,
      logo_url: store.logo_url,
      pickup_locations: store.pickup_locations,
      rating_avg: Number(store.rating_avg || 0),
      rating_count: Number(store.rating_count || 0),
    },
    images: (p.images || []).sort(
      (a: any, b: any) => (a.display_order || 0) - (b.display_order || 0)
    ),
  }));

  return (
    <ProtectedLayout user={user} profile={profile}>
      <StorefrontView
        store={storefrontData}
        products={formattedProducts}
        isOwner={isOwner}
      />
    </ProtectedLayout>
  );
}
