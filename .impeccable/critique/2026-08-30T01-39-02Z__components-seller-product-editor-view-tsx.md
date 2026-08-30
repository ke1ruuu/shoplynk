---
target: add product page layout and AI-slop
total_score: 33
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-08-30T01-39-02Z
slug: components-seller-product-editor-view-tsx
---
# Design Critique: Add Product Studio Page

**Method**: single-context (Assessment A + Deterministic scan)
**Target**: `components/seller/product-editor-view.tsx` (`/seller/products/new` & `/seller/products/[id]/edit`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Real-time reactive preview and live/draft visibility pill |
| 2 | Match System / Real World | 4 | Space Mono peso pricing (₱) and campus prep intervals |
| 3 | User Control and Freedom | 3 | Discard action and ⌘+Enter shortcut, but no draft autosave |
| 4 | Consistency and Standards | 3 | Uses older rounded-3xl bubble cards instead of flatline line-ruled layout |
| 5 | Error Prevention | 3 | Required asterisks and inline alerts, but lacks immediate input masking |
| 6 | Recognition Rather Than Recall | 4 | Live marketplace card preview reflects changes in real-time |
| 7 | Flexibility and Efficiency | 4 | Quick fulfillment chips and keyboard shortcut support |
| 8 | Aesthetic and Minimalist Design | 2 | 4 stacked floating card containers, duplicate headers, and vertical sprawl |
| 9 | Error Recovery | 3 | Action state banners, preserved input values on failure |
| 10 | Help and Documentation | 3 | Realistic placeholders, but generic tips box adds visual noise |
| **Total** | | **33/40** | **Good (Needs Flatline & Anti-Slop Polish)** |

---

## Design Specificity Verdict

**LLM Assessment**:
The move from a modal to a dedicated studio page was a massive functional upgrade. However, the internal layout still exhibits hallmarks of "AI-slop design":
1. **Container Sprawl ("Card Stacking")**: The form is split into 4 separate `rounded-3xl` floating cards with heavy borders and drop shadows (`shadow-flyer`), creating disjointed visual boxes instead of a cohesive studio canvas.
2. **Double Header Redundancy**: Every section features an uppercase eyebrow (`General Information`, `Product Photography`, `Financials & Stock`) stacked directly on top of an H2 title (`Title & Description`, `Cover Image`, `Pricing & Category`), doubling the cognitive scanning height.
3. **Preset Photo Grid Bloat**: 8 sample image cards are rendered in an expanded 2x4 grid in the middle of the left column, pushing critical pricing and stock fields below the fold.
4. **Tips Box Clutter**: The `💡 Quick Listing Tips` box below the preview card adds generic advice noise.

**Deterministic Scan**:
- `detect.mjs`: `[]` (0 token violations, strictly follows DESIGN.md typography and color tokens).

---

## Overall Impression
A solid, responsive 2-column studio layout with high functionality (live buyer preview, sticky top bar, ⌘+Enter shortcut), but currently weighed down by floating card container sprawl and bloated vertical spacing that can be distilled into a crisp, flatline line-ruled studio.

---

## What's Working
1. **Sticky Top Bar**: Clean breadcrumbs (`Seller Studio / Products`), minimalist Live/Draft switch, and persistent Publish button.
2. **Sticky Live Buyer Preview**: Real-time feedback showing exactly how the listing renders in the LYFJSHS marketplace.
3. **Fulfillment Quick Chips**: Instant (0m), 15m, 30m, and 1h chips provide intuitive campus prep timing.

---

## Priority Issues

### [P1] Floating Bubble Card Sprawl ("AI-Slop Stacking")
- **Why it matters**: 4 separate floating cards break the visual flow into fragmented boxes, creating unnecessary padding and visual borders.
- **Fix**: Flatten into a unified line-ruled studio surface (`divide-y divide-line`) with clean section dividers.
- **Suggested command**: `/impeccable distill`

### [P1] Photo Presets Pushing Pricing Below the Fold
- **Why it matters**: 8 photo cards in the middle of the form push Price and Stock out of initial viewport view on standard 1080p and laptop screens.
- **Fix**: Compact presets into a sleek horizontal chip rail or compact picker, bringing Pricing & Fulfillment into immediate view.
- **Suggested command**: `/impeccable layout`

### [P2] Duplicate Eyebrow + H2 Headers
- **Why it matters**: Repeating both an uppercase eyebrow and an H2 for 4 consecutive sections doubles reading fatigue.
- **Fix**: Consolidate into concise section labels (e.g. `Item Details`, `Photo & Media`, `Pricing & Inventory`, `Fulfillment`).
- **Suggested command**: `/impeccable clarify`

### [P2] Generic Tips Box Visual Noise
- **Why it matters**: The `Quick Listing Tips` container under the sticky preview adds static filler without adding functional value.
- **Fix**: Remove the box or convert it into a subtle inline shortcut hint in the top bar.
- **Suggested command**: `/impeccable quieter`

---

## Persona Red Flags

- **Alex (Power User / Daily Campus Seller)**: P1 issue. Has to scroll down 600px past 8 stock photo tiles just to enter the price and stock count for a batch of pastries.
- **Jordan (First-Time Student Entrepreneur)**: Overwhelmed by 4 massive bordered boxes making the form feel like a 10-minute tax form instead of a 30-second product drop.
- **Riley (Stress Tester)**: Price field allows rapid typing of negative or decimal numbers without instant visual mask.

---

## Minor Observations
- The Discard button is hidden on small mobile viewports (`hidden sm:inline-flex`), leaving mobile users relying only on the back chevron.
- The Live/Draft toggle pill in the header has great contrast, but could have a tooltipped helper explaining that Draft listings remain hidden from student search.

---

## Questions to Consider
1. Would you like to flatten the 4 floating card boxes into a unified, line-divided studio form (matching the flatline architecture of the marketplace and dashboards)?
2. Should we condense the 8 sample photo presets into a sleek compact selector so pricing and stock are visible above the fold?
