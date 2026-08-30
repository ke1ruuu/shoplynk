"use client";

import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  MessageSquare,
  Handshake,
  PackageCheck,
  ShoppingBag,
  Store,
  PlusCircle,
  TrendingUp,
} from "lucide-react";

const BUYER_STEPS = [
  {
    step: 1,
    title: "Discover",
    description: "Browse products and services from verified student and faculty sellers.",
    icon: Search,
  },
  {
    step: 2,
    title: "Find what you like",
    description: "View details, check the seller's profile, and see ratings and reviews.",
    icon: ShoppingCart,
  },
  {
    step: 3,
    title: "Contact the seller",
    description: "Message the seller to ask questions or confirm availability.",
    icon: MessageSquare,
  },
  {
    step: 4,
    title: "Agree & meet",
    description: "Agree on the details, payment method, and meet-up or delivery.",
    icon: Handshake,
  },
  {
    step: 5,
    title: "Complete the deal",
    description: "Receive your item or service and mark the transaction as done.",
    icon: PackageCheck,
  },
];

const SELLER_STEPS = [
  {
    step: 1,
    title: "Set up storefront",
    description: "Create your profile and show your student or faculty verification.",
    icon: Store,
  },
  {
    step: 2,
    title: "List your items",
    description: "Post products or services with photos, pricing, and descriptions.",
    icon: PlusCircle,
  },
  {
    step: 3,
    title: "Receive inquiries",
    description: "Get direct messages and inquiries from buyers on campus.",
    icon: MessageSquare,
  },
  {
    step: 4,
    title: "Agree & deliver",
    description: "Arrange easy campus meet-ups and handle payment details securely.",
    icon: Handshake,
  },
  {
    step: 5,
    title: "Earn & grow",
    description: "Collect reviews, track your sales, and grow your student business.",
    icon: TrendingUp,
  },
];

export function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<"buyers" | "sellers">("buyers");
  const currentSteps = activeTab === "buyers" ? BUYER_STEPS : SELLER_STEPS;

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-surface border-y border-line scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <span className="eyebrow text-kita-green">How it works</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink max-w-2xl">
            Five steps, start to finish
          </h2>
          <p className="text-base text-muted max-w-xl">
            Whether you&apos;re buying or selling, the whole thing happens right here on campus.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1 bg-paper rounded-full border border-line" role="tablist" aria-label="Choose buyer or seller flow">
            {([
              { id: "buyers", label: "For buyers", icon: ShoppingBag },
              { id: "sellers", label: "For sellers", icon: Store },
            ] as const).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`howitworks-tab-${id}`}
                aria-selected={activeTab === id}
                aria-controls="howitworks-panel"
                onClick={() => setActiveTab(id)}
                className={`inline-flex items-center gap-2 px-6 h-11 rounded-full font-semibold text-sm transition-all ${
                  activeTab === id
                    ? "bg-kita-green text-white shadow-flyer"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Steps flow */}
        <div
          id="howitworks-panel"
          role="tabpanel"
          aria-labelledby={`howitworks-tab-${activeTab}`}
          className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-4"
        >
          {/* Dashed connector (the "string" between pins) */}
          <div
            className="hidden md:block absolute top-8 left-[10%] right-[10%] border-t-2 border-dashed border-kita-green/25"
            aria-hidden="true"
          />

          {currentSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-surface border border-line shadow-flyer flex items-center justify-center text-kita-green transition-all group-hover:-translate-y-1 group-hover:border-kita-green/40">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-spark text-ink tabular text-xs font-bold flex items-center justify-center shadow-flyer">
                    {String(step.step).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-ink mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-[210px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
