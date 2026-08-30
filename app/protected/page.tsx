import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ProtectedLayout } from "@/components/shell/protected-layout";
import {
  BuyerDashboardView,
  type BuyerOrder,
} from "@/components/dashboard/buyer-dashboard-view";
import { ProductItem } from "@/components/marketplace/product-card";

export const metadata: Metadata = {
  title: "Shop Campus Marketplace — LYNK",
  description: "Browse trending student products, homemade treats, and school merchandise at LYFJSHS.",
};

export default async function ProtectedDashboardHomePage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login");
  }

  // Admins only access the Admin Console
  if (profile?.role === "CAMPUS_ADMIN" || profile?.role === "PLATFORM_ADMIN") {
    redirect("/admin");
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
      fulfillment:fulfillments (location_details, preferred_time)
    `
    )
    .eq("buyer_id", user.id)
    .order("created_at", { ascending: false });

  let orders: BuyerOrder[] = (dbOrders || []).map((o) => {
    const store = Array.isArray(o.store) ? o.store[0] : o.store;
    const fulfillment = Array.isArray(o.fulfillment) ? o.fulfillment[0] : o.fulfillment;
    const rawItems = Array.isArray(o.items) ? o.items : [];

    return {
      id: o.id,
      order_number: o.order_number,
      total_amount: Number(o.total_amount || 0),
      status: o.status,
      created_at: o.created_at,
      storeName: store?.name || "Campus Store",
      pickupLocation: fulfillment?.location_details || store?.pickup_locations || null,
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
            items: co.items || [],
          });
        }
      });
    }
  } catch (err) {
    console.warn("Error reading cookie orders:", err);
  }

  // 3. Fetch categories
  const { data: dbCategories } = await supabase
    .from("categories")
    .select("name, slug")
    .order("name");

  const categories = [
    { name: "All Items", slug: "all" },
    ...(dbCategories || []),
  ];

  // 4. Fetch active products
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
    .order("created_at", { ascending: false })
    .limit(24);

  let products: ProductItem[] = (dbProducts || []).map((p) => {
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
        owner: rawStore?.owner
          ? Array.isArray(rawStore.owner)
            ? rawStore.owner[0]
            : rawStore.owner
          : undefined,
      },
      images: rawImages
        .map((img) => ({
          image_url: img.image_url,
          display_order: img.display_order,
        }))
        .sort((a, b) => a.display_order - b.display_order),
    };
  });

  return (
    <ProtectedLayout user={user} profile={profile}>
      <main>
        <BuyerDashboardView
          displayName={profile?.full_name || user.user_metadata?.full_name || "Member"}
          campusName="Luis Y. Ferrer Jr. Senior High School"
          isSeller={profile?.role === "SELLER"}
          orders={orders}
          categories={categories}
          products={products}
        />
      </main>
    </ProtectedLayout>
  );
}
