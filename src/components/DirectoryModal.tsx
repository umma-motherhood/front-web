"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ArrowUpRight, MessageCircle, MapPin, Clock, Star } from "lucide-react";
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/65 modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="directory-modal-title"
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

        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pr-10">
          <div className="flex items-center gap-2">
            <span className="text-rosewood font-serif text-xl sm:text-2xl font-bold">
              {data.code}
            </span>
            <span className="text-xs uppercase tracking-wider font-sans font-bold text-muted">
              Direktori Rekomendasi
            </span>
          </div>

          <Link
            href={`/direktori?kategori=${data.id}`}
            onClick={onClose}
            className="inline-flex items-center gap-1 text-xs font-bold text-rosewood hover:underline"
          >
            <span>Buka di Halaman Lengkap</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
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

              <div className="grid grid-cols-1 gap-5">
                {group.places.map((place, pIdx) => {
                  const placeWaUrl = `https://wa.me/6287883370039?text=${encodeURIComponent(
                    place.waMessage
                  )}`;

                  return (
                    <div
                      key={pIdx}
                      className="p-5 rounded-xl bg-white/80 border border-line shadow-xs hover:border-rosewood/50 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h5 className="text-lg font-serif font-semibold text-ink">
                          {place.name}
                        </h5>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rosewood/10 text-rosewood border border-rosewood/20">
                          {place.categoryTag}
                        </span>
                      </div>

                      <p className="text-muted text-sm leading-relaxed mb-3.5">
                        {place.description}
                      </p>

                      {/* Location & Schedule summary */}
                      <div className="p-3 rounded-lg bg-warm-sand/20 border border-line/60 space-y-1.5 mb-3.5 text-xs text-ink">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-rosewood flex-shrink-0 mt-0.5" />
                          <span className="text-muted">{place.address}</span>
                        </div>
                        {place.schedule && (
                          <div className="flex items-start gap-2">
                            <Clock className="w-3.5 h-3.5 text-moss flex-shrink-0 mt-0.5" />
                            <span className="text-muted">{place.schedule}</span>
                          </div>
                        )}
                      </div>

                      {/* Review snippet */}
                      <div className="p-3 rounded-lg bg-paper border border-line/70 mb-4 text-xs italic text-ink flex items-start gap-2">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-current flex-shrink-0 mt-0.5" />
                        <div>
                          <span>&ldquo;{place.review.text}&rdquo;</span>
                          <span className="block font-semibold not-italic text-rosewood mt-1 text-[0.72rem]">
                            — {place.review.author}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-line/50">
                        <Link
                          href={`/direktori?kategori=${data.id}`}
                          onClick={onClose}
                          className="text-xs font-semibold text-ink hover:text-rosewood transition-colors inline-flex items-center gap-1"
                        >
                          <span>Lihat di Halaman Direktori</span>
                          <ArrowUpRight className="w-3 h-3 text-rosewood" />
                        </Link>

                        <a
                          href={placeWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold shadow-2xs hover:bg-[#9f5d54] transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Hubungi via WA Umma</span>
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
          <Link
            href={`/direktori?kategori=${data.id}`}
            onClick={onClose}
            className="inline-flex items-center gap-1 font-bold text-rosewood hover:underline"
          >
            <span>Buka Semua Tempat di Kategori Ini</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
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
