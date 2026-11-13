"use client";

import { SiteContentData, HelpContactItem } from "@/config/site";
import { HandHeart, Megaphone, Plus, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";

interface TabHelpProps {
  data: SiteContentData;
  onChange: (updated: SiteContentData) => void;
}

export function TabHelp({ data, onChange }: TabHelpProps) {
  const helpContacts = data.helpContacts || [];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState<HelpContactItem["icon"]>("bike");

  const startEditContact = (idx: number) => {
    setEditingIndex(idx);
    setTitle(helpContacts[idx].title);
    setIcon(helpContacts[idx].icon);
  };

  const saveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || editingIndex === null) return;

    const updated = [...helpContacts];
    updated[editingIndex] = {
      ...updated[editingIndex],
      title: title.trim(),
      icon,
    };

    onChange({
      ...data,
      helpContacts: updated,
    });
    setEditingIndex(null);
  };

  const updateAdvertisePrice = (type: "advertise" | "umkmAdvertise", price: string) => {
    onChange({
      ...data,
      [type]: {
        ...data[type],
        price,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Bantuan Harian (#bantuan) */}
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line">
          <div className="w-10 h-10 rounded-lg bg-warm-sand/50 text-rosewood flex items-center justify-center">
            <HandHeart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-ink">
              Direktori Bantuan Harian (#bantuan)
            </h2>
            <p className="text-xs text-muted">
              Layanan bantuan operasional harian di rumah yang menghubungkan warga Cipanas dengan pencari jasa.
            </p>
          </div>
        </div>

        {editingIndex !== null && (
          <form onSubmit={saveContact} className="p-4 rounded-xl bg-paper border border-line mb-4 space-y-3">
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
              Edit Layanan Bantuan #{editingIndex + 1}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Deskripsi layanan bantuan..."
                  required
                  className="w-full h-10 px-3 text-xs rounded-lg border border-line bg-white text-ink"
                />
              </div>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value as HelpContactItem["icon"])}
                className="h-10 px-3 text-xs rounded-lg border border-line bg-white text-ink"
              >
                <option value="bike">Ikon: Ojek Perempuan (Motor)</option>
                <option value="sparkles">Ikon: Bersih-bersih</option>
                <option value="baby">Ikon: Nanny / Bayi</option>
                <option value="home">Ikon: ART / Rumah Tangga</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingIndex(null)}
                className="px-3 py-1.5 rounded-md border border-line bg-white text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-md bg-rosewood text-white text-xs font-bold hover:bg-[#9f5d54]"
              >
                Simpan
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {helpContacts.map((contact, idx) => (
            <div
              key={contact.id}
              className="p-4 rounded-xl bg-paper border border-line flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-warm-sand/60 text-rosewood flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-medium text-ink">
                  {contact.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => startEditContact(idx)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-line bg-white hover:bg-paper text-xs font-semibold text-ink transition shrink-0"
              >
                <Edit2 className="w-3.5 h-3.5 text-muted" />
                <span>Ubah</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Ketentuan Tarif Iklan */}
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line">
          <div className="w-10 h-10 rounded-lg bg-warm-sand/50 text-rosewood flex items-center justify-center">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-ink">
              Tarif & Ketentuan Pendaftaran Iklan
            </h2>
            <p className="text-xs text-muted">
              Atur nominal biaya dan judul spanduk pendaftaran iklan untuk direktori dan UMKM.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Iklan Direktori */}
          <div className="p-5 rounded-xl bg-paper border border-line space-y-3">
            <span className="text-[10px] font-bold text-rosewood uppercase tracking-wider">
              Papan Rekomendasi Direktori
            </span>
            <h3 className="font-serif font-bold text-ink text-base">
              Iklan Tempat / Lembaga Komersial
            </h3>
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Biaya Tayang Resmi
              </label>
              <input
                type="text"
                value={data.advertise?.price || ""}
                onChange={(e) => updateAdvertisePrice("advertise", e.target.value)}
                placeholder="Rp 100.000 / Tahun"
                className="w-full h-10 px-3 text-sm rounded-lg border border-line bg-white text-ink font-semibold"
              />
            </div>
            <p className="text-[11px] text-muted">
              Menjangkau para ibu di area Cipanas yang mencari rekomendasi tepercaya.
            </p>
          </div>

          {/* Iklan UMKM */}
          <div className="p-5 rounded-xl bg-paper border border-line space-y-3">
            <span className="text-[10px] font-bold text-rosewood uppercase tracking-wider">
              Etalase Lapak UMKM
            </span>
            <h3 className="font-serif font-bold text-ink text-base">
              Iklan Usaha Milik Ibu (UMKM)
            </h3>
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Biaya Tayang Resmi
              </label>
              <input
                type="text"
                value={data.umkmAdvertise?.price || ""}
                onChange={(e) => updateAdvertisePrice("umkmAdvertise", e.target.value)}
                placeholder="Rp 55.000 / Tahun"
                className="w-full h-10 px-3 text-sm rounded-lg border border-line bg-white text-ink font-semibold"
              />
            </div>
            <p className="text-[11px] text-muted">
              Dukungan khusus untuk menghidupi ekonomi mikro keluarga anggota komunitas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
