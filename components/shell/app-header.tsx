import React from "react";
import { Logo } from "@/components/common/logo";
import { UserMenu } from "@/components/shell/user-menu";
import { MapPin } from "lucide-react";

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
          <Logo size="sm" showTagline={false} />

          {/* Campus Indicator */}
          <div className="hidden sm:flex sm:items-center sm:gap-1.5 rounded-full border border-kita-green/20 bg-kita-green-soft px-3 py-1 text-xs font-semibold text-kita-green">
            <MapPin className="h-3.5 w-3.5" />
            <span>LYFJSHS Campus</span>
          </div>
        </div>

        <UserMenu user={user} profile={profile} />
      </div>
    </header>
  );
}
