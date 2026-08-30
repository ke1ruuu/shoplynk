import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, MapPin, Users } from "lucide-react";
import { ProductCard, ProductCardProps } from "@/components/common/product-card";

const HERO_PICKS: ProductCardProps[] = [
  {
    id: "h1",
    title: "Choco Chip Cookies",
    price: 50,
    sellerName: "Maria Santos",
    sellerType: "Student",
    category: "food",
    imageUrl:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "h2",
    title: "Canvas Tote Bag",
    price: 180,
    sellerName: "Ethan Reyes",
    sellerType: "Student",
    category: "fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "h3",
    title: "Graphic Design",
    price: 250,
    sellerName: "Miguel Dela Cruz",
    sellerType: "Student",
    category: "digital",
    imageUrl:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
  },
];

const TRUST = [
  { icon: ShieldCheck, label: "Verified campus only" },
  { icon: Users, label: "Students + Faculty" },
  { icon: MapPin, label: "Gen. Trias, Cavite" },
];

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Ambient warmth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 right-0 w-[620px] h-[520px] bg-spark/15 rounded-full blur-[120px]" />
        <div className="absolute -top-24 left-0 w-[560px] h-[460px] bg-kita-green/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left — the thesis */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <div className="rise inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-surface border border-line shadow-flyer">
              <span className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-paper border border-line flex items-center justify-center">
                <Image
                  src="/LYNKICON.png"
                  alt="LYNK Icon"
                  width={28}
                  height={28}
                  className="object-contain w-full h-full"
                />
              </span>
              <span className="eyebrow text-kita-green">Exclusively for LYFJSHS</span>
            </div>

            <h1
              className="rise text-4xl sm:text-6xl lg:text-[4.25rem] font-display font-extrabold text-ink leading-[1.02]"
              style={{ animationDelay: "80ms" }}
            >
              Your campus.
              <br />
              Your hustle.
              <br />
              <span className="marker">Your kita.</span>
            </h1>

            <p
              className="rise text-lg text-muted leading-relaxed max-w-xl"
              style={{ animationDelay: "160ms" }}
            >
              Buy, sell, and back your classmates — a marketplace made only for the{" "}
              <span className="font-semibold text-ink">
                Luis Y Ferrer Jr. Senior High School
              </span>{" "}
              community.
            </p>

            <div
              className="rise flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-1"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="#marketplace"
                className="group bg-kita-green hover:bg-kita-green-deep text-white font-semibold text-base h-13 px-7 rounded-xl shadow-flyer hover:shadow-flyer-lg transition-all flex items-center justify-center gap-2.5"
              >
                Explore marketplace
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/signup?type=seller"
                className="group bg-surface border border-line hover:border-kita-green/40 text-ink font-semibold text-base h-13 px-7 rounded-xl transition-all shadow-flyer flex items-center justify-center gap-2.5"
              >
                Start selling
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div
              className="rise flex flex-wrap gap-x-5 gap-y-2.5 pt-3"
              style={{ animationDelay: "320ms" }}
            >
              {TRUST.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted">
                  <Icon className="w-4 h-4 text-kita-green" />
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — the bulletin board */}
          <div
            className="rise lg:col-span-6 relative"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative bg-corkboard rounded-3xl border border-line shadow-flyer p-4 sm:p-6">
              {/* Board label */}
              <div className="absolute -top-3 left-6 bg-ink text-paper eyebrow px-3 py-1.5 rounded-full text-[0.62rem] shadow-flyer">
                Fresh on campus
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-5 pt-3">
                <div className="flex flex-col gap-4 sm:gap-5 pt-7">
                  <ProductCard {...HERO_PICKS[0]} tiltClass="-rotate-2" />
                  {/* Gold invitation tile */}
                  <Link
                    href="/signup?type=seller"
                    className="group rotate-1 hover:rotate-0 relative bg-spark rounded-2xl border border-spark-deep/30 shadow-flyer hover:shadow-flyer-lg hover:-translate-y-1.5 transition-all p-4 flex flex-col gap-2"
                  >
                    <span className="pin left-1/2 -translate-x-1/2 -top-1.5" style={{ "--pin-color": "#D92323" } as React.CSSProperties} aria-hidden="true" />
                    <span className="eyebrow text-spark-ink">Your turn</span>
                    <span className="font-display font-extrabold text-ink text-lg leading-tight">
                      Got something to sell?
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink mt-1">
                      Post it free
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
                <div className="flex flex-col gap-4 sm:gap-5">
                  <ProductCard {...HERO_PICKS[1]} tiltClass="rotate-2" />
                  <ProductCard {...HERO_PICKS[2]} tiltClass="-rotate-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
