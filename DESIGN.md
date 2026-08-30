---
name: Project Kita
description: Digital campus commerce system with flatline line-ruled architecture and collegiate identity
colors:
  primary: "#D92323"
  primary-deep: "#A31212"
  primary-soft: "#FDE8E8"
  spark: "#F59E0B"
  spark-deep: "#D97706"
  spark-ink: "#92400E"
  spark-soft: "#FEF3C7"
  ink: "#1F1315"
  ink-soft: "#3B2629"
  muted: "#5E464A"
  paper: "#FAF6F5"
  paper-deep: "#F3EAE8"
  surface: "#FFFFFF"
  line: "#EFE4E2"
  line-strong: "#DECBC7"
  destructive: "#DC2626"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, Plus Jakarta Sans, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, Plus Jakarta Sans, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Plus Jakarta Sans, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Space Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.16em"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  flatline-cell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px"
---

# Design System: Project Kita (Flatline Line-Ruled System)

## Overview

**Creative North Star: "The Modern Flatline Campus Commerce Ledger"**

Project Kita combines the high-efficiency, line-ruled precision of Amazon and Nike digital storefronts with the warm, collegiate brand identity of Luis Y. Ferrer Jr. Senior High School (LYFJSHS). It rejects bloated, bubble-card container sprawl and floating drop-shadow layers in favor of a crisp, flatline structural grid bounded by hairline 1px dividers, high-contrast typography, and an asymmetrical 2-column architecture.

**Key Characteristics:**
- **Flatline Line-Ruled Structure:** Crisp 1px hairline dividers (`#EFE4E2`) delineate content zones without redundant nested cards or heavy shadows.
- **Asymmetrical 2-Column Topology:** Sticky left rails for contextual navigation, quick filters, and status summaries alongside wide, uninterrupted right data streams.
- **Left-Anchored Alignment:** Content anchors directly to the workspace without artificial `mx-auto` gutters.
- **Collegiate Crimson Red & Warm Paper:** Retains `#D92323` primary accent, `#FAF6F5` warm paper base, `#1F1315` espresso ink, and `#F59E0B` amber spark.
- **Tabular Space Mono Data:** Numbers, prices, LRNs, and receipt timestamps render with precision monospace alignment.

---

## Colors

The color palette remains strictly bound to the institutional identity:
- **Primary**: Collegiate Crimson Red (`#D92323`), Deep Oxblood (`#A31212`), Crimson Tint (`#FDE8E8`).
- **Spark / Secondary**: Marigold Amber (`#F59E0B`), Spark Soft (`#FEF3C7`), Spark Ink (`#92400E`).
- **Neutral**: Espresso Ink (`#1F1315`), Soft Ink (`#3B2629`), Muted Ink (`#5E464A`).
- **Canvas & Lines**: Warm Paper (`#FAF6F5`), Deep Paper (`#F3EAE8`), White Surface (`#FFFFFF`), Hairline Line (`#EFE4E2`), Strong Line (`#DECBC7`).

### Named Rules
**The Flatline Hairline Rule.** Separation of sections, listings, and data cells is achieved via 1px `#EFE4E2` ruled lines, never through floating card dropshadows.
**The Zero-Centering Rule.** Layouts anchor from the left edge; `mx-auto` centering blobs are strictly avoided on dashboard workspaces.

---

## Typography

**Display Font:** `Bricolage Grotesque`  
**Body Font:** `Plus Jakarta Sans`  
**Data & Labels:** `Space Mono`

### Hierarchy
- **Headline / Section Title**: `font-display text-xl sm:text-2xl font-extrabold text-ink`
- **Item Title**: `font-display font-bold text-sm sm:text-base text-ink hover:text-kita-green`
- **Body & Meta**: `text-xs text-muted leading-relaxed`
- **Price / Metrics**: `font-mono text-sm sm:text-base font-bold text-kita-green`
- **Eyebrow / Category Tag**: `eyebrow text-[11px] uppercase tracking-wider text-muted`

---

## Layout

### Two-Column Asymmetrical Architecture
- **Left Sticky Rail (3 to 4 Cols / 260px–320px)**:
  - Sticky at top: `sticky top-6`.
  - Holds filters, store quick stats, applicant summaries, or navigation links.
  - Ruled off from the main feed with a crisp vertical or border line.
- **Right Main Content Stream (8 to 9 Cols)**:
  - Wide, edge-to-edge product grid with 1px dividing borders.
  - High-density table / card rows with hover highlights.
- **Full Viewport Width**: Content uses `w-full max-w-7xl px-4 sm:px-6 lg:px-8` anchoring comfortably next to the sidebar.

---

## Elevation & Depth

**Flat by Default.** Zero decorative box shadows on resting cards. Depth is conveyed strictly through 1px border lines, subtle background shifts (`bg-paper` vs `bg-surface`), and hover line-color transitions (`border-line` to `border-kita-green`).

---

## Shapes

- **Flatline Cells:** `rounded-none` or subtle `rounded-lg` (8px) for interactive controls.
- **Buttons & Controls:** Clean `rounded-xl` (12px) tactile touch targets.
- **Status Pills:** `rounded-full` (9999px) for verification, order status, and inventory indicators.

---

## Components

### Flatline Product Grid (Nike / Amazon Inspired)
- Borderless or line-divided 4:3 product photography with subtle zoom on hover.
- Direct typographic hierarchy underneath: Category tag, Bold title, Tabular price in `Space Mono`, pickup availability.
- Hairline bottom/side dividers between items.

### Flatline Data & Summary Tables
- Ruled horizontal rows with hover color shifts (`hover:bg-paper/60`).
- No bulky nested cards.

---

## Do's and Don'ts

### Do:
- **Do** use ruled 1px hairline lines (`border-line` / `#EFE4E2`) to structure sections and grids.
- **Do** anchor layouts as asymmetrical 2-column streams (Left rail + Right stream).
- **Do** maintain the Collegiate Crimson Red (`#D92323`) and Espresso Ink (`#1F1315`) palette.
- **Do** keep product prices and numbers in `Space Mono` with tabular numerals.

### Don't:
- **Don't** nest cards inside cards inside cards.
- **Don't** use floating heavy box shadows on resting elements.
- **Don't** use `mx-auto` to center dashboards into narrow floating islands.
- **Don't** change the branding or color tokens.
