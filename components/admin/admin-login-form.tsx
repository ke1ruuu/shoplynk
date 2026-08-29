"use client";

import React, { useActionState, useState } from "react";
import Link from "next/link";
import { Shield, AlertCircle, Lock, Mail, ArrowRight, KeyRound, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/auth/password-field";
import { SubmitButton, FieldError } from "@/components/auth/shared";
import { adminLoginAction, AuthFormState } from "@/app/actions/auth";

export function AdminLoginForm() {
  const [email, setEmail] = useState("admin@projectkita.edu.ph");
  const [password, setPassword] = useState("password123");

  const [state, formAction, isPending] = useActionState<AuthFormState, FormData>(
    adminLoginAction,
    {}
  );

  const getFieldError = (field: string) => state.errors?.[field]?.[0];

  function autoFillDemoAdmin() {
    setEmail("admin@projectkita.edu.ph");
    setPassword("password123");
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      {/* Admin Badge & Title */}
      <header className="flex flex-col items-center text-center gap-2.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-kita-green text-white shadow-flyer">
          <Shield className="h-7 w-7" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="eyebrow text-xs text-kita-green font-bold tracking-widest">
            Institutional Access
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            Campus Administrator Portal
          </h1>
          <p className="text-xs sm:text-sm text-muted max-w-xs mx-auto">
            Luis Y. Ferrer Jr. Senior High School administrative &amp; verification console.
          </p>
        </div>
      </header>

      {/* Error Message Box */}
      {state.message && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-xs sm:text-sm font-medium text-destructive">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Form Container */}
      <form
        action={formAction}
        className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-flyer"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="admin-email" className="flex items-center gap-1.5 text-xs font-semibold text-ink">
            <Mail className="h-3.5 w-3.5 text-kita-green" />
            <span>Administrator Email</span>
          </Label>
          <Input
            id="admin-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@projectkita.edu.ph"
            required
            className="h-11 rounded-xl text-sm"
          />
          <FieldError id="admin-email-error" message={getFieldError("email")} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="admin-password" className="flex items-center gap-1.5 text-xs font-semibold text-ink">
            <Lock className="h-3.5 w-3.5 text-kita-green" />
            <span>Security Password</span>
          </Label>
          <PasswordField
            id="admin-password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            className="h-11 rounded-xl text-sm"
          />
          <FieldError id="admin-password-error" message={getFieldError("password")} />
        </div>

        {/* Demo Credentials Quick Fill Button */}
        <button
          type="button"
          onClick={autoFillDemoAdmin}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-spark/40 bg-spark-soft/50 py-2 text-[11px] font-semibold text-spark-ink hover:bg-spark-soft transition-colors"
        >
          <KeyRound className="h-3.5 w-3.5" />
          <span>Use Pre-seeded Admin Credentials (`admin@projectkita.edu.ph`)</span>
        </button>

        {/* Submit */}
        <div className="pt-2">
          <SubmitButton pending={isPending}>
            Log In to Admin Console
          </SubmitButton>
        </div>

        {/* Security Notice */}
        <p className="text-[11px] text-muted text-center leading-relaxed pt-2 border-t border-line">
          All administrative actions and seller approvals are logged under LYFJSHS safety guidelines.
        </p>
      </form>

      {/* Return to Student Marketplace */}
      <div className="text-center">
        <Link
          href="/login"
          className="text-xs font-semibold text-muted hover:text-ink transition-colors inline-flex items-center gap-1"
        >
          <span>← Return to Student Marketplace Login</span>
        </Link>
      </div>
    </div>
  );
}
