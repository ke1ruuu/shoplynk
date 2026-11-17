"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  RotateCcw,
  IdCard,
  Building2,
  Calendar,
  Lock,
  Check,
  ExternalLink,
} from "lucide-react";
import { isValidImageUrl } from "@/lib/utils";

export interface StudentVerificationData {
  id: string;
  student_id_number: string;
  program: string;
  year_level: string;
  id_image_url: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rejection_reason: string | null;
  created_at: string;
}

interface VerificationStatusViewProps {
  verification: StudentVerificationData;
  onReapply: () => void;
}

export function VerificationStatusView({
  verification,
  onReapply,
}: VerificationStatusViewProps) {
  const router = useRouter();
  const isPending = verification.status === "PENDING";
  const isRejected = verification.status === "REJECTED";
  const isApproved = verification.status === "APPROVED";

  const submissionDate = new Date(verification.created_at).toLocaleDateString(
    "en-PH",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/protected");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 flex flex-col gap-6">
      {/* 1. Top Breadcrumb & Controls */}
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-kita-green transition-colors group cursor-pointer focus:outline-none"
          aria-label="Back to Marketplace"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 text-xs font-bold text-ink hover:bg-paper-deep transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className="h-3.5 w-3.5 text-muted" />
            <span>Refresh Status</span>
          </button>
          {isApproved && (
            <Link
              href="/seller"
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-kita-green px-4 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all"
            >
              <span>Go to Seller Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-kita-green font-bold text-xs">
          <ShieldCheck className="h-4 w-4" />
          <span>SheerID Verified Partner • LYFJSHS</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
          {isPending
            ? "Verification Under Review"
            : isRejected
            ? "Action Required: Update Verification"
            : "Merchant Credentials Verified"}
        </h1>
      </div>

      {/* 2. Stripe Identity-Inspired Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
        {/* Left Sticky Rail (5 Cols) — Current State, Stepper Roadmap, and Security */}
        <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-6">
          {/* Status Card */}
          <div
            className={`flex flex-col gap-3.5 rounded-2xl border p-6 shadow-xs ${
              isPending
                ? "border-amber-500/30 bg-amber-500/10"
                : isRejected
                ? "border-destructive/30 bg-destructive/10"
                : "border-kita-green/30 bg-kita-green-soft"
            }`}
          >
            <span className="eyebrow text-xs text-muted">Application Status</span>
            <div className="flex items-center gap-2">
              {isPending && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-900">
                  <Clock className="h-3.5 w-3.5 animate-pulse" />
                  Admin Review in Progress
                </span>
              )}
              {isRejected && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/20 px-3 py-1 text-xs font-bold text-destructive">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Revision Required
                </span>
              )}
              {isApproved && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-kita-green px-3 py-1 text-xs font-bold text-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Verified Merchant
                </span>
              )}
            </div>

            <p className="text-xs text-ink leading-relaxed font-normal">
              {isPending
                ? "Your student record has been submitted and is currently being inspected by Campus Administration against the active enrollment registry. Review completes within 24 hours."
                : isRejected
                ? "Your submission requires revision before verification can proceed. Please check the administrator revision notes on the right to update and re-submit."
                : "Your student merchant account is fully active for the current academic year. You have full access to your campus storefront and inventory ledger."}
            </p>
          </div>

          {/* Stepper Roadmap (Stripe Identity Style) */}
          <div className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-xs gap-5">
            <span className="eyebrow text-xs text-muted">Verification Roadmap</span>
            <div className="flex flex-col gap-4 text-xs">
              {/* Step 1: Submitted */}
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-kita-green text-white text-xs font-bold shadow-xs flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-ink text-sm">1. Credentials Submitted</span>
                  <span className="text-muted text-xs font-mono">{submissionDate}</span>
                </div>
              </div>

              {/* Step 2: In Review */}
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold flex-shrink-0 mt-0.5 shadow-xs ${
                    isApproved
                      ? "bg-kita-green text-white"
                      : isRejected
                      ? "bg-destructive text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {isApproved ? "✓" : isRejected ? "!" : "2"}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-ink text-sm">2. Admin ID &amp; Credential Review</span>
                  <span className="text-muted text-xs">
                    {isApproved
                      ? "Approved by Campus Administrator"
                      : isRejected
                      ? "Revision requested by Admin"
                      : "Verifying student ID credentials"}
                  </span>
                </div>
              </div>

              {/* Step 3: Activation */}
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isApproved
                      ? "bg-kita-green text-white shadow-xs"
                      : "bg-paper text-muted border border-line"
                  }`}
                >
                  {isApproved ? "✓" : "3"}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-ink text-sm">3. Seller Studio &amp; Storefront</span>
                  <span className="text-muted text-xs">
                    {isApproved ? "Storefront live & pre-orders active" : "Unlocks immediately upon approval"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security Seal */}
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-4 text-xs text-muted">
            <Lock className="h-4 w-4 text-kita-green mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              Student records and ID scans are encrypted and reviewed strictly by authorized campus administrators.
            </p>
          </div>
        </aside>

        {/* Right Main Stream (7 Cols) — Submitted Record & Inspection Review */}
        <main className="lg:col-span-7 flex flex-col gap-6">
          {/* Rejection Alert Box with Action */}
          {isRejected && (
            <div className="flex flex-col gap-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 text-destructive font-bold text-sm">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>Administrator Revision Notes:</span>
              </div>
              <p className="text-sm text-ink leading-relaxed font-normal bg-surface/90 border border-destructive/20 p-4 rounded-xl">
                &ldquo;{verification.rejection_reason || "ID photo was blurry or student number did not match school records."}&rdquo;
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={onReapply}
                  className="inline-flex items-center gap-2 rounded-xl bg-destructive px-5 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-destructive/90 transition-all cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Update &amp; Re-submit Verification</span>
                </button>
              </div>
            </div>
          )}

          {/* Submitted Student Record Card */}
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4 text-kita-green" />
                <h2 className="font-display text-base font-bold text-ink">
                  Submitted Student Record
                </h2>
              </div>
              <span className="font-mono text-xs text-muted">{submissionDate}</span>
            </div>

            {/* Key Information 3-Cell Ledger */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1 rounded-xl bg-paper p-4 border border-line text-xs">
                <span className="text-muted font-semibold">Student LRN</span>
                <span className="font-mono font-bold text-ink text-sm">
                  {verification.student_id_number}
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-paper p-4 border border-line text-xs">
                <span className="text-muted font-semibold">Academic Strand</span>
                <span className="font-bold text-ink text-sm truncate">
                  {verification.program}
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-paper p-4 border border-line text-xs">
                <span className="text-muted font-semibold">Year Level</span>
                <span className="font-bold text-ink text-sm">
                  {verification.year_level}
                </span>
              </div>
            </div>

            {/* Attached School ID Photo (Stripe Identity Frame) */}
            {verification.id_image_url && (
              <div className="flex flex-col gap-3 pt-2 border-t border-line">
                <span className="text-xs font-bold text-ink">Submitted ID Document:</span>
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-xl border border-line bg-paper-deep shadow-xs">
                  {isValidImageUrl(verification.id_image_url) ? (
                    <>
                      <Image
                        src={verification.id_image_url}
                        alt="Student ID card"
                        fill
                        unoptimized
                        className="object-contain p-3"
                      />
                      {/* Scanner Corner Guides */}
                      <div className="absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-kita-green" />
                      <div className="absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 border-kita-green" />
                      <div className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-kita-green" />
                      <div className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-kita-green" />

                      <div className="absolute top-3 left-10 inline-flex items-center gap-1.5 rounded-lg bg-surface/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-ink border border-line shadow-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 text-kita-green" />
                        <span>Attached Document on File</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-xs text-muted">
                      <AlertTriangle className="h-6 w-6 text-amber-500" />
                      <span>Document file recorded (unformatted preview).</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
