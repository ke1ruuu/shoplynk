import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { AuthBrandPanel } from "@/components/auth/auth-brand-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <AuthBrandPanel />

      {/* Form column */}
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          {/* Logo shown on small screens; the brand panel carries it on lg+ */}
          <div className="lg:hidden">
            <Logo size="sm" showTagline={false} />
          </div>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        <main className="flex flex-1 items-center justify-center px-5 py-6 sm:px-8">
          <div className="w-full max-w-md">{children}</div>
        </main>

        <footer className="px-5 py-6 text-center sm:px-8">
          <p className="text-xs text-muted">
            © 2026 LYNK · Gen. Trias, Cavite
          </p>
        </footer>
      </div>
    </div>
  );
}
