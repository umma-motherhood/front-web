import { siteConfig } from "@/config/site";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="beranda"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-[clamp(60px,10vw,120px)] pb-20 md:pb-24"
    >
      {/* Decorative organic background shape */}
      <div
        className="absolute top-[10%] -right-28 md:-right-20 lg:-right-10 w-[320px] h-[320px] md:w-[420px] md:h-[420px] border border-line/60 rounded-[48%_52%_42%_58%] -rotate-[24deg] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
        <div className="max-w-[820px]">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2.5 text-moss text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
            {siteConfig.tagline}
          </span>

          {/* Heading */}
          <h1
            id="hero-title"
            className="my-5 text-[clamp(2.6rem,7vw,4.8rem)] font-normal font-serif leading-[1.08] tracking-[-0.02em] text-ink"
          >
            Selamat Datang di
            <br />
            <span className="font-semibold text-clay">Umma Motherhood</span> Cipanas
          </h1>

          {/* Paragraph */}
          <p className="max-w-[64ch] text-muted text-[1.05rem] md:text-[1.12rem] leading-[1.75]">
            {siteConfig.description} Kami percaya bahwa perjalanan mengasuh anak tidak seharusnya dilalui sendirian.
            Komunitas ini hadir dengan tujuan memfasilitasi edukasi parenting berkualitas, menghubungkan ibu dengan
            para profesional, dan menggerakkan roda ekonomi lokal melalui kolaborasi anggota. Di sini, setiap ibu bisa
            berbagi ilmu, mencari rekomendasi tepercaya, dan menemukan <em className="italic text-ink">support system</em> nyata di lingkungan terdekat.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-8">
            <a
              href={siteConfig.links.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 border border-clay rounded-[3px] bg-clay text-[#fffaf2] text-[0.95rem] font-bold no-underline transition-all duration-200 hover:bg-[#87371f] hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            >
              <span>Gabung Grup WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#direktori"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 border border-line rounded-[3px] bg-transparent text-ink text-[0.95rem] font-bold no-underline transition-all duration-200 hover:bg-paper-deep hover:-translate-y-0.5"
            >
              <span>Lihat Direktori Cipanas</span>
              <ArrowDown className="w-4 h-4 text-moss" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
