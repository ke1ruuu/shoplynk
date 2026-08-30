import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  className?: string;
  href?: string;
}

export function Logo({
  size = "md",
  className = "",
  href = "/",
}: LogoProps) {
  // Standard, prominent logo sizing: sm = 36px, md = 46px, lg = 58px
  const sizeClasses = {
    sm: "h-9 w-auto",
    md: "h-11 sm:h-12 w-auto",
    lg: "h-14 sm:h-16 w-auto",
  };

  const imageDimensions = {
    sm: { width: 50, height: 36 },
    md: { width: 66, height: 48 },
    lg: { width: 88, height: 64 },
  };

  return (
    <Link
      href={href}
      aria-label="LYNK — home"
      className={`inline-flex items-center group cursor-pointer transition-transform duration-200 hover:scale-[1.03] ${className}`}
    >
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        <Image
          src="/LYNKICON.png"
          alt="LYNK Logo"
          width={imageDimensions[size].width}
          height={imageDimensions[size].height}
          className="h-full w-auto object-contain drop-shadow-sm"
          priority
        />
      </div>
    </Link>
  );
}
