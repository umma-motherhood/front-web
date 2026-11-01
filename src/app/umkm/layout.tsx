import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Lapak UMKM Umma — Produk & Usaha Ibu Cipanas",
  description:
    "Etalase bisnis dan produk lokal milik para ibu di Umma Motherhood Cipanas: busana anak, katering keluarga, perlengkapan bayi, dan karya kriya tangan. Saling dukung kemandirian ekonomi sesama ibu di Cipanas.",
  alternates: {
    canonical: "https://ummamotherhood.my.id/umkm/",
  },
  openGraph: {
    title: "Katalog Lapak UMKM Umma — Produk & Usaha Ibu Cipanas",
    description:
      "Etalase bisnis dan produk lokal milik para ibu di Umma Motherhood Cipanas. Mari saling mendukung kemandirian finansial dan menghidupi ekonomi komunitas kita.",
    url: "https://ummamotherhood.my.id/umkm/",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Katalog Lapak UMKM Umma Motherhood Cipanas",
      },
    ],
  },
};

export default function UmkmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
