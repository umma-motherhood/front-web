import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function DirectorySection() {
  return (
    <section
      id="direktori"
      aria-labelledby="direktori-title"
      className="py-[clamp(68px,9vw,115px)] bg-warm-sand/35 border-y border-line"
    >
      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,0.75fr)_minmax(0,1.25fr)] md:items-end gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2.5 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
              02 / Indeks lokal
            </span>
            <h2
              id="direktori-title"
              className="mt-3.5 text-[clamp(2.2rem,5vw,3.6rem)] font-serif font-normal text-ink tracking-tight"
            >
              Direktori Rekomendasi Cipanas
            </h2>
          </div>
          <p className="text-muted text-[1.05rem] leading-relaxed md:mb-1">
            Pusat informasi hiper-lokal hasil kurasi dan pengalaman nyata para ibu.
          </p>
        </div>

        <div className="border-t border-line">
          {siteConfig.directory.map((item) => (
            <a
              key={item.code}
              href={item.href}
              className="group grid grid-cols-[36px_1fr_32px] sm:grid-cols-[48px_1fr_40px] md:grid-cols-[56px_minmax(200px,0.85fr)_minmax(0,1.4fr)_44px] items-center gap-4 sm:gap-6 py-6 md:min-h-[112px] border-b border-line no-underline transition-colors hover:bg-black/[0.02]"
            >
              <span className="text-rosewood font-serif text-[1.2rem] font-semibold">
                {item.code}
              </span>
              <h3 className="text-ink font-serif text-[clamp(1.2rem,2.2vw,1.55rem)] font-medium leading-snug group-hover:text-rosewood transition-colors">
                {item.title}
              </h3>
              <p className="col-start-2 col-span-1 md:col-start-3 md:col-span-1 text-muted text-[0.98rem] leading-relaxed">
                {item.description}
              </p>
              <div className="flex justify-end">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-rosewood group-hover:translate-x-1 transition-all duration-200">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
