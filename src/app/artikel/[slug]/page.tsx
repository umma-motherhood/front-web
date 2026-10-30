import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig, CommunityArticle } from "@/config/site";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  User,
  Clock,
  Tag,
  ExternalLink,
  MessageCircle,
  Sparkles,
  BookOpen,
  CheckCircle,
  Quote,
  Bookmark,
  Share2,
} from "lucide-react";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function generateStaticParams() {
  return siteConfig.communityArticles.map((article) => ({
    slug: article.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = siteConfig.communityArticles.find((a) => a.id === slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | Umma Motherhood Cipanas",
    };
  }

  return {
    title: `${article.title} — Artikel & Ruang Berbagi | Umma Motherhood Cipanas`,
    description: article.excerpt,
    alternates: {
      canonical: `https://ummamotherhood.my.id/artikel/${article.id}/`,
    },
    openGraph: {
      title: `${article.title} — Umma Motherhood Cipanas`,
      description: article.excerpt,
      url: `https://ummamotherhood.my.id/artikel/${article.id}/`,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function SingleArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = siteConfig.communityArticles.find((a) => a.id === slug);

  if (!article) {
    notFound();
  }

  const otherArticles = siteConfig.communityArticles.filter(
    (a) => a.id !== article.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f2] text-ink">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Breadcrumb & Navigation */}
        <div className="border-b border-line/60 bg-[#f8f1e7]/60 py-4">
          <div className="max-w-[880px] w-[calc(100%-40px)] mx-auto flex items-center justify-between gap-4 text-xs">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-muted overflow-x-auto no-scrollbar"
            >
              <Link href="/" className="hover:text-ink whitespace-nowrap">
                Beranda
              </Link>
              <span>/</span>
              <Link href="/artikel/" className="hover:text-ink whitespace-nowrap">
                Artikel &amp; Ruang Berbagi
              </Link>
              <span>/</span>
              <span className="text-rosewood font-medium truncate max-w-[200px] sm:max-w-[320px]">
                {article.title}
              </span>
            </nav>

            <Link
              href="/artikel/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rosewood hover:underline whitespace-nowrap flex-shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Semua Artikel</span>
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <header className="pt-10 pb-8 sm:pt-14 sm:pb-10 border-b border-line/50">
          <div className="max-w-[880px] w-[calc(100%-40px)] mx-auto">
            {/* Category badge */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rosewood/10 text-rosewood border border-rosewood/20">
                <Sparkles className="w-3 h-3" />
                {article.categoryLabel}
              </span>

              {article.readingTime && (
                <span className="inline-flex items-center gap-1 text-xs text-muted font-medium bg-warm-sand/30 px-3 py-1 rounded-full border border-line/60">
                  <Clock className="w-3.5 h-3.5 text-rosewood" />
                  {article.readingTime}
                </span>
              )}

              {article.materiStatus && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rosewood bg-warm-sand/40 px-3 py-1 rounded-full border border-line/80">
                  Status: {article.materiStatus}
                </span>
              )}
            </div>

            {/* Article Title */}
            <h1 className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-serif font-normal text-ink leading-[1.18] tracking-tight mb-4">
              {article.title}
            </h1>

            {/* Subtitle if available */}
            {article.subtitle && (
              <p className="text-base sm:text-lg text-rosewood font-serif italic mb-6 leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {/* Metadata bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line/60 text-xs sm:text-sm text-muted">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-4 h-4 text-rosewood" />
                  <span className="font-semibold text-ink">
                    {article.speaker ? `Pemateri: ${article.speaker}` : article.author}
                  </span>
                  {article.authorRole && (
                    <span className="hidden sm:inline text-muted">
                      ({article.authorRole})
                    </span>
                  )}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-rosewood" />
                  <span>{article.date}</span>
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs text-muted bg-paper px-2.5 py-0.5 rounded-full border border-line"
                  >
                    <Tag className="w-2.5 h-2.5 opacity-60" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Article Content Body */}
        <div className="pt-8 sm:pt-12">
          <div className="max-w-[880px] w-[calc(100%-40px)] mx-auto">
            {/* PROMINENT OUTSIDE REFERENCE BOX */}
            {article.outsideReference && (
              <section className="mb-10 p-6 sm:p-8 rounded-2xl border-2 border-rosewood/40 bg-warm-sand/25 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-rosewood text-[#fffaf2] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Bookmark className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rosewood mb-1">
                      <span>Sumber Referensi Artikel Lengkap</span>
                    </span>

                    <h2 className="text-xl sm:text-2xl font-serif font-medium text-ink leading-snug mb-2">
                      Baca Naskah Utuh di {article.outsideReference.platform}
                    </h2>

                    <p className="text-muted text-sm sm:text-[0.96rem] leading-relaxed mb-5">
                      {article.outsideReference.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <a
                        href={article.outsideReference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3 rounded-[4px] bg-rosewood text-[#fffaf2] text-sm font-bold shadow-md hover:bg-[#9f5d54] hover:-translate-y-0.5 transition-all"
                      >
                        <span>{article.outsideReference.buttonLabel}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <span className="text-xs text-muted italic text-center sm:text-left">
                        ↗ Terhubung langsung ke situs eksternal
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Overview / Introduction Paragraphs */}
            {article.overviewParagraphs && article.overviewParagraphs.length > 0 && (
              <section className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted mb-4 pb-2 border-b border-line/60">
                  Pengantar &amp; Gambaran Isi Tulisan
                </h3>

                <div className="space-y-4 text-ink/90 text-base sm:text-lg leading-[1.75]">
                  {article.overviewParagraphs.map((para, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* Quote Callout */}
            {article.quote && (
              <blockquote className="my-10 p-6 sm:p-7 rounded-xl border-l-4 border-rosewood bg-paper shadow-xs">
                <Quote className="w-8 h-8 text-rosewood/40 mb-2" />
                <p className="text-lg sm:text-xl font-serif italic text-ink leading-relaxed">
                  &ldquo;{article.quote}&rdquo;
                </p>
                <cite className="block mt-3 text-xs font-bold uppercase tracking-wider text-muted not-italic">
                  — {article.author}
                  {article.authorRole && `, ${article.authorRole}`}
                </cite>
              </blockquote>
            )}

            {/* Key Takeaways */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <section className="mb-12 p-6 sm:p-8 rounded-2xl border border-line bg-paper">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-rosewood" />
                  <span>Poin Intisari &amp; Hikmah Pembelajaran:</span>
                </h3>

                <ul className="space-y-3">
                  {article.keyTakeaways.map((point, kIdx) => (
                    <li
                      key={kIdx}
                      className="flex items-start gap-3 text-sm sm:text-base text-ink/90 leading-relaxed"
                    >
                      <span className="w-5 h-5 rounded-full bg-rosewood/10 text-rosewood text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {kIdx + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Author Profile Card */}
            <section className="mb-12 p-6 sm:p-8 rounded-2xl border border-line bg-warm-sand/20 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="w-16 h-16 rounded-full bg-rosewood text-[#fffaf2] font-serif text-2xl font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                {article.author.charAt(0)}
              </div>

              <div className="flex-1">
                <span className="text-xs uppercase tracking-wider font-bold text-muted">
                  Tentang Penulis
                </span>
                <h4 className="text-xl font-serif font-medium text-ink mt-0.5 mb-1">
                  {article.author}
                </h4>
                <p className="text-xs text-rosewood font-medium mb-3">
                  {article.authorRole || "Kontributor Komunitas Umma Motherhood Cipanas"}
                </p>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  Pendidik dan pegiat literasi yang mendedikasikan waktu untuk membangun support system keluarga dan pengasuhan anak yang sehat di Cipanas.
                </p>

                {article.authorInstagram && (
                  <a
                    href={article.authorInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rosewood hover:underline"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>Ikuti Instagram @lindashirlyv</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </section>

            {/* Interactive Community Discussion Card */}
            <section className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#3b2820] text-[#fbf7f2] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h4 className="text-xl sm:text-2xl font-serif font-medium text-white mb-1.5">
                  Ingin Berdiskusi Seputar Topik Ini?
                </h4>
                <p className="text-[#e2ded2] text-sm leading-relaxed max-w-xl">
                  Punya pandangan serupa, pertanyaan, atau ingin berbagi cerita pengasuhan keluarga Anda? Mari ngobrol langsung bersama Umma Shierly.
                </p>
              </div>

              <a
                href={`https://wa.me/6287883370039?text=${encodeURIComponent(
                  `Halo Umma Shierly, saya telah membaca ringkasan "${article.title}" di website Umma Motherhood dan ingin berdiskusi lebih lanjut.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#fbf7f2] text-ink text-xs sm:text-sm font-bold shadow-md hover:bg-white transition-all flex-shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Diskusi via WA Umma</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-rosewood" />
              </a>
            </section>

            {/* Other Recommended Articles */}
            {otherArticles.length > 0 && (
              <section className="pt-8 border-t border-line/60">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-rosewood">
                      Rekomendasi Bacaan
                    </span>
                    <h3 className="text-2xl font-serif font-normal text-ink mt-0.5">
                      Artikel &amp; Materi Lainnya
                    </h3>
                  </div>

                  <Link
                    href="/artikel/"
                    className="inline-flex items-center gap-1 text-xs font-bold text-rosewood hover:underline"
                  >
                    <span>Lihat Semua</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {otherArticles.map((other) => (
                    <article
                      key={other.id}
                      className="p-5 rounded-xl border border-line bg-paper hover:border-rosewood/40 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted mb-2">
                          <span className="text-rosewood font-semibold">
                            {other.categoryLabel}
                          </span>
                          <span>•</span>
                          <span>{other.date}</span>
                        </div>
                        <h4 className="text-base font-serif font-medium text-ink leading-snug mb-2">
                          <Link
                            href={`/artikel/${other.id}/`}
                            className="hover:text-rosewood transition-colors"
                          >
                            {other.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-muted leading-relaxed line-clamp-2">
                          {other.excerpt}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-line/50 flex items-center justify-between">
                        <Link
                          href={`/artikel/${other.id}/`}
                          className="text-xs font-bold text-rosewood hover:underline inline-flex items-center gap-1"
                        >
                          <span>Buka Ringkasan &amp; Referensi</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
