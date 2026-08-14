"use client";

import React, { useActionState, useState } from "react";
import Link from "next/link";
import { CheckCircle2, BadgeCheck, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AccountTypeToggle,
  AccountType,
} from "@/components/auth/account-type-toggle";
import { PasswordField } from "@/components/auth/password-field";
import { SubmitButton, FieldError } from "@/components/auth/shared";
import { signupAction, AuthFormState } from "@/app/actions/auth";

export function SignupForm({
  defaultType = "buyer",
}: {
  defaultType?: AccountType;
}) {
  const [accountType, setAccountType] = useState<AccountType>(defaultType);
  const [agreed, setAgreed] = useState(false);
  const [state, formAction, isPending] = useActionState<AuthFormState, FormData>(
    signupAction,
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
            Check your email
          </h2>
          <p className="max-w-xs text-sm text-muted">
            We sent a confirmation link to your inbox. Click it to verify your
            account and enter the marketplace.
          </p>
        </div>
        <Link
          href="/login"
          className="mt-2 inline-flex items-center text-sm font-semibold text-kita-green underline-offset-4 hover:underline"
        >
          Return to login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-2">
        <span className="eyebrow text-kita-green">Join Project Kita</span>
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink">
          Create your account.
        </h1>
        <p className="text-[15px] text-muted">
          Already have one?{" "}
          <Link
            href="/login"
            className="font-semibold text-kita-green underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </p>
      </header>

      {state.message && (
        <div className="flex items-center gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm font-medium text-destructive">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-5">
        {/* Hidden inputs to pass state */}
        <input type="hidden" name="accountType" value={accountType} />
        <input type="hidden" name="agreed" value={agreed ? "true" : "false"} />

        {/* Account type — defining choice */}
        <div className="flex flex-col gap-2">
          <Label>What brings you here?</Label>
          <AccountTypeToggle value={accountType} onChange={setAccountType} />
          <p className="flex items-start gap-1.5 text-xs text-muted">
            {accountType === "seller" ? (
              <>
                <BadgeCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-kita-green" />
                You&apos;ll earn a Verified Student Seller badge once your student ID is approved.
              </>
            ) : (
              <>You can switch to selling anytime from your profile.</>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="signup-name">Full name</Label>
          <Input
            id="signup-name"
            name="name"
            autoComplete="name"
            placeholder="Maria Santos"
            aria-invalid={getFieldError("name") ? true : undefined}
            aria-describedby={getFieldError("name") ? "signup-name-error" : undefined}
            className="h-11 rounded-lg text-base"
          />
          <FieldError id="signup-name-error" message={getFieldError("name")} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="signup-email">School email</Label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@lyfjshs.edu.ph"
            aria-invalid={getFieldError("email") ? true : undefined}
            aria-describedby={
              getFieldError("email") ? "signup-email-error" : "signup-email-hint"
            }
            className="h-11 rounded-lg text-base"
          />
          {getFieldError("email") ? (
            <FieldError id="signup-email-error" message={getFieldError("email")} />
          ) : (
            <p id="signup-email-hint" className="text-xs text-muted">
              Use your LYFJSHS email so we can verify you belong to campus.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="signup-password">Password</Label>
          <PasswordField
            id="signup-password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            invalid={!!getFieldError("password")}
            aria-describedby={
              getFieldError("password") ? "signup-password-error" : undefined
            }
          />
          <FieldError
            id="signup-password-error"
            message={getFieldError("password")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-start gap-2.5">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(v) => setAgreed(v === true)}
              aria-invalid={getFieldError("agreed") ? true : undefined}
              className="mt-0.5"
            />
            <p className="text-sm leading-snug text-muted">
              <label htmlFor="terms" className="cursor-pointer">
                I agree to Project Kita&apos;s
              </label>{" "}
              <Link
                href="/terms"
                className="font-medium text-kita-green underline-offset-4 hover:underline"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-kita-green underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <FieldError id="signup-terms-error" message={getFieldError("agreed")} />
        </div>

        <SubmitButton pending={isPending}>
          {accountType === "seller" ? "Start selling" : "Start shopping"}
        </SubmitButton>
      </form>
    </div>
  );
}
