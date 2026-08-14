"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordField } from "@/components/auth/password-field";
import { SubmitButton, FieldError } from "@/components/auth/shared";
import { loginAction, AuthFormState } from "@/app/actions/auth";

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, isPending] = useActionState<AuthFormState, FormData>(
    loginAction,
    {}
  );

  const getFieldError = (field: string) => state.errors?.[field]?.[0];

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-2">
        <span className="eyebrow text-kita-green">Welcome back</span>
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink">
          Log in to your kita.
        </h1>
        <p className="text-[15px] text-muted">
          New to Project Kita?{" "}
          <Link
            href="/signup"
            className="font-semibold text-kita-green underline-offset-4 hover:underline"
          >
            Create an account
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
        {next && <input type="hidden" name="next" value={next} />}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="login-email">School email</Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@lyfjshs.edu.ph"
            aria-invalid={getFieldError("email") ? true : undefined}
            aria-describedby={getFieldError("email") ? "login-email-error" : undefined}
            className="h-11 rounded-lg text-base"
          />
          <FieldError id="login-email-error" message={getFieldError("email")} />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-kita-green underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordField
            id="login-password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            invalid={!!getFieldError("password")}
            aria-describedby={
              getFieldError("password") ? "login-password-error" : undefined
            }
          />
          <FieldError
            id="login-password-error"
            message={getFieldError("password")}
          />
        </div>

        <div className="flex items-center gap-2.5">
          <Checkbox id="remember" defaultChecked />
          <Label htmlFor="remember" className="font-normal text-muted">
            Keep me logged in
          </Label>
        </div>

        <SubmitButton pending={isPending}>Log in</SubmitButton>
      </form>
    </div>
  );
}
