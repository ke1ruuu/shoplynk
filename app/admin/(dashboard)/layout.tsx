import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ProtectedLayout } from "@/components/shell/protected-layout";

export const metadata: Metadata = {
  title: "Admin Console — Project Kita",
  description: "Campus administrator console for student seller verifications.",
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getCurrentUserProfile();

  // If not logged in, redirect to dedicated admin login
  if (!user) {
    redirect("/admin/login");
  }

  // Access Control: Campus Administrators and Platform Admins only
  if (profile?.role !== "CAMPUS_ADMIN" && profile?.role !== "PLATFORM_ADMIN") {
    redirect("/admin/login");
  }

  return (
    <ProtectedLayout user={user} profile={profile}>
      {children}
    </ProtectedLayout>
  );
}
