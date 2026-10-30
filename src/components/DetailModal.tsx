"use client";

import { useEffect } from "react";
import { X, CheckCircle, ArrowUpRight, Sparkles, MessageCircle } from "lucide-react";

export interface ModalData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  note: string;
  whatsappMessage: string;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
}

export function DetailModal({ isOpen, onClose, data }: DetailModalProps) {
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

  const whatsappUrl = `https://wa.me/6287883370039?text=${encodeURIComponent(
    data.whatsappMessage
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-paper border border-line rounded-xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-paper-deep/60 flex items-center justify-center text-muted hover:text-ink hover:bg-paper-deep transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-rosewood font-serif text-xl sm:text-2xl font-bold">
            {data.badge}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rosewood/10 text-rosewood border border-rosewood/20">
            <Sparkles className="w-3 h-3" />
            Sedang Dikurasi
          </span>
        </div>

        <h3
          id="modal-title"
          className="text-2xl sm:text-3xl font-serif font-normal text-ink leading-tight"
        >
          {data.title}
        </h3>
        <p className="text-sm font-medium text-rosewood mt-1 mb-4">
          {data.subtitle}
        </p>

        <p className="text-muted text-[0.98rem] leading-relaxed mb-6">
          {data.description}
        </p>

        {/* Content points */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider font-sans font-bold text-ink mb-3">
            Topik &amp; Informasi yang Akan Hadir:
          </h4>
          <ul className="space-y-2.5">
            {data.items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm text-ink/90 leading-snug"
              >
                <CheckCircle className="w-4 h-4 text-rosewood flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Note Box */}
        <div className="p-3.5 rounded-lg bg-warm-sand/35 border border-line mb-6 text-xs text-muted leading-relaxed">
          <span className="font-semibold text-ink">Catatan: </span>
          {data.note}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex min-h-[46px] items-center justify-center gap-2 px-5 py-2.5 bg-rosewood text-[#fffaf2] rounded-[4px] text-sm font-bold shadow-sm hover:bg-[#9f5d54] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tanya Umma Shierly via WhatsApp</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[46px] items-center justify-center px-5 py-2.5 border border-line rounded-[4px] text-ink text-sm font-medium hover:bg-paper-deep/60 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
