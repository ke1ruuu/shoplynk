"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LayoutGrid,
  Store,
  Shield,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  MapPin,
  ChevronsUpDown,
  User,
  Settings,
  ShieldCheck,
  Package,
  Clock,
  Heart,
} from "lucide-react";
import { Logo } from "@/components/common/logo";
import { useSidebar } from "./sidebar-context";
import { logoutAction } from "@/app/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AccountSettingsDialog } from "./account-settings-dialog";

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
  const router = useRouter();
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } =
    useSidebar();
  const [isPending, startTransition] = useTransition();
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  const name = profile?.full_name || user.user_metadata?.full_name || "Member";
  const email = user.email || "";
  const role = profile?.role || "BUYER";
  const isAdmin = role === "CAMPUS_ADMIN" || role === "PLATFORM_ADMIN";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const isHomeActive = pathname === "/protected";
  const isMarketplaceActive = pathname.startsWith("/protected/marketplace");
  const isOrdersActive = pathname.startsWith("/protected/orders");
  const isFavoritesActive = pathname.startsWith("/protected/favorites");
  const isSellerActive =
    pathname === "/seller" ||
    (pathname.startsWith("/seller/products") &&
      !pathname.startsWith("/seller/settings"));
  const isSellerOrdersActive = pathname.startsWith("/seller/orders");
  const isSellerSettingsActive = pathname.startsWith("/seller/settings");
  const isVerificationsActive =
    pathname === "/admin" || pathname === "/admin/verifications";
  const isStoresActive = pathname.startsWith("/admin/stores");
  const isAnalyticsActive = pathname.startsWith("/admin/analytics");

  const isCollapsedView = collapsed && !mobileOpen;

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
          <Logo size="sm" showTagline={false} href={isAdmin ? "/admin" : "/protected"} />
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <div className="flex items-center gap-1 rounded-full bg-kita-green-soft px-2.5 py-0.5 text-xs font-semibold text-kita-green">
              <Shield className="h-3 w-3" />
              <span>Admin Console</span>
            </div>
          )}
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
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-r border-line bg-surface transition-all duration-300 ease-out ${
          mobileOpen
            ? "translate-x-0 w-72"
            : "-translate-x-full lg:translate-x-0"
        } ${isCollapsedView ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Top Header */}
        <div
          className={`flex flex-col border-b border-line ${isCollapsedView ? "p-3 items-center" : "p-4 gap-3"}`}
        >
          {isCollapsedView ? (
            /* Collapsed Header: LYNK Logo linking to /protected + expand button */
            <div className="flex flex-col items-center gap-2">
              <Link
                href={isAdmin ? "/admin" : "/protected"}
                className="flex h-10 w-10 items-center justify-center rounded-xl p-1 transition-transform hover:scale-105"
                title="Go to Dashboard"
                aria-label="Go to Dashboard"
              >
                <Image
                  src="/LYNKICON.png"
                  alt="LYNK Logo"
                  width={36}
                  height={36}
                  className="h-full w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={toggleCollapsed}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-paper text-muted hover:text-ink hover:bg-paper-deep focus-visible:outline-kita-green transition-colors"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            /* Expanded Header: Logo and Collapse Button */
            <>
              <div className="flex items-center justify-between">
                <Logo size="sm" showTagline={false} href={isAdmin ? "/admin" : "/protected"} />

                {/* Desktop Collapse Toggle */}
                <button
                  type="button"
                  onClick={toggleCollapsed}
                  className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-paper text-muted hover:text-ink hover:bg-paper-deep focus-visible:outline-kita-green transition-colors"
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Mobile Close Toggle */}
                {mobileOpen && (
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-paper text-muted hover:text-ink"
                    aria-label="Close sidebar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Admin Badge (if Admin) */}
              {isAdmin && (
                <div className="flex items-center gap-1.5 rounded-xl border border-kita-green/20 bg-kita-green-soft px-3 py-1.5 text-xs font-semibold text-kita-green">
                  <Shield className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">Campus Administrator</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Navigation Items */}
        <div
          className={`flex-1 overflow-y-auto ${isCollapsedView ? "p-2" : "p-3"} flex flex-col justify-between`}
        >
          <nav className="flex flex-col gap-1.5">
            {isAdmin ? (
              /* Admin Navigation */
              <>
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center rounded-xl transition-all ${
                    isCollapsedView
                      ? "h-11 w-11 mx-auto justify-center"
                      : "gap-3 px-3.5 py-2.5 text-sm font-semibold"
                  } ${
                    isVerificationsActive
                      ? "bg-kita-green text-white shadow-flyer"
                      : "text-muted hover:bg-paper hover:text-ink"
                  }`}
                  title="Seller Verifications"
                >
                  <Shield
                    className={`h-5 w-5 flex-shrink-0 ${isVerificationsActive ? "text-white" : "text-spark-ink"} transition-transform group-hover:scale-105`}
                  />
                  {!isCollapsedView && <span>Seller Verifications</span>}
                </Link>

                <Link
                  href="/admin/stores"
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center rounded-xl transition-all ${
                    isCollapsedView
                      ? "h-11 w-11 mx-auto justify-center"
                      : "gap-3 px-3.5 py-2.5 text-sm font-semibold"
                  } ${
                    isStoresActive
                      ? "bg-kita-green text-white shadow-flyer"
                      : "text-muted hover:bg-paper hover:text-ink"
                  }`}
                  title="Campus Stores"
                >
                  <Store className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-105" />
                  {!isCollapsedView && <span>Campus Stores</span>}
                </Link>

                <Link
                  href="/admin/analytics"
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center rounded-xl transition-all ${
                    isCollapsedView
                      ? "h-11 w-11 mx-auto justify-center"
                      : "gap-3 px-3.5 py-2.5 text-sm font-semibold"
                  } ${
                    isAnalyticsActive
                      ? "bg-kita-green text-white shadow-flyer"
                      : "text-muted hover:bg-paper hover:text-ink"
                  }`}
                  title="Campus Analytics"
                >
                  <BarChart3 className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-105" />
                  {!isCollapsedView && <span>Campus Analytics</span>}
                </Link>
              </>
            ) : (
              /* Buyer / Seller Navigation */
              <>
                {/* 1. Buyer & Shopping Navigation */}
                <div className="flex flex-col gap-1">
                  {!isCollapsedView && (
                    <span className="eyebrow px-3.5 pt-1 text-xs text-muted">
                      Campus Shopping
                    </span>
                  )}

                  {/* Home */}
                  <Link
                    href="/protected"
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center rounded-xl transition-all ${
                      isCollapsedView
                        ? "h-11 w-11 mx-auto justify-center"
                        : "gap-3 px-3.5 py-2.5 text-sm font-semibold"
                    } ${
                      isHomeActive
                        ? "bg-kita-green text-white shadow-flyer"
                        : "text-muted hover:bg-paper hover:text-ink"
                    }`}
                    title="Home"
                  >
                    <Home className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-105" />
                    {!isCollapsedView && <span>Home</span>}
                  </Link>

                  {/* Marketplace */}
                  <Link
                    href="/protected/marketplace"
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center rounded-xl transition-all ${
                      isCollapsedView
                        ? "h-11 w-11 mx-auto justify-center"
                        : "gap-3 px-3.5 py-2.5 text-sm font-semibold"
                    } ${
                      isMarketplaceActive
                        ? "bg-kita-green text-white shadow-flyer"
                        : "text-muted hover:bg-paper hover:text-ink"
                    }`}
                    title="Marketplace"
                  >
                    <LayoutGrid className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-105" />
                    {!isCollapsedView && <span>Marketplace</span>}
                  </Link>

                  {/* My Purchases */}
                  <Link
                    href="/protected/orders"
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center rounded-xl transition-all ${
                      isCollapsedView
                        ? "h-11 w-11 mx-auto justify-center"
                        : "gap-3 px-3.5 py-2.5 text-sm font-semibold"
                    } ${
                      isOrdersActive
                        ? "bg-kita-green text-white shadow-flyer"
                        : "text-muted hover:bg-paper hover:text-ink"
                    }`}
                    title="My Purchases"
                  >
                    <Package className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-105" />
                    {!isCollapsedView && <span>My Purchases</span>}
                  </Link>

                  {/* Saved Favorites */}
                  <Link
                    href="/protected/favorites"
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center rounded-xl transition-all ${
                      isCollapsedView
                        ? "h-11 w-11 mx-auto justify-center"
                        : "gap-3 px-3.5 py-2.5 text-sm font-semibold"
                    } ${
                      isFavoritesActive
                        ? "bg-kita-green text-white shadow-flyer"
                        : "text-muted hover:bg-paper hover:text-ink"
                    }`}
                    title="Saved Favorites"
                  >
                    <Heart className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-105" />
                    {!isCollapsedView && <span>Saved Favorites</span>}
                  </Link>
                </div>

                {/* 2. Merchant / Seller Section with Line Separator */}
                <div className="flex flex-col gap-1 border-t border-line pt-3 mt-2">
                  {!isCollapsedView && (
                    <span className="eyebrow px-3.5 pt-1 text-xs text-muted">
                      {role === "SELLER"
                        ? "Seller Studio"
                        : "Student Entrepreneur"}
                    </span>
                  )}

                  {role === "SELLER" ? (
                    <>
                      {/* Seller Studio */}
                      <Link
                        href="/seller"
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center rounded-xl transition-all ${
                          isCollapsedView
                            ? "h-11 w-11 mx-auto justify-center"
                            : "gap-3 px-3.5 py-2.5 text-sm font-semibold"
                        } ${
                          isSellerActive
                            ? "bg-kita-green text-white shadow-flyer"
                            : "text-muted hover:bg-paper hover:text-ink"
                        }`}
                        title="Seller Studio"
                      >
                        <Store
                          className={`h-5 w-5 flex-shrink-0 ${isSellerActive ? "text-white" : "text-muted"} transition-transform group-hover:scale-105`}
                        />
                        {!isCollapsedView && <span>Catalog</span>}
                      </Link>

                      {/* Store Orders Management */}
                      <Link
                        href="/seller/orders"
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center rounded-xl transition-all ${
                          isCollapsedView
                            ? "h-11 w-11 mx-auto justify-center"
                            : "gap-3 px-3.5 py-2.5 text-sm font-semibold"
                        } ${
                          isSellerOrdersActive
                            ? "bg-kita-green text-white shadow-flyer"
                            : "text-muted hover:bg-paper hover:text-ink"
                        }`}
                        title="Store Orders"
                      >
                        <Clock
                          className={`h-5 w-5 flex-shrink-0 ${isSellerOrdersActive ? "text-white" : "text-muted"} transition-transform group-hover:scale-105`}
                        />
                        {!isCollapsedView && <span>Orders</span>}
                      </Link>

                      {/* Store Settings */}
                      <Link
                        href="/seller/settings"
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center rounded-xl transition-all ${
                          isCollapsedView
                            ? "h-11 w-11 mx-auto justify-center"
                            : "gap-3 px-3.5 py-2.5 text-sm font-semibold"
                        } ${
                          isSellerSettingsActive
                            ? "bg-kita-green text-white shadow-flyer"
                            : "text-muted hover:bg-paper hover:text-ink"
                        }`}
                        title="Store Settings"
                      >
                        <Settings
                          className={`h-5 w-5 flex-shrink-0 ${isSellerSettingsActive ? "text-white" : "text-muted"} transition-transform group-hover:scale-105`}
                        />
                        {!isCollapsedView && <span>Settings</span>}
                      </Link>
                    </>
                  ) : (
                    <Link
                      href="/seller/verification"
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center rounded-xl transition-all ${
                        isCollapsedView
                          ? "h-11 w-11 mx-auto justify-center"
                          : "gap-3 px-3.5 py-2.5 text-sm font-semibold"
                      } text-muted hover:bg-paper hover:text-ink`}
                      title="Become a Seller"
                    >
                      <Store className="h-5 w-5 flex-shrink-0 text-spark-ink transition-transform group-hover:scale-105" />
                      {!isCollapsedView && (
                        <div className="flex items-center justify-between flex-1 gap-1">
                          <span>Become a Seller</span>
                          <span className="rounded-md bg-spark-soft px-1.5 py-0.5 text-xs font-bold text-spark-ink">
                            Verify
                          </span>
                        </div>
                      )}
                    </Link>
                  )}
                </div>
              </>
            )}
          </nav>
        </div>

        {/* User Profile Menubar Dropdown Footer */}
        <div
          className={`border-t border-line bg-paper/50 ${isCollapsedView ? "p-2 flex justify-center" : "p-3"}`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`w-full rounded-2xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-kita-green ${
                isCollapsedView
                  ? "flex items-center justify-center p-1 hover:bg-paper-deep"
                  : "flex items-center justify-between p-2 hover:bg-paper border border-transparent hover:border-line"
              }`}
              aria-label="User account menu"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kita-green text-xs font-extrabold text-white shadow-flyer flex-shrink-0">
                  {initials}
                </span>
                {!isCollapsedView && (
                  <div className="flex flex-col text-left truncate">
                    <span className="text-xs font-bold text-ink truncate leading-tight">
                      {name}
                    </span>
                    <span className="eyebrow text-xs text-kita-green">
                      {role.replace("_", " ")}
                    </span>
                  </div>
                )}
              </div>

              {!isCollapsedView && (
                <ChevronsUpDown className="h-4 w-4 text-muted flex-shrink-0" />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={isCollapsedView ? "right" : "top"}
              align={isCollapsedView ? "end" : "start"}
              sideOffset={4}
              alignOffset={-4}
              className="w-64 rounded-2xl p-2 border border-line bg-surface shadow-flyer-lg"
            >
              <DropdownMenuLabel className="font-normal p-2">
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs font-bold text-ink">{name}</p>
                  <p className="text-xs text-muted truncate">{email}</p>
                  <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-md bg-kita-green-soft px-2 py-0.5 text-xs font-bold text-kita-green">
                    <ShieldCheck className="h-3 w-3" />
                    {role === "SELLER"
                      ? "Verified Seller"
                      : role === "CAMPUS_ADMIN"
                        ? "Administrator"
                        : "Student Member"}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="my-1 border-line" />

              <DropdownMenuItem
                onClick={() => setProfileDialogOpen(true)}
                className="cursor-pointer gap-2.5 rounded-xl p-2 text-xs font-bold text-ink hover:bg-paper transition-colors"
              >
                <User className="h-3.5 w-3.5 text-muted" />
                <span>Account Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setProfileDialogOpen(true)}
                className="cursor-pointer gap-2.5 rounded-xl p-2 text-xs font-bold text-ink hover:bg-paper transition-colors"
              >
                <Settings className="h-3.5 w-3.5 text-muted" />
                <span>General Settings</span>
              </DropdownMenuItem>

              {role === "SELLER" && (
                <DropdownMenuItem
                  onClick={() => router.push("/seller")}
                  className="cursor-pointer gap-2.5 rounded-xl p-2 text-xs font-bold text-kita-green hover:bg-kita-green-soft transition-colors"
                >
                  <Store className="h-3.5 w-3.5" />
                  <span>Seller Studio</span>
                </DropdownMenuItem>
              )}

              {role === "BUYER" && (
                <DropdownMenuItem
                  onClick={() => router.push("/seller/verification")}
                  className="cursor-pointer gap-2.5 rounded-xl p-2 text-xs font-bold text-spark-ink hover:bg-spark-soft transition-colors"
                >
                  <Store className="h-3.5 w-3.5" />
                  <span>Become a Seller</span>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator className="my-1 border-line" />

              <DropdownMenuItem
                disabled={isPending}
                onClick={handleLogout}
                className="cursor-pointer gap-2.5 rounded-xl p-2 text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>{isPending ? "Logging out…" : "Log Out"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Account Profile & Settings Dialog */}
      <AccountSettingsDialog
        user={user}
        profile={profile}
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
      />
    </>
  );
}
