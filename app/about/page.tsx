import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import {
  Sparkles,
  ArrowRight,
  School,
  Building2,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — SHOP LYNK",
  description:
    "Learn about SHOP LYNK (Shopping in the Luis Y. Neighborhood Kicks), the campus marketplace for Luis Y. Ferrer Jr. Senior High School during Project KITA.",
  openGraph: {
    title: "About Us — SHOP LYNK",
    description:
      "Empowering student and teacher entrepreneurship at Luis Y. Ferrer Jr. Senior High School through Project KITA.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-spark-soft selection:text-ink">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero Banner */}
        <section className="bg-surface border-b border-line py-10 sm:py-14 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-1/4 w-[560px] h-[560px] bg-spark/10 rounded-full blur-[130px]" />
            <div className="absolute bottom-0 left-1/4 w-[560px] h-[560px] bg-kita-green/10 rounded-full blur-[130px]" />
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-kita-green/10 border border-kita-green/20 text-kita-green text-xs font-mono font-bold tracking-wide">
                  <School className="w-4 h-4" />
                  LUIS Y. FERRER JR. SENIOR HIGH SCHOOL · PROJECT KITA
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ink tracking-tight leading-[1.08]">
                  About <span className="text-kita-green">SHOP LYNK</span>
                </h1>

                <p className="text-base sm:text-xl text-muted font-medium font-display leading-snug">
                  Shopping in the Luis Y. Neighborhood Kicks
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted flex-shrink-0">
                <span className="inline-flex items-center gap-1.5 bg-paper px-3.5 py-2 rounded-xl border border-line shadow-sm">
                  <Building2 className="w-4 h-4 text-kita-green" /> Gen. Trias, Cavite
                </span>
                <span className="inline-flex items-center gap-1.5 bg-paper px-3.5 py-2 rounded-xl border border-line shadow-sm">
                  <Sparkles className="w-4 h-4 text-spark-ink" /> Project KITA
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Width Maximized Text Section */}
        <section className="py-10 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <article className="w-full bg-surface rounded-3xl border border-line p-8 sm:p-12 md:p-16 lg:p-20 shadow-sm space-y-8 text-ink">
              
              {/* Paragraph 1 */}
              <p className="text-lg sm:text-xl lg:text-[1.3rem] text-ink leading-relaxed font-normal">
                <strong>SHOP LYNK</strong> which stands for <em>&ldquo;Shopping in the Luis Y. Neighborhood Kicks&rdquo;</em> is an online marketplace website designed to help the students and teachers of <strong>Luis Y. Ferrer Jr. Senior High School</strong> promote and sell their products and services during <strong>Project KITA</strong>. We aim to provide a convenient digital space where students, teachers, and aspiring entrepreneurs can showcase their innovation, reach potential customers, and turn their entrepreneurial efforts into opportunities.
              </p>

              {/* Paragraph 2 */}
              <p className="text-lg sm:text-xl lg:text-[1.3rem] text-ink leading-relaxed font-normal">
                We believe that entrepreneurship starts with an idea and grows with the right support and community. Whether you&apos;re a student selling a handmade product, a teacher offering a service, or simply looking for something from a fellow member of the school community, <strong>SHOP LYNK</strong> makes it convenient to connect buyers and sellers in one place.
              </p>

              {/* Paragraph 3 */}
              <p className="text-lg sm:text-xl lg:text-[1.3rem] text-ink leading-relaxed font-normal">
                We provide a simple and accessible platform for discovering products and services offered during our school&apos;s entrepreneurial activity, <strong>Project KITA</strong>. From browsing different offerings to learning more about what each seller has to offer, <strong>SHOP LYNK</strong> helps make the experience more organized and engaging for everyone.
              </p>

              {/* Paragraph 4 */}
              <p className="text-lg sm:text-xl lg:text-[1.3rem] text-ink leading-relaxed font-normal">
                Be part of <strong>SHOP LYNK</strong> and support the spirit of entrepreneurship at <strong>Luis Y. Ferrer Jr. Senior High School</strong>! Discover unique products and services, and support and explore the innovation of your fellow students and teachers. Together, let&apos;s make Project KITA more connected, accessible, and successful—<strong>LYNKing our ideas together</strong>.
              </p>

              {/* Bottom Bar */}
              <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="text-xs sm:text-sm text-muted flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-kita-green flex-shrink-0" />
                  <span>Official Campus Marketplace for Project KITA · Luis Y. Ferrer Jr. Senior High School</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href="/#marketplace"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-ink bg-paper hover:bg-paper-deep border border-line px-5 h-12 rounded-xl transition-colors"
                  >
                    Browse Listings
                  </Link>
                  <Link
                    href="/signup"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-white bg-kita-green hover:bg-kita-green-deep px-6 h-12 rounded-xl shadow-flyer transition-colors"
                  >
                    Join SHOP LYNK
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
