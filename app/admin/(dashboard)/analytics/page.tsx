import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Star, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatRow } from "@/components/dashboard/stat-row";
import { Panel } from "@/components/dashboard/panel";
import { getPlatformRatingsStatsAction } from "@/app/actions/ratings";

export const metadata: Metadata = {
  title: "Campus Analytics — Admin Console",
  description: "Platform metrics and student commerce insights for LYFJSHS.",
};

/** A labelled proportion bar — the pipeline reads as shares of one total. */
function ShareBar({
  rows,
  total,
}: {
  rows: { label: string; value: number; bar: string; text: string }[];
  total: number;
}) {
  return (
    <ul className="flex flex-col gap-3.5">
      {rows.map(({ label, value, bar, text }) => {
        const pct = total > 0 ? Math.round((value / total) * 100) : 0;
        return (
          <li key={label} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-ink">{label}</span>
              <span className="flex items-baseline gap-1.5">
                <span className={`tabular text-sm font-bold ${text}`}>{value}</span>
                <span className="tabular text-xs text-muted">{pct}%</span>
              </span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-paper-deep"
              role="img"
              aria-label={`${label}: ${value} of ${total} (${pct} percent)`}
            >
              <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default async function AdminAnalyticsPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user || (profile?.role !== "CAMPUS_ADMIN" && profile?.role !== "PLATFORM_ADMIN")) {
    redirect("/admin/login");
  }

  const supabase = await createClient();

  const { data: profiles } = await supabase.from("profiles").select("id, role");
  const totalUsers = profiles?.length || 0;
  const sellerCount = profiles?.filter((p) => p.role === "SELLER").length || 0;
  const buyerCount = profiles?.filter((p) => p.role === "BUYER").length || 0;

  const { data: stores } = await supabase.from("stores").select("id, is_active");
  const totalStores = stores?.length || 0;
  const activeStores = stores?.filter((s) => s.is_active).length || 0;

  const { data: products } = await supabase
    .from("products")
    .select("id, price, stock, status");
  const totalProducts = products?.length || 0;
  const activeProducts = products?.filter((p) => p.status === "ACTIVE").length || 0;
  const totalCatalogWorth = (products || []).reduce(
    (acc, p) => acc + Number(p.price || 0) * Number(p.stock || 0),
    0
  );

  const { data: verifs } = await supabase.from("student_verifications").select("id, status");
  const totalVerifs = verifs?.length || 0;
  const pendingVerifs = verifs?.filter((v) => v.status === "PENDING").length || 0;
  const approvedVerifs = verifs?.filter((v) => v.status === "APPROVED").length || 0;
  const rejectedVerifs = verifs?.filter((v) => v.status === "REJECTED").length || 0;

  const ratingStats = await getPlatformRatingsStatsAction();

  return (
    <main className="w-full max-w-[1600px] flex flex-col gap-7 px-4 py-7 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      <PageHeader
        title="Campus commerce"
        description="Activity across Luis Y. Ferrer Jr. Senior High School."
      />

      <StatRow
        stats={[
          {
            label: "Members",
            value: String(totalUsers),
            note: `${buyerCount} buyers · ${sellerCount} sellers`,
          },
          {
            label: "Storefronts",
            value: String(totalStores),
            note: `${activeStores} open for orders`,
            tone: activeStores > 0 ? "accent" : "default",
          },
          {
            label: "Live listings",
            value: String(activeProducts),
            note: `of ${totalProducts} catalog items`,
          },
          {
            label: "Catalog value",
            value: `₱${totalCatalogWorth.toLocaleString("en-PH", {
              maximumFractionDigits: 0,
            })}`,
            note: "Price × stock, all stores",
          },
        ]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel heading="Verification pipeline">
          {totalVerifs === 0 ? (
            <p className="py-6 text-center text-sm text-muted">
              No verification applications submitted yet.
            </p>
          ) : (
            <ShareBar
              total={totalVerifs}
              rows={[
                {
                  label: "Approved",
                  value: approvedVerifs,
                  bar: "bg-kita-green",
                  text: "text-kita-green",
                },
                {
                  label: "Pending review",
                  value: pendingVerifs,
                  bar: "bg-spark",
                  text: "text-spark-ink",
                },
                {
                  label: "Rejected",
                  value: rejectedVerifs,
                  bar: "bg-line-strong",
                  text: "text-muted",
                },
              ]}
            />
          )}
        </Panel>

        <Panel heading="Website & Platform Satisfaction">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s <= Math.round(ratingStats.overallAverage)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-transparent text-line-strong"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-xl font-bold text-ink">
                  {ratingStats.overallAverage}
                </span>
                <span className="text-xs text-muted">/ 5.0</span>
              </div>

              <Link
                href="/admin/ratings"
                className="inline-flex items-center gap-1 text-xs font-bold text-kita-green hover:underline"
              >
                <span>Track Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <ShareBar
              total={ratingStats.totalCount}
              rows={[
                {
                  label: "5-Star Ratings",
                  value: ratingStats.distribution[5],
                  bar: "bg-kita-green",
                  text: "text-kita-green",
                },
                {
                  label: "4-Star Ratings",
                  value: ratingStats.distribution[4],
                  bar: "bg-spark",
                  text: "text-spark-ink",
                },
                {
                  label: "1 to 3 Star Ratings",
                  value:
                    ratingStats.distribution[3] +
                    ratingStats.distribution[2] +
                    ratingStats.distribution[1],
                  bar: "bg-line-strong",
                  text: "text-muted",
                },
              ]}
            />

            <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-line">
              <span>{ratingStats.buyerCount} buyers · {ratingStats.sellerCount} sellers</span>
              <span className="font-semibold text-kita-green">{ratingStats.satisfactionRate}% positive</span>
            </div>
          </div>
        </Panel>

        <Panel heading="Catalog health">
          {totalProducts === 0 ? (
            <p className="py-6 text-center text-sm text-muted">
              No products listed across campus yet.
            </p>
          ) : (
            <ShareBar
              total={totalProducts}
              rows={[
                {
                  label: "Live on marketplace",
                  value: activeProducts,
                  bar: "bg-kita-green",
                  text: "text-kita-green",
                },
                {
                  label: "Draft or archived",
                  value: totalProducts - activeProducts,
                  bar: "bg-line-strong",
                  text: "text-muted",
                },
              ]}
            />
          )}
        </Panel>
      </div>
    </main>
  );
}
