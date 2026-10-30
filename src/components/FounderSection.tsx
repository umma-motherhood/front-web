import { siteConfig } from "@/config/site";
import { Heart } from "lucide-react";

export function FounderSection() {
  return (
    <section
      id="tentang"
      aria-labelledby="tentang-title"
      className="py-[clamp(68px,9vw,120px)]"
    >
      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(240px,0.85fr)_minmax(0,1.15fr)] gap-8 md:gap-14 lg:gap-20 items-center">
          {/* Photo Slot */}
          <div
            className="pattern-stripes min-h-[280px] md:min-h-[380px] p-6 border border-line rounded-[3px] flex flex-col items-center justify-center text-center text-muted"
            role="img"
            aria-label="Placeholder foto founder Umma Motherhood Cipanas"
          >
            <div className="w-12 h-12 rounded-full bg-paper border border-line flex items-center justify-center mb-3 text-clay">
              <Heart className="w-5 h-5 fill-clay/20" />
            </div>
            <span className="max-w-[240px] px-3 py-2 bg-paper border border-line/60 rounded text-xs font-medium text-ink shadow-2xs">
              [Foto komunitas: ganti dengan foto asli]
            </span>
            <p className="text-xs text-muted mt-2">
              (Letakkan foto di folder public)
            </p>
          </div>

          {/* Letter / Story */}
          <div>
            <span className="inline-flex items-center gap-2.5 text-moss text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
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
              <p className="text-clay font-signature text-4xl sm:text-5xl select-none">
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
