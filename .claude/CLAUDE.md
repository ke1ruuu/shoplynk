<!-- GSD:project-start source:PROJECT.md -->

## Project

**Project Kita**

Project Kita is a private, campus-gated commerce marketplace for the LYFJSHS community, where verified student entrepreneurs open storefronts and fellow members discover products, place orders, pay (GCash or Cash on Delivery), and arrange pickup/delivery — all within the platform. It launches at LYFJSHS as the pilot campus on a multi-campus-ready data model. This is a real deployment, not a demo.

Today the repository is a **frontend-only scaffold**: a static marketing/landing site with a full design system and component library, backed entirely by mock data. This initialization defines the whole product and roadmaps it — starting with the Supabase backend foundation that everything else depends on.

**Core Value:** A verified LYFJSHS student entrepreneur can list a product and complete a **real, trusted transaction** with a fellow member — discovery → order → payment → fulfillment — end to end, inside a marketplace that is private to the school community. Trust (identity verification) and a working transaction loop are the things that must not fail.

### Constraints

- **Tech stack**: Next.js 16.3.0 (pinned, non-standard) + React 19.2.8 + Tailwind v4 + shadcn/`@base-ui/react` + bun 1.3.11 — verify framework APIs against `node_modules/next/dist/docs/`, never from memory.
- **Backend**: Supabase (Postgres + Auth + Storage). Data model is pre-specified by the provided migration and is authoritative.
- **Security**: RLS mandatory on all tables (real deployment). `.env*` is gitignored — never read/commit secrets; never place secrets or service-role keys in client (`"use client"`) code. Verification IDs and payment receipts are private in Storage.
- **Payments**: manual only in v1 (GCash receipt verification + COD); no payment-gateway integration.
- **Access**: campus-gated — authenticated members only.
- **Scope model**: multi-campus-ready schema, but LYFJSHS is the only active campus.
- **Conventions**: lucide-react icons only; new external image hosts must be added to `next.config.ts` `images.remotePatterns`; files kebab-case, components PascalCase named exports, `@/*` path alias.
- **Deployment**: Vercel (implied) + Supabase.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->

## Technology Stack

## Languages

- TypeScript `^5` - All application code (`.ts`, `.tsx`). Strict mode enabled. Used across `app/`, `components/`, `lib/`, `hooks/`.
- CSS - Tailwind v4 layer directives and design tokens in `app/globals.css` (custom `@theme inline` block).
- JavaScript (ESM) - Config files only: `postcss.config.mjs`, `eslint.config.mjs`.
- `target: ES2017`, `module: esnext`, `moduleResolution: bundler`
- `strict: true`, `noEmit: true`, `isolatedModules: true`, `jsx: react-jsx`
- `allowJs: true`, `resolveJsonModule: true`, `incremental: true`
- Next.js TS plugin registered (`plugins: [{ name: "next" }]`)
- Path alias: `@/*` → `./*` (repo root)

## Runtime

- Node.js `v24.12.0` (installed on this machine). No `.nvmrc` / `.node-version` pins the version.
- Browser runtime: React 19 with the Next.js App Router (React Server Components enabled). 45 files carry a `"use client"` directive.
- Bun `1.3.11` - Declared via `"packageManager": "bun@1.3.11"` in `package.json`.
- Lockfile: **present** - `bun.lock` (~180 KB, committed). No `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`.
- `ignoreScripts` / `trustedDependencies`: `sharp`, `unrs-resolver` (native postinstall scripts gated to these two packages).

## Frameworks

- Next.js `16.3.0` - Full-stack React framework. App Router architecture (`app/` directory). RSC enabled (`components.json` → `"rsc": true`). Config in `next.config.ts` (typed `NextConfig`).
- React `19.2.8` / React DOM `19.2.8` - UI runtime (exact-pinned, not caret-ranged).
- Not detected. No `jest.config.*`, `vitest.config.*`, `playwright.config.*`, no `*.test.*` / `*.spec.*` files, and no test dependencies in `package.json`.
- Next.js CLI - `next dev` (dev), `next build` (build), `next start` (serve). Scripts in `package.json`.
- Tailwind CSS `^4` + `@tailwindcss/postcss` `^4` - Styling engine wired through PostCSS (`postcss.config.mjs`).
- ESLint `^9` (flat config) with `eslint-config-next` `16.3.0` - Lint via `next lint`-equivalent flat config (`eslint.config.mjs`).

## Key Dependencies

