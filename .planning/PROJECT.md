# Project Kita

## What This Is

Project Kita is a private, campus-gated commerce marketplace for the LYFJSHS community, where verified student entrepreneurs open storefronts and fellow members discover products, place orders, pay (GCash or Cash on Delivery), and arrange pickup/delivery — all within the platform. It launches at LYFJSHS as the pilot campus on a multi-campus-ready data model. This is a real deployment, not a demo.

Today the repository is a **frontend-only scaffold**: a static marketing/landing site with a full design system and component library, backed entirely by mock data. This initialization defines the whole product and roadmaps it — starting with the Supabase backend foundation that everything else depends on.

## Core Value

A verified LYFJSHS student entrepreneur can list a product and complete a **real, trusted transaction** with a fellow member — discovery → order → payment → fulfillment — end to end, inside a marketplace that is private to the school community. Trust (identity verification) and a working transaction loop are the things that must not fail.

## Business Context

- **Customer**: LYFJSHS members — student buyers and student-entrepreneur sellers (single pilot campus).
- **Revenue model**: None in v1 — free to use, no platform fees or commissions. Monetization not yet defined.
- **Success metric**: Verified sellers onboarded and completed orders (buyer → seller transactions that reach `COMPLETED`).
- **Strategy notes**: Product/UX intent captured in `docs/DESIGN_SYSTEM.md`; authoritative data model supplied by the user (Supabase migration `0001_initial_schema.sql`).

## Requirements

### Validated

<!-- Already built and working in the existing frontend scaffold. Frontend-only, mock data. -->

- ✓ Marketing/landing experience at `/` (navbar, hero, marketplace preview, how-it-works, for-sellers, testimonials, CTA, footer) — existing
- ✓ Implemented design system — brand tokens (kita-green, spark, paper, ink), three-font system, `app/globals.css` as token source of truth — existing
- ✓ Component library — 61 shadcn primitives on `@base-ui/react` + domain components (`ProductCard`, `VerificationBadge`, `Logo`) — existing
- ✓ Client-side category tabs + in-memory filtering over sample products — existing
- ✓ Mobile-first responsiveness + accessibility baseline (focus-visible, reduced-motion, text+icon badges) — existing
- ✓ Toolchain: Next.js 16.3 App Router + React 19.2.8 + Tailwind v4 + shadcn/base-ui + bun 1.3.11 — existing

### Active

<!-- The full platform target, delivered in phases. Backend foundation first. -->

**Backend foundation (Supabase)**
- [ ] Integrate Supabase (Auth + Postgres + Storage) with Next.js 16.3 App Router using server-side data access
- [ ] Apply the authoritative schema: enums, 15 tables, triggers (`handle_new_user`, `update_store_rating`) as a versioned migration
- [ ] Enforce Row-Level Security on every table (buyer/seller/admin boundaries)
- [ ] Storage buckets: verification IDs (private), product images, store logos/banners, payment receipts (receipts private)
- [ ] Environment config (`.env.local` + committed `.env.example`); no secrets in client components

**Auth & identity**
- [ ] Email/password sign-up, login, and session management
- [ ] Campus-gated access — authentication required to view the marketplace (private to the school community)
- [ ] Auto-provision profile + cart on signup (default role `BUYER`, assigned to LYFJSHS campus)
- [ ] Role-based access across `BUYER`, `SELLER`, `CAMPUS_ADMIN`, `PLATFORM_ADMIN`

**Seller verification**
- [ ] Buyer submits verification: student ID number, ID image upload, program, year level
- [ ] Admin reviews (approve / reject with reason); approval promotes the account to `SELLER`
- [ ] "Verified Student Seller" identity surfaced on stores and listings

**Storefronts**
- [ ] Verified seller creates/manages a store (name, slug, description, logo, banner, GCash name/number, pickup locations, operating hours)
- [ ] Public storefront page with the seller's active listings
- [ ] Store rating aggregation (average + count, maintained by trigger)

