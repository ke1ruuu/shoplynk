"use client";

import React, { useState, useTransition, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Store,
  MapPin,
  Clock,
  CreditCard,
  Eye,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  Power,
  ArrowLeft,
  UploadCloud,
  Camera,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { updateStoreAction, ActionState } from "@/app/actions/seller";

export interface StoreData {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
  description: string | null;
  pickup_locations: string | null;
  operating_hours: string | null;
  gcash_name: string | null;
  gcash_number: string | null;
  is_active: boolean;
  rating_avg: number;
  rating_count: number;
  updated_at?: string | null;
}

interface StoreSettingsViewProps {
  store: StoreData;
}

export function StoreSettingsView({ store }: StoreSettingsViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"general" | "pickup" | "payouts" | "visibility">("general");
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copiedSlug, setCopiedSlug] = useState(false);

  // Form states
  const [name, setName] = useState(store.name || "");
  const [description, setDescription] = useState(store.description || "");
  const [pickupLocations, setPickupLocations] = useState(store.pickup_locations || "");
  const [operatingHours, setOperatingHours] = useState(store.operating_hours || "");
  const [gcashName, setGcashName] = useState(store.gcash_name || "");
  const [gcashNumber, setGcashNumber] = useState(store.gcash_number || "");
  const [isActive, setIsActive] = useState<boolean>(store.is_active ?? true);
  const [logoUrl, setLogoUrl] = useState<string>(store.logo_url || "");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const storefrontUrl = `/protected/marketplace`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file (PNG, JPG, JPEG, WEBP).");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError("Image is too large. Maximum file size is 8MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogoUrl(reader.result);
        setUploadError(null);
      }
    };
    reader.onerror = () => {
      setUploadError("Failed to read image file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoUrl("");
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/seller");
    }
  }

  function copyStoreLink() {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}/protected/marketplace`;
      navigator.clipboard.writeText(fullUrl);
      setCopiedSlug(true);
      setTimeout(() => setCopiedSlug(false), 2000);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("pickupLocations", pickupLocations);
    formData.append("operatingHours", operatingHours);
    formData.append("gcashName", gcashName);
    formData.append("gcashNumber", gcashNumber);
    formData.append("isActive", isActive ? "true" : "false");
    formData.append("logoUrl", logoUrl);

    startTransition(async () => {
      const res = await updateStoreAction({}, formData);
      if (res.success) {
        setStatusMessage({ type: "success", text: res.message || "Store settings updated successfully." });
      } else {
        setStatusMessage({ type: "error", text: res.message || "Failed to update store settings." });
      }
    });
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 transition-all duration-300">
      {/* Header Banner */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-6 mb-8">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-kita-green transition-colors w-fit group cursor-pointer focus:outline-none"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back</span>
          </button>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Storefront Settings
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Configure your student brand profile, handoff spots, and payment methods.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={copyStoreLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-line bg-surface hover:bg-paper-deep text-ink text-xs font-semibold transition-colors"
          >
            {copiedSlug ? (
              <>
                <Check className="h-3.5 w-3.5 text-kita-green" />
                <span>Copied Link</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-muted" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <Link
            href="/seller"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-line hover:border-kita-green/40 text-ink text-xs font-semibold transition-colors"
          >
            <Store className="h-3.5 w-3.5 text-muted" />
            <span>Catalog</span>
          </Link>
        </div>
      </header>

      {/* Feedback Alert */}
      {statusMessage && (
        <div
          className={`mb-8 p-4 rounded-xl border flex items-center justify-between gap-3 text-sm font-medium ${
            statusMessage.type === "success"
              ? "bg-kita-green-soft border-kita-green/30 text-kita-green"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-xs underline hover:no-underline font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2-Column Settings Topology */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Sticky Navigation Rail */}
        <aside className="lg:col-span-4 lg:sticky lg:top-6 flex flex-col gap-1">
          <span className="eyebrow px-3 pb-2 text-xs text-muted">Settings Navigation</span>

          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
              activeTab === "general"
                ? "bg-surface border border-line text-ink font-bold shadow-xs"
                : "text-muted hover:text-ink hover:bg-surface/50"
            }`}
          >
            <Store className={`h-4 w-4 ${activeTab === "general" ? "text-kita-green" : "text-muted"}`} />
            <span>Store Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pickup")}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
              activeTab === "pickup"
                ? "bg-surface border border-line text-ink font-bold shadow-xs"
                : "text-muted hover:text-ink hover:bg-surface/50"
            }`}
          >
            <MapPin className={`h-4 w-4 ${activeTab === "pickup" ? "text-kita-green" : "text-muted"}`} />
            <span>Pickup & Breaks</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("payouts")}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
              activeTab === "payouts"
                ? "bg-surface border border-line text-ink font-bold shadow-xs"
                : "text-muted hover:text-ink hover:bg-surface/50"
            }`}
          >
            <CreditCard className={`h-4 w-4 ${activeTab === "payouts" ? "text-kita-green" : "text-muted"}`} />
            <span>GCash Payouts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("visibility")}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
              activeTab === "visibility"
                ? "bg-surface border border-line text-ink font-bold shadow-xs"
                : "text-muted hover:text-ink hover:bg-surface/50"
            }`}
          >
            <Eye className={`h-4 w-4 ${activeTab === "visibility" ? "text-kita-green" : "text-muted"}`} />
            <span>Store Status</span>
          </button>

          {/* Quick Info Box */}
          <div className="mt-8 pt-6 border-t border-line flex flex-col gap-3 px-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-ink">
              <ShieldCheck className="h-4 w-4 text-kita-green" />
              <span>Verified Campus Seller</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Store changes are immediately reflected across the campus marketplace and student checkout queues.
            </p>
          </div>
        </aside>

        {/* Right Line-Ruled Settings Stream */}
        <main className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="flex flex-col divide-y divide-line">
            {/* Section 1: Store Profile */}
            {(activeTab === "general") && (
              <section id="store-profile" className="py-6 first:pt-0 flex flex-col gap-6">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">Store Profile</h2>
                  <p className="text-xs text-muted mt-0.5">
                    How your campus business appears to students and faculty.
                  </p>
                </div>

                {/* Profile Picture / Store Logo */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pb-6 border-b border-line">
                  <div className="md:col-span-4 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-ink">Profile Picture</span>
                    <span className="text-xs text-muted">Your store avatar and seller brand icon.</span>
                  </div>

                  <div className="md:col-span-8 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    {/* Avatar Display */}
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 rounded-2xl overflow-hidden bg-paper border-2 border-line shadow-xs group">
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={name || "Store profile photo"}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex flex-col items-center justify-center bg-kita-green-soft text-kita-green">
                          <Store className="h-10 w-10" />
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-ink/60 backdrop-blur-xs flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-semibold gap-1"
                      >
                        <Camera className="h-5 w-5" />
                        <span>Change</span>
                      </button>
                    </div>

                    {/* Actions and Guidelines */}
                    <div className="flex-1 flex flex-col gap-2.5 items-center sm:items-start text-center sm:text-left">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        className="hidden"
                        onChange={handleFileChange}
                      />

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-line hover:border-kita-green hover:bg-paper-deep text-xs font-bold text-ink shadow-xs transition-all cursor-pointer"
                        >
                          <UploadCloud className="h-4 w-4 text-kita-green" />
                          <span>{logoUrl ? "Upload New Photo" : "Upload Profile Picture"}</span>
                        </button>

                        {logoUrl && (
                          <button
                            type="button"
                            onClick={handleRemoveLogo}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 text-xs font-bold text-destructive transition-all cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-muted leading-relaxed">
                        Recommended: Square photo (at least 400×400px), PNG, JPG, or WEBP. Max 8MB.
                      </p>

                      {uploadError && (
                        <p className="text-xs font-semibold text-destructive">{uploadError}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <label htmlFor="store-name" className="md:col-span-4 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-ink">Store Name</span>
                    <span className="text-xs text-muted">Your public student brand name.</span>
                  </label>
                  <div className="md:col-span-8 flex flex-col gap-1.5">
                    <input
                      id="store-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jameson's Fresh Bakes"
                      className="w-full px-3.5 py-2 rounded-lg border border-line bg-surface text-ink text-sm focus:outline-none focus:border-kita-green focus:ring-1 focus:ring-kita-green transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <label htmlFor="store-slug" className="md:col-span-4 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-ink">Store Identifier</span>
                    <span className="text-xs text-muted">Unique database slug.</span>
                  </label>
                  <div className="md:col-span-8 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <input
                        id="store-slug"
                        type="text"
                        disabled
                        value={store.slug}
                        className="w-full font-mono text-xs px-3.5 py-2 rounded-lg border border-line bg-paper-deep text-muted cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <label htmlFor="store-description" className="md:col-span-4 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-ink">About / Bio</span>
                    <span className="text-xs text-muted">Brief description of what you sell.</span>
                  </label>
                  <div className="md:col-span-8 flex flex-col gap-1.5">
                    <textarea
                      id="store-description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. Freshly baked artisan pastries and cookies made daily for LYFJSHS students."
                      className="w-full px-3.5 py-2 rounded-lg border border-line bg-surface text-ink text-sm focus:outline-none focus:border-kita-green focus:ring-1 focus:ring-kita-green transition-all"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Section 2: Pickup & Breaks */}
            {(activeTab === "pickup") && (
              <section id="pickup-schedule" className="py-6 first:pt-0 flex flex-col gap-6">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">Pickup & Campus Schedule</h2>
                  <p className="text-xs text-muted mt-0.5">
                    Designated physical meetup locations and active operating hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <label htmlFor="pickup-locations" className="md:col-span-4 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-ink">Pickup Locations</span>
                    <span className="text-xs text-muted">Where buyers can claim their orders.</span>
                  </label>
                  <div className="md:col-span-8 flex flex-col gap-1.5">
                    <input
                      id="pickup-locations"
                      type="text"
                      value={pickupLocations}
                      onChange={(e) => setPickupLocations(e.target.value)}
                      placeholder="e.g. Main Canteen Handoff Table 3 / Building A 2nd Floor Hallway"
                      className="w-full px-3.5 py-2 rounded-lg border border-line bg-surface text-ink text-sm focus:outline-none focus:border-kita-green focus:ring-1 focus:ring-kita-green transition-all"
                    />
                    <span className="text-xs text-muted">
                      Separate multiple spots with a slash (/).
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <label htmlFor="operating-hours" className="md:col-span-4 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-ink">Operating Schedule</span>
                    <span className="text-xs text-muted">When you are available for handoffs.</span>
                  </label>
                  <div className="md:col-span-8 flex flex-col gap-1.5">
                    <input
                      id="operating-hours"
                      type="text"
                      value={operatingHours}
                      onChange={(e) => setOperatingHours(e.target.value)}
                      placeholder="e.g. Recess (9:45 AM - 10:15 AM) & Lunch (11:45 AM - 12:45 PM)"
                      className="w-full px-3.5 py-2 rounded-lg border border-line bg-surface text-ink text-sm focus:outline-none focus:border-kita-green focus:ring-1 focus:ring-kita-green transition-all"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Section 3: GCash & Payments */}
            {(activeTab === "payouts") && (
              <section id="gcash-payments" className="py-6 first:pt-0 flex flex-col gap-6">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">GCash & Student Payments</h2>
                  <p className="text-xs text-muted mt-0.5">
                    Information displayed to buyers when paying via GCash pre-order.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <label htmlFor="gcash-name" className="md:col-span-4 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-ink">GCash Account Name</span>
                    <span className="text-xs text-muted">Full name as registered in GCash.</span>
                  </label>
                  <div className="md:col-span-8 flex flex-col gap-1.5">
                    <input
                      id="gcash-name"
                      type="text"
                      value={gcashName}
                      onChange={(e) => setGcashName(e.target.value)}
                      placeholder="e.g. Jameson G."
                      className="w-full px-3.5 py-2 rounded-lg border border-line bg-surface text-ink text-sm focus:outline-none focus:border-kita-green focus:ring-1 focus:ring-kita-green transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <label htmlFor="gcash-number" className="md:col-span-4 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-ink">GCash Mobile Number</span>
                    <span className="text-xs text-muted">11-digit Philippine mobile number.</span>
                  </label>
                  <div className="md:col-span-8 flex flex-col gap-1.5">
                    <input
                      id="gcash-number"
                      type="text"
                      value={gcashNumber}
                      onChange={(e) => setGcashNumber(e.target.value)}
                      placeholder="e.g. 0917 123 4567"
                      className="w-full font-mono text-sm px-3.5 py-2 rounded-lg border border-line bg-surface text-ink focus:outline-none focus:border-kita-green focus:ring-1 focus:ring-kita-green transition-all"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Section 4: Store Status & Visibility */}
            {(activeTab === "visibility") && (
              <section id="store-visibility" className="py-6 first:pt-0 flex flex-col gap-6">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">Storefront Status</h2>
                  <p className="text-xs text-muted mt-0.5">
                    Toggle whether your storefront accepts new student orders.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-ink">Accepting Orders</span>
                    <span className="text-xs text-muted">
                      {isActive
                        ? "Store is open and products are visible to campus buyers."
                        : "Store is currently paused. No new pre-orders will be accepted."}
                    </span>
                  </div>
                  <div className="md:col-span-8 flex items-center gap-3">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isActive}
                      onClick={() => setIsActive(!isActive)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isActive ? "bg-kita-green" : "bg-line-strong"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isActive ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="text-xs font-semibold text-ink">
                      {isActive ? "Open for Pre-orders" : "Temporarily Closed / Break"}
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* Sticky Save Bar Footer */}
            <div className="pt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted font-mono">
                {store.updated_at && (
                  <span>
                    Last updated: {new Date(store.updated_at).toLocaleDateString()}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-kita-green hover:bg-kita-green-deep text-white font-semibold text-sm shadow-flyer transition-all disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
