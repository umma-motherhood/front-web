import rawSiteContent from "@/data/site-content.json";

export interface NavItem {
  label: string;
  href: string;
}

export interface UmkmProduct {
  name: string;
  price?: string;
  desc?: string;
}

export interface UmkmItem {
  id: string;
  name: string;
  tagline?: string;
  category: "semua" | "toserba" | "busana" | "kuliner" | "bayi" | "kriya" | "jasa";
  categoryLabel: string;
  owner: string;
  priceRange: string;
  location: string;
  description: string;
  waMessage: string;
  phone?: string;
  images?: string[];
  orderNotes?: string[];
  products?: UmkmProduct[];
}

export interface ClassEventInfo {
  name: string;
  speaker: string;
  date: string;
  materiStatus: string;
  slug?: string;
}

export interface ClassArticleInfo {
  title: string;
  date: string;
  author: string;
  url: string;
  excerpt?: string;
  slug?: string;
}

export interface ClassItem {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: {
    subtitle: string;
    points: string[];
    note: string;
    isEmpty?: boolean;
    emptyBadge?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    classEvent?: ClassEventInfo;
    articles?: ClassArticleInfo[];
    archiveUrl?: string;
  };
}

export interface ArticleOutsideReference {
  platform: string;
  url: string;
  description: string;
  buttonLabel: string;
}

export interface CommunityArticle {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorRole?: string;
  authorInstagram?: string;
  date: string;
  readingTime?: string;
  category: "ruang-berbagi" | "kelas-profesional" | "arsip-diskusi";
  categoryLabel: string;
  tags: string[];
  excerpt: string;
  overviewParagraphs?: string[];
  keyTakeaways?: string[];
  quote?: string;
  outsideReference?: ArticleOutsideReference;
  url?: string;
  isExternal?: boolean;
  eventDate?: string;
  speaker?: string;
  status: "published" | "coming-soon" | "empty";
  materiStatus?: string;
}

export interface PlaceReview {
  author: string;
  text: string;
  rating?: number;
}

export interface PlaceContact {
  person: string;
  phone: string;
}

export interface DirectoryPlaceItem {
  id: string;
  name: string;
  categoryTag: string;
  description: string;
  address: string;
  schedule?: string;
  priceRange?: string;
  focus?: string;
  review: PlaceReview;
  contact: PlaceContact;
  waMessage: string;
  image?: string;
}

export interface DirectorySubgroup {
  title: string;
  places: DirectoryPlaceItem[];
}

export interface DirectoryItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  subgroups: DirectorySubgroup[];
}

export interface HelpContactItem {
  id: string;
  title: string;
  href: string;
  icon:
    | "bike"
    | "sparkles"
    | "baby"
    | "home"
    | "shopping-bag"
    | "heart-handshake"
    | "wrench"
    | "graduation-cap";
}

export interface SupportItem {
  title: string;
  description: string;
  ctaText: string;
  href: string;
}

export interface VolunteerItem {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  quote?: string;
  instagram?: string;
  phone?: string;
}

export interface HeroConfig {
  tagline: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  descriptionExtended: string;
  ctaGroupText: string;
  ctaDirectoryText: string;
  cardBadge: string;
  cardYear: string;
}

export interface GlobalSettings {
  adminWhatsapp: string;
  adminPhoneDisplay: string;
  whatsappGroupUrl: string;
  instagramUrl: string;
  journalUmmaArchiveUrl: string;
}

export interface AdvertiseRequirement {
  title: string;
  desc: string;
}

export interface AdvertiseConfig {
  bannerTitle: string;
  bannerSubtitle: string;
  price: string;
  heroText: string;
  requirements: AdvertiseRequirement[];
  ctaButtonText: string;
  waUrl?: string;
}

export interface HelpAdvertiseConfig {
  bannerTitle: string;
  bannerSubtitle: string;
  price: string;
  heroText: string;
  requirements: AdvertiseRequirement[];
  ctaButtonText: string;
  waUrl?: string;
}

export interface FounderConfig {
  name: string;
  role: string;
  story: string;
}

export interface SiteContentData {
  hero: HeroConfig;
  globalSettings: GlobalSettings;
  classes: ClassItem[];
  directory: DirectoryItem[];
  umkmList: UmkmItem[];
  communityArticles: CommunityArticle[];
  helpContacts: HelpContactItem[];
  supportItems: SupportItem[];
  founder: FounderConfig;
  advertise: AdvertiseConfig;
  helpAdvertise: HelpAdvertiseConfig;
  umkmAdvertise: AdvertiseConfig;
  volunteers: VolunteerItem[];
}

export const siteContent = rawSiteContent as unknown as SiteContentData;

const adminPhone = siteContent.globalSettings?.adminWhatsapp || "6287883370039";
const cleanAdminPhone = adminPhone.replace(/\D/g, "");

