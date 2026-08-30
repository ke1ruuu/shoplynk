"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Shield,
  Printer,
  Share2,
  Check,
  ChevronRight,
  ArrowLeft,
  Search,
  Sparkles,
  ExternalLink,
  Calendar,
  Building,
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
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const currentSections = activeTab === "terms" ? TERMS_SECTIONS : PRIVACY_SECTIONS;

  // Sync tab with props
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Scroll spy for active TOC section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const section of currentSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, currentSections]);

  const handleTabChange = (tab: "terms" | "privacy") => {
    setActiveTab(tab);
    router.push(`/${tab}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-kita-green" /> Last Updated: March 2026
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <Building className="w-3.5 h-3.5 text-spark-ink" /> Version 2.1 · General Trias, Cavite
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-kita-green font-semibold">
                  <Shield className="w-3.5 h-3.5" /> DepEd & NPC Compliant
                </span>
              </div>
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink bg-paper hover:bg-paper-deep border border-line px-3.5 h-10 rounded-xl transition-colors shadow-sm"
                title="Print this policy"
              >
                <Printer className="w-4 h-4 text-muted" />
                <span className="hidden sm:inline">Print Document</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink bg-paper hover:bg-paper-deep border border-line px-3.5 h-10 rounded-xl transition-colors shadow-sm"
                title="Copy link to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-kita-green" />
                    <span className="text-kita-green">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-muted" />
                    <span className="hidden sm:inline">Share Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Document Tabs */}
          <div className="flex items-center gap-2 mt-8 p-1.5 bg-paper rounded-2xl border border-line w-full sm:w-max">
            <button
              type="button"
              onClick={() => handleTabChange("terms")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "terms"
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
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "privacy"
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
              <nav className="max-h-[380px] overflow-y-auto space-y-1 pr-1 text-xs custom-scrollbar">
                {filteredSections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                        isActive
                          ? "bg-kita-green/10 text-kita-green font-bold"
                          : "text-muted hover:bg-paper-deep hover:text-ink"
                      }`}
                    >
                      <span className="truncate">{section.title}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                          isActive ? "translate-x-0.5 text-kita-green" : "text-muted/50"
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
                  href="mailto:support@projectkita.edu.ph"
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
