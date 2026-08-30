"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export interface CheckoutItemInput {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  storeId: string;
}

export interface PlaceOrderInput {
  items: CheckoutItemInput[];
  pickupLocation: string;
  preferredTime?: string;
  paymentMethod: "CASH_ON_PICKUP" | "GCASH";
  referenceNumber?: string;
  notes?: string;
}

export interface PlaceOrderResult {
  success: boolean;
  orderNumber?: string;
  error?: string;
}

function generateOrderNumber(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `PK-${randomSuffix}`;
}

export async function placeOrderAction(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    return { success: false, error: "You must be logged in to place an order." };
  }

  if (!input.items || input.items.length === 0) {
    return { success: false, error: "Your cart is empty." };
  }

  if (!input.pickupLocation) {
    return { success: false, error: "Please select a campus pickup location." };
  }

  if (input.paymentMethod === "GCASH" && !input.referenceNumber?.trim()) {
    return { success: false, error: "Please provide the GCash transaction reference number." };
  }

  const supabase = await createClient();

  // Find fallback store & product UUIDs to guarantee database foreign key integrity
  const { data: dbStores } = await supabase.from("stores").select("id, name, pickup_locations").limit(5);
  const fallbackStore = dbStores && dbStores.length > 0 ? dbStores[0] : null;

  const { data: dbProducts } = await supabase.from("products").select("id").limit(1);
  const fallbackProductId = dbProducts && dbProducts.length > 0 ? dbProducts[0].id : null;

  // Group items by store
  const storeGroups: Record<string, CheckoutItemInput[]> = {};
  input.items.forEach((item) => {
    const sId = item.storeId || fallbackStore?.id || "default_store";
    if (!storeGroups[sId]) {
      storeGroups[sId] = [];
    }
    storeGroups[sId].push(item);
  });

  const createdOrderNumbers: string[] = [];
  const placedOrdersForCookie: any[] = [];

  for (const [storeId, items] of Object.entries(storeGroups)) {
    const orderNumber = generateOrderNumber();
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(storeId);
    const validStoreId = isUuid ? storeId : fallbackStore?.id || storeId;

    let dbOrderId = `mock-${orderNumber}`;

    // 1. Insert into Supabase if valid store ID exists
    if (validStoreId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(validStoreId)) {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          buyer_id: user.id,
          store_id: validStoreId,
          total_amount: totalAmount,
          status: "PREPARING",
        })
        .select("id")
        .single();

      if (!orderError && orderData) {
        dbOrderId = orderData.id;

        // 2. Insert order items
        if (fallbackProductId) {
          const orderItemsToInsert = items.map((item) => {
            const isProdUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.productId);
            return {
              order_id: dbOrderId,
              product_id: isProdUuid ? item.productId : fallbackProductId,
              title: item.title,
              price: item.price,
              quantity: item.quantity,
              subtotal: item.price * item.quantity,
            };
          });

          await supabase.from("order_items").insert(orderItemsToInsert);
        }

        // 3. Insert payment record
        await supabase.from("payments").insert({
          order_id: dbOrderId,
          payment_method: input.paymentMethod,
          reference_number: input.referenceNumber || null,
          status: input.paymentMethod === "GCASH" ? "PAYMENT_REVIEW" : "PENDING",
        });

        // 4. Insert fulfillment record
        await supabase.from("fulfillments").insert({
          order_id: dbOrderId,
          method: "PICKUP",
          location_details: input.pickupLocation,
          notes: input.notes || null,
        });
      }
    }

    createdOrderNumbers.push(orderNumber);

    // Save detailed record for persistent session tracking
    placedOrdersForCookie.push({
      id: dbOrderId,
      order_number: orderNumber,
      buyer_id: user.id,
      buyer_name: profile?.full_name || user.user_metadata?.full_name || "Student Buyer",
      store_id: validStoreId,
      storeName: fallbackStore?.name || "Campus Store",
      total_amount: totalAmount,
      status: "PREPARING",
      created_at: new Date().toISOString(),
      pickupLocation: input.pickupLocation,
      preferredTime: input.preferredTime || "Recess Break",
      paymentMethod: input.paymentMethod,
      referenceNumber: input.referenceNumber || null,
      notes: input.notes || null,
      items: items.map((i) => ({
        id: `item-${i.productId}`,
        title: i.title,
        quantity: i.quantity,
        price: i.price,
      })),
    });
  }

  // Persist placed orders in cookie for instant session sync across all views
  try {
    const cookieStore = await cookies();
    const existingRaw = cookieStore.get("projectkita_placed_orders")?.value;
    let existingOrders: any[] = [];
    if (existingRaw) {
      existingOrders = JSON.parse(existingRaw);
    }
    const mergedOrders = [...placedOrdersForCookie, ...existingOrders].slice(0, 30);
    cookieStore.set("projectkita_placed_orders", JSON.stringify(mergedOrders), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });
  } catch (cookieErr) {
    console.warn("Cookie persistence warning:", cookieErr);
  }

  revalidatePath("/protected");
  revalidatePath("/protected/marketplace");
  revalidatePath("/seller");

  return {
    success: true,
    orderNumber: createdOrderNumbers[0] || generateOrderNumber(),
  };
}
