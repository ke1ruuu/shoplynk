import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — LYNK",
  description:
    "Learn how LYNK collects, protects, and manages student data in compliance with the Philippine Data Privacy Act of 2012 (RA 10173) for Luis Y. Ferrer Jr. Senior High School.",
  openGraph: {
    title: "Privacy Policy — LYNK",
    description:
      "Student data privacy protection under Philippine RA 10173 for the Luis Y. Ferrer Jr. Senior High School community.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <LegalShell initialTab="privacy" />;
}
