# Roadmap: Project Kita

## Overview

Project Kita evolves from a static, mock-data landing page into a private, campus-gated commerce marketplace for LYFJSHS. Delivery is a series of vertical MVP slices, each shipping a real, usable capability end to end. We start by making the marketing shell real — Supabase (Auth + Postgres + Storage) with the authoritative schema, RLS, storage buckets, and campus-gated authentication — so Phase 1 ends with a working private authenticated shell rather than a bare data layer. From there each phase advances the core value loop: verified sellers open stores and list products (Phase 2); buyers discover products, build a cart, and place orders (Phase 3); orders complete through manual GCash/COD payment verification and pickup/handoff/delivery (Phase 4); the post-transaction trust loop closes with reviews and in-app notifications (Phase 5); and moderation plus role-gated admin oversight keep the marketplace safe and governable (Phase 6). Every phase consumes the implemented design tokens in `app/globals.css` and respects the fixed data model.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Authenticated Shell** - Supabase backend live; campus-gated signup → email confirm → login → private authenticated shell
- [ ] **Phase 2: Verified Sellers & Storefronts** - A verified student seller opens a store and publishes a live product listing
- [ ] **Phase 3: Discovery, Cart & Order Placement** - A buyer discovers a live product, builds a single-store cart, and places a real order
- [ ] **Phase 4: Payments & Fulfillment** - An order reaches COMPLETED via manual GCash/COD verification and pickup/handoff/delivery
- [ ] **Phase 5: Trust Loop — Reviews & Notifications** - Post-transaction reviews feed store ratings and in-app notifications keep members informed
- [ ] **Phase 6: Moderation & Admin** - Content reports and role-gated admin dashboards for oversight and governance

## Phase Details

### Phase 1: Foundation & Authenticated Shell
**Goal**: Make the scaffold real — integrate Supabase (Auth + Postgres + Storage) with the authoritative schema, RLS, and storage buckets, and deliver campus-gated authentication so a community member can sign up, confirm email, log in, and land in a private authenticated shell.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: BACK-01, BACK-02, BACK-03, BACK-04, BACK-05, AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07, AUTH-08, CAMP-01, CAMP-02, UI-05
**Success Criteria** (what must be TRUE):
  1. A community member can sign up with email/password, receives a confirmation email, and must confirm before gaining marketplace access.
  2. On signup a BUYER profile (assigned to LYFJSHS) and an empty cart are auto-provisioned via the `handle_new_user` trigger; LYFJSHS is seeded as the sole active campus and the five categories are loaded.
  3. A confirmed member can log in and stay logged in across refreshes (server-managed session), reset a forgotten password via email link, and log out from any page.
  4. An unauthenticated visitor cannot view marketplace content and is directed to log in; available surfaces and actions reflect the member's role (`BUYER`/`SELLER`/`CAMPUS_ADMIN`/`PLATFORM_ADMIN`).
  5. RLS is enabled on every table enforcing buyer/seller/admin boundaries; verification-ID and receipt buckets are private while product/store image buckets are public; all new auth UI uses the `app/globals.css` design tokens and lucide-react icons, mobile-first.
**Plans**: TBD
**UI hint**: yes

### Phase 2: Verified Sellers & Storefronts
**Goal**: A buyer becomes a verified student seller via ID upload + admin review, opens a managed storefront, and publishes a live product listing — all from a seller dashboard consistent with the design system.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: VERF-01, VERF-02, VERF-03, VERF-04, VERF-05, STORE-01, STORE-02, STORE-03, STORE-04, PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, UI-03
**Success Criteria** (what must be TRUE):
  1. A buyer can submit a seller-verification request (student ID number, ID image upload, program, year level) with the ID image stored privately and not publicly accessible.
  2. An admin can view pending verifications and approve/reject each with a reason; approval promotes the account to `SELLER` and a "Verified Student Seller" badge appears on that seller's store and listings.
  3. A verified seller can create and edit a store (name, unique slug, description, logo, banner, GCash name/number, pickup locations, operating hours) and toggle its active status.
  4. A seller can create, edit, delete, and status-manage products (`DRAFT`/`ACTIVE`/`OUT_OF_STOCK`/`ARCHIVED`) with multiple ordered images under a seeded category, from a seller dashboard.
  5. An `ACTIVE` product appears on the store's public storefront page (visible to any member), which shows the store's aggregate rating (average + count).
**Plans**: TBD
**UI hint**: yes

