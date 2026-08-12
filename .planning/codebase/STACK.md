# Technology Stack

**Analysis Date:** 2026-08-12

> IMPORTANT: This project runs **Next.js 16.3.0**, declared in `AGENTS.md` as a NON-STANDARD release with breaking changes vs. common Next.js knowledge. Treat the **installed** version as the source of truth. Version-specific guides ship inside the package at `node_modules/next/dist/docs/` (subfolders `01-app`, `02-pages`, `03-architecture`, `04-community`, plus `index.md`). Read the relevant guide there BEFORE writing framework code — do not rely on memorized Next.js APIs.

## Languages

**Primary:**
- TypeScript `^5` - All application code (`.ts`, `.tsx`). Strict mode enabled. Used across `app/`, `components/`, `lib/`, `hooks/`.

**Secondary:**
- CSS - Tailwind v4 layer directives and design tokens in `app/globals.css` (custom `@theme inline` block).
- JavaScript (ESM) - Config files only: `postcss.config.mjs`, `eslint.config.mjs`.

**TypeScript compiler settings** (`tsconfig.json`):
- `target: ES2017`, `module: esnext`, `moduleResolution: bundler`
- `strict: true`, `noEmit: true`, `isolatedModules: true`, `jsx: react-jsx`
- `allowJs: true`, `resolveJsonModule: true`, `incremental: true`
- Next.js TS plugin registered (`plugins: [{ name: "next" }]`)
- Path alias: `@/*` → `./*` (repo root)

## Runtime

**Environment:**
- Node.js `v24.12.0` (installed on this machine). No `.nvmrc` / `.node-version` pins the version.
- Browser runtime: React 19 with the Next.js App Router (React Server Components enabled). 45 files carry a `"use client"` directive.

**Package Manager:**
- Bun `1.3.11` - Declared via `"packageManager": "bun@1.3.11"` in `package.json`.
- Lockfile: **present** - `bun.lock` (~180 KB, committed). No `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`.
- `ignoreScripts` / `trustedDependencies`: `sharp`, `unrs-resolver` (native postinstall scripts gated to these two packages).

## Frameworks

**Core:**
- Next.js `16.3.0` - Full-stack React framework. App Router architecture (`app/` directory). RSC enabled (`components.json` → `"rsc": true`). Config in `next.config.ts` (typed `NextConfig`).
- React `19.2.8` / React DOM `19.2.8` - UI runtime (exact-pinned, not caret-ranged).

**Testing:**
- Not detected. No `jest.config.*`, `vitest.config.*`, `playwright.config.*`, no `*.test.*` / `*.spec.*` files, and no test dependencies in `package.json`.

**Build/Dev:**
- Next.js CLI - `next dev` (dev), `next build` (build), `next start` (serve). Scripts in `package.json`.
- Tailwind CSS `^4` + `@tailwindcss/postcss` `^4` - Styling engine wired through PostCSS (`postcss.config.mjs`).
- ESLint `^9` (flat config) with `eslint-config-next` `16.3.0` - Lint via `next lint`-equivalent flat config (`eslint.config.mjs`).

## Key Dependencies

**Critical (framework + design system):**
- `next` `16.3.0` - App framework (non-standard release — see top note).
- `react` / `react-dom` `19.2.8` - Rendering runtime.
- `tailwindcss` `^4` - Utility-first CSS; consumed via `app/globals.css` (`@import "tailwindcss"`).
- `shadcn` `^4.17.0` + `@shadcn/react` `^0.3.0` - shadcn/ui component system. Configured in `components.json` (style `"base-nova"`, base color `neutral`, CSS-variables mode). Also imported in CSS via `@import "shadcn/tailwind.css"`.
- `@base-ui/react` `^1.7.0` - Headless/unstyled primitive layer underneath the shadcn components. Imported in ~20 `components/ui/*` files (e.g. `@base-ui/react/dialog`, `@base-ui/react/select`). This is the accessibility/behavior foundation (replaces the Radix layer of classic shadcn).

