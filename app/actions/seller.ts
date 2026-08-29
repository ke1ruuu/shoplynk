"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/session";

// ------------------------------------------------------------
// ZOD SCHEMAS
// ------------------------------------------------------------

const ProductSchema = z.object({
  title: z.string().trim().min(2, "Product title must be at least 2 characters."),
  categoryId: z.string().min(1, "Please select a category."),
  price: z.coerce.number().min(0, "Price must be 0 or greater."),
  stock: z.coerce.number().int().min(0, "Stock must be 0 or greater."),
  description: z.string().trim().optional().default(""),
  prepTimeMinutes: z.coerce.number().int().min(0).default(0),
  status: z.enum(["ACTIVE", "DRAFT", "OUT_OF_STOCK", "ARCHIVED"]).default("ACTIVE"),
  imageUrl: z.string().trim().optional().default(""),
});

const StoreSettingsSchema = z.object({
  name: z.string().trim().min(2, "Store name must be at least 2 characters."),
  description: z.string().trim().optional().default(""),
  gcashName: z.string().trim().optional().default(""),
  gcashNumber: z.string().trim().optional().default(""),
  pickupLocations: z.string().trim().optional().default(""),
  operatingHours: z.string().trim().optional().default(""),
});

export type ActionState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "product"
  );
}

// ------------------------------------------------------------
// STORE MANAGEMENT ACTIONS
// ------------------------------------------------------------

/**
 * Ensures the logged-in user has an active store. If not, auto-provisions one.
 */
export async function ensureSellerStoreAction() {
  const user = await getCurrentUser();
  if (!user) {
    return { store: null, error: "Unauthorized. Please log in." };
  }

  const supabase = await createClient();

  // 1. Check for existing store
  const { data: existingStore } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingStore) {
    return { store: existingStore, error: null };
  }

  // 2. Provision new store
  const baseName = user.full_name ? `${user.full_name}'s Store` : "Student Corner Store";
  const slug = `${slugify(baseName)}-${Math.random().toString(36).substring(2, 6)}`;

  const { data: newStore, error: createError } = await supabase
    .from("stores")
    .insert({
      user_id: user.id,
      name: baseName,
      slug,
      description: "Campus goods, handmade crafts, and snacks by student entrepreneurs.",
      pickup_locations: "Building A Lobby / Main Courtyard",
      operating_hours: "Mon-Fri 10:00 AM - 4:00 PM",
      is_active: true,
    })
    .select("*")
    .single();

  if (createError) {
    return { store: null, error: createError.message };
  }

  // 3. Promote profile role to SELLER if not already
  await supabase
    .from("profiles")
    .update({ role: "SELLER" })
    .eq("id", user.id);

  revalidatePath("/seller");
  return { store: newStore, error: null };
}

/**
 * Updates seller store settings.
 */
export async function updateStoreAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) {
    return { message: "Unauthorized. Please log in." };
  }

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    gcashName: formData.get("gcashName"),
    gcashNumber: formData.get("gcashNumber"),
    pickupLocations: formData.get("pickupLocations"),
    operatingHours: formData.get("operatingHours"),
  };

  const parsed = StoreSettingsSchema.safeParse(rawData);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { name, description, gcashName, gcashNumber, pickupLocations, operatingHours } = parsed.data;

  const { error } = await supabase
    .from("stores")
    .update({
      name,
      description,
      gcash_name: gcashName,
      gcash_number: gcashNumber,
      pickup_locations: pickupLocations,
      operating_hours: operatingHours,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/seller");
  revalidatePath("/protected/marketplace");
  return { success: true, message: "Store details saved successfully!" };
}

// ------------------------------------------------------------
// PRODUCT CRUD ACTIONS
// ------------------------------------------------------------

/**
 * Create a new product for the seller's store.
 */
export async function createProductAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) {
    return { message: "Unauthorized. Please log in." };
  }

  const supabase = await createClient();

  // Get seller store
  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!store) {
    return { message: "Please initialize your store first before adding listings." };
  }

  const rawData = {
    title: formData.get("title"),
    categoryId: formData.get("categoryId"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    description: formData.get("description"),
    prepTimeMinutes: formData.get("prepTimeMinutes") || 0,
    status: formData.get("status") || "ACTIVE",
    imageUrl: formData.get("imageUrl") || "",
  };

  const parsed = ProductSchema.safeParse(rawData);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { title, categoryId, price, stock, description, prepTimeMinutes, status, imageUrl } = parsed.data;
  const slug = `${slugify(title)}-${Math.random().toString(36).substring(2, 6)}`;

  // Insert product
  const { data: product, error: productError } = await supabase
    .from("products")
    .insert({
      store_id: store.id,
      category_id: categoryId,
      title,
      slug,
      description,
      price,
      stock,
      status,
      prep_time_minutes: prepTimeMinutes,
    })
    .select("id")
    .single();

  if (productError || !product) {
    return { message: productError?.message || "Failed to create product listing." };
  }

  // Insert image if provided
  if (imageUrl) {
    await supabase.from("product_images").insert({
      product_id: product.id,
      image_url: imageUrl,
      display_order: 0,
    });
  }

  revalidatePath("/seller");
  revalidatePath("/protected/marketplace");
  return { success: true, message: "Product listed successfully!" };
}

