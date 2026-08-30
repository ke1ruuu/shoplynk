import React from "react";

/**
 * Every status across the three dashboards resolves to one of these five
 * intents, so a pill means the same thing in the seller table, the buyer's
 * order list, and the admin queue.
 */
export type StatusIntent = "live" | "pending" | "warn" | "stopped" | "idle";

const INTENT: Record<StatusIntent, { dot: string; text: string; bg: string }> = {
  live: { dot: "bg-kita-green", text: "text-kita-green-deep", bg: "bg-kita-green-soft" },
  pending: { dot: "bg-spark-deep", text: "text-spark-ink", bg: "bg-spark-soft" },
  warn: { dot: "bg-spark-deep", text: "text-spark-ink", bg: "bg-spark-soft" },
  stopped: { dot: "bg-destructive", text: "text-destructive", bg: "bg-destructive/10" },
  idle: { dot: "bg-line-strong", text: "text-muted", bg: "bg-paper-deep" },
};

interface StatusPillProps {
  intent: StatusIntent;
  children: React.ReactNode;
  /** Drops the tinted background — for use inside already-tinted rows. */
  bare?: boolean;
}

/**
 * Status never rides on color alone: the dot is an additional channel and the
 * label always states the status in words.
 */
export function StatusPill({ intent, children, bare = false }: StatusPillProps) {
  const c = INTENT[intent];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold ${
        c.text
      } ${bare ? "" : c.bg}`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${c.dot}`} />
      {children}
    </span>
  );
}

/** Order lifecycle → intent + human label. Single source for order wording. */
export function orderStatus(status: string): { intent: StatusIntent; label: string } {
  switch (status) {
    case "READY_FOR_PICKUP":
      return { intent: "live", label: "Ready for pickup" };
    case "PREPARING":
      return { intent: "pending", label: "Being prepared" };
    case "AWAITING_PAYMENT":
      return { intent: "warn", label: "Awaiting payment" };
    case "PAYMENT_REVIEW":
      return { intent: "warn", label: "Payment under review" };
    case "COMPLETED":
      return { intent: "idle", label: "Completed" };
    case "CANCELLED":
      return { intent: "stopped", label: "Cancelled" };
    default:
      return { intent: "idle", label: status.replace(/_/g, " ").toLowerCase() };
  }
}

/** Product lifecycle → intent + human label. */
export function productStatus(
  status: string,
  stock: number
): { intent: StatusIntent; label: string } {
  if (status === "OUT_OF_STOCK" || stock === 0) {
    return { intent: "stopped", label: "Out of stock" };
  }
  switch (status) {
    case "ACTIVE":
      return { intent: "live", label: "Live" };
    case "DRAFT":
      return { intent: "idle", label: "Draft" };
    case "ARCHIVED":
      return { intent: "idle", label: "Archived" };
    default:
      return { intent: "idle", label: status.toLowerCase() };
  }
}
