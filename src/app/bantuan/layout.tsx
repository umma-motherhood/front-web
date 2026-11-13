import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Bantuan & Darurat Ibu Cipanas - Umma Motherhood",
  description:
    "Daftar lengkap kontak jasa lokal dan bantuan harian untuk ibu di Cipanas: ojek panggilan, ART, babysitter, jastip belanja, pijat panggilan, guru les SD, dan servis elektronik.",
  alternates: {
    canonical: "https://ummamotherhood.my.id/bantuan/",
  },
  openGraph: {
    title: "Kontak Bantuan & Darurat Ibu Cipanas - Umma Motherhood",
    description:
      "Cari dan hubungi layanan bantuan harian terverifikasi di area Cipanas dan sekitarnya: ojek, ART, jastip, pijat panggilan, guru les, hingga servis elektronik.",
    url: "https://ummamotherhood.my.id/bantuan/",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kontak Bantuan & Darurat Ibu Cipanas - Umma Motherhood",
      },
    ],
  },
};

export default function BantuanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
