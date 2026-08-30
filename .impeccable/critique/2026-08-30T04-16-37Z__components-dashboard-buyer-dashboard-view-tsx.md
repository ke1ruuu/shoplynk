---
target: campus order tracking
total_score: 32
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
timestamp: 2026-08-30T04-16-37Z
slug: components-dashboard-buyer-dashboard-view-tsx
---
# Design Critique: Campus Order Tracking Component

**Method**: single-context (Assessment A + Deterministic scan)
**Target**: `components/dashboard/buyer-dashboard-view.tsx` (Order Tracking section)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Static grey text card lacks a visual stage progression timeline (Confirmed -> Preparing -> Ready -> Completed) |
| 2 | Match System / Real World | 4 | Real-world campus pickup locations and break-time schedule |
| 3 | User Control and Freedom | 3 | No expandable receipt or granular item breakdown |
| 4 | Consistency and Standards | 4 | Adheres to DESIGN.md colors and tokens |
| 5 | Error Prevention | 4 | Clear order identification |
| 6 | Recognition Rather Than Recall | 2 | Hard to quickly recognize pickup status without a visual step bar |
| 7 | Flexibility and Efficiency | 3 | Could use 1-click expand/collapse for itemized receipt |
| 8 | Aesthetic and Minimalist Design | 3 | Current card feels like a rudimentary text box rather than an authentic tracker (Apple/Uber Eats/Shopify style) |
| 9 | Error Recovery | 4 | Direct link to marketplace and clear status updates |
| 10 | Help and Documentation | 3 | Needs contextual instructions on where and when to pick up |
| **Total** | | **32/40** | **Moderate Craft (Order Tracker Needs Overhaul)** |

---

## Priority Issues

### [P1] Missing Multi-Stage Visual Progress Timeline
- **Why it matters**: Buyers checking their dashboard cannot tell at a glance how close their order is to being ready without reading raw status text strings.
- **Fix**: Implement an **Apple Store / Uber Eats style 4-stage visual timeline tracker** (`Confirmed` -> `Preparing` -> `Ready for Pickup` -> `Completed`) with live animated progress states and stage descriptions.

### [P2] Missing Contextual Pickup Guidance & Itemized Receipt
- **Why it matters**: Students need immediate confirmation of *which specific classroom/canteen table* to go to, *which break time* (Recess vs Lunch), and *what items* were in the order.
- **Fix**: Add an expandable details panel with itemized products, quantities, prices in `Space Mono`, and campus pickup instructions.

---

## Suggested Plan
1. Create a dedicated, high-craft **`OrderTrackingCard`** component with:
   - 4-stage horizontal visual progress bar with checkmarks and active pulse ring.
   - Dynamic stage status banner (e.g. `⚡ Being Prepared • Student seller is baking and packaging your order`).
   - Campus pickup location pill + break-time schedule badge.
   - Expandable receipt drawer showing line items, quantities, subtotal, and payment method.
2. Integrate into both `BuyerDashboardView` (on the buyer home) and Seller Studio views.
