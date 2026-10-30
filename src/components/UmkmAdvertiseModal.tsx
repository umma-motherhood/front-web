"use client";

import { useEffect } from "react";
import { X, ArrowUpRight, MessageCircle, Store, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

interface UmkmAdvertiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UmkmAdvertiseModal({ isOpen, onClose }: UmkmAdvertiseModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { umkmAdvertise } = siteConfig;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/65 modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="umkm-advertise-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-paper border border-line rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-warm-sand/50 flex items-center justify-center text-muted hover:text-ink hover:bg-warm-sand transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge & Title */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rosewood/15 text-rosewood border border-rosewood/30">
            <Store className="w-3.5 h-3.5" />
            Lapak UMKM Umma Motherhood
          </span>
        </div>

        <h3
          id="umkm-advertise-title"
          className="text-2xl sm:text-3xl font-serif font-normal text-ink leading-tight"
        >
          {umkmAdvertise.bannerTitle}
        </h3>

        <p className="text-muted text-sm sm:text-base leading-relaxed mt-2 mb-6">
          {umkmAdvertise.heroText}
        </p>

        {/* Biaya Pemasangan Card */}
        <div className="p-5 rounded-xl bg-warm-sand/40 border border-line mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted font-sans">
              Biaya Iklan:
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-rosewood mt-0.5">
              {umkmAdvertise.price}
            </div>
          </div>
          <span className="text-xs text-muted max-w-[220px] leading-snug">
            Masa tayang 1 tahun di etalase website Umma Motherhood Cipanas.
          </span>
        </div>

        {/* Persyaratan Pendaftaran */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1.5">
            <CheckCircle className="w-4 h-4 text-rosewood" />
            <h4 className="text-base font-serif font-semibold text-ink">
              Persyaratan Pendaftaran:
            </h4>
          </div>
          <p className="text-xs text-muted mb-4 leading-relaxed">
            Untuk menjaga mutu etalase komunitas dan kenyamanan belanja para ibu:
          </p>

          <div className="space-y-3.5">
            {umkmAdvertise.requirements.map((req, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/80 border border-line flex items-start gap-3.5 shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-rosewood/10 text-rosewood font-serif font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-ink mb-1">
                    {req.title}
                  </h5>
                  <p className="text-xs text-muted leading-relaxed">
                    {req.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-line">
          <a
            href={umkmAdvertise.waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex min-h-[50px] items-center justify-center gap-2.5 px-6 py-3 bg-rosewood text-[#fffaf2] rounded-[4px] text-sm font-bold shadow-md hover:bg-[#9f5d54] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{umkmAdvertise.ctaButtonText}</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[50px] items-center justify-center px-5 py-2.5 border border-line rounded-[4px] text-ink text-sm font-medium hover:bg-warm-sand/40 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
