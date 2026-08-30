import React from "react";

interface PageHeaderProps {
  /** Bricolage is reserved for this string alone on a dashboard page. */
  title: string;
  /** One sentence of orientation. Omit when the title is self-evident. */
  description?: string;
  /** Small facts that qualify the title — store name, campus, counts. */
  meta?: React.ReactNode;
  /** Primary/secondary actions, right-aligned on wide viewports. */
  actions?: React.ReactNode;
}

/**
 * The dashboard page title block. Deliberately not a card: no panel, no
 * background pattern, no label above the heading — the heading carries itself
 * and the rule below it does the separating.
 */
export function PageHeader({ title, description, meta, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div className="flex min-w-0 flex-col gap-1.5">
        <h1 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[1.75rem]">
          {title}
        </h1>

        {description && (
          <p className="max-w-[68ch] text-sm leading-relaxed text-muted">{description}</p>
        )}

        {meta && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 text-xs text-muted">
            {meta}
          </div>
        )}
      </div>

      {actions && (
        <div className="flex flex-shrink-0 flex-wrap items-center gap-2">{actions}</div>
      )}
    </header>
  );
}

/**
 * A `·`-separated run of facts for the `meta` slot, so every dashboard
 * separates them identically.
 */
export function MetaList({ items }: { items: React.ReactNode[] }) {
  const shown = items.filter(Boolean);

  return (
    <>
      {shown.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span aria-hidden="true" className="text-line-strong">
              ·
            </span>
          )}
          <span className="flex items-center gap-1.5">{item}</span>
        </React.Fragment>
      ))}
    </>
  );
}
