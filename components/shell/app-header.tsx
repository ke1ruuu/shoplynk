import React from "react";
import { Logo } from "@/components/common/logo";
import { UserMenu } from "@/components/shell/user-menu";

interface AppHeaderProps {
  user: {
    email?: string;
    user_metadata?: {
      full_name?: string;
    };
  };
  profile?: {
    full_name: string;
    role: "BUYER" | "SELLER" | "CAMPUS_ADMIN" | "PLATFORM_ADMIN";
    is_verified_seller: boolean;
  } | null;
}

export function AppHeader({ user, profile }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Logo
            size="sm"
            showTagline={false}
            href={
              profile?.role === "CAMPUS_ADMIN" || profile?.role === "PLATFORM_ADMIN"
                ? "/admin"
                : "/protected"
            }
          />
        </div>

        <UserMenu user={user} profile={profile} />
      </div>
    </header>
  );
}
