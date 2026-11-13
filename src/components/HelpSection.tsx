"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Bike, Sparkles, Baby, Home, ShoppingBag, HeartHandshake, Wrench, MessageSquare, ArrowUpRight } from "lucide-react";
import { HelpAdvertiseModal } from "@/components/HelpAdvertiseModal";

export function HelpSection() {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case "bike":
        return <Bike className="w-5 h-5 text-rosewood" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-rosewood" />;
      case "baby":
        return <Baby className="w-5 h-5 text-rosewood" />;
      case "home":
        return <Home className="w-5 h-5 text-rosewood" />;
      case "shopping-bag":
        return <ShoppingBag className="w-5 h-5 text-rosewood" />;
      case "heart-handshake":
        return <HeartHandshake className="w-5 h-5 text-rosewood" />;
      case "wrench":
        return <Wrench className="w-5 h-5 text-rosewood" />;
      default:
        return <MessageSquare className="w-5 h-5 text-rosewood" />;
    }
  };

  return (
    <>
      <section
        id="bantuan"
        aria-labelledby="bantuan-title"
        className="py-[clamp(68px,9vw,115px)]"
      >
        <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,0.75fr)_minmax(0,1.25fr)] gap-6 md:gap-10 items-start mb-10">
            <div>
              <span className="inline-flex items-center gap-2.5 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
                03 / Saling bantu
              </span>
              <h2
                id="bantuan-title"
                className="mt-3.5 text-[clamp(2.2rem,5vw,3.6rem)] font-serif font-normal text-ink tracking-tight"
              >
                Kontak Bantuan &amp; Darurat Ibu
              </h2>
            </div>
            <p className="text-muted text-[1.05rem] leading-relaxed md:mt-11">
              Kumpulan kontak jasa lokal terverifikasi untuk membantu meringankan beban operasional harian di rumah:
            </p>
          </div>

          <div className="border-t border-line">
            {siteConfig.helpContacts.map((contact) => (
              <div
                key={contact.id}
                className="grid grid-cols-[40px_1fr] sm:grid-cols-[48px_1fr_auto] items-center gap-4 sm:gap-6 py-4 border-b border-line hover:bg-warm-sand/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-warm-sand/40 flex items-center justify-center">
                  {getIcon(contact.icon)}
                </div>
                <p className="text-ink font-medium text-[1rem] leading-relaxed">
                  {contact.title}
                </p>
                <div className="col-start-2 sm:col-start-3">
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[42px] px-4 py-2 inline-flex items-center gap-2 border border-line rounded-[4px] bg-paper text-rosewood text-[0.85rem] font-bold tracking-wide hover:bg-warm-sand/40 hover:border-rosewood transition-all shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Hubungi via WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Banner Kolom: Iklankan Jasa Harianmu Gratis di Sini */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl border border-rosewood/30 bg-warm-sand/25 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-[650px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-moss/10 text-moss border border-moss/20 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pendaftaran Jasa Lokal · Bebas Biaya (Gratis)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-ink">
                {siteConfig.helpAdvertise.bannerTitle}
              </h3>
              <p className="text-muted text-sm sm:text-[0.98rem] mt-2 leading-relaxed">
                {siteConfig.helpAdvertise.bannerSubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsHelpModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[4px] bg-rosewood text-[#fffaf2] font-bold text-sm whitespace-nowrap shadow-xs hover:bg-[#9f5d54] hover:shadow-sm transition-all cursor-pointer flex-shrink-0"
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
    </>
  );
}
