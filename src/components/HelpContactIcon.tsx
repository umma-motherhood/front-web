import {
  Bike,
  Sparkles,
  Baby,
  Home,
  ShoppingBag,
  HeartHandshake,
  Wrench,
  GraduationCap,
  MessageSquare,
} from "lucide-react";
import type { HelpContactItem } from "@/config/site";

export type HelpCategoryKey =
  | "semua"
  | "transport"
  | "rumah-tangga"
  | "belanja"
  | "kesehatan"
  | "edukasi"
  | "servis";

export const HELP_CATEGORY_TABS: { key: HelpCategoryKey; label: string }[] = [
  { key: "semua", label: "Semua Layanan" },
  { key: "transport", label: "Ojek & Transport" },
  { key: "rumah-tangga", label: "Rumah Tangga & Anak" },
  { key: "belanja", label: "Jastip & Belanja" },
  { key: "kesehatan", label: "Pijat & Kesehatan" },
  { key: "edukasi", label: "Les & Edukasi" },
  { key: "servis", label: "Servis & Perbaikan" },
];

const ICON_CATEGORY_MAP: Record<
  HelpContactItem["icon"],
  { category: Exclude<HelpCategoryKey, "semua">; label: string }
> = {
  bike: { category: "transport", label: "Ojek & Transport" },
  sparkles: { category: "rumah-tangga", label: "Kebersihan Rumah" },
  baby: { category: "rumah-tangga", label: "Pengasuhan Anak" },
  home: { category: "rumah-tangga", label: "Rumah Tangga" },
  "shopping-bag": { category: "belanja", label: "Jastip & Belanja" },
  "heart-handshake": { category: "kesehatan", label: "Pijat & Kesehatan" },
  "graduation-cap": { category: "edukasi", label: "Les & Edukasi" },
  wrench: { category: "servis", label: "Servis & Perbaikan" },
};

/** Resolve display category metadata for a help contact icon key. */
export function getHelpCategoryMeta(icon: HelpContactItem["icon"]) {
  return ICON_CATEGORY_MAP[icon] ?? { category: "rumah-tangga" as const, label: "Jasa Harian" };
}

/** Shared Lucide icon renderer for help contact items. */
export function HelpContactIcon({
  icon,
  className = "w-5 h-5 text-rosewood",
}: {
  icon: HelpContactItem["icon"] | string;
  className?: string;
}) {
  switch (icon) {
    case "bike":
      return <Bike className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "baby":
      return <Baby className={className} />;
    case "home":
      return <Home className={className} />;
    case "shopping-bag":
      return <ShoppingBag className={className} />;
    case "heart-handshake":
      return <HeartHandshake className={className} />;
    case "wrench":
      return <Wrench className={className} />;
    case "graduation-cap":
      return <GraduationCap className={className} />;
    default:
      return <MessageSquare className={className} />;
  }
}
