"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/logo";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navLinks = [
    { label: "Home", href: "/#home" },
    { label: "About Us", href: "/about" },
    { label: "Marketplace", href: "/#marketplace" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "For Sellers", href: "/#for-sellers" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-line">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo size="md" />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeLink === link.label;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setActiveLink(link.label)}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-kita-green"
                    : "text-muted hover:text-ink hover:bg-paper-deep"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-3.5 right-3.5 h-[3px] bg-spark rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="/login"
            className="inline-flex items-center text-sm font-semibold text-ink px-4 h-10 rounded-xl hover:bg-paper-deep transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-1.5 bg-kita-green hover:bg-kita-green-deep text-white font-semibold px-4 h-10 rounded-xl text-sm shadow-flyer transition-colors"
          >
            Sign up free
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden p-2 text-ink rounded-lg"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-paper px-4 pt-3 pb-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.label);
                  setMobileMenuOpen(false);
                }}
                className={`py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                  activeLink === link.label
                    ? "bg-kita-green-soft text-kita-green"
                    : "text-muted hover:bg-paper-deep hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-line flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center border border-line text-ink h-11 text-base font-semibold rounded-xl hover:bg-paper-deep transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-kita-green hover:bg-kita-green-deep text-white h-11 text-base font-semibold rounded-xl shadow-flyer inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              Sign up free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
