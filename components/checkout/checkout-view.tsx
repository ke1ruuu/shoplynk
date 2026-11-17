"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Store,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { WebsiteRatingDialog } from "@/components/ratings/website-rating-dialog";
import { Star } from "lucide-react";
import { placeOrderAction } from "@/app/actions/checkout";

const PESO = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CAMPUS_PICKUP_LOCATIONS = [
  {
    id: "school_ground",
    name: "School Ground",
    detail: "Main Campus Grounds / Quadrangle",
  },
  {
    id: "custom_location",
    name: "Custom / Preferred Location",
    detail: "Specify your own meeting spot",
  },
];

const BREAK_TIME_SLOTS = [
  {
    id: "m_recess_1",
    label: "1st Recess Morning Shift",
    time: "8:20 AM - 8:40 AM",
  },
  {
    id: "m_recess_2",
    label: "2nd Recess Morning Shift",
    time: "9:30 AM - 9:50 AM",
  },
  {
    id: "lunch_dismissal",
    label: "Lunch Break/Class Dismissal",
    time: "12:10 PM - 12:40 PM",
  },
  {
    id: "a_recess_1",
    label: "1st Recess Afternoon Shift",
    time: "3:00 PM - 3:20 PM",
  },
  {
    id: "a_recess_2",
    label: "2nd Recess Afternoon Shift",
    time: "4:10 PM - 4:30 PM",
  },
  {
    id: "custom_time",
    label: "Custom / Preferred Time",
    time: "Specify your own schedule",
  },
];

