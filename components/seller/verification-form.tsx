"use client";

import React, { useState, useActionState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  UploadCloud,
  IdCard,
  GraduationCap,
  Store,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  submitSellerVerificationAction,
  VerificationActionState,
} from "@/app/actions/verification";

const SAMPLE_ID_PRESETS = [
  {
    label: "STEM Student ID",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    idNum: "2024-10821-STEM",
    strand: "STEM",
  },
  {
    label: "ABM Student ID",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    idNum: "2024-09432-ABM",
    strand: "ABM",
  },
  {
    label: "HUMSS Student ID",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    idNum: "2024-11005-HUMSS",
    strand: "HUMSS",
  },
];

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
  const [studentId, setStudentId] = useState(SAMPLE_ID_PRESETS[0].idNum);
  const [strand, setStrand] = useState(STRANDS[0]);
  const [yearLevel, setYearLevel] = useState("Grade 12");
  const [idImageUrl, setIdImageUrl] = useState(SAMPLE_ID_PRESETS[0].url);
  const [storeProposal, setStoreProposal] = useState("");

  const [state, formAction, isPending] = useActionState<
    VerificationActionState,
    FormData
  >(submitSellerVerificationAction, {});

  const getFieldError = (field: string) => state.errors?.[field]?.[0];

  function applyPreset(preset: (typeof SAMPLE_ID_PRESETS)[0]) {
    setIdImageUrl(preset.url);
    setStudentId(preset.idNum);
    const matchedStrand = STRANDS.find((s) => s.includes(preset.strand)) || STRANDS[0];
    setStrand(matchedStrand);
  }

  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 transition-all duration-300">
      {/* 1. Flatline Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-kita-green">
            <ShieldCheck className="h-4 w-4" />
            <span className="eyebrow">Student Verification</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            Apply for Campus Seller Account
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
            LYNK is a private campus marketplace for verified students and faculty of{" "}
            <span className="font-semibold text-ink">Luis Y. Ferrer Jr. Senior High School</span>.
            Submit your student credentials below to unlock your Seller Studio.
          </p>
        </div>
      </div>

      {/* Alert Messages */}
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

      {/* 2. Flatline 2-Column Asymmetrical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sticky Rail (4 Cols) — Onboarding Context & Guidelines */}
        <aside className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-6">
          <div className="flex flex-col gap-3 border border-line bg-surface p-5 rounded-2xl">
            <span className="eyebrow text-xs text-muted">LYFJSHS Requirements</span>
            <h3 className="font-display text-base font-bold text-ink">
              Verified Student Commerce
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Project Kita protects campus trust by ensuring every seller is an actively enrolled student or faculty member of Luis Y. Ferrer Jr. Senior High School.
            </p>

            <div className="flex flex-col gap-2 border-t border-line pt-3 text-xs">
              <div className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 text-kita-green mt-0.5 flex-shrink-0" />
                <span className="text-ink">Unlock your personalized campus storefront</span>
              </div>
              <div className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 text-kita-green mt-0.5 flex-shrink-0" />
                <span className="text-ink">Accept campus pre-orders and instant pickup</span>
              </div>
              <div className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 text-kita-green mt-0.5 flex-shrink-0" />
                <span className="text-ink">Track earnings with digital inventory ledger</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 border border-line bg-paper/50 p-4 rounded-2xl text-xs text-muted">
            <span className="font-bold text-ink">Applicant Details</span>
            <div className="flex flex-col gap-1 font-mono text-xs">
              <span>{userFullName || "Student Member"}</span>
              <span className="text-muted">{userEmail}</span>
            </div>
          </div>
        </aside>

        {/* Right Main Stream (8 Cols) — Line-Ruled Application Form */}
        <main className="lg:col-span-8 flex flex-col gap-4 min-w-0">
          <form
            action={formAction}
            className="flex flex-col gap-6 border border-line bg-surface p-6 sm:p-8 rounded-2xl"
          >
            <div className="flex flex-col gap-1 pb-4 border-b border-line">
              <h2 className="font-display text-lg font-bold text-ink">
                Student Identification Form
              </h2>
              <p className="text-xs text-muted">
                Fill in your student record. Applications are reviewed by Campus Administration.
              </p>
            </div>

            {/* Student ID & Grade Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="verif-id" className="text-xs font-bold text-ink">
                  Student LRN / ID Number
                </Label>
                <Input
                  id="verif-id"
                  name="studentIdNumber"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 2024-10294-GT"
                  required
                  className="h-10 rounded-xl font-mono text-xs bg-paper border-line"
                />
                {getFieldError("studentIdNumber") && (
                  <p className="text-xs text-destructive">
                    {getFieldError("studentIdNumber")}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="verif-year" className="text-xs font-bold text-ink">
                  Year / Grade Level
                </Label>
                <select
                  id="verif-year"
                  name="yearLevel"
                  value={yearLevel}
                  onChange={(e) => setYearLevel(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-paper px-3 py-2 text-xs text-ink focus:border-kita-green focus:bg-surface focus:outline-none"
                >
                  <option value="Grade 11">Grade 11 (Senior High)</option>
                  <option value="Grade 12">Grade 12 (Senior High)</option>
                  <option value="Faculty / Staff">Faculty / School Staff</option>
                </select>
              </div>
            </div>

            {/* Academic Strand */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="verif-strand" className="text-xs font-bold text-ink">
                Academic Strand / Track
              </Label>
              <select
                id="verif-strand"
                name="program"
                value={strand}
                onChange={(e) => setStrand(e.target.value)}
                className="h-10 w-full rounded-xl border border-line bg-paper px-3 py-2 text-xs text-ink focus:border-kita-green focus:bg-surface focus:outline-none"
              >
                {STRANDS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Store Proposal */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="verif-store" className="text-xs font-bold text-ink">
                Proposed Storefront Name & Goods
              </Label>
              <Input
                id="verif-store"
                name="storeProposal"
                value={storeProposal}
                onChange={(e) => setStoreProposal(e.target.value)}
                placeholder="e.g. Sweet Bites Pastries, Reviewer Notes, Handmade Crochets"
                className="h-10 rounded-xl text-xs bg-paper border-line"
              />
            </div>

            {/* Photo URL & Sample ID Presets */}
            <div className="flex flex-col gap-3 pt-2 border-t border-line">
              <Label htmlFor="verif-image" className="text-xs font-bold text-ink">
                School ID Photo URL
              </Label>
              <Input
                id="verif-image"
                name="idImageUrl"
                value={idImageUrl}
                onChange={(e) => setIdImageUrl(e.target.value)}
                placeholder="https://..."
                required
                className="h-10 rounded-xl font-mono text-xs bg-paper border-line"
              />
              {getFieldError("idImageUrl") && (
                <p className="text-xs text-destructive">{getFieldError("idImageUrl")}</p>
              )}

              {/* Presets */}
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow text-xs text-muted">
                  Demo presets: click to test with sample ID
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SAMPLE_ID_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`flex items-center gap-2 rounded-xl border p-2 text-left transition-all ${
                        idImageUrl === preset.url
                          ? "border-kita-green bg-kita-green-soft font-bold text-kita-green"
                          : "border-line bg-paper text-muted hover:text-ink hover:bg-paper-deep"
                      }`}
                    >
                      <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={preset.url}
                          alt={preset.label}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="text-xs truncate">{preset.label}</span>
                        <span className="text-xs opacity-75">{preset.idNum}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Preview */}
              {idImageUrl && (
                <div className="relative mt-2 h-44 w-full overflow-hidden rounded-xl border border-line bg-paper-deep">
                  <Image
                    src={idImageUrl}
                    alt="School ID preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                    <BadgeCheck className="h-3 w-3 text-spark" />
                    <span>ID Preview</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-line">
              <p className="text-xs text-muted max-w-sm">
                By submitting, you certify that you are an enrolled student or faculty of LYFJSHS.
              </p>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-kita-green px-6 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep active:scale-95 transition-all disabled:opacity-50"
              >
                <span>{isPending ? "Submitting Application…" : "Submit Application"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
