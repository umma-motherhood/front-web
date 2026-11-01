"use client";

import { useEffect, useState } from "react";
import {
  X,
  ArrowUpRight,
  MessageCircle,
  MapPin,
  Tag,
  Phone,
  Info,
  CheckCircle2,
} from "lucide-react";
import { UmkmItem } from "@/config/site";

interface UmkmDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: UmkmItem | null;
}

export function UmkmDetailModal({ isOpen, onClose, item }: UmkmDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [item]);

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

  const cleanDigits = (item.phone || "").replace(/[^0-9]/g, "");
  const isDirect = cleanDigits.startsWith("08");
  const phoneTarget = isDirect ? `62${cleanDigits.slice(1)}` : "6287883370039";
  const itemWaUrl = `https://wa.me/${phoneTarget}?text=${encodeURIComponent(
    item.waMessage
  )}`;

  const currentImage =
    item.images && item.images.length > 0 ? item.images[activeImageIndex] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/70 backdrop-blur-xs modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-paper border border-line rounded-2xl shadow-2xl p-5 sm:p-8 max-h-[92vh] overflow-y-auto modal-dialog"
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
            {item.categoryLabel}
          </span>
          <span className="text-xs text-muted">
            Pemilik Usaha: <strong className="text-ink">{item.owner}</strong>
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-normal text-ink leading-tight">
          {item.name}
        </h3>
        {item.tagline && (
          <p className="text-sm font-medium text-rosewood italic mt-1 mb-4">
            &ldquo;{item.tagline}&rdquo;
          </p>
        )}

        {/* Photo Gallery in Dialog */}
        {item.images && item.images.length > 0 && currentImage && (
          <div className="mb-6 space-y-2.5">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-warm-sand/40 border border-line">
              <img
                src={currentImage}
                alt={`${item.name} - foto ${activeImageIndex + 1}`}
                className="w-full h-full object-contain bg-black/5"
              />
              <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-ink/75 text-white text-xs font-medium backdrop-blur-xs">
                Foto {activeImageIndex + 1} dari {item.images.length}
              </span>
            </div>

            {item.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-rosewood shadow-sm scale-105"
                        : "border-line opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Full Description */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider font-bold text-muted mb-2 font-sans">
            Tentang Usaha &amp; Layanan
          </h4>
          <p className="text-muted text-sm sm:text-[0.98rem] leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Order Notes / Cara Pembelian */}
        {item.orderNotes && item.orderNotes.length > 0 && (
          <div className="p-4 rounded-xl bg-warm-sand/35 border border-rosewood/30 mb-6 space-y-2">
            <div className="flex items-center gap-2 text-rosewood">
              <Info className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-sans">
                Informasi Pemesanan &amp; Pengiriman
              </h4>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-ink/90">
              {item.orderNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rosewood flex-shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Product Catalog List */}
        {item.products && item.products.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-wider font-bold text-muted mb-3 font-sans">
              Daftar Menu &amp; Produk Pilihan ({item.products.length} Menu)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {item.products.map((prod, pIdx) => (
                <div
                  key={pIdx}
                  className="p-3.5 rounded-xl bg-white/90 border border-line shadow-2xs hover:border-rosewood/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <strong className="text-sm font-semibold text-ink leading-snug">
                      {prod.name}
                    </strong>
                    {prod.price && (
                      <span className="px-2 py-0.5 rounded-md bg-rosewood/10 text-rosewood text-[0.72rem] font-bold whitespace-nowrap">
                        {prod.price}
                      </span>
                    )}
                  </div>
                  {prod.desc && (
                    <p className="text-xs text-muted leading-relaxed">
                      {prod.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location & Price Summary */}
        <div className="p-4 rounded-xl bg-warm-sand/20 border border-line/70 space-y-2 mb-6 text-xs sm:text-sm text-ink">
          <div className="flex items-start gap-2">
            <Tag className="w-4 h-4 text-rosewood flex-shrink-0 mt-0.5" />
            <div>
              <strong>Rentang Harga:</strong>{" "}
              <span className="text-rosewood font-bold">{item.priceRange}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-rosewood flex-shrink-0 mt-0.5" />
            <div>
              <strong>Lokasi / Alamat:</strong>{" "}
              <span className="text-muted">{item.location}</span>
            </div>
          </div>
          {item.phone && (
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-rosewood flex-shrink-0 mt-0.5" />
              <div>
                <strong>Kontak:</strong>{" "}
                <span className="text-muted">
                  {item.owner} ({item.phone})
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-[4px] border border-line text-xs font-semibold text-ink hover:bg-warm-sand/40 transition-colors cursor-pointer text-center"
          >
            Tutup Dialog
          </button>

          <a
            href={itemWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs sm:text-sm font-bold shadow-xs hover:bg-[#9f5d54] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>
              {isDirect
                ? `Pesan via WhatsApp (${item.owner})`
                : "Hubungi via WA Umma"}
            </span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
}
