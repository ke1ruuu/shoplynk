import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ProtectedLayout } from "@/components/shell/protected-layout";

export const metadata: Metadata = {
  title: "Seller Studio — LYNK",
  description: "Manage your campus store catalog, products, and inventory.",
};

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?next=/seller");
  }

  return (
    <ProtectedLayout user={user} profile={profile}>
      {children}
    </ProtectedLayout>
  );
}
