"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/logo";

const QUICK_LINKS = [
  { label: "Marketplace", href: "#marketplace" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Sellers", href: "#for-sellers" },
  { label: "About Us", href: "#testimonials" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "#" },
  { label: "Guidelines", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Privacy Policy", href: "#" },
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
              {[
                {
                  label: "Facebook",
                  path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  label: "Instagram",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
                {
                  label: "X / Twitter",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-paper/70 hover:text-ink hover:bg-spark hover:border-spark transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
              <a
                href="#"
                aria-label="Email"
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
                  <a href={l.href} className="hover:text-paper transition-colors">
                    {l.label}
                  </a>
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
          <span>© 2026 Project Kita · Gen. Trias, Cavite</span>
          <span className="eyebrow text-[0.6rem] text-paper/50">
            Built by students, for students
          </span>
        </div>
      </div>
    </footer>
  );
}
