# Phase 1: Foundation & Authenticated Shell - Context

**Gathered:** 2026-08-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 makes the frontend-only scaffold real: integrate Supabase (Auth + Postgres + Storage) with the authoritative schema, RLS, seed data, and storage buckets, then deliver **campus-gated authentication** so a community member can sign up → confirm email → log in → land in a private **authenticated shell**.

**In scope:** BACK-01…05 (Supabase server client + env config, apply authoritative schema, RLS on every table, storage buckets with correct privacy, seed LYFJSHS + 5 categories), AUTH-01…08 (email/password signup, email confirmation, auto-provisioned BUYER profile + cart via `handle_new_user`, persistent login, logout, password reset, campus-gating, role-aware surfaces), CAMP-01/02 (campus scoping + LYFJSHS as sole active campus), UI-05 (all new UI on `app/globals.css` tokens + lucide, mobile-first).

**Explicitly NOT in this phase:** seller verification (Phase 2), stores/products (Phase 2), discovery/cart/orders (Phase 3), payments/fulfillment (Phase 4), reviews/notifications (Phase 5), admin/moderation (Phase 6). The authenticated shell is a **placeholder** — no live marketplace yet.
</domain>

<decisions>
## Implementation Decisions

### Schema & Migrations
- **D-01:** The authoritative `0001_initial_schema.sql` (4-role enum, 15 tables, `handle_new_user` + `update_store_rating` triggers, RLS baseline) is **supplied by the user and applied VERBATIM** — no reconstruction from docs, no schema edits. ⚠️ **HARD DEPENDENCY / BLOCKER:** the `.sql` file is NOT yet in the repo. BACK-02/03 work cannot begin until the user commits it. Downstream must treat this file as the single source of truth for the data model.
- **D-02:** Migration workflow is **Supabase Dashboard SQL editor + commit the `.sql` as the record of truth** — no Supabase CLI, no Docker, no local `supabase/` migrations tooling. All schema/RLS/bucket/seed changes ship as committed `.sql` files that a human runs in the dashboard. — **Reversibility:** costly — adopting CLI-managed migrations later requires baselining the already-applied schema and reconciling drift between the committed `.sql` and the live DB.
- **D-03:** "DB applied" is a **manual, human verification step** — the agent authors SQL and commits it but cannot execute it against Supabase. Any task whose success depends on the live DB (auth trigger firing, RLS behavior) must include an explicit manual-apply checkpoint, not assume the DB is live.
- **D-04:** RLS approach is **baseline + full audit**: apply the migration's RLS baseline, then audit **all 15 tables** for (a) RLS enabled and (b) correct buyer/seller/admin access boundaries; add any missing policies and commit them as additional SQL.
- **D-05:** Seed data and storage buckets are **all defined as committed SQL** run via the dashboard: seed **LYFJSHS as the sole active campus** (override the "UP Diliman" placeholder in the migration) + the **5 categories** (Food & Drinks, Handmade Crafts, Student Merchandise, School & Stationery, Lifestyle Goods); define **4 storage buckets** with access policies.
- **D-06:** Bucket privacy: **verification IDs and payment receipts = PRIVATE; product images and store logos/banners = PUBLIC.** — **Reversibility:** one-way — shipping the ID/receipt buckets public would expose student ID images and payment receipts (PII); once served over public URLs they may be cached/indexed and cannot be truly un-published. Planner should checkpoint before bucket creation. (Note: only product/store image buckets are exercised by UI in Phase 1; verification/receipt buckets are created now but consumed in Phases 2/4.)

