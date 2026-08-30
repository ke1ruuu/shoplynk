import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  FileCheck,
  AlertCircle,
  Building2,
  Clock,
  Server,
  KeyRound,
  Trash2,
} from "lucide-react";
import type { LegalSection } from "./terms-content";

export const PRIVACY_SECTIONS: LegalSection[] = [
  { id: "commitment", title: "1. Commitment & DPA 2012 Compliance" },
  { id: "data-collection", title: "2. Personal Information We Collect" },
  { id: "data-usage", title: "3. How We Use Your Data" },
  { id: "legal-basis", title: "4. Legal Bases for Processing" },
  { id: "sharing-disclosure", title: "5. Data Sharing & Third Parties" },
  { id: "cookies-storage", title: "6. Cookies & Session Storage" },
  { id: "security", title: "7. Data Security & Storage Architecture" },
  { id: "retention-deletion", title: "8. Data Retention & Deletion" },
  { id: "student-rights", title: "9. Your Rights under Philippine Law" },
  { id: "minors", title: "10. Protection of Student Minors" },
  { id: "policy-updates", title: "11. Updates to Privacy Policy" },
  { id: "dpo-contact", title: "12. Data Protection Officer (DPO) Contact" },
];

export function PrivacyContent() {
  return (
    <div className="space-y-12 text-ink leading-relaxed">
      {/* Overview Card */}
      <div className="p-6 rounded-2xl bg-paper-deep/70 border border-line flex flex-col md:flex-row gap-5 items-start">
        <div className="w-12 h-12 rounded-xl bg-kita-green text-white flex items-center justify-center flex-shrink-0 shadow-flyer">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-2 flex-1">
          <h3 className="font-display font-bold text-lg text-ink">
            Privacy Highlights in Plain English (TL;DR)
          </h3>
          <p className="text-sm text-muted">
            LYNK respects and protects the personal data of all students, faculty, and staff of 
            <strong> Luis Y. Ferrer Jr. Senior High School</strong>. We strictly follow Republic Act No. 10173 
            (Data Privacy Act of 2012). We do not sell your personal data, spam your inbox, or track you across third-party websites.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-medium text-ink-soft">
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-kita-green" /> End-to-end encrypted sessions
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-kita-green" /> Zero selling of personal data
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-kita-green" /> Strict role-based student access
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-kita-green" /> Full account & data deletion rights
            </span>
          </div>
        </div>
      </div>

      {/* 1. Commitment */}
      <section id="commitment" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 01</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            1. Commitment & DPA 2012 Compliance
          </h2>
        </div>
        <p>
          <strong>LYNK</strong> is dedicated to safeguarding your privacy in full compliance with the 
          <strong> Philippine Data Privacy Act of 2012 (Republic Act No. 10173)</strong>, its Implementing Rules and Regulations 
          (IRR), and applicable issuances of the <strong>National Privacy Commission (NPC)</strong>.
        </p>
        <p className="text-sm text-muted">
          This Privacy Policy explains how we collect, process, store, and safeguard your personal data when you use the 
          LYNK website, mobile web views, and related campus services.
        </p>
      </section>

      {/* 2. Collection */}
      <section id="data-collection" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 02</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            2. Personal Information We Collect
          </h2>
        </div>
        <p>
          We only collect personal information that is strictly necessary to operate a secure, trusted campus marketplace:
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5">
            <h4 className="text-sm font-bold text-ink flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-kita-green" /> A. Account & Identity Verification Data
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Full legal name, school email address (e.g. <code>@lyfjshs.edu.ph</code>), student Learner Reference Number (LRN) 
              or Faculty ID, grade level / section / strand, and campus role (Buyer, Seller, Campus Admin).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5">
            <h4 className="text-sm font-bold text-ink flex items-center gap-2">
              <Database className="w-4 h-4 text-kita-green" /> B. Storefront & Listing Information
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Product titles, descriptions, categories, pricing, stock levels, item photographs, storefront bio, and seller verification credentials.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5">
            <h4 className="text-sm font-bold text-ink flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-kita-green" /> C. Transaction & Communication History
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Order records, pickup location selections, in-app chat messages, product ratings, feedback, and customer inquiry logs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5">
            <h4 className="text-sm font-bold text-ink flex items-center gap-2">
              <Server className="w-4 h-4 text-kita-green" /> D. Technical & Session Data
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              IP addresses, browser type, device metadata, operating system, and login session timestamps for fraud detection and session maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Data Usage */}
      <section id="data-usage" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 03</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            3. How We Use Your Personal Data
          </h2>
        </div>
        <p>Your information is processed strictly for the following legitimate purposes:</p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-ink-soft">
          <li><strong>Authentication & Security:</strong> Verifying that only legitimate LYFJSHS students and faculty can access the marketplace.</li>
          <li><strong>Marketplace Coordination:</strong> Displaying student storefronts, facilitating search, and coordinating campus meetup pickups.</li>
          <li><strong>Dispute Resolution & Safety:</strong> Assisting campus administrators in resolving lost orders, fraudulent behavior, or school policy violations.</li>
          <li><strong>Platform Improvement:</strong> Analyzing aggregated, non-personally identifiable traffic metrics to improve UI performance and system uptime.</li>
        </ul>
      </section>

      {/* 4. Legal Basis */}
      <section id="legal-basis" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 04</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            4. Legal Bases for Processing Data
          </h2>
        </div>
        <p className="text-sm text-muted">
          Under Section 12 and Section 13 of the Data Privacy Act of 2012, LYNK processes personal data based on:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-paper-deep/60 border border-line space-y-1">
            <span className="font-bold text-ink block">Consent</span>
            <span className="text-muted block">Freely given, specific, and informed consent upon registration and signup.</span>
          </div>
          <div className="p-4 rounded-xl bg-paper-deep/60 border border-line space-y-1">
            <span className="font-bold text-ink block">Contractual Necessity</span>
            <span className="text-muted block">To fulfill marketplace services, order processing, and account management.</span>
          </div>
          <div className="p-4 rounded-xl bg-paper-deep/60 border border-line space-y-1">
            <span className="font-bold text-ink block">Legitimate Interests</span>
            <span className="text-muted block">To preserve campus discipline, platform safety, and prevent unauthorized external intrusion.</span>
          </div>
        </div>
      </section>

      {/* 5. Sharing */}
      <section id="sharing-disclosure" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 05</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            5. Data Sharing & Third-Party Processors
          </h2>
        </div>
        <p>
          <strong>We never sell, rent, or monetize your personal data.</strong> Information is shared only in the specific 
          circumstances outlined below:
        </p>
        <div className="space-y-2 text-sm text-ink-soft">
          <p>
            • <strong>Buyer & Seller Exchange:</strong> When an order is placed, essential contact details (student display name, 
            designated campus pickup spot, and in-app message thread) are shared between the parties to fulfill the transaction.
          </p>
          <p>
            • <strong>School Administration & Guidance:</strong> When required for serious disciplinary proceedings, health/safety emergencies, 
            or compliance with DepEd campus policies.
          </p>
          <p>
            • <strong>Infrastructure Providers (Supabase & Cloudflare/Vercel):</strong> Encrypted database hosting and authentication services 
            governed by strict Data Processing Agreements (DPA) adhering to SOC2, ISO 27001, and GDPR/DPA standards.
          </p>
        </div>
      </section>

      {/* 6. Cookies */}
      <section id="cookies-storage" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 06</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            6. Cookies & Session Storage
          </h2>
        </div>
        <p className="text-sm text-muted">
          LYNK uses strictly necessary cookies and local storage tokens to deliver fundamental platform capabilities:
        </p>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-xs text-left">
            <thead className="bg-paper-deep text-ink font-bold border-b border-line">
              <tr>
                <th className="p-3">Cookie / Key</th>
                <th className="p-3">Type</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-surface text-ink-soft">
              <tr>
                <td className="p-3 font-mono"><code>kita_session</code></td>
                <td className="p-3">Essential / Auth</td>
                <td className="p-3">Cryptographically signed HTTP-only auth token for secure session login.</td>
                <td className="p-3">7 Days</td>
              </tr>
              <tr>
                <td className="p-3 font-mono"><code>sb-*-auth-token</code></td>
                <td className="p-3">Essential / Supabase</td>
                <td className="p-3">Manages encrypted Supabase client session tokens and refresh cycles.</td>
                <td className="p-3">Session / 30 Days</td>
              </tr>
              <tr>
                <td className="p-3 font-mono"><code>theme_preference</code></td>
                <td className="p-3">Functional</td>
                <td className="p-3">Saves UI mode preferences (e.g. system/light theme).</td>
                <td className="p-3">1 Year</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted">
          We do not deploy third-party advertising cookies or cross-site tracking pixels.
        </p>
      </section>

      {/* 7. Security */}
      <section id="security" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 07</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            7. Data Security & Technical Measures
          </h2>
        </div>
        <p>
          We employ state-of-the-art security practices to protect your data from unauthorized access, alteration, 
          or disclosure:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5 shadow-sm">
            <span className="font-bold text-kita-green flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> TLS 1.3 Transport Encryption
            </span>
            <p className="text-muted">
              All traffic between your browser and our servers is secured via HTTPS/TLS 1.3 encryption.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5 shadow-sm">
            <span className="font-bold text-kita-green flex items-center gap-1.5">
              <KeyRound className="w-4 h-4" /> Row Level Security (RLS)
            </span>
            <p className="text-muted">
              PostgreSQL database policies guarantee users can only read and write data they are authorized to access.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5 shadow-sm">
            <span className="font-bold text-kita-green flex items-center gap-1.5">
              <Server className="w-4 h-4" /> Encrypted Secrets & Passwords
            </span>
            <p className="text-muted">
              User passwords are encrypted with industry-standard bcrypt/Argon2 hashing and never stored in plain text.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5 shadow-sm">
            <span className="font-bold text-kita-green flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Role-Based Access Control
            </span>
            <p className="text-muted">
              Admin features are gated through cryptographic session verification and campus-approved administrator roles.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Retention */}
      <section id="retention-deletion" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 08</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            8. Data Retention & Account Deletion
          </h2>
        </div>
        <p className="text-sm text-ink-soft">
          We retain personal data only for as long as necessary to fulfill marketplace operations and school academic year cycles:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-ink-soft">
          <li><strong>Active Accounts:</strong> Retained throughout the student&apos;s active enrollment at LYFJSHS.</li>
          <li><strong>Graduation / Inactivity:</strong> Accounts inactive for over two (2) academic school years are archived or purged.</li>
          <li><strong>Account Deletion Requests:</strong> You may request complete account deletion at any time. All personal profile records, active listings, and session tokens will be permanently scrubbed within 30 calendar days.</li>
        </ul>
      </section>

      {/* 9. Student Rights */}
      <section id="student-rights" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 09</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            9. Your Rights Under Philippine Law (RA 10173)
          </h2>
        </div>
        <p>As a data subject under Philippine law, you enjoy the following statutory rights:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-paper-deep/60 border border-line">
            <span className="font-bold text-ink block">1. Right to Be Informed</span>
            <span className="text-muted mt-0.5 block">To know how and why your personal data is collected and processed.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-paper-deep/60 border border-line">
            <span className="font-bold text-ink block">2. Right to Access</span>
            <span className="text-muted mt-0.5 block">To request a copy of the personal information stored in your account.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-paper-deep/60 border border-line">
            <span className="font-bold text-ink block">3. Right to Rectification</span>
            <span className="text-muted mt-0.5 block">To correct any inaccurate or outdated information in your profile.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-paper-deep/60 border border-line">
            <span className="font-bold text-ink block">4. Right to Erasure or Blocking</span>
            <span className="text-muted mt-0.5 block">To suspend, withdraw, or order the removal of your personal data.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-paper-deep/60 border border-line">
            <span className="font-bold text-ink block">5. Right to Data Portability</span>
            <span className="text-muted mt-0.5 block">To obtain an electronic copy of your listings and profile data.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-paper-deep/60 border border-line">
            <span className="font-bold text-ink block">6. Right to File a Complaint</span>
            <span className="text-muted mt-0.5 block">To file a complaint with the National Privacy Commission (NPC) if your rights are violated.</span>
          </div>
        </div>
      </section>

      {/* 10. Minors */}
      <section id="minors" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 10</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            10. Protection of Student Minors
          </h2>
        </div>
        <p className="text-sm text-muted">
          Because Senior High School students may include minors aged 16 to 17, LYNK exercises extra diligence in data minimization. 
          We do not display students&apos; personal contact numbers or home addresses on public listing pages. All communications and meetups 
          are encouraged to remain within official campus grounds. Parents or legal guardians may contact our Data Protection Officer with 
          any inquiries regarding their student&apos;s data.
        </p>
      </section>

      {/* 11. Updates */}
      <section id="policy-updates" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 11</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            11. Updates to This Privacy Policy
          </h2>
        </div>
        <p className="text-sm text-muted">
          We may update this policy to reflect enhancements in our application or changes in privacy legislation. 
          Any substantial modifications will be announced via platform banners and on this page with an updated timestamp.
        </p>
      </section>

      {/* 12. DPO Contact */}
      <section id="dpo-contact" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 12</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            12. Data Protection Officer (DPO) Contact
          </h2>
        </div>
        <div className="p-6 rounded-2xl bg-paper-deep/70 border border-line space-y-3">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-kita-green" />
            <h4 className="font-bold text-ink">Data Protection Office — LYNK</h4>
          </div>
          <p className="text-sm text-muted">
            For inquiries, data access requests, rectification, or data privacy concerns:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink-soft pt-2">
            <div>
              <span className="font-bold block text-ink">DPO Contact Email:</span>
              <a href="mailto:privacy@projectkita.edu.ph" className="text-kita-green font-semibold hover:underline">
                privacy@projectkita.edu.ph
              </a>
            </div>
            <div>
              <span className="font-bold block text-ink">National Privacy Commission:</span>
              <a href="https://privacy.gov.ph" target="_blank" rel="noopener noreferrer" className="text-kita-green font-semibold hover:underline">
                privacy.gov.ph (NPC Philippines)
              </a>
            </div>
            <div>
              <span className="font-bold block text-ink">Institution:</span>
              <span>Luis Y. Ferrer Jr. Senior High School</span>
            </div>
            <div>
              <span className="font-bold block text-ink">Campus Address:</span>
              <span>General Trias City, Cavite 4107, Philippines</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
