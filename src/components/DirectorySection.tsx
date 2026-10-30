"use client";

import { useState } from "react";
import { siteConfig, DirectoryItem } from "@/config/site";
import { DetailModal, ModalData } from "@/components/DetailModal";
import { ArrowUpRight } from "lucide-react";

export function DirectorySection() {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const handleOpenDetail = (item: DirectoryItem) => {
    setSelectedModal({
      badge: item.code,
      title: item.title,
      subtitle: item.detail.subtitle,
      description: item.description,
      items: item.detail.categories,
      note: item.detail.note,
      whatsappMessage: `Halo Umma Shierly, saya ingin menanyakan rekomendasi "${item.title}" di area Cipanas melalui Umma Motherhood.`,
    });
  };

  return (
    <>
      <section
        id="direktori"
        aria-labelledby="direktori-title"
        className="py-[clamp(68px,9vw,115px)] bg-warm-sand/35 border-y border-line"
      >
        <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
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
              <span className="text-xs text-rosewood font-semibold bg-white/80 px-3 py-1 rounded-full border border-line/70 self-start md:self-auto">
                💡 Klik baris untuk melihat rincian kategori
              </span>
            </div>
          </div>

          <div className="border-t border-line">
            {siteConfig.directory.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => handleOpenDetail(item)}
                className="w-full text-left group grid grid-cols-[36px_1fr_32px] sm:grid-cols-[48px_1fr_40px] md:grid-cols-[56px_minmax(200px,0.85fr)_minmax(0,1.4fr)_44px] items-center gap-4 sm:gap-6 py-6 md:min-h-[112px] border-b border-line no-underline transition-all duration-200 hover:bg-black/[0.03] hover:pl-2 cursor-pointer"
              >
                <span className="text-rosewood font-serif text-[1.2rem] font-semibold group-hover:scale-110 transition-transform">
                  {item.code}
                </span>
                <div>
                  <h3 className="text-ink font-serif text-[clamp(1.2rem,2.2vw,1.55rem)] font-medium leading-snug group-hover:text-rosewood transition-colors">
                    {item.title}
                  </h3>
                  <span className="inline-block md:hidden text-xs text-rosewood font-semibold mt-1">
                    Buka rincian direktori →
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