/**
 * Update an existing product.
 */
export async function updateProductAction(
  productId: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) {
    return { message: "Unauthorized. Please log in." };
  }

  const supabase = await createClient();

  // Verify ownership
  const { data: product } = await supabase
    .from("products")
    .select("id, store:stores(user_id)")
    .eq("id", productId)
    .single();

  const rawStore = Array.isArray(product?.store)
    ? product?.store[0]
    : (product?.store as unknown as { user_id?: string } | undefined);
  const storeOwnerId = rawStore?.user_id;

  if (!product || storeOwnerId !== user.id) {
    return { message: "You do not have permission to edit this product." };
  }

  const rawData = {
    title: formData.get("title"),
    categoryId: formData.get("categoryId"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    description: formData.get("description"),
    prepTimeMinutes: formData.get("prepTimeMinutes") || 0,
    status: formData.get("status") || "ACTIVE",
    imageUrl: formData.get("imageUrl") || "",
  };

  const parsed = ProductSchema.safeParse(rawData);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { title, categoryId, price, stock, description, prepTimeMinutes, status, imageUrl } = parsed.data;

  // Update product record
  const { error: updateError } = await supabase
    .from("products")
    .update({
      category_id: categoryId,
      title,
      description,
      price,
      stock,
      status,
      prep_time_minutes: prepTimeMinutes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (updateError) {
    return { message: updateError.message };
  }

  // Update image
  if (imageUrl) {
    // Delete existing and re-insert
    await supabase.from("product_images").delete().eq("product_id", productId);
    await supabase.from("product_images").insert({
      product_id: productId,
      image_url: imageUrl,
      display_order: 0,
    });
  }

  revalidatePath("/seller");
  revalidatePath("/protected/marketplace");
  return { success: true, message: "Product updated successfully!" };
}

/**
 * Delete a product.
 */
export async function deleteProductAction(productId: string): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) {
    return { message: "Unauthorized. Please log in." };
  }

  const supabase = await createClient();

  // Verify ownership
  const { data: product } = await supabase
    .from("products")
    .select("id, store:stores(user_id)")
    .eq("id", productId)
    .single();

  const rawStore = Array.isArray(product?.store)
    ? product?.store[0]
    : (product?.store as unknown as { user_id?: string } | undefined);
  const storeOwnerId = rawStore?.user_id;

  if (!product || storeOwnerId !== user.id) {
    return { message: "You do not have permission to delete this product." };
  }

  const { error } = await supabase.from("products").delete().eq("id", productId);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/seller");
  revalidatePath("/protected/marketplace");
  return { success: true, message: "Product deleted." };
}

/**
 * Fast status toggle for quick table actions (ACTIVE / DRAFT / OUT_OF_STOCK).
 */
export async function toggleProductStatusAction(
  productId: string,
  newStatus: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK" | "ARCHIVED"
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) {
    return { message: "Unauthorized." };
  }

  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("id, store:stores(user_id)")
    .eq("id", productId)
    .single();

  const rawToggleStore = Array.isArray(product?.store)
    ? product?.store[0]
    : (product?.store as unknown as { user_id?: string } | undefined);
  const storeOwnerId = rawToggleStore?.user_id;

  if (!product || storeOwnerId !== user.id) {
    return { message: "Permission denied." };
  }

  const { error } = await supabase
    .from("products")
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq("id", productId);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/seller");
  revalidatePath("/protected/marketplace");
  return { success: true };
}
