"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Star,
  Sparkles,
  ShoppingBag,
  Coins,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  User,
  Heart,
  MessageSquare,
  Clock,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { PlatformRatingsStats, PlatformRatingItem } from "@/app/actions/ratings";

interface RatingsDashboardViewProps {
  initialStats: PlatformRatingsStats;
}

function timeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / (1000 * 60));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
  });
}

export function RatingsDashboardView({ initialStats }: RatingsDashboardViewProps) {
  const [stats, setStats] = useState<PlatformRatingsStats>(initialStats);
  const [activeFilter, setActiveFilter] = useState<"ALL" | "BUYER" | "SELLER" | "5_STAR" | "CRITICAL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRatings = useMemo(() => {
    let list = stats.recentRatings;

    if (activeFilter === "BUYER") {
      list = list.filter((r) => r.userRole === "BUYER");
    } else if (activeFilter === "SELLER") {
      list = list.filter((r) => r.userRole === "SELLER");
    } else if (activeFilter === "5_STAR") {
      list = list.filter((r) => r.rating === 5);
    } else if (activeFilter === "CRITICAL") {
      list = list.filter((r) => r.rating <= 3);
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(
      (r) =>
        r.userName.toLowerCase().includes(q) ||
        (r.feedback && r.feedback.toLowerCase().includes(q)) ||
        (r.orderNumber && r.orderNumber.toLowerCase().includes(q)) ||
        (r.category && r.category.toLowerCase().includes(q)) ||
        (r.tags && r.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [stats.recentRatings, activeFilter, searchQuery]);

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-kita-green">
            <Star className="h-4 w-4 fill-kita-green text-kita-green" />
            <span className="eyebrow">Platform Intelligence</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            Website &amp; Platform Ratings
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Track student and seller satisfaction, ratings progress after checkout and income receipt, and real-time campus feedback.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/analytics"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 text-xs font-bold text-ink hover:bg-paper transition-colors"
          >
            <span>Commerce Analytics</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Overall Average */}
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-xs text-muted">Overall Rating</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-3.5 w-3.5 ${
                    s <= Math.round(stats.overallAverage)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-transparent text-line-strong"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-ink">
              {stats.overallAverage}
            </span>
            <span className="text-xs text-muted font-mono">/ 5.0</span>
          </div>
          <span className="text-xs text-kita-green font-semibold">
            {stats.satisfactionRate}% positive ratings (4-5★)
          </span>
        </div>

        {/* Metric 2: Total Feedbacks */}
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-xs text-muted">Total Submissions</span>
            <MessageSquare className="h-4 w-4 text-muted" />
          </div>
          <span className="font-mono text-3xl sm:text-4xl font-extrabold text-ink">
            {stats.totalCount}
          </span>
          <span className="text-xs text-muted">
            All-time buyer &amp; seller responses
          </span>
        </div>

        {/* Metric 3: Buyer Satisfaction (Post-Purchase) */}
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-xs text-muted">Buyer Satisfaction</span>
            <ShoppingBag className="h-4 w-4 text-kita-green" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-kita-green">
              {stats.buyerAverage}
            </span>
            <span className="text-xs text-muted font-mono">★</span>
          </div>
          <span className="text-xs text-muted">
            From {stats.buyerCount} post-checkout ratings
          </span>
        </div>

        {/* Metric 4: Seller Satisfaction (Post-Income) */}
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-xs text-muted">Seller Satisfaction</span>
            <Coins className="h-4 w-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-amber-600">
              {stats.sellerAverage}
            </span>
            <span className="text-xs text-muted font-mono">★</span>
          </div>
          <span className="text-xs text-muted">
            From {stats.sellerCount} post-income ratings
          </span>
        </div>
      </div>

      {/* 3. Deep Breakdown: Star Distribution & Praised Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Card: 5-to-1 Star Progress Meters (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-kita-green" />
              <h2 className="font-display text-base font-bold text-ink">
                Rating Progress &amp; Distribution
              </h2>
            </div>
            <span className="text-xs text-muted">
              {stats.totalCount} ratings recorded
            </span>
          </div>

          <div className="flex flex-col gap-3 py-1">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = stats.distribution[stars as keyof typeof stats.distribution] || 0;
              const pct = stats.totalCount > 0 ? Math.round((count / stats.totalCount) * 100) : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  {/* Star count label */}
                  <div className="flex items-center gap-1 w-14 font-mono font-bold text-ink">
                    <span>{stars}</span>
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  </div>

                  {/* Progress Bar Track */}
                  <div className="flex-1 h-3 rounded-full bg-paper overflow-hidden border border-line/60">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        stars >= 4
                          ? "bg-kita-green"
                          : stars === 3
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* Percentage & Count */}
                  <div className="w-16 text-right font-mono text-muted text-xs">
                    <span className="font-bold text-ink">{pct}%</span>
                    <span className="text-muted/70 text-xs ml-1">({count})</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick CSAT Bar */}
          <div className="flex items-center justify-between rounded-xl bg-paper/60 p-3.5 border border-line mt-2 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-kita-green" />
              <span className="font-semibold text-ink">Campus CSAT Index</span>
            </div>
            <span className="font-mono font-bold text-kita-green text-sm">
              {stats.satisfactionRate}% Satisfaction
            </span>
          </div>
        </div>

        {/* Right Card: Top Praised Features & Roles (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-spark-ink" />
              <h2 className="font-display text-base font-bold text-ink">
                Evaluation Criteria Performance
              </h2>
            </div>
            <span className="text-xs text-muted">Feedback Dimensions</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {stats.topTags.map((item, idx) => (
              <div
                key={item.tag}
                className="flex items-center justify-between p-2.5 rounded-xl bg-paper/50 border border-line text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-surface font-mono font-bold text-muted text-xs border border-line">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-ink">{item.tag}</span>
                </div>
                <span className="font-mono text-xs font-bold text-kita-green bg-surface px-2 py-0.5 rounded border border-line">
                  {item.count} mentions
                </span>
              </div>
            ))}
          </div>

          {/* Context note */}
          <div className="rounded-xl border border-spark-deep/20 bg-spark-soft/30 p-3 text-xs text-spark-ink">
            <strong>Automatic Trigger Points:</strong> Ratings are triggered right after buyers complete checkout and right after sellers fulfill orders and receive income.
          </div>
        </div>
      </div>

      {/* 4. Filterable Rating Submissions Feed */}
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-kita-green" />
            <h2 className="font-display text-base font-bold text-ink">
              Recent Rating Submissions ({filteredRatings.length})
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search feedback, order, user..."
              className="w-full rounded-xl border border-line bg-paper pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-muted/60 focus:border-kita-green focus:outline-none focus:ring-1 focus:ring-kita-green"
            />
          </div>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pb-1">
          {[
            { id: "ALL", label: "All Ratings" },
            { id: "BUYER", label: "Buyer Purchases" },
            { id: "SELLER", label: "Seller Incomes" },
            { id: "5_STAR", label: "5-Star Ratings" },
            { id: "CRITICAL", label: "Needs Attention (≤3★)" },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-kita-green text-white shadow-xs"
                    : "bg-paper border border-line text-muted hover:text-ink hover:bg-paper-deep"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Submissions List */}
        {filteredRatings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted">
            <MessageSquare className="h-8 w-8 mb-2 text-line-strong" />
            <p className="text-xs font-bold text-ink">No ratings match your filter</p>
            <p className="text-xs text-muted mt-0.5">Try choosing a different tab or clearing your search.</p>
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-line" role="list">
            {filteredRatings.map((rating) => {
              const isBuyer = rating.userRole === "BUYER";
              return (
                <li key={rating.id} className="py-4 first:pt-2 last:pb-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    {/* Left: User Avatar & Feedback */}
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs flex-shrink-0 ${
                          isBuyer
                            ? "bg-kita-green-soft text-kita-green border border-kita-green/20"
                            : "bg-amber-500/15 text-amber-700 border border-amber-500/30"
                        }`}
                      >
                        {isBuyer ? <ShoppingBag className="h-4 w-4" /> : <Coins className="h-4 w-4" />}
                      </div>

                      <div className="flex flex-col gap-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-xs text-ink">
                            {rating.userName}
                          </span>

                          {/* Role Badge */}
                          <span
                            className={`rounded-md px-2 py-0.5 text-xs font-mono font-bold ${
                              isBuyer
                                ? "bg-kita-green-soft text-kita-green border border-kita-green/20"
                                : "bg-amber-500/15 text-amber-800 border border-amber-500/30"
                            }`}
                          >
                            {isBuyer ? "Buyer Purchase" : "Seller Income"}
                          </span>

                          {rating.orderNumber && (
                            <span className="font-mono text-xs text-muted bg-paper px-1.5 py-0.5 rounded border border-line">
                              {rating.orderNumber}
                            </span>
                          )}

                          <span className="text-xs text-muted flex items-center gap-1 ml-auto sm:ml-0">
                            <Clock className="h-3 w-3" />
                            {timeAgo(rating.createdAt)}
                          </span>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`h-3.5 w-3.5 ${
                                s <= rating.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-transparent text-line-strong"
                              }`}
                            />
                          ))}
                          <span className="font-mono text-xs font-bold text-ink ml-1">
                            {rating.rating}.0
                          </span>
                        </div>

                        {/* Tags */}
                        {rating.tags && rating.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            {rating.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-lg bg-paper px-2 py-0.5 text-xs font-semibold text-muted border border-line"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Written Comment */}
                        {rating.feedback && (
                          <p className="text-xs sm:text-sm text-ink leading-relaxed rounded-xl bg-paper/60 p-3 border border-line mt-1">
                            &ldquo;{rating.feedback}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

