export interface NavItem {
  label: string;
  href: string;
}

export interface ClassItem {
  number: string;
  title: string;
  description: string;
}

export interface DirectoryItem {
  code: string;
  title: string;
  description: string;
  href: string;
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
}

export const siteConfig = {
  name: "Umma Motherhood Cipanas",
  shortName: "Umma",
  tagline: "Ruang tumbuh bersama · Cipanas",
  domain: "ummamotherhood.my.id",
  description:
    "Umma Motherhood Cipanas adalah ruang aman dan suportif bagi para ibu di area Cipanas dan sekitarnya untuk saling merangkul, bertumbuh, dan berdaya bersama.",
  
  // Kontak dan tautan eksternal (ubah sesuai data asli)
  links: {
    whatsappGroup: "https://chat.whatsapp.com/invite-placeholder",
    instagram: "https://instagram.com/ummamotherhood",
    volunteerForm: "https://forms.gle/volunteer-placeholder",
    donationForm: "https://forms.gle/donation-placeholder",
    umkmCatalog: "#lapak",
    umkmRegister: "https://forms.gle/umkm-register-placeholder",
    directoryHealth: "#direktori",
    directoryEducation: "#direktori",
    directoryDaily: "#direktori",
    whatsappOjek: "https://wa.me/6280000000000?text=Halo%20Ojek%20Perempuan",
    whatsappCleaning: "https://wa.me/6280000000000?text=Halo%20Jasa%20Bersih-Bersih",
    whatsappNanny: "https://wa.me/6280000000000?text=Halo%20Nanny%20dan%20Babysitter",
    whatsappArt: "https://wa.me/6280000000000?text=Halo%20ART%20Panggilan",
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
      number: "01",
      title: "Materi Kelas Profesional",
      description:
        "Akses rangkuman dan materi lengkap dari pakar, praktisi, dan ahli yang mengisi sesi edukasi di komunitas kami.",
    },
    {
      number: "02",
      title: "Arsip Diskusi Umma",
      description:
        "Rangkuman rapi dari sesi tanya-jawab dan diskusi grup WhatsApp agar wawasan berharga tidak tenggelam di ruang obrolan.",
    },
    {
      number: "03",
      title: "Ruang Berbagi Sesama Ibu",
      description:
        "Artikel, tips praktis, dan pengalaman berharga yang ditulis langsung oleh anggota. Setiap tulisan akan mencantumkan nama penulis sebagai bentuk apresiasi atas ilmu yang dibagikan.",
    },
  ] as ClassItem[],

  directory: [
    {
      code: "A.",
      title: "Fasilitas Kesehatan",
      description:
        "Jadwal praktik dokter spesialis anak, obgyn, bidan, dan klinik terdekat.",
      href: "#direktori",
    },
    {
      code: "B.",
      title: "Pendidikan & Anak",
      description:
        "Daftar sekolah, daycare, serta rekomendasi kegiatan atau stimulasi anak di area sekitar.",
      href: "#direktori",
    },
    {
      code: "C.",
      title: "Kebutuhan Harian",
      description:
        "Rekomendasi tempat belanja bulanan ternyaman, toko perlengkapan bayi tepercaya, dan vendor katering keluarga.",
      href: "#direktori",
    },
  ] as DirectoryItem[],

  helpContacts: [
    {
      id: "ojek",
      title: "Ojek Perempuan untuk mobilitas ibu dan anak yang lebih aman.",
      href: "https://wa.me/6280000000000?text=Halo%20Ojek%20Perempuan",
      icon: "bike",
    },
    {
      id: "cleaning",
      title: "Jasa Bersih-Bersih (panggilan area Cipanas).",
      href: "https://wa.me/6280000000000?text=Halo%20Jasa%20Bersih-Bersih",
      icon: "sparkles",
    },
    {
      id: "nanny",
      title: "Nanny Harian dan Babysitter Infal.",
      href: "https://wa.me/6280000000000?text=Halo%20Nanny%20dan%20Babysitter",
      icon: "baby",
    },
    {
      id: "art",
      title: "Asisten Rumah Tangga (ART) panggilan atau paruh waktu.",
      href: "https://wa.me/6280000000000?text=Halo%20ART%20Panggilan",
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
    },
    {
      title: "Ruang Donasi",
      description:
        "Dukung operasional website dan penyelenggaraan kelas edukasi ibu di Cipanas. Anda bisa berdonasi dalam bentuk dana operasional, atau berdonasi 'Ilmu' dengan mendaftar sebagai pengisi kelas.",
    },
  ] as SupportItem[],
};