### Phase 3: Discovery, Cart & Order Placement
**Goal**: Replace the mock marketplace with live, data-driven listings so a buyer can discover a product, build a single-store cart, and check out to place a real order that both buyer and seller can see and manage.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: DISC-01, DISC-02, DISC-03, DISC-04, DISC-05, CART-01, CART-02, CART-03, CART-04, ORDR-01, ORDR-02, ORDR-03, ORDR-04, ORDR-05, UI-01, UI-02
**Success Criteria** (what must be TRUE):
  1. A member can browse the live marketplace (mock/sample data replaced by database listings), filter by category, search by keyword, sort, filter by price range, and open a product detail page showing images, price, description, seller, and store.
  2. A member can add a product to a single-store cart with a quantity, update quantities, and remove items; adding a product from a different store prompts to clear and replace.
  3. A member can check out (choosing fulfillment and payment options), which creates an order with a unique human-readable `order_number`, immutable line-item snapshots (title, price, quantity, subtotal), and totals computed from line items at checkout time.
  4. A buyer can view their order history and the current status and details of each order.
  5. A seller can view incoming orders for their store and advance status or reject/cancel with a reason, and orders move through the defined lifecycle (`PENDING_PAYMENT` → `PENDING` → `CONFIRMED` → `PREPARING` → `READY_FOR_PICKUP`/`OUT_FOR_DELIVERY` → `COMPLETED`; plus `CANCELLED`/`REJECTED`/`EXPIRED`).
**Plans**: TBD
**UI hint**: yes

### Phase 4: Payments & Fulfillment
**Goal**: Close the second half of the transaction loop so an order can actually reach `COMPLETED` — buyers pay by GCash (reference + receipt) or COD, sellers/admins verify payment, and fulfillment happens via campus pickup, handoff, or local delivery.
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: PAY-01, PAY-02, PAY-03, PAY-04, FULF-01, FULF-02
**Success Criteria** (what must be TRUE):
  1. At checkout a buyer selects a fulfillment method (`CAMPUS_PICKUP`, `HANDOFF`, or `LOCAL_DELIVERY`) with location details, preferred time, and notes, and those details are visible to both buyer and seller on the order.
  2. A buyer paying by GCash can submit a reference number and upload a payment receipt image that is stored privately; a buyer can alternatively choose Cash on Delivery (COD).
  3. A seller/admin can verify or reject a GCash payment, updating payment status (`PENDING`/`VERIFIED`/`REJECTED`).
  4. A verified payment advances the order out of `PENDING_PAYMENT`, and the seller can progress it through to `COMPLETED`, completing a real end-to-end transaction.
**Plans**: TBD
**UI hint**: yes

### Phase 5: Trust Loop — Reviews & Notifications
**Goal**: Close the post-transaction trust loop and keep members informed — buyers review completed orders (feeding store ratings) and members receive and manage in-app notifications for key events.
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: REV-01, REV-02, REV-03, NOTF-01, NOTF-02
**Success Criteria** (what must be TRUE):
  1. A buyer can leave one review (1–5 rating + comment) per product on a completed order, and the system prevents duplicate reviews for the same order + product.
  2. Reviews are publicly visible on the product/store and contribute to the store's aggregate rating via the `update_store_rating` trigger.
  3. A member receives in-app notifications for key events (order status changes, verification result, payment verification).
  4. A member can view their notifications and mark them read.
**Plans**: TBD
**UI hint**: yes

### Phase 6: Moderation & Admin
**Goal**: Give the marketplace governance — members can report bad content and admins get a role-gated dashboard to review verifications, resolve reports, and oversee stores and orders.
**Mode:** mvp
**Depends on**: Phase 5
**Requirements**: ADMN-01, ADMN-02, ADMN-03, UI-04
**Success Criteria** (what must be TRUE):
  1. A member can report a product, store, or review with a reason.
  2. An admin can view reports and mark each `RESOLVED` or `DISMISSED`.
  3. An admin dashboard surfaces pending verifications, reports, and oversight of stores/orders, role-gated so `PLATFORM_ADMIN` sees platform-wide and `CAMPUS_ADMIN` is scoped to their campus.
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Authenticated Shell | 0/TBD | Not started | - |
| 2. Verified Sellers & Storefronts | 0/TBD | Not started | - |
| 3. Discovery, Cart & Order Placement | 0/TBD | Not started | - |
| 4. Payments & Fulfillment | 0/TBD | Not started | - |
| 5. Trust Loop — Reviews & Notifications | 0/TBD | Not started | - |
| 6. Moderation & Admin | 0/TBD | Not started | - |
