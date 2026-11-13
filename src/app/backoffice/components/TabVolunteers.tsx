"use client";

import { useState } from "react";
import { SiteContentData, VolunteerItem } from "@/config/site";
import { Users, Plus, Trash2, Edit2, Upload, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";
import { GitHubConfig, uploadBinaryFileToRepo } from "@/lib/github";

interface TabVolunteersProps {
  data: SiteContentData;
  onChange: (updated: SiteContentData) => void;
  githubConfig: GitHubConfig | null;
}

export function TabVolunteers({ data, onChange, githubConfig }: TabVolunteersProps) {
  const volunteers = data.volunteers || [];
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [quote, setQuote] = useState("");
  const [instagram, setInstagram] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCreate = () => {
    setEditingId("NEW");
    setName("");
    setRole("");
    setPhotoUrl("");
    setQuote("");
    setInstagram("");
    setError(null);
    setUploadStatus(null);
  };

  const startEdit = (vol: VolunteerItem) => {
    setEditingId(vol.id);
    setName(vol.name);
    setRole(vol.role);
    setPhotoUrl(vol.photoUrl || "");
    setQuote(vol.quote || "");
    setInstagram(vol.instagram || "");
    setError(null);
    setUploadStatus(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar (JPG, PNG, atau WebP).");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran foto maksimal 2MB agar loading website tetap ringan.");
      return;
    }

    setError(null);
    setUploading(true);
    setUploadStatus("Mempersiapkan gambar...");

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        // Clean filename
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const cleanName = (name || "relawan").toLowerCase().replace(/[^a-z0-9]/g, "-");
        const filePath = `public/images/relawan/${cleanName}-${Date.now()}.${ext}`;

        if (githubConfig) {
          setUploadStatus("Mengunggah foto ke repository GitHub...");
          await uploadBinaryFileToRepo(
            githubConfig,
            filePath,
            base64Data,
            `chore(media): upload volunteer photo for ${name || "relawan"}`
          );
          const finalUrl = `/${filePath.replace(/^public\//, "")}`;
          setPhotoUrl(finalUrl);
          setUploadStatus("Foto berhasil diunggah ke repository.");
        } else {
          // Fallback ke data URL sementara jika belum tersambung ke GitHub
          setPhotoUrl(base64Data);
          setUploadStatus("Foto tersimpan di draft lokal.");
        }
      } catch (err: any) {
        setError("Gagal mengunggah gambar: " + (err?.message || "Cek koneksi GitHub"));
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const saveVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Nama relawan wajib diisi.");
      return;
    }
    if (!role.trim()) {
      setError("Peran relawan wajib diisi (misal: Admin Website / Koordinator).");
      return;
    }
    if (!photoUrl.trim()) {
      setError("Foto relawan WAJIB dilampirkan (bisa upload file atau masukkan link gambar).");
      return;
    }

    const newItem: VolunteerItem = {
      id: editingId === "NEW" ? `relawan-${Date.now()}` : editingId!,
      name: name.trim(),
      role: role.trim(),
      photoUrl: photoUrl.trim(),
      quote: quote.trim() || undefined,
      instagram: instagram.trim() || undefined,
    };

    let updatedList: VolunteerItem[];
    if (editingId === "NEW") {
      updatedList = [...volunteers, newItem];
    } else {
      updatedList = volunteers.map((v) => (v.id === editingId ? newItem : v));
    }

    onChange({
      ...data,
      volunteers: updatedList,
    });

    setEditingId(null);
  };

  const deleteVolunteer = (id: string) => {
    if (confirm("Hapus relawan ini dari tampilan website?")) {
      onChange({
        ...data,
        volunteers: volunteers.filter((v) => v.id !== id),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warm-sand/50 text-rosewood flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-ink">
                Manajemen Relawan Komunitas (#dukung)
              </h2>
              <p className="text-xs text-muted">
                Foto profil relawan <strong>wajib ada</strong> dan akan otomatis ditampilkan dalam format <strong>lingkaran (circle)</strong> di bagian #dukung.
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
              <span>Tambah Relawan Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Tambah / Edit Relawan */}
      {editingId !== null && (
        <div className="p-6 rounded-2xl bg-paper border-2 border-rosewood/40 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-line">
            <h3 className="font-serif font-bold text-ink text-base">
              {editingId === "NEW" ? "Tambah Profil Relawan Baru" : "Edit Profil Relawan"}
            </h3>
            <button
              type="button"
              onClick={cancelEdit}
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

          {uploadStatus && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{uploadStatus}</span>
            </div>
          )}

          <form onSubmit={saveVolunteer} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Nama Lengkap Relawan *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Siti Rahmawati"
                  required
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Peran / Bidang Kontribusi *
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Admin Media Sosial & Acara"
                  required
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>
            </div>

            {/* Bagian Foto Relawan dengan Pratinjau Lingkaran */}
            <div className="p-4 rounded-xl bg-white border border-line space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Circle Avatar Live Preview */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-rosewood shadow-sm bg-warm-sand/20 shrink-0 flex items-center justify-center">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt="Pratinjau foto relawan"
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/logo.png";
                        }}
                      />
                    ) : (
                      <Users className="w-8 h-8 text-muted/50" />
                    )}
                  </div>
                  <span className="mt-1 text-[10px] text-muted font-medium">
                    Preview Lingkaran
                  </span>
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                    Foto Relawan (Wajib) *
                  </label>
                  
                  {/* Pilihan 1: Input URL gambar langsung */}
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="Masukkan URL foto (misal: /images/logo.png atau link web)"
                    required
                    className="w-full h-10 px-3 text-xs rounded-lg border border-line bg-paper text-ink font-mono"
                  />

                  {/* Pilihan 2: Upload File langsung dari komputer */}
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line bg-paper hover:bg-white text-xs font-medium text-ink cursor-pointer transition">
                      <Upload className="w-3.5 h-3.5 text-rosewood" />
                      <span>{uploading ? "Mengunggah..." : "Pilih File Foto dari Perangkat"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-muted">
                      JPG/PNG maks 2MB
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Kutipan / Pesan Semangat (Opsional)
              </label>
              <textarea
                rows={2}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Pesan singkat motivasi atau pengalaman mengabdi di komunitas"
                className="w-full p-3 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Akun Instagram (Opsional)
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Contoh: @lindashirlyv atau https://instagram.com/..."
                className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2.5 rounded-lg border border-line bg-white text-ink text-xs font-bold hover:bg-paper transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2.5 rounded-lg bg-rosewood text-white text-xs font-bold transition hover:bg-[#9f5d54] active:scale-[0.98] disabled:opacity-50"
              >
                {editingId === "NEW" ? "Tambahkan ke Daftar" : "Simpan Perubahan Relawan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List Relawan yang ada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {volunteers.map((vol) => (
          <div
            key={vol.id}
            className="p-5 rounded-2xl bg-white border border-line shadow-xs flex flex-col items-center text-center relative group"
          >
            {/* Foto Lingkaran */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-rosewood/40 shadow-sm mb-3 bg-warm-sand/20 shrink-0">
              <img
                src={vol.photoUrl || "/images/logo.png"}
                alt={`Foto ${vol.name}`}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/logo.png";
                }}
              />
            </div>

            <h3 className="font-serif font-bold text-ink text-base">
              {vol.name}
            </h3>
            <span className="mt-0.5 text-[11px] font-bold text-rosewood uppercase tracking-wider">
              {vol.role}
            </span>

            {vol.quote && (
              <p className="mt-2 text-xs text-muted leading-relaxed italic line-clamp-3">
                &ldquo;{vol.quote}&rdquo;
              </p>
            )}

            {vol.instagram && (
              <span className="mt-2 text-[11px] text-muted font-mono truncate max-w-[200px]">
                {vol.instagram}
              </span>
            )}

            {/* Tombol Aksi */}
            <div className="mt-4 pt-3 border-t border-line/60 w-full flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => startEdit(vol)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-line bg-paper hover:bg-white text-xs font-semibold text-ink transition"
              >
                <Edit2 className="w-3.5 h-3.5 text-muted" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => deleteVolunteer(vol.id)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}

        {volunteers.length === 0 && editingId === null && (
          <div className="col-span-full p-8 text-center rounded-2xl bg-paper border border-dashed border-line">
            <Users className="w-10 h-10 mx-auto text-muted/50 mb-2" />
            <p className="text-sm font-medium text-ink">
              Belum ada data relawan yang terdaftar.
            </p>
            <p className="text-xs text-muted mt-1">
              Klik tombol &ldquo;Tambah Relawan Baru&rdquo; di atas untuk menambahkan profil penggerak komunitas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
