import { siteConfig } from "@/config/site";
import { ArrowUpRight, HeartHandshake } from "lucide-react";

export function SupportSection() {
  const volunteers = siteConfig.volunteers || [];

  return (
    <section
      id="dukung"
      aria-labelledby="dukung-title"
      className="py-[clamp(68px,9vw,115px)] bg-warm-sand/35 border-t border-line"
    >
      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-14 lg:gap-20 items-start">
          <div>
            <span className="inline-flex items-center gap-2.5 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
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
            <div className="border-t border-line">
              {siteConfig.supportItems.map((item) => (
                <article
                  key={item.title}
                  className="py-6 border-b border-line"
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
                href={siteConfig.links.volunteerWa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 border border-rosewood rounded-[4px] bg-rosewood text-[#fffaf2] text-[0.95rem] font-bold no-underline transition-all duration-200 hover:bg-[#9f5d54] hover:-translate-y-0.5 shadow-sm"
              >
                <span>Daftar Jadi Relawan</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.donationWa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 border border-line rounded-[4px] bg-paper text-ink text-[0.95rem] font-bold no-underline transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
              >
                <span>Donasi / Jadi Pengisi Kelas</span>
                <HeartHandshake className="w-4 h-4 text-rosewood" />
              </a>
            </div>
          </div>
        </div>

        {/* Daftar Relawan Komunitas (Lingkaran / Circle Avatar Required) */}
        {volunteers.length > 0 && (
          <div className="mt-14 pt-12 border-t border-line">
            <div className="max-w-2xl mb-8">
              <span className="inline-flex items-center gap-2 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase">
                Para Penggerak
              </span>
              <h3 className="mt-1.5 text-2xl sm:text-3xl font-serif text-ink">
                Relawan Umma Motherhood Cipanas
              </h3>
              <p className="mt-2 text-muted text-[0.95rem] leading-relaxed">
                Para ibu berdedikasi yang meluangkan waktu dan tenaganya untuk menggerakkan berbagai kegiatan serta layanan komunitas di Cipanas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteers.map((vol) => {
                const igUrl = vol.instagram
                  ? vol.instagram.startsWith("http")
                    ? vol.instagram
                    : `https://instagram.com/${vol.instagram.replace("@", "")}`
                  : null;

                return (
                  <div
                    key={vol.id}
                    className="p-6 rounded-2xl bg-paper border border-line flex flex-col items-center text-center transition-all duration-200 hover:border-rosewood/40 hover:shadow-sm"
                  >
                    {/* Foto Relawan Wajib Berbentuk Lingkaran / Circle */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-rosewood/40 shadow-sm mb-4 bg-warm-sand/30 shrink-0">
                      <img
                        src={vol.photoUrl || "/images/logo.png"}
                        alt={`Foto relawan ${vol.name}`}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>

                    <h4 className="text-ink font-serif text-xl font-semibold leading-snug">
                      {vol.name}
                    </h4>

                    <span className="mt-1 inline-block text-rosewood text-xs font-bold uppercase tracking-wider">
                      {vol.role}
                    </span>

                    {vol.quote && (
                      <p className="mt-3 text-muted text-sm leading-relaxed italic">
                        &ldquo;{vol.quote}&rdquo;
                      </p>
                    )}

                    {igUrl && (
                      <a
                        href={igUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted hover:text-rosewood font-medium"
                      >
                        <span>Instagram Profil</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
