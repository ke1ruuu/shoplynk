import React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type Tone = "default" | "destructive";

const TONE: Record<Tone, string> = {
  default: "text-muted hover:bg-paper-deep hover:text-ink",
  destructive: "text-muted hover:bg-destructive/10 hover:text-destructive",
};

const BASE =
  "inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-40";

interface IconButtonProps extends Omit<React.ComponentProps<"button">, "children"> {
  icon: LucideIcon;
  /** The accessible name — an icon-only control has no visible label to fall back on. */
  label: string;
  tone?: Tone;
}

/**
 * A row action drawn as an icon alone. `label` supplies both the accessible
 * name and the hover tooltip: `title` by itself is a tooltip, not a name, and
 * leaves the control anonymous to a screen reader.
 */
export function IconButton({
  icon: Icon,
  label,
  tone = "default",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`${BASE} ${TONE[tone]} ${className}`}
      {...props}
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}

interface IconLinkProps extends Omit<React.ComponentProps<typeof Link>, "children"> {
  icon: LucideIcon;
  label: string;
}

/** The same action shape, for navigation rather than a handler. */
export function IconLink({ icon: Icon, label, className = "", ...props }: IconLinkProps) {
  return (
    <Link
      aria-label={label}
      title={label}
      className={`${BASE} ${TONE.default} ${className}`}
      {...props}
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
    </Link>
  );
}
