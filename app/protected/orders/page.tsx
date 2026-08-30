import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ProtectedLayout } from "@/components/shell/protected-layout";
import { OrdersView } from "@/components/orders/orders-view";
import { BuyerOrder } from "@/components/dashboard/buyer-dashboard-view";
import { ProductItem } from "@/components/marketplace/product-card";

export const metadata: Metadata = {
  title: "My Campus Orders — Project Kita",
  description: "Track your active orders, break-time pickups, and receipts at LYFJSHS.",
};

export default async function MyOrdersPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?next=/protected/orders");
  }

  const supabase = await createClient();

  // 1. Fetch user orders from database
  const { data: dbOrders } = await supabase
    .from("orders")
    .select(
      `
      id,
      order_number,
      total_amount,
      status,
      created_at,
      store:stores (name, pickup_locations),
      items:order_items (id, title, quantity, price),
      fulfillment:fulfillments (location_details, preferred_time, notes),
      payment:payments (payment_method, reference_number, status)
    `
    )
    .eq("buyer_id", user.id)
    .order("created_at", { ascending: false });

  let orders: BuyerOrder[] = (dbOrders || []).map((o) => {
    const store = Array.isArray(o.store) ? o.store[0] : o.store;
    const fulfillment = Array.isArray(o.fulfillment) ? o.fulfillment[0] : o.fulfillment;
    const payment = Array.isArray(o.payment) ? o.payment[0] : o.payment;
    const rawItems = Array.isArray(o.items) ? o.items : [];

    return {
      id: o.id,
      order_number: o.order_number,
      total_amount: Number(o.total_amount || 0),
      status: o.status,
      created_at: o.created_at,
      storeName: store?.name || "Campus Store",
      pickupLocation: fulfillment?.location_details || store?.pickup_locations || "Main Canteen Handoff Area",
      preferredTime: fulfillment?.preferred_time || "Recess Break (9:45 AM - 10:15 AM)",
      paymentMethod: payment?.payment_method || "CASH_ON_PICKUP",
      referenceNumber: payment?.reference_number || null,
      notes: fulfillment?.notes || null,
      items: rawItems.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: Number(item.price),
      })),
    };
  });

  // 2. Read placed orders from session cookies (strictly for current buyer)
  try {
    const cookieStore = await cookies();
    const cookiePlaced = cookieStore.get("projectkita_placed_orders")?.value;
    if (cookiePlaced) {
      const parsedOrders = JSON.parse(cookiePlaced);
      parsedOrders.forEach((co: any) => {
        // Only include if the logged-in user is the one who placed the order!
        const isMyOrder = co.buyer_id === user.id;

        if (isMyOrder && !orders.some((o) => o.order_number === co.order_number)) {
          orders.unshift({
            id: co.id || co.order_number,
            order_number: co.order_number,
            total_amount: Number(co.total_amount || 0),
            status: co.status || "PREPARING",
            created_at: co.created_at || new Date().toISOString(),
            storeName: co.storeName || "Campus Store",
            pickupLocation: co.pickupLocation || "Main Canteen Handoff Area",
            preferredTime: co.preferredTime || "Recess Break (9:45 AM - 10:15 AM)",
            paymentMethod: co.paymentMethod || "CASH_ON_PICKUP",
            referenceNumber: co.referenceNumber || null,
            notes: co.notes || null,
            items: co.items || [],
          });
        }
      });
    }
  } catch (err) {
    console.warn("Error reading cookie orders:", err);
  }

  // 3. Fetch recommended products to display below the tracking rail
  const { data: dbProducts } = await supabase
    .from("products")
    .select(
      `
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
    `
    )
    .eq("status", "ACTIVE")
    .limit(4);

  let recommendedProducts: ProductItem[] = (dbProducts || []).map((p) => {
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
        name: rawCategory?.name || "General",
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
      },
      images: rawImages
        .map((img) => ({
          image_url: img.image_url,
          display_order: img.display_order,
        }))
        .sort((a, b) => a.display_order - b.display_order),
    };
  });

  const displayName = profile?.full_name || user.user_metadata?.full_name || "Student Member";

  return (
    <ProtectedLayout user={user} profile={profile}>
      <main>
        <OrdersView
          displayName={displayName}
          orders={orders}
          recommendedProducts={recommendedProducts}
        />
      </main>
    </ProtectedLayout>
  );
}