**Listings / products**
- [ ] Seller CRUD on products (title, description, price, stock, category, prep time, status: `DRAFT`/`ACTIVE`/`OUT_OF_STOCK`/`ARCHIVED`)
- [ ] Multiple ordered product images
- [ ] Seeded categories: Food & Drinks, Handmade Crafts, Student Merchandise, School & Stationery, Lifestyle Goods

**Discovery**
- [ ] Browse active listings; filter by category; search; sort; price filter
- [ ] Product detail page

**Cart & checkout**
- [ ] Single-store cart (add/update/remove items with quantity; enforce one store per cart)
- [ ] Checkout that creates an order

**Orders**
- [ ] Order lifecycle with human-readable `order_number` and status flow (`PENDING_PAYMENT` → `PENDING` → `CONFIRMED` → `PREPARING` → `READY_FOR_PICKUP`/`OUT_FOR_DELIVERY` → `COMPLETED`; plus `CANCELLED`/`REJECTED`/`EXPIRED`)
- [ ] Buyer order history; seller order management (advance/reject with reason)
- [ ] Immutable order-item snapshots (title, price, quantity, subtotal)

**Payments (manual)**
- [ ] GCash: buyer submits reference number + uploads receipt; seller/admin verifies
- [ ] Cash on Delivery (COD)
- [ ] Payment status tracking (`PENDING`/`VERIFIED`/`REJECTED`)

**Fulfillment**
- [ ] Fulfillment method per order (`CAMPUS_PICKUP` / `HANDOFF` / `LOCAL_DELIVERY`) with location details, preferred time, notes

**Reviews**
- [ ] Buyer reviews product/store after a completed order (1–5 rating + comment), one review per order+product

**Notifications**
- [ ] In-app notifications (order status changes, verification result, payment status, etc.) with read state

**Moderation & admin**
- [ ] Content reports against product/store/review with status (`PENDING`/`RESOLVED`/`DISMISSED`)
- [ ] Admin surfaces: review verifications, moderate listings/reports, manage users
- [ ] Campus admin vs. platform admin capabilities

**Multi-campus (structural)**
- [ ] Campus entity + `campus_id` scoping across data; LYFJSHS seeded as the sole active pilot campus (structure supports future campuses)

**Frontend build-out**
- [ ] Replace mock landing marketplace with live, data-driven marketplace UI
- [ ] Buyer, seller, and admin app surfaces (role-based navigation/dashboards) consistent with the design system

### Out of Scope

<!-- Explicit boundaries with reasons, to prevent silent scope creep. -->

- **Integrated payment gateway** (Stripe / PayMongo / GCash API) — v1 uses manual GCash receipt verification + COD; automated settlement deferred to a later milestone.
- **In-app chat / realtime messaging** — not in the authoritative schema; buyer↔seller coordination happens through the order + fulfillment flow and the store's published contact/GCash details. Deferred.
- **Favorites / wishlist** — present in the design doc but not in the authoritative schema; deferred.
- **Faculty seller verification** — the schema models student verification only; faculty seller path is a design-doc concept, deferred.
- **Self-serve multi-campus onboarding** — the data model is multi-campus-ready, but only LYFJSHS is active; onboarding additional campuses is deferred.
- **Platform-run delivery logistics / rider network** — `LOCAL_DELIVERY` is seller-arranged; no platform logistics.
- **Advanced analytics dashboards** — beyond store rating aggregation and basic order/status counts; deferred.
- **Native mobile apps** — web-first, responsive only.

## Context

