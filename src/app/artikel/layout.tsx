import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel & Ruang Berbagi Umma — Bacaan Parenting & Materi Edukasi | Umma Motherhood Cipanas",
  description:
    "Koleksi artikel asli karya ibu komunitas Umma Motherhood Cipanas, jadwal dan materi kelas profesional, serta tips praktis pengasuhan anak.",
  alternates: {
    canonical: "https://ummamotherhood.my.id/artikel/",
  },
  openGraph: {
    title: "Artikel & Ruang Berbagi Umma Motherhood Cipanas",
    description:
      "Kumpulan artikel parenting, refleksi keluarga, intisari kelas profesional, dan catatan praktis tulisan asli para ibu di Cipanas.",
    url: "https://ummamotherhood.my.id/artikel/",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Artikel & Ruang Berbagi Umma Motherhood Cipanas",
      },
    ],
  },
};

export default function ArtikelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
