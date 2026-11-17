import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ensureSellerStoreAction } from "@/app/actions/seller";
import { SellerOrdersView, SellerOrder } from "@/components/seller/seller-orders-view";

export const metadata: Metadata = {
  title: "Store Orders Management — Seller Studio | Project Kita",
  description: "Manage incoming customer pre-orders, kitchen prep queues, and break-time handoffs.",
};

export default async function SellerOrdersPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?next=/seller/orders");
  }

  // Gate: Only verified sellers can access Seller Studio
  if (profile?.role !== "SELLER") {
    if (profile?.role === "CAMPUS_ADMIN" || profile?.role === "PLATFORM_ADMIN") {
      redirect("/admin");
    }
    redirect("/seller/verification");
  }

  // 1. Ensure user has an initialized store
  const { store } = await ensureSellerStoreAction();

  const supabase = await createClient();

  // 2. Fetch incoming store orders
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
    .eq("store_id", store?.id || "")
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
      pickup_location: fulfillment?.location_details || store?.pickup_locations || "School Ground",
      preferred_time: fulfillment?.preferred_time || "1st Recess Morning Shift (8:20 AM - 8:40 AM)",
      notes: fulfillment?.notes || null,
      payment_method: payment?.payment_method || "CASH_ON_PICKUP",
      reference_number: payment?.reference_number || null,
      items: rawItems.map((i) => ({
        id: i.id,
        title: i.title,
        quantity: i.quantity,
        price: Number(i.price),
        subtotal: Number(i.subtotal || i.price * i.quantity),
      })),
    };
  });

  // Read session cookie orders (filtered strictly for this seller store)
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
            pickup_location: co.pickupLocation || store?.pickup_locations || "School Ground",
            preferred_time: co.preferredTime || "1st Recess Morning Shift (8:20 AM - 8:40 AM)",
            notes: co.notes || null,
            payment_method: co.paymentMethod || "CASH_ON_PICKUP",
            reference_number: co.referenceNumber || null,
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
      <SellerOrdersView
        storeName={store?.name || "My Student Store"}
        orders={orders}
      />
    </main>
  );
}
