import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { getPlatformRatingsStatsAction } from "@/app/actions/ratings";
import { RatingsDashboardView } from "@/components/admin/ratings-dashboard-view";

export const metadata: Metadata = {
  title: "Website & Platform Ratings — Admin Console",
  description: "Track user ratings, post-purchase and post-income feedback, and campus satisfaction metrics.",
};

export default async function AdminRatingsPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user || (profile?.role !== "CAMPUS_ADMIN" && profile?.role !== "PLATFORM_ADMIN")) {
    redirect("/admin/login");
  }

  const stats = await getPlatformRatingsStatsAction();

  return (
    <main className="w-full max-w-[1600px] flex flex-col gap-7 px-4 py-7 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      <RatingsDashboardView initialStats={stats} />
    </main>
  );
}

