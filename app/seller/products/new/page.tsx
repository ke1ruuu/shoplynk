import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ensureSellerStoreAction } from "@/app/actions/seller";
import { ProductEditorView } from "@/components/seller/product-editor-view";

export const metadata: Metadata = {
  title: "New Product Listing — Seller Studio",
  description: "Create a new product listing for your campus store catalog.",
};

export default async function NewProductPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?next=/seller/products/new");
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
  const { data: dbCategories } = await supabase
    .from("categories")
    .select("id, name, slug, icon")
    .order("name");

  const categories = dbCategories || [];

  return (
    <ProductEditorView
      categories={categories}
      storeName={store.name}
    />
  );
}
