"use client";

import { useState } from "react";
import { SiteContentData, UmkmItem, UmkmProduct } from "@/config/site";
import { ShoppingBag, Plus, Trash2, Edit2, Upload, AlertCircle, X } from "lucide-react";
import { GitHubConfig, uploadBinaryFileToRepo } from "@/lib/github";

interface TabUmkmProps {
  data: SiteContentData;
  onChange: (updated: SiteContentData) => void;
  githubConfig: GitHubConfig | null;
}

export function TabUmkm({ data, onChange, githubConfig }: TabUmkmProps) {
  const umkmList = data.umkmList || [];
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [owner, setOwner] = useState("");
  const [category, setCategory] = useState<UmkmItem["category"]>("kuliner");
  const [categoryLabel, setCategoryLabel] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [products, setProducts] = useState<UmkmProduct[]>([]);
  const [orderNotes, setOrderNotes] = useState<string[]>([]);
  const [newOrderNote, setNewOrderNote] = useState("");

  // Product form sub-state
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDesc, setProdDesc] = useState("");

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localPreviews, setLocalPreviews] = useState<Record<string, string>>({});

  const getDisplayPhotoUrl = (url: string) => {
    if (!url) return "/images/logo.png";
    return localPreviews[url] || url;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, originalUrl: string) => {
    const target = e.currentTarget;
    if (!target.dataset.triedRaw && originalUrl.startsWith("/images/")) {
      target.dataset.triedRaw = "1";
      const owner = githubConfig?.owner || "umma-motherhood";
      const repo = githubConfig?.repo || "front-web";
      const branch = githubConfig?.branch || "main";
      target.src = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/public${originalUrl}`;
      return;
    }
  };

  const startCreate = () => {
    setEditingId("NEW");
    setName("");
    setTagline("");
    setOwner("");
    setCategory("kuliner");
    setCategoryLabel("Kuliner & Jajanan");
    setPriceRange("");
    setLocation("");
    setPhone("");
    setDescription("");
    setImages([]);
    setProducts([]);
    setOrderNotes([]);
    setError(null);
  };

  const startEdit = (item: UmkmItem) => {
    setEditingId(item.id);
    setName(item.name);
    setTagline(item.tagline || "");
    setOwner(item.owner || "");
    setCategory(item.category || "kuliner");
    setCategoryLabel(item.categoryLabel || "");
    setPriceRange(item.priceRange || "");
    setLocation(item.location || "");
    setPhone(item.phone || "");
    setDescription(item.description || "");
    setImages(item.images || []);
    setProducts(item.products || []);
    setOrderNotes(item.orderNotes || []);
    setError(null);
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    setUploading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const cleanName = (name || "umkm").toLowerCase().replace(/[^a-z0-9]/g, "-");
        const filePath = `public/images/umkm/${cleanName}-${Date.now()}.${ext}`;

        if (githubConfig) {
          await uploadBinaryFileToRepo(
            githubConfig,
            filePath,
            base64Data,
            `chore(media): upload umkm product image for ${name || "umkm"}`
          );
          const finalUrl = `/${filePath.replace(/^public\//, "")}`;
          setLocalPreviews((prev) => ({ ...prev, [finalUrl]: base64Data }));
          setImages((prev) => [...prev, finalUrl]);
        } else {
          setImages((prev) => [...prev, base64Data]);
        }
      } catch (err: any) {
        setError("Gagal upload gambar: " + (err?.message || ""));
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      setImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addProductItem = () => {
    if (!prodName.trim()) return;
    setProducts((prev) => [
      ...prev,
      {
        name: prodName.trim(),
        price: prodPrice.trim() || undefined,
        desc: prodDesc.trim() || undefined,
      },
    ]);
    setProdName("");
    setProdPrice("");
    setProdDesc("");
  };

  const removeProductItem = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const addOrderNoteItem = () => {
    if (newOrderNote.trim()) {
      setOrderNotes((prev) => [...prev, newOrderNote.trim()]);
      setNewOrderNote("");
    }
  };

  const removeOrderNoteItem = (index: number) => {
    setOrderNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const saveUmkm = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Nama UMKM wajib diisi.");
      return;
    }

    const cleanId =
      editingId === "NEW"
        ? name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")
        : editingId!;

    const newItem: UmkmItem = {
      id: cleanId,
      name: name.trim(),
      tagline: tagline.trim() || undefined,
      category,
      categoryLabel: categoryLabel.trim() || "UMKM Umma",
      owner: owner.trim() || "Anggota Umma",
      priceRange: priceRange.trim() || "Menyesuaikan pesanan",
      location: location.trim() || "Cipanas & Sekitarnya",
      description: description.trim(),
      waMessage: `Halo Umma, saya tertarik untuk memesan produk di ${name.trim()}.`,
      phone: phone.trim() || undefined,
      images: images.length > 0 ? images : undefined,
      products: products.length > 0 ? products : undefined,
      orderNotes: orderNotes.length > 0 ? orderNotes : undefined,
    };

    let updatedList: UmkmItem[];
    if (editingId === "NEW") {
      updatedList = [...umkmList, newItem];
    } else {
      updatedList = umkmList.map((item) => (item.id === editingId ? newItem : item));
    }

    onChange({
      ...data,
      umkmList: updatedList,
    });

    setEditingId(null);
  };

  const deleteUmkm = (id: string) => {
    if (confirm("Hapus UMKM ini dari etalase?")) {
      onChange({
        ...data,
        umkmList: umkmList.filter((item) => item.id !== id),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warm-sand/50 text-rosewood flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-ink">
                Katalog Lapak UMKM Umma (/umkm/)
              </h2>
              <p className="text-xs text-muted">
                Kelola daftar usaha anggota komunitas, foto flyer, produk, harga, dan nomor pemesanan.
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
              <span>Tambah Lapak UMKM</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Tambah/Edit */}
      {editingId !== null && (
        <div className="p-6 rounded-2xl bg-paper border-2 border-rosewood/40 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-line">
            <h3 className="font-serif font-bold text-ink text-base">
              {editingId === "NEW" ? "Tambah Lapak UMKM Baru" : `Edit Lapak UMKM: ${name}`}
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

          <form onSubmit={saveUmkm} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Nama Usaha UMKM *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Toshierba / Opat Kadeudeuh"
                  required
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Tagline / Slogan
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Contoh: Jajanan jadul, rasa mantul"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Nama Pemilik Usaha
                </label>
                <input
                  type="text"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder="Contoh: Ibu Shierly / Opat Kadeudeuh"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Nomor WhatsApp Pemesanan (Format: 08xxx)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 087883370039"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink font-mono focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    const val = e.target.value as UmkmItem["category"];
                    setCategory(val);
                    if (val === "toserba") setCategoryLabel("Toko Serba Ada");
                    else if (val === "kuliner") setCategoryLabel("Kuliner & Jajanan");
                    else if (val === "busana") setCategoryLabel("Busana & Fashion");
                    else if (val === "bayi") setCategoryLabel("Perlengkapan Bayi");
                    else if (val === "kriya") setCategoryLabel("Kriya & Kerajinan");
                    else setCategoryLabel("Jasa & Layanan");
                  }}
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                >
                  <option value="kuliner">Kuliner & Jajanan</option>
                  <option value="toserba">Toko Serba Ada (Sembako)</option>
                  <option value="busana">Busana Anak & Ibu</option>
                  <option value="bayi">Perlengkapan Bayi</option>
                  <option value="kriya">Kriya & Kerajinan</option>
                  <option value="jasa">Jasa Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Rentang Harga
                </label>
                <input
                  type="text"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  placeholder="Contoh: Rp 2.500 - Rp 70.000"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Lokasi / Keterangan Alamat
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Perumahan Cipanas Regency / Jl. Mariwati km. 5"
                className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Deskripsi Usaha
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi produk atau jasa yang ditawarkan..."
                className="w-full p-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>

            {/* Foto Produk */}
            <div className="p-4 rounded-xl bg-white border border-line space-y-3">
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                Foto-Foto Produk & Flyer ({images.length} Foto)
              </label>

              <div className="flex flex-wrap gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-line group">
                    <img
                      src={getDisplayPhotoUrl(img)}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e, img)}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white shadow-xs opacity-90 hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Atau tempel link URL foto..."
                  className="flex-1 h-10 px-3 text-xs rounded-lg border border-line bg-paper text-ink font-mono"
                />
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="px-4 py-2 rounded-lg border border-line bg-paper text-ink text-xs font-bold hover:bg-white transition"
                >
                  Tambah URL
                </button>
                <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rosewood text-white text-xs font-bold cursor-pointer hover:bg-[#9f5d54] transition shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploading ? "Mengunggah..." : "Upload File"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadPhoto}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Rincian Produk/Menu */}
            <div className="p-4 rounded-xl bg-white border border-line space-y-3">
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                Daftar Produk / Menu ({products.length} Item)
              </label>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {products.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-paper border border-line text-xs">
                    <div>
                      <span className="font-bold text-ink">{p.name}</span>
                      {p.price && <span className="ml-2 text-rosewood font-mono font-semibold">({p.price})</span>}
                      {p.desc && <p className="text-muted text-[11px] mt-0.5">{p.desc}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeProductItem(idx)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-line/60">
                <input
                  type="text"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="Nama Produk (misal: Beras 1L)"
                  className="h-10 px-3 text-xs rounded-lg border border-line bg-paper text-ink"
                />
                <input
                  type="text"
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  placeholder="Harga (misal: Rp 13.000)"
                  className="h-10 px-3 text-xs rounded-lg border border-line bg-paper text-ink"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    placeholder="Keterangan singkat"
                    className="flex-1 h-10 px-3 text-xs rounded-lg border border-line bg-paper text-ink"
                  />
                  <button
                    type="button"
                    onClick={addProductItem}
                    className="px-3 py-2 rounded-lg bg-rosewood text-white text-xs font-bold hover:bg-[#9f5d54] transition"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>

            {/* Catatan Pemesanan */}
            <div className="p-4 rounded-xl bg-white border border-line space-y-3">
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                Catatan / Cara Pemesanan
              </label>

              <div className="space-y-1.5">
                {orderNotes.map((note, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-paper border border-line text-xs text-ink">
                    <span>{note}</span>
                    <button
                      type="button"
                      onClick={() => removeOrderNoteItem(idx)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newOrderNote}
                  onChange={(e) => setNewOrderNote(e.target.value)}
                  placeholder="Contoh: Pre-order H-1, Free ongkir sekitar perumahan"
                  className="flex-1 h-10 px-3 text-xs rounded-lg border border-line bg-paper text-ink"
                />
                <button
                  type="button"
                  onClick={addOrderNoteItem}
                  className="px-4 py-2 rounded-lg border border-line bg-paper text-ink text-xs font-bold hover:bg-white"
                >
                  Tambah Catatan
                </button>
              </div>
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
                disabled={uploading}
                className="px-6 py-2.5 rounded-lg bg-rosewood text-white text-xs font-bold transition hover:bg-[#9f5d54] active:scale-[0.98] disabled:opacity-50"
              >
                {editingId === "NEW" ? "Simpan UMKM Baru" : "Simpan Perubahan UMKM"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Daftar UMKM Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {umkmList.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-line shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-bold text-rosewood uppercase tracking-wider px-2 py-0.5 rounded bg-warm-sand/40">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-serif font-bold text-ink text-lg mt-1">
                    {item.name}
                  </h3>
                  {item.tagline && (
                    <p className="text-xs text-muted italic">
                      &ldquo;{item.tagline}&rdquo;
                    </p>
                  )}
                </div>
                {item.images && item.images.length > 0 && (
                  <div className="w-14 h-14 rounded-lg overflow-hidden border border-line shrink-0">
                    <img
                      src={getDisplayPhotoUrl(item.images[0])}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e, item.images![0])}
                    />
                  </div>
                )}
              </div>

              <p className="text-xs text-muted line-clamp-2 mt-2">
                {item.description}
              </p>

              <div className="mt-3 pt-3 border-t border-line/60 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Harga:</span>
                  <span className="font-semibold text-ink">{item.priceRange}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Kontak:</span>
                  <span className="font-mono text-ink">{item.phone || "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Produk:</span>
                  <span className="text-ink">{item.products?.length || 0} item terdaftar</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => startEdit(item)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-line bg-paper hover:bg-white text-xs font-semibold text-ink transition"
              >
                <Edit2 className="w-3.5 h-3.5 text-muted" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => deleteUmkm(item.id)}
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
