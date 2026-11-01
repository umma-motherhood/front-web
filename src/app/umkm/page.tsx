"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { UmkmAdvertiseModal } from "@/components/UmkmAdvertiseModal";
import { UmkmDetailModal } from "@/components/UmkmDetailModal";
import { siteConfig, UmkmItem } from "@/config/site";
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  Store,
  MapPin,
  Tag,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  Phone,
  Eye,
} from "lucide-react";

type CategoryFilter = "semua" | "toserba" | "busana" | "kuliner" | "bayi" | "kriya";

const CATEGORIES: { key: CategoryFilter; label: string }[] = [
  { key: "semua", label: "Semua Usaha" },
  { key: "toserba", label: "Toko Serba Ada" },
  { key: "busana", label: "Busana Anak" },
  { key: "kuliner", label: "Kuliner & Katering" },
  { key: "bayi", label: "Perlengkapan Bayi" },
  { key: "kriya", label: "Kriya & Kerajinan" },
];

function UmkmCard({
  item,
  onOpenDetail,
}: {
  item: UmkmItem;
  onOpenDetail: (item: UmkmItem) => void;
}) {
  const cleanDigits = (item.phone || "").replace(/[^0-9]/g, "");
  const isDirect = cleanDigits.startsWith("08");
  const phoneTarget = isDirect ? `62${cleanDigits.slice(1)}` : "6287883370039";
  const itemWaUrl = `https://wa.me/${phoneTarget}?text=${encodeURIComponent(
    item.waMessage
  )}`;

  const coverImage =
    item.images && item.images.length > 0 ? item.images[0] : null;

  return (
    <article className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/85 border border-line shadow-xs hover:border-rosewood/50 hover:shadow-md transition-all duration-200">
      <div>
        {/* Cover Photo */}
        {coverImage ? (
          <div
            onClick={() => onOpenDetail(item)}
            className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-warm-sand/30 border border-line mb-4 cursor-pointer group"
          >
            <img
              src={coverImage}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {item.images && item.images.length > 1 && (
              <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-ink/75 text-white text-[0.68rem] font-medium backdrop-blur-xs flex items-center gap-1">
                <span>{item.images.length} Foto</span>
              </span>
            )}
          </div>
        ) : (
          <div
            onClick={() => onOpenDetail(item)}
            className="w-full aspect-[16/10] rounded-xl bg-warm-sand/30 border border-line mb-4 flex items-center justify-center text-muted/50 cursor-pointer"
          >
            <Store className="w-10 h-10" />
          </div>
        )}

        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[0.72rem] font-bold bg-rosewood/10 text-rosewood border border-rosewood/20">
            {item.categoryLabel}
          </span>
          <span className="text-[0.72rem] text-muted font-medium">
            Oleh: {item.owner}
          </span>
        </div>

        {/* Title & Tagline */}
        <h2 className="text-xl font-serif font-medium text-ink leading-tight mb-1">
          {item.name}
        </h2>
        {item.tagline && (
          <p className="text-xs font-medium text-rosewood italic mb-2.5 line-clamp-1">
            &ldquo;{item.tagline}&rdquo;
          </p>
        )}

        {/* Short Description */}
        <p className="text-muted text-xs sm:text-[0.84rem] leading-relaxed mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Available Menu / Sembako Pill */}
        {item.products && item.products.length > 0 && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-warm-sand/30 border border-line/70 text-[0.72rem] text-ink font-medium mb-4">
            <ShoppingBag className="w-3.5 h-3.5 text-rosewood" />
            <span>Tersedia {item.products.length} Pilihan Menu &amp; Produk</span>
          </div>
        )}
      </div>

      {/* Meta Information & Action Buttons */}
      <div>
        <div className="pt-3 border-t border-line/60 flex items-center justify-between gap-2 text-xs text-muted mb-4">
          <span className="inline-flex items-center gap-1 font-semibold text-rosewood">
            <Tag className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{item.priceRange}</span>
          </span>
          <span
            className="inline-flex items-center gap-1 text-muted max-w-[170px] truncate"
            title={item.location}
          >
            <MapPin className="w-3.5 h-3.5 text-muted flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenDetail(item)}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-[4px] border border-line bg-paper text-ink text-xs font-bold hover:border-rosewood hover:text-rosewood transition-colors shadow-2xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-rosewood" />
            <span>Lihat Detail</span>
          </button>

          <a
            href={itemWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold shadow-xs hover:bg-[#9f5d54] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Pesan via WA</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function UmkmPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("semua");
  const [isAdvertiseOpen, setIsAdvertiseOpen] = useState(false);
  const [selectedDetailUmkm, setSelectedDetailUmkm] = useState<UmkmItem | null>(null);

  const filteredUmkm = useMemo(() => {
    return siteConfig.umkmList.filter((item: UmkmItem) => {
      const matchCategory =
        selectedCategory === "semua" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.owner.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query);

      return matchCategory && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-paper pb-20">
        {/* Breadcrumb / Top Return Bar */}
        <div className="border-b border-line/60 bg-warm-sand/20 py-3.5">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto flex items-center justify-between text-xs sm:text-sm">
            <Link
              href="/#lapak"
              className="inline-flex items-center gap-1.5 text-muted hover:text-rosewood font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>

            <span className="text-muted/70 hidden sm:inline">
              Komunitas Ibu Cipanas · Lapak UMKM
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-line">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-[700px]">
                <span className="inline-flex items-center gap-2.5 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
                  04 / Karya &amp; Usaha Anggota
                </span>
                <h1 className="mt-3.5 mb-4 text-[clamp(2.4rem,5.5vw,4.2rem)] font-serif font-normal text-ink tracking-tight leading-[1.08]">
                  Katalog Lapak UMKM Umma
                </h1>
                <p className="text-muted text-[1.05rem] md:text-[1.12rem] leading-relaxed">
                  Etalase bisnis dan produk lokal milik para ibu di Umma Motherhood Cipanas.
                  Mulai dari busana anak, kuliner rumahan, perlengkapan bayi, hingga karya kriya tangan.
                  Mari bertransaksi di sini untuk saling mendukung kemandirian finansial dan menghidupi ekonomi komunitas kita sendiri.
                </p>
              </div>

              {/* Action Banner */}
              <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white/80 border border-rosewood/30 shadow-xs max-w-sm">
                <div className="flex items-center gap-2 text-rosewood">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Iklankan Usahamu
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Hanya <strong>Rp 55.000 / Tahun</strong> untuk tayang di etalase resmi dan menjangkau ratusan ibu di Cipanas.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAdvertiseOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold shadow-xs hover:bg-[#9f5d54] transition-colors cursor-pointer"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Daftarkan Usahamu</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="py-8 bg-warm-sand/20 border-b border-line">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Category Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat.key
                        ? "bg-rosewood text-[#fffaf2] shadow-xs"
                        : "bg-white/80 text-muted border border-line hover:border-rosewood/50 hover:text-ink"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari toko atau produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-line bg-white/90 text-ink text-xs focus:outline-none focus:ring-2 focus:ring-rosewood/40 transition-all placeholder:text-muted/60"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Grid / Empty State */}
        <section className="py-12">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
            {siteConfig.umkmList.length === 0 ? (
              <div className="max-w-2xl mx-auto py-12 px-6 sm:px-10 rounded-2xl border border-rosewood/30 bg-white/80 shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-rosewood/10 text-rosewood flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rosewood/10 text-rosewood border border-rosewood/20 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Pendaftaran Perdana Dibuka
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-ink leading-tight mb-3">
                  Etalase Lapak UMKM Sedang Dibuka
                </h2>
                <p className="text-muted text-[0.98rem] leading-relaxed max-w-lg mx-auto mb-6">
                  Belum ada produk atau usaha yang terdaftar di etalase ini. Mari menjadi yang pertama mempromosikan produk dan usahamu kepada para ibu di Cipanas!
                </p>

                {/* Price pill */}
                <div className="p-4 rounded-xl bg-warm-sand/35 border border-line mb-6 max-w-md mx-auto flex items-center justify-between gap-3 text-left">
                  <div>
                    <span className="text-[0.72rem] font-bold uppercase tracking-wider text-muted">
                      Biaya Iklan Komunitas:
                    </span>
                    <div className="text-xl font-serif font-bold text-rosewood">
                      Rp 55.000 / Tahun
                    </div>
                  </div>
                  <span className="text-xs text-muted max-w-[180px]">
                    Masa tayang 1 tahun penuh di website resmi Umma.
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAdvertiseOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[4px] bg-rosewood text-[#fffaf2] text-sm font-bold shadow-md hover:bg-[#9f5d54] transition-all cursor-pointer"
                  >
                    <Store className="w-4 h-4" />
                    <span>Daftarkan Usahamu Sekarang</span>
                    <ArrowUpRight className="w-4 h-4 opacity-80" />
                  </button>
                  <Link
                    href="/#lapak"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-[4px] border border-line text-ink text-sm font-medium hover:bg-warm-sand/30 transition-colors"
                  >
                    Kembali ke Beranda
                  </Link>
                </div>
              </div>
            ) : filteredUmkm.length === 0 ? (
              <div className="py-16 text-center bg-white/60 rounded-2xl border border-line p-8 max-w-lg mx-auto">
                <ShoppingBag className="w-12 h-12 text-muted/40 mx-auto mb-3" />
                <h3 className="text-xl font-serif font-medium text-ink">
                  Tidak Ada Hasil yang Cocok
                </h3>
                <p className="text-muted text-sm mt-1 mb-5">
                  Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("semua");
                  }}
                  className="px-4 py-2 rounded-[4px] bg-warm-sand/50 text-ink text-xs font-bold hover:bg-warm-sand transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {filteredUmkm.map((item) => (
                  <UmkmCard
                    key={item.id}
                    item={item}
                    onOpenDetail={setSelectedDetailUmkm}
                  />
                ))}

                {/* Always-present CTA Card to Join the Catalog */}
                <article className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border-2 border-dashed border-rosewood/40 bg-warm-sand/20 text-center">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-rosewood/10 text-rosewood flex items-center justify-center mx-auto mb-3">
                      <Store className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-rosewood border border-rosewood/20">
                      Slot UMKM Terbuka
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-medium text-ink leading-tight mt-3 mb-2">
                      Iklankan UMKM Anda di Sini!
                    </h2>
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      Jangkau ratusan ibu di komunitas Umma Motherhood Cipanas. Hanya <strong>Rp 55.000 / Tahun</strong>.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAdvertiseOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold shadow-xs hover:bg-[#9f5d54] transition-colors cursor-pointer"
                  >
                    <span>Daftarkan Usahamu</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </article>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <UmkmDetailModal
        isOpen={Boolean(selectedDetailUmkm)}
        onClose={() => setSelectedDetailUmkm(null)}
        item={selectedDetailUmkm}
      />

      <UmkmAdvertiseModal
        isOpen={isAdvertiseOpen}
        onClose={() => setIsAdvertiseOpen(false)}
      />
    </>
  );
}
