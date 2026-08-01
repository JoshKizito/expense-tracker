import {
  Utensils,
  Car,
  Home,
  Film,
  HeartPulse,
  ShoppingBag,
  Receipt,
  GraduationCap,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";

// Les noms stockés en base (seed.ts) sont en kebab-case ("heart-pulse"),
// on les mappe ici vers les composants Lucide correspondants.
const ICON_MAP: Record<string, LucideIcon> = {
  utensils: Utensils,
  car: Car,
  home: Home,
  film: Film,
  "heart-pulse": HeartPulse,
  "shopping-bag": ShoppingBag,
  receipt: Receipt,
  "graduation-cap": GraduationCap,
  "more-horizontal": MoreHorizontal,
};

export function getCategoryIcon(iconName: string | null | undefined): LucideIcon {
  if (!iconName) return MoreHorizontal;
  return ICON_MAP[iconName] ?? MoreHorizontal;
}
