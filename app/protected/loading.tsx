import React from "react";

export default function ProtectedLoading() {
  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 xl:px-10 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-44 w-full rounded-3xl bg-paper-deep border border-line" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Skeleton */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="h-48 rounded-2xl bg-surface border border-line p-5" />
          <div className="h-64 rounded-2xl bg-surface border border-line p-5" />
        </div>

        {/* Right Content Stream Skeleton */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="h-10 w-48 rounded-xl bg-paper-deep" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-surface border border-line">
                <div className="aspect-[4/3] rounded-xl bg-paper-deep" />
                <div className="h-4 w-3/4 rounded bg-paper-deep" />
                <div className="h-3 w-1/2 rounded bg-paper" />
                <div className="h-5 w-1/3 rounded bg-paper-deep mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
