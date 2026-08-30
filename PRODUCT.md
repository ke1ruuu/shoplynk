# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Student Buyers & Faculty**: Students, teachers, and school staff at Luis Y. Ferrer Jr. Senior High School (LYFJSHS) looking to browse, pre-order, and pick up student-made snacks, handmade crafts, stationery, and school merchandise.
- **Verified Student Sellers**: Aspiring student entrepreneurs who submit their school ID / LRN credentials to campus administrators for verification to launch and manage a campus storefront.
- **Campus Administrators**: School faculty and administrators responsible for reviewing student credentials, approving/rejecting seller applications, and governing campus store activity.

## Product Purpose
Project Kita is a closed-loop, hyper-localized campus marketplace for Luis Y. Ferrer Jr. Senior High School (LYFJSHS). It empowers student entrepreneurs to legally and safely sell products on campus while giving students and faculty a seamless way to discover and pre-order goods for physical on-campus pickup.

## Positioning
A trust-verified school commerce platform tailored specifically to senior high school campus dynamics with physical pickup points, student ID verification governance, and isolated institutional administrative controls.

## Operating Context
- On-campus environment (hallways, classroom lobbies, student kiosks).
- Physical designated pickup points across LYFJSHS (e.g. Building A Lobby, Main Courtyard).
- Mixed mobile-first and desktop student browsing, with desktop-oriented admin verification console.

## Capabilities and Constraints
- Direct PostgreSQL authentication with secure password hashing and signed HTTP-only session cookies.
- Strict role boundaries: `BUYER` (default student role), `SELLER` (unlocked upon admin approval of student verification), `CAMPUS_ADMIN` (restricted strictly to `/admin/*`).
- Real-time seller verification approval channel via Supabase WebSockets.
- Storefront deactivation / pausing, storefront deletion, and full account erasure.
- Single-campus focus on Luis Y. Ferrer Jr. Senior High School.

## Brand Commitments
- Name: Project Kita
- Primary Identity: Collegiate Crimson Red palette (`#D92323`, `#A31212`, `#FDE8E8`), high-contrast ink, and paper textures.
- Tone: Institutional yet vibrant, encouraging, student-centric, and secure.

## Evidence on Hand
- Full database migrations (`supabase/migrations/0001_initial_schema.sql`, `supabase/migrations/0002_custom_auth.sql`).
- Active component library in `components/` (Marketplace, Seller Studio, Admin Console, Shell, UI primitives).
- Sample mock catalog in `lib/mock-data.ts`.

## Product Principles
1. **Student Safety & Governance First**: Unverified students cannot open storefronts until campus administrators verify their identity.
2. **Frictionless School Commerce**: Fast ordering, transparent physical pickup locations, and responsive mobile-ready interfaces.
3. **Institutional Boundary Isolation**: Admins perform governance in a dedicated console, completely separate from buyer/seller workflows.
4. **Resilient Realtime Feedback**: Live data updates via Supabase channels with optimistic UI feedback.

## Accessibility & Inclusion
- WCAG 2.1 AA color contrast against paper and crimson red surfaces.
- Fully accessible keyboard navigation on modal dialogs and data tables.