- **Existing scaffold**: Next.js 16.3.0 + React 19.2.8 + Tailwind v4 + shadcn (`base-nova`) on `@base-ui/react` + bun 1.3.11. Currently a static landing page with hardcoded `SAMPLE_PRODUCTS`; no backend, auth, data layer, tests, or CI. Most work is uncommitted (single "Initial commit from Create Next App").
- **Non-standard Next.js**: `AGENTS.md` warns Next.js 16.3 diverges from common knowledge. Read `node_modules/next/dist/docs/` (`01-app`, `03-architecture`) before writing any routing/layout/metadata/image/font/route-handler code. The `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md` is auto-regenerated by `next dev` — commit it, don't fight it.
- **Design source of truth**: `docs/DESIGN_SYSTEM.md` is product/UX intent; `app/globals.css` is the *implemented* token source of truth ("campus bulletin board" theme: kita-green `#0C6B4E`, spark `#F2B32C`, paper `#F4F3EA`, ink `#16241D`; Bricolage Grotesque / Plus Jakarta Sans / Space Mono). Note: the design doc's category set differs from the schema's — the **schema's categories win**.
- **Codebase maps**: `.planning/codebase/` (STACK, ARCHITECTURE, STRUCTURE, INTEGRATIONS, CONCERNS) dated 2026-08-12.
- **Authoritative data model**: user-provided Supabase migration `0001_initial_schema.sql` — 4-role enum, verification/product/order/payment/fulfillment/report enums, 15 tables, `handle_new_user` + `update_store_rating` triggers, and a baseline RLS policy set. Note the schema seed originally referenced "UP Diliman" as a placeholder; the pilot seed will be **LYFJSHS**. Schema uses university-style fields (`program`, `year_level`) that map to LYFJSHS equivalents in the UI.
- **Local commerce norms**: GCash and COD are standard in the Philippines; manual receipt verification is common in student/campus marketplaces (no gateway needed for v1).
- **Immediate driver**: integrate Supabase (auth/db/storage) as the foundation before any marketplace functionality can exist.

## Constraints

- **Tech stack**: Next.js 16.3.0 (pinned, non-standard) + React 19.2.8 + Tailwind v4 + shadcn/`@base-ui/react` + bun 1.3.11 — verify framework APIs against `node_modules/next/dist/docs/`, never from memory.
- **Backend**: Supabase (Postgres + Auth + Storage). Data model is pre-specified by the provided migration and is authoritative.
- **Security**: RLS mandatory on all tables (real deployment). `.env*` is gitignored — never read/commit secrets; never place secrets or service-role keys in client (`"use client"`) code. Verification IDs and payment receipts are private in Storage.
- **Payments**: manual only in v1 (GCash receipt verification + COD); no payment-gateway integration.
- **Access**: campus-gated — authenticated members only.
- **Scope model**: multi-campus-ready schema, but LYFJSHS is the only active campus.
- **Conventions**: lucide-react icons only; new external image hosts must be added to `next.config.ts` `images.remotePatterns`; files kebab-case, components PascalCase named exports, `@/*` path alias.
- **Deployment**: Vercel (implied) + Supabase.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Target the full commerce platform (not a lean listings-only marketplace) | User confirmed and supplied the complete DB schema | — Pending |
| Deliver in phases, Supabase backend foundation first | Auth/data/storage underpin every feature; was the original stated goal | — Pending |
| Adopt the user-provided Supabase migration as the authoritative data model | Concrete and well-designed (auth trigger, single-store cart, rating trigger, RLS baseline) | — Pending |
| LYFJSHS is the pilot campus; keep multi-campus structure but single active campus | User chose "fix seed → LYFJSHS"; preserves future flexibility without added scope | — Pending |
| Manual payments — GCash receipt verification + COD, no gateway | PH norm; avoids gateway integration cost/complexity in v1 | — Pending |
| Campus-gated access (login required to browse) | Keeps the marketplace private to the school community | — Pending |
| Seller verification via student ID upload + admin review | User choice; exercises Supabase Storage + a minimal admin surface | — Pending |
| `app/globals.css` tokens are source of truth over `docs/DESIGN_SYSTEM.md` | Two competing palettes exist; implemented tokens are what ships | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-12 after initialization*
