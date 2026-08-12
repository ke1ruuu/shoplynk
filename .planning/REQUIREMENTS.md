# Requirements: Project Kita

**Defined:** 2026-08-12
**Core Value:** A verified LYFJSHS student entrepreneur can list a product and complete a real, trusted transaction with a fellow member — discovery → order → payment → fulfillment — end to end, inside a marketplace private to the school community.

> Derived from the user-supplied authoritative Supabase schema (`0001_initial_schema.sql`) and `.planning/PROJECT.md`. The data model is fixed; these requirements make it testable and phase-mappable. v1 = the full platform (the stated target), delivered across roadmap phases, backend foundation first.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Backend Foundation

- [ ] **BACK-01**: The app connects to Supabase (Auth + Postgres + Storage) via a server-side client, configured through `.env.local` with a committed `.env.example`, and no secrets in client (`"use client"`) code
- [ ] **BACK-02**: The authoritative schema (enums, 15 tables, `handle_new_user` and `update_store_rating` triggers) is applied as a versioned migration
- [ ] **BACK-03**: Row-Level Security is enabled on every table, enforcing buyer / seller / admin access boundaries
- [ ] **BACK-04**: Storage buckets exist with correct privacy — verification IDs and payment receipts are private; product images and store logos/banners are public — and new hosts are added to `next.config.ts` `remotePatterns`
- [ ] **BACK-05**: Seed data loads the five categories and LYFJSHS as the sole active campus (replacing the placeholder campus in the migration)

### Authentication & Identity

- [ ] **AUTH-01**: A community member can sign up with email and password
- [ ] **AUTH-02**: A new member must confirm their email before gaining marketplace access
- [ ] **AUTH-03**: On signup, a profile (default role `BUYER`, assigned to LYFJSHS) and an empty cart are auto-provisioned via the `handle_new_user` trigger
- [ ] **AUTH-04**: A member can log in with email/password and remain logged in across page refreshes (server-managed session)
- [ ] **AUTH-05**: A member can log out from any page
- [ ] **AUTH-06**: A member can reset their password via an email link
- [ ] **AUTH-07**: The marketplace is campus-gated — unauthenticated visitors cannot view marketplace content and are directed to log in
- [ ] **AUTH-08**: Access and available actions reflect the member's role (`BUYER`, `SELLER`, `CAMPUS_ADMIN`, `PLATFORM_ADMIN`)

### Seller Verification

- [ ] **VERF-01**: A buyer can submit a seller-verification request with student ID number, ID image upload, program, and year level
- [ ] **VERF-02**: The uploaded ID image is stored privately and is not publicly accessible
- [ ] **VERF-03**: An admin can view pending verifications and approve or reject each with a reason
- [ ] **VERF-04**: Approval promotes the account to role `SELLER`; rejection records the reason
- [ ] **VERF-05**: A "Verified Student Seller" badge is shown on verified sellers' stores and listings

### Storefronts

- [ ] **STORE-01**: A verified seller can create a store (name, unique slug, description, logo, banner, GCash name/number, pickup locations, operating hours)
- [ ] **STORE-02**: A seller can edit their store details and toggle its active status
- [ ] **STORE-03**: Any member can view a store's public storefront page with its active listings
- [ ] **STORE-04**: A store shows an aggregate rating (average + count) maintained automatically by the `update_store_rating` trigger

### Products / Listings

- [ ] **PROD-01**: A seller can create a product (title, description, price, stock, category, prep time)
- [ ] **PROD-02**: A seller can edit and delete their own products
- [ ] **PROD-03**: A seller can set product status (`DRAFT`, `ACTIVE`, `OUT_OF_STOCK`, `ARCHIVED`); only `ACTIVE` products are publicly visible
- [ ] **PROD-04**: A seller can attach multiple images to a product in a defined display order
- [ ] **PROD-05**: Products are organized under the seeded categories (Food & Drinks, Handmade Crafts, Student Merchandise, School & Stationery, Lifestyle Goods)

### Discovery

- [ ] **DISC-01**: A member can browse active listings across the marketplace
- [ ] **DISC-02**: A member can filter listings by category
- [ ] **DISC-03**: A member can search listings by keyword (title / description)
- [ ] **DISC-04**: A member can sort listings (e.g., newest, price) and filter by a price range
- [ ] **DISC-05**: A member can open a product detail page showing images, price, description, seller, and store

### Cart & Checkout

- [ ] **CART-01**: A member can add a product to their cart with a quantity
- [ ] **CART-02**: A member can update quantities and remove items from their cart
- [ ] **CART-03**: The cart enforces a single store — adding a product from a different store prompts to clear and replace
- [ ] **CART-04**: A member can check out, choosing fulfillment and payment methods, which creates an order

### Orders

