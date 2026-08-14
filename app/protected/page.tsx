import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutGrid,
  Store,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProtectedLayout } from "@/components/shell/protected-layout";

export const metadata: Metadata = {
  title: "Dashboard Home — Project Kita",
  description: "Authenticated member dashboard for LYFJSHS campus community.",
};

const SEEDED_CATEGORIES = [
  { name: "Food & Drinks", icon: "🍱", slug: "food-and-drinks" },
  { name: "Handmade Crafts", icon: "🎨", slug: "handmade-crafts" },
  { name: "Student Merchandise", icon: "👕", slug: "student-merchandise" },
  { name: "School & Stationery", icon: "📚", slug: "school-and-stationery" },
  { name: "Lifestyle Goods", icon: "✨", slug: "lifestyle-goods" },
];

export default async function ProtectedDashboardHomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 1. Fetch user profile from Supabase
  const { data: profile } = await supabase
    .from("profiles")
    .select("*, campuses(name, code)")
    .eq("id", user.id)
    .single();

  const displayName =
    profile?.full_name || user.user_metadata?.full_name || "Member";
  const campusName = profile?.campuses?.name || "Luis Y. Ferrer Jr. Senior High School";

  return (
    <ProtectedLayout user={user} profile={profile}>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-2xl border border-kita-green/20 bg-kita-green p-6 sm:p-10 text-white shadow-flyer-lg">
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative z-10 flex flex-col items-start gap-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-spark backdrop-blur-sm">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Authenticated Shell Active
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight">
              Welcome back, <span className="text-spark">{displayName}</span>!
            </h1>
            <p className="text-base text-white/85 leading-relaxed">
              You are signed into the private campus marketplace for{" "}
              <span className="font-semibold text-white">{campusName}</span>.
            </p>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Marketplace Navigation Card */}
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-flyer">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-kita-green flex items-center gap-1.5">
                  <LayoutGrid className="h-3.5 w-3.5" />
                  Campus Commerce
                </span>
                <span className="rounded-full bg-kita-green-soft px-2.5 py-0.5 text-xs font-bold text-kita-green">
                  Live Beta
                </span>
              </div>
              <h2 className="font-display text-2xl font-extrabold text-ink">
                Explore Marketplace
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                Discover live products, snacks, review notes, and services from verified student entrepreneurs across campus.
              </p>
            </div>

            <Link
              href="/protected/marketplace"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-kita-green px-6 py-3.5 text-base font-semibold text-white shadow-flyer transition-all hover:bg-kita-green-deep"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Enter Marketplace</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Seller Verification Nudge Card */}
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-spark/40 bg-spark-soft/30 p-6 sm:p-8 shadow-flyer">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-spark-ink flex items-center gap-1.5">
                  <Store className="h-3.5 w-3.5" />
                  Student Entrepreneur
                </span>
                <Sparkles className="h-4 w-4 text-spark-ink" />
              </div>
              <h2 className="font-display text-2xl font-extrabold text-ink">
                Start Selling on Campus
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                Submit your student ID verification to unlock storefront creation, catalog management, and order fulfillment.
              </p>
            </div>

            <Link
              href="/seller/verification"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-kita-green px-6 py-3.5 text-base font-semibold text-white shadow-flyer transition-all hover:bg-kita-green-deep"
            >
              <span>Get Verified to Sell</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Campus Categories Shortcuts */}
        <section className="flex flex-col gap-4 border-t border-line pt-8">
          <header className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-2xl font-extrabold text-ink">
                Marketplace Categories
              </h2>
              <p className="text-xs text-muted">
                Seeded categories for student and faculty listings
              </p>
            </div>
            <Link
              href="/protected/marketplace"
              className="text-sm font-semibold text-kita-green hover:underline"
            >
              View all
            </Link>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SEEDED_CATEGORIES.map(({ name, icon, slug }) => (
              <Link
                key={slug}
                href={`/protected/marketplace/category/${slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-flyer transition-all hover:border-kita-green/40 hover:-translate-y-1"
              >
                <span className="text-3xl transition-transform group-hover:scale-110">{icon}</span>
                <span className="font-display font-bold text-sm text-ink leading-tight group-hover:text-kita-green transition-colors">
                  {name}
                </span>
                <span className="text-xs text-muted flex items-center gap-1">
                  <span>Browse</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Security & Access Footer Notice */}
        <div className="flex items-center justify-between rounded-xl bg-surface border border-line p-4 text-xs text-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-kita-green flex-shrink-0" />
            <span>Campus-gated authentication &amp; Row-Level Security active</span>
          </div>
          <div className="flex items-center gap-1 text-ink font-semibold">
            <MapPin className="h-3.5 w-3.5 text-kita-green" />
            <span>{campusName}</span>
          </div>
        </div>
      </main>
    </ProtectedLayout>
  );
}
