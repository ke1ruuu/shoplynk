import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { VerificationPortalView } from "@/components/seller/verification-portal-view";

export const metadata: Metadata = {
  title: "Student Seller Verification — Project Kita",
  description: "Apply for campus seller verification at Luis Y. Ferrer Jr. Senior High School.",
};

export default async function SellerVerificationPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?next=/seller/verification");
  }

  // If admin, redirect to admin console
  if (profile?.role === "CAMPUS_ADMIN" || profile?.role === "PLATFORM_ADMIN") {
    redirect("/admin");
  }

  // If already a verified seller, redirect straight to Seller Studio
  if (profile?.role === "SELLER") {
    redirect("/seller");
  }

  const supabase = await createClient();

  // Fetch most recent verification application
  const { data: verification } = await supabase
    .from("student_verifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <VerificationPortalView
        initialVerification={
          verification
            ? {
                id: verification.id,
                student_id_number: verification.student_id_number,
                program: verification.program,
                year_level: verification.year_level,
                id_image_url: verification.id_image_url,
                status: verification.status as "PENDING" | "APPROVED" | "REJECTED",
                rejection_reason: verification.rejection_reason,
                created_at: verification.created_at,
              }
            : null
        }
        userFullName={profile?.full_name || user.full_name}
        userEmail={user.email}
      />
    </main>
  );
}
