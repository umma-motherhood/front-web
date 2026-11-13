import Image from "next/image";
import logoImg from "../../public/images/logo.png";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, ArrowDown, Heart } from "lucide-react";

export function Hero() {
  return (
    <section
      id="beranda"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-[clamp(50px,8vw,100px)] pb-20 md:pb-24"
    >
      {/* Decorative organic background shape */}
      <div
        className="absolute top-[8%] -right-24 md:-right-16 lg:-right-6 w-[320px] h-[320px] md:w-[440px] md:h-[440px] border border-rosewood/25 rounded-[48%_52%_42%_58%] -rotate-[24deg] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          <div>
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2.5 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
              {siteConfig.hero?.tagline || siteConfig.tagline}
            </span>

            {/* Heading */}
            <h1
              id="hero-title"
              className="my-5 text-[clamp(2.5rem,6vw,4.5rem)] font-normal font-serif leading-[1.08] tracking-[-0.02em] text-ink"
            >
              {siteConfig.hero?.headingPrefix || "Selamat Datang di"}
              <br />
              <span className="font-semibold text-rosewood">
                {siteConfig.hero?.headingHighlight || "Umma Motherhood"}
              </span>{" "}
              {siteConfig.hero?.headingSuffix || "Cipanas"}
            </h1>

            {/* Paragraph */}
            <p className="max-w-[62ch] text-muted text-[1.05rem] md:text-[1.12rem] leading-[1.75]">
              {siteConfig.hero?.description || siteConfig.description}{" "}
              {siteConfig.hero?.descriptionExtended ||
                "Kami percaya bahwa perjalanan mengasuh anak tidak seharusnya dilalui sendirian. Komunitas ini hadir dengan tujuan memfasilitasi edukasi parenting berkualitas, menghubungkan ibu dengan para profesional, dan menggerakkan roda ekonomi lokal melalui kolaborasi anggota."}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-8">
              <a
                href={siteConfig.links.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 border border-rosewood rounded-[4px] bg-rosewood text-[#fffaf2] text-[0.95rem] font-bold no-underline transition-all duration-200 hover:bg-[#9f5d54] hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                <span>{siteConfig.hero?.ctaGroupText || "Gabung Grup WhatsApp"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#direktori"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 border border-line rounded-[4px] bg-transparent text-ink text-[0.95rem] font-bold no-underline transition-all duration-200 hover:bg-warm-sand/40 hover:-translate-y-0.5"
              >
                <span>{siteConfig.hero?.ctaDirectoryText || "Lihat Direktori Cipanas"}</span>
                <ArrowDown className="w-4 h-4 text-rosewood" />
              </a>
            </div>
          </div>

          {/* Official Brand Identity Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] p-7 md:p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-line/80 shadow-xl shadow-warm-sand/30">
              {/* Soft decorative glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 bg-dusty-peach/30 rounded-full blur-2xl -z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-warm-sand/40 rounded-full blur-2xl -z-10"
                aria-hidden="true"
              />

              <div className="flex flex-col items-center text-center">
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 mb-4">
                  <Image
                    src={logoImg}
                    alt="Logo Resmi Umma Motherhood Cipanas"
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>

                <div className="w-full pt-4 border-t border-line/60 flex items-center justify-between text-xs text-muted">
                  <span className="flex items-center gap-1 font-medium">
                    <Heart className="w-3.5 h-3.5 text-rosewood fill-rosewood" />
                    Ruang Aman Para Ibu
                  </span>
                  <span className="px-2 py-0.5 rounded bg-warm-sand/50 text-ink font-semibold">
                    Est. 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
