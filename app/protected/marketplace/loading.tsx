import React from "react";

export default function MarketplaceLoading() {
  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 xl:px-10 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-32 w-full rounded-2xl bg-paper-deep border border-line" />

      {/* Filter and Search Bar Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="h-10 w-72 rounded-xl bg-surface border border-line" />
        <div className="h-10 w-44 rounded-xl bg-surface border border-line" />
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-surface border border-line">
            <div className="aspect-[4/3] rounded-xl bg-paper-deep" />
            <div className="h-3 w-1/3 rounded bg-paper" />
            <div className="h-4 w-3/4 rounded bg-paper-deep" />
            <div className="h-3 w-1/2 rounded bg-paper" />
            <div className="flex items-center justify-between pt-2 border-t border-line mt-2">
              <div className="h-5 w-1/3 rounded bg-paper-deep" />
              <div className="h-3 w-1/4 rounded bg-paper" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
