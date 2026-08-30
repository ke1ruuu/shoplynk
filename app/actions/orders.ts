"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export interface UpdateOrderStatusInput {
  orderId: string;
  orderNumber?: string;
  status: "PENDING" | "PAYMENT_REVIEW" | "AWAITING_PAYMENT" | "PREPARING" | "READY_FOR_PICKUP" | "COMPLETED" | "CANCELLED";
}

export async function updateOrderStatusAction({
  orderId,
  orderNumber,
  status,
}: UpdateOrderStatusInput) {
  const { user } = await getCurrentUserProfile();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const supabase = await createClient();

  // 1. Update in Supabase if valid UUID
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId);
  if (isUuid) {
    await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);
  } else if (orderNumber) {
    await supabase
      .from("orders")
      .update({ status })
      .eq("order_number", orderNumber);
  }

  // 2. Update in cookie store
  try {
    const cookieStore = await cookies();
    const existingRaw = cookieStore.get("projectkita_placed_orders")?.value;
    if (existingRaw) {
      const orders = JSON.parse(existingRaw);
      const updated = orders.map((o: any) => {
        if (o.id === orderId || (orderNumber && o.order_number === orderNumber)) {
          return { ...o, status };
        }
        return o;
      });
      cookieStore.set("projectkita_placed_orders", JSON.stringify(updated), {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });
    }
  } catch (err) {
    console.warn("Failed to update status in cookie:", err);
  }

  revalidatePath("/protected");
  revalidatePath("/protected/orders");
  revalidatePath("/seller");
  revalidatePath("/seller/orders");
  revalidatePath("/protected/marketplace");

  return { success: true };
}

export async function cancelOrderAction({
  orderId,
  orderNumber,
  reason,
}: {
  orderId: string;
  orderNumber?: string;
  reason?: string;
}) {
  return await updateOrderStatusAction({
    orderId,
    orderNumber,
    status: "CANCELLED",
  });
}
