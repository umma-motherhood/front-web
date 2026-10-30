"use client";

import { useEffect } from "react";
import { X, ArrowUpRight, MessageCircle, MapPin } from "lucide-react";
import { DirectoryItem } from "@/config/site";

interface DirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DirectoryItem | null;
}

export function DirectoryModal({ isOpen, onClose, data }: DirectoryModalProps) {
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

  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/65 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="directory-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-paper border border-line rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
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

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-rosewood font-serif text-xl sm:text-2xl font-bold">
            {data.code}
          </span>
          <span className="text-xs uppercase tracking-wider font-sans font-bold text-muted">
            Direktori Rekomendasi
          </span>
        </div>

        <h3
          id="directory-modal-title"
          className="text-2xl sm:text-3xl font-serif font-normal text-ink leading-tight"
        >
          {data.title}
        </h3>
        <p className="text-rosewood font-medium text-sm sm:text-base mt-1 mb-4">
          {data.subtitle}
        </p>
        <p className="text-muted text-sm leading-relaxed mb-6">
          {data.description}
        </p>

        {/* Subgroups & Places */}
        <div className="space-y-6">
          {data.subgroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-4">
              {data.subgroups.length > 1 && (
                <div className="flex items-center gap-2 pt-2 border-t border-line/60">
                  <span className="w-2 h-2 rounded-full bg-rosewood" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-ink font-sans">
                    {group.title}
                  </h4>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {group.places.map((place, pIdx) => {
                  const placeWaUrl = `https://wa.me/6287883370039?text=${encodeURIComponent(
                    place.waMessage
                  )}`;

                  return (
                    <div
                      key={pIdx}
                      className="p-5 rounded-xl bg-white/70 border border-line shadow-xs hover:border-rosewood/50 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h5 className="text-lg font-serif font-semibold text-ink">
                          {place.name}
                        </h5>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rosewood/10 text-rosewood border border-rosewood/20">
                          {place.categoryTag}
                        </span>
                      </div>

                      <p className="text-muted text-sm leading-relaxed mb-4">
                        {place.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-line/50">
                        <span className="text-xs text-muted flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rosewood" />
                          Area Cipanas &amp; Sekitarnya
                        </span>

                        <a
                          href={placeWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold shadow-2xs hover:bg-[#9f5d54] transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Minta Kontak ke Umma Shierly</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>Rekomendasi dikurasi dari pengalaman nyata para ibu di Cipanas.</p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-line rounded-[4px] text-ink hover:bg-warm-sand/40 font-medium transition-colors"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
}
