import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Store,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  ShoppingBag,
  ShieldCheck,
  Share2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProtectedLayout } from "@/components/shell/protected-layout";
import { ProductCard, ProductItem } from "@/components/marketplace/product-card";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

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
    title: `${formattedTitle} — Project Kita`,
    description: `Buy ${formattedTitle} on Project Kita campus marketplace.`,
  };
}

export default async function ListingDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 1. Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*, campuses(name, code)")
    .eq("id", user.id)
    .single();

  // 2. Fetch specific product by slug or ID
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

  let product: ProductItem;

  if (dbProduct) {
    const rawCat = Array.isArray(dbProduct.category)
      ? dbProduct.category[0]
      : dbProduct.category;
    const rawStore = Array.isArray(dbProduct.store)
      ? dbProduct.store[0]
      : dbProduct.store;
    const rawImages = Array.isArray(dbProduct.images) ? dbProduct.images : [];

    product = {
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
  } else {
    // Fallback to MOCK_PRODUCTS
    const foundMock = MOCK_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
    if (!foundMock) {
      notFound();
    }
    product = foundMock;
  }

  const images =
    product.images && product.images.length > 0
      ? product.images.map((img) => img.image_url)
      : [
          "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        ];

  // 3. Fetch related products from same category or store
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

  let relatedProducts: ProductItem[] = (dbRelated || []).map((p) => {
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

  if (relatedProducts.length === 0) {
    relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id && p.category.slug === product.category.slug).slice(0, 4);
    if (relatedProducts.length === 0) {
      relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
    }
  }

  return (
    <ProtectedLayout user={user} profile={profile}>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Back */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/protected/marketplace"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-flyer hover:bg-paper"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
          </div>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-paper-deep shadow-flyer">
              <Image
                src={images[0]}
                alt={product.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <span className="absolute top-4 left-4 eyebrow text-xs tracking-[0.14em] text-ink bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-sm">
                {product.category?.name || "Product"}
              </span>
            </div>

            {/* Thumbnail selector if multiple images exist */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 border-kita-green ring-2 ring-kita-green/20"
                  >
                    <Image
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info & Checkout Box (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-flyer">
            <div className="flex flex-col gap-5">
              {/* Store & Seller Badge Header */}
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kita-green-soft text-kita-green shadow-flyer">
                    <Store className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-base text-ink leading-tight">
                      {product.store?.name}
                    </span>
                    <span className="text-xs text-muted">
                      {product.store?.owner?.full_name || "Verified Student Seller"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-kita-green-soft px-3 py-1 text-xs font-bold text-kita-green">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Seller</span>
                </div>
              </div>

              {/* Title & Rating */}
              <div className="flex flex-col gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink leading-tight">
                  {product.title}
                </h1>
                {product.store?.rating_count > 0 && (
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Star className="h-4 w-4 fill-spark text-spark" />
                    <span>{Number(product.store.rating_avg).toFixed(1)}</span>
                    <span className="text-xs text-muted">
                      ({product.store.rating_count} store reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Price & Stock */}
              <div className="flex items-baseline gap-3">
                <span className="tabular text-3xl sm:text-4xl font-extrabold text-ink">
                  ₱{Number(product.price).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                </span>
                {product.stock > 0 ? (
                  <span className="rounded-full bg-kita-green-soft px-2.5 py-0.5 text-xs font-bold text-kita-green">
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="flex flex-col gap-1 border-t border-dashed border-line pt-4">
                  <span className="eyebrow text-xs text-muted">Description</span>
                  <p className="text-sm text-ink leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Prep Time & Pickup Details */}
              <div className="flex flex-col gap-2 rounded-xl bg-paper p-4 text-xs text-muted border border-line">
                {product.prep_time_minutes && product.prep_time_minutes > 0 ? (
                  <div className="flex items-center gap-2 text-ink">
                    <Clock className="h-4 w-4 text-kita-green flex-shrink-0" />
                    <span>
                      Preparation time: <strong>{product.prep_time_minutes} minutes</strong>
                    </span>
                  </div>
                ) : null}
                {product.store?.pickup_locations && (
                  <div className="flex items-start gap-2 text-ink">
                    <MapPin className="h-4 w-4 text-kita-green flex-shrink-0 mt-0.5" />
                    <span>
                      Campus pickup: <strong>{product.store.pickup_locations}</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4 border-t border-line">
              <button
                type="button"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-kita-green px-6 text-base font-semibold text-white shadow-flyer transition-all hover:bg-kita-green-deep"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Cart · ₱{Number(product.price).toLocaleString()}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted">
                <ShieldCheck className="h-4 w-4 text-kita-green" />
                <span>Campus-gated transaction · Verified Member</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-line pt-12">
            <header className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-extrabold text-ink">
                More Campus Listings
              </h2>
              <Link
                href="/protected/marketplace"
                className="text-sm font-semibold text-kita-green hover:underline"
              >
                View all
              </Link>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onSelect={() => {}} />
              ))}
            </div>
          </section>
        )}
      </main>
    </ProtectedLayout>
  );
}
