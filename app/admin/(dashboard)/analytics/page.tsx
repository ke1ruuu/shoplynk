import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  BarChart3,
  Users,
  Store,
  Package,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  PhilippinePeso,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Campus Analytics — Admin Console",
  description: "Platform metrics and student commerce insights for LYFJSHS.",
};

export default async function AdminAnalyticsPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user || (profile?.role !== "CAMPUS_ADMIN" && profile?.role !== "PLATFORM_ADMIN")) {
    redirect("/admin/login");
  }

  const supabase = await createClient();

  // 1. Total users by role
  const { data: profiles } = await supabase.from("profiles").select("id, role");
  const totalUsers = profiles?.length || 0;
  const sellerCount = profiles?.filter((p) => p.role === "SELLER").length || 0;
  const buyerCount = profiles?.filter((p) => p.role === "BUYER").length || 0;

  // 2. Total stores
  const { data: stores } = await supabase.from("stores").select("id, is_active");
  const totalStores = stores?.length || 0;
  const activeStores = stores?.filter((s) => s.is_active).length || 0;

  // 3. Total products & inventory worth
  const { data: products } = await supabase.from("products").select("id, price, stock, status");
  const totalProducts = products?.length || 0;
  const activeProducts = products?.filter((p) => p.status === "ACTIVE").length || 0;
  const totalCatalogWorth = (products || []).reduce(
    (acc, p) => acc + Number(p.price || 0) * Number(p.stock || 0),
    0
  );

  // 4. Verifications summary
  const { data: verifs } = await supabase.from("student_verifications").select("id, status");
  const totalVerifs = verifs?.length || 0;
  const pendingVerifs = verifs?.filter((v) => v.status === "PENDING").length || 0;
  const approvedVerifs = verifs?.filter((v) => v.status === "APPROVED").length || 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-8">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-flyer">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#D92323 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-2 text-kita-green">
            <BarChart3 className="h-5 w-5" />
            <span className="eyebrow">Platform Insights</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-ink leading-tight">
            Campus Commerce Overview
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            Real-time activity and entrepreneurship statistics for Luis Y. Ferrer Jr. Senior High School.
          </p>
        </div>
      </header>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-surface p-5 shadow-flyer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">Total Campus Users</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-kita-green-soft text-kita-green">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-3xl font-extrabold text-ink">{totalUsers}</span>
            <span className="text-[11px] text-muted">
              {buyerCount} Buyers • {sellerCount} Sellers
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-surface p-5 shadow-flyer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">Verified Storefronts</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-kita-green-soft text-kita-green">
              <Store className="h-4 w-4" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-3xl font-extrabold text-ink">{totalStores}</span>
            <span className="text-[11px] text-muted">{activeStores} open for orders</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-surface p-5 shadow-flyer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">Active Listings</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-kita-green-soft text-kita-green">
              <Package className="h-4 w-4" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-3xl font-extrabold text-ink">{activeProducts}</span>
            <span className="text-[11px] text-muted">of {totalProducts} catalog items</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-surface p-5 shadow-flyer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">Total Catalog Worth</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-spark-soft text-spark-ink">
              <PhilippinePeso className="h-4 w-4" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-3xl font-extrabold text-ink">
              ₱{totalCatalogWorth.toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
            <span className="text-[11px] text-muted">Estimated student inventory value</span>
          </div>
        </div>
      </div>

      {/* Verification Status Breakdown Card */}
      <div className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-6 shadow-flyer">
        <h2 className="font-display text-xl font-bold text-ink">
          Verification Pipeline Health
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 rounded-2xl bg-paper p-4 border border-line">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-spark-soft text-spark-ink">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-ink">{pendingVerifs}</span>
              <span className="text-xs text-muted">Pending Reviews</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-paper p-4 border border-line">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-kita-green-soft text-kita-green">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-ink">{approvedVerifs}</span>
              <span className="text-xs text-muted">Approved Merchants</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-paper p-4 border border-line">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper-deep text-muted">
              <BarChart3 className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-ink">{totalVerifs}</span>
              <span className="text-xs text-muted">Total Submissions</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
