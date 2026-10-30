import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direktori Rekomendasi Cipanas — Dokter Anak, Bidan & Kebutuhan Ibu",
  description:
    "Pusat informasi hiper-lokal hasil kurasi dan pengalaman nyata para ibu di Cipanas: dokter spesialis anak, bidan, fasilitas edukasi & olahraga anak, serta katering dan belanja keluarga.",
  alternates: {
    canonical: "https://ummamotherhood.my.id/direktori/",
  },
  openGraph: {
    title: "Direktori Rekomendasi Cipanas — Umma Motherhood",
    description:
      "Informasi hiper-lokal terverifikasi untuk ibu dan anak di Cipanas: alamat, jadwal, ulasan teruji, dan kontak dokter anak, bidan, sekolah, dan belanja harian.",
    url: "https://ummamotherhood.my.id/direktori/",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Direktori Rekomendasi Cipanas - Umma Motherhood",
      },
    ],
  },
};

export default function DirektoriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
