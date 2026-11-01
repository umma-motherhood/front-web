"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig, ClassItem } from "@/config/site";
import { DetailModal, ModalData } from "@/components/DetailModal";
import { ArrowUpRight } from "lucide-react";

export function ClassesSection() {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const handleOpenDetail = (item: ClassItem) => {
    setSelectedModal({
      badge: item.number,
      title: item.title,
      subtitle: item.detail.subtitle,
      description: item.description,
      items: item.detail.points,
      note: item.detail.note,
      isEmpty: item.detail.isEmpty,
      emptyBadge: item.detail.emptyBadge,
      emptyTitle: item.detail.emptyTitle,
      emptyDescription: item.detail.emptyDescription,
      classEvent: item.detail.classEvent,
      articles: item.detail.articles,
      archiveUrl: item.detail.archiveUrl,
      whatsappMessage: `Halo Umma Shierly, saya tertarik dengan info "${item.title}" di Umma Motherhood Cipanas. Apakah bisa minta informasi lebih lanjut?`,
    });
  };

  return (
    <>
      <section
        id="kelas"
        aria-labelledby="kelas-title"
        className="py-[clamp(64px,9vw,110px)] border-t border-line/60"
      >
        <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2.5 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
                01 / Belajar &amp; berbagi
              </span>
              <h2
                id="kelas-title"
                className="mt-3.5 mb-2 text-[clamp(2.2rem,5vw,3.6rem)] font-serif font-normal text-ink tracking-tight"
              >
                Kelas &amp; Ruang Berbagi
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
              <Link
                href="/artikel/"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold shadow-xs hover:bg-[#9f5d54] transition-all"
              >
                <span>Buka Halaman Artikel Komunitas</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <p className="text-xs text-muted font-medium bg-warm-sand/30 px-3 py-1.5 rounded-full border border-line/60">
                💡 Klik setiap topik untuk melihat rincian
              </p>
            </div>
          </div>

          <div className="border-t border-line">
            {siteConfig.classes.map((item) => (
              <button
                key={item.number}
                type="button"
                onClick={() => handleOpenDetail(item)}
                className="w-full text-left group grid grid-cols-[36px_1fr] sm:grid-cols-[48px_1fr] md:grid-cols-[70px_minmax(0,0.85fr)_minmax(0,1.15fr)_40px] items-start gap-3 sm:gap-5 md:gap-7 py-7 border-b border-line transition-all duration-200 hover:bg-warm-sand/25 hover:pl-2 cursor-pointer"
              >
                <span className="text-rosewood font-serif text-[1.2rem] font-semibold group-hover:scale-110 transition-transform">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-ink font-serif text-[clamp(1.25rem,2.5vw,1.65rem)] font-medium leading-tight group-hover:text-rosewood transition-colors">
                    {item.title}
                  </h3>
                  <span className="inline-block md:hidden text-xs text-rosewood font-semibold mt-1">
                    Klik untuk info rincian →
                  </span>
                </div>
                <p className="col-start-2 md:col-start-3 text-muted text-[1.02rem] leading-relaxed">
                  {item.description}
                </p>
                <div className="hidden md:flex justify-end pt-1">
                  <span className="w-7 h-7 rounded-full bg-paper flex items-center justify-center text-muted group-hover:text-rosewood group-hover:bg-warm-sand/50 group-hover:translate-x-0.5 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <DetailModal
        isOpen={Boolean(selectedModal)}
        onClose={() => setSelectedModal(null)}
        data={selectedModal}
      />
    </>
  );
}
