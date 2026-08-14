"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useMockData } from "@/lib/mock-data-context";

interface MockDataToggleProps {
  collapsed?: boolean;
}

export function MockDataToggle({ collapsed = false }: MockDataToggleProps) {
  const { useMockData: isMockActive, toggleMockData } = useMockData();

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={toggleMockData}
        title={isMockActive ? "Demo Mode Active (Click to disable)" : "Enable Demo Data Mode"}
        className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
          isMockActive
            ? "border-spark bg-spark-soft text-spark-ink shadow-flyer"
            : "border-line bg-surface text-muted hover:text-ink"
        }`}
      >
        <Sparkles className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border p-3 transition-all ${
        isMockActive
          ? "border-spark/60 bg-spark-soft/40 text-ink shadow-flyer"
          : "border-line bg-paper text-muted"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            isMockActive
              ? "bg-spark text-ink font-bold shadow-sm"
              : "bg-surface text-muted"
          }`}
        >
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-ink leading-tight flex items-center gap-1">
            Demo Listings
            {isMockActive && (
              <span className="rounded-full bg-spark px-1.5 py-0.2 text-[0.6rem] font-extrabold text-ink">
                ON
              </span>
            )}
          </span>
          <span className="text-[0.65rem] text-muted">
            {isMockActive ? "Sample listings active" : "Live DB mode only"}
          </span>
        </div>
      </div>

      <Switch
        checked={isMockActive}
        onCheckedChange={toggleMockData}
        aria-label="Toggle Demo Sample Data"
      />
    </div>
  );
}
