import Link from "next/link";
import { ArrowLeft, Home, Store, Compass, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f2] text-ink">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 sm:py-24">
        <div className="max-w-[620px] w-[calc(100%-40px)] mx-auto text-center px-4">
          <span className="inline-flex items-center gap-2 text-rosewood text-xs font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full bg-warm-sand/30 border border-line/60 mb-6">
            404 — Halaman Tidak Ditemukan
          </span>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-ink mb-4 tracking-tight">
            Ruang yang Dicari Belum Tersedia
          </h1>

          <p className="text-muted text-base sm:text-lg leading-relaxed mb-8">
            Halaman yang Anda tuju mungkin baru saja diperbarui, dipindahkan, atau
            tautannya salah ketik. Mari kembali ke beranda atau jelajahi layanan
            komunitas kami di bawah ini.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[4px] bg-rosewood text-[#fffaf2] text-sm font-bold shadow-xs hover:bg-[#9f5d54] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>

            <Link
              href="/umkm/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[4px] border border-line bg-paper text-ink text-sm font-bold shadow-xs hover:bg-warm-sand/30 transition-colors"
            >
              <Store className="w-4 h-4 text-rosewood" />
              <span>Katalog Lapak UMKM</span>
            </Link>

            <Link
              href="/direktori/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[4px] border border-line bg-paper text-ink text-sm font-bold shadow-xs hover:bg-warm-sand/30 transition-colors"
            >
              <Compass className="w-4 h-4 text-rosewood" />
              <span>Direktori Rekomendasi</span>
            </Link>

            <a
              href="https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20mengalami%20kendala%20saat%20mengakses%20website%20Umma%20Motherhood."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[4px] border border-line bg-paper text-ink text-sm font-bold shadow-xs hover:bg-warm-sand/30 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Bantuan via WA Umma</span>
            </a>
          </div>

          <p className="text-xs text-muted">
            Butuh info cepat? Hubungi langsung{" "}
            <a
              href="https://wa.me/6287883370039"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rosewood underline font-semibold"
            >
              Umma Shierly di 0878-8337-0039
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