export function CheckoutView({ buyerName }: { buyerName: string }) {
  const router = useRouter();
  const { items, subtotal, clearCart, itemsByStore } = useCart();

  const [selectedLocation, setSelectedLocation] = useState(CAMPUS_PICKUP_LOCATIONS[0].name);
  const [customLocation, setCustomLocation] = useState("");

  const [selectedSlot, setSelectedSlot] = useState(BREAK_TIME_SLOTS[0].label);
  const [customTime, setCustomTime] = useState("");

  const paymentMethod = "CASH_ON_PICKUP" as const;
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string | null>(null);
  const [confirmedDetails, setConfirmedDetails] = useState<{
    location: string;
    schedule: string;
  } | null>(null);
  const [showRatingDialog, setShowRatingDialog] = useState(false);

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;

    const isCustomLocation = selectedLocation === "Custom / Preferred Location";

    if (isCustomLocation && !customLocation.trim()) {
      setErrorMsg("Please input your preferred pickup location.");
      return;
    }

    const isCustomTime = selectedSlot === "Custom / Preferred Time";

    if (isCustomTime && !customTime.trim()) {
      setErrorMsg("Please input your preferred pickup time.");
      return;
    }

    const finalLocation = isCustomLocation
      ? customLocation.trim()
      : customLocation.trim()
      ? `School Ground (${customLocation.trim()})`
      : "School Ground";

    const matchedSlot = BREAK_TIME_SLOTS.find((s) => s.label === selectedSlot);
    const finalTime = isCustomTime
      ? customTime.trim()
      : customTime.trim()
      ? `${selectedSlot} - ${customTime.trim()} (${matchedSlot?.time || ""})`
      : `${selectedSlot} (${matchedSlot?.time || ""})`;

    setIsSubmitting(true);
    setErrorMsg(null);

    const result = await placeOrderAction({
      items: items.map((i) => ({
        productId: i.productId,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        storeId: i.storeId,
      })),
      pickupLocation: `${finalLocation} • ${finalTime}`,
      preferredTime: finalTime,
      paymentMethod,
      referenceNumber: undefined,
      notes: notes.trim() || undefined,
    });

    setIsSubmitting(false);

    if (result.success && result.orderNumber) {
      clearCart();
      setConfirmedDetails({
        location: finalLocation,
        schedule: finalTime,
      });
      setConfirmedOrderNumber(result.orderNumber);

      // Track order count for buyer: pop up rating once when they have ordered 3 times
      if (typeof window !== "undefined") {
        try {
          const alreadyRated = localStorage.getItem("projectkita_buyer_rated") === "true";
          const prevCount = Number(localStorage.getItem("projectkita_buyer_order_count") || 0);
          const newCount = prevCount + 1;
          localStorage.setItem("projectkita_buyer_order_count", String(newCount));

          // Pop out rating once if they have ordered 3 times and have not answered yet
          if (!alreadyRated && newCount >= 3) {
            setTimeout(() => setShowRatingDialog(true), 700);
          }
        } catch (storageErr) {
          console.warn("Notice: buyer order counter error:", storageErr);
        }
      }
    } else {
      setErrorMsg(result.error || "Failed to place order. Please try again.");
    }
  }

  /* =========================================================================
     1. Order Confirmation Success Modal
     ========================================================================= */
  if (confirmedOrderNumber) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-surface p-8 sm:p-10 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-kita-green text-white shadow-flyer">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="eyebrow text-xs text-kita-green font-bold">Order Confirmed</span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
              Salamat, {buyerName.split(" ")[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
              Your order has been transmitted directly to the student seller. It will be prepped and ready at your selected campus pickup location.
            </p>
          </div>

          {/* Details Card */}
          <div className="w-full flex flex-col gap-3 rounded-2xl border border-line bg-paper p-5 text-left text-xs divide-y divide-line">
            <div className="flex items-center justify-between pb-2.5">
              <span className="text-muted">Order Number</span>
              <span className="font-mono font-bold text-ink text-sm">
                {confirmedOrderNumber}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-muted">Pickup Location</span>
              <span className="font-semibold text-ink text-right max-w-[200px] truncate">
                {confirmedDetails?.location || selectedLocation}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-muted">Schedule</span>
              <span className="font-semibold text-ink text-right max-w-[200px] truncate">
                {confirmedDetails?.schedule || selectedSlot}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2.5">
              <span className="text-muted">Payment</span>
              <span className="font-semibold text-ink">
                Cash on Pickup (COP)
              </span>
            </div>
          </div>

          {/* Quick Rate Website Prompt */}
          <div className="w-full flex items-center justify-between rounded-2xl border border-spark-deep/30 bg-spark-soft/40 px-4 py-3 text-xs text-spark-ink">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-spark fill-spark flex-shrink-0" />
              <span className="font-medium">How was your website checkout experience?</span>
            </div>
            <button
              type="button"
              onClick={() => setShowRatingDialog(true)}
              className="rounded-xl bg-surface px-3 py-1.5 text-xs font-bold text-ink border border-line shadow-xs hover:bg-paper transition-colors flex-shrink-0"
            >
              Rate Platform ⭐
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
            <Link
              href="/protected/orders"
              className="flex-1 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-kita-green px-5 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all"
            >
              <span>Track in My Orders</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/protected/marketplace"
              className="flex-1 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-5 text-xs font-bold text-ink hover:bg-paper transition-colors"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>

          <WebsiteRatingDialog
            open={showRatingDialog}
            onOpenChange={setShowRatingDialog}
            triggerSource="BUYER_PURCHASE"
            orderNumber={confirmedOrderNumber || undefined}
            userName={buyerName}
          />
        </div>
      </div>
    );
  }

  /* =========================================================================
     2. Empty Cart View
     ========================================================================= */
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-surface p-8 sm:p-10 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-paper border border-line text-muted">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-lg font-bold text-ink">
              Your cart is empty
            </h1>
            <p className="text-xs text-muted leading-relaxed">
              Add some break-time snacks, treats, or study notes before proceeding to checkout.
            </p>
          </div>
          <Link
            href="/protected/marketplace"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-kita-green px-5 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Browse Campus Marketplace</span>
          </Link>
        </div>
      </div>
    );
  }

  /* =========================================================================
     3. Active Checkout Form
     ========================================================================= */
  return (
    <form onSubmit={handlePlaceOrder} className="flex flex-col gap-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <Link
            href="/protected/marketplace"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:text-ink hover:bg-paper transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-extrabold text-ink">
              Checkout &amp; Pickup
            </h1>
            <span className="text-xs text-muted">Luis Y. Ferrer Jr. Senior High School</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted">
          <ShieldCheck className="h-4 w-4 text-kita-green" />
          <span className="font-semibold text-ink">Campus Handoff</span>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-semibold text-rose-800">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Fulfillment Details (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* 1. Pickup Location Section */}
          <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-kita-green" />
                <h2 className="font-display text-sm font-bold text-ink">
                  1. Select Campus Pickup Point
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-muted">
                Campus Handoff Spot
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {CAMPUS_PICKUP_LOCATIONS.map((loc) => {
                const isSelected = selectedLocation === loc.name;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc.name);
                      if (loc.id === "custom_location") {
                        const el = document.getElementById("custom-location-input");
                        el?.focus();
                      }
                    }}
                    className={`flex items-start justify-between p-3.5 rounded-xl border transition-all text-left ${
                      isSelected
                        ? "border-kita-green bg-kita-green-soft/40 ring-1 ring-kita-green"
                        : "border-line bg-paper/60 hover:bg-paper hover:border-line-strong"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-ink leading-tight">
                        {loc.name}
                      </span>
                      <span className="text-xs text-muted mt-1">
                        {loc.detail}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-kita-green text-white text-xs font-bold shadow-xs flex-shrink-0 ml-2">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom / Buyer's Preferred Location Input */}
            <div className="flex flex-col gap-1.5 pt-3 border-t border-line mt-1">
              <label htmlFor="custom-location-input" className="text-xs font-bold text-ink flex items-center justify-between">
                <span>
                  Buyer's Preferred Location / Spot{" "}
                  {selectedLocation === "Custom / Preferred Location" ? (
                    <span className="text-destructive">*</span>
                  ) : (
                    <span className="text-muted font-normal">(Optional spot or landmark)</span>
                  )}
                </span>
                {selectedLocation === "Custom / Preferred Location" && (
                  <span className="text-[11px] font-bold text-kita-green">Custom Location Active</span>
                )}
              </label>
              <Input
                id="custom-location-input"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder={
                  selectedLocation === "Custom / Preferred Location"
                    ? "Input your specific meeting spot (e.g. Building A Room 204, Beside Flagpole, Grandstand)..."
                    : "Optional: specify your preferred spot or landmark (e.g. Near Grandstand, Beside Flagpole, Bench 3)..."
                }
                className="h-10 text-xs rounded-xl bg-paper border-line focus:bg-surface transition-colors"
              />
              <span className="text-[11px] text-muted">
                {selectedLocation === "Custom / Preferred Location"
                  ? "Input your own designated pickup location anywhere on campus."
                  : "Specify your exact preferred spot on the School Ground or anywhere on campus where you'd like to meet the seller."}
              </span>
            </div>
          </section>

          {/* 2. Break-Time Schedule */}
          <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-kita-green" />
                <h2 className="font-display text-sm font-bold text-ink">
                  2. Break-Time Pickup Schedule
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-muted">
                Morning &amp; Afternoon Shifts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {BREAK_TIME_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.label;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.label)}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-kita-green bg-kita-green-soft/40 ring-1 ring-kita-green"
                        : "border-line bg-paper/60 hover:bg-paper hover:border-line-strong"
                    }`}
                  >
                    <span className="font-bold text-xs text-ink leading-tight">
                      {slot.label}
                    </span>
                    <span className="font-mono text-[11px] text-muted mt-1">
                      {slot.time}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom / Buyer's Preferred Time Input */}
            <div className="flex flex-col gap-1.5 pt-3 border-t border-line mt-1">
              <label htmlFor="custom-time-input" className="text-xs font-bold text-ink flex items-center justify-between">
                <span>
                  Buyer's Preferred Time{" "}
                  {selectedSlot === "Custom / Preferred Time" ? (
                    <span className="text-destructive">*</span>
                  ) : (
                    <span className="text-muted font-normal">(Optional exact time note)</span>
                  )}
                </span>
                {selectedSlot === "Custom / Preferred Time" && (
                  <span className="text-[11px] font-bold text-kita-green">Custom Time Active</span>
                )}
              </label>
              <Input
                id="custom-time-input"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                placeholder={
                  selectedSlot === "Custom / Preferred Time"
                    ? "Input your own preferred pickup time (e.g. 10:15 AM, 1:30 PM vacant period, after 5 PM)..."
                    : "e.g. 8:30 AM sharp, during first 5 minutes of recess..."
                }
                className="h-10 text-xs rounded-xl bg-paper border-line focus:bg-surface transition-colors"
              />
              <span className="text-[11px] text-muted">
                {selectedSlot === "Custom / Preferred Time"
                  ? "The student seller will prepare and deliver your items at your requested preferred time."
                  : "Coordinate an exact handoff minute or custom schedule with the student seller."}
              </span>
            </div>
          </section>

          {/* 3. Payment Method */}
          <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Banknote className="h-4 w-4 text-kita-green" />
                <h2 className="font-display text-sm font-bold text-ink">
                  3. Payment Method
                </h2>
              </div>
              <span className="rounded-full bg-kita-green-soft px-2.5 py-0.5 text-[11px] font-bold text-kita-green">
                Cash on Pickup
              </span>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl border border-kita-green bg-kita-green-soft/30 ring-1 ring-kita-green">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-kita-green text-white flex-shrink-0 mt-0.5">
                <Banknote className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-ink">Cash on Pickup (COP)</span>
                  <span className="rounded-md bg-kita-green/10 text-kita-green font-bold text-[10px] px-1.5 py-0.5">
                    Standard Method
                  </span>
                </div>
                <span className="text-xs text-muted leading-relaxed mt-1">
                  Pay exact change directly to the seller during break handoff.
                </span>
              </div>
            </div>
          </section>

          {/* 4. Notes / Instructions */}
          <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="font-display text-sm font-bold text-ink">
                4. Notes for Seller (Optional)
              </span>
              <span className="text-xs text-muted">Special instructions</span>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Grade 12 STEM A, please add extra chili flakes, thank you!"
              rows={3}
              className="w-full rounded-xl border border-line bg-paper p-3 text-xs text-ink placeholder:text-muted/60 focus:border-kita-green focus:bg-surface focus:outline-none transition-colors resize-none"
            />
          </section>
        </div>

        {/* Right Column: Order Summary & Placement (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-6">
          <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-3.5">
              <h2 className="font-display text-base font-bold text-ink">
                Order Summary
              </h2>
              <span className="font-mono text-xs font-bold text-muted bg-paper px-2 py-0.5 rounded-md border border-line">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Item List Grouped by Store */}
            <div className="flex flex-col divide-y divide-line max-h-72 overflow-y-auto scrollbar-none space-y-3">
              {Object.entries(itemsByStore).map(([storeId, group]) => (
                <div key={storeId} className="flex flex-col gap-2 pt-3 first:pt-0">
                  <div className="flex items-center gap-1.5 text-xs text-muted font-bold truncate">
                    <Store className="h-3.5 w-3.5 text-kita-green" />
                    <span>{group.storeName}</span>
                  </div>

                  {group.items.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between gap-3 text-xs py-1">
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="relative h-10 w-10 rounded-md overflow-hidden bg-paper border border-line flex-shrink-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="font-semibold text-ink truncate leading-tight">
                            {item.title}
                          </span>
                          <span className="text-xs text-muted">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono font-bold text-ink">
                        {PESO(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="flex flex-col gap-2 border-t border-line pt-4 text-xs divide-y divide-line">
              <div className="flex items-center justify-between pb-2">
                <span className="text-muted">Item Subtotal</span>
                <span className="font-mono font-bold text-ink">{PESO(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted">Campus Handoff Fee</span>
                <span className="font-mono font-bold text-kita-green">FREE (₱0.00)</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-sm text-ink">Total Payment</span>
                <span className="font-mono text-xl font-bold text-kita-green">
                  {PESO(subtotal)}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-kita-green px-5 text-sm font-bold text-white shadow-flyer hover:bg-kita-green-deep transition-all disabled:opacity-50 active:scale-98 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Transmitting Order...</span>
              ) : (
                <>
                  <span>Place Campus Order</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-muted text-center leading-tight pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-kita-green flex-shrink-0" />
              <span>Campus verified · Orders track live in your Home Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
