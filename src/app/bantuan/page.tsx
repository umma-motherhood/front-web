"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HelpAdvertiseModal } from "@/components/HelpAdvertiseModal";
import { siteConfig } from "@/config/site";
import {
  HELP_CATEGORY_TABS,
  HelpCategoryKey,
  HelpContactIcon,
  getHelpCategoryMeta,
} from "@/components/HelpContactIcon";
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  MessageSquare,
  Sparkles,
  HandHeart,
  X,
} from "lucide-react";

export default function BantuanPage() {
  const [activeCategory, setActiveCategory] = useState<HelpCategoryKey>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("kategori") as HelpCategoryKey;
      if (cat && HELP_CATEGORY_TABS.some((t) => t.key === cat)) {
        setActiveCategory(cat);
      }
    }
  }, []);

  const enrichedContacts = useMemo(() => {
    return siteConfig.helpContacts.map((contact) => {
      const meta = getHelpCategoryMeta(contact.icon);
      return {
        ...contact,
        categoryKey: meta.category,
        categoryLabel: meta.label,
      };
    });
  }, []);

  const filteredContacts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return enrichedContacts.filter((item) => {
      const matchCat =
        activeCategory === "semua" || item.categoryKey === activeCategory;
      const matchQ =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [enrichedContacts, activeCategory, searchQuery]);

  const resetFilters = () => {
    setActiveCategory("semua");
    setSearchQuery("");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-paper pb-20">
        {/* Breadcrumb / Top Return Bar */}
        <div className="border-b border-line/60 bg-warm-sand/20 py-3.5">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto flex items-center justify-between text-xs sm:text-sm">
            <Link
              href="/#bantuan"
              className="min-h-[44px] inline-flex items-center gap-1.5 text-muted hover:text-rosewood font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>

            <span className="text-muted/70 hidden sm:inline">
              Kontak Bantuan &amp; Jasa Harian · Cipanas &amp; Sekitarnya
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-line">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-[700px]">
                <span className="inline-flex items-center gap-2.5 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
                  03 / Saling Bantu
                </span>
                <h1 className="mt-3.5 mb-4 text-[clamp(2.4rem,5.5vw,4.2rem)] font-serif font-normal text-ink tracking-tight leading-[1.08]">
                  Kontak Bantuan &amp; Darurat Ibu
                </h1>
                <p className="text-muted text-[1.05rem] md:text-[1.12rem] leading-relaxed">
                  Direktori lengkap kontak jasa lokal dan bantuan harian untuk ibu dan keluarga di area Cipanas dan sekitarnya.
                  Temukan ojek panggilan, ART, babysitter, jastip belanja, pijat panggilan, guru les SD, hingga servis elektronik.
                </p>
              </div>

              {/* Free Service Listing Card */}
              <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white/80 border border-moss/30 shadow-xs max-w-sm">
                <div className="flex items-center gap-2 text-moss">
                  <HandHeart className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Pendaftaran Jasa Lokal · Gratis
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {siteConfig.helpAdvertise.bannerSubtitle}
                </p>
                <button
                  type="button"
                  onClick={() => setIsHelpModalOpen(true)}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold shadow-xs hover:bg-[#9f5d54] transition-colors cursor-pointer"
                >
                  <span>Lihat Syarat &amp; Pasang Jasa</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Controls */}
        <section className="py-6 sm:py-8 bg-warm-sand/20 border-b border-line sticky top-[76px] z-30 backdrop-blur-md">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {HELP_CATEGORY_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveCategory(tab.key)}
                    className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer inline-flex items-center ${
                      activeCategory === tab.key
                        ? "bg-rosewood text-[#fffaf2] shadow-xs"
                        : "bg-white/90 text-muted border border-line hover:border-rosewood/50 hover:text-ink"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari ojek, jastip, guru les, pijat, servis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-9 rounded-full border border-line bg-white/95 text-ink text-xs focus:outline-none focus:ring-2 focus:ring-rosewood/40 transition-all placeholder:text-muted/60"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Hapus pencarian"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Help Contacts Grid */}
        <section className="py-12">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-muted">
                Menampilkan {filteredContacts.length} Layanan Bantuan
              </span>
              {(activeCategory !== "semua" || searchQuery.trim() !== "") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-bold text-rosewood hover:underline cursor-pointer"
                >
                  Reset Filter
                </button>
              )}
            </div>

            {filteredContacts.length === 0 ? (
              <div className="p-10 rounded-2xl bg-white/80 border border-line text-center space-y-3">
                <p className="text-ink font-serif text-xl">
                  Layanan tidak ditemukan
                </p>
                <p className="text-sm text-muted max-w-md mx-auto">
                  Belum ada kontak bantuan yang cocok dengan kata kunci atau kategori yang dipilih.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold hover:bg-[#9f5d54] transition cursor-pointer"
                >
                  Tampilkan Semua Layanan
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {filteredContacts.map((contact) => (
                  <article
                    key={contact.id}
                    className="flex flex-col justify-between p-6 rounded-2xl bg-white/90 border border-line shadow-xs hover:border-rosewood/60 hover:shadow-md transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-full bg-warm-sand/50 flex items-center justify-center shrink-0">
                          <HelpContactIcon icon={contact.icon} />
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[0.72rem] font-bold bg-rosewood/10 text-rosewood border border-rosewood/20">
                          {contact.categoryLabel}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-serif font-medium text-ink leading-snug mb-5">
                        {contact.title}
                      </h2>
                    </div>

                    <div className="pt-4 border-t border-line/60">
                      <a
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold shadow-xs hover:bg-[#9f5d54] transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Hubungi via WhatsApp</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bottom Free CTA Banner */}
        <section className="py-10 border-t border-line">
          <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
            <div className="p-8 sm:p-10 rounded-2xl border-2 border-dashed border-rosewood/40 bg-white/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-[650px]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-moss/10 text-moss border border-moss/20 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pendaftaran Jasa Lokal · Bebas Biaya (Gratis)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-ink">
                  {siteConfig.helpAdvertise.bannerTitle}
                </h2>
                <p className="text-muted text-sm sm:text-[0.98rem] mt-2 leading-relaxed">
                  {siteConfig.helpAdvertise.bannerSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsHelpModalOpen(true)}
                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] bg-rosewood text-[#fffaf2] font-bold text-sm whitespace-nowrap shadow-md hover:bg-[#9f5d54] transition-all cursor-pointer flex-shrink-0"
              >
                <span>Lihat Syarat &amp; Pasang Jasa</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        <HelpAdvertiseModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />
      </main>
      <Footer />
    </>
  );
}
