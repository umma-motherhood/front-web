import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function MarketSection() {
  return (
    <section
      id="lapak"
      aria-labelledby="lapak-title"
      className="relative overflow-hidden bg-moss text-[#fff9ee] py-[clamp(72px,10vw,125px)]"
    >
      {/* Huge decorative watermark */}
      <span
        className="absolute -right-6 -bottom-16 sm:-bottom-24 font-serif text-[clamp(10rem,28vw,26rem)] font-bold text-white/[0.05] select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        UMMA
      </span>

      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(240px,0.7fr)] items-end gap-10 lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2.5 text-[#e2ded2] text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
              04 / Karya anggota
            </span>
            <h2
              id="lapak-title"
              className="mt-3.5 mb-4 text-[clamp(2.3rem,5vw,3.8rem)] font-serif font-normal text-white tracking-tight max-w-[650px]"
            >
              Lapak UMKM Umma
            </h2>
            <p className="text-[#e2ded2] text-[1.05rem] md:text-[1.1rem] leading-relaxed max-w-[57ch]">
              Etalase bisnis lokal milik para ibu di Umma Motherhood Cipanas. Mulai dari pakaian bayi, makanan, hingga jasa.
              Mari bertransaksi di sini untuk saling mendukung kemandirian finansial dan menghidupi ekonomi komunitas kita sendiri.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:justify-end gap-3.5">
            <a
              href={siteConfig.links.umkmCatalog}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 border border-paper rounded-[3px] bg-paper text-ink text-[0.95rem] font-bold no-underline transition-all duration-200 hover:bg-[#fffaf2] hover:-translate-y-0.5"
            >
              <span>Lihat Lapak</span>
              <ArrowUpRight className="w-4 h-4 text-clay" />
            </a>
            <a
              href={siteConfig.links.umkmRegister}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 border border-[#d8d1c1] rounded-[3px] bg-transparent text-[#fff9ee] text-[0.95rem] font-bold no-underline transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
            >
              <span>Daftarkan Usahamu</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