export function buildWaUrl(text: string, phone: string = cleanAdminPhone): string {
  const target = phone.replace(/\D/g, "");
  return `https://wa.me/${target}?text=${encodeURIComponent(text)}`;
}

export const siteConfig = {
  name: "Umma Motherhood Cipanas",
  shortName: "Umma",
  tagline: siteContent.hero?.tagline || "Ruang tumbuh bersama · Cipanas",
  domain: "ummamotherhood.my.id",
  description:
    siteContent.hero?.description ||
    "Umma Motherhood Cipanas adalah ruang aman dan suportif bagi para ibu di area Cipanas dan sekitarnya untuk saling merangkul, bertumbuh, dan berdaya bersama.",

  hero: siteContent.hero,
  globalSettings: siteContent.globalSettings,

  links: {
    whatsappGroup:
      siteContent.globalSettings?.whatsappGroupUrl ||
      "https://chat.whatsapp.com/FTkoEa3rXxnHK9gy7wLPYK?s=cl&p=a&iam=2",
    whatsappShierly: `https://wa.me/${cleanAdminPhone}`,
    whatsappAdmin: `https://wa.me/${cleanAdminPhone}`,
    instagram:
      siteContent.globalSettings?.instagramUrl ||
      "https://www.instagram.com/lindashirlyv/",
    volunteerWa: buildWaUrl(
      "Halo Umma Shierly, saya tertarik untuk mendaftar sebagai Relawan di Umma Motherhood Cipanas."
    ),
    donationWa: buildWaUrl(
      "Halo Umma Shierly, saya ingin berdonasi / berbagi ilmu sebagai pengisi kelas di Umma Motherhood Cipanas."
    ),
    umkmCatalogWa: buildWaUrl(
      "Halo Umma Shierly, saya ingin melihat katalog Lapak UMKM Umma."
    ),
    umkmRegisterWa: buildWaUrl(
      "Halo Umma Shierly, saya ingin mendaftarkan usaha saya ke Lapak UMKM Umma Motherhood."
    ),
    advertiseWa: buildWaUrl(
      "Halo Umma Shierly, saya tertarik untuk mendaftarkan iklan bisnis/lembaga saya di Papan Rekomendasi Umma Motherhood Cipanas."
    ),
    helpAdvertiseWa: buildWaUrl(
      "Halo Umma Shierly, saya ingin mendaftarkan jasa harian saya di Direktori Bantuan Umma Motherhood Cipanas."
    ),
    whatsappOjek: buildWaUrl(
      "Halo Umma Shierly, saya ingin info kontak Ojek Perempuan di Cipanas."
    ),
    whatsappCleaning: buildWaUrl(
      "Halo Umma Shierly, saya ingin info Jasa Bersih-Bersih area Cipanas."
    ),
    whatsappNanny: buildWaUrl(
      "Halo Umma Shierly, saya membutuhkan info Nanny Harian / Babysitter Infal."
    ),
    whatsappArt: buildWaUrl(
      "Halo Umma Shierly, saya ingin info kontak ART panggilan paruh waktu."
    ),
  },

  nav: [
    { label: "Kelas & Berbagi", href: "/#kelas" },
    { label: "Direktori", href: "/#direktori" },
    { label: "Bantuan", href: "/#bantuan" },
    { label: "Lapak UMKM", href: "/umkm/" },
    { label: "Tentang", href: "/#tentang" },
    { label: "Dukung", href: "/#dukung" },
  ] as NavItem[],

  classes: siteContent.classes,
  directory: siteContent.directory,
  umkmList: siteContent.umkmList,
  communityArticles: siteContent.communityArticles,
  helpContacts: siteContent.helpContacts.map((item) => ({
    ...item,
    href: item.href || buildWaUrl(item.title),
  })),
  supportItems: siteContent.supportItems,
  founder: siteContent.founder,
  volunteers: siteContent.volunteers || [],
  advertise: {
    ...siteContent.advertise,
    waUrl: siteContent.advertise?.waUrl || buildWaUrl("Halo Umma Shierly, saya tertarik mendaftar iklan rekomendasi di website Umma."),
  },
  helpAdvertise: {
    ...siteContent.helpAdvertise,
    waUrl: siteContent.helpAdvertise?.waUrl || buildWaUrl("Halo Umma Shierly, saya ingin mendaftarkan jasa harian saya di Direktori Bantuan."),
  },
  umkmAdvertise: {
    ...siteContent.umkmAdvertise,
    waUrl: siteContent.umkmAdvertise?.waUrl || buildWaUrl("Halo Umma Shierly, saya ingin mendaftarkan usaha UMKM saya ke Lapak Umma Motherhood."),
  },
  journalUmmaArchiveUrl:
    siteContent.globalSettings?.journalUmmaArchiveUrl ||
    "https://shirlyv.github.io/archive/?tag=journal-umma",
};
