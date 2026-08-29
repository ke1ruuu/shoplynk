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
  Sparkles,
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
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      {/* Status Header Banner */}
      <div
        className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 shadow-flyer ${
          isPending
            ? "border-spark/40 bg-spark-soft/40"
            : isRejected
            ? "border-destructive/30 bg-destructive/10"
            : "border-kita-green/30 bg-kita-green-soft"
        }`}
      >
        <div className="relative z-10 flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            {isPending && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-spark/20 px-3.5 py-1 text-xs font-bold text-spark-ink">
                <Clock className="h-4 w-4 animate-pulse" />
                Under Campus Administrator Review
              </span>
            )}
            {isRejected && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/20 px-3.5 py-1 text-xs font-bold text-destructive">
                <AlertTriangle className="h-4 w-4" />
                Application Needs Revision
              </span>
            )}
            {isApproved && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-kita-green-soft px-3.5 py-1 text-xs font-bold text-kita-green">
                <CheckCircle2 className="h-4 w-4" />
                Verified Student Seller
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
            {isPending
              ? "Your Seller Verification is in Progress"
              : isRejected
              ? "Verification Request Not Approved"
              : "Congratulations! You are Verified"}
          </h1>

          <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
            {isPending
              ? "We received your student credentials. A campus administrator is reviewing your school ID to activate your Seller Studio."
              : isRejected
              ? "Your application was reviewed and could not be verified with the provided information. Please review the feedback below and re-apply."
              : "Your student credentials were verified by the campus administrator. You now have full access to create your store and list products."}
          </p>

          {isApproved && (
            <Link
              href="/seller"
              className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-kita-green px-6 py-3 text-sm font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-colors"
            >
              <span>Enter Seller Studio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Rejection Feedback Box if Rejected */}
      {isRejected && (
        <div className="flex flex-col gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-destructive font-bold text-sm">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>Administrator Feedback:</span>
          </div>
          <p className="text-sm text-ink leading-relaxed pl-6">
            &ldquo;{verification.rejection_reason || "ID photo was blurry or student number did not match school records."}&rdquo;
          </p>
          <div className="pt-3 border-t border-destructive/20 flex justify-end">
            <button
              type="button"
              onClick={onReapply}
              className="inline-flex items-center gap-2 rounded-xl bg-destructive px-5 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-destructive/90 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Update &amp; Re-submit Application</span>
            </button>
          </div>
        </div>
      )}

      {/* Verification Timeline Steps */}
      {isPending && (
        <div className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-flyer">
          <h2 className="font-display text-lg font-extrabold text-ink">
            Verification Steps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="flex flex-col gap-2 rounded-2xl border border-kita-green/30 bg-kita-green-soft/40 p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kita-green text-white text-xs font-bold shadow-sm">
                ✓
              </span>
              <span className="font-display font-bold text-sm text-ink">
                1. Credentials Submitted
              </span>
              <span className="text-xs text-muted">
                Student ID &amp; program recorded on {submissionDate}.
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-2 rounded-2xl border border-spark/40 bg-spark-soft/30 p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-spark text-spark-ink text-xs font-bold shadow-sm">
                2
              </span>
              <span className="font-display font-bold text-sm text-ink">
                2. Admin Review
              </span>
              <span className="text-xs text-muted">
                Campus admin is reviewing student enrollment records.
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-2 rounded-2xl border border-line bg-paper/50 p-4 opacity-75">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper-deep text-muted text-xs font-bold">
                3
              </span>
              <span className="font-display font-bold text-sm text-ink">
                3. Studio Unlocked
              </span>
              <span className="text-xs text-muted">
                Start listing snacks, crafts, and goods on the marketplace.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Submitted Application Summary Card */}
      <div className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-flyer">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <IdCard className="h-5 w-5 text-kita-green" />
            <h2 className="font-display text-lg font-extrabold text-ink">
              Submitted Credentials
            </h2>
          </div>
          <span className="text-xs text-muted">{submissionDate}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1 rounded-2xl bg-paper p-4 border border-line">
            <span className="text-xs text-muted">Student ID / LRN</span>
            <span className="font-mono font-bold text-sm text-ink">
              {verification.student_id_number}
            </span>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl bg-paper p-4 border border-line">
            <span className="text-xs text-muted">Academic Strand</span>
            <span className="font-bold text-sm text-ink">{verification.program}</span>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl bg-paper p-4 border border-line">
            <span className="text-xs text-muted">Grade Level</span>
            <span className="font-bold text-sm text-ink">
              {verification.year_level}
            </span>
          </div>
        </div>

        {/* Attached School ID Image */}
        {verification.id_image_url && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-muted">
              Submitted School ID Card
            </span>
            <div className="relative h-44 w-full sm:w-80 overflow-hidden rounded-2xl border border-line bg-paper-deep">
              <Image
                src={verification.id_image_url}
                alt="Student ID card"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-line flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-xs font-semibold text-ink hover:bg-paper-deep transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5 text-muted" />
            <span>Refresh Status</span>
          </button>

          <Link
            href="/protected/marketplace"
            className="inline-flex items-center gap-2 rounded-xl bg-paper px-4 py-2.5 text-xs font-semibold text-muted hover:text-ink transition-colors"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Browse Campus Marketplace as Buyer</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
