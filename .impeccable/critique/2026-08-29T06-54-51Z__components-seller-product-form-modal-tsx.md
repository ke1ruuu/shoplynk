---
target: components/seller/product-form-modal.tsx
total_score: 32
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
timestamp: 2026-08-29T06-54-51Z
slug: components-seller-product-form-modal-tsx
---
# Design Critique: Add Product Modal (ProductFormModal)

## Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Modal closes on fixed delay; no upload progress indication |
| 2 | Match System / Real World | 4 | Excellent campus terminology, PHP peso pricing, lead-time chips |
| 3 | User Control and Freedom | 3 | Accidental dismiss wipes entered fields without confirmation |
| 4 | Consistency and Standards | 3 | Status buttons diverge from primary/secondary token styling |
| 5 | Error Prevention | 3 | Price allows arbitrary string; stock allows decimals |
| 6 | Recognition Rather Than Recall | 4 | Preset photo library and live preview card |
| 7 | Flexibility and Efficiency | 3 | Missing keyboard shortcut (Cmd+Enter) to quickly save |
| 8 | Aesthetic and Minimalist Design | 3 | Vertical form scrolling on smaller 13" laptop screens |
| 9 | Error Recovery | 3 | Clear server action error banners displayed inline |
| 10 | Help and Documentation | 3 | Helpful guidance in placeholder text |
| **Total** | | **32/40** | **Good (80%)** |

## Design Specificity Verdict

**LLM Assessment**: High specificity. The form is tailored specifically to senior high school student commerce at LYFJSHS (lead time presets for classroom breaks, preset snack/merch thumbnails, PHP currency).

**Deterministic Scan**: 2 advisory findings detected in `components/seller/product-form-modal.tsx` (off-ramp font sizes `text-[0.65rem]` and `text-[10px]`).

## What's Working
- **Prep Time Presets**: Quick chips (Instant 0m, 15m, 30m, 1h) directly address campus pickup logistics.
- **Preset Thumbnail Selector**: Allows students to launch listings in seconds even without an immediate custom URL.
- **Live Preview Card**: Immediate visual confirmation of how the product card will appear to buyers.

## Priority Issues
- **[P1] Accidental Dismissal Data Loss**: Clicking outside or hitting Escape during long form editing discards entered product details without a confirmation warning.
- **[P2] Form Height & Scannability**: On compact student laptops/tablets, the 8 stacked sections require significant vertical scrolling.
- **[P3] Off-Scale Font Sizes**: `text-[0.65rem]` and `text-[10px]` violate the DESIGN.md typography scale.

## Persona Red Flags
- **Alex (Power User)**: No keyboard shortcut (`Cmd+Enter` / `Ctrl+Enter`) to publish from any input.
- **Casey (Mobile Seller)**: Image URL copy-pasting is friction-heavy on mobile devices.
- **Sam (Accessibility)**: Preset photo thumbnail buttons lack `aria-pressed` state attributes.

## Questions to Consider
- What if the form were split into a responsive 2-column layout (Product Essentials & Pricing on left, Image Preview & Description on right)?
- Could we store draft inputs in local state to prevent losing content on accidental dismissal?
