"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#5b5148]/20 bg-[#f6efe4]/95 backdrop-blur-sm">
      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto min-h-[76px] flex items-center justify-between gap-5">
        {/* Brand */}
        <Link
          href="#beranda"
          className="inline-flex items-center gap-2.5 text-ink text-[1.15rem] leading-tight font-serif no-underline group"
          aria-label="Umma Motherhood Cipanas, ke beranda"
        >
          <span
            className="w-[31px] h-[31px] grid place-items-center border border-clay rounded-[50%_50%_45%_55%] text-clay font-serif text-[1rem] transition-transform duration-200 group-hover:scale-105"
            aria-hidden="true"
          >
            U
          </span>
          <span className="font-medium">
            Umma Motherhood
            <br />
            <span className="font-normal text-muted text-[0.95rem]">Cipanas</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Navigasi utama">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="min-h-[44px] inline-flex items-center text-muted text-[0.82rem] font-bold tracking-wide no-underline hover:text-clay transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.links.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[42px] px-3.5 py-2 inline-flex items-center gap-1.5 border border-clay text-clay rounded-[3px] text-[0.82rem] font-bold tracking-wide no-underline hover:bg-clay hover:text-[#fffaf2] transition-colors"
          >
            <span>Gabung WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="min-h-[44px] px-3 py-2 flex items-center gap-1.5 text-ink font-bold border border-line rounded-[3px] bg-paper text-sm"
            aria-expanded={isOpen}
            aria-label="Menu navigasi"
          >
            <span>Menu</span>
            {isOpen ? <X className="w-4 h-4 text-clay" /> : <Menu className="w-4 h-4 text-clay" />}
          </button>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="absolute top-[52px] right-0 w-[min(280px,calc(100vw-32px))] p-3 border border-line bg-paper shadow-xl rounded-[3px] flex flex-col z-50">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="min-h-[44px] flex items-center border-b border-line/60 text-ink text-sm font-medium hover:text-clay transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={siteConfig.links.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="min-h-[44px] mt-2 flex items-center justify-center gap-1 bg-clay text-[#fffaf2] text-sm font-bold rounded-[3px]"
              >
                <span>Gabung Grup WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
