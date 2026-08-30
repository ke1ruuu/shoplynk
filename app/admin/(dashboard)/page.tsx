import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatRow } from "@/components/dashboard/stat-row";
import { VerificationReviewTable, AdminVerificationItem } from "@/components/admin/verification-review-table";

export const metadata: Metadata = {
  title: "Seller Verifications — Admin Console",
  description: "Review and approve student seller verification applications.",
};

export default async function AdminVerificationsPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user || (profile?.role !== "CAMPUS_ADMIN" && profile?.role !== "PLATFORM_ADMIN")) {
    redirect("/admin/login");
  }

  const supabase = await createClient();

  // 1. Fetch all student verification submissions
  const { data: dbVerifications } = await supabase
    .from("student_verifications")
    .select("*")
    .order("created_at", { ascending: false });

  let verifications: AdminVerificationItem[] = [];

  if (dbVerifications && dbVerifications.length > 0) {
    // 2. Fetch corresponding applicant profiles
    const userIds = [...new Set(dbVerifications.map((v) => v.user_id).filter(Boolean))];
    const { data: dbProfiles } = await supabase
      .from("profiles")
      .select("id, full_name, email, role")
      .in("id", userIds);

    const profileMap = new Map(dbProfiles?.map((p) => [p.id, p]) || []);

    verifications = dbVerifications.map((v) => ({
      id: v.id,
      user_id: v.user_id,
      student_id_number: v.student_id_number,
      id_image_url: v.id_image_url,
      program: v.program,
      year_level: v.year_level,
      status: v.status as "PENDING" | "APPROVED" | "REJECTED",
      rejection_reason: v.rejection_reason,
      created_at: v.created_at,
      profile: profileMap.get(v.user_id) || null,
    }));
  }

  const pendingCount = verifications.filter((v) => v.status === "PENDING").length;
  const approvedCount = verifications.filter((v) => v.status === "APPROVED").length;
  const rejectedCount = verifications.filter((v) => v.status === "REJECTED").length;

  return (
    <main className="w-full max-w-[1600px] flex flex-col gap-7 px-4 py-7 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      <PageHeader
        title="Seller verifications"
        description="Student ID submissions from Luis Y. Ferrer Jr. Senior High School. Approving an application promotes the applicant to Verified Seller and unlocks their storefront."
      />

      <StatRow
        stats={[
          {
            label: "Pending",
            value: String(pendingCount),
            note: pendingCount > 0 ? "Waiting on your review" : "Nothing in the queue",
            tone: pendingCount > 0 ? "warn" : "default",
          },
          {
            label: "Approved",
            value: String(approvedCount),
            note: "Verified sellers on campus",
            tone: approvedCount > 0 ? "accent" : "default",
          },
          {
            label: "Rejected",
            value: String(rejectedCount),
            note: "Returned for a new submission",
          },
          {
            label: "Total submitted",
            value: String(verifications.length),
            note: "All time",
          },
        ]}
      />

      <VerificationReviewTable initialVerifications={verifications} />
    </main>
  );
}
