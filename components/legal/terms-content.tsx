import React from "react";
import Link from "next/link";

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
    <div className="space-y-10 text-ink leading-relaxed text-sm sm:text-base">
      {/* 1. Acceptance */}
      <section id="acceptance" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 01</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            1. Acceptance of Terms
          </h2>
        </div>
        <p>
          These Terms of Service constitute a legally binding agreement between you—whether as a student buyer, faculty seller, or member of the school community—and <strong>SHOP LYNK</strong>, operating in coordination with the campus entrepreneurship and student body initiatives of <strong>Luis Y. Ferrer Jr. Senior High School</strong>.
        </p>
        <p>
          By accessing, registering, browsing, or utilizing any feature of the SHOP LYNK web application, you acknowledge that you have read, understood, and agreed to be bound by these Terms, as well as our{" "}
          <Link href="/privacy" className="text-kita-green font-semibold underline-offset-4 hover:underline">
            Privacy Policy
          </Link>{" "}
          and the official Student Handbook of Luis Y. Ferrer Jr. Senior High School. If you do not agree to these terms in their entirety, you must discontinue your use of the platform immediately. Continued use of the platform constitutes your unreserved acceptance of any revisions made to these terms.
        </p>
      </section>

      {/* 2. Eligibility */}
      <section id="eligibility" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 02</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            2. Eligibility & Community Access
          </h2>
        </div>
        <p>
          SHOP LYNK is exclusively dedicated to fostering entrepreneurship within the academic ecosystem of Luis Y. Ferrer Jr. Senior High School located in General Trias, Cavite. To register and maintain an active account, you must be a currently enrolled student, a recognized faculty member, an administrative staff member, or an accredited student organization representative of the school.
        </p>
        <p>
          Users must provide accurate, complete, and verifiable registration credentials upon signing up, including your full legal name, student Learner Reference Number (LRN) or faculty identifier, and school email address. You must also possess the capacity under Philippine law and school guidelines to participate in peer-to-peer commerce, without having been previously suspended or disqualified from campus entrepreneurial activities.
        </p>
      </section>

      {/* 3. Accounts */}
      <section id="accounts" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 03</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            3. Account Registration & Security
          </h2>
        </div>
        <p>
          When you create an account on SHOP LYNK, you assume full responsibility for safeguarding your login credentials and maintaining the confidentiality of your session tokens. You agree to use your authentic personal identity at all times, as impersonating another student, teacher, school official, or external business is strictly prohibited and subject to immediate disciplinary referral.
        </p>
        <p>
          Each community member is permitted one primary personal account. Creating multiple duplicate accounts to bypass sanctions, manipulate seller ratings, or fabricate promotional engagement is disallowed. In the event of any unauthorized access, suspicious activity, or compromise of your credentials, you must notify campus platform administrators immediately.
        </p>
      </section>

      {/* 4. Seller Rules */}
      <section id="seller-rules" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 04</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            4. Student & Faculty Seller Rules
          </h2>
        </div>
        <p>
          Student entrepreneurs and faculty creators represent the core of SHOP LYNK. All sellers agree to present product listings with total accuracy, ensuring titles, descriptions, item conditions, and photographs truthfully depict the actual items offered for sale. Misleading descriptions or using deceptive stock photos for secondhand campus goods is strictly prohibited.
        </p>
        <p>
          Prices must be clearly stated in Philippine Pesos (PHP) and represent the complete transaction amount, with no hidden surcharges or post-order markups. Sellers offering homemade pastries, refreshments, or meals must practice sanitary food handling standards, clearly indicate known allergens such as nuts or dairy, and adhere to school canteen health guidelines. Furthermore, sellers must promptly respond to buyer communications and arrive on time for scheduled on-campus order handovers.
        </p>
      </section>

      {/* 5. Permitted & Prohibited Items */}
      <section id="permitted-prohibited" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 05</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            5. Permitted & Prohibited Items
          </h2>
        </div>
        <p>
          Permitted items on the platform include academic materials, pre-loved textbooks, reviewers, art supplies, clean school uniforms, physical education shirts, student club apparel, handcrafted accessories, crochet items, custom stickers, approved snacks and beverages, and peer services such as graphic design, document printing, and tutoring.
        </p>
        <p>
          In strict compliance with Department of Education (DepEd) orders, Philippine national laws, and the school handbook, prohibited items include completed academic assignments, test answers, exam leakages, ghostwritten essays, tobacco products, e-cigarettes, vapes, alcoholic beverages, knives, cutters, pyrotechnics, weapons, counterfeit goods, pirated materials, adult explicit media, and stolen campus property. Listing any prohibited item will trigger immediate listing removal, account suspension, and formal referral to the Prefect of Discipline.
        </p>
      </section>

      {/* 6. Campus Meetups */}
      <section id="campus-meetups" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 06</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            6. Campus Meetups & Transactions
          </h2>
        </div>
        <p>
          Because SHOP LYNK serves our localized school campus, physical product handovers and fulfillments take place within designated, well-lit school areas. Recommended handover points include the School Canteen, the Main Quadrangle, the Senior High Building Atrium, and the Main Library Lobby during scheduled recess, lunch breaks, and dismissal periods.
        </p>
        <p>
          Transactions and handovers must never disrupt instructional classroom hours or examination sessions. Buyers are encouraged to inspect physical merchandise thoroughly before completing handovers and payment. Meeting in isolated, unmonitored, or restricted campus areas after school hours is strictly prohibited to ensure maximum student safety.
        </p>
      </section>

      {/* 7. Pricing & Payments */}
      <section id="fees-payments" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 07</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            7. Pricing, Fees & Payments
          </h2>
        </div>
        <p>
          SHOP LYNK is committed to supporting young entrepreneurs and student initiatives without imposing financial barriers. Listing products and creating a digital storefront on the platform is completely free of charge, with zero listing fees or storefront commissions.
        </p>
        <p>
          Payments are settled directly peer-to-peer through cash upon physical meetup, GCash, Maya, or bank transfer as mutually agreed between the buyer and seller. The platform facilitates order coordination and record-keeping but does not custody user fiat balances. Sellers are responsible for confirming receipt of payment before releasing goods to buyers.
        </p>
      </section>

      {/* 8. User Conduct */}
      <section id="conduct" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 08</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            8. User Conduct & Community Standards
          </h2>
        </div>
        <p>
          All users must uphold a respectful, honest, and supportive school environment. You agree not to harass, intimidate, demean, or send abusive communications to any fellow student, teacher, or staff member. You also agree not to publish profane, defamatory, or discriminatory content in reviews, product listings, or direct messages.
        </p>
        <p>
          Scamming, deliberately defaulting on orders, engaging in unfair price gouging during school events or emergencies, and manipulating ratings through fabricated reviews are strictly forbidden. Users must not attempt to exploit, reverse engineer, compromise, or disrupt the platform’s technical infrastructure.
        </p>
      </section>

      {/* 9. Intellectual Property */}
      <section id="intellectual-property" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 09</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            9. Intellectual Property
          </h2>
        </div>
        <p>
          All branding assets, software code, graphic interfaces, logos, and platform materials belonging to SHOP LYNK remain the exclusive intellectual property of the platform developers and the school administration.
        </p>
        <p>
          Users retain full intellectual ownership of their original product photographs, creative designs, artwork, and descriptions uploaded to their storefronts. By submitting content to the platform, you grant SHOP LYNK a non-exclusive, royalty-free license to display such materials for catalog, indexing, and internal promotional purposes.
        </p>
      </section>

      {/* 10. Disputes */}
      <section id="disputes" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 10</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            10. Disputes & Campus Mediation
          </h2>
        </div>
        <p>
          In the event of a commercial disagreement—such as defective goods, missing items, or unfulfilled orders—buyers and sellers should first attempt to resolve the matter directly in good faith through respectful communication, replacement, or refund.
        </p>
        <p>
          If an issue remains unresolved, either party may escalate the dispute to the platform administrative support team with supporting documentation. For severe infractions involving fraud, theft, or serious behavioral misconduct, platform administrators together with LYFJSHS faculty advisers and the Guidance Office will mediate the matter in accordance with institutional disciplinary procedures.
        </p>
      </section>

      {/* 11. Liability */}
      <section id="liability" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 11</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            11. Disclaimer & Limitation of Liability
          </h2>
        </div>
        <p>
          SHOP LYNK is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While platform administrators actively enforce verification policies and community guidelines, the platform does not directly manufacture, physically store, or independently inspect every item listed by peer sellers.
        </p>
        <p>
          To the maximum extent permitted by applicable Philippine laws, SHOP LYNK, its student developers, faculty mentors, and school administrators disclaim liability for indirect, incidental, or consequential damages arising from peer-to-peer transactions, product defects, or interpersonal disputes outside the direct control of the software platform.
        </p>
      </section>

      {/* 12. Termination */}
      <section id="termination" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 12</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            12. Account Suspension & Termination
          </h2>
        </div>
        <p>
          We reserve the right to temporarily suspend or permanently terminate user accounts, deactivate listings, or restrict platform access if a user violates these Terms, engages in deceptive conduct, or creates an unsafe campus environment.
        </p>
        <p>
          Accounts belonging to students who have graduated or transferred from Luis Y. Ferrer Jr. Senior High School will be transitioned to inactive or closed status upon formal administrative review or personal request.
        </p>
      </section>

      {/* 13. Changes to Terms */}
      <section id="updates" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 13</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            13. Changes to Terms
          </h2>
        </div>
        <p>
          We may update these Terms periodically to incorporate new platform features, school policy revisions, or legislative requirements. When significant changes occur, we will update the revision date and issue an announcement via the student portal or school communication channels. Continued use of SHOP LYNK following any updates signifies your agreement to the modified terms.
        </p>
      </section>

      {/* 14. Contact */}
      <section id="contact" className="scroll-mt-28 space-y-4">
        <div className="border-b border-line pb-2">
          <span className="eyebrow text-kita-green font-mono text-xs">Section 14</span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
            14. Contact & School Administration
          </h2>
        </div>
        <p>
          For inquiries, feedback, or administrative support regarding these Terms of Service, you may contact the SHOP LYNK Administrative Committee and Campus Support at <strong>support@projectkita.edu.ph</strong>, or visit the Administration Office located on the second floor of the Luis Y. Ferrer Jr. Senior High School campus in General Trias City, Cavite during regular school hours from Monday to Friday, 7:30 AM to 5:00 PM.
        </p>
      </section>
    </div>
  );
}
