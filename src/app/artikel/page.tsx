"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig, CommunityArticle } from "@/config/site";
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  BookOpen,
  Calendar,
  User,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Inbox,
  PenTool,
  Bookmark,
  Tag,
} from "lucide-react";

type ArticleCategory = "semua" | "ruang-berbagi" | "kelas-profesional" | "arsip-diskusi";

const CATEGORY_TABS: { key: ArticleCategory; label: string; badge: string }[] = [
  { key: "semua", label: "Semua Tulisan & Materi", badge: "Semua" },
  { key: "ruang-berbagi", label: "Ruang Berbagi Sesama Ibu", badge: "03" },
  { key: "kelas-profesional", label: "Materi Kelas Profesional", badge: "01" },
  { key: "arsip-diskusi", label: "Arsip Diskusi Umma", badge: "02" },
];

export default function ArtikelPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>("semua");

  // Read URL query param on client mount without de-optimizing static export
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("kategori") as ArticleCategory;
      if (cat && CATEGORY_TABS.some((t) => t.key === cat)) {
        setSelectedCategory(cat);
      }
    }
  }, []);

  const filteredArticles = useMemo(() => {
    return siteConfig.communityArticles.filter((item: CommunityArticle) => {
      const matchCategory =
        selectedCategory === "semua" || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCategory;

      const matchText =
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        (item.speaker && item.speaker.toLowerCase().includes(q)) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchCategory && matchText;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f2] text-ink">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Hero Header */}
        <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-line/60 bg-gradient-to-b from-[#f8f1e7]/80 to-transparent">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-rosewood text-xs font-bold uppercase tracking-wider mb-6 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-rosewood text-xs font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full bg-warm-sand/40 border border-line/70 mb-3.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Ruang Belajar, Kelas &amp; Literasi Ibu
                </span>
                <h1 className="text-[clamp(2.3rem,5vw,3.6rem)] font-serif font-normal text-ink leading-[1.1] tracking-tight">
                  Artikel &amp; Ruang Berbagi
                </h1>
                <p className="mt-4 text-muted text-base sm:text-lg max-w-[62ch] leading-relaxed">
                  Koleksi artikel asli karya ibu komunitas, intisari materi kelas profesional bersama pakar, dan tips praktis keseharian di Umma Motherhood Cipanas.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={siteConfig.journalUmmaArchiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] border border-rosewood text-rosewood text-xs sm:text-sm font-bold bg-paper hover:bg-warm-sand/40 transition-colors shadow-xs"
                >
                  <Bookmark className="w-4 h-4 text-rosewood" />
                  <span>Arsip Journal Umma</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20mengirimkan%20artikel%20/%20tulisan%20untuk%20dimuat%20di%20Ruang%20Berbagi%20Umma%20Motherhood."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs sm:text-sm font-bold shadow-xs hover:bg-[#9f5d54] transition-all"
                >
                  <PenTool className="w-4 h-4" />
                  <span>Kirim Tulisan via WA</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul artikel, topik parenting, atau nama pemateri..."
                className="w-full pl-11 pr-4 py-3 bg-paper border border-line rounded-lg text-sm text-ink placeholder:text-muted/70 focus:outline-hidden focus:border-rosewood shadow-xs transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-ink font-semibold"
                >
                  Hapus
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
              {CATEGORY_TABS.map((tab) => {
                const isActive = selectedCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSelectedCategory(tab.key)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                      isActive
                        ? "bg-rosewood text-[#fffaf2] border-rosewood shadow-xs"
                        : "bg-paper text-muted border-line hover:border-muted hover:text-ink"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-warm-sand/50 text-muted"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* List Content */}
        <section className="py-12">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
            {filteredArticles.length === 0 && selectedCategory !== "arsip-diskusi" ? (
              <div className="p-12 text-center rounded-2xl border border-line bg-paper max-w-lg mx-auto">
                <Search className="w-10 h-10 text-muted/60 mx-auto mb-3" />
                <h3 className="text-xl font-serif text-ink mb-1">
                  Tulisan Tidak Ditemukan
                </h3>
                <p className="text-sm text-muted mb-4">
                  Tidak ada artikel yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("semua");
                  }}
                  className="px-4 py-2 rounded-[4px] bg-rosewood text-white text-xs font-bold"
                >
                  Tampilkan Semua Tulisan
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((item) => {
                  const isRuangBerbagi = item.category === "ruang-berbagi";
                  const isKelas = item.category === "kelas-profesional";

                  return (
                    <article
                      key={item.id}
                      className="bg-paper border border-line/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg hover:border-rosewood/40 transition-all duration-200"
                    >
                      <div>
                        {/* Header Badges */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rosewood/10 text-rosewood border border-rosewood/20">
                            {isRuangBerbagi && <Sparkles className="w-3 h-3" />}
                            {isKelas && <Calendar className="w-3 h-3" />}
                            {item.categoryLabel}
                          </span>

                          {item.materiStatus && (
                            <span className="text-[11px] font-bold text-rosewood bg-warm-sand/35 px-2 py-0.5 rounded-full border border-line">
                              {item.materiStatus}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-serif font-medium text-ink leading-snug mb-2 group">
                          <Link
                            href={`/artikel/${item.id}/`}
                            className="hover:text-rosewood transition-colors inline-flex items-start gap-1"
                          >
                            <span>{item.title}</span>
                            <ArrowUpRight className="w-4 h-4 text-rosewood flex-shrink-0 mt-1 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </h2>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted mb-3.5 pb-3 border-b border-line/60">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-rosewood" />
                            {item.date}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-rosewood" />
                            {isKelas ? `Pemateri: ${item.speaker}` : `Oleh: ${item.author}`}
                          </span>
                        </div>

                        {/* Excerpt */}
                        <p className="text-muted text-sm leading-relaxed mb-4">
                          {item.excerpt}
                        </p>

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {item.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="inline-flex items-center gap-1 text-[11px] text-muted bg-paper-deep/50 px-2 py-0.5 rounded-md border border-line/50"
                              >
                                <Tag className="w-2.5 h-2.5 opacity-60" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-line/60 flex flex-col gap-2">
                        <Link
                          href={`/artikel/${item.id}/`}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold shadow-xs hover:bg-[#9f5d54] transition-colors"
                        >
                          <span>Buka Ringkasan &amp; Referensi</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>

                        {item.url && (
                          <div className="text-center">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-rosewood transition-colors font-medium"
                            >
                              <span>Tautan luar ke blog {item.author}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}

                {/* Section 02 Empty Notice Card */}
                {(selectedCategory === "semua" || selectedCategory === "arsip-diskusi") && (
                  <article className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border-2 border-dashed border-line bg-warm-sand/20 text-center">
                    <div>
                      <div className="w-12 h-12 rounded-full bg-rosewood/10 text-rosewood flex items-center justify-center mx-auto mb-3">
                        <Inbox className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-rosewood border border-rosewood/20">
                        Arsip Diskusi Umma
                      </span>
                      <h2 className="text-xl sm:text-2xl font-serif font-medium text-ink leading-tight mt-3 mb-2">
                        Sedang Dalam Proses Kurasi
                      </h2>
                      <p className="text-muted text-sm leading-relaxed mb-4">
                        Tanya-jawab berbobot dari grup WhatsApp Umma Motherhood seputar MPASI, menyusui, dan penanganan anak sedang dirangkum agar ilmu tidak tenggelam.
                      </p>
                    </div>

                    <a
                      href={siteConfig.links.whatsappGroup}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] border border-rosewood text-rosewood text-xs font-bold hover:bg-rosewood hover:text-[#fffaf2] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Gabung Diskusi di Grup WA</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </article>
                )}

                {/* Card CTA: Kirim Tulisan */}
                <article className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border-2 border-dashed border-rosewood/40 bg-warm-sand/20 text-center">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-rosewood/10 text-rosewood flex items-center justify-center mx-auto mb-3">
                      <PenTool className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-rosewood border border-rosewood/20">
                      Ruang Terbuka untuk Anggota
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-medium text-ink leading-tight mt-3 mb-2">
                      Punya Cerita &amp; Tips untuk Berbagi?
                    </h2>
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      Setiap ibu memiliki hikmah berharga. Bagikan tulisan, refleksi pengasuhan, atau resep rumahan Anda untuk diterbitkan di Ruang Berbagi Umma.
                    </p>
                  </div>

                  <a
                    href="https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20anggota%20komunitas%20dan%20ingin%20mengirimkan%20tulisan%20untuk%20Ruang%20Berbagi%20Sesama%20Ibu."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold shadow-xs hover:bg-[#9f5d54] transition-colors"
                  >
                    <span>Kirim Tulisan via WA Umma</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* Journal Umma Full Archive Banner */}
        <section className="mt-8">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#3b2820] text-[#fbf7f2] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#e2ded2] mb-2">
                  <Bookmark className="w-4 h-4 text-rosewood" />
                  Arsip Literasi Shierly
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white leading-tight">
                  Koleksi Lengkap Tulisan di Journal Umma
                </h3>
                <p className="mt-2 text-[#e2ded2] text-sm sm:text-base leading-relaxed">
                  Baca seluruh artikel refleksi pernikahan, keibuan, resensi buku parenting, dan catatan perjalanan hidup di blog resmi Shierly.
                </p>
              </div>

              <a
                href={siteConfig.journalUmmaArchiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 rounded-[4px] bg-[#fbf7f2] text-ink text-sm font-bold shadow-md hover:bg-white transition-all flex-shrink-0"
              >
                <span>Buka Arsip Tag #journal-umma</span>
                <ExternalLink className="w-4 h-4 text-rosewood" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
