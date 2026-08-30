import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Set New Password — LYNK",
  description: "Update your LYNK account password.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
