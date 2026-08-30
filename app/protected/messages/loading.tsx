import React from "react";

export default function MessagesLoading() {
  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 xl:px-10 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-6 w-32 rounded-lg bg-paper-deep" />
      </div>

      {/* Messaging Console Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px] rounded-2xl border border-line bg-surface overflow-hidden">
        {/* Left Thread List Skeleton (5 cols) */}
        <div className="lg:col-span-5 border-r border-line bg-paper/30 p-4 flex flex-col gap-4">
          <div className="h-9 w-full rounded-xl bg-surface border border-line" />
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-line">
                <div className="h-10 w-10 rounded-full bg-paper-deep flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-3 w-1/2 rounded bg-paper-deep" />
                  <div className="h-3 w-3/4 rounded bg-paper" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Chat Area Skeleton (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-4 bg-surface">
          <div className="flex items-center gap-3 pb-3 border-b border-line">
            <div className="h-10 w-10 rounded-full bg-paper-deep" />
            <div className="flex flex-col gap-1.5">
              <div className="h-4 w-36 rounded bg-paper-deep" />
              <div className="h-3 w-24 rounded bg-paper" />
            </div>
          </div>
          <div className="flex flex-col gap-3 my-auto">
            <div className="h-12 w-64 rounded-2xl bg-paper self-start" />
            <div className="h-12 w-64 rounded-2xl bg-kita-green/20 self-end" />
          </div>
          <div className="h-11 w-full rounded-xl bg-paper border border-line" />
        </div>
      </div>
    </div>
  );
}
