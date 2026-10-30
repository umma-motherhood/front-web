import Image from "next/image";
import { siteConfig } from "@/config/site";

export function FounderSection() {
  return (
    <section
      id="tentang"
      aria-labelledby="tentang-title"
      className="py-[clamp(68px,9vw,120px)]"
    >
      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(260px,0.85fr)_minmax(0,1.15fr)] gap-8 md:gap-14 lg:gap-20 items-center">
          {/* Photo Slot / Community Visual */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-white/80 p-6 md:p-8 shadow-lg shadow-warm-sand/20 flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-paper-deep/60 shadow-inner mb-4">
              <Image
                src="/images/logo-badge.jpg"
                alt="Umma Motherhood Cipanas Badge"
                fill
                className="object-cover"
              />
            </div>
            <span className="px-3 py-1 bg-warm-sand/50 rounded-full text-xs font-semibold text-ink">
              Komunitas Ibu Cipanas &amp; Sekitarnya
            </span>
            <p className="text-xs text-muted mt-2">
              (Dapat diganti dengan foto founder di folder public)
            </p>
          </div>

          {/* Letter / Story */}
          <div>
            <span className="inline-flex items-center gap-2.5 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
              05 / Sepucuk surat
            </span>
            <h2
              id="tentang-title"
              className="mt-3.5 mb-6 text-[clamp(2.2rem,5vw,3.6rem)] font-serif font-normal text-ink tracking-tight"
            >
              Tentang Founder
            </h2>
            <blockquote className="max-w-[55ch] text-muted text-[clamp(1.05rem,1.8vw,1.35rem)] font-serif leading-[1.65]">
              &ldquo;{siteConfig.founder.story}&rdquo;
            </blockquote>

            {/* Signature */}
            <div className="mt-6">
              <p className="text-rosewood font-signature text-4xl sm:text-5xl select-none">
                {siteConfig.founder.name}
              </p>
              <p className="text-muted text-xs uppercase tracking-wider font-sans font-semibold mt-1">
                {siteConfig.founder.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