- `next` `16.3.0` - App framework (non-standard release — see top note).
- `react` / `react-dom` `19.2.8` - Rendering runtime.
- `tailwindcss` `^4` - Utility-first CSS; consumed via `app/globals.css` (`@import "tailwindcss"`).
- `shadcn` `^4.17.0` + `@shadcn/react` `^0.3.0` - shadcn/ui component system. Configured in `components.json` (style `"base-nova"`, base color `neutral`, CSS-variables mode). Also imported in CSS via `@import "shadcn/tailwind.css"`.
- `@base-ui/react` `^1.7.0` - Headless/unstyled primitive layer underneath the shadcn components. Imported in ~20 `components/ui/*` files (e.g. `@base-ui/react/dialog`, `@base-ui/react/select`). This is the accessibility/behavior foundation (replaces the Radix layer of classic shadcn).
- `class-variance-authority` `^0.7.1` - Variant-driven component styling (buttons, badges, etc.).
- `clsx` `^2.1.1` + `tailwind-merge` `^3.6.0` - Combined in `lib/utils.ts` as the `cn()` helper for conditional class merging.
- `tw-animate-css` `^1.4.0` - Animation utilities; imported at top of `app/globals.css`.
- `lucide-react` `^1.31.0` - Outline icon system. Designated icon library in both `components.json` (`"iconLibrary": "lucide"`) and `docs/DESIGN_SYSTEM.md` (§28).
- `recharts` `3.8.0` - Charting. Used by `components/ui/chart.tsx` (seller-dashboard analytics surfaces).
- `embla-carousel-react` `^8.6.0` - Carousel engine. Used by `components/ui/carousel.tsx`.
- `cmdk` `^1.1.1` - Command palette. Used by `components/ui/command.tsx`.
- `input-otp` `^1.4.2` - OTP entry. Used by `components/ui/input-otp.tsx`.
- `react-day-picker` `^10.0.1` + `date-fns` `^4.4.0` - Date picker + date utilities. Used by `components/ui/calendar.tsx`.
- `react-resizable-panels` `^4.12.2` - Split/resizable layouts. Used by `components/ui/resizable.tsx`.
- `@types/node` `^20`, `@types/react` `^19`, `@types/react-dom` `^19`.

## Configuration

- No `.env*` files present in the repo. `.gitignore` ignores `.env*` (opt-in commit only) — never read/commit secrets.
- No runtime env-var access detected in source (`process.env` not referenced in `app/`, `components/`, `lib/`, `hooks/`). The app is currently a static, data-free landing experience.
- `next.config.ts` - Only configures `images.remotePatterns` to allow `images.unsplash.com` over HTTPS (placeholder product/testimonial imagery).
- `postcss.config.mjs` - Registers the `@tailwindcss/postcss` plugin (single-plugin Tailwind v4 pipeline).
- `eslint.config.mjs` - Flat config composing `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`, with default ignores re-declared (`.next/**`, `out/**`, `build/**`, `next-env.d.ts`).
- `components.json` - shadcn generator config; aliases `@/components`, `@/lib`, `@/lib/utils`, `@/components/ui`, `@/hooks`.
- `next-env.d.ts` - Auto-generated Next types (do not edit); references `.next/dev/types/routes.d.ts` and `root-params.d.ts`.
- Actual: `next/font/google` loads `Bricolage_Grotesque` (display), `Plus_Jakarta_Sans` (body/UI), and `Space_Mono` (prices/data) — wired via CSS variables `--font-bricolage`, `--font-jakarta`, `--font-space-mono` in `app/layout.tsx` and mapped to `--font-display` / `--font-sans` / `--font-mono` in `app/globals.css`.
- Note the divergence from static docs: `docs/DESIGN_SYSTEM.md` §5 specifies **Inter**, and `README.md` (unmodified create-next-app boilerplate) mentions **Geist**. The three-font system in `app/layout.tsx` is the current source of truth for typography.
- Centralized as CSS custom properties in `app/globals.css` (`@theme inline` + `:root`). Brand palette (kita-green `#0C6B4E`, spark `#F2B32C`, paper `#F4F3EA`, ink `#16241D`) plus shadcn semantic aliases (`--primary`, `--secondary`, `--destructive`, etc.) and radius scale (`--radius-sm`…`--radius-2xl`). See `docs/DESIGN_SYSTEM.md` for intent.

## Platform Requirements

- Bun `1.3.11` (declared package manager) for install/scripts; Node.js runtime present at `v24.12.0`.
- macOS/Linux/Windows supported via Next.js dev server (`bun dev` → `next dev`, defaults to `http://localhost:3000`).
- Vercel is the implied deployment target (create-next-app defaults, `public/vercel.svg`, `.gitignore` entry for `.vercel`, `README.md` deployment section). No `vercel.json`, `Dockerfile`, or CI workflow (`.github/workflows/`) is committed — deployment config is not yet formalized.

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

