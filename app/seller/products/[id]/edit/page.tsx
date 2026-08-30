import React from "react";
import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ensureSellerStoreAction } from "@/app/actions/seller";
import { ProductEditorView, ProductInitialData } from "@/components/seller/product-editor-view";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Product Listing — Seller Studio",
  description: "Update product details, pricing, and stock levels.",
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect(`/login?next=/seller/products/${id}/edit`);
  }

  if (profile?.role !== "SELLER") {
    if (profile?.role === "CAMPUS_ADMIN" || profile?.role === "PLATFORM_ADMIN") {
      redirect("/admin");
    }
    redirect("/seller/verification");
  }

  const { store } = await ensureSellerStoreAction();
  if (!store) {
    redirect("/seller");
  }

  const supabase = await createClient();

  // 1. Fetch the product ensuring it belongs to this seller's store
  const { data: product, error: productError } = await supabase
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
      images:product_images (image_url, display_order)
    `)
    .eq("id", id)
    .eq("store_id", store.id)
    .single();

  if (productError || !product) {
    notFound();
  }

  // 2. Fetch categories
  const { data: dbCategories } = await supabase
    .from("categories")
    .select("id, name, slug, icon")
    .order("name");

  const categories = dbCategories || [];

  const sortedImages = (product.images || []).sort(
    (a: { display_order: number }, b: { display_order: number }) =>
      a.display_order - b.display_order
  );

  const productInitialData: ProductInitialData = {
    id: product.id,
    title: product.title,
    category_id: product.category_id,
    price: Number(product.price),
    stock: Number(product.stock),
    prep_time_minutes: Number(product.prep_time_minutes || 0),
    status: product.status as "ACTIVE" | "DRAFT" | "OUT_OF_STOCK" | "ARCHIVED",
    description: product.description,
    image_url: sortedImages[0]?.image_url || null,
  };

  return (
    <ProductEditorView
      categories={categories}
      productToEdit={productInitialData}
      storeName={store.name}
    />
  );
}
