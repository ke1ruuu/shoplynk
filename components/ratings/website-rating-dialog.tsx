"use client";

import React, { useState } from "react";
import {
  Star,
  Sparkles,
  Coins,
  CheckCircle2,
  MessageSquare,
  ThumbsUp,
  Loader2,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { submitPlatformRatingAction } from "@/app/actions/ratings";

interface WebsiteRatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerSource: "BUYER_PURCHASE" | "SELLER_INCOME";
  orderNumber?: string;
  userName?: string;
  userRole?: "BUYER" | "SELLER";
  onSuccess?: () => void;
}

const EVALUATION_CRITERIA = [
  "1. User Friendliness",
  "2. Structure",
  "3. Product and Services Satisfaction",
  "4. Transaction and Payment",
  "5. Security and Privacy",
];

const RATING_LABELS: Record<number, { label: string; note: string; tone: string }> = {
  5: { label: "Exceptional!", note: "Smooth, delightful experience", tone: "text-amber-500" },
  4: { label: "Very Good!", note: "Easy to use and fast", tone: "text-kita-green" },
  3: { label: "Average", note: "Worked well, could improve", tone: "text-muted" },
  2: { label: "Could Be Better", note: "Encountered some friction", tone: "text-amber-600" },
  1: { label: "Needs Work", note: "Frustrating experience", tone: "text-rose-600" },
};

