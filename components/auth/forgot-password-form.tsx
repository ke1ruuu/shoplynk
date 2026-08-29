"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton, FieldError } from "@/components/auth/shared";
import { forgotPasswordAction, AuthFormState } from "@/app/actions/auth";

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState<AuthFormState, FormData>(
    forgotPasswordAction,
    {}
  );

  const getFieldError = (field: string) => state.errors?.[field]?.[0];

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-kita-green/20 bg-kita-green-soft p-8 text-center shadow-flyer">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-kita-green text-white">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <div className="flex flex-col gap-1.5">
          <h2 className="font-display text-2xl font-extrabold text-ink">
            Reset request sent
          </h2>
          <p className="max-w-xs text-sm text-muted">
            If an account exists with that email, instructions to reset your password have been processed.
          </p>
        </div>
        <Link
          href="/login"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-kita-green underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-2">
        <span className="eyebrow text-kita-green">Account recovery</span>
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink">
          Forgot your password?
        </h1>
        <p className="text-[15px] text-muted">
          Enter your email address and we&apos;ll help you reset your credentials.
        </p>
      </header>

      {state.message && (
        <div className="flex items-center gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm font-medium text-destructive">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="reset-email">Email address</Label>
          <Input
            id="reset-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={getFieldError("email") ? true : undefined}
            aria-describedby={getFieldError("email") ? "reset-email-error" : undefined}
            className="h-11 rounded-lg text-base"
          />
          <FieldError id="reset-email-error" message={getFieldError("email")} />
        </div>

        <SubmitButton pending={isPending}>Send reset link</SubmitButton>
      </form>

      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
}
