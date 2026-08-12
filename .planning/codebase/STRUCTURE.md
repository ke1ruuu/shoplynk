# Codebase Structure

**Analysis Date:** 2026-08-12

## Directory Layout

```text
projectkita/
├── app/                      # Next.js App Router — routes, layout, global styles
│   ├── layout.tsx            # Root layout: html/body shell, fonts, metadata
│   ├── page.tsx              # `/` route (Home) — composes landing sections
│   ├── globals.css           # Tailwind v4 import + design tokens + utilities
│   └── favicon.ico
├── components/
│   ├── ui/                   # shadcn/base-ui primitives (61 files)
│   ├── common/               # Shared domain components (product-card, badge, logo)
│   └── landing/              # Landing-page section components
├── hooks/                    # Client React hooks
│   └── use-mobile.ts         # useIsMobile (768px breakpoint)
├── lib/                      # Framework-agnostic helpers
│   └── utils.ts              # cn() class-merge helper
├── public/                   # Static assets (logo, svgs)
├── docs/
│   └── DESIGN_SYSTEM.md      # Brand + UI/UX source of truth
├── components.json           # shadcn config (style, aliases, icon library)
├── next.config.ts            # Next config (image remotePatterns)
├── tsconfig.json             # TS config + `@/*` path alias
├── eslint.config.mjs         # Flat ESLint (next core-web-vitals + typescript)
├── postcss.config.mjs        # Tailwind v4 postcss plugin
├── AGENTS.md / CLAUDE.md     # Agent rules (Next.js 16.3 breaking-change notice)
├── package.json              # bun-managed; deps + scripts
└── bun.lock                  # Lockfile (bun 1.3.11)
```

## Directory Purposes

**`app/`:**
- Purpose: App Router surface — routing, root layout, global styles.
- Contains: `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`.
- Key files: `app/layout.tsx` (shell + fonts), `app/globals.css` (design tokens).
- Note: Route segments/pages/layouts follow Next.js 16.3 App Router conventions
  — verify against `node_modules/next/dist/docs/01-app` before adding routes.

**`components/ui/`:**
- Purpose: Design-system primitives (shadcn `style: base-nova`) built on
  `@base-ui/react` (a few on `@shadcn/react`).
- Contains: 61 files — `button`, `input`, `select`, `dialog`, `drawer`,
  `dropdown-menu`, `table`, `tabs`, `card`, `badge`, `avatar`, `chart`,
  `sidebar`, `command`, `carousel`, `sheet`, `toast`, plus chat-oriented
  primitives (`bubble`, `message`, `message-scroller`, `attachment`,
  `questionnaire`) and utilities (`kbd`, `marker`, `spinner`, `empty`).
- Key files: `components/ui/button.tsx` (canonical `cva` + `data-slot` pattern).
- Generated: Yes — added/updated via the `shadcn` CLI. Committed: Yes.

**`components/common/`:**
- Purpose: Reusable Project-Kita domain components.
- Contains: `product-card.tsx`, `verification-badge.tsx`, `logo.tsx`.
- Key files: `components/common/product-card.tsx` (marketplace card contract via
  `ProductCardProps`).

**`components/landing/`:**
- Purpose: Full-width marketing sections composed by the home page.
- Contains: `navbar`, `hero-section`, `marketplace-section`,
  `how-it-works-section`, `for-sellers-section`, `testimonials-section`,
  `cta-section`, `footer`, `category-tabs`.

**`hooks/`:**
- Purpose: Reusable client hooks (`"use client"` consumers).
- Contains: `use-mobile.ts`.

**`lib/`:**
- Purpose: Framework-agnostic utilities.
- Contains: `utils.ts` (`cn`). Aliased as `@/lib/utils` in `components.json`.

**`public/`:**
- Purpose: Statically served assets referenced by absolute path (`/logo.png`).
- Contains: `lyfjshs-logo.png`, `next.svg`, `vercel.svg`, `file.svg`,
  `globe.svg`, `window.svg`.

**`docs/`:**
- Purpose: Product/design reference. `DESIGN_SYSTEM.md` is the UI/UX source of
  truth (palette intent, typography, components, layout, voice).

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout, font loading, metadata.
- `app/page.tsx`: `/` route.

**Configuration:**
- `next.config.ts`: Image `remotePatterns` (currently `images.unsplash.com` only).
- `components.json`: shadcn style (`base-nova`), RSC on, icon library `lucide`,
  path aliases.
- `tsconfig.json`: `@/*` → `./*`; strict mode; `moduleResolution: bundler`.
- `eslint.config.mjs`: Flat config extending `eslint-config-next`.
- `postcss.config.mjs`: `@tailwindcss/postcss` plugin (Tailwind v4).

**Design Tokens / Styling:**
- `app/globals.css`: Tailwind v4 `@import`, `@theme inline` brand tokens,
  `:root` shadcn semantic vars, `@layer components` utilities
  (`.eyebrow`, `.tabular`, `.marker`, `.shadow-flyer`, `.pin`, `.bg-corkboard`).

**Core Logic / Helpers:**
- `lib/utils.ts`: `cn()`.
- `hooks/use-mobile.ts`: `useIsMobile()`.

**Testing:**
- None present. No test runner, config, or test files in the repo.

## Naming Conventions

**Files:**
- All component/hook/util files are **kebab-case**: `product-card.tsx`,
  `verification-badge.tsx`, `use-mobile.ts`, `how-it-works-section.tsx`.
- Extensions: `.tsx` for components, `.ts` for non-JSX modules.

**Components:**
- **Named exports** in PascalCase: `export function ProductCard(...)`,
  `export function Navbar(...)`. (Exception: `app/page.tsx` and `app/layout.tsx`
  use `export default` as required by Next.js.)

**Hooks:**
- `use`-prefixed camelCase: `useIsMobile`.

**Props / Types:**
- Prop interfaces are `<Component>Props`: `ProductCardProps`, `LogoProps`,
  `VerificationBadgeProps`. Exported when reused by callers (e.g.
  `ProductCardProps`, `SellerType`).

**Directories:**
- kebab/lowercase, grouped by role: `ui/`, `common/`, `landing/`.

**Styling:**
- Consume brand tokens via utility classes (`bg-kita-green`, `text-ink`,
  `border-line`, `shadow-flyer`, `eyebrow`, `tabular`) — avoid raw hex.

## Where to Add New Code

**New route/page:**
- Create a segment folder under `app/` with `page.tsx` (and optional
  `layout.tsx`, `loading.tsx`, `error.tsx`). Confirm exact conventions in
  `node_modules/next/dist/docs/01-app` first — this is Next.js 16.3.

**New landing/marketing section:**
- Add `components/landing/<name>-section.tsx` (named export, `"use client"` only
  if interactive) and compose it into `app/page.tsx`.

**New reusable domain component (ProductCard, SellerCard, etc.):**
- Add to `components/common/<kebab-name>.tsx`, export a named component plus its
  `<Name>Props` interface. Build it from `components/ui/*` primitives.

**New design-system primitive:**
- Prefer the shadcn CLI so it lands in `components/ui/` with project styling.
  Follow the `cva` + `data-slot` + `cn()` pattern in `components/ui/button.tsx`.
  Import behavior from `@base-ui/react/<name>`.

**New hook:**
- `hooks/use-<name>.ts`, named export, `use`-prefixed.

**New utility:**
- `lib/<name>.ts` (framework-agnostic). Import via `@/lib/...`.

**New design token / global utility:**
- Add to `app/globals.css` (`@theme inline` for tokens, `@layer components` for
  reusable classes). Do not scatter raw hex values through components.

**New external image host:**
- Add the host to `images.remotePatterns` in `next.config.ts`.

## Path Aliases

- `@/*` → project root (`tsconfig.json`).
- shadcn aliases (`components.json`): `@/components`, `@/components/ui`,
  `@/lib`, `@/lib/utils`, `@/hooks`.

## Special Directories

**`.next/`:**
- Purpose: Next.js build/dev output. Generated: Yes. Committed: No (gitignored).

**`.planning/`:**
- Purpose: GSD planning artifacts (`.planning/codebase/` holds these maps).
  Generated: Yes (by GSD tooling). Committed: Project-dependent.

**`node_modules/`:**
- Purpose: bun-installed dependencies. Also contains `next/dist/docs/` — the
  authoritative Next.js 16.3 guides referenced by `AGENTS.md`.
  Generated: Yes. Committed: No.

**`public/`:**
- Purpose: Static assets served from `/`. Generated: No. Committed: Yes.

---

*Structure analysis: 2026-08-12*
