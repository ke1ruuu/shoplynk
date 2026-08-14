import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Set New Password — Project Kita",
  description: "Update your Project Kita account password.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
