# Codebase Concerns

**Analysis Date:** 2026-08-12

> Context: Early-stage Next.js project (single "Initial commit from Create Next App",
> most work still uncommitted). This is a static marketing/landing page built on a
> shadcn/ui component library. There is no backend, data layer, tests, or CI yet.
> The most important risk is dependency/framework bleeding-edge instability, not
> logic bugs — there is very little application logic to have bugs.

## Tech Debt

**Non-standard / pinned Next.js version (highest priority):**
- Issue: `AGENTS.md` explicitly warns "This is NOT the Next.js you know" — APIs, conventions, and file structure "may all differ from your training data." Next is pinned to an exact `16.3.0` (`package.json:21`), with `eslint-config-next` also pinned to `16.3.0`. Any code written from memory/older Next.js knowledge (App Router APIs, `next/image`, `next/font`, route handlers, config shape) can silently break or use deprecated behavior.
- Files: `AGENTS.md`, `package.json:21,37`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`
- Impact: Agents/devs relying on prior Next.js knowledge will produce code that does not match this release. Version is pinned exactly, so `bun install` won't drift, but it also won't pick up patch fixes for a fast-moving release.
- Fix approach: Before writing any Next.js-touching code, read the relevant guide under `node_modules/next/dist/docs/` (confirmed present: `01-app`, `02-pages`, `03-architecture`, `04-community`, `index.md`). Treat the in-repo docs as source of truth over training data. Verify behavior of `next/image`, `next/font/google`, and `metadata` against those docs.

**Self-rewriting AGENTS.md block creates perpetual git churn:**
- Issue: The `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md` is auto-written/re-added by `next dev` (generator confirmed at `node_modules/next/dist/server/lib/generate-agent-files.js`, 7.4 KB). Deleting it from a diff just re-creates the uncommitted change on the next `next dev`.
- Files: `AGENTS.md:1-9`, `node_modules/next/dist/server/lib/generate-agent-files.js`
- Impact: `AGENTS.md` will keep showing as modified/dirty after running the dev server, muddying diffs and risking accidental reverts.
- Fix approach: Commit the generated block as-is and leave it. Do not fight the generator.

**shadcn CLI shipped as a runtime dependency:**
- Issue: `shadcn` (`^4.17.0`, the CLI) and `@shadcn/react` (`^0.3.0`) are in `dependencies`, not `devDependencies` (`package.json:13,27`). The `shadcn` CLI pulls a heavy tree (babel, `@dotenvx/dotenvx`, `@modelcontextprotocol/sdk`, `undici`, `ts-morph`, `execa`, etc. — see `bun.lock`).
- Files: `package.json:13,27`, `bun.lock`
- Impact: Bloats the production dependency graph and install/build surface with build-time-only tooling; larger attack surface and slower CI installs.
- Fix approach: Move `shadcn` (and likely `@shadcn/react` if only used for generation) to `devDependencies`. Verify components still resolve — the generated components import from `@base-ui/react`, `lucide-react`, `class-variance-authority`, etc., not from `shadcn`.

**Stale boilerplate README:**
- Issue: `README.md` is the untouched create-next-app default. It references the Geist font (this project uses Bricolage Grotesque / Plus Jakarta Sans / Space Mono per `app/layout.tsx:2-25`) and suggests `npm`/`yarn`/`pnpm` (this project standardizes on `bun@1.3.11`, `package.json:41`).
- Files: `README.md`, `app/layout.tsx:2-25`, `package.json:41`
- Impact: Misleads new contributors about fonts, tooling, and setup; no real project description, architecture, or run instructions.
- Fix approach: Rewrite README with actual project purpose ("Project Kita — student-entrepreneur marketplace"), bun commands, and structure. Note the real design system lives in `docs/DESIGN_SYSTEM.md`.

**Large generated UI files:**
- Issue: `components/ui/sidebar.tsx` is 723 lines; `chart.tsx` (373), `questionnaire.tsx` (324), `combobox.tsx` (297) are also large. 61 UI components are installed but the only page (`app/page.tsx`) uses a handful.
- Files: `components/ui/sidebar.tsx`, `components/ui/chart.tsx`, plus 59 others in `components/ui/`
- Impact: Most of the UI library is dead code today. Large surface to maintain/upgrade against the bleeding-edge stack; harder to reason about what is actually shipped.
- Fix approach: Acceptable as a vendored shadcn library, but prune unused components before first real milestone, or keep them isolated and untouched (do not hand-edit generated files; re-generate via the CLI).

## Known Bugs

No functional bugs identified — the app is a static landing page with minimal logic. No `TODO`/`FIXME`/`HACK`/`XXX`, no `@ts-ignore`/`@ts-nocheck`/`eslint-disable`, and no `: any`/`as any` casts were found in `app/`, `components/`, `hooks/`, or `lib/`. The one piece of interactive logic (favorite toggle in `components/common/product-card.tsx:41-90`) is local-only state with no persistence, which is expected for the current stage.

## Security Considerations

**No secrets present (good), but no env scaffolding either:**
- Risk: No `.env*` files exist and no `process.env` usage was found in source — so there are currently no leaked secrets. `.env*` is correctly gitignored (`.gitignore:34`) and `*.pem` is ignored (`.gitignore:25`).
- Files: `.gitignore:25,34`
- Current mitigation: Adequate for a static site with no backend.
- Recommendations: When a data layer / auth is added, establish `.env.local` + a committed `.env.example`, and never introduce secrets into client components (anything under `"use client"`, e.g. `components/common/product-card.tsx:1`).

**Third-party image CDN allow-list:**
- Risk: `next.config.ts:4-11` allows remote images only from `images.unsplash.com`. All hero/marketplace/testimonial imagery is hardcoded Unsplash URLs (see `components/landing/marketplace-section.tsx:18-58`, `hero-section.tsx:16-36`, `testimonials-section.tsx:25-46`, `for-sellers-section.tsx:72`).
- Files: `next.config.ts`, `components/landing/*.tsx`
- Current mitigation: Narrow allow-list is good practice.
- Recommendations: Treat these as placeholders; real user-uploaded product images will require adding a proper storage/CDN host to `remotePatterns` and validating/optimizing untrusted uploads.

## Performance Bottlenecks

**Google Fonts fetched at build/runtime:**
- Problem: Three `next/font/google` families are loaded (`app/layout.tsx:6-25`). This adds a build-time network dependency and font payload.
- Files: `app/layout.tsx:2-25`
- Cause: Multiple display + body + mono faces.
- Improvement path: Acceptable; `display: "swap"` is set. If build isolation is needed, consider self-hosting the fonts.

**Client component for trivial interactivity:**
- Problem: `components/common/product-card.tsx` is a `"use client"` component for a single like-button toggle, and is rendered per listing.
- Files: `components/common/product-card.tsx:1-113`
- Cause: Local `useState` for `isLiked`.
- Improvement path: Minor. Fine at current scale; if listings grow large, isolate only the button as the client boundary and keep the card server-rendered.

## Fragile Areas

**Entire content layer is hardcoded mock data:**
- Files: `components/landing/marketplace-section.tsx`, `hero-section.tsx`, `testimonials-section.tsx`, `for-sellers-section.tsx`, `category-tabs.tsx`
- Why fragile: Products, sellers, prices, and testimonials are inline literals, and images are external Unsplash URLs that can rate-limit, change, or 404. There is no data model, so "the marketplace" is not backed by anything.
- Safe modification: When introducing real data, define shared types (extend `ProductCardProps` in `components/common/product-card.tsx:8-19`) and centralize data fetching; do not deepen the inline-array pattern.
- Test coverage: None.

**Uncommitted work-in-progress (version-control fragility):**
- Files: nearly the whole app — `components/`, `hooks/`, `lib/`, `docs/`, `components.json`, `public/lyfjshs-logo.png` are all untracked (`??`); `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `next.config.ts`, `package.json`, `bun.lock` are modified but uncommitted.
- Why fragile: Only one commit exists ("Initial commit from Create Next App"). All meaningful work lives in the working tree with no history/backup and nothing under review.
- Safe modification: Commit the current state in logical chunks before further changes so work is recoverable and diffable.
- Test coverage: None.

**Branch mismatch:**
- Files: repo git config
- Why fragile: Work is on `master`, but the intended integration branch is `main` (which does not exist yet). PR/merge workflow is undefined.
- Safe modification: Decide on the default branch and create/align `main` before opening PRs.

**`sharp` install-script handling is ambiguous:**
- Files: `package.json:42-49`
- Why fragile: `sharp` appears in both `ignoreScripts` and `trustedDependencies` (and `next@16.3.0` lists `sharp@^0.35.3` as an optional dependency for image optimization, per `bun.lock`). If `sharp` postinstall/binaries are skipped, production `next/image` optimization can fail or fall back.
- Safe modification: Confirm `sharp` binaries are present after install; verify `next build` produces optimized images. Resolve the ignore-vs-trust contradiction intentionally.

## Scaling Limits

**No backend / persistence layer:**
- Current capacity: Static page only; zero dynamic capacity.
- Limit: Cannot store users, listings, orders, favorites, or auth. The favorite toggle resets on reload.
- Scaling path: Add API routes / server actions (per in-repo Next.js docs), a database, and auth before any marketplace functionality. This is a greenfield decision, not a migration.

## Dependencies at Risk

**Bleeding-edge / unusually-high major versions across the stack:**
- Risk: The stack sits on very new releases whose behavior likely differs from common knowledge:
  - `next@16.3.0` (peer requires React 18.2+/19; pinned exact) — `package.json:21`
  - `react@19.2.8` / `react-dom@19.2.8` (pinned exact) — `package.json:22,24`
  - `tailwindcss@^4` with `@tailwindcss/postcss@^4` (Tailwind v4 config-less model; note `components.json:7` `tailwind.config` is empty) — `package.json:32,38`, `postcss.config.mjs`, `app/globals.css`
  - `lucide-react@^1.31.0` — an unusually high major relative to the historically `0.x` line; verify import paths/icon names against the installed package
  - `@base-ui/react@^1.7.0` (Base UI is the underlying primitive lib for these components) — `package.json:12`
  - `recharts@3.8.0`, `react-day-picker@^10.0.1`, `react-resizable-panels@^4.12.2`, `embla-carousel-react@^8.6.0`, `cmdk@^1.1.1` — `package.json:16,23,25,18`
- Impact: API drift vs. documentation/training data; upgrade friction; potential peer-dependency conflicts as any one package moves. Exact pins on `next`/`react` reduce drift but also block patch fixes.
- Migration plan: Pin intentionally and upgrade deliberately. Before using any component, confirm its API against the installed version (`node_modules/<pkg>`), not memory. Prefer the vendored shadcn components (which target `@base-ui/react`) over hand-rolled usage. Re-run `next build` after any dependency bump to catch breakage early.

## Missing Critical Features

**No automated quality gates:**
- Problem: No CI (`.github/` absent), no pre-commit hooks, and the `lint` script is a bare `eslint` with no target/args (`package.json:9`) so it may not lint the intended files reliably. No formatter config (no `.prettierrc`/`biome.json`).
- Blocks: Consistent, enforced quality; regressions on this fast-moving stack will go unnoticed.

**No product/marketplace functionality:**
- Problem: `metadata` promises "Discover, support, and sell products and services" (`app/layout.tsx:27-31`), but there is no auth, listings backend, search, or transactions — only a marketing page.
- Blocks: Everything the product actually claims to do.

## Test Coverage Gaps

**Zero tests, zero test tooling:**
- What's not tested: Everything. No test runner (no Jest/Vitest/Playwright in `package.json`), no `*.test.*` / `*.spec.*` files anywhere, and no `test` script. `/coverage` is gitignored (`.gitignore:14`) but nothing generates coverage.
- Files: entire repo (`app/`, `components/`, `hooks/`, `lib/`)
- Risk: On a bleeding-edge Next 16 / React 19 / Tailwind v4 stack, dependency bumps or Next.js behavior changes can break rendering or the build with no safety net.
- Priority: High before real logic lands. Minimum recommended: a component/render smoke test for `app/page.tsx` and a unit test for `hooks/use-mobile.ts` (has SSR guard + matchMedia listener logic worth locking down) and `lib/utils.ts` `cn()`. Add a `test` script and choose a runner compatible with this Next.js version (Playwright is already a Next optional peer per `bun.lock`).

---

*Concerns audit: 2026-08-12*
