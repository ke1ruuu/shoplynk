import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const AUTH_COOKIE_NAME = "kita_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

const AUTH_SECRET =
  process.env.AUTH_SECRET ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "projectkita-secure-session-signing-key-default-v2";

export interface SessionUser {
  id: string;
  email: string;
  full_name: string;
  role: "BUYER" | "SELLER" | "CAMPUS_ADMIN" | "PLATFORM_ADMIN";
  user_metadata?: {
    full_name?: string;
  };
}

interface SessionPayload {
  id: string;
  email: string;
  full_name: string;
  role: "BUYER" | "SELLER" | "CAMPUS_ADMIN" | "PLATFORM_ADMIN";
  exp: number; // Unix timestamp in seconds
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf8");
}

function sign(data: string): string {
  return createHmac("sha256", AUTH_SECRET).update(data).digest("base64url");
}

/**
 * Creates a signed stateless session token.
 */
export function createSessionToken(user: Omit<SessionPayload, "exp">): string {
  const payload: SessionPayload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };

  const payloadStr = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(payloadStr);
  return `${payloadStr}.${signature}`;
}

/**
 * Verifies a session token string.
 */
export function verifySessionToken(token: string): SessionUser | null {
  try {
    if (!token || !token.includes(".")) {
      return null;
    }

    const [payloadStr, signature] = token.split(".");
    if (!payloadStr || !signature) {
      return null;
    }

    const expectedSignature = sign(payloadStr);
    const sigBuffer = Buffer.from(signature);
    const expSigBuffer = Buffer.from(expectedSignature);

    if (
      sigBuffer.length !== expSigBuffer.length ||
      !timingSafeEqual(sigBuffer, expSigBuffer)
    ) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(base64UrlDecode(payloadStr));

    // Check expiration
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      id: payload.id,
      email: payload.email,
      full_name: payload.full_name,
      role: payload.role,
      user_metadata: {
        full_name: payload.full_name,
      },
    };
  } catch {
    return null;
  }
}

/**
 * Sets the session cookie in response headers using Next.js cookies()
 */
export async function setSessionCookie(user: Omit<SessionPayload, "exp">) {
  const token = createSessionToken(user);
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/**
 * Clears the session cookie
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

/**
 * Gets the current authenticated session user from cookies (Server Components / Server Actions).
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Retrieves the full profile from the profiles table for the current session user.
 */
export async function getCurrentUserProfile() {
  const user = await getCurrentUser();
  if (!user) return { user: null, profile: null };

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  // If profile is missing from DB table, synthesize a safe profile from valid session user
  const effectiveProfile = profile || {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    avatar_url: null,
    is_verified_seller: user.role === "SELLER",
  };

  if (profile && profile.role && profile.role !== user.role) {
    user.role = profile.role;
    try {
      await setSessionCookie({
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: profile.role,
      });
    } catch {
      // Safe to ignore in Server Component render
    }
  }

  return { user, profile: effectiveProfile };
}

/**
 * Extracts and verifies session user directly from NextRequest (for proxy.ts).
 */
export function getSessionFromRequest(request: NextRequest): SessionUser | null {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
