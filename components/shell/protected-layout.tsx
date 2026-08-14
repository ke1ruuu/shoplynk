"use client";

import React, { useState } from "react";
import { AppSidebar } from "./app-sidebar";
import { MockDataProvider } from "@/lib/mock-data-context";

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

export function ProtectedLayout({ user, profile, children }: ProtectedLayoutProps) {
  const [collapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("projectkita_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  return (
    <MockDataProvider>
      <div className="min-h-screen bg-paper text-ink flex flex-col">
        {/* Sidebar */}
        <AppSidebar user={user} profile={profile} />

        {/* Main Content Workspace with Sidebar Offset */}
        <div
          className={`flex-1 transition-all duration-300 ${
            collapsed ? "lg:pl-20" : "lg:pl-64"
          }`}
        >
          {children}
        </div>
      </div>
    </MockDataProvider>
  );
}
