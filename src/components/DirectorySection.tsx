"use client";

import { useState } from "react";
import { siteConfig, DirectoryItem } from "@/config/site";
import { DirectoryModal } from "@/components/DirectoryModal";
import { AdvertiseModal } from "@/components/AdvertiseModal";
import { ArrowUpRight, Sparkles, Megaphone } from "lucide-react";

export function DirectorySection() {
  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryItem | null>(null);
  const [isAdvertiseOpen, setIsAdvertiseOpen] = useState(false);

  return (
    <>
      <section
        id="direktori"
        aria-labelledby="direktori-title"
        className="py-[clamp(68px,9vw,115px)] bg-warm-sand/35 border-y border-line"
      >
        <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
          {/* Section Header */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,0.75fr)_minmax(0,1.25fr)] md:items-end gap-6 mb-10">
            <div>
              <span className="inline-flex items-center gap-2.5 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
                02 / Indeks lokal
              </span>
              <h2
                id="direktori-title"
                className="mt-3.5 text-[clamp(2.2rem,5vw,3.6rem)] font-serif font-normal text-ink tracking-tight"
              >
                Direktori Rekomendasi Cipanas
              </h2>
            </div>
            <div className="flex flex-col md:items-end gap-2 md:mb-1">
              <p className="text-muted text-[1.05rem] leading-relaxed">
                Pusat informasi hiper-lokal hasil kurasi dan pengalaman nyata para ibu.
              </p>
              <span className="text-xs text-rosewood font-semibold bg-white/80 px-3 py-1 rounded-full border border-line/70 self-start md:self-auto flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Klik kategori untuk melihat daftar dokter, kelas &amp; toko
              </span>
            </div>
          </div>

          {/* Directory Rows */}
          <div className="border-t border-line">
            {siteConfig.directory.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setSelectedDirectory(item)}
                className="w-full text-left group grid grid-cols-[36px_1fr_32px] sm:grid-cols-[48px_1fr_40px] md:grid-cols-[56px_minmax(200px,0.85fr)_minmax(0,1.4fr)_44px] items-center gap-4 sm:gap-6 py-6 md:min-h-[112px] border-b border-line no-underline transition-all duration-200 hover:bg-black/[0.03] hover:pl-2 cursor-pointer"
              >
                <span className="text-rosewood font-serif text-[1.2rem] font-semibold group-hover:scale-110 transition-transform">
                  {item.code}
                </span>
                <div>
                  <h3 className="text-ink font-serif text-[clamp(1.2rem,2.2vw,1.55rem)] font-medium leading-snug group-hover:text-rosewood transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs text-muted block mt-0.5">
                    {item.subtitle}
                  </span>
                  <span className="inline-block md:hidden text-xs text-rosewood font-semibold mt-1">
                    Buka rekomendasi ({item.subgroups.reduce((acc, g) => acc + g.places.length, 0)} tempat) →
                  </span>
                </div>
                <p className="col-start-2 col-span-1 md:col-start-3 md:col-span-1 text-muted text-[0.98rem] leading-relaxed">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-rosewood group-hover:bg-warm-sand/50 group-hover:translate-x-1 transition-all duration-200">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Banner Iklan: Iklankan bisnis atau lembagamu di sini! */}
          <div className="mt-12 pt-6">
            <button
              type="button"
              onClick={() => setIsAdvertiseOpen(true)}
              className="w-full text-left p-6 sm:p-8 rounded-2xl bg-white/80 border-2 border-dashed border-rosewood/40 hover:border-rosewood hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-rosewood/10 text-rosewood flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Megaphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink group-hover:text-rosewood transition-colors">
                      {siteConfig.advertise.bannerTitle}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rosewood text-[#fffaf2]">
                      Rp 100.000 / Tahun
                    </span>
                  </div>
                  <p className="text-muted text-sm max-w-[65ch] leading-relaxed">
                    {siteConfig.advertise.bannerSubtitle}
                  </p>
                </div>
              </div>

              <div className="self-end sm:self-center flex-shrink-0">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-sm font-bold shadow-xs group-hover:bg-[#9f5d54] transition-colors">
                  <span>Lihat Syarat &amp; Pasang Iklan</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Directory Detail Modal */}
      <DirectoryModal
        isOpen={Boolean(selectedDirectory)}
        onClose={() => setSelectedDirectory(null)}
        data={selectedDirectory}
      />

      {/* Advertise Modal */}
      <AdvertiseModal
        isOpen={isAdvertiseOpen}
        onClose={() => setIsAdvertiseOpen(false)}
      />
    </>
  );
}
