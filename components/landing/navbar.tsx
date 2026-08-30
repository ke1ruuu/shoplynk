"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/logo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { label: "Home", href: "/#home", id: "home" },
    { label: "Marketplace", href: "/#marketplace", id: "marketplace" },
    { label: "How It Works", href: "/#how-it-works", id: "how-it-works" },
    { label: "For Sellers", href: "/#for-sellers", id: "for-sellers" },
    { label: "About Us", href: "/about", id: "about" },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          setIsScrolled(scrollPos > 40);

          // Scroll spy for active sections
          const sections = ["home", "marketplace", "how-it-works", "for-sellers"];
          for (const sectionId of [...sections].reverse()) {
            const el = document.getElementById(sectionId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 240) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Outer Floating Wrapper Container */}
      <div
        className={`fixed top-0 inset-x-0 z-50 pointer-events-none flex justify-center transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? "pt-3 sm:pt-4 px-3 sm:px-6" : "pt-0 px-0"
        }`}
      >
        {/* Inner Morphing Navigation Bar */}
        <header
          className={`pointer-events-auto w-full transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center ${
            isScrolled
              ? "max-w-5xl rounded-full bg-paper/90 backdrop-blur-xl border border-line shadow-lg shadow-ink/5 px-4 sm:px-6 py-2.5"
              : "max-w-full bg-paper/85 backdrop-blur-md border-b border-line px-4 sm:px-6 lg:px-8 py-3.5"
          }`}
        >
          <div
            className={`w-full mx-auto flex items-center justify-between transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? "max-w-5xl h-10" : "max-w-[1280px] h-12"
            }`}
          >
            {/* Brand Logo */}
            <Logo
              href="/#home"
              size={isScrolled ? "sm" : "md"}
              className="flex-shrink-0 transition-transform duration-300"
            />

            {/* Desktop Navigation Links — Generous, Uncompressed Spacing */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setActiveSection(link.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`whitespace-nowrap px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-white bg-kita-green shadow-xs font-semibold"
                        : "text-muted hover:text-ink hover:bg-paper-deep"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
              <Link
                href="/login"
                className="whitespace-nowrap inline-flex items-center text-sm font-semibold text-ink px-3.5 py-1.5 rounded-full hover:bg-paper-deep transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="whitespace-nowrap group inline-flex items-center gap-1.5 bg-kita-green hover:bg-kita-green-deep text-white font-semibold px-4 py-2 rounded-full text-sm shadow-flyer transition-all hover:scale-[1.02]"
              >
                <span>Sign up</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden p-1.5 text-ink rounded-full hover:bg-paper-deep transition-colors focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <div
              className={`md:hidden mt-3 pt-3 border-t border-line bg-paper/95 backdrop-blur-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
                isScrolled ? "rounded-2xl p-4 shadow-xl border" : "px-2 pb-4"
              }`}
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 px-3 rounded-xl text-sm font-semibold transition-colors ${
                      activeSection === link.id
                        ? "bg-kita-green text-white"
                        : "text-muted hover:bg-paper-deep hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="pt-2 border-t border-line flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center border border-line text-ink h-9 text-sm font-semibold rounded-xl hover:bg-paper-deep transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-kita-green hover:bg-kita-green-deep text-white h-9 text-sm font-semibold rounded-xl shadow-flyer inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Sign up free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </header>
      </div>

      {/* Spacer so the page layout flows cleanly below the fixed top bar */}
      <div className="h-16 sm:h-20" aria-hidden="true" />
    </>
  );
}
