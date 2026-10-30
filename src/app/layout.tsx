import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Umma Motherhood Cipanas — Bertumbuh Bersama",
  description:
    "Ruang aman dan suportif bagi para ibu di Cipanas dan sekitarnya untuk saling merangkul, bertumbuh, dan berdaya bersama.",
  keywords: [
    "Umma Motherhood Cipanas",
    "Komunitas Ibu Cipanas",
    "Parenting Cipanas",
    "Direktori Cipanas",
    "Cipanas Cianjur",
  ],
  authors: [{ name: "Umma Motherhood Cipanas" }],
  openGraph: {
    title: "Umma Motherhood Cipanas — Bertumbuh Bersama",
    description:
      "Ruang aman dan suportif bagi para ibu di area Cipanas dan sekitarnya.",
    url: "https://ummamotherhood.my.id",
    siteName: "Umma Motherhood Cipanas",
    locale: "id_ID",
    type: "website",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${lora.variable} ${caveat.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-paper text-ink font-serif antialiased selection:bg-rosewood selection:text-white">
        {children}
      </body>
    </html>
  );
}
