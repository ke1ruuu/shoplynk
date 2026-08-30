"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  RotateCcw,
  IdCard,
} from "lucide-react";

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

  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      {/* 1. Flatline Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-kita-green">
            <ShieldCheck className="h-4 w-4" />
            <span className="eyebrow">Verification Status</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            {isPending
              ? "Application Under Review"
              : isRejected
              ? "Application Revision Required"
              : "Seller Account Verified"}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line bg-surface px-3.5 text-xs font-bold text-ink hover:bg-paper-deep transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5 text-muted" />
            <span>Refresh</span>
          </button>
          {isApproved && (
            <Link
              href="/seller"
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-kita-green px-4 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all"
            >
              <span>Enter Seller Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* 2. Flatline 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sticky Rail (4 Cols) — Status & Step Timeline */}
        <aside className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-6">
          <div
            className={`flex flex-col gap-4 border p-5 rounded-2xl ${
              isPending
                ? "border-spark/40 bg-spark-soft/30"
                : isRejected
                ? "border-destructive/30 bg-destructive/10"
                : "border-kita-green/30 bg-kita-green-soft"
            }`}
          >
            <span className="eyebrow text-xs text-muted">Current State</span>
            <div className="flex items-center gap-2">
              {isPending && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-spark/20 px-3 py-1 text-xs font-bold text-spark-ink">
                  <Clock className="h-3.5 w-3.5 animate-pulse" />
                  Admin Review in Progress
                </span>
              )}
              {isRejected && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/20 px-3 py-1 text-xs font-bold text-destructive">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Action Required
                </span>
              )}
              {isApproved && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-kita-green px-3 py-1 text-xs font-bold text-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Verified
                </span>
              )}
            </div>

            <p className="text-xs text-muted leading-relaxed">
              {isPending
                ? "Your student record is queued for campus admin verification. Once verified, your storefront will unlock automatically."
                : isRejected
                ? "Your submission could not be verified against the school roster. Check the admin notes on the right to revise and re-apply."
                : "You have verified seller credentials for Luis Y. Ferrer Jr. Senior High School."}
            </p>
          </div>

          {/* Verification Step List */}
          <div className="flex flex-col border border-line bg-surface p-5 rounded-2xl gap-3">
            <span className="eyebrow text-xs text-muted">Progress Roadmap</span>
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kita-green text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-ink">1. Credentials Submitted</span>
                  <span className="text-muted text-xs opacity-75">{submissionDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isApproved
                      ? "bg-kita-green text-white"
                      : isRejected
                      ? "bg-destructive text-white"
                      : "bg-spark text-spark-ink"
                  }`}
                >
                  {isApproved ? "✓" : isRejected ? "!" : "2"}
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-ink">2. Admin Verification</span>
                  <span className="text-muted text-xs opacity-75">
                    {isApproved
                      ? "Application approved"
                      : isRejected
                      ? "Revision requested"
                      : "Reviewing enrollment"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isApproved ? "bg-kita-green text-white" : "bg-paper-deep text-muted"
                  }`}
                >
                  3
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-ink">3. Seller Studio Unlocked</span>
                  <span className="text-muted text-xs opacity-75">Publish products &amp; accept campus pre-orders</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Stream (8 Cols) — Credentials & Review Panel */}
        <main className="lg:col-span-8 flex flex-col gap-4 min-w-0">
          {/* Rejection Alert Box */}
          {isRejected && (
            <div className="flex flex-col gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-5">
              <div className="flex items-center gap-2 text-destructive font-bold text-xs">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>Campus Administrator Notes:</span>
              </div>
              <p className="text-xs text-ink leading-relaxed">
                &ldquo;{verification.rejection_reason || "ID photo was blurry or student number did not match school records."}&rdquo;
              </p>
              <div className="pt-2 border-t border-destructive/20 flex justify-end">
                <button
                  type="button"
                  onClick={onReapply}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-destructive px-4 py-2 text-xs font-bold text-white shadow-flyer hover:bg-destructive/90 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Update &amp; Re-submit Application</span>
                </button>
              </div>
            </div>
          )}

          {/* Submitted Record Card */}
          <div className="flex flex-col gap-5 border border-line bg-surface p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4 text-kita-green" />
                <h2 className="font-display text-base font-bold text-ink">
                  Submitted Student Record
                </h2>
              </div>
              <span className="eyebrow text-xs text-muted">{submissionDate}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1 rounded-xl bg-paper p-3.5 border border-line text-xs">
                <span className="text-muted">Student LRN / ID</span>
                <span className="font-mono font-bold text-ink">{verification.student_id_number}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-paper p-3.5 border border-line text-xs">
                <span className="text-muted">Academic Track</span>
                <span className="font-bold text-ink">{verification.program}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-paper p-3.5 border border-line text-xs">
                <span className="text-muted">Year Level</span>
                <span className="font-bold text-ink">{verification.year_level}</span>
              </div>
            </div>

            {/* Attached Photo */}
            {verification.id_image_url && (
              <div className="flex flex-col gap-2 pt-2 border-t border-line">
                <span className="text-xs font-bold text-ink">Submitted Student ID:</span>
                <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-xl border border-line bg-paper-deep">
                  <Image
                    src={verification.id_image_url}
                    alt="Student ID card"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
