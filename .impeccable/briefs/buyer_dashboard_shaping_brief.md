# Design Brief: Buyer Dashboard Refinement & Sidebar Menucard Polish

## 1. Job and Audience
- **Surfaces**: App Sidebar Footer ([app-sidebar.tsx](file:///Users/keiru/Documents/projectkita/components/shell/app-sidebar.tsx)) and Buyer Home Dashboard ([buyer-dashboard-view.tsx](file:///Users/keiru/Documents/projectkita/components/dashboard/buyer-dashboard-view.tsx) & [app/protected/page.tsx](file:///Users/keiru/Documents/projectkita/app/protected/page.tsx)).
- **Audience**: LYFJSHS student buyers and campus members.
- **Need**: Direct access to high-demand campus bestsellers, fast category exploration in a structured grid, zero redundant label noise, and a snug menucard popover on the sidebar.

## 2. Outcome and Proof
- **Sidebar Menucard Proximity**: `sideOffset` adjusted to `4px` (down from `8px`) with snug alignment directly anchoring above the profile trigger button.
- **Left Rail Stats Focus**: Removed redundant "Account Type" card; replaced with a high-density, pure stats ledger (Total Spent, Orders Completed, Ready for Pickup) directly paired with a 2-column Category Grid with crisp icons.
- **Best Seller Products Grid**: Added a curated 3-column flatline product grid below "Orders in Progress", showcasing top student goods with `ProductCard` integration (live pricing in `Space Mono`, verified seller badges, instant prep time, and quick view modal).

## 3. Selected Direction
- **Topology**: Asymmetrical 2-Column Layout (Left Rail 4 Cols + Right Stream 8 Cols).
- **Left Rail**:
  - Pure Stats Ledger (Banded line-ruled numbers for Total Spent, Completed Orders, Items Ready).
  - 2-Column Category Grid (Compact tactile buttons with category icons and clean typography).
- **Right Stream**:
  - Section 1: Orders in Progress (Real-time pickup details and live progress pills).
  - Section 2: Best Sellers on Campus (3-column line-ruled product grid with quick inspection modal).

## 4. Scope and Transformation Targets
1. [components/shell/app-sidebar.tsx](file:///Users/keiru/Documents/projectkita/components/shell/app-sidebar.tsx): Set `sideOffset={4}` and snug popover positioning.
2. [app/protected/page.tsx](file:///Users/keiru/Documents/projectkita/app/protected/page.tsx): Fetch or provide best-selling products from live database / mock fallback.
3. [components/dashboard/buyer-dashboard-view.tsx](file:///Users/keiru/Documents/projectkita/components/dashboard/buyer-dashboard-view.tsx):
   - Refactor Left Rail: Pure Stats Ledger + 2-Column Category Grid.
   - Refactor Right Stream: Active Orders + Best Sellers Product Grid with `ProductDetailModal` inspection.

## 5. Non-Negotiables
- Colors: 100% fidelity to `#D92323`, `#FAF6F5`, `#1F1315`, `#F59E0B`.
- 0 design anti-patterns according to `detect.mjs`.
