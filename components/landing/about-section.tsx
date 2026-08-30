import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  School,
  CheckCircle2,
} from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-surface border-y border-line relative overflow-hidden">
      {/* Decorative ambient background gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-spark/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-kita-green/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-2.5 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-kita-green/10 border border-kita-green/20 text-kita-green text-xs font-mono font-bold tracking-wide">
            <School className="w-3.5 h-3.5" />
            ABOUT OUR COMMUNITY MARKETPLACE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink leading-[1.05]">
            About <span className="text-kita-green">SHOP LYNK</span>
          </h2>
          <p className="text-sm text-muted font-mono">
            Shopping in the Luis Y. Neighborhood Kicks · Project KITA
          </p>
        </div>

        <article className="w-full bg-paper rounded-3xl border border-line p-8 sm:p-12 md:p-16 shadow-sm space-y-7 text-ink">
          <p className="text-lg sm:text-xl lg:text-[1.25rem] text-ink leading-relaxed">
            <strong>SHOP LYNK</strong> which stands for <em>&ldquo;Shopping in the Luis Y. Neighborhood Kicks&rdquo;</em> is an online marketplace website designed to help the students and teachers of <strong>Luis Y. Ferrer Jr. Senior High School</strong> promote and sell their products and services during <strong>Project KITA</strong>. We aim to provide a convenient digital space where students, teachers, and aspiring entrepreneurs can showcase their innovation, reach potential customers, and turn their entrepreneurial efforts into opportunities.
          </p>

          <p className="text-lg sm:text-xl lg:text-[1.25rem] text-ink leading-relaxed">
            We believe that entrepreneurship starts with an idea and grows with the right support and community. Whether you&apos;re a student selling a handmade product, a teacher offering a service, or simply looking for something from a fellow member of the school community, <strong>SHOP LYNK</strong> makes it convenient to connect buyers and sellers in one place.
          </p>

          <p className="text-lg sm:text-xl lg:text-[1.25rem] text-ink leading-relaxed">
            We provide a simple and accessible platform for discovering products and services offered during our school&apos;s entrepreneurial activity, <strong>Project KITA</strong>. From browsing different offerings to learning more about what each seller has to offer, <strong>SHOP LYNK</strong> helps make the experience more organized and engaging for everyone.
          </p>

          <p className="text-lg sm:text-xl lg:text-[1.25rem] text-ink leading-relaxed">
            Be part of <strong>SHOP LYNK</strong> and support the spirit of entrepreneurship at <strong>Luis Y. Ferrer Jr. Senior High School</strong>! Discover unique products and services, and support and explore the innovation of your fellow students and teachers. Together, let&apos;s make Project KITA more connected, accessible, and successful—<strong>LYNKing our ideas together</strong>.
          </p>

          <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-muted flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-kita-green flex-shrink-0" />
              <span>Luis Y. Ferrer Jr. Senior High School · Gen. Trias, Cavite</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/about"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center text-xs font-semibold text-ink bg-surface hover:bg-paper-deep border border-line px-5 h-11 rounded-xl transition-colors"
              >
                View Full Page
              </Link>
              <Link
                href="/signup"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-kita-green hover:bg-kita-green-deep px-6 h-11 rounded-xl shadow-flyer transition-colors"
              >
                Join SHOP LYNK
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
