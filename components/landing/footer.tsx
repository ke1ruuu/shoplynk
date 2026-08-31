"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/logo";

const QUICK_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about" },
  { label: "Marketplace", href: "/#marketplace" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Sellers", href: "/#for-sellers" },
];

const SUPPORT_LINKS = [
  { label: "Marketplace Guidelines", href: "/terms#seller-rules" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Safe Meetup Spots", href: "/terms#campus-meetups" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-ink text-paper pt-16 pb-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Logo size="md" tone="dark" />
            <p className="text-sm text-paper/70 leading-relaxed max-w-sm mt-1">
              The campus marketplace for Luis Y Ferrer Jr. Senior High School —
              discover, support, and sell within your own community.
            </p>

            <div className="flex items-center gap-2.5 mt-2">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=laelzoey09@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send email to laelzoey09@gmail.com"
                title="Send email to laelzoey09@gmail.com"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-paper/70 hover:text-ink hover:bg-spark hover:border-spark transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h3 className="eyebrow text-spark">Explore</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-paper/70">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-paper transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h3 className="eyebrow text-spark">Support</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-paper/70">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-paper transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="eyebrow text-spark">Stay in the loop</h3>
            <p className="text-sm text-paper/70">
              Campus updates, seller tips, and announcements — straight to your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 bg-spark/15 border border-spark/30 rounded-xl text-sm font-semibold text-spark flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>You&apos;re on the list — thanks!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 mt-1">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@lyfjshs.edu.ph"
                  required
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:outline-none focus:border-spark focus:ring-1 focus:ring-spark"
                />
                <button
                  type="submit"
                  className="group bg-spark hover:bg-spark-deep text-ink text-sm font-bold px-4 h-11 rounded-xl flex-shrink-0 inline-flex items-center gap-1.5 transition-colors"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-paper/60">
          <div className="flex items-center gap-4 flex-wrap">
            <span>© 2026 LYNK · Gen. Trias, Cavite</span>
            <span className="hidden sm:inline text-white/20">·</span>
            <Link href="/terms" className="hover:text-paper transition-colors">
              Terms of Service
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/privacy" className="hover:text-paper transition-colors">
              Privacy Policy
            </Link>
          </div>
          <span className="eyebrow text-[0.6rem] text-paper/50">
            Built by students, for students
          </span>
        </div>
      </div>
    </footer>
  );
}
