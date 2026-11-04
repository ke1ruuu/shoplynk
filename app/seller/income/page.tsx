import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ensureSellerStoreAction } from "@/app/actions/seller";
import { IncomeMonitoringView } from "@/components/seller/income-monitoring-view";
import { SellerOrder } from "@/components/seller/seller-orders-view";

export const metadata: Metadata = {
  title: "Income & Sales Monitoring — Seller Studio | Project Kita",
  description: "Monitor real-time student purchases, cash on pickup flows, and realized earnings on campus.",
};

export default async function SellerIncomePage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?next=/seller/income");
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

  // 2. Fetch incoming store orders and purchase transactions
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
      pickup_location: fulfillment?.location_details || store?.pickup_locations || "Main Canteen Handoff",
      preferred_time: fulfillment?.preferred_time || "Recess Break (9:45 AM - 10:15 AM)",
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

  // Read session cookie orders (strictly filtered for this seller store)
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
            pickup_location: co.pickupLocation || store?.pickup_locations || "Main Canteen Handoff Area",
            preferred_time: co.preferredTime || "Recess Break (9:45 AM - 10:15 AM)",
            notes: co.notes || null,
            payment_method: co.paymentMethod || "CASH_ON_PICKUP",
            reference_number: co.referenceNumber || null,
            items: co.items || [],
          });
        }
      });
    }
  } catch (err) {
    console.warn("Cookie order read error in income monitoring:", err);
  }

  // Provide initial demonstration transactions if the store has zero orders yet
  if (orders.length === 0) {
    const now = Date.now();
    orders = [
      {
        id: "demo-ord-1",
        order_number: "PK-1082",
        buyer_name: "Alyssa Nicole Ramos",
        total_amount: 140,
        status: "COMPLETED",
        created_at: new Date(now - 1000 * 60 * 35).toISOString(),
        pickup_location: "Main Canteen Table 4",
        preferred_time: "Recess Break (9:45 AM - 10:15 AM)",
        notes: "Please add extra napkins",
        payment_method: "CASH_ON_PICKUP",
        reference_number: null,
        items: [
          { id: "it-1", title: "Homemade Choco Brownies", quantity: 2, price: 45, subtotal: 90 },
          { id: "it-2", title: "Iced Caramel Macchiato", quantity: 1, price: 50, subtotal: 50 },
        ],
      },
      {
        id: "demo-ord-2",
        order_number: "PK-2940",
        buyer_name: "Carl Justin Mendoza",
        total_amount: 195,
        status: "READY_FOR_PICKUP",
        created_at: new Date(now - 1000 * 60 * 85).toISOString(),
        pickup_location: "Building A (Senior High Hallway)",
        preferred_time: "Lunch Break (11:45 AM - 12:45 PM)",
        notes: null,
        payment_method: "GCASH",
        reference_number: "1098234819283",
        items: [
          { id: "it-3", title: "Crispy Chicken Poppers Rice Bowl", quantity: 1, price: 120, subtotal: 120 },
          { id: "it-4", title: "Classic Milk Tea w/ Pearls", quantity: 1, price: 75, subtotal: 75 },
        ],
      },
      {
        id: "demo-ord-3",
        order_number: "PK-4105",
        buyer_name: "Danielle Marie Cruz",
        total_amount: 80,
        status: "PREPARING",
        created_at: new Date(now - 1000 * 60 * 140).toISOString(),
        pickup_location: "Student Council Lounge",
        preferred_time: "Dismissal / After Class (4:30 PM - 5:15 PM)",
        notes: "Will pick up right after dismissal bell",
        payment_method: "CASH_ON_PICKUP",
        reference_number: null,
        items: [
          { id: "it-5", title: "Cheesy Toasted Empanada", quantity: 2, price: 40, subtotal: 80 },
        ],
      },
      {
        id: "demo-ord-4",
        order_number: "PK-5519",
        buyer_name: "Jethro Vance Santos",
        total_amount: 160,
        status: "COMPLETED",
        created_at: new Date(now - 1000 * 60 * 320).toISOString(),
        pickup_location: "Main Canteen Handoff Area",
        preferred_time: "Recess Break (9:45 AM - 10:15 AM)",
        notes: null,
        payment_method: "GCASH",
        reference_number: "9834710294821",
        items: [
          { id: "it-6", title: "Handmade Strawberry Danish", quantity: 2, price: 80, subtotal: 160 },
        ],
      },
    ];
  }

  return (
    <main>
      <IncomeMonitoringView
        storeName={store?.name || "Student Storefront"}
        storeSlug={store?.slug}
        orders={orders}
      />
    </main>
  );
}

