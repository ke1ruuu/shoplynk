import React from "react";

interface PanelProps {
  /** Section heading. Jakarta, not the display face — this is UI, not a title. */
  heading?: string;
  /** Right-aligned controls or a "view all" link in the heading bar. */
  aside?: React.ReactNode;
  /** Removes body padding so tables and lists can meet the panel edge. */
  flush?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * The one container for dashboard content. A panel never nests inside another
 * panel — content that needs separating inside one gets a rule, not a second
 * border and shadow.
 */
export function Panel({ heading, aside, flush = false, children, className = "" }: PanelProps) {
  return (
    <section className={`rounded-lg border border-line bg-surface ${className}`}>
      {(heading || aside) && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          {heading && (
            <h2 className="text-[0.9375rem] font-semibold leading-none text-ink">{heading}</h2>
          )}
          {aside && <div className="flex flex-shrink-0 items-center gap-2">{aside}</div>}
        </div>
      )}
      <div className={flush ? "" : "p-4"}>{children}</div>
    </section>
  );
}

/**
 * A heading that separates content on the page itself, for runs that are not
 * panel-wrapped. Keeps more space above than below, per the type rhythm.
 */
export function SectionHeading({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 pb-1">
      <h2 className="text-[0.9375rem] font-semibold text-ink">{children}</h2>
      {aside}
    </div>
  );
}
