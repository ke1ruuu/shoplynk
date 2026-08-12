# External Integrations

**Analysis Date:** 2026-08-12

> Current state: this is an **early-stage, frontend-only** Next.js 16.3.0 project. It renders a static marketing/landing experience with hardcoded sample data. There is **no backend, database, authentication, or payment integration wired yet**. The only live external dependency is a third-party image CDN (Unsplash) for placeholder imagery. Sections below record what exists today; most categories are intentionally "None (planned)" against the roadmap implied by `docs/DESIGN_SYSTEM.md`.

## APIs & External Services

**Image CDN (placeholder content):**
- Unsplash (`images.unsplash.com`) - Serves demo product and testimonial photos on the landing page.
  - SDK/Client: None. Plain image URLs consumed via `next/image`; host allow-listed in `next.config.ts` (`images.remotePatterns` → `https://images.unsplash.com`).
  - Auth: None (public image URLs, no API key).
  - Usage sites: `components/landing/hero-section.tsx`, `components/landing/marketplace-section.tsx`, `components/landing/testimonials-section.tsx`, `components/landing/for-sellers-section.tsx`.
  - Note: Unsplash is a placeholder per `docs/DESIGN_SYSTEM.md` §29, which calls for authentic student/campus imagery over stock photos. Expect these to be replaced by first-party uploads.

No other external APIs, SDKs, or service clients are integrated (no `fetch()` to external hosts, no `axios`, no vendor SDK imports in `app/`, `components/`, `lib/`, `hooks/`).

## Data Storage

**Databases:**
- None. No ORM/DB client (`prisma`, `mongoose`, `drizzle`, `@supabase/*`, `pg`, `mysql`) in `package.json`; no connection code or `process.env` DB references in source.
- All displayed data is hardcoded in component files (e.g. product arrays in `components/landing/marketplace-section.tsx`, testimonial arrays in `components/landing/testimonials-section.tsx`).

**File Storage:**
- Local filesystem only. Static assets in `public/` (`lyfjshs-logo.png`, plus create-next-app default SVGs). No object storage (S3, Cloudinary, UploadThing, Supabase Storage) integrated.

**Caching:**
- None beyond Next.js built-in framework caching (App Router / `next/image` optimization). No Redis/Upstash/other cache client.

## Authentication & Identity

**Auth Provider:**
- None. No auth library (`next-auth`/`@auth/*`, `@clerk/*`, `@supabase/auth`, Lucia) present; no session, middleware, or login/route-guard code.
- Roadmap signal: `docs/DESIGN_SYSTEM.md` describes "Verified Student Seller" / "Verified Faculty Seller" identity concepts (§§12–13) and role-based navigation for buyers/sellers/admins (§10), implying an auth + verification system will be needed. Currently rendered only as a presentational `components/common/verification-badge.tsx`.

## Monitoring & Observability

**Error Tracking:**
- None. No Sentry / Bugsnag / Datadog SDK.

**Logs:**
- None configured. No structured logger; relies on default Next.js/console output.

## CI/CD & Deployment

**Hosting:**
- Vercel (implied, not yet configured). Evidence: create-next-app scaffolding, `public/vercel.svg`, `.gitignore` `.vercel` entry, and `README.md` Vercel deployment section. No `vercel.json` committed.

**CI Pipeline:**
- None. No `.github/workflows/`, no `Dockerfile`, no `netlify.toml`. Quality gate is local `eslint` (`bun run lint`) only.

## Environment Configuration

**Required env vars:**
- None detected. No `process.env.*` usage in application code; no `.env*` files committed. The app runs without any configured secrets today.

**Secrets location:**
- N/A currently. `.gitignore` ignores `.env*` (opt-in commit only). When integrations are added, follow this convention and never commit secret values.

## Webhooks & Callbacks

**Incoming:**
- None. No API route handlers or webhook endpoints exist (`app/` contains only `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico` — no `route.ts` / `api/`).

**Outgoing:**
- None. No outbound webhook or callback dispatch code.

---

*Integration audit: 2026-08-12*
