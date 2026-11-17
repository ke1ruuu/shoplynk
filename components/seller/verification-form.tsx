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
  Lock,
  FileText,
  Check,
  Building2,
  UploadCloud,
  Camera,
  Trash2,
  ImagePlus,
  RefreshCw,
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
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [studentId, setStudentId] = useState("");
  const [strand, setStrand] = useState(STRANDS[0]);
  const [yearLevel, setYearLevel] = useState("Grade 12");
  const [docType, setDocType] = useState<"id" | "cor">("id");
  const [idImageUrl, setIdImageUrl] = useState("");
  const [storeProposal, setStoreProposal] = useState("");
  const [pledgeAccepted, setPledgeAccepted] = useState(false);
  const [step1Error, setStep1Error] = useState("");
  const [step3Error, setStep3Error] = useState("");

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [state, formAction, isPending] = useActionState<
    VerificationActionState,
    FormData
  >(submitSellerVerificationAction, {});

  const getFieldError = (field: string) => state.errors?.[field]?.[0];

  const handleFileProcess = (file: File) => {
    setStep3Error("");
    if (!file.type.startsWith("image/")) {
      setStep3Error("Please upload a valid image file (PNG, JPG, JPEG, WEBP).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setStep3Error("The image is too large. Maximum file size is 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setIdImageUrl(reader.result);
        setFileName(file.name);
        setFileSize(
          file.size < 1024 * 1024
            ? `${(file.size / 1024).toFixed(1)} KB`
            : `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        );
        setStep3Error("");
      }
    };
    reader.onerror = () => {
      setStep3Error("Failed to read image file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleRemovePhoto = () => {
    setIdImageUrl("");
    setFileName("");
    setFileSize("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
          <span>LYFJSHS Student Merchant Program</span>
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
          Student Merchant Verification
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          Complete the 3-step verification process to verify your enrollment at{" "}
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
        {/* Left Sticky Rail (5 Cols) — 3-Step Interactive Roadmap & Trust Cards */}
        <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-6">
          {/* Verification Stepper Card */}
          <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="eyebrow text-xs text-muted">Verification Roadmap</span>
              <span className="font-mono text-xs text-kita-green font-bold">
                Step {currentStep} of 3
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
            </div>
          </div>

          {/* Verification & SLA Summary Card */}
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 text-ink font-bold text-sm">
                <ShieldCheck className="h-4 w-4 text-kita-green" />
                <span>Campus Verification</span>
              </div>
              <span className="font-mono text-xs font-bold text-kita-green bg-kita-green-soft px-2.5 py-1 rounded-full">
                100% Free
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Student seller verification is completely free. Applications are reviewed by school administrators to ensure a safe, legitimate campus marketplace for all students.
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
              <div className="flex items-center gap-2 text-ink">
                <Check className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
                <span>Zero accreditation or registration fees</span>
              </div>
            </div>
          </div>

          {/* Privacy & Security Seal */}
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-4 text-xs text-muted">
            <Lock className="h-4 w-4 text-kita-green mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              Student records and ID photos are encrypted and reviewed strictly by authorized LYFJSHS administrators.
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

            {/* STEP 1: Academic Credentials */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div className="flex flex-col gap-1 pb-4 border-b border-line">
                  <div className="flex items-center gap-2 text-kita-green font-bold text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kita-green text-white font-mono text-xs font-bold">
                      1
                    </span>
                    <span>Step 1 of 3</span>
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
                    <span>Step 2 of 3</span>
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
                    <span>Step 3 of 3 (Final Step)</span>
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

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Upload or Preview Display */}
                {idImageUrl ? (
                  <div className="flex flex-col gap-3">
                    {/* Scanner Frame Preview */}
                    <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl bg-surface shadow-xs border-2 border-line">
                      <Image
                        src={idImageUrl}
                        alt="Student credential preview"
                        fill
                        unoptimized
                        className="object-contain p-3"
                      />
                      {/* Scanner Corner Guides */}
                      <div className="absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-kita-green" />
                      <div className="absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 border-kita-green" />
                      <div className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-kita-green" />
                      <div className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-kita-green" />

                      <div className="absolute top-3 left-10 inline-flex items-center gap-1.5 rounded-lg bg-surface/95 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-ink border border-line shadow-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 text-kita-green" />
                        <span>Document Photo Attached &amp; Ready</span>
                      </div>
                    </div>

                    {/* File Information & Action Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl border border-line bg-paper text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-8 w-8 rounded-lg bg-surface border border-line flex items-center justify-center text-kita-green flex-shrink-0">
                          <IdCard className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-ink truncate max-w-[220px] sm:max-w-xs">
                            {fileName || (docType === "id" ? "Student_ID_Photo.jpg" : "COR_Document.jpg")}
                          </span>
                          {fileSize && <span className="text-[11px] text-muted">{fileSize}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-surface hover:bg-paper-deep text-ink font-semibold text-xs transition-colors cursor-pointer"
                        >
                          <RefreshCw className="h-3.5 w-3.5 text-muted" />
                          <span>Change Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 text-destructive font-semibold text-xs transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Drag & Drop Upload Zone */
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                    }}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-10 transition-all cursor-pointer group ${
                      isDragging
                        ? "border-kita-green bg-kita-green-soft/70 scale-[1.01]"
                        : "border-line bg-paper/60 hover:bg-paper hover:border-line-strong"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3.5 text-center max-w-md">
                      <div className="h-14 w-14 rounded-2xl bg-surface border border-line flex items-center justify-center text-kita-green shadow-xs group-hover:scale-105 group-hover:border-kita-green/30 transition-all">
                        <UploadCloud className="h-7 w-7 text-kita-green" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-display text-base font-bold text-ink">
                          Upload {docType === "id" ? "Student ID Photo" : "Certificate of Registration"}
                        </p>
                        <p className="text-xs text-muted leading-relaxed">
                          Drag and drop your document photo here, or click to browse from your device.
                        </p>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                          className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-kita-green-deep transition-colors cursor-pointer"
                        >
                          <Camera className="h-3.5 w-3.5" />
                          <span>Choose Photo</span>
                        </button>
                        <span className="text-[11px] text-muted">
                          Supports PNG, JPG, JPEG, WEBP (Up to 10MB)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

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
                      that all submitted credentials and document scans are legitimate and correspond to my active enrollment
                      at Luis Y. Ferrer Jr. Senior High School.
                    </span>
                  </label>
                </div>

                {/* Step 3 Actions (Final Step) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-paper px-4 py-2 text-xs font-bold text-ink hover:bg-paper-deep transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Step 2</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isPending || !idImageUrl.trim() || !pledgeAccepted}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-kita-green px-6 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isPending ? "Submitting Application…" : "Submit Verification Application"}</span>
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
