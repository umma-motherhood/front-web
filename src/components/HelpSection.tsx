import { siteConfig } from "@/config/site";
import { Bike, Sparkles, Baby, Home, MessageSquare } from "lucide-react";

export function HelpSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case "bike":
        return <Bike className="w-6 h-6 text-moss" />;
      case "sparkles":
        return <Sparkles className="w-6 h-6 text-moss" />;
      case "baby":
        return <Baby className="w-6 h-6 text-moss" />;
      case "home":
        return <Home className="w-6 h-6 text-moss" />;
      default:
        return <MessageSquare className="w-6 h-6 text-moss" />;
    }
  };

  return (
    <section
      id="bantuan"
      aria-labelledby="bantuan-title"
      className="py-[clamp(68px,9vw,115px)]"
    >
      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,0.75fr)_minmax(0,1.25fr)] gap-6 md:gap-10 items-start mb-10">
          <div>
            <span className="inline-flex items-center gap-2.5 text-moss text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
              03 / Saling bantu
            </span>
            <h2
              id="bantuan-title"
              className="mt-3.5 text-[clamp(2.2rem,5vw,3.6rem)] font-serif font-normal text-ink tracking-tight"
            >
              Kontak Bantuan &amp; Darurat Ibu
            </h2>
          </div>
          <p className="text-muted text-[1.05rem] leading-relaxed md:mt-11">
            Kumpulan kontak jasa lokal terverifikasi untuk membantu meringankan beban operasional harian di rumah:
          </p>
        </div>

        <div className="border-t border-line">
          {siteConfig.helpContacts.map((contact) => (
            <div
              key={contact.id}
              className="grid grid-cols-[40px_1fr] sm:grid-cols-[48px_1fr_auto] items-center gap-4 sm:gap-6 py-4 border-b border-line hover:bg-paper-deep/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-paper-deep/60 flex items-center justify-center">
                {getIcon(contact.icon)}
              </div>
              <p className="text-ink font-medium text-[1rem] leading-relaxed">
                {contact.title}
              </p>
              <div className="col-start-2 sm:col-start-3">
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-4 py-2 inline-flex items-center gap-2 border border-line rounded-[3px] bg-paper text-clay text-[0.85rem] font-bold tracking-wide hover:bg-paper-deep hover:border-clay transition-all shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Hubungi via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