export function WebsiteRatingDialog({
  open,
  onOpenChange,
  triggerSource,
  orderNumber,
  userName,
  userRole = triggerSource === "SELLER_INCOME" ? "SELLER" : "BUYER",
  onSuccess,
}: WebsiteRatingDialogProps) {
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [criteriaError, setCriteriaError] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!open) return null;

  const isSeller = triggerSource === "SELLER_INCOME";
  const tagsList = EVALUATION_CRITERIA;
  const currentRating = hoverRating || selectedRating;
  const ratingInfo = RATING_LABELS[currentRating] || RATING_LABELS[5];

  function toggleTag(tag: string) {
    setCriteriaError(false);
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedRating < 1) return;

    // Enforce that "What went well?" (at least 1 evaluation criterion) is selected
    if (selectedTags.length === 0) {
      setCriteriaError(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitPlatformRatingAction({
        rating: selectedRating,
        feedback: feedback.trim() || undefined,
        category: isSeller ? "Seller Earnings & Studio" : "Buyer Checkout & Marketplace",
        tags: selectedTags,
        triggerSource,
        orderNumber,
        userName,
        userRole,
      });

      if (res.success) {
        setIsSuccess(true);
        // Persistently record that the user has completed answering the rating
        if (typeof window !== "undefined") {
          try {
            if (isSeller) {
              localStorage.setItem("projectkita_seller_rated", "true");
            } else {
              localStorage.setItem("projectkita_buyer_rated", "true");
            }
            localStorage.setItem("projectkita_has_rated_platform", "true");
          } catch (storageErr) {
            console.warn("Notice: LocalStorage write error:", storageErr);
          }
        }
        if (onSuccess) onSuccess();
        setTimeout(() => {
          setIsSuccess(false);
          onOpenChange(false);
        }, 2200);
      }
    } catch (err) {
      console.error("Failed to submit rating:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rating-dialog-title"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-7 shadow-2xl transition-all duration-200 animate-in zoom-in-95">
        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-kita-green text-white shadow-flyer animate-in zoom-in">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="flex flex-col gap-1.5 max-w-sm">
              <span className="eyebrow text-xs text-kita-green font-bold">Feedback Received</span>
              <h3 className="font-display text-2xl font-extrabold text-ink">
                Maraming Salamat!
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Your rating helps our student engineers and school administrators continuously refine and improve Project Kita.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-spark-ink bg-spark-soft/60 px-3 py-1 rounded-full border border-spark-deep/20 mt-1">
              <Heart className="h-3.5 w-3.5 fill-current text-kita-green" />
              <span>Built by students, for students</span>
            </div>
          </div>
        ) : (
          /* RATING FORM */
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Header / Context Badge */}
            <div className="flex items-start gap-3.5">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl flex-shrink-0 ${
                  isSeller
                    ? "bg-amber-500/15 text-amber-600 border border-amber-500/30"
                    : "bg-kita-green-soft text-kita-green border border-kita-green/20"
                }`}
              >
                {isSeller ? <Coins className="h-6 w-6" /> : <ShoppingBag className="h-6 w-6" />}
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="eyebrow text-xs text-muted">
                    {isSeller ? "Income Verified" : "Order Completed"}
                  </span>
                  {orderNumber && (
                    <span className="font-mono text-xs font-bold text-ink bg-paper px-2 py-0.5 rounded-md border border-line">
                      #{orderNumber}
                    </span>
                  )}
                </div>
                <h2
                  id="rating-dialog-title"
                  className="font-display text-xl sm:text-2xl font-extrabold text-ink leading-tight"
                >
                  {isSeller ? "How was your selling experience?" : "How was your website experience?"}
                </h2>
                <p className="text-xs text-muted leading-relaxed">
                  {isSeller
                    ? "You successfully earned income from this order! Rate how smooth our platform worked for you."
                    : "Your campus order has been placed! Rate how smooth our website checkout worked for you."}
                </p>
              </div>
            </div>

            {/* Star Rating Strip */}
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-paper/60 p-4 border border-line">
              <div className="flex items-center gap-2 sm:gap-3" onMouseLeave={() => setHoverRating(null)}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= currentRating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      className="group relative p-1 transition-transform hover:scale-120 active:scale-95 focus-visible:outline-none"
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={`h-8 w-8 sm:h-9 sm:w-9 transition-colors ${
                          isFilled
                            ? "fill-amber-400 text-amber-400 drop-shadow-xs"
                            : "fill-transparent text-line-strong hover:text-amber-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Dynamic feedback label */}
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-bold ${ratingInfo.tone}`}>
                  {ratingInfo.label}
                </span>
                <span className="text-muted">·</span>
                <span className="text-muted">{ratingInfo.note}</span>
              </div>
            </div>

            {/* 5 Evaluation Criteria Tags (Required) */}
            <div
              className={`flex flex-col gap-2 rounded-2xl p-2.5 border transition-all ${
                criteriaError && selectedTags.length === 0
                  ? "border-kita-green bg-kita-green-soft/30 ring-1 ring-kita-green"
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-between">
                <label className="eyebrow text-xs text-muted flex items-center gap-1.5">
                  <span>What went well?</span>
                  <span className="text-kita-green font-bold text-[0.6875rem]">* Required</span>
                </label>
                {criteriaError && selectedTags.length === 0 && (
                  <span className="text-xs text-kita-green font-bold animate-pulse">
                    Please select at least 1
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {EVALUATION_CRITERIA.map((criterion) => {
                  const isSelected = selectedTags.includes(criterion);
                  return (
                    <button
                      key={criterion}
                      type="button"
                      onClick={() => toggleTag(criterion)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-kita-green text-white shadow-xs scale-102"
                          : "bg-surface border border-line text-ink hover:bg-paper"
                      }`}
                    >
                      <span>{criterion}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Thoughts / Feedback Textarea */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="feedback-comment"
                className="eyebrow text-xs text-muted flex items-center justify-between"
              >
                <span>Suggestions or Comments (Optional)</span>
                <span className="text-muted/70 text-xs">Student Voice</span>
              </label>
              <textarea
                id="feedback-comment"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                placeholder={
                  isSeller
                    ? "Tell us how we can improve our user friendliness, structure, transactions, or security..."
                    : "Tell us what you liked or how we can improve our user friendliness, structure, products, payment, or security..."
                }
                className="w-full rounded-2xl border border-line bg-surface p-3 text-xs text-ink placeholder:text-muted/60 focus:border-kita-green focus:outline-none focus:ring-1 focus:ring-kita-green resize-none"
              />
            </div>

            {/* Action Button (Required Submission) */}
            <div className="flex flex-col gap-2 pt-2 border-t border-line">
              {criteriaError && selectedTags.length === 0 && (
                <p className="text-center text-xs font-semibold text-kita-green bg-kita-green-soft py-1.5 px-3 rounded-lg border border-kita-green/20">
                  ⚠️ Please select at least one evaluation dimension under &ldquo;What went well?&rdquo; to submit.
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting || selectedRating === 0}
                className="w-full flex h-11 items-center justify-center gap-2 rounded-xl bg-kita-green px-5 text-sm font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting Your Rating...</span>
                  </>
                ) : (
                  <>
                    <ThumbsUp className="h-4 w-4" />
                    <span>Submit Rating</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

