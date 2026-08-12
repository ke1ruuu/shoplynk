# Testing Patterns

**Analysis Date:** 2026-08-12

## Status: Not detected

**There is no automated testing setup in this repository.** This is a
significant gap to address before the codebase grows a data/business layer.

Evidence gathered during analysis:
- No test runner configured: no `jest.config.*`, `vitest.config.*`,
  `playwright.config.*`, or `cypress.config.*` at the repo root.
- No test files: zero `*.test.*` / `*.spec.*` files anywhere outside
  `node_modules/`.
- No test directories: no `__tests__/`, `test/`, `tests/`, or `e2e/`.
- No test dependencies in `package.json` (no `jest`, `vitest`,
  `@testing-library/*`, `playwright`, `cypress`, or assertion libraries).
- No test script: `package.json` `scripts` contains only `dev`, `build`,
  `start`, `lint`. There is no `test` script.

The only automated quality gate currently present is **ESLint**
(`eslint.config.mjs`, run via `bun run lint`), which provides static analysis but
is not a substitute for tests.

---

## Test Framework

- Runner: **Not detected**
- Assertion library: **Not detected**
- Run commands: **None** (no `test` script defined)

---

## Test File Organization

- **Not applicable** — no tests exist. No convention is established yet for
  co-located vs. separate test files or naming.

---

## Test Structure

- **Not applicable.**

---

## Mocking

- **Not applicable.** No mocking framework or fixtures present.

---

## Fixtures and Factories

- **Not detected** as test infrastructure. Note: demo/sample data currently
  lives inline inside components (e.g. `CATEGORIES` in
  `components/landing/category-tabs.tsx`, `CATEGORY_LABELS` in
  `components/common/product-card.tsx`). If tests are introduced, extract shared
  sample data into reusable fixtures.

---

## Coverage

- **None enforced.** No coverage tooling or thresholds configured.

---

## Recommended Setup (gap remediation)

When testing is introduced, align with the stack (Next.js 16.3, React 19.2,
Bun 1.3, Tailwind v4, `@base-ui/react`):

1. **Component/unit tests:** Vitest + React Testing Library +
   `@testing-library/jest-dom` (Vitest integrates cleanly with the existing
   TypeScript/ESM + bundler-resolution config and runs fast under Bun).
   - Verify Next-specific caveats against `node_modules/next/dist/docs/` before
     wiring up (`AGENTS.md` warns this Next.js has breaking changes).
   - Mirror the `@/*` path alias (`tsconfig.json`) in the test runner config.
   - Prime targets given current code:
     - `lib/utils.ts` `cn()` merge behavior.
     - `hooks/use-mobile.ts` `useIsMobile` (matchMedia / resize handling).
     - `components/common/verification-badge.tsx` (Student vs. Faculty rendering,
       label + icon presence — validates the "never color alone" rule).
     - `components/common/product-card.tsx` (like toggle, aria state, price
       formatting).
2. **Interaction/E2E:** Playwright for the landing page and future flows
   (search, listing creation, messaging) called out in `docs/DESIGN_SYSTEM.md`.
3. **Accessibility tests:** given the strong a11y conventions
   (`docs/DESIGN_SYSTEM.md` §27), add `axe`-based checks (e.g. `jest-axe` /
   `@axe-core/playwright`) to guard focus states, ARIA usage, and
   color-independent status indicators.
4. Add a `test` script to `package.json` and run it in CI alongside `lint`.

---

*Testing analysis: 2026-08-12*
