"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e2d2bf]/80 bg-[#fbf7f2]/95 backdrop-blur-sm">
      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto min-h-[76px] flex items-center justify-between gap-5">
        {/* Official Brand Logo */}
        <Link
          href="#beranda"
          className="inline-flex items-center gap-3 text-ink text-[1.15rem] leading-tight font-serif no-underline group"
          aria-label="Umma Motherhood Cipanas, ke beranda"
        >
          <div className="relative w-9 h-9 flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/images/logo-mark.png"
              alt="Umma Motherhood Cipanas Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="font-medium">
            Umma Motherhood
            <br />
            <span className="font-normal text-muted text-[0.85rem] tracking-wide">
              Cipanas
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-4 lg:gap-6"
          aria-label="Navigasi utama"
        >
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="min-h-[44px] inline-flex items-center text-muted text-[0.82rem] font-bold tracking-wide no-underline hover:text-rosewood transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.links.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[42px] px-4 py-2 inline-flex items-center gap-1.5 border border-rosewood text-rosewood rounded-[4px] text-[0.82rem] font-bold tracking-wide no-underline hover:bg-rosewood hover:text-[#fffaf2] transition-colors"
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
            className="min-h-[44px] px-3 py-2 flex items-center gap-1.5 text-ink font-bold border border-line rounded-[4px] bg-paper text-sm"
            aria-expanded={isOpen}
            aria-label="Menu navigasi"
          >
            <span>Menu</span>
            {isOpen ? (
              <X className="w-4 h-4 text-rosewood" />
            ) : (
              <Menu className="w-4 h-4 text-rosewood" />
            )}
          </button>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="absolute top-[52px] right-0 w-[min(280px,calc(100vw-32px))] p-3 border border-line bg-paper shadow-xl rounded-[4px] flex flex-col z-50">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="min-h-[44px] flex items-center border-b border-line/60 text-ink text-sm font-medium hover:text-rosewood transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={siteConfig.links.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="min-h-[44px] mt-2 flex items-center justify-center gap-1 bg-rosewood text-[#fffaf2] text-sm font-bold rounded-[4px]"
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
