import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ensureSellerStoreAction } from "@/app/actions/seller";
import { SellerStudioView, SellerOrder } from "@/components/seller/seller-studio-view";
export const metadata: Metadata = {
  title: "Seller Studio Dashboard — Project Kita",
  description: "Manage your campus store catalog, incoming student orders, and inventory.",
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
      <main className="mx-auto max-w-lg px-4 py-16">
        <div className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface p-6">
          <h1 className="text-base font-semibold text-ink">
            We couldn&rsquo;t open your storefront
          </h1>
          <p className="text-sm leading-relaxed text-muted">
            {storeError ||
              "Something went wrong while setting up your store. Nothing has been lost — try again in a moment."}
          </p>
          <a
            href="/seller"
            className="inline-flex h-9 items-center rounded-md bg-kita-green px-3.5 text-sm font-semibold text-white transition-colors hover:bg-kita-green-deep"
          >
            Try again
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

  const categories = dbCategories || [];

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

  // 4. Fetch incoming store orders
  const { data: dbOrders } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      total_amount,
      status,
      created_at,
      buyer:profiles!orders_buyer_id_fkey (id, full_name),
      items:order_items (id, title, quantity, price, subtotal),
      fulfillment:fulfillments (location_details, preferred_time, notes),
      payment:payments (payment_method, reference_number, status)
    `)
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  let orders: SellerOrder[] = (dbOrders || []).map((o) => {
    const buyer = Array.isArray(o.buyer) ? o.buyer[0] : o.buyer;
    const fulfillment = Array.isArray(o.fulfillment) ? o.fulfillment[0] : o.fulfillment;
    const payment = Array.isArray(o.payment) ? o.payment[0] : o.payment;
    const rawItems = Array.isArray(o.items) ? o.items : [];

    return {
      id: o.id,
      order_number: o.order_number,
      buyer_name: buyer?.full_name || "Student Customer",
      total_amount: Number(o.total_amount || 0),
      status: o.status,
      created_at: o.created_at,
      pickup_location: fulfillment?.location_details || store.pickup_locations || "Campus Handoff Area",
      notes: fulfillment?.notes || null,
      payment_method: payment?.payment_method || "CASH_ON_PICKUP",
      items: rawItems.map((i) => ({
        id: i.id,
        title: i.title,
        quantity: i.quantity,
        price: Number(i.price),
        subtotal: Number(i.subtotal || i.price * i.quantity),
      })),
    };
  });

  // Read session cookie orders (filtered strictly for this store)
  try {
    const cookieStore = await cookies();
    const cookiePlaced = cookieStore.get("projectkita_placed_orders")?.value;
    if (cookiePlaced) {
      const parsedOrders = JSON.parse(cookiePlaced);
      parsedOrders.forEach((co: any) => {
        const isForThisStore =
          (store?.id && co.store_id === store.id) ||
          (store?.name && co.storeName === store.name) ||
          (!co.store_id && !store?.id);

        if (isForThisStore && !orders.some((o) => o.order_number === co.order_number)) {
          orders.unshift({
            id: co.id || co.order_number,
            order_number: co.order_number,
            buyer_name: co.buyer_name || "Student Customer",
            total_amount: Number(co.total_amount || 0),
            status: co.status || "PREPARING",
            created_at: co.created_at || new Date().toISOString(),
            pickup_location: co.pickupLocation || store.pickup_locations || "Main Canteen Handoff",
            notes: co.notes || null,
            payment_method: co.paymentMethod || "CASH_ON_PICKUP",
            items: co.items || [],
          });
        }
      });
    }
  } catch (err) {
    console.warn("Cookie order read error:", err);
  }

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
        orders={orders}
      />
    </main>
  );
}
