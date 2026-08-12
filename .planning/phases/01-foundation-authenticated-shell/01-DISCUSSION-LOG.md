# Phase 1: Foundation & Authenticated Shell - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-12
**Phase:** 1-foundation-authenticated-shell
**Areas discussed:** Schema & migrations, Auth wiring & session, Signup shape vs schema, Gating & landing shell

---

## Schema & migrations

**Q1 — Where does the authoritative schema DDL come from?**

| Option | Description | Selected |
|--------|-------------|----------|
| I'll add the .sql file | User commits the real `0001_initial_schema.sql`; applied verbatim | ✓ |
| Reconstruct from docs | Rebuild the schema from the .planning descriptions | |
| Already in Supabase | Schema already lives in the hosted project | |

**User's choice:** I'll add the .sql file
**Notes:** Hard dependency — the file is not yet in the repo; downstream applies it verbatim, no reconstruction or edits.

**Q2 — How do we version and apply migrations?**

| Option | Description | Selected |
|--------|-------------|----------|
| Supabase CLI + migrations/ | CLI-managed migration files + Docker | |
| Dashboard SQL + commit | Run SQL in the dashboard; commit the .sql as record of truth | ✓ |
| You decide | Claude picks | |

**User's choice:** Dashboard SQL + commit
**Notes:** No CLI/Docker. "DB applied" is a manual human verification step.

**Q3 — How do we handle RLS given the migration ships a baseline?**

| Option | Description | Selected |
|--------|-------------|----------|
| Baseline + full audit | Apply baseline, then audit all 15 tables + add missing policies | ✓ |
| Baseline as-is | Trust the migration's RLS baseline unchanged | |
| You decide | Claude picks | |

**User's choice:** Baseline + full audit
**Notes:** Audit every table for enabled RLS + buyer/seller/admin boundaries; commit additions.

**Q4 — How do seed data and storage buckets get created?**

| Option | Description | Selected |
|--------|-------------|----------|
| All committed SQL | Seed + buckets + policies all as committed SQL run via dashboard | ✓ |
| Buckets in UI, seed in SQL | Create buckets by hand in the dashboard UI, seed via SQL | |
| You decide | Claude picks | |

**User's choice:** All committed SQL
**Notes:** Seed LYFJSHS (override UP Diliman placeholder) + 5 categories; 4 buckets with privacy (verification IDs + receipts private; product + store images public) + access policies.

---

## Auth wiring & session

**Q1 — How should the forms authenticate against Supabase?**

| Option | Description | Selected |
|--------|-------------|----------|
| Server Actions | Server Actions + server-side @supabase/ssr client sets cookies; useActionState | ✓ |
| Client SDK calls | Call the Supabase JS client directly from client components | |
| You decide | Claude picks | |

**User's choice:** Server Actions
**Notes:** No client-side auth calls; no secrets in "use client" code.

**Q2 — How should form validation be structured?**

| Option | Description | Selected |
|--------|-------------|----------|
| Add zod (shared) | zod schemas shared by client form + server action; server re-validates | ✓ |
| Keep hand-rolled | Keep the existing EMAIL_RE + useState checks | |
| You decide | Claude picks | |

**User's choice:** Add zod (shared)
**Notes:** Replaces hand-rolled EMAIL_RE.

**Q3 — After a member clicks the confirmation link, what happens?**

| Option | Description | Selected |
|--------|-------------|----------|
| Auto sign-in → shell | Confirm callback exchanges code, establishes session, drops into shell | ✓ |
| Confirm → login page | Confirm, then send the user to /login to sign in manually | |
| You decide | Claude picks | |

**User's choice:** Auto sign-in → shell
**Notes:** Signup shows a "check your email" state (adapts the existing done state).

**Q4 — How should session persistence and "Keep me logged in" behave?**

| Option | Description | Selected |
|--------|-------------|----------|
| Always-persistent | Cookie sessions persist + auto-refresh via middleware; checkbox cosmetic | ✓ |
| Honor the checkbox | Persist only when "Keep me logged in" is checked | |
| You decide | Claude picks | |

**User's choice:** Always-persistent
**Notes:** Logout = signOut() server action on every page. /forgot-password + /reset-password reuse the callback pattern.

---

## Signup shape vs schema

**Q1 — What should Phase 1 signup do with the buyer/seller toggle?**

