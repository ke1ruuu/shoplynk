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
  tone = "light",
  className = "",
  href = "/",
}: LogoProps) {
  // Prominent, generous logo sizing: sm = 42px, md = 56px, lg = 72px
  const sizeClasses = {
    sm: "h-10 sm:h-11 w-auto",
    md: "h-13 sm:h-15 w-auto",
    lg: "h-16 sm:h-20 w-auto",
  };

  const imageDimensions = {
    sm: { width: 62, height: 44 },
    md: { width: 84, height: 60 },
    lg: { width: 112, height: 80 },
  };

  const logoSrc = tone === "dark" ? "/WHITE.png" : "/LYNKICON.png";

  return (
    <Link
      href={href}
      aria-label="LYNK — home"
      className={`inline-flex items-center group cursor-pointer transition-transform duration-200 hover:scale-[1.03] ${className}`}
    >
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        <Image
          src={logoSrc}
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
