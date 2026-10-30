"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdvertiseModal } from "@/components/AdvertiseModal";
import { siteConfig, DirectoryItem, DirectoryPlaceItem } from "@/config/site";
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Sparkles,
  Star,
  Quote,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Megaphone,
} from "lucide-react";

type CategoryFilterKey = "semua" | "kesehatan" | "pendidikan" | "kebutuhan";

const CATEGORY_TABS: { key: CategoryFilterKey; label: string; code?: string }[] = [
  { key: "semua", label: "Semua Kategori" },
  { key: "kesehatan", label: "Fasilitas Kesehatan", code: "A." },
  { key: "pendidikan", label: "Pendidikan & Anak", code: "B." },
  { key: "kebutuhan", label: "Kebutuhan Harian", code: "C." },
];

function DirectoryContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("kategori") as CategoryFilterKey) || "semua";

  const [activeCategory, setActiveCategory] = useState<CategoryFilterKey>(
    CATEGORY_TABS.some((t) => t.key === initialCategory) ? initialCategory : "semua"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdvertiseOpen, setIsAdvertiseOpen] = useState(false);

  // Flatten places with parent category information
  const allPlaces = useMemo(() => {
    const list: {
      place: DirectoryPlaceItem;
      categoryId: string;
      categoryCode: string;
      categoryTitle: string;
      subgroupTitle: string;
    }[] = [];

    siteConfig.directory.forEach((cat: DirectoryItem) => {
      cat.subgroups.forEach((subgroup) => {
        subgroup.places.forEach((place) => {
          list.push({
            place,
            categoryId: cat.id,
            categoryCode: cat.code,
            categoryTitle: cat.title,
            subgroupTitle: subgroup.title,
          });
        });
      });
    });

    return list;
  }, []);

  // Filtered places
  const filteredPlaces = useMemo(() => {
    return allPlaces.filter((item) => {
      const matchCat =
        activeCategory === "semua" || item.categoryId === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchQ =
        !q ||
        item.place.name.toLowerCase().includes(q) ||
        item.place.categoryTag.toLowerCase().includes(q) ||
        item.place.description.toLowerCase().includes(q) ||
        item.place.address.toLowerCase().includes(q) ||
        item.place.review.text.toLowerCase().includes(q) ||
        item.place.review.author.toLowerCase().includes(q);

      return matchCat && matchQ;
    });
  }, [allPlaces, activeCategory, searchQuery]);

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "kesehatan":
        return <Stethoscope className="w-5 h-5 text-rosewood" />;
      case "pendidikan":
        return <GraduationCap className="w-5 h-5 text-moss" />;
      default:
        return <ShoppingBag className="w-5 h-5 text-warm-cocoa" />;
    }
  };

  return (
    <main className="min-h-screen bg-paper pb-20">
      {/* Breadcrumb / Top Return Bar */}
      <div className="border-b border-line/60 bg-warm-sand/20 py-3.5">
        <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto flex items-center justify-between text-xs sm:text-sm">
          <Link
            href="/#direktori"
            className="inline-flex items-center gap-1.5 text-muted hover:text-rosewood font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <span className="text-muted/70 hidden sm:inline">
            Direktori Rekomendasi Terkurasi · Cipanas &amp; Sekitarnya
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-line">
        <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-[700px]">
              <span className="inline-flex items-center gap-2.5 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
                02 / Indeks Lokal Terkurasi
              </span>
              <h1 className="mt-3.5 mb-4 text-[clamp(2.4rem,5.5vw,4.2rem)] font-serif font-normal text-ink tracking-tight leading-[1.08]">
                Direktori Rekomendasi Cipanas
              </h1>
              <p className="text-muted text-[1.05rem] md:text-[1.12rem] leading-relaxed">
                Pusat informasi hiper-lokal hasil kurasi dan pengalaman nyata para ibu di area Cipanas dan sekitarnya.
                Temukan jadwal praktik dokter spesialis anak, bidan tepercaya, wadah stimulasi dan olahraga anak, hingga katering dan perlengkapan harian keluarga.
              </p>
            </div>

            {/* Advertise Quick Card */}
            <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white/80 border border-rosewood/30 shadow-xs max-w-sm">
              <div className="flex items-center gap-2 text-rosewood">
                <Megaphone className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Iklankan Usaha / Lembagamu
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Pasang papan rekomendasi usaha Anda dengan <strong>Rp 100.000 / Tahun</strong> dan jangkau ratusan keluarga di Cipanas.
              </p>
              <button
                type="button"
                onClick={() => setIsAdvertiseOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold shadow-xs hover:bg-[#9f5d54] transition-colors cursor-pointer"
              >
                <span>Lihat Syarat &amp; Pasang Iklan</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Controls */}
      <section className="py-8 bg-warm-sand/20 border-b border-line sticky top-[76px] z-30 backdrop-blur-md">
        <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === tab.key
                      ? "bg-rosewood text-[#fffaf2] shadow-xs"
                      : "bg-white/80 text-muted border border-line hover:border-rosewood/50 hover:text-ink"
                  }`}
                >
                  {tab.code && <span className="opacity-70">{tab.code}</span>}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari dokter, bidan, sekolah, toko..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-line bg-white/95 text-ink text-xs focus:outline-none focus:ring-2 focus:ring-rosewood/40 transition-all placeholder:text-muted/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Places List (Single Object Details Cards) */}
      <section className="py-12">
        <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-bold text-muted">
              Menampilkan {filteredPlaces.length} Tempat Rekomendasi
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPlaces.map((item) => {
              const waUrl = `https://wa.me/6287883370039?text=${encodeURIComponent(
                item.place.waMessage
              )}`;

              return (
                <article
                  key={item.place.id}
                  className="flex flex-col justify-between p-7 rounded-2xl bg-white/85 border border-line shadow-xs hover:border-rosewood/60 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-warm-sand/40 flex items-center justify-center">
                          {getCategoryIcon(item.categoryId)}
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rosewood/10 text-rosewood border border-rosewood/20">
                          {item.place.categoryTag}
                        </span>
                      </div>
                      <span className="text-[0.72rem] font-bold text-muted bg-warm-sand/30 px-2.5 py-0.5 rounded-full border border-line/60">
                        {item.categoryCode} {item.categoryTitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-[1.65rem] font-serif font-medium text-ink leading-tight mb-3">
                      {item.place.name}
                    </h2>

                    {/* Description */}
                    <p className="text-muted text-[0.96rem] leading-relaxed mb-6">
                      {item.place.description}
                    </p>

                    {/* Location, Schedule & Contact Grid */}
                    <div className="p-4 rounded-xl bg-warm-sand/20 border border-line/70 space-y-2.5 mb-6 text-xs text-ink">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-rosewood flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-ink">Alamat:</strong>{" "}
                          <span className="text-muted">{item.place.address}</span>
                        </div>
                      </div>

                      {item.place.schedule && (
                        <div className="flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-ink">Jadwal / Waktu:</strong>{" "}
                            <span className="text-muted">{item.place.schedule}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-2.5">
                        <Phone className="w-4 h-4 text-rosewood flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-ink">Kontak / Person:</strong>{" "}
                          <span className="text-muted">
                            {item.place.contact.person} ({item.place.contact.phone})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Community Review Quote */}
                    <div className="p-4 rounded-xl bg-paper border border-line mb-6 relative">
                      <div className="flex items-center gap-1 text-amber-500 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                        <span className="text-[0.72rem] font-bold text-muted ml-1.5">
                          Ulasan Teruji Ibu Cipanas
                        </span>
                      </div>
                      <blockquote className="text-xs sm:text-sm text-ink italic leading-relaxed pl-3 border-l-2 border-rosewood/60">
                        &ldquo;{item.place.review.text}&rdquo;
                      </blockquote>
                      <p className="text-[0.72rem] font-bold text-rosewood text-right mt-2">
                        — {item.place.review.author}
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp Action Button */}
                  <div className="pt-3 border-t border-line/70">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs sm:text-sm font-bold shadow-xs hover:bg-[#9f5d54] transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Hubungi &amp; Minta Kontak via WA Umma</span>
                      <ArrowUpRight className="w-4 h-4 opacity-80" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Advertise Banner Card */}
      <section className="py-10 border-t border-line">
        <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
          <div className="p-8 sm:p-10 rounded-2xl border-2 border-dashed border-rosewood/40 bg-white/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-[650px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rosewood/10 text-rosewood border border-rosewood/20 mb-3">
                <Megaphone className="w-3.5 h-3.5" />
                <span>Pemasangan Papan Rekomendasi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-ink">
                Iklankan bisnis atau lembagamu di sini!
              </h2>
              <p className="text-muted text-sm sm:text-[0.98rem] mt-2 leading-relaxed">
                Mari bertumbuh bersama Umma Motherhood Cipanas! Jangkau ratusan ibu di area Cipanas yang sedang mencari rekomendasi tepercaya untuk kebutuhan keluarga dan buah hati mereka. Biaya Rp 100.000 / Tahun.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAdvertiseOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] bg-rosewood text-[#fffaf2] font-bold text-sm whitespace-nowrap shadow-md hover:bg-[#9f5d54] transition-all cursor-pointer flex-shrink-0"
            >
              <span>Lihat Syarat &amp; Pasang Iklan</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <AdvertiseModal
        isOpen={isAdvertiseOpen}
        onClose={() => setIsAdvertiseOpen(false)}
      />
    </main>
  );
}

export default function DirektoriPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen bg-paper flex items-center justify-center p-8">
            <div className="text-center font-serif text-muted">
              Memuat Direktori Rekomendasi Cipanas...
            </div>
          </div>
        }
      >
        <DirectoryContent />
      </Suspense>
      <Footer />
    </>
  );
}
