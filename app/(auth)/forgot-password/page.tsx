import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password — Project Kita",
  description: "Reset your Project Kita account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
