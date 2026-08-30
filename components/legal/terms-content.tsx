import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Scale,
  Building2,
  FileText,
  UserCheck,
  Ban,
  HelpCircle,
  Clock,
} from "lucide-react";

export interface LegalSection {
  id: string;
  title: string;
}

export const TERMS_SECTIONS: LegalSection[] = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility & Community Access" },
  { id: "accounts", title: "3. Account Registration & Security" },
  { id: "seller-rules", title: "4. Student & Faculty Seller Rules" },
  { id: "permitted-prohibited", title: "5. Permitted & Prohibited Items" },
  { id: "campus-meetups", title: "6. Campus Meetups & Transactions" },
  { id: "fees-payments", title: "7. Pricing, Fees & Payments" },
  { id: "conduct", title: "8. User Conduct & Community Standards" },
  { id: "intellectual-property", title: "9. Intellectual Property" },
  { id: "disputes", title: "10. Disputes & Campus Mediation" },
  { id: "liability", title: "11. Disclaimer & Limitation of Liability" },
  { id: "termination", title: "12. Account Suspension & Termination" },
  { id: "updates", title: "13. Changes to Terms" },
  { id: "contact", title: "14. Contact & School Administration" },
];

export function TermsContent() {
  return (
    <div className="space-y-12 text-ink leading-relaxed">
      {/* Overview Card */}
      <div className="p-6 rounded-2xl bg-paper-deep/70 border border-line flex flex-col md:flex-row gap-5 items-start">
        <div className="w-12 h-12 rounded-xl bg-kita-green text-white flex items-center justify-center flex-shrink-0 shadow-flyer">
          <Scale className="w-6 h-6" />
        </div>
        <div className="space-y-2 flex-1">
          <h3 className="font-display font-bold text-lg text-ink">
            Summary for Campus Users (TL;DR)
          </h3>
          <p className="text-sm text-muted">
            LYNK is an exclusive, student-centered campus marketplace for the 
            <strong> Luis Y. Ferrer Jr. Senior High School (LYFJSHS)</strong> community. By creating 
            an account or browsing listings, you agree to uphold honesty, campus safety guidelines, 
            fair pricing, and respect for school policies.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-medium text-ink-soft">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-kita-green" /> Verified campus members only
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-kita-green" /> Safe on-campus pickup spots
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-kita-green" /> Strict prohibition on illicit items
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-kita-green" /> School handbook compliance
            </span>
          </div>
        </div>
      </div>

      {/* 1. Acceptance */}
      <section id="acceptance" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 01</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            1. Acceptance of Terms
          </h2>
        </div>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between 
          you (&ldquo;User,&rdquo; &ldquo;Buyer,&rdquo; or &ldquo;Seller&rdquo;) and <strong>LYNK</strong> 
          (&ldquo;Platform,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), operating in coordination with 
          the campus entrepreneurship and student body initiatives of <strong>Luis Y. Ferrer Jr. Senior High School</strong>.
        </p>
        <p>
          By creating an account, accessing, browsing, or utilizing any feature of the LYNK web application, 
          you certify that you have read, understood, and agreed to be bound by these Terms, as well as our{" "}
          <Link href="/privacy" className="text-kita-green font-semibold underline-offset-4 hover:underline">
            Privacy Policy
          </Link>{" "}
          and the official Student Handbook of Luis Y. Ferrer Jr. Senior High School.
        </p>
        <div className="p-4 rounded-xl bg-spark/10 border border-spark/30 text-sm text-ink-soft flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-spark-ink flex-shrink-0 mt-0.5" />
          <p>
            If you do not agree to these Terms in full, you must discontinue use of the platform immediately. 
            Continued usage constitutes unreserved acceptance of any revised terms.
          </p>
        </div>
      </section>

      {/* 2. Eligibility */}
      <section id="eligibility" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 02</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            2. Eligibility & Community Access
          </h2>
        </div>
        <p>
          LYNK is purpose-built to foster entrepreneurship within the secondary school and campus ecosystem. 
          To register and maintain an active account, you must:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-ink-soft">
          <li>
            Be a currently enrolled student, recognized faculty member, staff, or accredited student organization 
            representative of <strong>Luis Y. Ferrer Jr. Senior High School</strong> located in General Trias, Cavite.
          </li>
          <li>
            Provide accurate, complete, and verifiable registration details, including your full legal name, student LRN / faculty ID, 
            and official school email address (or approved personal email during verified signup).
          </li>
          <li>
            Possess the legal capacity under Philippine law to engage in peer-to-peer commerce and fulfill sales or purchase commitments.
          </li>
          <li>
            Not have been previously suspended or permanently banned from LYNK or school-sanctioned commercial activities.
          </li>
        </ul>
      </section>

      {/* 3. Accounts */}
      <section id="accounts" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 03</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            3. Account Registration & Security
          </h2>
        </div>
        <p>
          When you create an account on LYNK, you assume complete responsibility for safeguarding your login credentials. 
          You agree to:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5 shadow-sm">
            <div className="flex items-center gap-2 text-kita-green font-bold">
              <UserCheck className="w-4 h-4" /> Account Authenticity
            </div>
            <p className="text-muted text-xs leading-relaxed">
              Use your genuine identity. Impersonating another student, teacher, school official, or external business 
              will lead to immediate account termination and reporting to campus authorities.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5 shadow-sm">
            <div className="flex items-center gap-2 text-kita-green font-bold">
              <ShieldAlert className="w-4 h-4" /> Credential Confidentiality
            </div>
            <p className="text-muted text-xs leading-relaxed">
              Maintain the confidentiality of your password and authentication tokens. Notify platform administrators 
              immediately if you suspect unauthorized access to your account.
            </p>
          </div>
        </div>
        <p className="text-sm text-muted">
          Each student is allowed one primary personal account. Creating multiple duplicate accounts to bypass sanctions, 
          manipulate ratings, or fabricate promotional activities is strictly prohibited.
        </p>
      </section>

      {/* 4. Seller Rules */}
      <section id="seller-rules" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 04</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            4. Student & Faculty Seller Rules
          </h2>
        </div>
        <p>
          Student entrepreneurs and faculty sellers are the heart of LYNK. To maintain high trust and safety, 
          all sellers agree to the following code of conduct:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-paper-deep/50 border border-line">
            <div className="w-7 h-7 rounded-lg bg-spark/20 text-spark-ink flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
              A
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink">Accurate Product Listings</h4>
              <p className="text-xs text-muted mt-0.5">
                Listing titles, descriptions, conditions (Brand New, Like New, Good, Fair), and photographs must accurately 
                reflect the real product. Using misleading stock photos for secondhand items is disallowed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-paper-deep/50 border border-line">
            <div className="w-7 h-7 rounded-lg bg-spark/20 text-spark-ink flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
              B
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink">Transparent Pricing & Inventory</h4>
              <p className="text-xs text-muted mt-0.5">
                Prices must be listed in Philippine Pesos (PHP ₱) and represent the total cost. Hidden surcharges, sudden 
                post-order price increases, or &ldquo;PM for price&rdquo; tactics are forbidden.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-paper-deep/50 border border-line">
            <div className="w-7 h-7 rounded-lg bg-spark/20 text-spark-ink flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
              C
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink">Food Safety & Hygiene Standards</h4>
              <p className="text-xs text-muted mt-0.5">
                Sellers listing homemade snacks, baked goods, or refreshments must practice sanitary food handling, clearly list 
                known allergens (nuts, dairy, gluten), and clearly indicate preparation/expiration dates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-paper-deep/50 border border-line">
            <div className="w-7 h-7 rounded-lg bg-spark/20 text-spark-ink flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
              D
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink">Order Fulfillment & Punctuality</h4>
              <p className="text-xs text-muted mt-0.5">
                Sellers must promptly respond to customer inquiries and arrive on time for agreed campus handover meetups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Permitted & Prohibited Items */}
      <section id="permitted-prohibited" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 05</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            5. Permitted & Prohibited Items
          </h2>
        </div>
        <p>
          LYNK strictly aligns with the Department of Education (DepEd) safety guidelines, the LYFJSHS Student Handbook, 
          and Philippine national laws.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Permitted */}
          <div className="p-5 rounded-2xl bg-surface border border-kita-green/30 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-kita-green font-bold text-base">
              <CheckCircle2 className="w-5 h-5" /> Permitted Goods & Services
            </div>
            <ul className="space-y-2 text-xs text-ink-soft">
              <li className="flex items-start gap-1.5">
                <span className="text-kita-green font-bold">•</span>
                <span><strong>Academic Materials:</strong> Pre-loved textbooks, reviewers, calculators, art supplies, stationeries.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-kita-green font-bold">•</span>
                <span><strong>Uniforms & Apparel:</strong> Clean school uniforms, P.E. shirts, lab gowns, org merch, pins, accessories.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-kita-green font-bold">•</span>
                <span><strong>Student Crafts:</strong> Handmade jewelry, crochet, digital prints, stickers, custom art, school souvenirs.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-kita-green font-bold">•</span>
                <span><strong>Food & Beverages:</strong> Freshly baked treats, pre-packed snacks, beverages (subject to school canteen guidelines).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-kita-green font-bold">•</span>
                <span><strong>Student Services:</strong> Graphic design, photo/video editing, printing assistance, peer tutoring.</span>
              </li>
            </ul>
          </div>

          {/* Prohibited */}
          <div className="p-5 rounded-2xl bg-surface border border-destructive/30 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-destructive font-bold text-base">
              <Ban className="w-5 h-5" /> Strictly Prohibited Items
            </div>
            <ul className="space-y-2 text-xs text-ink-soft">
              <li className="flex items-start gap-1.5">
                <span className="text-destructive font-bold">•</span>
                <span><strong>Academic Dishonesty:</strong> Completed homework, test answers, exam leakages, ghostwritten theses or essays.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-destructive font-bold">•</span>
                <span><strong>Vapes, Tobacco & Alcohol:</strong> E-cigarettes, vape pods, cigarettes, alcoholic drinks, and related paraphernalia.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-destructive font-bold">•</span>
                <span><strong>Weapons & Fireworks:</strong> Knives, cutters, firecrackers, pyrotechnics, toy gun replicas, pepper sprays.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-destructive font-bold">•</span>
                <span><strong>Counterfeit & Stolen Goods:</strong> Pirated software, fake branded luxury goods, stolen school property.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-destructive font-bold">•</span>
                <span><strong>Adult & Explicit Content:</strong> Sexually explicit material, gambling items, illegal pharmaceuticals.</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-muted italic">
          Listing any prohibited item will trigger instant listing removal, account suspension, and formal referral to the 
          Prefect of Discipline.
        </p>
      </section>

      {/* 6. Campus Meetups */}
      <section id="campus-meetups" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 06</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            6. Campus Meetups & Safe Handover Zones
          </h2>
        </div>
        <p>
          Because LYNK is rooted in our physical school grounds, item handovers and transactions occur on campus. 
          All users must abide by the following safety protocols:
        </p>
        <div className="p-5 rounded-2xl bg-surface border border-line space-y-3">
          <div className="flex items-center gap-2 text-ink font-bold text-sm">
            <MapPin className="w-4 h-4 text-kita-green" /> Recommended On-Campus Handover Zones
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-paper-deep/60 border border-line">
              <span className="font-bold text-ink block">School Canteen & Quadrangle</span>
              <span className="text-muted mt-0.5 block">High visibility, open areas during recess and lunch break.</span>
            </div>
            <div className="p-3 rounded-xl bg-paper-deep/60 border border-line">
              <span className="font-bold text-ink block">Main Library Lobby</span>
              <span className="text-muted mt-0.5 block">Quiet and safe area for books, documents, and tech inspection.</span>
            </div>
            <div className="p-3 rounded-xl bg-paper-deep/60 border border-line">
              <span className="font-bold text-ink block">Senior High Building Atrium</span>
              <span className="text-muted mt-0.5 block">Well-lit central hall under CCTV coverage during dismissal.</span>
            </div>
          </div>
          <div className="pt-2 space-y-1 text-xs text-muted">
            <p>• Handover transactions must never interrupt instructional hours, classroom sessions, or official exams.</p>
            <p>• Buyers have the right and duty to inspect physical goods prior to concluding the transaction and handing over payment.</p>
            <p>• Avoid meeting in isolated or off-limits campus areas after school hours.</p>
          </div>
        </div>
      </section>

      {/* 7. Pricing & Payments */}
      <section id="fees-payments" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 07</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            7. Pricing, Fees & Payment Methods
          </h2>
        </div>
        <p>
          LYNK is committed to democratizing student commerce without placing heavy fee burdens on young entrepreneurs.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-ink-soft">
          <li>
            <strong>Zero Listing Fees:</strong> Posting products and setting up a student storefront is 100% free of charge.
          </li>
          <li>
            <strong>Payment Channels:</strong> Direct peer-to-peer cash on meetup, GCash, Maya, or direct bank transfer as mutually agreed between Buyer and Seller.
          </li>
          <li>
            <strong>No In-App Escrow Holding:</strong> LYNK facilitates connections and order logging, but does not custody user fiat funds. Users are responsible for confirming receipt of payment before releasing goods.
          </li>
        </ul>
      </section>

      {/* 8. User Conduct */}
      <section id="conduct" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 08</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            8. User Conduct & Community Standards
          </h2>
        </div>
        <p>
          We take pride in a respectful, supportive, and inclusive school culture. You agree not to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-ink-soft">
          <li>Harass, intimidate, stalk, or send unsolicited abusive messages to any fellow student, faculty member, or administrator.</li>
          <li>Post vulgar, profane, defamatory, or discriminatory content in product reviews, storefront descriptions, or messages.</li>
          <li>Scam, deliberately default on orders, engage in price gouging during campus emergencies, or manipulate review ratings through fake transactions.</li>
          <li>Attempt to reverse-engineer, exploit, spam, DDoS, or breach the LYNK application servers or APIs.</li>
        </ul>
      </section>

      {/* 9. Intellectual Property */}
      <section id="intellectual-property" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 09</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            9. Intellectual Property & School Brand Rights
          </h2>
        </div>
        <p>
          All trademarks, logos, UI designs, codebases, and brand assets of LYNK remain the exclusive intellectual 
          property of the development team and school administration.
        </p>
        <p className="text-sm text-muted">
          Users retain ownership of the original media (photos, artwork, descriptions) they upload to their storefronts. 
          By uploading, you grant LYNK a non-exclusive, royalty-free license to display such content on the platform 
          for catalog and promotional purposes.
        </p>
      </section>

      {/* 10. Disputes */}
      <section id="disputes" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 10</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            10. Dispute Resolution & Campus Mediation
          </h2>
        </div>
        <p>
          In the event of a dispute (such as defective items, misrepresented goods, or unfulfilled orders):
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-ink-soft">
          <li>
            <strong>Step 1 (Peer Resolution):</strong> Buyers and Sellers should first attempt to resolve the issue in good faith 
            through in-app messaging or in-person respectful communication (e.g. replacement, refund, or repair).
          </li>
          <li>
            <strong>Step 2 (Platform Support):</strong> If unresolved within 48 hours, either party may file an official report 
            through the LYNK Help Center / Report button with attached proof (order ID, screenshots, photos).
          </li>
          <li>
            <strong>Step 3 (Campus Admin & Guidance):</strong> For serious violations (fraud, theft, harassment), Platform 
            Administrators and LYFJSHS Faculty / Guidance Counselors may mediate the dispute according to school disciplinary policy.
          </li>
        </ol>
      </section>

      {/* 11. Liability */}
      <section id="liability" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 11</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            11. Disclaimer of Warranties & Limitation of Liability
          </h2>
        </div>
        <p className="text-sm text-muted">
          LYNK is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. While we enforce strict verification 
          and community standards, we do not directly manufacture, store, inspect, or guarantee the physical quality or safety 
          of every individual product traded between peer students.
        </p>
        <p className="text-sm text-muted">
          To the fullest extent permitted by Philippine law, LYNK, its student creators, teachers, and school administrators 
          shall not be held liable for indirect, incidental, or consequential damages resulting from peer transactions, item defectiveness, 
          or personal disputes outside platform control.
        </p>
      </section>

      {/* 12. Termination */}
      <section id="termination" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 12</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            12. Account Suspension & Termination
          </h2>
        </div>
        <p>
          We reserve the right to temporarily suspend or permanently terminate any user account, deactivate listings, or restrict 
          access to LYNK with or without prior notice if we determine that the user has:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-ink-soft">
          <li>Violated any provision of these Terms or the Privacy Policy;</li>
          <li>Engaged in fraudulent behavior or listed prohibited goods;</li>
          <li>Graduated or transferred out of LYFJSHS (accounts are transitioned to read-only or closed upon formal request);</li>
          <li>Created a hostile, unsafe, or disruptive environment for campus peers.</li>
        </ul>
      </section>

      {/* 13. Changes to Terms */}
      <section id="updates" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 13</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            13. Changes to These Terms
          </h2>
        </div>
        <p className="text-sm text-muted">
          We may modify these Terms periodically to accommodate new platform features, school policy updates, or regulatory 
          requirements. When updates occur, we will revise the &ldquo;Last Updated&rdquo; date at the top of this document and provide 
          an announcement notice via the student dashboard or school bulletin.
        </p>
      </section>

      {/* 14. Contact */}
      <section id="contact" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono">Section 14</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
            14. Contact & School Administration
          </h2>
        </div>
        <div className="p-6 rounded-2xl bg-paper-deep/70 border border-line space-y-3">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-kita-green" />
            <h4 className="font-bold text-ink">Luis Y. Ferrer Jr. Senior High School</h4>
          </div>
          <p className="text-sm text-muted">
            LYNK Administrative Committee & Campus Marketplace Support
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink-soft pt-2">
            <div>
              <span className="font-bold block text-ink">Location:</span>
              <span>General Trias City, Cavite, Philippines</span>
            </div>
            <div>
              <span className="font-bold block text-ink">Support Email:</span>
              <a href="mailto:support@projectkita.edu.ph" className="text-kita-green font-semibold hover:underline">
                support@projectkita.edu.ph
              </a>
            </div>
            <div>
              <span className="font-bold block text-ink">Guidance / Admin Office:</span>
              <span>LYFJSHS Admin Building, 2nd Floor</span>
            </div>
            <div>
              <span className="font-bold block text-ink">Campus Support Hours:</span>
              <span>Monday – Friday: 7:30 AM – 5:00 PM</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
