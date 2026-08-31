"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Shield,
  Check,
  ChevronRight,
  ArrowLeft,
  Search,
  Sparkles,
  ExternalLink,
  School,
} from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Footer } from "@/components/landing/footer";
import { TermsContent, TERMS_SECTIONS } from "./terms-content";
import { PrivacyContent, PRIVACY_SECTIONS } from "./privacy-content";

interface LegalShellProps {
  initialTab?: "terms" | "privacy";
}

export function LegalShell({ initialTab = "terms" }: LegalShellProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">(initialTab);
  const [activeSection, setActiveSection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tocNavRef = useRef<HTMLElement | null>(null);

  const currentSections = activeTab === "terms" ? TERMS_SECTIONS : PRIVACY_SECTIONS;

  // Sync tab with props and set initial section
  useEffect(() => {
    setActiveTab(initialTab);
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const sections = initialTab === "terms" ? TERMS_SECTIONS : PRIVACY_SECTIONS;
    if (hash && sections.some((s) => s.id === hash)) {
      setActiveSection(hash);
    } else if (sections.length > 0) {
      setActiveSection(sections[0].id);
    }
  }, [initialTab]);

  // Auto-scroll the Table of Contents container so the active highlighted item remains visible inside the TOC sidebar
  useEffect(() => {
    if (!activeSection || !tocNavRef.current) return;
    const activeItem = document.getElementById(`toc-link-${activeSection}`);
    const navContainer = tocNavRef.current;
    if (activeItem && navContainer) {
      const navRect = navContainer.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      // If active item is outside or near the edges of the TOC scrollable container, smoothly scroll it into view
      if (itemRect.top < navRect.top + 24 || itemRect.bottom > navRect.bottom - 24) {
        activeItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeSection]);

  // Robust Scroll Spy for active TOC section
  useEffect(() => {
    const sections = activeTab === "terms" ? TERMS_SECTIONS : PRIVACY_SECTIONS;

    // Check initial hash on mount/tab change
    const hash = window.location.hash.replace("#", "");
    if (hash && sections.some((s) => s.id === hash)) {
      setActiveSection(hash);
    } else if (sections.length > 0) {
      setActiveSection(sections[0].id);
    }

    let ticking = false;

    const cancelProgrammaticScroll = () => {
      if (isProgrammaticScrollRef.current) {
        isProgrammaticScrollRef.current = false;
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      }
    };

    const handleScroll = () => {
      // Don't calculate during programmatic smooth scroll to prevent glitching/flicker
      if (isProgrammaticScrollRef.current) {
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (isProgrammaticScrollRef.current) {
            ticking = false;
            return;
          }

          // Check bottom of page first
          if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 60
          ) {
            if (sections.length > 0) {
              setActiveSection(sections[sections.length - 1].id);
            }
            ticking = false;
            return;
          }

          // Natural reading threshold (220px from top of viewport)
          const headerThreshold = 220;
          let currentId = sections[0]?.id || "";

          // Check sections in reverse to find the active visible section
          for (const section of [...sections].reverse()) {
            const element = document.getElementById(section.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= headerThreshold) {
                currentId = section.id;
                break;
              }
            }
          }

          if (currentId) {
            setActiveSection(currentId);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", cancelProgrammaticScroll, { passive: true });
    window.addEventListener("touchmove", cancelProgrammaticScroll, { passive: true });

    // Run after layout paint
    const timer = setTimeout(handleScroll, 120);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", cancelProgrammaticScroll);
      window.removeEventListener("touchmove", cancelProgrammaticScroll);
      clearTimeout(timer);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeTab]);

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();

    // Lock scroll spy to immediately show the target highlight without glitching through intermediate sections
    isProgrammaticScrollRef.current = true;
    setActiveSection(sectionId);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = 110; // matches scroll-mt-28
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${sectionId}`);
    }

    // Unlock after smooth scroll completes
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 750);
  };

  const handleTabChange = (tab: "terms" | "privacy") => {
    setActiveTab(tab);
    const sections = tab === "terms" ? TERMS_SECTIONS : PRIVACY_SECTIONS;
    if (sections.length > 0) {
      setActiveSection(sections[0].id);
    }
    router.push(`/${tab}`);
  };

  const filteredSections = searchQuery.trim()
    ? currentSections.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : currentSections;

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-spark-soft selection:text-ink">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-line">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo size="md" />
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted pl-4 border-l border-line">
              <School className="w-3.5 h-3.5 text-kita-green" />
              <span>Luis Y. Ferrer Jr. Senior High School</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted hover:text-ink px-3 py-2 rounded-xl hover:bg-paper-deep transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Marketplace</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <Link
              href="/signup"
              className="bg-kita-green hover:bg-kita-green-deep text-white text-xs sm:text-sm font-semibold px-4 h-9 sm:h-10 rounded-xl inline-flex items-center gap-1.5 shadow-flyer transition-colors"
            >
              Join LYNK
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header Section */}
      <section className="bg-surface border-b border-line py-10 sm:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kita-green/10 border border-kita-green/20 text-kita-green text-xs font-mono font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                CAMPUS GOVERNANCE & LEGAL TRUST
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink tracking-tight">
                {activeTab === "terms" ? "Terms of Service" : "Privacy Policy"}
              </h1>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {activeTab === "terms"
                  ? "Guidelines, seller rules, and community standards for trading safely within the Luis Y. Ferrer Jr. Senior High School campus marketplace."
                  : "How LYNK collects, protects, and handles personal student information under the Philippine Data Privacy Act of 2012 (RA 10173)."}
              </p>
            </div>
          </div>

          {/* Interactive Document Tabs */}
          <div className="flex items-center gap-2 mt-8 p-1.5 bg-paper rounded-2xl border border-line w-full sm:w-max">
            <button
              type="button"
              onClick={() => handleTabChange("terms")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "terms"
                ? "bg-surface text-kita-green shadow-sm border border-line"
                : "text-muted hover:text-ink hover:bg-paper-deep"
                }`}
            >
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("privacy")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "privacy"
                ? "bg-surface text-kita-green shadow-sm border border-line"
                : "text-muted hover:text-ink hover:bg-paper-deep"
                }`}
            >
              <Shield className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Body: 2-Column Responsive Layout */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Left Column: Sticky Table of Contents & Quick Navigation */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="bg-surface rounded-2xl border border-line p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <span className="eyebrow text-kita-green font-mono">Table of Contents</span>
                <span className="text-xs font-mono text-muted">
                  {currentSections.length} Sections
                </span>
              </div>

              {/* Quick Search inside TOC */}
              <div className="relative">
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter sections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-paper pl-9 pr-3 py-2 text-xs rounded-xl border border-line text-ink placeholder:text-muted focus:outline-none focus:border-kita-green"
                />
              </div>

              {/* Navigation Links */}
              <nav
                ref={tocNavRef}
                className="max-h-[580px] lg:max-h-[calc(100vh-250px)] overflow-y-auto space-y-1 pr-1.5 pb-2 text-xs custom-scrollbar"
              >
                {filteredSections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <a
                      key={section.id}
                      id={`toc-link-${section.id}`}
                      href={`#${section.id}`}
                      onClick={(e) => handleSectionClick(e, section.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${isActive
                        ? "bg-kita-green/10 text-kita-green font-bold"
                        : "text-muted hover:bg-paper-deep hover:text-ink"
                        }`}
                    >
                      <span className="truncate">{section.title}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isActive ? "translate-x-0.5 text-kita-green" : "text-muted/50"
                          }`}
                      />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Support / Help Card */}
            <div className="bg-paper-deep/70 rounded-2xl border border-line p-5 space-y-3">
              <h4 className="font-display font-bold text-sm text-ink">
                Need Help or Clarification?
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                Have questions about student seller verification, dispute mediation, or your privacy rights?
              </p>
              <div className="pt-1 flex flex-col gap-2">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=laelzoey09@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-ink bg-surface border border-line px-3 py-2 rounded-xl hover:bg-paper transition-colors"
                >
                  Contact Campus Support
                </a>
                <Link
                  href="/login"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-kita-green bg-kita-green/10 border border-kita-green/20 px-3 py-2 rounded-xl hover:bg-kita-green/20 transition-colors"
                >
                  Log into Account
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Column: Full Legal Content */}
          <article className="lg:col-span-8 bg-surface rounded-3xl border border-line p-6 sm:p-10 lg:p-12 shadow-sm">
            {activeTab === "terms" ? <TermsContent /> : <PrivacyContent />}
          </article>

        </div>
      </main>

      {/* Landing Footer */}
      <Footer />
    </div>
  );
}
