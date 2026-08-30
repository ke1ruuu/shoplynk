import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ProtectedLayout } from "@/components/shell/protected-layout";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Checkout & Pickup — Project Kita",
  description: "Review your campus order, select your break-time pickup point, and confirm your purchase.",
};

export default async function MarketplaceCheckoutPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login");
  }

  const buyerName =
    profile?.full_name || user.user_metadata?.full_name || "Student Member";

  return (
    <ProtectedLayout user={user} profile={profile}>
      <main className="w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
        <CheckoutView buyerName={buyerName} />
      </main>
    </ProtectedLayout>
  );
}
