import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Shield, Clock, CheckCircle2, XCircle, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { VerificationReviewTable } from "@/components/admin/verification-review-table";

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

  // Fetch all student verifications with applicant profile
  const { data: dbVerifications } = await supabase
    .from("student_verifications")
    .select(`
      id,
      user_id,
      student_id_number,
      id_image_url,
      program,
      year_level,
      status,
      rejection_reason,
      created_at,
      profile:profiles (id, full_name, email, role)
    `)
    .order("created_at", { ascending: false });

  const verifications = (dbVerifications || []).map((v) => ({
    id: v.id,
    user_id: v.user_id,
    student_id_number: v.student_id_number,
    id_image_url: v.id_image_url,
    program: v.program,
    year_level: v.year_level,
    status: v.status as "PENDING" | "APPROVED" | "REJECTED",
    rejection_reason: v.rejection_reason,
    created_at: v.created_at,
    profile: Array.isArray(v.profile) ? v.profile[0] : v.profile,
  }));

  const pendingCount = verifications.filter((v) => v.status === "PENDING").length;
  const approvedCount = verifications.filter((v) => v.status === "APPROVED").length;
  const rejectedCount = verifications.filter((v) => v.status === "REJECTED").length;

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
          <div className="flex items-center gap-2 text-spark-ink">
            <Shield className="h-5 w-5" />
            <span className="eyebrow">Campus Governance</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-ink leading-tight">
            Seller Verification Console
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            Review student identification submissions from Luis Y. Ferrer Jr. Senior High School.
            Approved applicants will automatically be promoted to Verified Sellers with their storefront unlocked.
          </p>
        </div>
      </header>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-2xl border border-spark/40 bg-spark-soft/30 p-5 shadow-flyer">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-spark-ink">Pending Verification</span>
            <span className="font-display text-3xl font-extrabold text-spark-ink">
              {pendingCount}
            </span>
            <span className="text-[11px] text-muted">Awaiting your approval</span>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-spark/20 text-spark-ink">
            <Clock className="h-6 w-6 animate-pulse" />
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-kita-green/30 bg-kita-green-soft/40 p-5 shadow-flyer">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-kita-green">Approved Sellers</span>
            <span className="font-display text-3xl font-extrabold text-kita-green">
              {approvedCount}
            </span>
            <span className="text-[11px] text-muted">Active verified merchants</span>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-kita-green text-white shadow-flyer">
            <CheckCircle2 className="h-6 w-6" />
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-line bg-surface p-5 shadow-flyer">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-muted">Rejected Requests</span>
            <span className="font-display text-3xl font-extrabold text-ink">
              {rejectedCount}
            </span>
            <span className="text-[11px] text-muted">Returned for revision</span>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-deep text-muted">
            <XCircle className="h-6 w-6" />
          </span>
        </div>
      </div>

      {/* Review Data Table */}
      <VerificationReviewTable verifications={verifications} />
    </main>
  );
}
