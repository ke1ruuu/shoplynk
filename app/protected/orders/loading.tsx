import React from "react";

export default function OrdersLoading() {
  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 xl:px-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between border-b border-line pb-5">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 rounded bg-kita-green/20" />
          <div className="h-8 w-48 rounded bg-paper-deep" />
        </div>
        <div className="h-9 w-36 rounded-xl bg-paper-deep" />
      </div>

      {/* Tabs Skeleton */}
      <div className="flex items-center gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 w-28 rounded-xl bg-surface border border-line" />
        ))}
      </div>

      {/* Split Orders Workbench Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 flex flex-col gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-surface border border-line p-4" />
          ))}
        </div>
        <div className="lg:col-span-7 h-[420px] rounded-2xl bg-surface border border-line p-6" />
      </div>
    </div>
  );
}
