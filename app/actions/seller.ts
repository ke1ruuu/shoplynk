"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser, getCurrentUserProfile, setSessionCookie } from "@/lib/auth/session";
import { invalidateCache } from "@/lib/cache";

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
  isActive: z.enum(["true", "false"]).transform((val) => val === "true"),
  logoUrl: z.string().trim().optional().default(""),
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

  // 1. Verify user profile has SELLER role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "SELLER") {
    return {
      store: null,
      error: "You are not verified as a campus seller. Please submit your student ID verification to unlock the Seller Studio.",
    };
  }

  // 2. Check for existing store
  const { data: existingStore } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingStore) {
    return { store: existingStore, error: null };
  }

  // 3. Provision new store for verified seller
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
    isActive: formData.get("isActive") || "true",
    logoUrl: formData.get("logoUrl") || "",
  };

  const parsed = StoreSettingsSchema.safeParse(rawData);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { name, description, gcashName, gcashNumber, pickupLocations, operatingHours, isActive, logoUrl } = parsed.data;

  const { error } = await supabase
    .from("stores")
    .update({
      name,
      description,
      gcash_name: gcashName,
      gcash_number: gcashNumber,
      pickup_locations: pickupLocations,
      operating_hours: operatingHours,
      is_active: isActive,
      logo_url: logoUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) {
    return { message: error.message };
  }

  // Also sync profile avatar if logo is provided
  if (logoUrl) {
    await supabase
      .from("profiles")
      .update({ avatar_url: logoUrl })
      .eq("id", user.id);
  }

  invalidateCache("catalog:products:dashboard");
  invalidateCache("catalog:categories:short");
  revalidatePath("/seller/settings");
  revalidatePath("/seller");
  revalidatePath("/protected/marketplace");
  return { success: true, message: "Store profile and settings saved successfully!" };
}

/**
 * Fast toggle for activating/deactivating a storefront.
 */
