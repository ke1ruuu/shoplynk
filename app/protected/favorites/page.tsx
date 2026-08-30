import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/auth/session";
import { ProtectedLayout } from "@/components/shell/protected-layout";
import { FavoritesView } from "@/components/favorites/favorites-view";

export const metadata: Metadata = {
  title: "My Saved Favorites — Project Kita",
  description: "View and manage your saved campus snacks, drinks, and merchandise at LYFJSHS.",
};

export default async function FavoritesPage() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?next=/protected/favorites");
  }

  return (
    <ProtectedLayout user={user} profile={profile}>
      <main>
        <FavoritesView />
      </main>
    </ProtectedLayout>
  );
}
