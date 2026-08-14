import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-12 md:py-20 bg-paper">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-kita-green rounded-3xl px-7 py-12 sm:px-12 sm:py-14 shadow-flyer-lg">
          {/* Ambient spark glow + dotted texture */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="absolute -top-16 -right-10 w-72 h-72 bg-spark/30 rounded-full blur-[90px]" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-xl">
              <span className="eyebrow text-spark-soft">Your turn</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-extrabold text-white leading-[1.05]">
                Ready to start your kita?
              </h2>
              <p className="text-base sm:text-lg text-white/80">
                Join the students and faculty already buying, selling, and backing
                each other on campus.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0">
              <Link
                href="/signup"
                className="group bg-spark hover:bg-spark-deep text-ink font-bold text-base h-13 px-7 rounded-xl shadow-flyer transition-all flex items-center justify-center gap-2"
              >
                Sign up free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#marketplace"
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-base h-13 px-7 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                Browse first
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
