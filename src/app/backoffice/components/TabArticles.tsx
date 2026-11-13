"use client";

import { useState } from "react";
import { SiteContentData, CommunityArticle } from "@/config/site";
import { BookOpen, Plus, Trash2, Edit2, ExternalLink, AlertCircle } from "lucide-react";

interface TabArticlesProps {
  data: SiteContentData;
  onChange: (updated: SiteContentData) => void;
}

export function TabArticles({ data, onChange }: TabArticlesProps) {
  const articles = data.communityArticles || [];
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [authorInstagram, setAuthorInstagram] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<CommunityArticle["category"]>("ruang-berbagi");
  const [tagsStr, setTagsStr] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState<CommunityArticle["status"]>("published");
  const [isExternal, setIsExternal] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const startCreate = () => {
    setEditingId("NEW");
    setTitle("");
    setSubtitle("");
    setAuthor("Shierly V.");
    setAuthorRole("Inisiator Umma Motherhood");
    setAuthorInstagram("https://www.instagram.com/lindashirlyv/");
    setDate(new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }));
    setCategory("ruang-berbagi");
    setTagsStr("Parenting, Komunitas, Refleksi");
    setExcerpt("");
    setStatus("published");
    setIsExternal(false);
    setExternalUrl("");
    setError(null);
  };

  const startEdit = (art: CommunityArticle) => {
    setEditingId(art.id);
    setTitle(art.title);
    setSubtitle(art.subtitle || "");
    setAuthor(art.author);
    setAuthorRole(art.authorRole || "");
    setAuthorInstagram(art.authorInstagram || "");
    setDate(art.date);
    setCategory(art.category);
    setTagsStr(art.tags?.join(", ") || "");
    setExcerpt(art.excerpt || "");
    setStatus(art.status || "published");
    setIsExternal(Boolean(art.isExternal || art.outsideReference));
    setExternalUrl(art.outsideReference?.url || art.url || "");
    setError(null);
  };

  const saveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Judul artikel wajib diisi.");
      return;
    }

    const cleanId =
      editingId === "NEW"
        ? title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")
        : editingId!;

    const tags = tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    let categoryLabel = "Ruang Berbagi Sesama Ibu";
    if (category === "kelas-profesional") categoryLabel = "Materi Kelas Profesional";
    else if (category === "arsip-diskusi") categoryLabel = "Arsip Diskusi Umma";

    const newArticle: CommunityArticle = {
      id: cleanId,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      author: author.trim() || "Anggota Umma",
      authorRole: authorRole.trim() || undefined,
      authorInstagram: authorInstagram.trim() || undefined,
      date: date.trim() || "Terbaru",
      category,
      categoryLabel,
      tags,
      excerpt: excerpt.trim(),
      status,
      isExternal,
      url: isExternal && externalUrl.trim() ? externalUrl.trim() : undefined,
      outsideReference:
        isExternal && externalUrl.trim()
          ? {
              platform: "Personal Blog & Archive",
              url: externalUrl.trim(),
              description: `Baca artikel lengkap di blog rujukan: ${externalUrl.trim()}`,
              buttonLabel: "Buka Artikel Lengkap di Sumber Luar",
            }
          : undefined,
    };

    let updatedList: CommunityArticle[];
    if (editingId === "NEW") {
      updatedList = [...articles, newArticle];
    } else {
      updatedList = articles.map((a) => (a.id === editingId ? newArticle : a));
    }

    onChange({
      ...data,
      communityArticles: updatedList,
    });

    setEditingId(null);
  };

  const deleteArticle = (id: string) => {
    if (confirm("Hapus artikel ini dari daftar publikasi?")) {
      onChange({
        ...data,
        communityArticles: articles.filter((a) => a.id !== id),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warm-sand/50 text-rosewood flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-ink">
                Manajemen Tulisan & Artikel Komunitas (/artikel/)
              </h2>
              <p className="text-xs text-muted">
                Daftar artikel ruang berbagi, materi kelas profesional, dan rangkuman diskusi grup.
              </p>
            </div>
          </div>

          {editingId === null && (
            <button
              type="button"
              onClick={startCreate}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-rosewood text-white text-xs font-bold transition hover:bg-[#9f5d54] active:scale-[0.98] shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Artikel Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Tambah/Edit */}
      {editingId !== null && (
        <div className="p-6 rounded-2xl bg-paper border-2 border-rosewood/40 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-line">
            <h3 className="font-serif font-bold text-ink text-base">
              {editingId === "NEW" ? "Tulis Artikel Baru" : `Edit Artikel: ${title}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="text-xs text-muted hover:text-ink font-medium"
            >
              Batal
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={saveArticle} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Judul Artikel *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Ikhtiar Menjaga Keutuhan Cinta Saat Keluarga Bertumbuh"
                required
                className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink font-serif font-medium focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Nama Penulis
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Contoh: Shierly V."
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Peran / Keterangan Penulis
                </label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="Contoh: Inisiator Umma Motherhood"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Tanggal Publikasi
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Contoh: 01 September 2026"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CommunityArticle["category"])}
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                >
                  <option value="ruang-berbagi">Ruang Berbagi Sesama Ibu</option>
                  <option value="kelas-profesional">Materi Kelas Profesional</option>
                  <option value="arsip-diskusi">Arsip Diskusi Umma</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Tags (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="Contoh: Parenting, Refleksi, Pernikahan"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Ringkasan / Excerpt Artikel
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Deskripsi singkat yang tampil pada kartu artikel..."
                className="w-full p-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>

            {/* Opsi Tautan Sumber Luar (External Blog) */}
            <div className="p-4 rounded-xl bg-white border border-line space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isExternal}
                  onChange={(e) => setIsExternal(e.target.checked)}
                  className="rounded border-line text-rosewood focus:ring-rosewood"
                />
                <span className="text-xs font-semibold text-ink">
                  Artikel ini merujuk ke Blog Eksternal (misal: GitHub Pages shirlyv.github.io)
                </span>
              </label>

              {isExternal && (
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                    URL Lengkap Sumber Luar
                  </label>
                  <input
                    type="url"
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                    placeholder="https://shirlyv.github.io/2026/09/01/..."
                    className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink font-mono focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                  />
                  <p className="mt-1 text-[11px] text-muted">
                    Halaman detail artikel di website ini akan menampilkan ringkasan sekaligus tombol langsung menuju URL sumber luar tersebut.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="px-4 py-2.5 rounded-lg border border-line bg-white text-ink text-xs font-bold hover:bg-paper transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-rosewood text-white text-xs font-bold transition hover:bg-[#9f5d54] active:scale-[0.98]"
              >
                Simpan Artikel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Daftar Artikel Cards */}
      <div className="space-y-4">
        {articles.map((art) => (
          <div
            key={art.id}
            className="p-5 rounded-2xl bg-white border border-line shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-rosewood uppercase tracking-wider px-2 py-0.5 rounded bg-warm-sand/40">
                  {art.categoryLabel}
                </span>
                <span className="text-xs text-muted">• {art.date}</span>
                {art.isExternal && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-muted border border-line px-1.5 py-0.5 rounded">
                    <ExternalLink className="w-2.5 h-2.5" />
                    <span>External Link</span>
                  </span>
                )}
              </div>
              <h3 className="font-serif font-bold text-ink text-base sm:text-lg">
                {art.title}
              </h3>
              <p className="text-xs text-muted line-clamp-1">
                Oleh {art.author} {art.excerpt ? `: ${art.excerpt}` : ""}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => startEdit(art)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-line bg-paper hover:bg-white text-xs font-semibold text-ink transition"
              >
                <Edit2 className="w-3.5 h-3.5 text-muted" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => deleteArticle(art.id)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
