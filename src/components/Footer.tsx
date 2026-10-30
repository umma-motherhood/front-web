import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#3b2820] text-[#fbf7f2] pt-12 pb-8 border-t border-[#6a4638]/40">
      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 pb-8 border-b border-[#fbf7f2]/15">
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 rounded-full bg-white/95 p-1.5 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Image
                src="/images/logo-mark.png"
                alt="Logo Umma"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <a
                href="#beranda"
                className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#fbf7f2] hover:text-white transition-colors"
              >
                {siteConfig.name}
              </a>
              <p className="mt-0.5 text-[#e2d2bf]/80 text-sm">
                {siteConfig.domain}
              </p>
            </div>
          </div>

          <nav
            className="flex flex-wrap items-center gap-6"
            aria-label="Tautan komunitas"
          >
            <a
              href={siteConfig.links.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#fbf7f2] hover:text-white underline underline-offset-4 text-sm font-medium transition-colors"
            >
              <span>Grup WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#fbf7f2] hover:text-white underline underline-offset-4 text-sm font-medium transition-colors"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </nav>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#e2d2bf]/70 text-xs">
          <p>© 2024–{new Date().getFullYear()} Umma Motherhood Cipanas. Hak Cipta Dilindungi.</p>
          <p className="text-right">
            Dibuat dengan Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
