import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ProtectedLayout } from "@/components/shell/protected-layout";
import { MarketplaceView } from "@/components/marketplace/marketplace-view";
import { ProductItem } from "@/components/marketplace/product-card";
import { Category } from "@/components/marketplace/marketplace-filters";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} — LYNK Marketplace`,
    description: `Browse ${formattedTitle} listings from student entrepreneurs.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login");
  }

  const supabase = await createClient();

  // 2. Fetch categories
  const { data: dbCategories } = await supabase
    .from("categories")
    .select("id, name, slug, icon")
    .order("name");

  let categories: Category[] = (dbCategories || []).map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    icon: c.icon,
  }));

  const activeCat = categories.find((c) => c.slug === slug);

  // 3. Fetch products for this category
  let query = supabase
    .from("products")
    .select(`
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
    `)
    .eq("status", "ACTIVE");

  if (activeCat && activeCat.id) {
    query = query.eq("category_id", activeCat.id);
  }

  const { data: dbProducts } = await query.order("created_at", { ascending: false });

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
        name: rawCategory?.name || "Uncategorized",
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
        owner: rawStore?.owner ? (Array.isArray(rawStore.owner) ? rawStore.owner[0] : rawStore.owner) : undefined,
      },
      images: rawImages
        .map((img) => ({
          image_url: img.image_url,
          display_order: img.display_order,
        }))
        .sort((a, b) => a.display_order - b.display_order),
    };
  });

  const userRole = profile?.role || "BUYER";
  const categoryName = activeCat?.name || slug.split("-").join(" ");

  return (
    <ProtectedLayout user={user} profile={profile}>
      <main className="w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
        <div className="flex flex-col gap-6 mb-8">
          <Link
            href="/protected/marketplace"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink transition-colors self-start"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </Link>

          <div className="flex flex-col gap-2">
            <span className="eyebrow text-kita-green flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              Category
            </span>
            <h1 className="font-display text-3xl font-extrabold text-ink capitalize">
              {categoryName}
            </h1>
            <p className="text-sm text-muted">
              Showing {products.length} {products.length === 1 ? "listing" : "listings"} in this category.
            </p>
          </div>
        </div>

        <MarketplaceView
          initialCategories={categories}
          initialProducts={products}
          userRole={userRole}
          showCta={false}
        />
      </main>
    </ProtectedLayout>
  );
}
