"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

const STORAGE_KEY = "projectkita_sidebar_collapsed";

/**
 * Collapse state lives here rather than in the sidebar, because the content
 * column's left offset depends on it. Previously each read localStorage once on
 * mount independently, so collapsing the sidebar left the content column
 * padded for the wide rail.
 */
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") setCollapsed(true);
    } catch {
      // Private mode or blocked storage — the default stands.
    }
  }, []);

  function handleSetCollapsed(value: boolean | ((prev: boolean) => boolean)) {
    setCollapsed((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "true" : "false");
      } catch {
        // Ignore
      }
      return next;
    });
  }

  function toggleCollapsed() {
    handleSetCollapsed((prev) => !prev);
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed: handleSetCollapsed,
        toggleCollapsed,
        mobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside a SidebarProvider");
  return ctx;
}
