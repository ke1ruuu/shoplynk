import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ProtectedLayout } from "@/components/shell/protected-layout";
import { ProductDetailView } from "@/components/marketplace/product-detail-view";
import { ProductCard, ProductItem } from "@/components/marketplace/product-card";

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
    title: `${formattedTitle} — LYNK`,
    description: `Buy ${formattedTitle} on LYNK campus marketplace.`,
  };
}

export default async function ListingDetailsPage({
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

  // Fetch product by slug or ID
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

  let productQuery = supabase
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
      category:categories (id, name, slug),
      store:stores (
        id,
        name,
        slug,
        logo_url,
        pickup_locations,
        operating_hours,
        rating_avg,
        rating_count,
        owner:profiles (full_name, role)
      ),
      images:product_images (image_url, display_order)
    `);

  if (isUuid) {
    productQuery = productQuery.eq("id", slug);
  } else {
    productQuery = productQuery.eq("slug", slug);
  }

  const { data: dbProduct } = await productQuery.single();

  if (!dbProduct) {
    notFound();
  }

  const rawCat = Array.isArray(dbProduct.category)
    ? dbProduct.category[0]
    : dbProduct.category;
  const rawStore = Array.isArray(dbProduct.store)
    ? dbProduct.store[0]
    : dbProduct.store;
  const rawImages = Array.isArray(dbProduct.images) ? dbProduct.images : [];

  const product: ProductItem = {
    id: dbProduct.id,
    title: dbProduct.title,
    slug: dbProduct.slug,
    description: dbProduct.description,
    price: Number(dbProduct.price),
    stock: dbProduct.stock,
    status: dbProduct.status as ProductItem["status"],
    prep_time_minutes: dbProduct.prep_time_minutes,
    category: {
      name: rawCat?.name || "Uncategorized",
      slug: rawCat?.slug || "all",
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

  // Fetch related products
  const { data: dbRelated } = await supabase
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
    .eq("status", "ACTIVE")
    .neq("id", product.id)
    .limit(4);

  const relatedProducts: ProductItem[] = (dbRelated || []).map((p) => {
    const rCat = Array.isArray(p.category) ? p.category[0] : p.category;
    const rStore = Array.isArray(p.store) ? p.store[0] : p.store;
    const rImages = Array.isArray(p.images) ? p.images : [];

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
        name: rCat?.name || "Uncategorized",
        slug: rCat?.slug || "all",
      },
      store: {
        id: rStore?.id || "",
        name: rStore?.name || "Campus Store",
        slug: rStore?.slug || "",
        logo_url: rStore?.logo_url || null,
        pickup_locations: rStore?.pickup_locations || null,
        rating_avg: Number(rStore?.rating_avg || 0),
        rating_count: Number(rStore?.rating_count || 0),
        owner: rStore?.owner ? (Array.isArray(rStore.owner) ? rStore.owner[0] : rStore.owner) : undefined,
      },
      images: rImages
        .map((img) => ({
          image_url: img.image_url,
          display_order: img.display_order,
        }))
        .sort((a, b) => a.display_order - b.display_order),
    };
  });

  return (
    <ProtectedLayout user={user} profile={profile}>
      <main className="w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
        {/* Interactive Product Details & Add to Cart */}
        <ProductDetailView product={product} />

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-line pt-12 mt-12">
            <header className="flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold text-ink">
                More from this Campus
              </h2>
              <Link
                href="/protected/marketplace"
                className="text-xs font-bold text-kita-green hover:underline"
              >
                View all marketplace →
              </Link>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </ProtectedLayout>
  );
}
