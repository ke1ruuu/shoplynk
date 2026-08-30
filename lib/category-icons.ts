import {
  Croissant,
  Palette,
  Shirt,
  NotebookPen,
  Sparkle,
  Tag,
  type LucideIcon,
} from "lucide-react";

/**
 * The `categories.icon` column stores emoji. Emoji are not an icon system —
 * they render differently per platform and break the one-stroke-weight rule —
 * so the UI resolves a category to a drawn Lucide glyph by slug instead, and
 * the stored emoji is ignored on every dashboard surface.
 */
const BY_SLUG: Record<string, LucideIcon> = {
  "food-and-drinks": Croissant,
  "handmade-crafts": Palette,
  "student-merchandise": Shirt,
  "school-and-stationery": NotebookPen,
  "lifestyle-goods": Sparkle,
};

export function categoryIcon(slug: string | null | undefined): LucideIcon {
  if (!slug) return Tag;
  return BY_SLUG[slug] ?? Tag;
}
