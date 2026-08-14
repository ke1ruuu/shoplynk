"use client";

import React from "react";
import { ShoppingBag, Store, Check } from "lucide-react";

export type AccountType = "buyer" | "seller";

interface Option {
  value: AccountType;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  blurb: string;
}

const OPTIONS: Option[] = [
  {
    value: "buyer",
    icon: ShoppingBag,
    title: "I'm here to buy",
    blurb: "Discover products from people in your school.",
  },
  {
    value: "seller",
    icon: Store,
    title: "I want to sell",
    blurb: "Turn your skills and products into kita.",
  },
];

interface AccountTypeToggleProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
  name?: string;
}

/**
 * Buyer / Seller account picker — the defining choice on signup.
 * Native radios keep it keyboard- and screen-reader-friendly (arrow keys
 * move between options); the labels carry the flyer-card styling.
 */
export function AccountTypeToggle({
  value,
  onChange,
  name = "accountType",
}: AccountTypeToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="What brings you to Project Kita?"
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      {OPTIONS.map(({ value: v, icon: Icon, title, blurb }) => {
        const selected = value === v;
        return (
          <label
            key={v}
            className={`group relative flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all shadow-flyer has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-kita-green ${
              selected
                ? "border-kita-green bg-kita-green-soft"
                : "border-line bg-surface hover:border-kita-green/40 hover:-translate-y-0.5"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={v}
              checked={selected}
              onChange={() => onChange(v)}
              className="sr-only"
            />

            {/* Selected pushpin — tacked to the board */}
            {selected && (
              <span
                className="absolute -top-1.5 right-4 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-kita-green text-white shadow-flyer"
                aria-hidden="true"
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
            )}

            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                selected
                  ? "bg-kita-green text-white"
                  : "bg-paper-deep text-muted group-hover:text-kita-green"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>

            <span className="flex flex-col gap-0.5">
              <span className="font-display font-bold text-[15px] text-ink leading-tight">
                {title}
              </span>
              <span className="text-xs text-muted leading-snug">{blurb}</span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
