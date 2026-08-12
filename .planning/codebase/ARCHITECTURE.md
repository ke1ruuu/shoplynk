<!-- refreshed: 2026-08-12 -->
# Architecture

**Analysis Date:** 2026-08-12

## System Overview

Project Kita is a **Next.js 16.3 App Router** application. At present it is a
**static, client-composed marketing/landing site** — a single route (`/`) that
composes section components into a marketing page. There is no backend, no API
routes, no database, and no data fetching yet. All content is hardcoded sample
data inside components. The codebase is set up as the foundation for a
school-community marketplace (see `docs/DESIGN_SYSTEM.md`).

```text
┌─────────────────────────────────────────────────────────────┐
│                     App Router (app/)                        │
├──────────────────┬──────────────────┬───────────────────────┤
│   Root Layout    │   Home Page (/)  │   Global Styles/Tokens │
│  `app/layout.tsx`│  `app/page.tsx`  │  `app/globals.css`     │
└────────┬─────────┴────────┬─────────┴──────────┬────────────┘
         │                  │                     │
         ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Section Components (feature layer)               │
│              `components/landing/*`                           │
│   navbar · hero · marketplace · how-it-works · for-sellers   │
│   testimonials · cta · footer · category-tabs                │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│          Shared Domain Components (`components/common/*`)     │
│          product-card · verification-badge · logo            │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│   UI Primitives — shadcn on @base-ui/react                   │
│   `components/ui/*` (61 primitives)                          │
│   Helpers: `lib/utils.ts` (cn) · `hooks/use-mobile.ts`      │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Root Layout | HTML/body shell, font loading, global metadata | `app/layout.tsx` |
| Home Page | Composes landing sections into the `/` route | `app/page.tsx` |
| Design tokens | Tailwind v4 theme + brand tokens + component utilities | `app/globals.css` |
| Landing sections | Self-contained marketing sections | `components/landing/*.tsx` |
| ProductCard | Marketplace listing card (image, price, seller, badge) | `components/common/product-card.tsx` |
| VerificationBadge | Verified Student/Faculty seller indicator | `components/common/verification-badge.tsx` |
| Logo | Brand mark + wordmark, size/tone variants | `components/common/logo.tsx` |
| UI primitives | Design-system components (button, dialog, table, etc.) | `components/ui/*.tsx` |
| cn() | Tailwind class merge helper | `lib/utils.ts` |
| useIsMobile | Client viewport breakpoint hook (768px) | `hooks/use-mobile.ts` |

## Pattern Overview

**Overall:** Component-composition over a Next.js App Router shell. Server
Components by default; interactivity is opted into per-component with
`"use client"`.

**Key Characteristics:**
- **Server-first rendering.** `app/layout.tsx`, `app/page.tsx`, and leaf
  components without state render as React Server Components. Only components
  that use `useState`/effects/event handlers add `"use client"`.
- **Layered composition.** Route → section components → shared domain
  components → UI primitives. Each layer only depends downward.
- **Design-system driven.** UI is built on shadcn (`style: base-nova`) layered
  on `@base-ui/react` primitives (not Radix). Brand identity is centralized in
  CSS design tokens rather than hardcoded values.
- **No data layer yet.** Sample/fixture data is inlined in components (e.g.
  `SAMPLE_PRODUCTS` in `components/landing/marketplace-section.tsx`).

## Layers

**App Router layer:**
- Purpose: Routing, layout shell, fonts, metadata, global styles/tokens.
- Location: `app/`
- Contains: `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`.
- Depends on: `components/landing/*`, `next/font/google`.
- Used by: Next.js runtime (this is the entry surface).

**Section (feature) layer:**
- Purpose: Full-width marketing sections that make up the landing page.
- Location: `components/landing/`
- Contains: `navbar`, `hero-section`, `marketplace-section`,
  `how-it-works-section`, `for-sellers-section`, `testimonials-section`,
  `cta-section`, `footer`, `category-tabs`.
- Depends on: `components/common/*`, `components/ui/*`, `lucide-react`,
  `next/link`, `next/image`.
- Used by: `app/page.tsx`.

**Shared domain layer:**
- Purpose: Reusable marketplace primitives with light domain meaning.
- Location: `components/common/`
- Contains: `product-card`, `verification-badge`, `logo`.
- Depends on: `components/ui/*`, `next/image`, `next/link`, `lucide-react`.
- Used by: section components.

**UI primitive layer:**
- Purpose: Unstyled-behavior design-system components with Project Kita styling.
- Location: `components/ui/`
- Contains: 61 shadcn/base-ui primitives (button, dialog, table, chart, etc.).
- Depends on: `@base-ui/react/*`, `@shadcn/react/*`, `class-variance-authority`,
  `lib/utils.ts`.
- Used by: all higher layers.

**Support layer:**
- Purpose: Cross-cutting helpers.
- Location: `lib/`, `hooks/`
- Contains: `lib/utils.ts` (`cn`), `hooks/use-mobile.ts` (`useIsMobile`).
- Used by: any layer.

## Data Flow

### Primary Render Path

1. Next.js renders the root layout — sets `<html>`/`<body>`, loads Google fonts,
   applies global metadata (`app/layout.tsx:33`).
2. The `/` route renders `Home`, which composes the section components in order
   (`app/page.tsx:10`).
3. Each section renders its own markup; some pull shared domain components
   (e.g. `MarketplaceSection` → `ProductCard` at
   `components/landing/marketplace-section.tsx:105`).
4. Domain components render UI primitives and Next.js `Image`/`Link`
   (`components/common/product-card.tsx:57`).

### Client Interaction Flow

1. Interactive sections mark `"use client"` and hold **local** state only.
2. Category filtering: `MarketplaceSection` keeps `activeCategory` in `useState`
   and filters `SAMPLE_PRODUCTS` in-memory
   (`components/landing/marketplace-section.tsx:63`).
3. `CategoryTabs` is a controlled child — receives `activeCategory` and calls
   `onSelectCategory` up to the parent
   (`components/landing/category-tabs.tsx:37`).
4. Leaf interactivity is self-contained: `ProductCard` favorite toggle
   (`isLiked`), `Navbar` mobile menu (`mobileMenuOpen`/`activeLink`).

**State Management:**
- Local component state via `useState` only. No global store, no React Context
  providers wired in the app, no server-state library. State never crosses more
  than one parent/child boundary.

## Key Abstractions

**Design tokens (`@theme inline`):**
- Purpose: Single source of implemented brand values (colors, fonts, radius).
- Examples: `app/globals.css:15` (brand palette + font vars + radius scale).
- Pattern: Tailwind v4 CSS-first theming; brand tokens (`--color-kita-green`,
  `--color-paper`, `--color-ink`, `--color-spark`) plus shadcn semantic aliases
  mapped from `:root` (`app/globals.css:77`). Consume via utility classes like
  `bg-kita-green`, `text-ink`, `border-line`.

**`cva` variant components:**
- Purpose: Typed variant/size APIs for primitives.
- Examples: `components/ui/button.tsx:6` (`buttonVariants`).
- Pattern: `cva(...)` + `VariantProps`, merged through `cn()`; `data-slot`
  attributes for styling hooks.

**`cn()` class merge:**
- Purpose: Compose conditional Tailwind classes with correct override order.
- Examples: `lib/utils.ts:4`.
- Pattern: `twMerge(clsx(inputs))`.

**Controlled section state:**
- Purpose: Parent owns state; presentational children stay pure.
- Examples: `MarketplaceSection` + `CategoryTabs`.

## Entry Points

**Root Layout:**
- Location: `app/layout.tsx`
- Triggers: Every request (wraps all routes).
- Responsibilities: `<html lang="en">`/`<body>` shell, load `Bricolage_Grotesque`
  (display), `Plus_Jakarta_Sans` (body), `Space_Mono` (data/prices) via CSS
  variables, set site metadata.

**Home Route:**
- Location: `app/page.tsx`
- Triggers: `GET /`.
- Responsibilities: Compose the ordered landing sections inside `<main>`.

## Architectural Constraints

- **Next.js 16.3 breaking changes:** Per `AGENTS.md`, this Next.js version
  departs from common knowledge. Consult `node_modules/next/dist/docs/`
  (App Router: `01-app`, architecture: `03-architecture`) before writing routing,
  layout, metadata, image, or font code. Do not assume older App Router APIs.
- **Server Components by default:** Add `"use client"` only when a component uses
  state, effects, refs, or browser/event APIs. Keep the client boundary as low
  in the tree as possible.
- **Threading/runtime:** Standard Next.js SSR/RSC + client hydration. No workers,
  no long-lived processes.
- **Global state:** None. No module-level singletons or shared mutable state.
- **Circular imports:** None observed; dependencies flow strictly downward
  (app → landing → common → ui → lib/hooks).
- **UI primitive base:** Primitives are built on `@base-ui/react` (a few on
  `@shadcn/react`), NOT Radix. Import primitives from `@base-ui/react/<name>`.
- **Icons:** Lucide only (`lucide-react`); do not mix icon libraries
  (`docs/DESIGN_SYSTEM.md` §28).
- **Remote images:** Only `images.unsplash.com` is allowlisted in
  `next.config.ts`. New external image hosts must be added to `remotePatterns`.

## Anti-Patterns

### Inlined sample/fixture data inside components

**What happens:** `MarketplaceSection` hardcodes a `SAMPLE_PRODUCTS` array
directly in the component (`components/landing/marketplace-section.tsx:9`).
**Why it's wrong:** Couples presentation to fixture data; blocks the eventual
data layer (API/DB) and makes the marketplace non-dynamic.
**Do this instead:** When real data lands, fetch in a Server Component (or a
future data module) and pass typed props into `ProductCard`; keep fixtures in a
dedicated `lib/`/fixtures location, not in section components.

### Implemented tokens diverge from the design-system doc

**What happens:** `docs/DESIGN_SYSTEM.md` specifies Deep Emerald `#087F5B` and
Inter, while `app/globals.css` implements a "campus bulletin board" theme —
kita-green `#0C6B4E`, manila paper `#F4F3EA`, and the Bricolage/Jakarta/Space
Mono font stack.
**Why it's wrong:** Two competing sources of truth for brand values can cause
inconsistent UI decisions.
**Do this instead:** Treat `app/globals.css` as the **implemented** token source
of truth and consume tokens via utility classes (`bg-kita-green`, `text-ink`);
treat `docs/DESIGN_SYSTEM.md` as product/UX intent. Reconcile intentionally
rather than reintroducing raw hex values.

### Raw hex / arbitrary values instead of tokens

**What happens:** Some inline arbitrary Tailwind values appear (e.g.
`max-w-[1280px]`, `shadow-flyer` container widths repeated per section).
**Why it's wrong:** Repeated literals drift from the token system
(`docs/DESIGN_SYSTEM.md` §33 mandates centralized tokens).
**Do this instead:** Prefer semantic utility classes and the shared container
pattern; add tokens/utilities in `app/globals.css` when a value recurs.

## Error Handling

**Strategy:** None implemented yet (no data fetching, no `error.tsx`/`not-found.tsx`,
no form submission).

**Patterns:**
- UI-level empty state exists as a pattern: `MarketplaceSection` renders a
  "Nothing pinned here yet" block when a filter yields no results
  (`components/landing/marketplace-section.tsx:111`).
- When async/data work is added, use App Router conventions
  (`error.tsx`, `loading.tsx`, `not-found.tsx`) — verify current signatures in
  `node_modules/next/dist/docs/01-app`.

## Cross-Cutting Concerns

**Logging:** None.
**Validation:** None yet (no forms/inputs are wired to logic).
**Authentication:** None (Log in / Sign up buttons are static placeholders in
`components/landing/navbar.tsx`).
**Styling/theming:** Centralized in `app/globals.css` tokens + `cn()` + `cva`.
**Accessibility:** Baked into components — `aria-*` attributes, visible
`:focus-visible` outline in `globals.css:118`, reduced-motion handling
(`globals.css:221`), text-plus-icon verification badges.
**Responsiveness:** Tailwind breakpoints + `useIsMobile` (768px) hook; mobile-first
per `docs/DESIGN_SYSTEM.md` §26.

---

*Architecture analysis: 2026-08-12*
