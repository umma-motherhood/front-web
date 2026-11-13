"use client";

import { useState } from "react";
import { SiteContentData, DirectoryItem, DirectoryPlaceItem } from "@/config/site";
import { MapPin, Plus, Trash2, Edit2, AlertCircle } from "lucide-react";

interface TabDirectoryProps {
  data: SiteContentData;
  onChange: (updated: SiteContentData) => void;
}

export function TabDirectory({ data, onChange }: TabDirectoryProps) {
  const directory = data.directory || [];
  const [selectedCatId, setSelectedCatId] = useState<string>(directory[0]?.id || "");
  const [editingPlaceId, setEditingPlaceId] = useState<string | null>(null);

  // Place form states
  const [placeName, setPlaceName] = useState("");
  const [categoryTag, setCategoryTag] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [schedule, setSchedule] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [focus, setFocus] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const activeCategory = directory.find((c) => c.id === selectedCatId) || directory[0];

  const startCreatePlace = () => {
    setEditingPlaceId("NEW");
    setPlaceName("");
    setCategoryTag(activeCategory?.title || "");
    setDescription("");
    setAddress("");
    setSchedule("");
    setPriceRange("");
    setFocus("");
    setContactPerson("");
    setContactPhone("");
    setReviewAuthor("Ibu di Cipanas");
    setReviewText("");
    setReviewRating(5);
    setImageUrl("");
    setError(null);
  };

  const startEditPlace = (place: DirectoryPlaceItem) => {
    setEditingPlaceId(place.id);
    setPlaceName(place.name);
    setCategoryTag(place.categoryTag || "");
    setDescription(place.description || "");
    setAddress(place.address || "");
    setSchedule(place.schedule || "");
    setPriceRange(place.priceRange || "");
    setFocus(place.focus || "");
    setContactPerson(place.contact?.person || "");
    setContactPhone(place.contact?.phone || "");
    setReviewAuthor(place.review?.author || "");
    setReviewText(place.review?.text || "");
    setReviewRating(place.review?.rating || 5);
    setImageUrl(place.image || "");
    setError(null);
  };

  const savePlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeName.trim()) {
      setError("Nama tempat / jasa wajib diisi.");
      return;
    }

    const cleanId =
      editingPlaceId === "NEW"
        ? placeName.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")
        : editingPlaceId!;

    const newPlace: DirectoryPlaceItem = {
      id: cleanId,
      name: placeName.trim(),
      categoryTag: categoryTag.trim() || activeCategory.title,
      description: description.trim(),
      address: address.trim() || "Cipanas, Cianjur",
      schedule: schedule.trim() || undefined,
      priceRange: priceRange.trim() || undefined,
      focus: focus.trim() || undefined,
      contact: {
        person: contactPerson.trim() || "Kontak Informasi",
        phone: contactPhone.trim() || "-",
      },
      review: {
        author: reviewAuthor.trim() || "Anggota Komunitas",
        text: reviewText.trim() || "Rekomendasi dari sesama ibu di Cipanas.",
        rating: reviewRating,
      },
      waMessage: `Halo ${contactPerson.trim() || placeName.trim()}, saya mendapat rekomendasi dari Direktori Umma Motherhood Cipanas.`,
      image: imageUrl.trim() || undefined,
    };

    // Update active category subgroups
    const updatedDirectory = directory.map((cat) => {
      if (cat.id !== activeCategory.id) return cat;

      const defaultSubgroup = cat.subgroups[0] || { title: "Daftar Rekomendasi", places: [] };
      let updatedPlaces: DirectoryPlaceItem[];

      if (editingPlaceId === "NEW") {
        updatedPlaces = [...defaultSubgroup.places, newPlace];
      } else {
        updatedPlaces = defaultSubgroup.places.map((p) => (p.id === editingPlaceId ? newPlace : p));
      }

      return {
        ...cat,
        subgroups: [
          {
            ...defaultSubgroup,
            places: updatedPlaces,
          },
          ...cat.subgroups.slice(1),
        ],
      };
    });

    onChange({
      ...data,
      directory: updatedDirectory,
    });

    setEditingPlaceId(null);
  };

  const deletePlace = (placeId: string) => {
    if (confirm("Hapus rekomendasi ini dari direktori?")) {
      const updatedDirectory = directory.map((cat) => {
        if (cat.id !== activeCategory.id) return cat;
        return {
          ...cat,
          subgroups: cat.subgroups.map((sg) => ({
            ...sg,
            places: sg.places.filter((p) => p.id !== placeId),
          })),
        };
      });

      onChange({
        ...data,
        directory: updatedDirectory,
      });
    }
  };

  // Flatten all places in active category
  const activePlaces = activeCategory
    ? activeCategory.subgroups.flatMap((sg) => sg.places)
    : [];

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warm-sand/50 text-rosewood flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-ink">
                Direktori Rekomendasi Cipanas (/direktori/)
              </h2>
              <p className="text-xs text-muted">
                Pilih kategori layanan untuk mengelola daftar tempat, dokter, sekolah/kursus, dan fasilitas hukum.
              </p>
            </div>
          </div>

          {editingPlaceId === null && (
            <button
              type="button"
              onClick={startCreatePlace}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-rosewood text-white text-xs font-bold transition hover:bg-[#9f5d54] active:scale-[0.98] shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tempat di Kategori Ini</span>
            </button>
          )}
        </div>

        {/* Tab Buttons for Categories */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-line">
          {directory.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCatId(cat.id);
                setEditingPlaceId(null);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                selectedCatId === cat.id
                  ? "bg-rosewood text-white shadow-xs"
                  : "bg-paper text-ink border border-line hover:bg-warm-sand/40"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Form Tambah/Edit */}
      {editingPlaceId !== null && (
        <div className="p-6 rounded-2xl bg-paper border-2 border-rosewood/40 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-line">
            <h3 className="font-serif font-bold text-ink text-base">
              {editingPlaceId === "NEW"
                ? `Tambah Tempat Baru (${activeCategory.title})`
                : `Edit: ${placeName}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingPlaceId(null)}
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

          <form onSubmit={savePlace} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Nama Tempat / Dokter / Jasa *
                </label>
                <input
                  type="text"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  placeholder="Contoh: dr. Nina Sp.A / Dojo Katana"
                  required
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Tag Kategori
                </label>
                <input
                  type="text"
                  value={categoryTag}
                  onChange={(e) => setCategoryTag(e.target.value)}
                  placeholder="Contoh: Dokter Spesialis Anak / Beladiri Anak"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Jadwal Praktek / Sesi Latihan
                </label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="Contoh: Senin, Selasa, Kamis 15.00-20.00"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Biaya / Rentang Tarif
                </label>
                <input
                  type="text"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  placeholder="Contoh: 50.000 - 2.500.000"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Contact Person (Nama)
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Contoh: Ibu Shofia / Kang Sule"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Contoh: 0898-6279-287"
                  className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink font-mono focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Lokasi / Alamat Lengkap
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Contoh: Perumahan Griya Asri Cipanas / Jl. Raya Cipanas No. 12"
                className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Fokus Layanan / Deskripsi Singkat
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi layanan atau fasilitas..."
                className="w-full p-3 text-sm rounded-lg border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
              />
            </div>

            {/* Testimoni / Ulasan Rekomendasi */}
            <div className="p-4 rounded-xl bg-white border border-line space-y-3">
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                Ulasan / Catatan Rekomendasi Komunitas
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  placeholder="Nama Penulis Ulasan (misal: Umma Rina)"
                  className="h-10 px-3 text-xs rounded-lg border border-line bg-paper text-ink"
                />
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="h-10 px-3 text-xs rounded-lg border border-line bg-paper text-ink"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (Bintang 5)</option>
                  <option value={4}>⭐⭐⭐⭐ (Bintang 4)</option>
                </select>
              </div>
              <textarea
                rows={2}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tulis ulasan pengalaman anggota..."
                className="w-full p-3 text-xs rounded-lg border border-line bg-paper text-ink"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingPlaceId(null)}
                className="px-4 py-2.5 rounded-lg border border-line bg-white text-ink text-xs font-bold hover:bg-paper transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-rosewood text-white text-xs font-bold transition hover:bg-[#9f5d54] active:scale-[0.98]"
              >
                Simpan Tempat
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Daftar Tempat di Kategori Ini */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {activePlaces.map((place) => (
          <div
            key={place.id}
            className="p-5 rounded-2xl bg-white border border-line shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-bold text-rosewood uppercase tracking-wider px-2 py-0.5 rounded bg-warm-sand/40">
                    {place.categoryTag || activeCategory.title}
                  </span>
                  <h3 className="font-serif font-bold text-ink text-lg mt-1">
                    {place.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-muted line-clamp-2 mt-1">
                {place.description || place.address}
              </p>

              <div className="mt-3 pt-3 border-t border-line/60 space-y-1 text-xs">
                {place.schedule && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Jadwal:</span>
                    <span className="font-medium text-ink">{place.schedule}</span>
                  </div>
                )}
                {place.priceRange && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Biaya:</span>
                    <span className="font-medium text-ink">{place.priceRange}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted">Kontak:</span>
                  <span className="font-mono text-ink">
                    {place.contact?.person} ({place.contact?.phone})
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => startEditPlace(place)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-line bg-paper hover:bg-white text-xs font-semibold text-ink transition"
              >
                <Edit2 className="w-3.5 h-3.5 text-muted" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => deletePlace(place.id)}
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