- [ ] **ORDR-01**: Placing an order generates a unique human-readable `order_number` and captures immutable line-item snapshots (title, price, quantity, subtotal)
- [ ] **ORDR-02**: An order progresses through its status lifecycle (`PENDING_PAYMENT` → `PENDING` → `CONFIRMED` → `PREPARING` → `READY_FOR_PICKUP` / `OUT_FOR_DELIVERY` → `COMPLETED`; plus `CANCELLED` / `REJECTED` / `EXPIRED`)
- [ ] **ORDR-03**: A buyer can view their order history and the current status and details of each order
- [ ] **ORDR-04**: A seller can view incoming orders for their store and advance status, or reject/cancel with a reason
- [ ] **ORDR-05**: Order totals are computed from line items at checkout time

### Payments (Manual)

- [ ] **PAY-01**: A buyer paying by GCash can submit a reference number and upload a payment receipt image (stored privately)
- [ ] **PAY-02**: A seller/admin can verify or reject a GCash payment, updating payment status (`PENDING` / `VERIFIED` / `REJECTED`)
- [ ] **PAY-03**: A buyer can choose Cash on Delivery (COD) as the payment method
- [ ] **PAY-04**: Payment status is tracked per order and gates order progression (verified payment advances the order out of `PENDING_PAYMENT`)

### Fulfillment

- [ ] **FULF-01**: At checkout a buyer selects a fulfillment method (`CAMPUS_PICKUP`, `HANDOFF`, or `LOCAL_DELIVERY`) with location details, preferred time, and notes
- [ ] **FULF-02**: The chosen fulfillment details are visible to both buyer and seller on the order

### Reviews

- [ ] **REV-01**: A buyer can leave one review (1–5 rating + comment) per product on a completed order
- [ ] **REV-02**: Reviews are publicly visible on the product/store and contribute to the store's aggregate rating
- [ ] **REV-03**: The system prevents duplicate reviews for the same order + product

### Notifications

- [ ] **NOTF-01**: A member receives in-app notifications for key events (order status changes, verification result, payment verification)
- [ ] **NOTF-02**: A member can view their notifications and mark them read

### Moderation & Admin

- [ ] **ADMN-01**: A member can report a product, store, or review with a reason
- [ ] **ADMN-02**: An admin can view reports and mark each `RESOLVED` or `DISMISSED`
- [ ] **ADMN-03**: An admin area surfaces pending verifications, reports, and oversight of stores/orders, role-gated (`PLATFORM_ADMIN` platform-wide; `CAMPUS_ADMIN` scoped to their campus)

### Multi-Campus (Structural)

- [ ] **CAMP-01**: Campus-scoped data (profiles, stores, orders) is associated with a `campus_id`
- [ ] **CAMP-02**: LYFJSHS is seeded as the sole active campus, and new signups are assigned to it

### Frontend Build-out

- [ ] **UI-01**: The mock/sample marketplace is replaced with live, data-driven listings from the database
- [ ] **UI-02**: Buyers have app surfaces for browsing, cart, checkout, orders, and reviews, consistent with the design system
- [ ] **UI-03**: Sellers have a dashboard for store management, product management, and order fulfillment
- [ ] **UI-04**: Admins have a dashboard for verifications and reports
- [ ] **UI-05**: All new UI consumes the implemented design tokens (`app/globals.css`) and lucide-react icons, mobile-first

## v2 Requirements

Deferred to a future milestone. Tracked but not in the current roadmap.

### Notifications

- **NOTF-03**: Email / push notification delivery channels (v1 is in-app only)
- **NOTF-04**: Per-member notification preferences

### Orders

- **ORDR-06**: Buyer-initiated dispute / refund workflow (beyond seller reject + basic cancellation)

### Moderation & Admin

- **ADMN-04**: Granular `CAMPUS_ADMIN` vs `PLATFORM_ADMIN` permission matrix
- **ADMN-05**: Member suspension / ban controls (requires a schema extension)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Integrated payment gateway (Stripe / PayMongo / GCash API) | v1 uses manual GCash receipt verification + COD; automated settlement deferred |
| In-app chat / realtime messaging | Not in the authoritative schema; coordination happens via the order/fulfillment flow and published store contact |
| Favorites / wishlist | In the design doc but not the authoritative schema |
| Faculty seller verification | Schema models student verification only |
| Self-serve multi-campus onboarding | Data model is multi-campus-ready, but only LYFJSHS is active |
| Platform-run delivery logistics / rider network | `LOCAL_DELIVERY` is seller-arranged; no platform logistics |
| Advanced analytics dashboards | Beyond store rating aggregation and basic order/status counts |
| Native mobile apps | Web-first, responsive only |

## Traceability

Which phases cover which requirements. **Populated during roadmap creation** (Step 8) — currently unmapped.

| Requirement | Phase | Status |
|-------------|-------|--------|
| _(all v1 requirements)_ | _pending roadmap_ | Pending |

**Coverage:**
- v1 requirements: 62 total
- Mapped to phases: 0 (roadmap not yet created)
- Unmapped: 62 ⚠️ (resolved when ROADMAP.md is generated)

---
*Requirements defined: 2026-08-12*
*Last updated: 2026-08-12 after initial definition*