| Option | Description | Selected |
|--------|-------------|----------|
| Keep as intent → BUYER | Keep toggle for funnel/copy, but always provision a BUYER | ✓ |
| Buyer-only signup | Remove the toggle; everyone signs up as a buyer | |
| You decide | Claude picks | |

**User's choice:** Keep as intent → BUYER
**Notes:** "Seller" only adjusts messaging + nudges to Phase 2 verification; never creates a seller account. Preserves the ?type=seller funnel.

**Q2 — What should Phase 1 do with the student/faculty toggle?**

| Option | Description | Selected |
|--------|-------------|----------|
| Remove → student-only | Drop the role toggle; faculty is out of scope | ✓ |
| Keep, ignore faculty | Keep the toggle but faculty selection does nothing | |
| You decide | Claude picks | |

**User's choice:** Remove → student-only
**Notes:** Schema verification fields (program, year_level) are student-only.

**Q3 — Should signup require a specific LYFJSHS email domain?**

| Option | Description | Selected |
|--------|-------------|----------|
| No hard restriction | Accept any email; keep "use your LYFJSHS email" as guidance | ✓ |
| Restrict to campus domain | Enforce a specific domain (e.g. @lyfjshs.edu.ph) | |
| You decide | Claude picks | |

**User's choice:** No hard restriction
**Notes:** Trust via email confirmation + Phase 2 ID verification; a senior-high may not issue emails to every student. LYFJSHS still auto-assigned by the trigger.

**Q4 — Keep, wire up, or remove the Google OAuth buttons?**

| Option | Description | Selected |
|--------|-------------|----------|
| Remove for Phase 1 | Delete Google buttons + "or" dividers from both forms | ✓ |
| Wire Google OAuth now | Implement Supabase Google OAuth this phase | |
| You decide | Claude picks | |

**User's choice:** Remove for Phase 1
**Notes:** Email/password is the spec; social login deferred.

---

## Gating & landing shell

**Q1 — Does campus-gating cover the public landing page (/) too?**

| Option | Description | Selected |
|--------|-------------|----------|
| Marketplace routes; / public | Keep / public as marketing; gate the authenticated app | ✓ |
| Gate everything | Require login for the whole app including / | |
| You decide | Claude picks | |

**User's choice:** Marketplace routes; / public
**Notes:** Landing's sample marketplace preview stays as marketing (not real data). RLS is the true data boundary.

**Q2 — How should the gate be enforced?**

| Option | Description | Selected |
|--------|-------------|----------|
| Middleware + layout guard | Middleware redirect (matcher) + server getUser() in gated layout | ✓ |
| Layout guards only | Per-route-group server layout getUser() redirects, no matcher | |
| You decide | Claude picks | |

**User's choice:** Middleware + layout guard
**Notes:** Reuses the session-refresh middleware; RLS as backstop.

**Q3 — What does a logged-in BUYER land on in Phase 1?**

| Option | Description | Selected |
|--------|-------------|----------|
| Placeholder app shell | Real chrome (header/logo/campus/user menu) + "marketplace coming soon" | ✓ |
| Gated mock preview | Reuse the landing mock marketplace as the signed-in home | |
| You decide | Claude picks | |

**User's choice:** Placeholder app shell
**Notes:** No mock data inside the real app — keeps the mock-vs-live boundary clean for Phase 3.

**Q4 — How much role-awareness ships in Phase 1?**

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal role scaffolding | Role helper + conditional nav/CTAs keyed on role | ✓ |
| Buyer-only shell | Defer all role branching until seller/admin surfaces exist | |
| You decide | Claude picks | |

**User's choice:** Minimal role scaffolding
**Notes:** requireRole/getSessionUser helper + "Become a seller" CTA for BUYERs, "coming soon" Seller/Admin areas. Seeds Phase 2/6 without building real features.

---

## Claude's Discretion

The user selected a concrete option for every question (no "you decide" chosen). Latitude left to research/planning by nature: exact Supabase client file layout, zod schema + server-action placement, route/callback path names, SQL file location in the repo, and how much of the existing forms to refactor vs. rewrite.

## Deferred Ideas

- Social login (Google OAuth) — not in the email/password spec; adds provider/consent/redirect scope and complicates the confirm flow. Revisit in a later phase.
