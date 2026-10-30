# Umma Motherhood Cipanas 🌸

Website resmi komunitas **Umma Motherhood Cipanas** — ruang aman dan suportif bagi para ibu di area Cipanas dan sekitarnya untuk saling merangkul, bertumbuh, dan berdaya bersama.

Dibuat menggunakan **Next.js (App Router)**, **Tailwind CSS**, dan **TypeScript**, serta siap di-deploy langsung ke **GitHub Pages** (atau Vercel/Netlify).

---

## ✨ Fitur Utama

- **Desain Estetik & Hangat**: Mengikuti identitas visual Umma Motherhood dengan warna earthy (*paper*, *clay*, *moss*, *ink*) dan tipografi elegan (*Lora* & *Caveat*).
- **Responsif Penuh**: Tampilan optimal untuk smartphone, tablet, maupun layar desktop.
- **Konfigurasi Terpusat (`src/config/site.ts`)**: Semua tautan WhatsApp, formulir pendaftaran, media sosial, dan data direktori dapat diubah dengan mudah di satu file tanpa perlu mengedit kode HTML/JSX.
- **Static Site Generation (SSG)**: Diekspor menjadi file HTML statis (`output: 'export'`) sehingga dapat di-host secara gratis di GitHub Pages dengan kecepatan maksimal.
- **Automated CI/CD**: Dilengkapi workflow GitHub Actions (`.github/workflows/deploy.yml`) untuk build dan deploy otomatis setiap kali melakukan `git push`.

---

## 📁 Struktur Direktori

```text
motherhood/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD otomatis untuk GitHub Pages
├── public/
│   ├── .nojekyll             # Mencegah GitHub Pages memblokir aset _next
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind CSS & tema warna
│   │   ├── layout.tsx        # Root layout, Google Fonts (Lora, Caveat) & Metadata
│   │   └── page.tsx          # Halaman utama landing page
│   ├── components/
│   │   ├── Navbar.tsx        # Navigasi sticky & menu seluler responsif
│   │   ├── Hero.tsx          # Bagian pembuka & tombol CTA
│   │   ├── ClassesSection.tsx# 01 / Belajar & berbagi
│   │   ├── DirectorySection.tsx # 02 / Direktori Rekomendasi Cipanas
│   │   ├── HelpSection.tsx   # 03 / Kontak Bantuan & Darurat Ibu
│   │   ├── MarketSection.tsx # 04 / Lapak UMKM Umma
│   │   ├── ComingSoonSection.tsx # Agenda Playdate & Meet Up
│   │   ├── FounderSection.tsx# 05 / Tentang Founder & tanda tangan
│   │   ├── SupportSection.tsx# 06 / Dukungan & Kolaborasi
│   │   └── Footer.tsx        # Footer & tautan komunitas
│   └── config/
│       └── site.ts           # Data teks & tautan (WhatsApp, medsos, form)
├── next.config.ts            # Konfigurasi export statis Next.js
└── package.json
```

---

## 🛠️ Menjalankan di Lokal

### 1. Prasyarat
Pastikan sudah terinstal **Node.js** (v18 ke atas) dan **npm**.

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 4. Build Statis (Uji Coba Export)
```bash
npm run build
```
Hasil build statis akan tersimpan di direktori `out/`.

---

## 🚀 Panduan Deploy ke GitHub Pages

### Langkah 1: Buat Repositori Baru di GitHub
1. Buka [github.com/new](https://github.com/new).
2. Beri nama repositori, misalnya `motherhood` atau `umma-motherhood`.
3. Pilih visibilitas **Public**.
4. Klik **Create repository**.

### Langkah 2: Hubungkan & Push Kode
Jalankan perintah berikut di terminal folder ini:

```bash
git add .
git commit -m "feat: inisialisasi landing page Umma Motherhood dengan Next.js dan Tailwind"
git branch -M main
git remote add origin https://github.com/<USERNAME-ANDA>/<NAMA-REPO>.git
git push -u origin main
```
*(Ganti `<USERNAME-ANDA>` dan `<NAMA-REPO>` dengan info repositori GitHub Anda)*

### Langkah 3: Aktifkan GitHub Pages melalui GitHub Actions
1. Di halaman repositori GitHub Anda, klik tab **Settings**.
2. Di menu sebelah kiri, pilih **Pages**.
3. Pada bagian **Build and deployment** -> **Source**, pilih **GitHub Actions**.
4. Workflow `.github/workflows/deploy.yml` akan otomatis berjalan dan mendeploy website Anda.
5. Setelah beberapa menit, URL website Anda akan muncul di tab Pages (misalnya: `https://<USERNAME>.github.io/<NAMA-REPO>/`).

### Menghubungkan Custom Domain (`ummamotherhood.my.id`)
Jika ingin menggunakan domain sendiri:
1. Di menu **Settings** -> **Pages**, isi kolom **Custom domain** dengan `ummamotherhood.my.id`.
2. Centang **Enforce HTTPS**.
3. Tambahkan DNS record di penyedia domain Anda:
   - Tipe `CNAME` ke `<USERNAME>.github.io`, atau
   - Tipe `A` ke IP GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153).

---

## ✏️ Mengubah Konten & Link WhatsApp

Buka file **`src/config/site.ts`**:
```typescript
export const siteConfig = {
  links: {
    whatsappGroup: "https://chat.whatsapp.com/...", // Link grup WA Anda
    instagram: "https://instagram.com/...",         // Akun Instagram
    volunteerForm: "https://forms.gle/...",        // Form relawan
    ...
  }
}
```
Cukup ubah link atau teks di file tersebut, lalu jalankan `git push`. GitHub Actions akan otomatis memperbarui tampilan website Anda!
