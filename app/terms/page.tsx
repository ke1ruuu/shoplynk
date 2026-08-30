import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Terms of Service — LYNK",
  description:
    "Terms and conditions, seller policies, and community guidelines for trading within the Luis Y. Ferrer Jr. Senior High School campus marketplace on LYNK.",
  openGraph: {
    title: "Terms of Service — LYNK",
    description:
      "Terms and conditions, seller policies, and community guidelines for Luis Y. Ferrer Jr. Senior High School.",
    type: "website",
  },
};

export default function TermsPage() {
  return <LegalShell initialTab="terms" />;
}
