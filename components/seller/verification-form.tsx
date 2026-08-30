"use client";

import React, { useState, useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  IdCard,
  Clock,
  Sparkles,
  Store,
  CreditCard,
  Lock,
  FileText,
  Check,
  Building2,
  QrCode,
  Receipt,
  Wallet,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  submitSellerVerificationAction,
  VerificationActionState,
} from "@/app/actions/verification";

const STRANDS = [
  "STEM (Science, Technology, Engineering & Mathematics)",
  "ABM (Accountancy, Business & Management)",
  "HUMSS (Humanities & Social Sciences)",
  "GAS (General Academic Strand)",
  "TVL - ICT (Information & Communications Tech)",
  "TVL - HE (Home Economics)",
  "TVL - IA (Industrial Arts)",
  "Faculty / School Staff",
];

export function VerificationForm({
  userFullName,
  userEmail,
}: {
  userFullName?: string;
  userEmail?: string;
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [studentId, setStudentId] = useState("");
  const [strand, setStrand] = useState(STRANDS[0]);
  const [yearLevel, setYearLevel] = useState("Grade 12");
  const [docType, setDocType] = useState<"id" | "cor">("id");
  const [idImageUrl, setIdImageUrl] = useState("");
  const [storeProposal, setStoreProposal] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"gcash" | "cash">("gcash");
  const [paymentRefNumber, setPaymentRefNumber] = useState("");
  const [paymentReceiptUrl, setPaymentReceiptUrl] = useState("");
  const [pledgeAccepted, setPledgeAccepted] = useState(false);
  const [step1Error, setStep1Error] = useState("");
  const [step3Error, setStep3Error] = useState("");

  const [state, formAction, isPending] = useActionState<
    VerificationActionState,
    FormData
  >(submitSellerVerificationAction, {});

  const getFieldError = (field: string) => state.errors?.[field]?.[0];

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/protected");
    }
  }

  function handleProceedToStep2() {
    if (!studentId.trim()) {
      setStep1Error("Please enter your Learner Reference Number (LRN) or Student ID.");
      return;
    }
    setStep1Error("");
    setCurrentStep(2);
  }

  function handleProceedToStep3() {
    setCurrentStep(3);
  }

  function handleProceedToStep4() {
    if (!idImageUrl.trim()) {
      setStep3Error("Please provide a photo URL of your School ID or Certificate of Registration.");
      return;
    }
    setStep3Error("");
    setCurrentStep(4);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 flex flex-col gap-6">
      {/* 1. Top Navigation & Verification Badge */}
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

        <span className="inline-flex items-center gap-1.5 rounded-full bg-kita-green-soft px-3 py-1 text-xs font-bold text-kita-green">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>LYFJSHS Merchant Accreditation Program</span>
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
          Student Merchant Verification
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          Complete the 4-step accreditation process to verify your enrollment at{" "}
          <strong className="text-ink">Luis Y. Ferrer Jr. Senior High School</strong> and
          activate your official campus seller studio.
        </p>
      </div>

      {/* Alert Banner for Errors or Success */}
      {state.message && (
        <div
          className={`flex items-center gap-2.5 rounded-2xl border p-4 text-xs font-semibold ${
            state.success
              ? "border-kita-green/30 bg-kita-green-soft text-kita-green"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      {/* 2. Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
        {/* Left Sticky Rail (5 Cols) — 4-Step Interactive Roadmap & Trust Cards */}
        <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-6">
          {/* Verification Stepper Card */}
          <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="eyebrow text-xs text-muted">Accreditation Roadmap</span>
              <span className="font-mono text-xs text-kita-green font-bold">
                Step {currentStep} of 4
              </span>
            </div>

            <div className="flex flex-col gap-2.5 text-xs">
              {/* Step 1: Academic Credentials */}
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className={`flex items-start gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  currentStep === 1
                    ? "bg-kita-green-soft/60 border border-kita-green/30"
                    : "hover:bg-paper"
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-mono font-bold text-xs shadow-xs flex-shrink-0 mt-0.5 ${
                    studentId && currentStep !== 1
                      ? "bg-kita-green text-white"
                      : currentStep === 1
                      ? "bg-kita-green text-white"
                      : "bg-paper border border-line text-muted"
                  }`}
                >
                  {studentId && currentStep !== 1 ? "✓" : "1"}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-ink text-sm">1. Academic Credentials</span>
                  <span className="text-muted text-xs leading-relaxed">
                    Learner Reference Number &amp; Strand
                  </span>
                </div>
              </button>

              {/* Step 2: Storefront Concept */}
              <button
                type="button"
                onClick={() => studentId && setCurrentStep(2)}
                disabled={!studentId}
                className={`flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                  currentStep === 2
                    ? "bg-kita-green-soft/60 border border-kita-green/30 cursor-pointer"
                    : studentId
                    ? "hover:bg-paper cursor-pointer"
                    : "opacity-40 cursor-not-allowed"
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-mono font-bold text-xs shadow-xs flex-shrink-0 mt-0.5 ${
                    storeProposal && currentStep !== 2
                      ? "bg-kita-green text-white"
                      : currentStep === 2
                      ? "bg-kita-green text-white"
                      : "bg-paper border border-line text-muted"
                  }`}
                >
                  {storeProposal && currentStep !== 2 ? "✓" : "2"}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-ink text-sm">2. Storefront Concept</span>
                  <span className="text-muted text-xs leading-relaxed">
                    Store name &amp; proposed goods
                  </span>
                </div>
              </button>

              {/* Step 3: Document Inspection */}
              <button
                type="button"
                onClick={() => studentId && setCurrentStep(3)}
                disabled={!studentId}
                className={`flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                  currentStep === 3
                    ? "bg-kita-green-soft/60 border border-kita-green/30 cursor-pointer"
                    : studentId
                    ? "hover:bg-paper cursor-pointer"
                    : "opacity-40 cursor-not-allowed"
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-mono font-bold text-xs shadow-xs flex-shrink-0 mt-0.5 ${
                    idImageUrl && currentStep !== 3
                      ? "bg-kita-green text-white"
                      : currentStep === 3
                      ? "bg-kita-green text-white"
                      : "bg-paper border border-line text-muted"
                  }`}
                >
                  {idImageUrl && currentStep !== 3 ? "✓" : "3"}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-ink text-sm">3. Document Scan</span>
                  <span className="text-muted text-xs leading-relaxed">
                    School ID image attachment
                  </span>
                </div>
              </button>

              {/* Step 4: Accreditation Fee Payment */}
              <button
                type="button"
                onClick={() => studentId && idImageUrl && setCurrentStep(4)}
                disabled={!studentId || !idImageUrl}
                className={`flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                  currentStep === 4
                    ? "bg-kita-green-soft/60 border border-kita-green/30 cursor-pointer"
                    : studentId && idImageUrl
                    ? "hover:bg-paper cursor-pointer"
                    : "opacity-40 cursor-not-allowed"
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-mono font-bold text-xs shadow-xs flex-shrink-0 mt-0.5 ${
                    currentStep === 4
                      ? "bg-kita-green text-white"
                      : "bg-paper border border-line text-muted"
                  }`}
                >
                  4
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-ink text-sm">4. Admin Accreditation Fee</span>
                  <span className="text-muted text-xs leading-relaxed">
                    ₱50.00 verification fee to school admin
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Fee & SLA Summary Card */}
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 text-ink font-bold text-sm">
                <Receipt className="h-4 w-4 text-kita-green" />
                <span>Accreditation Fee</span>
              </div>
              <span className="font-mono text-base font-bold text-kita-green">₱50.00</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              The one-time ₱50.00 accreditation fee covers campus administration verification, physical booth pass verification, and merchant registry listing for S.Y. 2025–2026.
            </p>

            <div className="flex flex-col gap-2 pt-2 border-t border-line text-xs">
              <div className="flex items-center gap-2 text-ink">
                <Check className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
                <span>Reviewed by School Admin within 24h</span>
              </div>
              <div className="flex items-center gap-2 text-ink">
                <Check className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
                <span>Official student seller certification</span>
              </div>
            </div>
          </div>

          {/* Privacy & Security Seal */}
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-4 text-xs text-muted">
            <Lock className="h-4 w-4 text-kita-green mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              Payment references and student records are encrypted and reviewed strictly by authorized LYFJSHS Treasury administrators.
            </p>
          </div>
        </aside>

        {/* Right Main Stream (7 Cols) — Single Form focusing on active step per number */}
        <main className="lg:col-span-7 flex flex-col gap-6">
          <form
            action={formAction}
            className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-xs"
          >
            {/* Hidden fields to preserve state across steps */}
            <input type="hidden" name="studentIdNumber" value={studentId} />
            <input type="hidden" name="program" value={strand} />
            <input type="hidden" name="yearLevel" value={yearLevel} />
            <input type="hidden" name="storeProposal" value={storeProposal} />
            <input type="hidden" name="idImageUrl" value={idImageUrl} />
            <input type="hidden" name="paymentMethod" value={paymentMethod} />
            <input type="hidden" name="paymentRefNumber" value={paymentRefNumber} />
            <input type="hidden" name="paymentReceiptUrl" value={paymentReceiptUrl} />

            {/* STEP 1: Academic Credentials */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div className="flex flex-col gap-1 pb-4 border-b border-line">
                  <div className="flex items-center gap-2 text-kita-green font-bold text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kita-green text-white font-mono text-xs font-bold">
                      1
                    </span>
                    <span>Step 1 of 4</span>
                  </div>
                  <h2 className="font-display text-xl font-extrabold text-ink">
                    Academic Enrollment Record
                  </h2>
                  <p className="text-xs text-muted">
                    Enter your official DepEd learner credentials for enrollment validation.
                  </p>
                </div>

                {step1Error && (
                  <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive font-semibold">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{step1Error}</span>
                  </div>
                )}

                {/* LRN & Year Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="step1-id" className="text-xs font-bold text-ink">
                      Learner Reference Number (LRN) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="step1-id"
                      value={studentId}
                      onChange={(e) => {
                        setStudentId(e.target.value);
                        if (step1Error) setStep1Error("");
                      }}
                      placeholder="e.g. 109482710294"
                      required
                      className="h-11 rounded-xl font-mono text-xs bg-paper border-line focus:bg-surface transition-colors"
                    />
                    {getFieldError("studentIdNumber") && (
                      <p className="text-xs text-destructive">
                        {getFieldError("studentIdNumber")}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="step1-year" className="text-xs font-bold text-ink">
                      Current Grade Level <span className="text-destructive">*</span>
                    </Label>
                    <select
                      id="step1-year"
                      value={yearLevel}
                      onChange={(e) => setYearLevel(e.target.value)}
                      className="h-11 w-full rounded-xl border border-line bg-paper px-3 py-2 text-xs text-ink focus:border-kita-green focus:bg-surface focus:outline-none transition-colors"
                    >
                      <option value="Grade 11">Grade 11 (Senior High)</option>
                      <option value="Grade 12">Grade 12 (Senior High)</option>
                      <option value="Faculty / Staff">Faculty / School Staff</option>
                    </select>
                  </div>
                </div>

                {/* Strand / Track */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="step1-strand" className="text-xs font-bold text-ink">
                    Senior High Strand / Track <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="step1-strand"
                    value={strand}
                    onChange={(e) => setStrand(e.target.value)}
                    className="h-11 w-full rounded-xl border border-line bg-paper px-3 py-2 text-xs text-ink focus:border-kita-green focus:bg-surface focus:outline-none transition-colors"
                  >
                    {STRANDS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 1 Actions */}
                <div className="flex items-center justify-end pt-4 border-t border-line">
                  <button
                    type="button"
                    onClick={handleProceedToStep2}
                    className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-6 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Continue to Step 2</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Storefront Concept */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div className="flex flex-col gap-1 pb-4 border-b border-line">
                  <div className="flex items-center gap-2 text-kita-green font-bold text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kita-green text-white font-mono text-xs font-bold">
                      2
                    </span>
                    <span>Step 2 of 4</span>
                  </div>
                  <h2 className="font-display text-xl font-extrabold text-ink">
                    Campus Storefront Concept
                  </h2>
                  <p className="text-xs text-muted">
                    Tell us about your proposed student store and the goods you plan to offer.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="step2-store" className="text-xs font-bold text-ink">
                    Proposed Store Name &amp; Merchandise
                  </Label>
                  <Input
                    id="step2-store"
                    value={storeProposal}
                    onChange={(e) => setStoreProposal(e.target.value)}
                    placeholder="e.g. Sweet Bites Pastries, Reviewer Notes, Crochet Crafts"
                    className="h-11 rounded-xl text-xs bg-paper border-line focus:bg-surface transition-colors"
                  />
                  <span className="text-xs text-muted">
                    Optional: You can customize your storefront cover photo, logo, and pickup schedules anytime after verification.
                  </span>
                </div>

                {/* Step 2 Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-paper px-4 py-2 text-xs font-bold text-ink hover:bg-paper-deep transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Step 1</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleProceedToStep3}
                    className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-6 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Continue to Step 3</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Document Inspection */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div className="flex flex-col gap-1 pb-4 border-b border-line">
                  <div className="flex items-center gap-2 text-kita-green font-bold text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kita-green text-white font-mono text-xs font-bold">
                      3
                    </span>
                    <span>Step 3 of 4</span>
                  </div>
                  <h2 className="font-display text-xl font-extrabold text-ink">
                    Official Document Inspection
                  </h2>
                  <p className="text-xs text-muted">
                    Attach a clear photo of your school credentials for campus admin verification.
                  </p>
                </div>

                {step3Error && (
                  <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive font-semibold">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{step3Error}</span>
                  </div>
                )}

                {/* Document Type Selector */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDocType("id")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      docType === "id"
                        ? "border-kita-green bg-kita-green-soft text-kita-green shadow-xs"
                        : "border-line bg-paper text-muted hover:text-ink hover:bg-paper-deep"
                    }`}
                  >
                    <IdCard className="h-4 w-4" />
                    <span>Student ID Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDocType("cor")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      docType === "cor"
                        ? "border-kita-green bg-kita-green-soft text-kita-green shadow-xs"
                        : "border-line bg-paper text-muted hover:text-ink hover:bg-paper-deep"
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Certificate of Registration</span>
                  </button>
                </div>

                {/* Photo URL Input */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="step3-image" className="text-xs font-bold text-ink">
                    {docType === "id" ? "Student ID Photo URL" : "COR Document URL"}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="step3-image"
                    value={idImageUrl}
                    onChange={(e) => {
                      setIdImageUrl(e.target.value);
                      if (step3Error) setStep3Error("");
                    }}
                    placeholder="https://..."
                    required
                    className="h-11 rounded-xl font-mono text-xs bg-paper border-line focus:bg-surface transition-colors"
                  />
                  {getFieldError("idImageUrl") && (
                    <p className="text-xs text-destructive">{getFieldError("idImageUrl")}</p>
                  )}
                </div>

                {/* Scanner Frame Preview */}
                <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-paper/60 p-6 transition-all">
                  {idImageUrl ? (
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-xl bg-surface shadow-xs border border-line">
                      <Image
                        src={idImageUrl}
                        alt="Student ID card preview"
                        fill
                        className="object-contain p-2"
                      />
                      {/* Scanner Corner Guides */}
                      <div className="absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-kita-green" />
                      <div className="absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 border-kita-green" />
                      <div className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-kita-green" />
                      <div className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-kita-green" />

                      <div className="absolute top-3 left-10 inline-flex items-center gap-1.5 rounded-lg bg-surface/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-ink border border-line shadow-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 text-kita-green" />
                        <span>Document Attached &amp; Legible</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-6 text-center max-w-sm">
                      <div className="h-12 w-12 rounded-full bg-surface border border-line flex items-center justify-center text-muted shadow-xs">
                        <IdCard className="h-6 w-6 text-kita-green" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-display text-sm font-bold text-ink">
                          Scan or Link Document
                        </p>
                        <p className="text-xs text-muted leading-relaxed">
                          Enter a direct link to a clear photo of your{" "}
                          {docType === "id" ? "Student ID" : "Certificate of Registration (COR)"}.
                          Ensure Full Name and LRN are visible.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 3 Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-paper px-4 py-2 text-xs font-bold text-ink hover:bg-paper-deep transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Step 2</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleProceedToStep4}
                    className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-6 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Proceed to Accreditation Fee</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Accreditation Fee Payment (Final Step) */}
            {currentStep === 4 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div className="flex flex-col gap-1 pb-4 border-b border-line">
                  <div className="flex items-center gap-2 text-kita-green font-bold text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kita-green text-white font-mono text-xs font-bold">
                      4
                    </span>
                    <span>Step 4 of 4 (Final Step)</span>
                  </div>
                  <h2 className="font-display text-xl font-extrabold text-ink">
                    School Admin Accreditation Fee
                  </h2>
                  <p className="text-xs text-muted">
                    Pay the ₱50.00 merchant accreditation fee to the School Treasury to finalize your verification.
                  </p>
                </div>

                {/* Payment Option Selector */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("gcash")}
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === "gcash"
                        ? "border-kita-green bg-kita-green-soft text-kita-green shadow-xs"
                        : "border-line bg-paper text-muted hover:text-ink hover:bg-paper-deep"
                    }`}
                  >
                    <Wallet className="h-4 w-4" />
                    <span>GCash Transfer (Recommended)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === "cash"
                        ? "border-kita-green bg-kita-green-soft text-kita-green shadow-xs"
                        : "border-line bg-paper text-muted hover:text-ink hover:bg-paper-deep"
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Cash at Treasury (Room 204)</span>
                  </button>
                </div>

                {/* GCash Payment Instruction Box */}
                {paymentMethod === "gcash" ? (
                  <div className="flex flex-col gap-4 rounded-2xl border border-kita-green/30 bg-kita-green-soft/40 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-ink font-bold text-xs">
                        <QrCode className="h-4 w-4 text-kita-green" />
                        <span>LYFJSHS Treasury GCash Account</span>
                      </div>
                      <span className="font-mono text-sm font-extrabold text-kita-green">₱50.00</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-kita-green/20 text-xs">
                      <div className="flex flex-col gap-0.5 bg-surface/80 p-3 rounded-xl border border-kita-green/20">
                        <span className="text-muted font-semibold">Account Name</span>
                        <span className="font-bold text-ink">LYFJSHS Treasury Office</span>
                      </div>
                      <div className="flex flex-col gap-0.5 bg-surface/80 p-3 rounded-xl border border-kita-green/20">
                        <span className="text-muted font-semibold">GCash Mobile Number</span>
                        <span className="font-mono font-bold text-kita-green text-sm">0917-829-4102</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted leading-relaxed">
                      Please send <strong>₱50.00</strong> to the GCash number above and input your 13-digit transaction reference number below.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 rounded-2xl border border-line bg-paper p-5 text-xs">
                    <div className="flex items-center gap-2 font-bold text-ink">
                      <Building2 className="h-4 w-4 text-kita-green" />
                      <span>Cash Payment Guidelines</span>
                    </div>
                    <p className="text-muted leading-relaxed">
                      Visit the <strong>LYFJSHS School Treasury (Room 204, 2nd Floor Admin Building)</strong> and pay the ₱50.00 Student Merchant Accreditation Fee during recess or lunch. You will receive an Official Receipt (OR) Number.
                    </p>
                  </div>
                )}

                {/* Reference Number Input */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="payment-ref" className="text-xs font-bold text-ink">
                    {paymentMethod === "gcash" ? "GCash Reference Number" : "Official Receipt (OR) Number"}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="payment-ref"
                    value={paymentRefNumber}
                    onChange={(e) => setPaymentRefNumber(e.target.value)}
                    placeholder={paymentMethod === "gcash" ? "e.g. 1029 4820 1928" : "e.g. OR-2026-8492"}
                    required
                    className="h-11 rounded-xl font-mono text-xs bg-paper border-line focus:bg-surface transition-colors"
                  />
                  <span className="text-xs text-muted">
                    This reference number will be verified by the school administrator before approving your account.
                  </span>
                </div>

                {/* Payment Receipt Image URL (Optional) */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="payment-proof" className="text-xs font-bold text-ink">
                    Payment Receipt Screenshot URL <span className="text-muted">(Optional)</span>
                  </Label>
                  <Input
                    id="payment-proof"
                    value={paymentReceiptUrl}
                    onChange={(e) => setPaymentReceiptUrl(e.target.value)}
                    placeholder="https://..."
                    className="h-11 rounded-xl font-mono text-xs bg-paper border-line focus:bg-surface transition-colors"
                  />
                </div>

                {/* DepEd Student Honor Pledge Checkbox */}
                <div className="flex flex-col gap-3 pt-3 border-t border-line">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={pledgeAccepted}
                      onChange={(e) => setPledgeAccepted(e.target.checked)}
                      required
                      className="h-4 w-4 mt-0.5 rounded border-line text-kita-green focus:ring-kita-green cursor-pointer"
                    />
                    <span className="text-xs text-muted leading-relaxed group-hover:text-ink transition-colors">
                      I certify under the <strong className="text-ink">DepEd Student Honor Code</strong>{" "}
                      that all submitted credentials and payment details are legitimate and correspond to my enrollment
                      at Luis Y. Ferrer Jr. Senior High School.
                    </span>
                  </label>
                </div>

                {/* Step 4 Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-paper px-4 py-2 text-xs font-bold text-ink hover:bg-paper-deep transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Step 3</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isPending || !pledgeAccepted || !paymentRefNumber.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-kita-green px-6 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isPending ? "Submitting Application…" : "Submit Verification & Payment for Review"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
