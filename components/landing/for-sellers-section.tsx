import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, TrendingUp } from "lucide-react";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Verified sellers",
    body: "Your student or faculty badge builds instant trust.",
  },
  {
    icon: Users,
    title: "A built-in market",
    body: "Reach the whole campus — buyers you already know.",
  },
  {
    icon: TrendingUp,
    title: "Grow your kita",
    body: "Track sales, collect reviews, and level up.",
  },
];

export function ForSellersSection() {
  return (
    <section
      id="for-sellers"
      className="py-16 md:py-24 bg-paper overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="eyebrow text-kita-green">For sellers</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink leading-[1.05]">
              Turn your ideas into <span className="marker">kita.</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed max-w-xl">
              Project Kita gives you everything you need to reach your school
              community and turn a side hustle into real income.
            </p>

            <div>
              <Link
                href="/signup?type=seller"
                className="group bg-kita-green hover:bg-kita-green-deep text-white font-semibold text-base h-13 px-7 rounded-xl shadow-flyer hover:shadow-flyer-lg transition-all inline-flex items-center justify-center gap-2 w-fit"
              >
                Start selling
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-6">
              {BENEFITS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-kita-green-soft flex items-center justify-center text-kita-green">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-ink">{title}</h3>
                  <p className="text-xs text-muted leading-snug">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — pinned photo + earnings card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rotate-1">
              <span className="pin left-1/2 -translate-x-1/2 -top-2 z-20 scale-125" aria-hidden="true" />
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-line shadow-flyer-lg bg-surface">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80"
                  alt="Student seller running their small business"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Earnings dashboard */}
            <div className="absolute -bottom-6 -left-2 sm:left-4 -rotate-2 bg-surface p-4 rounded-2xl border border-line shadow-flyer-lg w-60 sm:w-64">
              <span className="pin -top-1.5 right-4" style={{ "--pin-color": "#0C6B4E" } as React.CSSProperties} aria-hidden="true" />
              <div className="flex items-center justify-between">
                <div>
                  <span className="eyebrow text-muted text-[0.6rem]">Total kita</span>
                  <div className="tabular text-2xl font-bold text-ink mt-1">₱8,250</div>
                </div>
                <span className="inline-flex items-center gap-1 tabular text-xs font-bold text-kita-green bg-kita-green-soft px-2 py-1 rounded-full">
                  ↑ 24%
                </span>
              </div>

              <div className="my-3 h-10 w-full flex items-end">
                <svg className="w-full h-full text-spark" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    d="M0 25 C 20 22, 35 28, 50 15 C 65 2, 80 18, 100 5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="pt-2 border-t border-dashed border-line grid grid-cols-2 gap-2 text-center">
                <div>
                  <span className="text-[11px] text-muted">Orders</span>
                  <div className="tabular text-base font-bold text-ink">36</div>
                </div>
                <div>
                  <span className="text-[11px] text-muted">Listings</span>
                  <div className="tabular text-base font-bold text-ink">12</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
