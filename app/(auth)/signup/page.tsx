import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import type { AccountType } from "@/components/auth/account-type-toggle";

export const metadata: Metadata = {
  title: "Sign up — LYNK",
  description:
    "Create your LYNK account and start buying or selling within your school community.",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const defaultType: AccountType = type === "seller" ? "seller" : "buyer";

  return <SignupForm defaultType={defaultType} />;
}
