export interface NavItem {
  label: string;
  href: string;
}

export interface ClassItem {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: {
    subtitle: string;
    points: string[];
    note: string;
  };
}

export interface DirectoryItem {
  id: string;
  code: string;
  title: string;
  description: string;
  detail: {
    subtitle: string;
    categories: string[];
    note: string;
  };
}

export interface HelpContactItem {
  id: string;
  title: string;
  href: string;
  icon: "bike" | "sparkles" | "baby" | "home";
}

export interface SupportItem {
  title: string;
  description: string;
  ctaText: string;
  href: string;
}

export const siteConfig = {
  name: "Umma Motherhood Cipanas",
  shortName: "Umma",
  tagline: "Ruang tumbuh bersama · Cipanas",
  domain: "ummamotherhood.my.id",
  description:
    "Umma Motherhood Cipanas adalah ruang aman dan suportif bagi para ibu di area Cipanas dan sekitarnya untuk saling merangkul, bertumbuh, dan berdaya bersama.",

  // Semua kontak utama diarahkan ke Umma Shierly (087883370039) & Grup WA resmi
  links: {
    whatsappGroup:
      "https://chat.whatsapp.com/FTkoEa3rXxnHK9gy7wLPYK?s=cl&p=a&iam=2",
    whatsappShierly: "https://wa.me/6287883370039",
    instagram: "https://instagram.com/ummamotherhood",
    volunteerWa:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20tertarik%20untuk%20mendaftar%20sebagai%20Relawan%20di%20Umma%20Motherhood%20Cipanas.",
    donationWa:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20berdonasi%20/%20berbagi%20ilmu%20sebagai%20pengisi%20kelas%20di%20Umma%20Motherhood%20Cipanas.",
    umkmCatalogWa:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20melihat%20katalog%20Lapak%20UMKM%20Umma.",
    umkmRegisterWa:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20mendaftarkan%20usaha%20saya%20ke%20Lapak%20UMKM%20Umma%20Motherhood.",
    whatsappOjek:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20info%20kontak%20Ojek%20Perempuan%20di%20Cipanas.",
    whatsappCleaning:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20info%20Jasa%20Bersih-Bersih%20area%20Cipanas.",
    whatsappNanny:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20membutuhkan%20info%20Nanny%20Harian%20/%20Babysitter%20Infal.",
    whatsappArt:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20info%20kontak%20ART%20panggilan%20paruh%20waktu.",
  },

  nav: [
    { label: "Kelas & Berbagi", href: "#kelas" },
    { label: "Direktori", href: "#direktori" },
    { label: "Bantuan", href: "#bantuan" },
    { label: "Lapak UMKM", href: "#lapak" },
    { label: "Tentang", href: "#tentang" },
    { label: "Dukung", href: "#dukung" },
  ] as NavItem[],

  classes: [
    {
      id: "kelas-profesional",
      number: "01",
      title: "Materi Kelas Profesional",
      description:
        "Akses rangkuman dan materi lengkap dari pakar, praktisi, dan ahli yang mengisi sesi edukasi di komunitas kami.",
      detail: {
        subtitle: "Edukasi Berbobot dari Para Ahli & Praktisi",
        points: [
          "Tumbuh Kembang & Stimulasi Sensori Anak Usia Dini",
          "Nutrisi, MPASI Sehat & Solusi Mengatasi Gerakan Tutup Mulut (GTM)",
          "Kesehatan Mental Ibu & Manajemen Stres Pasca Melahirkan",
          "Pertolongan Pertama Gawat Darurat pada Bayi & Balita di Rumah",
        ],
        note: "Materi dan rangkuman sesi kelas sedang kami siapkan dalam format arsip digital. Hubungi Umma Shierly untuk informasi jadwal kelas terdekat.",
      },
    },
    {
      id: "arsip-diskusi",
      number: "02",
      title: "Arsip Diskusi Umma",
      description:
        "Rangkuman rapi dari sesi tanya-jawab dan diskusi grup WhatsApp agar wawasan berharga tidak tenggelam di ruang obrolan.",
      detail: {
        subtitle: "Intisari Tanya Jawab Grup WhatsApp Komunitas",
        points: [
          "Tanya Jawab Seputar Menyusui, Pelekatan & Manajemen ASI Perah",
          "Tips Mengatasi Tantrum Anak dengan Welas Asih",
          "Rekomendasi Solusi Masalah Harian yang Sudah Teruji Sesama Ibu",
          "Kiat Menjaga Keharmonisan Keluarga di Tengah Rutinitas Mengasuh",
        ],
        note: "Rangkuman obrolan mingguan grup WhatsApp sedang dalam proses kurasi tim agar rapi dan mudah dicari oleh anggota baru.",
      },
    },
    {
      id: "ruang-berbagi",
      number: "03",
      title: "Ruang Berbagi Sesama Ibu",
      description:
        "Artikel, tips praktis, dan pengalaman berharga yang ditulis langsung oleh anggota. Setiap tulisan akan mencantumkan nama penulis sebagai apresiasi.",
      detail: {
        subtitle: "Catatan & Tips Praktis Tulisan Asli Anggota Komunitas",
        points: [
          "Kisah Perjalanan & Suka Duka Menjadi Ibu Baru di Area Cipanas",
          "Resep Masakan Rumahan Favorit Balita yang Praktis dan Bergizi",
          "Tips Manajemen Waktu bagi Ibu Bekerja & Ibu Rumah Tangga",
          "Rekomendasi Aktivitas Bermain Bersama Anak di Rumah",
        ],
        note: "Punya pengalaman atau tulisan bermanfaat yang ingin dibagikan ke sesama ibu? Kirimkan tulisan Anda langsung ke Umma Shierly untuk dipublikasikan di halaman ini.",
      },
    },
  ] as ClassItem[],

  directory: [
    {
      id: "kesehatan",
      code: "A.",
      title: "Fasilitas Kesehatan",
      description:
        "Jadwal praktik dokter spesialis anak, obgyn, bidan, dan klinik terdekat.",
      detail: {
        subtitle: "Kurasi Layanan Medis Ibu & Anak di Cipanas & Sekitarnya",
        categories: [
          "Dokter Spesialis Anak (Sp.A) Terpercaya & Ramah Anak",
          "Dokter Spesialis Kandungan & Kebidanan (Sp.OG)",
          "Praktik Mandiri Bidan & Konselor Menyusui",
          "Klinik 24 Jam, Puskesmas, dan Apotek Lengkap di Cipanas",
        ],
        note: "Daftar kontak dan jadwal praktik dokter sedang dalam kurasi komunitas. Silakan hubungi Umma Shierly via WhatsApp jika Anda memerlukan rekomendasi darurat sekarang.",
      },
    },
    {
      id: "pendidikan",
      code: "B.",
      title: "Pendidikan & Anak",
      description:
        "Daftar sekolah, daycare, serta rekomendasi kegiatan atau stimulasi anak di area sekitar.",
      detail: {
        subtitle: "Pilihan Sekolah, Daycare & Stimulasi Ramah Anak",
        categories: [
          "Daycare & Tempat Penitipan Anak yang Aman & Terverifikasi",
          "PAUD, Kelompok Bermain (KB) & TK Berkualitas di Cipanas",
          "Tempat Kursus / Stimulasi Minat, Bakat, dan Motorik Anak",
          "Area Terbuka Hijau & Rekomendasi Tempat Main Edukatif",
        ],
        note: "Daftar direktori pendidikan sedang disusun bersama para wali murid. Hubungi Umma Shierly untuk mendapatkan rekomendasi dan ulasan pengalaman langsung.",
      },
    },
    {
      id: "kebutuhan",
      code: "C.",
      title: "Kebutuhan Harian",
      description:
        "Rekomendasi tempat belanja bulanan ternyaman, toko perlengkapan bayi tepercaya, dan vendor katering keluarga.",
      detail: {
        subtitle: "Rekomendasi Belanja & Kebutuhan Rumah Tangga",
        categories: [
          "Toko Perlengkapan Bayi & Balita Paling Lengkap di Cipanas",
          "Pasar & Supermarket Belanja Bulanan Ternyaman",
          "Katering Makanan Sehat Keluarga & Menu MPASI Harian",
          "Penyewaan Mainan & Perlengkapan Bayi",
        ],
        note: "Daftar vendor tepercaya sedang dalam tahap kurasi. Anda juga bisa merekomendasikan tempat langganan Anda ke Umma Shierly untuk dimasukkan ke direktori ini.",
      },
    },
  ] as DirectoryItem[],

  helpContacts: [
    {
      id: "ojek",
      title: "Ojek Perempuan untuk mobilitas ibu dan anak yang lebih aman.",
      href: "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20info%20kontak%20Ojek%20Perempuan%20di%20Cipanas.",
      icon: "bike",
    },
    {
      id: "cleaning",
      title: "Jasa Bersih-Bersih (panggilan area Cipanas).",
      href: "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20info%20Jasa%20Bersih-Bersih%20area%20Cipanas.",
      icon: "sparkles",
    },
    {
      id: "nanny",
      title: "Nanny Harian dan Babysitter Infal.",
      href: "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20membutuhkan%20info%20Nanny%20Harian%20/%20Babysitter%20Infal.",
      icon: "baby",
    },
    {
      id: "art",
      title: "Asisten Rumah Tangga (ART) panggilan atau paruh waktu.",
      href: "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20info%20kontak%20ART%20panggilan%20paruh%20waktu.",
      icon: "home",
    },
  ] as HelpContactItem[],

  founder: {
    name: "Shierly",
    role: "Founder Umma Motherhood Cipanas",
    story:
      "Halo, saya Shierly. Berawal dari keinginan menciptakan support system yang solid untuk sesama ibu, saya mendirikan komunitas ini pada tahun 2024. Sebagai pendidik yang juga berkecimpung di dunia parenting dan literasi, saya menyadari betapa pentingnya akses edukasi dan lingkungan yang saling menguatkan bagi seorang ibu. Halaman ini bukan sekadar tentang saya, melainkan tentang dedikasi untuk memastikan tidak ada ibu di Cipanas yang merasa berjuang sendirian.",
  },

  supportItems: [
    {
      title: "Pendaftaran Relawan",
      description:
        "Ingin berkontribusi memajukan komunitas? Kami membuka kesempatan bagi yang ingin mengabdi sebagai Admin Website, Admin Media Sosial, atau Admin Grup.",
      ctaText: "Daftar Jadi Relawan",
      href: "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20tertarik%20untuk%20mendaftar%20sebagai%20Relawan%20di%20Umma%20Motherhood%20Cipanas.",
    },
    {
      title: "Ruang Donasi & Pengisi Kelas",
      description:
        "Dukung operasional website dan penyelenggaraan kelas edukasi ibu di Cipanas. Anda bisa berdonasi dalam bentuk dana operasional, atau berdonasi 'Ilmu' dengan mendaftar sebagai pengisi kelas.",
      ctaText: "Donasi / Jadi Pengisi Kelas",
      href: "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20berdonasi%20/%20berbagi%20ilmu%20sebagai%20pengisi%20kelas%20di%20Umma%20Motherhood%20Cipanas.",
    },
  ] as SupportItem[],
};
