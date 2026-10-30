import type { Metadata, Viewport } from "next";
import { Lora, Caveat } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-signature",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#fbf7f2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ummamotherhood.my.id"),
  title: {
    default: "Umma Motherhood Cipanas — Ruang Tumbuh & Komunitas Ibu Cipanas",
    template: "%s | Umma Motherhood Cipanas",
  },
  description:
    "Komunitas dan support system aman bagi para ibu di Cipanas dan sekitarnya. Temukan kelas edukasi parenting, arsip tanya jawab, direktori dokter spesialis anak, bidan, kegiatan edukasi, kontak bantuan darurat, dan lapak UMKM lokal.",
  keywords: [
    "Umma Motherhood Cipanas",
    "Komunitas Ibu Cipanas",
    "Parenting Cipanas",
    "Direktori Rekomendasi Cipanas",
    "Dokter Anak Cipanas",
    "Dokter Nina Apotek Panca Farma",
    "Dokter Abdurahman Apotek Ikana",
    "Bidan Cipanas",
    "Bidan Silvia Meilia Tarigu",
    "Daycare Cipanas",
    "Pop Up Class Cipanas",
    "Artima Edu",
    "Tiny Roots Cipanas",
    "Batutta Cipanas",
    "Push Bike Cipanas",
    "Dojo Katana Karate Kids Cipanas",
    "Cipanas Archery",
    "UMKM Cipanas",
    "Toko Bayi Cipanas",
    "Jan Baby Store Cipanas",
    "Shierenity Scribe",
    "Dapur Sangkilang Cipanas",
    "Ojek Perempuan Cipanas",
    "Jasa Bersih Cipanas",
    "Nanny Cipanas",
    "ART Cipanas",
    "Cianjur",
    "Jawa Barat",
  ],
  authors: [
    { name: "Umma Shierly", url: "https://www.instagram.com/lindashirlyv/" },
    { name: "Umma Motherhood Cipanas", url: "https://ummamotherhood.my.id" },
  ],
  creator: "Umma Shierly",
  publisher: "Umma Motherhood Cipanas",
  applicationName: "Umma Motherhood Cipanas",
  alternates: {
    canonical: "https://ummamotherhood.my.id",
  },
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
  openGraph: {
    title: "Umma Motherhood Cipanas — Ruang Tumbuh Bersama Sesama Ibu",
    description:
      "Ruang aman dan suportif bagi para ibu di Cipanas: edukasi parenting berbobot, direktori dokter anak & bidan tepercaya, kontak bantuan harian, serta lapak UMKM.",
    url: "https://ummamotherhood.my.id",
    siteName: "Umma Motherhood Cipanas",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Umma Motherhood Cipanas - Ruang Tumbuh Bersama Komunitas Ibu Cipanas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umma Motherhood Cipanas — Ruang Tumbuh & Komunitas Ibu Cipanas",
    description:
      "Support system nyata bagi para ibu di Cipanas: edukasi parenting, direktori lokal terkurasi, dan kolaborasi ekonomi anggota.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "Community & Parenting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ummamotherhood.my.id/#website",
        "url": "https://ummamotherhood.my.id",
        "name": "Umma Motherhood Cipanas",
        "description":
          "Komunitas dan support system bagi para ibu di area Cipanas dan sekitarnya.",
        "publisher": {
          "@id": "https://ummamotherhood.my.id/#organization",
        },
        "inLanguage": "id-ID",
      },
      {
        "@type": "Organization",
        "@id": "https://ummamotherhood.my.id/#organization",
        "name": "Umma Motherhood Cipanas",
        "url": "https://ummamotherhood.my.id",
        "logo": "https://ummamotherhood.my.id/images/logo.png",
        "image": "https://ummamotherhood.my.id/images/og-image.jpg",
        "description":
          "Komunitas aman dan suportif bagi para ibu di Cipanas untuk saling merangkul, belajar parenting, dan berdaya bersama.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Cipanas",
          "addressRegion": "Cianjur, Jawa Barat",
          "addressCountry": "ID",
        },
        "founder": {
          "@type": "Person",
          "name": "Shierly",
          "jobTitle": "Founder Umma Motherhood Cipanas",
          "sameAs": "https://www.instagram.com/lindashirlyv/",
        },
        "sameAs": [
          "https://www.instagram.com/lindashirlyv/",
          "https://chat.whatsapp.com/FTkoEa3rXxnHK9gy7wLPYK?s=cl&p=a&iam=2",
        ],
      },
      {
        "@type": "ItemList",
        "@id": "https://ummamotherhood.my.id/#direktori",
        "name": "Direktori Rekomendasi Cipanas",
        "description":
          "Daftar rekomendasi dokter anak, bidan, fasilitas edukasi, dan kebutuhan harian keluarga di Cipanas.",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Dr. Nina Apotek Panca Farma - Dokter Spesialis Anak Cipanas",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Dr. Abdurahman Apotek Ikana - Dokter Spesialis Anak Cipanas",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Bidan Silvia Meilia A.Md di Praktek Bidan Mia Tarigu",
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Artima Edu - Kegiatan Belajar Coding & Bahasa Inggris Anak Online",
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Tiny Roots - Kegiatan Pop Up Class Sensori Anak",
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Batutta - Komunitas Belajar Informal Anak",
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "Push Bike Cipanas - Komunitas Sepeda Tanpa Pedal Balita",
          },
          {
            "@type": "ListItem",
            "position": 8,
            "name": "Jan Baby Store Cipanas - Toko Perlengkapan Bayi & Anak",
          },
          {
            "@type": "ListItem",
            "position": 9,
            "name": "Shierenity Scribe - Distributor Busana Bayi & Anak",
          },
          {
            "@type": "ListItem",
            "position": 10,
            "name": "Dapur Sangkilang - Katering Keluarga Sehat Cipanas",
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="id"
      className={`${lora.variable} ${caveat.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-paper text-ink font-serif antialiased selection:bg-dusty-peach/30 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
