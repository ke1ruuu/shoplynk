"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Store, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/app/actions/auth";

interface UserMenuProps {
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

export function UserMenu({ user, profile }: UserMenuProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const name = profile?.full_name || user.user_metadata?.full_name || "Member";
  const email = user.email || "";
  const role = profile?.role || "BUYER";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-paper-deep focus-visible:outline-kita-green">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kita-green text-xs font-extrabold text-white shadow-flyer">
          {initials}
        </span>
        <span className="hidden text-left sm:flex sm:flex-col">
          <span className="text-sm font-semibold text-ink leading-tight">
            {name}
          </span>
          <span className="eyebrow text-[0.62rem] text-kita-green">
            {role.replace("_", " ")}
          </span>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 shadow-flyer-lg">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-ink">{name}</p>
            <p className="text-xs text-muted truncate">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-lg text-sm font-medium">
          <User className="h-4 w-4 text-muted" />
          <span>Profile</span>
        </DropdownMenuItem>

        {role === "BUYER" && (
          <DropdownMenuItem
            onClick={() => router.push("/seller/verification")}
            className="cursor-pointer gap-2.5 rounded-lg text-sm font-medium"
          >
            <Store className="h-4 w-4 text-spark-ink" />
            <span>Become a Seller</span>
          </DropdownMenuItem>
        )}

        {role === "SELLER" && (
          <DropdownMenuItem
            onClick={() => router.push("/seller")}
            className="cursor-pointer gap-2.5 rounded-lg text-sm font-medium"
          >
            <Store className="h-4 w-4 text-kita-green" />
            <span>Seller Studio</span>
          </DropdownMenuItem>
        )}

        {(role === "CAMPUS_ADMIN" || role === "PLATFORM_ADMIN") && (
          <DropdownMenuItem
            onClick={() => router.push("/admin")}
            className="cursor-pointer gap-2.5 rounded-lg text-sm font-medium"
          >
            <Shield className="h-4 w-4 text-spark-ink" />
            <span>Admin Console</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isPending}
          onClick={handleLogout}
          className="cursor-pointer gap-2.5 rounded-lg text-sm font-medium text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span>{isPending ? "Logging out…" : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
