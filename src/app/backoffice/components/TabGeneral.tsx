"use client";

import { SiteContentData } from "@/config/site";
import { Phone, MessageCircle, Sparkles, Layout } from "lucide-react";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface TabGeneralProps {
  data: SiteContentData;
  onChange: (updated: SiteContentData) => void;
}

export function TabGeneral({ data, onChange }: TabGeneralProps) {
  const updateGlobal = (key: keyof SiteContentData["globalSettings"], value: string) => {
    onChange({
      ...data,
      globalSettings: {
        ...data.globalSettings,
        [key]: value,
      },
    });
  };

  const updateHero = (key: keyof SiteContentData["hero"], value: string) => {
    onChange({
      ...data,
      hero: {
        ...data.hero,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Pengaturan Nomor Kontak & Media Komunitas */}
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line">
          <div className="w-10 h-10 rounded-lg bg-warm-sand/50 text-rosewood flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-ink">
              Kontak Global & Media Sosial
            </h2>
            <p className="text-xs text-muted">
              Nomor WhatsApp di bawah ini bertindak sebagai kontak pusat untuk seluruh tombol pendaftaran dan bantuan di website.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
              Nomor WhatsApp Admin Global (Format 62xxx)
            </label>
            <div className="relative">
              <input
                type="text"
                value={data.globalSettings?.adminWhatsapp || ""}
                onChange={(e) => updateGlobal("adminWhatsapp", e.target.value)}
                placeholder="Contoh: 6287883370039"
                className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink font-mono focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>
            <p className="mt-1 text-[11px] text-muted">
              Ubah nomor ini jika ada pergantian admin. Semua tombol WA otomatis mengarah ke sini.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
              Teks Nomor Tampilan
            </label>
            <input
              type="text"
              value={data.globalSettings?.adminPhoneDisplay || ""}
              onChange={(e) => updateGlobal("adminPhoneDisplay", e.target.value)}
              placeholder="Contoh: 0878-8337-0039"
              className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
            />
            <p className="mt-1 text-[11px] text-muted">
              Format tampilan yang nyaman dibaca pengunjung.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Link Undangan Grup WhatsApp</span>
            </label>
            <input
              type="url"
              value={data.globalSettings?.whatsappGroupUrl || ""}
              onChange={(e) => updateGlobal("whatsappGroupUrl", e.target.value)}
              placeholder="https://chat.whatsapp.com/..."
              className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink font-mono focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <InstagramIcon className="w-3.5 h-3.5 text-rose-600" />
              <span>Tautan Instagram Resmi</span>
            </label>
            <input
              type="url"
              value={data.globalSettings?.instagramUrl || ""}
              onChange={(e) => updateGlobal("instagramUrl", e.target.value)}
              placeholder="https://www.instagram.com/..."
              className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink font-mono focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
            />
          </div>
        </div>
      </div>

      {/* Bagian Hero & Teks Sambutan Depan */}
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line">
          <div className="w-10 h-10 rounded-lg bg-warm-sand/50 text-rosewood flex items-center justify-center">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-ink">
              Bagian Hero & Teks Sambutan Beranda
            </h2>
            <p className="text-xs text-muted">
              Sesuaikan judul, tagline, paragraf pembuka, dan tombol ajakan di bagian teratas website.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
              Tagline Atas (Eyebrow Badge)
            </label>
            <input
              type="text"
              value={data.hero?.tagline || ""}
              onChange={(e) => updateHero("tagline", e.target.value)}
              placeholder="Ruang tumbuh bersama · Cipanas"
              className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Awalan Judul
              </label>
              <input
                type="text"
                value={data.hero?.headingPrefix || ""}
                onChange={(e) => updateHero("headingPrefix", e.target.value)}
                placeholder="Selamat Datang di"
                className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Teks Sorotan (Warna Rosewood)
              </label>
              <input
                type="text"
                value={data.hero?.headingHighlight || ""}
                onChange={(e) => updateHero("headingHighlight", e.target.value)}
                placeholder="Umma Motherhood"
                className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink font-semibold focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Akhiran Judul
              </label>
              <input
                type="text"
                value={data.hero?.headingSuffix || ""}
                onChange={(e) => updateHero("headingSuffix", e.target.value)}
                placeholder="Cipanas"
                className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
              Deskripsi Utama
            </label>
            <textarea
              rows={3}
              value={data.hero?.description || ""}
              onChange={(e) => updateHero("description", e.target.value)}
              className="w-full p-3.5 text-sm rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
              Deskripsi Lanjutan
            </label>
            <textarea
              rows={3}
              value={data.hero?.descriptionExtended || ""}
              onChange={(e) => updateHero("descriptionExtended", e.target.value)}
              className="w-full p-3.5 text-sm rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Teks Tombol CTA WhatsApp
              </label>
              <input
                type="text"
                value={data.hero?.ctaGroupText || ""}
                onChange={(e) => updateHero("ctaGroupText", e.target.value)}
                placeholder="Gabung Grup WhatsApp"
                className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Teks Tombol CTA Direktori
              </label>
              <input
                type="text"
                value={data.hero?.ctaDirectoryText || ""}
                onChange={(e) => updateHero("ctaDirectoryText", e.target.value)}
                placeholder="Lihat Direktori Cipanas"
                className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
