import { siteConfig } from "@/config/site";
import { ArrowUpRight, HeartHandshake } from "lucide-react";

export function SupportSection() {
  return (
    <section
      id="dukung"
      aria-labelledby="dukung-title"
      className="py-[clamp(68px,9vw,115px)] bg-paper-deep border-t border-[#cfc1ae]"
    >
      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-14 lg:gap-20 items-start">
          <div>
            <span className="inline-flex items-center gap-2.5 text-moss text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
              06 / Ikut mengambil bagian
            </span>
            <h2
              id="dukung-title"
              className="mt-3.5 text-[clamp(2.2rem,5vw,3.6rem)] font-serif font-normal text-ink tracking-tight"
            >
              Dukungan &amp; Kolaborasi
            </h2>
            <p className="mt-4 text-muted text-[1.05rem] leading-relaxed">
              Komunitas ini bertumbuh dari ketulusan dan keterlibatan bersama.
              Setiap bantuan dan keikutsertaan Anda memberi dampak besar bagi para ibu di Cipanas.
            </p>
          </div>

          <div>
            <div className="border-t border-[#bbae9c]">
              {siteConfig.supportItems.map((item) => (
                <article
                  key={item.title}
                  className="py-6 border-b border-[#bbae9c]"
                >
                  <h3 className="text-ink font-serif text-[1.45rem] font-medium leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-muted text-[1rem] leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-8">
              <a
                href={siteConfig.links.volunteerForm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 border border-clay rounded-[3px] bg-clay text-[#fffaf2] text-[0.95rem] font-bold no-underline transition-all duration-200 hover:bg-[#87371f] hover:-translate-y-0.5"
              >
                <span>Daftar Jadi Relawan</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.donationForm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 border border-line rounded-[3px] bg-transparent text-ink text-[0.95rem] font-bold no-underline transition-all duration-200 hover:bg-paper hover:-translate-y-0.5"
              >
                <span>Donasi / Jadi Pengisi Kelas</span>
                <HeartHandshake className="w-4 h-4 text-clay" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
