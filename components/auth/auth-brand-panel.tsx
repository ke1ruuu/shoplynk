import React from "react";
import { ShieldCheck, ShoppingBag, Store } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { VerificationBadge } from "@/components/common/verification-badge";

const VALUE_PROPS = [
  {
    icon: ShieldCheck,
    text: "A verified campus community — LYFJSHS students & faculty only.",
  },
  {
    icon: ShoppingBag,
    text: "Discover products and services from people you actually know.",
  },
  {
    icon: Store,
    text: "Sell your skills, track your sales, and grow your kita.",
  },
];

/**
 * Left-hand brand aside for the auth split-screen. Solid kita-green with the
 * bulletin-board dotted texture and a pinned seller testimonial — the same
 * motifs used across the marketing site. Hidden below lg.
 */
export function AuthBrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-kita-green lg:flex lg:flex-col lg:justify-between lg:p-12">
      {/* Dotted corkboard texture + soft spark glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-spark/25 blur-[90px]" />
        <div className="absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-kita-green-deep/60 blur-[90px]" />
      </div>

      <div className="relative z-10">
        <Logo size="md" tone="dark" />
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="eyebrow text-spark">Exclusively for LYFJSHS</span>
          <h2 className="max-w-md font-display text-4xl font-extrabold leading-[1.05] text-white">
            Your campus. Your hustle.{" "}
            <span className="text-spark">Your kita.</span>
          </h2>
        </div>

        <ul className="flex max-w-md flex-col gap-4">
          {VALUE_PROPS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 text-spark">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[15px] leading-snug text-white/85">
                {text}
              </span>
            </li>
          ))}
        </ul>

        {/* Pinned testimonial flyer */}
        <div className="relative -rotate-1 max-w-sm rounded-2xl border border-line bg-surface p-5 shadow-flyer-lg">
          <span className="pin left-8 -top-1.5" aria-hidden="true" />
          <p className="text-[15px] leading-relaxed text-ink">
            &ldquo;I sold out my first batch of cookies in one lunch break. LYNK made it feel real.&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-kita-green-soft font-display font-extrabold text-kita-green">
              MS
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-ink">Maria Santos</span>
              <VerificationBadge type="Student" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <span className="eyebrow text-[0.6rem] text-white/50">
          Built by students, for students
        </span>
      </div>
    </aside>
  );
}
