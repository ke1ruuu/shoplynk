"use client";

import React, { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/auth/password-field";
import { SubmitButton, FieldError } from "@/components/auth/shared";
import { resetPasswordAction, AuthFormState } from "@/app/actions/auth";

export function ResetPasswordForm() {
  const [state, formAction, isPending] = useActionState<AuthFormState, FormData>(
    resetPasswordAction,
    {}
  );

  const getFieldError = (field: string) => state.errors?.[field]?.[0];

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-2">
        <span className="eyebrow text-kita-green">Account security</span>
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink">
          Set new password.
        </h1>
        <p className="text-[15px] text-muted">
          Choose a strong password with at least 8 characters.
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
          <Label htmlFor="new-password">New password</Label>
          <PasswordField
            id="new-password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            invalid={!!getFieldError("password")}
            aria-describedby={
              getFieldError("password") ? "new-password-error" : undefined
            }
          />
          <FieldError id="new-password-error" message={getFieldError("password")} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm-password">Confirm new password</Label>
          <PasswordField
            id="confirm-password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Re-enter new password"
            invalid={!!getFieldError("confirmPassword")}
            aria-describedby={
              getFieldError("confirmPassword")
                ? "confirm-password-error"
                : undefined
            }
          />
          <FieldError
            id="confirm-password-error"
            message={getFieldError("confirmPassword")}
          />
        </div>

        <SubmitButton pending={isPending}>Update password</SubmitButton>
      </form>
    </div>
  );
}
