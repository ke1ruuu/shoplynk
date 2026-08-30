# Design Brief: Project Kita Flatline 2-Column System

## 1. Job and Audience
- **Surfaces**: Marketplace, Buyer Home, Seller Studio Dashboard, Admin Verification Console, and Seller Verification Flow.
- **Audience**: LYFJSHS Students, Student Sellers, and Campus Administrators.
- **Need**: Fast, dense, highly-scannable commerce and governance interface without floating card clutter or awkward centered islands.

## 2. Outcome and Proof
- Replaces heavy floating cards with a line-ruled, high-density flatline grid inspired by modern Nike and Amazon catalog architectures.
- Enforces an **Asymmetrical Two-Column Topology** across all major dashboards:
  - **Left Rail (Sticky Context)**: Category filters, store metrics summary, applicant overview, quick actions.
  - **Right Stream (Main Workflows)**: High-density line-divided product catalog, tabular management rows, and live inspection.
- Content is anchored from the left with consistent 24px/32px padding, eliminating empty `mx-auto` dead space next to the sidebar.
- Preserves 100% of the authentic Project Kita color palette (`#D92323` Crimson, `#FAF6F5` Paper, `#1F1315` Espresso Ink, `#F59E0B` Spark).

## 3. Selected Direction
- **Structural Language**: Hairline 1px borders (`#EFE4E2`), flatline grid dividing lines, borderless image cells with crisp typographic metadata below.
- **Topology**: 2-Column Left Sticky Rail (3/12 cols) + Right Content Stream (9/12 cols).
- **Depth**: Flat by default; zero resting dropshadows; state transitions communicated via hairline color changes and subtle background tone shifts.

## 4. Scope and Transformation Targets
1. **Marketplace (`components/marketplace/marketplace-view.tsx` & `product-card.tsx`)**:
   - Flatline line-ruled product grid (borderless images, clean bottom metadata, hairline column dividers, no nested cards).
2. **Seller Studio Dashboard (`components/seller/seller-studio-view.tsx`, `seller-header.tsx`, `seller-stats.tsx`)**:
   - 2-Column layout: Sticky Left Rail (Store Profile, Operating Hours, Pickup Points, Fast Stats) + Right Stream (Product Inventory Table & Actions).
3. **Buyer Home Dashboard (`components/dashboard/buyer-dashboard-view.tsx`)**:
   - 2-Column layout: Left Rail (Student Profile, Active Pickup Points, Spending Summary) + Right Stream (Active Orders Tracking & Category Quick Rail).
4. **Admin Console (`app/admin/(dashboard)/page.tsx` & `components/admin/verification-review-table.tsx`)**:
   - 2-Column layout: Sticky Left Rail (Queue Metrics, Batch Actions, Quick Filter Pills) + Right Stream (Verification Review Table & Detailed Inspection Panel).
5. **Seller Verification Flow (`components/seller/verification-form.tsx`)**:
   - 2-Column layout: Left Rail (Eligibility Criteria, Requirements Checklist) + Right Stream (Structured Application Form & ID Upload).

## 5. Non-Negotiable Boundaries
- **Color & Brand Identity**: Must not alter `#D92323`, `#1F1315`, `#FAF6F5`, `#F59E0B` tokens.
- **Data Integrity**: Retains all Supabase database queries, server actions, and realtime channels.
