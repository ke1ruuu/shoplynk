"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, useSidebar } from "./sidebar-context";
import { CartProvider } from "@/lib/cart-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { FloatingCartButton } from "@/components/cart/floating-cart-button";

interface ProtectedLayoutProps {
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
  children: React.ReactNode;
}

/** Reads collapse state from context so the content offset tracks the rail. */
function Workspace({
  isFullPage,
  children,
}: {
  isFullPage: boolean;
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebar();

  if (isFullPage) {
    return <div className="flex-1 w-full">{children}</div>;
  }

  return (
    <div
      className={`flex-1 w-full min-w-0 transition-all duration-300 ease-out ${
        collapsed ? "lg:pl-20" : "lg:pl-64"
      }`}
    >
      {children}
    </div>
  );
}

export function ProtectedLayout({ user, profile, children }: ProtectedLayoutProps) {
  const pathname = usePathname();

  // Full-page focused creation/editing views where the sidebar should be hidden
  const isFullPage =
    pathname.startsWith("/seller/products/") ||
    pathname === "/seller/verification";

  return (
    <FavoritesProvider>
      <CartProvider>
        <SidebarProvider>
          <div className="flex min-h-screen flex-col bg-paper text-ink">
            {!isFullPage && <AppSidebar user={user} profile={profile} />}
            <Workspace isFullPage={isFullPage}>{children}</Workspace>
            <CartDrawer />
            <FloatingCartButton />
          </div>
        </SidebarProvider>
      </CartProvider>
    </FavoritesProvider>
  );
}
