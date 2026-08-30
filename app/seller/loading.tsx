import React from "react";

export default function SellerLoading() {
  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 xl:px-10 animate-pulse">
      {/* Seller Header Skeleton */}
      <div className="flex items-center justify-between border-b border-line pb-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-paper-deep" />
          <div className="flex flex-col gap-2">
            <div className="h-6 w-48 rounded bg-paper-deep" />
            <div className="h-4 w-32 rounded bg-paper" />
          </div>
        </div>
        <div className="h-10 w-36 rounded-xl bg-kita-green/30" />
      </div>

      {/* Analytics KPI Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-surface border border-line p-4" />
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 rounded-2xl bg-surface border border-line p-4" />
        ))}
      </div>
    </div>
  );
}