### Auth Wiring & Session
- **D-07:** Authentication runs through **Next.js Server Actions** backed by a **server-side `@supabase/ssr` client** that sets session cookies. The existing forms adopt `useActionState` for pending/error states. No client-side Supabase auth calls. — **Reversibility:** costly — switching invocation style later touches every auth form, the server client, and cookie/session handling in middleware. Never place the service-role key or secrets in `"use client"` code.
- **D-08:** Add **zod**. Validation schemas are **shared** between the client form and the server action; the server always re-validates. Replaces the hand-rolled `EMAIL_RE` checks currently in the forms.
- **D-09:** Email confirmation → **auto sign-in**: the confirm-link callback (e.g. `/auth/confirm`) exchanges the code, establishes the session, and drops the user directly into the authenticated shell. Signup itself shows a **"check your email"** state (adapt the form's existing `done` state).
- **D-10:** Sessions are **always-persistent**: cookie sessions persist and auto-refresh via **`middleware.ts`** (satisfies AUTH-04). The **"Keep me logged in" checkbox becomes cosmetic/always-on**. Logout = a `signOut()` **server action available on every page**. Password reset (`/forgot-password` + `/reset-password`, AUTH-06) reuses the same callback/session-exchange pattern.

### Signup Shape vs Schema
- **D-11:** Keep the **buyer/seller toggle as intent only** — signup **always provisions a BUYER** via `handle_new_user`. Choosing "seller" only adjusts copy and nudges toward seller verification (Phase 2); it never creates a seller account. Preserves the landing page's `?type=seller` funnel honestly.
- **D-12:** **Remove the student/faculty role toggle** → student-only signup. Faculty verification is out of scope and the schema's verification fields (`program`, `year_level`) are student-only, so a faculty option would be misleading dead UI.
- **D-13:** **No hard email-domain restriction** — accept any email; keep the "use your LYFJSHS email" text as **soft guidance only**. Trust comes from email confirmation + Phase 2 ID verification; a senior-high may not issue emails to every student, so a domain lock risks blocking real students. LYFJSHS is still auto-assigned by the trigger regardless of email.
- **D-14:** **Remove the Google OAuth buttons** and the "or" dividers from both login and signup forms. Email/password is the spec (AUTH-01); no OAuth provider is in scope. (Social login → Deferred Ideas.)

### Gating & Landing Shell
- **D-15:** Campus-gating protects the **authenticated app routes only**; the **marketing landing page (`/`) stays public** as the signup front door, including its existing sample marketplace *preview* (which is marketing, not real data). Unauthenticated hits on gated routes redirect to `/login`. RLS is the true data boundary — gating here is routing/UX.
- **D-16:** Gate enforcement = **middleware + layout guard**: extend `middleware.ts` (already handling session refresh) to redirect unauthenticated requests on gated paths to `/login` (matcher-based), plus a server-side `getUser()` check in the gated route-group layout as defense-in-depth.
- **D-17:** A logged-in member lands on a **placeholder authenticated shell** — real app chrome (header with logo, **LYFJSHS campus indicator**, user menu with profile stub + logout) and a body that clearly states the marketplace is **coming soon**. Proves gating + persistent session + logout end-to-end. **No mock/sample data inside the authenticated app** (keeps the mock-vs-live boundary clean for Phase 3 to replace).
- **D-18:** Role-awareness ships as **minimal role scaffolding** (AUTH-08): a server-side role helper (e.g. `getSessionUser` / `requireRole`) reads the member's role; the shell conditionally renders entry points — a "Become a verified seller" CTA for BUYERs and "coming soon" Seller/Admin areas for those roles. Establishes the role-reading pattern that Phase 2/6 build on, **without** building real seller/admin features.

### Claude's Discretion
The user selected concrete options for every question (no "you decide"), but the following are left to research/planning by nature — decide per codebase conventions and the Next.js 16.3 docs:
- Exact folder/file layout for Supabase clients (e.g. `lib/supabase/server.ts`, `lib/supabase/client.ts`, `lib/supabase/middleware.ts`), zod schema location, and server-action file placement.
- Exact route paths/names for the authenticated shell landing and the confirm/reset callbacks.
- Where SQL files live in the repo (e.g. a `supabase/` or `db/` directory) — as long as they are committed as the record of truth per D-02.
- How much of the existing `signup-form.tsx` / `login-form.tsx` to refactor vs. rewrite when wiring Server Actions.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Data model (authoritative — apply verbatim)
- `0001_initial_schema.sql` — **user-provided; NOT yet in the repo (hard dependency/blocker).** 4-role enum (BUYER/SELLER/CAMPUS_ADMIN/PLATFORM_ADMIN), 15 tables, `handle_new_user` (auto-provisions BUYER profile + empty cart on signup, assigns campus) and `update_store_rating` triggers, and the RLS baseline. Single source of truth for the schema — never reconstruct or edit.

### Project & requirements
- `.planning/PROJECT.md` — product definition, constraints, Key Decisions (schema authoritative, LYFJSHS sole active campus, manual payments, campus-gated, tokens win over design doc).
- `.planning/REQUIREMENTS.md` — Phase 1 requirements BACK-01…05, AUTH-01…08, CAMP-01/02, UI-05 (and the Out-of-Scope table: faculty verification, payment gateway, etc.).
- `.planning/ROADMAP.md` §"Phase 1: Foundation & Authenticated Shell" — goal + 5 success criteria.

### Framework (non-standard release — mandatory)
- `node_modules/next/dist/docs/` — Next.js **16.3** API reference. Consult before writing any routing/layout/metadata/middleware/route-handler/Server-Action/font/image code. **Do not rely on memorized Next.js APIs** (this version has breaking changes). Relevant areas: App Router route handlers, middleware, Server Actions, `async` `searchParams`/`cookies`.
- `AGENTS.md` / `.claude/CLAUDE.md` — repo conventions + the Next.js 16.3 caveat.

### Design (implemented tokens are source of truth)
- `app/globals.css` — implemented design tokens (kita-green `#0C6B4E`, spark `#F2B32C`, paper `#F4F3EA`, ink `#16241D`), three-font system, component utilities (`.eyebrow`, `.tabular`, `.marker`, `.shadow-flyer`, `.pin`, `.bg-corkboard`). **Wins over the design doc where they differ.**
- `docs/DESIGN_SYSTEM.md` — product/UX intent (§15 Forms, §19 Feedback States for error/empty/loading patterns). Note: its category set and font (Inter) diverge from what's implemented — implemented wins.

### Codebase maps
- `.planning/codebase/STACK.md` — full toolchain (Next 16.3, React 19.2.8, Tailwind v4, shadcn/base-ui, bun 1.3.11).
- `.planning/codebase/INTEGRATIONS.md` — current integration surface (no backend yet; `next.config.ts` remotePatterns).
- `.planning/codebase/ARCHITECTURE.md` — layering (route → section → common → ui), server-first rendering.
- `.planning/codebase/CONVENTIONS.md` — naming, dialects, import organization, server/client boundary rules.
- `.planning/codebase/STRUCTURE.md` — directory layout.
- `.planning/codebase/CONCERNS.md` — known concerns (inlined sample data, token/doc divergence).
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Auth UI scaffold already built (untracked):** `app/(auth)/layout.tsx` (split-screen shell: `AuthBrandPanel` + form column, `bg-paper`, footer), `app/(auth)/login/page.tsx`, `app/(auth)/signup/page.tsx` (async, reads `?type=seller|buyer` via `await searchParams`).
- **Auth form components:** `components/auth/login-form.tsx`, `components/auth/signup-form.tsx`, `account-type-toggle.tsx`, `role-toggle.tsx` (to be removed per D-12), `password-field.tsx`, `auth-brand-panel.tsx`, `shared.tsx` (SubmitButton / GoogleButton / OrDivider / FieldError — GoogleButton + OrDivider drop out per D-14).
- **Domain components:** `components/common/logo.tsx` (use in shell header), `verification-badge.tsx` (Phase 2, but exists), `product-card.tsx`.
- **Helpers:** `lib/utils.ts` (`cn()`), `hooks/use-mobile.ts` (`useIsMobile`, 768px). 61 shadcn/base-ui primitives in `components/ui/` (button, input, dropdown-menu, avatar, etc.) available for the shell + forms.

### Established Patterns
- **Forms today are client-only mocks:** `"use client"` + local `useState` validation + `EMAIL_RE` regex + `await new Promise(r => setTimeout(r, 900))` fake success + a `done` state ("Demo — no backend connected yet."). These are the exact wiring points — replace the fake success with Server Actions (D-07), `EMAIL_RE` with zod (D-08), and the `done` state becomes "check your email" (D-09).
- **Conventions (enforce for all new code):** files kebab-case; components PascalCase **named** exports; `@/*` path alias; server components by default, `"use client"` only on interactive leaves; design tokens via Tailwind utilities (never hardcode hex); lucide-react icons only; 2-space indent, double quotes, semicolons.
- **No data/error/loading infrastructure exists yet** — introduce explicit error/empty/loading states per `docs/DESIGN_SYSTEM.md` §19 as auth logic lands.

### Integration Points (new code connects here)
- **Supabase clients (new):** server client + browser client + middleware helper via `@supabase/ssr` (not yet a dependency — add `@supabase/ssr` + `@supabase/supabase-js`). No secrets in client code.
- **`middleware.ts` (new, repo root):** session refresh + matcher-based gating redirect (D-10, D-16).
- **Server actions (new):** signup / login / logout / password-reset actions wired into the existing forms via `useActionState` (D-07).
- **Auth callback route handler (new):** e.g. `app/auth/confirm/route.ts` for confirm + reset link exchange (D-09, D-10).
- **Env config (new):** `.env.local` (gitignored) + committed `.env.example` for Supabase URL + anon key (BACK-01).
- **`next.config.ts`:** add the Supabase Storage host to `images.remotePatterns` when public product/store images are rendered (currently only `images.unsplash.com` is allowlisted).
- **Committed SQL (new):** schema (user-provided), RLS additions, seed (LYFJSHS + categories), bucket definitions + policies (D-01…06).
</code_context>

<specifics>
## Specific Ideas
- Signup success copy shifts from the demo "done" state to a **"check your email to confirm"** state; the confirm link then auto-signs-in (D-09).
- The buyer/seller toggle **stays visible** but is **cosmetic intent** — must not imply a seller account is created (D-11). The `?type=seller` deep-link from the landing page keeps working.
- The **"Keep me logged in"** checkbox stays visible but is **cosmetic/always-on** (D-10).
- The **authenticated shell shows no mock data** — a real header (logo + LYFJSHS indicator + user menu/logout) over a "marketplace coming soon" body (D-17).
- LYFJSHS lives in **Gen. Trias, Cavite** (per the existing auth layout footer) — use for campus-indicator copy.
</specifics>

<deferred>
## Deferred Ideas
- **Social login (Google OAuth)** for signup/login — not in the email/password spec (AUTH-01); adds provider setup, consent screen, and redirect-callback scope, and complicates the confirm-link flow. Revisit in a later phase. (Buttons removed now per D-14.)
- No scope-creep items arose otherwise — discussion stayed within Phase 1 boundary.
</deferred>

---

*Phase: 1-foundation-authenticated-shell*
*Context gathered: 2026-08-12*
