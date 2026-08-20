"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutGrid,
  Store,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  MapPin,
} from "lucide-react";
import { Logo } from "@/components/common/logo";
import { MockDataToggle } from "@/components/common/mock-data-toggle";
import { logoutAction } from "@/app/actions/auth";

interface AppSidebarProps {
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

export function AppSidebar({ user, profile }: AppSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    try {
      if (localStorage.getItem("projectkita_sidebar_collapsed") === "true") {
        setCollapsed(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  function toggleCollapse() {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem("projectkita_sidebar_collapsed", next ? "true" : "false");
    } catch {
      // Ignore
    }
  }

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  const name = profile?.full_name || user.user_metadata?.full_name || "Member";
  const role = profile?.role || "BUYER";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const isHomeActive = pathname === "/protected";
  const isMarketplaceActive = pathname.startsWith("/protected/marketplace");
  const isSellerActive = pathname.startsWith("/seller");

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <header className="lg:hidden sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-line bg-surface/95 px-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink shadow-flyer"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo size="sm" showTagline={false} />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-kita-green-soft px-2.5 py-0.5 text-xs font-semibold text-kita-green">
            <MapPin className="h-3 w-3" />
            <span>LYFJSHS</span>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kita-green text-xs font-bold text-white shadow-flyer">
            {initials}
          </span>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-r border-line bg-surface transition-all duration-300 ${
          mobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Top Header & Collapse Toggle */}
        <div className="flex flex-col gap-3 p-4 border-b border-line">
          <div className="flex items-center justify-between">
            {(!collapsed || mobileOpen) ? (
              <Logo size="sm" showTagline={false} />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-kita-green text-white font-display font-extrabold shadow-flyer mx-auto">
                K
              </div>
            )}

            {/* Desktop Collapse Toggle */}
            <button
              type="button"
              onClick={toggleCollapse}
              className={`hidden lg:flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-paper text-muted hover:text-ink focus-visible:outline-kita-green ${
                collapsed ? "mx-auto" : ""
              }`}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>

            {/* Mobile Close Toggle */}
            {mobileOpen && (
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-paper text-muted hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Pilot Campus Badge */}
          {(!collapsed || mobileOpen) && (
            <div className="flex items-center gap-1.5 rounded-xl border border-kita-green/20 bg-kita-green-soft px-3 py-1.5 text-xs font-semibold text-kita-green">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">LYFJSHS Campus</span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col justify-between">
          <nav className="flex flex-col gap-1.5">
            {/* Dashboard Home */}
            <Link
              href="/protected"
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                isHomeActive
                  ? "bg-kita-green text-white shadow-flyer"
                  : "text-muted hover:bg-paper hover:text-ink"
              } ${collapsed && !mobileOpen ? "justify-center px-0" : ""}`}
              title="Dashboard"
            >
              <Home className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-105" />
              {(!collapsed || mobileOpen) && <span>Home</span>}
            </Link>

            {/* Marketplace */}
            <Link
              href="/protected/marketplace"
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                isMarketplaceActive
                  ? "bg-kita-green text-white shadow-flyer"
                  : "text-muted hover:bg-paper hover:text-ink"
              } ${collapsed && !mobileOpen ? "justify-center px-0" : ""}`}
              title="Marketplace"
            >
              <LayoutGrid className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-105" />
              {(!collapsed || mobileOpen) && <span>Marketplace</span>}
            </Link>

            {/* Seller Studio Area Link */}
            <Link
              href="/seller/verification"
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                isSellerActive
                  ? "bg-kita-green text-white shadow-flyer"
                  : "text-muted hover:bg-paper hover:text-ink"
              } ${collapsed && !mobileOpen ? "justify-center px-0" : ""}`}
              title="Seller Studio"
            >
              <Store className="h-5 w-5 flex-shrink-0 text-spark-ink transition-transform group-hover:scale-105" />
              {(!collapsed || mobileOpen) && <span>Seller Studio</span>}
            </Link>
          </nav>

          {/* Dev / Beta Demo Data Toggle */}
          <div className="pt-4">
            <MockDataToggle collapsed={collapsed && !mobileOpen} />
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-line bg-paper/50">
          <div
            className={`flex items-center justify-between gap-2 rounded-xl p-2 transition-colors ${
              collapsed && !mobileOpen ? "justify-center" : ""
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kita-green text-xs font-extrabold text-white shadow-flyer flex-shrink-0">
                {initials}
              </span>
              {(!collapsed || mobileOpen) && (
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold text-ink truncate leading-tight">
                    {name}
                  </span>
                  <span className="eyebrow text-[0.6rem] text-kita-green">
                    {role.replace("_", " ")}
                  </span>
                </div>
              )}
            </div>

            {(!collapsed || mobileOpen) ? (
              <button
                type="button"
                disabled={isPending}
                onClick={handleLogout}
                title="Log out"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-destructive/10 hover:text-destructive transition-colors flex-shrink-0"
              >
                <LogOut className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isPending}
                onClick={handleLogout}
                title="Log out"
                className="hidden"
              />
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
