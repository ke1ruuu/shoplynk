import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Campus Administrator Login — LYNK",
  description: "Secure login portal for Luis Y. Ferrer Jr. Senior High School administrators.",
};

export default async function AdminLoginPage() {
  const { user, profile } = await getCurrentUserProfile();

  // If already authenticated as admin, jump straight to the console
  if (user && (profile?.role === "CAMPUS_ADMIN" || profile?.role === "PLATFORM_ADMIN")) {
    redirect("/admin");
  }

  return (
    <div className="relative min-h-screen bg-paper flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Decorative Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#D92323 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 w-full max-w-md my-8">
        <AdminLoginForm />
      </div>
    </div>
  );
}
