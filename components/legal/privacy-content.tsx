import React from "react";
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
    <div className="space-y-10 text-ink leading-relaxed text-sm sm:text-base">
      {/* 1. Commitment */}
      <section id="commitment" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 01</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            1. Commitment & DPA 2012 Compliance
          </h2>
        </div>
        <p>
          <strong>SHOP LYNK</strong> is dedicated to safeguarding your personal data and privacy in full compliance with the <strong>Philippine Data Privacy Act of 2012 (Republic Act No. 10173)</strong>, its Implementing Rules and Regulations, and applicable issuances of the <strong>National Privacy Commission (NPC)</strong>.
        </p>
        <p>
          This Privacy Policy describes the principles and protocols governing how we collect, process, store, and protect your information when you access or use the SHOP LYNK platform, including student storefronts and campus marketplace services for <strong>Luis Y. Ferrer Jr. Senior High School</strong>.
        </p>
      </section>

      {/* 2. Collection */}
      <section id="data-collection" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 02</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            2. Personal Information We Collect
          </h2>
        </div>
        <p>
          We only collect personal information that is strictly necessary to provide a secure and authentic marketplace experience. This includes account and verification data such as your full legal name, official school email address, student Learner Reference Number (LRN) or faculty identifier, grade level, section, academic strand, and assigned platform role (Buyer, Seller, or Campus Administrator).
        </p>
        <p>
          Additionally, we process storefront and listing content—including product titles, descriptions, categories, pricing, uploaded item photographs, and seller verification credentials—as well as order transaction logs, designated on-campus pickup spots, and in-app communications. Technical telemetry such as IP addresses, browser types, and session timestamps is collected solely for security verification and fraud prevention.
        </p>
      </section>

      {/* 3. Data Usage */}
      <section id="data-usage" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 03</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            3. How We Use Your Data
          </h2>
        </div>
        <p>
          Your personal data is processed exclusively for legitimate campus operations and marketplace administration. We utilize your information to authenticate user identities, confirm school enrollment, display student storefronts, index search results, and coordinate peer order meetups.
        </p>
        <p>
          We also process records to assist campus administrators in resolving lost orders or community guidelines disputes, prevent unauthorized external access, and analyze aggregated, non-personally identifiable metrics to maintain platform reliability and speed.
        </p>
      </section>

      {/* 4. Legal Basis */}
      <section id="legal-basis" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 04</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            4. Legal Bases for Processing
          </h2>
        </div>
        <p>
          Under Sections 12 and 13 of the Data Privacy Act of 2012, SHOP LYNK processes personal data on the basis of your freely given, specific, and informed consent upon registration, the contractual necessity of providing marketplace functionalities and order coordination, and the legitimate interests of preserving campus safety, academic integrity, and student protection.
        </p>
      </section>

      {/* 5. Sharing */}
      <section id="sharing-disclosure" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 05</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            5. Data Sharing & Third Parties
          </h2>
        </div>
        <p>
          <strong>SHOP LYNK does not sell, rent, monetize, or trade your personal information.</strong> Data is shared only to the extent necessary to fulfill peer-to-peer commerce, such as displaying the seller&apos;s store name, buyer display name, and designated pickup location to the respective transaction parties.
        </p>
        <p>
          Information may be shared with authorized school administrators or faculty guidance counselors strictly when required for official student discipline inquiries, emergencies, or campus safety compliance. Cloud database hosting and infrastructure providers operate under strict Data Processing Agreements conforming to ISO 27001, SOC 2, and DPA standards.
        </p>
      </section>

      {/* 6. Cookies */}
      <section id="cookies-storage" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 06</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            6. Cookies & Session Storage
          </h2>
        </div>
        <p>
          SHOP LYNK uses strictly essential cookies and secure local storage keys to maintain encrypted authentication sessions, remember login states, and store functional interface preferences like theme settings. We do not use third-party advertising cookies, marketing pixels, or cross-site behavioral tracking scripts.
        </p>
      </section>

      {/* 7. Security */}
      <section id="security" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 07</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            7. Data Security & Storage Architecture
          </h2>
        </div>
        <p>
          We implement rigorous technical, organizational, and physical security measures to protect your personal data from unauthorized disclosure, alteration, or destruction. All data transmitted between your browser and our servers is protected using TLS 1.3 encryption.
        </p>
        <p>
          User passwords and sensitive credentials are encrypted using modern cryptographic hashing algorithms and are never stored in plaintext. Database access is governed by strict PostgreSQL Row Level Security (RLS) policies, ensuring users can only view and modify records they are explicitly authorized to access.
        </p>
      </section>

      {/* 8. Retention */}
      <section id="retention-deletion" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 08</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            8. Data Retention & Deletion
          </h2>
        </div>
        <p>
          Personal information is retained only for the duration of a student&apos;s active enrollment or faculty tenure at Luis Y. Ferrer Jr. Senior High School. Accounts that remain inactive for two consecutive academic school years are reviewed, archived, or purged.
        </p>
        <p>
          Users may submit a formal request for account and data deletion at any time. Upon verified submission, your personal profile data, active storefront listings, and authentication tokens will be permanently scrubbed from our systems within 30 calendar days.
        </p>
      </section>

      {/* 9. Student Rights */}
      <section id="student-rights" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 09</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            9. Your Rights under Philippine Law
          </h2>
        </div>
        <p>
          As a data subject under the Philippine Data Privacy Act of 2012, you are entitled to the Right to be Informed about how your data is collected and processed, the Right to Access copies of your stored personal information, the Right to Rectification to correct inaccurate or outdated records, the Right to Erasure or Blocking to request data deletion, the Right to Data Portability to obtain an export of your listings, and the Right to File a Complaint with the National Privacy Commission if your privacy rights are infringed.
        </p>
      </section>

      {/* 10. Minors */}
      <section id="minors" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 10</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            10. Protection of Student Minors
          </h2>
        </div>
        <p>
          Because our senior high school student body includes minor students aged 16 to 17, SHOP LYNK exercises strict data minimization. Personal contact numbers and residential home addresses are never published publicly on product listing cards. Communications and order meetups are kept strictly within school grounds. Parents or legal guardians may contact our Data Protection Officer for any inquiries regarding their child&apos;s data.
        </p>
      </section>

      {/* 11. Updates */}
      <section id="policy-updates" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 11</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            11. Updates to Privacy Policy
          </h2>
        </div>
        <p>
          We may update this Privacy Policy periodically to reflect new platform capabilities, institutional guidelines, or revisions in privacy regulations. Substantial modifications will be communicated via student dashboard notifications and updated on this page with a revised date stamp.
        </p>
      </section>

      {/* 12. DPO Contact */}
      <section id="dpo-contact" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 12</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            12. Data Protection Officer (DPO) Contact
          </h2>
        </div>
        <p>
          For questions, data access requests, rectification, or data privacy concerns, please contact the Data Protection Office of SHOP LYNK at <strong>privacy@projectkita.edu.ph</strong>, or reach the National Privacy Commission of the Philippines at <strong>privacy.gov.ph</strong>. You may also visit the Administration Building on campus in General Trias City, Cavite.
        </p>
      </section>
    </div>
  );
}
