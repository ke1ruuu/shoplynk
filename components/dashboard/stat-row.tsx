import React from "react";

export interface StatItem {
  label: string;
  /** Pre-formatted. Renders in Space Mono — the numeral face. */
  value: string;
  /** Optional qualifier under the value. Keep it to a few words. */
  note?: string;
  /** Draws the value in the accent or warning hue. Always paired with `note`. */
  tone?: "default" | "accent" | "warn";
}

const TONE: Record<NonNullable<StatItem["tone"]>, string> = {
  default: "text-ink",
  accent: "text-kita-green",
  warn: "text-spark-ink",
};

/**
 * Measures for a dashboard, as one banded strip rather than a row of
 * identical cards with icons in rounded squares. Vertical rules do the
 * separating; the numerals carry the weight.
 */
export function StatRow({ stats }: { stats: StatItem[] }) {
  return (
    <dl className="grid grid-cols-2 overflow-hidden rounded-lg border border-line bg-surface sm:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={[
            "flex flex-col gap-1 px-4 py-3.5",
            // Rules between cells, without a trailing edge on either axis.
            "border-line",
            i % 2 === 1 ? "border-l" : "",
            i >= 2 ? "border-t" : "",
            "sm:border-l sm:border-t-0",
            i === 0 ? "sm:border-l-0" : "",
          ].join(" ")}
        >
          <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-muted">
            {stat.label}
          </dt>
          <dd className="flex flex-col gap-0.5">
            <span
              className={`tabular text-[1.375rem] font-bold leading-none ${
                TONE[stat.tone ?? "default"]
              }`}
            >
              {stat.value}
            </span>
            {stat.note && (
              <span className="text-xs leading-snug text-muted">{stat.note}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
