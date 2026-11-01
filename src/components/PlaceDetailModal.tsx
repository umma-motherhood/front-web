"use client";

import { useEffect } from "react";
import {
  X,
  ArrowUpRight,
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  Star,
  Shield,
  Tag,
} from "lucide-react";
import { DirectoryPlaceItem } from "@/config/site";

interface PlaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    place: DirectoryPlaceItem;
    categoryId: string;
    categoryCode: string;
    categoryTitle: string;
    subgroupTitle: string;
  } | null;
}

export function PlaceDetailModal({ isOpen, onClose, item }: PlaceDetailModalProps) {
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

  if (!isOpen || !item) return null;

  const { place, categoryCode, categoryTitle } = item;

  const cleanDigits = place.contact.phone.replace(/[^0-9]/g, "");
  const isDirect =
    cleanDigits.startsWith("08") && !place.contact.phone.includes("via Umma");
  const phoneTarget = isDirect ? `62${cleanDigits.slice(1)}` : "6287883370039";
  const waUrl = `https://wa.me/${phoneTarget}?text=${encodeURIComponent(
    place.waMessage
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/70 backdrop-blur-xs modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-paper border border-line rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-warm-sand/50 flex items-center justify-center text-muted hover:text-ink hover:bg-warm-sand transition-colors cursor-pointer z-10"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rosewood/10 text-rosewood border border-rosewood/20">
            {place.categoryTag}
          </span>
          <span className="text-[0.72rem] font-bold text-muted bg-warm-sand/30 px-2.5 py-0.5 rounded-full border border-line/60">
            {categoryCode} {categoryTitle}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-normal text-ink leading-tight mb-3">
          {place.name}
        </h3>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider font-bold text-muted mb-2 font-sans">
            Deskripsi &amp; Profil Lengkap
          </h4>
          <p className="text-muted text-sm sm:text-[0.98rem] leading-relaxed">
            {place.description}
          </p>
        </div>

        {/* Detail Specifications */}
        <div className="p-4 rounded-xl bg-warm-sand/20 border border-line/70 space-y-2.5 mb-6 text-xs sm:text-sm text-ink">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-rosewood flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-ink">Alamat Lengkap:</strong>{" "}
              <span className="text-muted">{place.address}</span>
            </div>
          </div>

          {place.schedule && (
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink">Jadwal / Waktu Operasional:</strong>{" "}
                <span className="text-muted">{place.schedule}</span>
              </div>
            </div>
          )}

          {place.focus && (
            <div className="flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-indigo-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink">Fokus Layanan:</strong>{" "}
                <span className="text-muted">{place.focus}</span>
              </div>
            </div>
          )}

          {place.priceRange && (
            <div className="flex items-start gap-2.5">
              <Tag className="w-4 h-4 text-rosewood flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink">Biaya / Tarif:</strong>{" "}
                <span className="text-rosewood font-bold">{place.priceRange}</span>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-rosewood flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-ink">Kontak / Narahubung:</strong>{" "}
              <span className="text-muted">
                {place.contact.person} ({place.contact.phone})
              </span>
            </div>
          </div>
        </div>

        {/* Community Review Quote */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/90 border border-line mb-6 relative">
          <div className="flex items-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
            <span className="text-[0.72rem] font-bold text-muted ml-1.5">
              Ulasan Teruji Para Ibu di Cipanas
            </span>
          </div>
          <blockquote className="text-xs sm:text-sm text-ink italic leading-relaxed pl-3 border-l-2 border-rosewood/60">
            &ldquo;{place.review.text}&rdquo;
          </blockquote>
          <p className="text-[0.72rem] font-bold text-rosewood text-right mt-2">
            — {place.review.author}
          </p>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-[4px] border border-line text-xs font-semibold text-ink hover:bg-warm-sand/40 transition-colors cursor-pointer text-center"
          >
            Tutup Dialog
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs sm:text-sm font-bold shadow-xs hover:bg-[#9f5d54] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>
              {isDirect
                ? `Hubungi Langsung (${place.contact.person})`
                : "Hubungi & Minta Kontak via WA Umma"}
            </span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
}