## Design Source of Truth

## Framework Caveat (read before writing Next.js code)

## Naming Patterns

- **kebab-case** for every source file: `product-card.tsx`,
- One primary exported component per file; file name mirrors the component
- `components/ui/` — vendored shadcn primitives.
- `components/common/` — shared, reusable app components (`logo`, `product-card`,
- `components/landing/` — page-section components for the marketing/home page.
- `app/` — Next.js App Router routes, layout, global CSS.
- `lib/` — framework-agnostic helpers (`lib/utils.ts`).
- `hooks/` — custom React hooks (`hooks/use-mobile.ts`).

## Code Style

- No dedicated formatter config detected (no `.prettierrc`, no `biome.json`).
- Indentation: 2 spaces throughout.
- Quotes: **double quotes** in both dialects.
- Semicolons: **present** in app/custom code (`components/common/*`,
- ESLint flat config at `eslint.config.mjs`, extending
- Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`.
- Run: `bun run lint` (script: `"lint": "eslint"` in `package.json`).
- `strict: true`, `noEmit: true`, `moduleResolution: "bundler"`,
- Path alias `@/*` → project root. Import app modules as

## Import Organization

## Component Patterns

### shadcn/ui primitives (`components/ui/*`)

- Built on **`@base-ui/react`** primitives (NOT Radix). Some use
- `style: "base-nova"`, `baseColor: "neutral"`, RSC enabled, CSS variables on
- Variants via **class-variance-authority** (`cva`) with `defaultVariants`, typed
- Class merging via **`cn()`** from `@/lib/utils` (= `twMerge(clsx(...))`).
- Each element carries a `data-slot="<name>"` attribute for styling/targeting.
- Typed with `React.ComponentProps<"tag">` (+ intersection for extra props).
- Declared as `function Component(...)`, exported grouped at file bottom:
- Reference: `components/ui/button.tsx`, `components/ui/badge.tsx`,

### App + custom components (`components/common/*`, `components/landing/*`)

- Named export at declaration: `export function ProductCard(...)`.
- Props typed by a local `interface XProps` (or `export interface` when the shape
- Default values via destructuring defaults
- `className` composed with **template literals**, not `cn()`
- Icons: **lucide-react** only (`Heart`, `Menu`, `ArrowRight`, `BadgeCheck`…),
- Reference: `components/common/product-card.tsx`,

### Server vs. Client boundary

- Server Components by default (App Router). Files add `"use client"` **only**
- Client examples: `navbar.tsx`, `product-card.tsx`, `category-tabs.tsx`
- Server examples: `logo.tsx`, `verification-badge.tsx`, `hero-section.tsx`,
- Keep interactivity in the smallest leaf; the home page (`app/page.tsx`) is a

## Design System (Source of Truth)

- Consume via Tailwind utilities backed by CSS vars. Implemented palette:
- Green is the primary identity; gold (`spark`) is used sparingly for featured /
- **Never communicate state by color alone** — always pair with text or icon
- Fonts loaded with `next/font/google` in `app/layout.tsx`, exposed as CSS vars
- Headings (`h1–h4`) auto-use the display face with `-0.02em` tracking (set in
- `.eyebrow` — mono uppercase label.
- `.tabular` — mono tabular numerals for prices (used with `₱` +
- `.marker` — gold highlighter swash behind key words.
- `.shadow-flyer` / `.shadow-flyer-lg` — subtle lifted-paper card shadows
- `.pin` — pushpin dot signature element.
- `.bg-corkboard` — dotted atmospheric background band.
- `.scrollbar-none` — hide scrollbar on horizontal rails.

## Accessibility

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.
- ARIA on interactive elements: `aria-label`, `aria-pressed`, `aria-current`,
- Decorative elements marked `aria-hidden="true"` (pushpins, spark dots).
- Global on-brand `:focus-visible` outline defined in `@layer base`
- Images always have meaningful `alt` (product title used as alt).
- Reduced-motion respected globally.

## Error Handling

- **No backend / data layer yet.** The app is currently presentational
- `docs/DESIGN_SYSTEM.md` §15 (Forms) and §19 (Feedback States) define the
- **When adding logic:** introduce explicit error/empty/loading states per the

## Logging

- No logging framework. No `console.*` usage in source. Add intentionally if a

## Comments

- Sparse, purpose-driven. Used to explain *intent* / design metaphor rather than
- `app/globals.css` uses a banner comment block to document the token system —
- JSDoc is rare; one example documents a prop

## Function & Module Design

- **Function components** only; no classes.
- Props destructured in the signature with inline defaults.
- Prefer small, composable, presentational components with no embedded business
- Exports:
- No default exports except Next.js route conventions

## Adding New Code (quick rules)

- New shared component → `components/common/<kebab-name>.tsx`, app dialect.
- New page section → `components/landing/<kebab-name>.tsx` (or a future
- New primitive from shadcn → generated into `components/ui/`; leave its dialect
- New hook → `hooks/use-<name>.ts`, `use` prefix, app dialect.
- New pure helper → `lib/<name>.ts`.
- Always consume design tokens via Tailwind utilities; never hardcode hex.
- Verify any Next.js API against `node_modules/next/dist/docs/` first.

<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

## System Overview

```text

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

- **Server-first rendering.** `app/layout.tsx`, `app/page.tsx`, and leaf
- **Layered composition.** Route → section components → shared domain
- **Design-system driven.** UI is built on shadcn (`style: base-nova`) layered
- **No data layer yet.** Sample/fixture data is inlined in components (e.g.

## Layers

- Purpose: Routing, layout shell, fonts, metadata, global styles/tokens.
- Location: `app/`
- Contains: `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`.
- Depends on: `components/landing/*`, `next/font/google`.
- Used by: Next.js runtime (this is the entry surface).
- Purpose: Full-width marketing sections that make up the landing page.
- Location: `components/landing/`
- Contains: `navbar`, `hero-section`, `marketplace-section`,
- Depends on: `components/common/*`, `components/ui/*`, `lucide-react`,
- Used by: `app/page.tsx`.
- Purpose: Reusable marketplace primitives with light domain meaning.
- Location: `components/common/`
- Contains: `product-card`, `verification-badge`, `logo`.
- Depends on: `components/ui/*`, `next/image`, `next/link`, `lucide-react`.
- Used by: section components.
- Purpose: Unstyled-behavior design-system components with Project Kita styling.
- Location: `components/ui/`
- Contains: 61 shadcn/base-ui primitives (button, dialog, table, chart, etc.).
- Depends on: `@base-ui/react/*`, `@shadcn/react/*`, `class-variance-authority`,
- Used by: all higher layers.
- Purpose: Cross-cutting helpers.
- Location: `lib/`, `hooks/`
- Contains: `lib/utils.ts` (`cn`), `hooks/use-mobile.ts` (`useIsMobile`).
- Used by: any layer.

## Data Flow

### Primary Render Path

### Client Interaction Flow

- Local component state via `useState` only. No global store, no React Context

## Key Abstractions

- Purpose: Single source of implemented brand values (colors, fonts, radius).
- Examples: `app/globals.css:15` (brand palette + font vars + radius scale).
- Pattern: Tailwind v4 CSS-first theming; brand tokens (`--color-kita-green`,
- Purpose: Typed variant/size APIs for primitives.
- Examples: `components/ui/button.tsx:6` (`buttonVariants`).
- Pattern: `cva(...)` + `VariantProps`, merged through `cn()`; `data-slot`
- Purpose: Compose conditional Tailwind classes with correct override order.
- Examples: `lib/utils.ts:4`.
- Pattern: `twMerge(clsx(inputs))`.
- Purpose: Parent owns state; presentational children stay pure.
- Examples: `MarketplaceSection` + `CategoryTabs`.

## Entry Points

- Location: `app/layout.tsx`
- Triggers: Every request (wraps all routes).
- Responsibilities: `<html lang="en">`/`<body>` shell, load `Bricolage_Grotesque`
- Location: `app/page.tsx`
- Triggers: `GET /`.
- Responsibilities: Compose the ordered landing sections inside `<main>`.

## Architectural Constraints

- **Next.js 16.3 breaking changes:** Per `AGENTS.md`, this Next.js version
- **Server Components by default:** Add `"use client"` only when a component uses
- **Threading/runtime:** Standard Next.js SSR/RSC + client hydration. No workers,
- **Global state:** None. No module-level singletons or shared mutable state.
- **Circular imports:** None observed; dependencies flow strictly downward
- **UI primitive base:** Primitives are built on `@base-ui/react` (a few on
- **Icons:** Lucide only (`lucide-react`); do not mix icon libraries
- **Remote images:** Only `images.unsplash.com` is allowlisted in

## Anti-Patterns

### Inlined sample/fixture data inside components

### Implemented tokens diverge from the design-system doc

### Raw hex / arbitrary values instead of tokens

## Error Handling

- UI-level empty state exists as a pattern: `MarketplaceSection` renders a
- When async/data work is added, use App Router conventions

## Cross-Cutting Concerns

<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
