import React from "react";
import { BadgeCheck } from "lucide-react";

export type SellerType = "Student" | "Faculty";

interface VerificationBadgeProps {
  type?: SellerType;
  className?: string;
}

export function VerificationBadge({
  type = "Student",
  className = "",
}: VerificationBadgeProps) {
  // Type is encoded in color: students in kita-green, faculty in marigold.
  const styles =
    type === "Faculty"
      ? "text-spark-ink bg-spark-soft border-spark/40"
      : "text-kita-green bg-kita-green-soft border-kita-green/25";

  return (
    <div
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${styles} ${className}`}
    >
      <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
      <span>Verified {type}</span>
    </div>
  );
}
