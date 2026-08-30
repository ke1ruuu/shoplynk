"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  CreditCard,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Store,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { placeOrderAction } from "@/app/actions/checkout";

const PESO = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CAMPUS_PICKUP_LOCATIONS = [
  {
    id: "main_canteen",
    name: "Main Canteen Handoff Area",
    detail: "Near Table 4 / Snack Booths",
  },
  {
    id: "bldg_a",
    name: "Building A (Senior High Hallway)",
    detail: "2nd Floor Main Staircase Landing",
  },
  {
    id: "bldg_b",
    name: "Building B (Room 204)",
    detail: "Tech-Voc & ABM Corridor",
  },
  {
    id: "student_lounge",
    name: "Student Council Lounge",
    detail: "Ground Floor Activity Hall",
  },
];

const BREAK_TIME_SLOTS = [
  { id: "recess", label: "Recess Break", time: "9:45 AM – 10:15 AM" },
  { id: "lunch", label: "Lunch Break", time: "11:45 AM – 12:45 PM" },
  { id: "dismissal", label: "Dismissal / After Class", time: "4:30 PM – 5:15 PM" },
];

export function CheckoutView({ buyerName }: { buyerName: string }) {
  const router = useRouter();
  const { items, subtotal, clearCart, itemsByStore } = useCart();

  const [selectedLocation, setSelectedLocation] = useState(CAMPUS_PICKUP_LOCATIONS[0].name);
  const [selectedSlot, setSelectedSlot] = useState(BREAK_TIME_SLOTS[0].label);
  const [paymentMethod, setPaymentMethod] = useState<"CASH_ON_PICKUP" | "GCASH">("CASH_ON_PICKUP");
  const [gcashRef, setGcashRef] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string | null>(null);

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;

    if (paymentMethod === "GCASH" && !gcashRef.trim()) {
      setErrorMsg("Please enter your 13-digit GCash Reference Number.");
      return;
    }

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
      pickupLocation: `${selectedLocation} (${selectedSlot})`,
      preferredTime: selectedSlot,
      paymentMethod,
      referenceNumber: paymentMethod === "GCASH" ? gcashRef.trim() : undefined,
      notes: notes.trim() || undefined,
    });

    setIsSubmitting(false);

    if (result.success && result.orderNumber) {
      clearCart();
      setConfirmedOrderNumber(result.orderNumber);
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
                {selectedLocation}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-muted">Schedule</span>
              <span className="font-semibold text-ink">{selectedSlot}</span>
            </div>
            <div className="flex items-center justify-between pt-2.5">
              <span className="text-muted">Payment</span>
              <span className="font-semibold text-ink">
                {paymentMethod === "CASH_ON_PICKUP" ? "Cash on Pickup" : `GCash (${gcashRef})`}
              </span>
            </div>
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
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <MapPin className="h-4 w-4 text-kita-green" />
              <h2 className="font-display text-sm font-bold text-ink">
                1. Select Campus Pickup Point
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {CAMPUS_PICKUP_LOCATIONS.map((loc) => {
                const isSelected = selectedLocation === loc.name;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocation(loc.name)}
                    className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? "border-kita-green bg-kita-green-soft/40 ring-1 ring-kita-green"
                        : "border-line bg-paper/60 hover:bg-paper hover:border-line-strong"
                    }`}
                  >
                    <span className="font-bold text-xs text-ink leading-tight">
                      {loc.name}
                    </span>
                    <span className="text-xs text-muted mt-1">
                      {loc.detail}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Break-Time Schedule */}
          <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Clock className="h-4 w-4 text-kita-green" />
              <h2 className="font-display text-sm font-bold text-ink">
                2. Break-Time Pickup Schedule
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {BREAK_TIME_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.label;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.label)}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "border-kita-green bg-kita-green-soft/40 ring-1 ring-kita-green"
                        : "border-line bg-paper/60 hover:bg-paper hover:border-line-strong"
                    }`}
                  >
                    <span className="font-bold text-xs text-ink leading-tight">
                      {slot.label}
                    </span>
                    <span className="font-mono text-xs text-muted mt-1">
                      {slot.time}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 3. Payment Method */}
          <section className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <CreditCard className="h-4 w-4 text-kita-green" />
              <h2 className="font-display text-sm font-bold text-ink">
                3. Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("CASH_ON_PICKUP")}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all text-left ${
                  paymentMethod === "CASH_ON_PICKUP"
                    ? "border-kita-green bg-kita-green-soft/40 ring-1 ring-kita-green"
                    : "border-line bg-paper/60 hover:bg-paper"
                }`}
              >
                <Banknote className="h-4 w-4 text-kita-green mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-bold text-xs text-ink">Cash on Pickup (COP)</span>
                  <span className="text-xs text-muted leading-relaxed mt-0.5">
                    Pay exact change directly to the seller during break handoff.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("GCASH")}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all text-left ${
                  paymentMethod === "GCASH"
                    ? "border-kita-green bg-kita-green-soft/40 ring-1 ring-kita-green"
                    : "border-line bg-paper/60 hover:bg-paper"
                }`}
              >
                <CreditCard className="h-4 w-4 text-kita-green mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-bold text-xs text-ink">GCash Pre-Payment</span>
                  <span className="text-xs text-muted leading-relaxed mt-0.5">
                    Send payment via GCash and enter your reference number.
                  </span>
                </div>
              </button>
            </div>

            {/* GCash Details Input if selected */}
            {paymentMethod === "GCASH" && (
              <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper p-4 text-xs animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-line pb-2">
                  <span className="font-bold text-ink">Student Seller GCash Account</span>
                  <span className="font-mono text-kita-green font-bold">0917-882-9411</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="gcash-ref" className="font-bold text-ink text-xs">
                    GCash Reference Number (13 digits) *
                  </label>
                  <input
                    id="gcash-ref"
                    type="text"
                    required
                    value={gcashRef}
                    onChange={(e) => setGcashRef(e.target.value)}
                    placeholder="e.g. 1009847192834"
                    className="h-10 w-full rounded-lg border border-line bg-surface px-3 font-mono text-xs font-semibold text-ink placeholder:text-muted/60 focus:border-kita-green focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}
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