export async function toggleStoreActiveAction(isActive: boolean): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) {
    return { message: "Unauthorized. Please log in." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("stores")
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("user_id", user.id);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/seller");
  revalidatePath("/protected/marketplace");
  return {
    success: true,
    message: isActive ? "Storefront activated and live!" : "Storefront deactivated/paused.",
  };
}

/**
 * Permanently delete the seller's storefront and all associated products.
 * Downgrades the profile back to 'BUYER'.
 */
export async function deleteStorefrontAction(): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) {
    return { message: "Unauthorized. Please log in." };
  }

  const supabase = await createClient();

  // 1. Get the seller's store
  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (store) {
    // 2. Delete product images & products for this store
    const { data: products } = await supabase
      .from("products")
      .select("id")
      .eq("store_id", store.id);

    if (products && products.length > 0) {
      const productIds = products.map((p) => p.id);
      await supabase.from("product_images").delete().in("product_id", productIds);
      await supabase.from("products").delete().eq("store_id", store.id);
    }

    // 3. Delete store record
    await supabase.from("stores").delete().eq("id", store.id);
  }

  // 4. Downgrade profile to BUYER
  await supabase
    .from("profiles")
    .update({
      role: "BUYER",
      is_verified_seller: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  // 5. Update session cookie
  await setSessionCookie({
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: "BUYER",
  });

  revalidatePath("/", "layout");
  redirect("/protected");
}

/**
 * Admin action to remove / deactivate a campus store and downgrade the student seller.
 */
export async function adminRemoveStoreAction(
  storeId: string,
  deletePermanently = true
): Promise<{ success: boolean; message?: string }> {
  try {
    const { user, profile } = await getCurrentUserProfile();
    if (!user || (profile?.role !== "CAMPUS_ADMIN" && profile?.role !== "PLATFORM_ADMIN")) {
      return { success: false, message: "Unauthorized. Admin privileges required." };
    }

    const supabase = await createClient();

    // 1. Fetch store info
    const { data: store, error: storeErr } = await supabase
      .from("stores")
      .select("id, user_id, name")
      .eq("id", storeId)
      .maybeSingle();

    if (storeErr || !store) {
      return { success: false, message: "Store not found." };
    }

    const ownerId = store.user_id;

    if (deletePermanently) {
      // Step A: Find and clean up all orders placed on this store
      const { data: storeOrders } = await supabase
        .from("orders")
        .select("id")
        .eq("store_id", storeId);

      if (storeOrders && storeOrders.length > 0) {
        const orderIds = storeOrders.map((o) => o.id);
        await supabase.from("payments").delete().in("order_id", orderIds);
        await supabase.from("fulfillments").delete().in("order_id", orderIds);
        await supabase.from("reviews").delete().in("order_id", orderIds);
        await supabase.from("order_items").delete().in("order_id", orderIds);
        await supabase.from("orders").delete().in("id", orderIds);
      }

      // Step B: Find all products in this store
      const { data: products } = await supabase
        .from("products")
        .select("id")
        .eq("store_id", storeId);

      if (products && products.length > 0) {
        const productIds = products.map((p) => p.id);
        await supabase.from("order_items").delete().in("product_id", productIds);
        await supabase.from("cart_items").delete().in("product_id", productIds);
        await supabase.from("favorite_items").delete().in("product_id", productIds);
        await supabase.from("product_images").delete().in("product_id", productIds);
        await supabase.from("reviews").delete().in("product_id", productIds);
        await supabase.from("products").delete().in("id", productIds);
      }

      // Step C: Clean up conversations & messages
      const { data: convs } = await supabase
        .from("conversations")
        .select("id")
        .eq("store_id", storeId);

      if (convs && convs.length > 0) {
        const convIds = convs.map((c) => c.id);
        await supabase.from("messages").delete().in("conversation_id", convIds);
        await supabase.from("conversations").delete().in("id", convIds);
      }

      // Step D: Delete the store record
      const { error: deleteStoreErr } = await supabase
        .from("stores")
        .delete()
        .eq("id", storeId);

      if (deleteStoreErr) {
        console.warn("Hard delete error, falling back to soft deactivation:", deleteStoreErr);
        await supabase
          .from("stores")
          .update({ is_active: false, updated_at: new Date().toISOString() })
          .eq("id", storeId);
      }
    } else {
      // Soft Deactivate store & products
      await supabase
        .from("stores")
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq("id", storeId);

      await supabase
        .from("products")
        .update({ status: "DRAFT", updated_at: new Date().toISOString() })
        .eq("store_id", storeId);
    }

    // Step E: Downgrade owner if no other active stores
    if (ownerId) {
      const { data: otherStores } = await supabase
        .from("stores")
        .select("id")
        .eq("user_id", ownerId)
        .neq("id", storeId)
        .eq("is_active", true);

      if (!otherStores || otherStores.length === 0) {
        await supabase
          .from("profiles")
          .update({
            role: "BUYER",
            is_verified_seller: false,
            updated_at: new Date().toISOString(),
          })
          .eq("id", ownerId);

        // Also update student verification record
        await supabase
          .from("student_verifications")
          .update({
            status: "REJECTED",
            rejection_reason: "Store removed by campus administration.",
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", ownerId);
      }
    }

    revalidatePath("/admin", "page");
    revalidatePath("/admin/stores", "page");
    revalidatePath("/protected/marketplace", "page");
    revalidatePath("/seller", "page");

    return { success: true };
  } catch (err: any) {
    console.error("adminRemoveStoreAction exception:", err);
    return { success: false, message: err?.message || "Failed to remove store." };
  }
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

  await invalidateCache("catalog:products");
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

  await invalidateCache("catalog:products");
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

  await invalidateCache("catalog:products");
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

  await invalidateCache("catalog:products");
  revalidatePath("/seller");
  revalidatePath("/protected/marketplace");
  return { success: true };
}
