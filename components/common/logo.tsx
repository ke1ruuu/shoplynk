import React from "react";
import Link from "next/link";

interface LogoProps {
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  className?: string;
}

export function Logo({
  showTagline = true,
  size = "md",
  tone = "light",
  className = "",
}: LogoProps) {
  const markSizes = {
    sm: "w-8 h-8 text-base rounded-lg",
    md: "w-10 h-10 text-lg rounded-xl",
    lg: "w-12 h-12 text-2xl rounded-xl",
  };

  const titleSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const titleColor =
    tone === "dark"
      ? "text-paper group-hover:text-spark"
      : "text-ink group-hover:text-kita-green";
  const taglineColor = tone === "dark" ? "text-paper/60" : "text-muted";

  return (
    <Link
      href="/"
      aria-label="Project Kita — home"
      className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}
    >
      <div
        className={`${markSizes[size]} bg-kita-green text-white font-display flex items-center justify-center shadow-flyer transition-transform duration-200 group-hover:-rotate-6 relative flex-shrink-0`}
      >
        <span className="font-extrabold tracking-tighter leading-none">K</span>
        {/* Gold pushpin spark — the bulletin-board signature */}
        <span className="pin -top-1.5 -right-1.5" aria-hidden="true" />
      </div>

      <div className="flex flex-col justify-center leading-none">
        <span
          className={`${titleSizes[size]} font-display font-extrabold tracking-tight transition-colors ${titleColor}`}
        >
          Project Kita
        </span>
        {showTagline && (
          <span className={`eyebrow mt-1 text-[0.6rem] tracking-[0.14em] ${taglineColor}`}>
            Empower · Sell · Earn
          </span>
        )}
      </div>
    </Link>
  );
}
