import React from "react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  /** States what is absent, in the product's words. */
  title: string;
  /** Teaches what this surface does once it has content. */
  body: string;
  /** The action that resolves the emptiness, when there is one. */
  action?: React.ReactNode;
  /** `filtered` = the user's query hid everything; softer framing, no icon. */
  variant?: "empty" | "filtered";
}

/**
 * An empty state that teaches the surface rather than announcing "nothing
 * here". The filtered variant is visually quieter because the user caused it
 * and already knows why.
 */
export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
  variant = "empty",
}: EmptyStateProps) {
  if (variant === "filtered") {
    return (
      <div className="flex flex-col items-center gap-1.5 px-6 py-14 text-center">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="max-w-sm text-sm leading-relaxed text-muted">{body}</p>
        {action && <div className="pt-2.5">{action}</div>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-paper text-muted">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div className="flex flex-col gap-1.5">
        <p className="text-[0.9375rem] font-semibold text-ink">{title}</p>
        <p className="max-w-[46ch] text-sm leading-relaxed text-muted">{body}</p>
      </div>
      {action && <div className="pt-1.5">{action}</div>}
    </div>
  );
}
