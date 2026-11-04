import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely validate whether a given string is a valid image URL for Next.js Image or <img>.
 * Supports:
 * - base64 Data URLs (data:image/...)
 * - Internal paths starting with / (e.g. /images/...)
 * - Valid absolute HTTP/HTTPS URLs with valid hostnames
 */
export function isValidImageUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed) return false;

  // Base64 data URLs
  if (trimmed.startsWith("data:image/")) return true;

  // Internal relative assets starting with slash (not protocol-relative //)
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return true;

  // Absolute HTTP/HTTPS URLs
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsed = new URL(trimmed);
      return Boolean(
        parsed.hostname &&
        (parsed.hostname.includes(".") || parsed.hostname === "localhost")
      );
    } catch {
      return false;
    }
  }

  return false;
}
