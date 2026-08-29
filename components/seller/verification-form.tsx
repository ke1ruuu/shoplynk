"use client";

import React, { useActionState, useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  BadgeCheck,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  Store,
  UploadCloud,
  IdCard,
  Layers,
  ArrowRight,
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
    label: "LYFJSHS Senior High ID (Grade 12)",
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    idNum: "2024-10824-GT",
    strand: "STEM",
  },
  {
    label: "Student ID Card Sample (ABM)",
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    idNum: "2024-09412-GT",
    strand: "ABM",
  },
  {
    label: "Campus Student ID Sample (TVL-ICT)",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    idNum: "2024-11582-GT",
    strand: "TVL - ICT",
  },
];

const STRANDS = [
  "STEM (Science, Tech, Engineering, Math)",
  "ABM (Accountancy, Business & Management)",
  "HUMSS (Humanities & Social Sciences)",
  "TVL - ICT (Information & Comm Technology)",
  "TVL - Home Economics (Food & Culinary)",
  "GAS (General Academic Strand)",
  "Arts & Design Track",
  "Faculty / Staff Enterprise",
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
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-10 shadow-flyer">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#D92323 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 flex flex-col items-start gap-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-kita-green-soft px-3 py-1 text-xs font-bold text-kita-green">
            <ShieldCheck className="h-4 w-4" />
            Campus Seller Onboarding
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
            Apply for Student Seller Verification
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
            Project Kita is a private campus marketplace for verified students and faculty of{" "}
            <span className="font-semibold text-ink">Luis Y. Ferrer Jr. Senior High School</span>.
            Submit your student credentials below to unlock your Seller Studio.
          </p>
        </div>
      </header>

      {/* Alert Messages */}
      {state.message && (
        <div
          className={`flex items-center gap-2.5 rounded-2xl border p-4 text-sm font-medium ${
            state.success
              ? "border-kita-green/30 bg-kita-green-soft text-kita-green"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      {/* Verification Form Card */}
      <form
        action={formAction}
        className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-10 shadow-flyer"
      >
        <div className="flex flex-col gap-1 pb-4 border-b border-line">
          <h2 className="font-display text-xl font-extrabold text-ink">
            Student Identification
          </h2>
          <p className="text-xs text-muted">
            These details will be reviewed by the Campus Administrator to verify your enrollment.
          </p>
        </div>

        {/* Applicant Read-Only Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-paper/60 p-4 border border-line">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted">Applicant Name</span>
            <span className="font-display font-bold text-sm text-ink">
              {userFullName || "Student Member"}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted">Registered Email</span>
            <span className="font-mono text-xs text-ink truncate">{userEmail}</span>
          </div>
        </div>

        {/* Student ID Number & Grade Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="verif-id" className="flex items-center gap-1.5">
              <IdCard className="h-4 w-4 text-kita-green" />
              <span>Student ID / LRN Number</span>
            </Label>
            <Input
              id="verif-id"
              name="studentIdNumber"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. 2024-10294-GT"
              required
              className="h-11 rounded-xl font-mono text-sm"
            />
            {getFieldError("studentIdNumber") && (
              <p className="text-xs text-destructive">
                {getFieldError("studentIdNumber")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="verif-year" className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-kita-green" />
              <span>Year / Grade Level</span>
            </Label>
            <select
              id="verif-year"
              name="yearLevel"
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value)}
              className="h-11 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-kita-green focus:outline-none"
            >
              <option value="Grade 11">Grade 11 (Senior High)</option>
              <option value="Grade 12">Grade 12 (Senior High)</option>
              <option value="Faculty / Staff">Faculty / School Staff</option>
            </select>
          </div>
        </div>

        {/* Academic Strand / Track */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="verif-strand" className="flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-kita-green" />
            <span>Academic Strand / Track</span>
          </Label>
          <select
            id="verif-strand"
            name="program"
            value={strand}
            onChange={(e) => setStrand(e.target.value)}
            className="h-11 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-kita-green focus:outline-none"
          >
            {STRANDS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Store Proposal / Intent */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="verif-store" className="flex items-center gap-1.5">
            <Store className="h-4 w-4 text-kita-green" />
            <span>Proposed Store Name / What do you plan to sell?</span>
          </Label>
          <Input
            id="verif-store"
            name="storeProposal"
            value={storeProposal}
            onChange={(e) => setStoreProposal(e.target.value)}
            placeholder="e.g. Sweet Bites Pastries, Handmade Resin Keychains, Reviewer Notes"
            className="h-11 rounded-xl text-sm"
          />
        </div>

        {/* School ID Card Photo Upload / Preset */}
        <div className="flex flex-col gap-3 pt-2">
          <Label htmlFor="verif-image" className="flex items-center gap-1.5">
            <UploadCloud className="h-4 w-4 text-kita-green" />
            <span>School ID Photo URL</span>
          </Label>

          <Input
            id="verif-image"
            name="idImageUrl"
            value={idImageUrl}
            onChange={(e) => setIdImageUrl(e.target.value)}
            placeholder="https://..."
            required
            className="h-11 rounded-xl font-mono text-xs"
          />
          {getFieldError("idImageUrl") && (
            <p className="text-xs text-destructive">{getFieldError("idImageUrl")}</p>
          )}

          {/* Preset Sample ID Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="eyebrow text-[0.65rem] text-muted">
              Quick demo: Select sample school ID photo
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SAMPLE_ID_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`flex items-center gap-2.5 rounded-2xl border p-2.5 text-left transition-all ${
                    idImageUrl === preset.url
                      ? "border-kita-green bg-kita-green-soft ring-1 ring-kita-green"
                      : "border-line bg-surface hover:bg-paper"
                  }`}
                >
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={preset.url}
                      alt={preset.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-bold text-ink truncate">
                      {preset.label}
                    </span>
                    <span className="text-[10px] text-muted">{preset.idNum}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Live Preview Box */}
          {idImageUrl && (
            <div className="relative mt-2 h-44 w-full overflow-hidden rounded-2xl border border-line bg-paper-deep shadow-inner">
              <Image
                src={idImageUrl}
                alt="School ID preview"
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                <BadgeCheck className="h-3.5 w-3.5 text-spark" />
                <span>Student ID Preview</span>
              </div>
            </div>
          )}
        </div>

        {/* Submit Action */}
        <div className="flex items-center justify-between pt-6 border-t border-line mt-2">
          <p className="text-xs text-muted max-w-sm">
            By submitting, you certify that you are an enrolled student or faculty of LYFJSHS.
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-2xl bg-kita-green px-7 py-3 text-sm font-bold text-white shadow-flyer transition-all hover:bg-kita-green-deep active:scale-95 disabled:opacity-50"
          >
            <span>{isPending ? "Submitting Application…" : "Submit for Verification"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
