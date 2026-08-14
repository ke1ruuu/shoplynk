"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

/** Primary auth CTA — matches the marketing site's kita-green flyer buttons. */
export function SubmitButton({
  pending,
  children,
}: {
  pending?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-kita-green px-6 text-base font-semibold text-white shadow-flyer transition-all hover:bg-kita-green-deep hover:shadow-flyer-lg disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Spinner className="h-4 w-4" />
          <span>Just a sec…</span>
        </>
      ) : (
        <>
          {children}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}

/** Google Workspace sign-in — many campuses run on school Google accounts. */
export function GoogleButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-line bg-surface px-6 text-[15px] font-semibold text-ink shadow-flyer transition-colors hover:border-kita-green/40 hover:bg-paper-deep/50"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.28-1.93-6.15-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
        />
        <path
          fill="#FBBC05"
          d="M5.85 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.67-2.84Z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.67 2.84C6.72 7.3 9.14 5.38 12 5.38Z"
        />
      </svg>
      {label}
    </button>
  );
}

/** "or" divider with a hairline rule on each side. */
export function OrDivider() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <span className="eyebrow text-[0.62rem] text-muted">or</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Inline validation message tied to a field via aria-describedby. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm font-medium text-destructive">
      {message}
    </p>
  );
}
