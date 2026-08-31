import { NextResponse, type NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/session";

/**
 * Next.js 16 Proxy handler for session verification & campus-gated route access.
 */
export async function proxy(request: NextRequest) {
  const user = getSessionFromRequest(request);
  const { pathname } = request.nextUrl;

  const isAdmin = user?.role === "CAMPUS_ADMIN" || user?.role === "PLATFORM_ADMIN";

  // Dedicated Admin Login Route
  const isAdminLoginRoute = pathname === "/admin/login";

  // Protected Admin Console routes
  const isAdminGatedRoute = pathname.startsWith("/admin") && !isAdminLoginRoute;

  // General Gated route prefixes (buyer/seller protected shell)
  const isStudentGatedRoute =
    pathname.startsWith("/protected") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/seller") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/cart");

  // Student Auth-only public routes (login/signup)
  const isStudentAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password");

  // 1. Unauthenticated user visiting Admin Console -> redirect to dedicated Admin Login
  if (!user && isAdminGatedRoute) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 2. Unauthenticated user visiting student gated area -> redirect to Student Login
  if (!user && isStudentGatedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Unauthenticated user visiting /admin/login -> allow access
  if (!user && isAdminLoginRoute) {
    return NextResponse.next();
  }

  // 4. Authenticated Admin visiting login pages or student routes -> redirect to Admin Console
  if (user && isAdmin) {
    if (isAdminLoginRoute || isStudentAuthRoute || isStudentGatedRoute || pathname === "/") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // 5. Authenticated Student (Buyer/Seller) visiting Admin routes, auth routes, or landing root -> redirect to Student Dashboard
  if (user && !isAdmin) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }
    if (isStudentAuthRoute || pathname === "/") {
      return NextResponse.redirect(new URL("/protected", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (*.png, *.svg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
