"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  X,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  MessageCircle,
  Calendar,
  User,
  BookOpen,
  ExternalLink,
  Inbox,
} from "lucide-react";
import { ClassEventInfo, ClassArticleInfo } from "@/config/site";

export interface ModalData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  note: string;
  whatsappMessage: string;
  isEmpty?: boolean;
  classEvent?: ClassEventInfo;
  articles?: ClassArticleInfo[];
  archiveUrl?: string;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/65 modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-paper border border-line rounded-xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto modal-dialog"
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
            {data.isEmpty ? "Segera Hadir" : "Terverifikasi Komunitas"}
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

        {/* Event Kelas Khusus (Nomor 01) */}
        {data.classEvent && (
          <div className="mb-6 p-4 sm:p-5 rounded-xl border border-rosewood/30 bg-warm-sand/25">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rosewood text-[#fffaf2]">
                Jadwal Kelas Terdekat
              </span>
              <span className="text-xs font-semibold text-rosewood">
                Materi: {data.classEvent.materiStatus}
              </span>
            </div>
            <h4 className="text-lg font-serif font-medium text-ink mb-2">
              {data.classEvent.name}
            </h4>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rosewood" />
                {data.classEvent.date}
              </span>
              <span className="inline-flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-rosewood" />
                Pengisi: {data.classEvent.speaker}
              </span>
            </div>
          </div>
        )}

        {/* Real Articles List (Nomor 03) */}
        {data.articles && data.articles.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-wider font-sans font-bold text-ink mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-rosewood" />
              <span>Daftar Artikel Asli Anggota Komunitas:</span>
            </h4>
            <div className="space-y-3">
              {data.articles.map((art, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-line bg-paper-deep/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-rosewood/40 transition-colors"
                >
                  <div>
                    <h5 className="text-sm font-semibold text-ink leading-snug">
                      {art.title}
                    </h5>
                    <p className="text-xs text-muted mt-1">
                      {art.date} • Ditulis oleh {art.author}
                    </p>
                    {art.excerpt && (
                      <p className="text-xs text-muted/90 mt-1 line-clamp-2">
                        {art.excerpt}
                      </p>
                    )}
                  </div>
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[4px] bg-rosewood text-[#fffaf2] text-xs font-bold hover:bg-[#9f5d54] transition-colors self-start sm:self-center flex-shrink-0"
                  >
                    <span>Baca Artikel</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>

            {data.archiveUrl && (
              <div className="mt-3 text-right">
                <a
                  href={data.archiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-rosewood hover:underline"
                >
                  <span>Jelajahi Seluruh Arsip Journal Umma</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* State Kosong (Nomor 02) */}
        {data.isEmpty && (
          <div className="mb-6 p-6 rounded-xl border border-dashed border-line bg-warm-sand/20 text-center">
            <div className="w-10 h-10 rounded-full bg-rosewood/10 text-rosewood flex items-center justify-center mx-auto mb-2">
              <Inbox className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-serif font-medium text-ink mb-1">
              Arsip Tanya-Jawab Masih Kosong
            </h4>
            <p className="text-xs text-muted max-w-[42ch] mx-auto leading-relaxed">
              Sesi tanya jawab WhatsApp sedang dirangkum oleh tim komunitas agar
              wawasan berharga tidak tenggelam di ruang obrolan.
            </p>
          </div>
        )}

        {/* Regular Bullet Points */}
        {data.items && data.items.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-wider font-sans font-bold text-ink mb-3">
              Fokus Materi &amp; Pembahasan:
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
        )}

        {/* Note Box */}
        <div className="p-3.5 rounded-lg bg-warm-sand/35 border border-line mb-6 text-xs text-muted leading-relaxed">
          <span className="font-semibold text-ink">Catatan: </span>
          {data.note}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 pt-2">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <Link
              href="/artikel/"
              onClick={onClose}
              className="flex-1 inline-flex min-h-[44px] items-center justify-center gap-1.5 px-4 py-2 border border-rosewood text-rosewood rounded-[4px] text-xs sm:text-sm font-bold hover:bg-rosewood hover:text-[#fffaf2] transition-colors"
            >
              <span>Buka Halaman Artikel &amp; Materi Komunitas</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex min-h-[44px] items-center justify-center gap-1.5 px-4 py-2 bg-rosewood text-[#fffaf2] rounded-[4px] text-xs sm:text-sm font-bold shadow-sm hover:bg-[#9f5d54] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tanya via WA Umma Shierly</span>
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full inline-flex min-h-[40px] items-center justify-center px-4 py-2 border border-line rounded-[4px] text-muted text-xs font-medium hover:bg-paper-deep/60 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