**UI utilities:**
- `class-variance-authority` `^0.7.1` - Variant-driven component styling (buttons, badges, etc.).
- `clsx` `^2.1.1` + `tailwind-merge` `^3.6.0` - Combined in `lib/utils.ts` as the `cn()` helper for conditional class merging.
- `tw-animate-css` `^1.4.0` - Animation utilities; imported at top of `app/globals.css`.
- `lucide-react` `^1.31.0` - Outline icon system. Designated icon library in both `components.json` (`"iconLibrary": "lucide"`) and `docs/DESIGN_SYSTEM.md` (§28).

**Feature/widget libraries (per-component):**
- `recharts` `3.8.0` - Charting. Used by `components/ui/chart.tsx` (seller-dashboard analytics surfaces).
- `embla-carousel-react` `^8.6.0` - Carousel engine. Used by `components/ui/carousel.tsx`.
- `cmdk` `^1.1.1` - Command palette. Used by `components/ui/command.tsx`.
- `input-otp` `^1.4.2` - OTP entry. Used by `components/ui/input-otp.tsx`.
- `react-day-picker` `^10.0.1` + `date-fns` `^4.4.0` - Date picker + date utilities. Used by `components/ui/calendar.tsx`.
- `react-resizable-panels` `^4.12.2` - Split/resizable layouts. Used by `components/ui/resizable.tsx`.

**Type definitions (dev):**
- `@types/node` `^20`, `@types/react` `^19`, `@types/react-dom` `^19`.

## Configuration

**Environment:**
- No `.env*` files present in the repo. `.gitignore` ignores `.env*` (opt-in commit only) — never read/commit secrets.
- No runtime env-var access detected in source (`process.env` not referenced in `app/`, `components/`, `lib/`, `hooks/`). The app is currently a static, data-free landing experience.

**Build:**
- `next.config.ts` - Only configures `images.remotePatterns` to allow `images.unsplash.com` over HTTPS (placeholder product/testimonial imagery).
- `postcss.config.mjs` - Registers the `@tailwindcss/postcss` plugin (single-plugin Tailwind v4 pipeline).
- `eslint.config.mjs` - Flat config composing `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`, with default ignores re-declared (`.next/**`, `out/**`, `build/**`, `next-env.d.ts`).
- `components.json` - shadcn generator config; aliases `@/components`, `@/lib`, `@/lib/utils`, `@/components/ui`, `@/hooks`.
- `next-env.d.ts` - Auto-generated Next types (do not edit); references `.next/dev/types/routes.d.ts` and `root-params.d.ts`.

**Fonts (implementation vs. design doc):**
- Actual: `next/font/google` loads `Bricolage_Grotesque` (display), `Plus_Jakarta_Sans` (body/UI), and `Space_Mono` (prices/data) — wired via CSS variables `--font-bricolage`, `--font-jakarta`, `--font-space-mono` in `app/layout.tsx` and mapped to `--font-display` / `--font-sans` / `--font-mono` in `app/globals.css`.
- Note the divergence from static docs: `docs/DESIGN_SYSTEM.md` §5 specifies **Inter**, and `README.md` (unmodified create-next-app boilerplate) mentions **Geist**. The three-font system in `app/layout.tsx` is the current source of truth for typography.

**Design tokens:**
- Centralized as CSS custom properties in `app/globals.css` (`@theme inline` + `:root`). Brand palette (kita-green `#0C6B4E`, spark `#F2B32C`, paper `#F4F3EA`, ink `#16241D`) plus shadcn semantic aliases (`--primary`, `--secondary`, `--destructive`, etc.) and radius scale (`--radius-sm`…`--radius-2xl`). See `docs/DESIGN_SYSTEM.md` for intent.

## Platform Requirements

**Development:**
- Bun `1.3.11` (declared package manager) for install/scripts; Node.js runtime present at `v24.12.0`.
- macOS/Linux/Windows supported via Next.js dev server (`bun dev` → `next dev`, defaults to `http://localhost:3000`).

**Production:**
- Vercel is the implied deployment target (create-next-app defaults, `public/vercel.svg`, `.gitignore` entry for `.vercel`, `README.md` deployment section). No `vercel.json`, `Dockerfile`, or CI workflow (`.github/workflows/`) is committed — deployment config is not yet formalized.

---

*Stack analysis: 2026-08-12*
