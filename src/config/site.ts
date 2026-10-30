export interface NavItem {
  label: string;
  href: string;
}

export interface UmkmItem {
  id: string;
  name: string;
  category: "semua" | "toserba" | "busana" | "kuliner" | "bayi" | "kriya" | "jasa";
  categoryLabel: string;
  owner: string;
  priceRange: string;
  location: string;
  description: string;
  waMessage: string;
}

export interface ClassEventInfo {
  name: string;
  speaker: string;
  date: string;
  materiStatus: string;
  slug?: string;
}

export interface ClassArticleInfo {
  title: string;
  date: string;
  author: string;
  url: string;
  excerpt?: string;
  slug?: string;
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
    isEmpty?: boolean;
    classEvent?: ClassEventInfo;
    articles?: ClassArticleInfo[];
    archiveUrl?: string;
  };
}

export interface ArticleOutsideReference {
  platform: string;
  url: string;
  description: string;
  buttonLabel: string;
}

export interface CommunityArticle {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorRole?: string;
  authorInstagram?: string;
  date: string;
  readingTime?: string;
  category: "ruang-berbagi" | "kelas-profesional" | "arsip-diskusi";
  categoryLabel: string;
  tags: string[];
  excerpt: string;
  overviewParagraphs?: string[];
  keyTakeaways?: string[];
  quote?: string;
  outsideReference?: ArticleOutsideReference;
  url?: string;
  isExternal?: boolean;
  eventDate?: string;
  speaker?: string;
  status: "published" | "coming-soon" | "empty";
  materiStatus?: string;
}

export interface PlaceReview {
  author: string;
  text: string;
  rating?: number;
}

export interface PlaceContact {
  person: string;
  phone: string;
}

export interface DirectoryPlaceItem {
  id: string;
  name: string;
  categoryTag: string;
  description: string;
  address: string;
  schedule?: string;
  review: PlaceReview;
  contact: PlaceContact;
  waMessage: string;
  image?: string;
}

export interface DirectorySubgroup {
  title: string;
  places: DirectoryPlaceItem[];
}

export interface DirectoryItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  subgroups: DirectorySubgroup[];
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
    instagram: "https://www.instagram.com/lindashirlyv/",
    volunteerWa:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20tertarik%20untuk%20mendaftar%20sebagai%20Relawan%20di%20Umma%20Motherhood%20Cipanas.",
    donationWa:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20berdonasi%20/%20berbagi%20ilmu%20sebagai%20pengisi%20kelas%20di%20Umma%20Motherhood%20Cipanas.",
    umkmCatalogWa:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20melihat%20katalog%20Lapak%20UMKM%20Umma.",
    umkmRegisterWa:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20mendaftarkan%20usaha%20saya%20ke%20Lapak%20UMKM%20Umma%20Motherhood.",
    advertiseWa:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20tertarik%20untuk%20mendaftarkan%20iklan%20bisnis/lembaga%20saya%20di%20Papan%20Rekomendasi%20Umma%20Motherhood%20Cipanas.",
    helpAdvertiseWa:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20mendaftarkan%20jasa%20harian%20saya%20di%20Direktori%20Bantuan%20Umma%20Motherhood%20Cipanas.",
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
    { label: "Kelas & Berbagi", href: "/#kelas" },
    { label: "Direktori", href: "/#direktori" },
    { label: "Bantuan", href: "/#bantuan" },
    { label: "Lapak UMKM", href: "/umkm/" },
    { label: "Tentang", href: "/#tentang" },
    { label: "Dukung", href: "/#dukung" },
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
        classEvent: {
          name: "Online Montessori Class with Hasna",
          speaker: "Hasna",
          date: "07 November 2026",
          materiStatus: "Coming Soon",
          slug: "online-montessori-class-hasna",
        },
        points: [
          "Online Montessori Class with Hasna — 07 Nov 2026",
          "Materi Sesi: Coming Soon",
          "Edukasi stimulasi sensori & kemandirian anak usia dini",
          "Panduan praktis pengasuhan Montessori aplikatif di rumah",
        ],
        note: "Kelas interaktif terdekat: Online Montessori Class with Hasna pada 07 November 2026. Materi dan rangkuman akan diarsipkan setelah kelas selesai. Hubungi Umma Shierly untuk pendaftaran.",
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
        isEmpty: true,
        points: [],
        note: "Saat ini arsip tanya-jawab WhatsApp masih kosong. Tim kurasi komunitas sedang merangkum diskusi berbobot agar ilmu dan tips bermanfaat tidak tenggelam di ruang obrolan.",
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
        articles: [
          {
            title: "Ikhtiar Menjaga Keutuhan Cinta Saat Keluarga Bertumbuh",
            date: "01 September 2026",
            author: "Shierly",
            slug: "ikhtiar-menjaga-keutuhan-cinta",
            url: "https://shirlyv.github.io/2026/09/01/Ikhtiar-Menjaga-Keutuhan-Cinta-Saat-Keluarga-Bertumbuh/",
            excerpt:
              "Refleksi mendalam dan ikhtiar merawat rasa cinta, komunikasi pasangan, serta keharmonisan rumah tangga saat kehadiran buah hati menuntut adaptasi peran yang luar biasa.",
          },
          {
            title: "Warisan Cinta untuk Masa Pubertas",
            date: "02 Agustus 2026",
            author: "Shierly",
            slug: "warisan-cinta-untuk-masa-pubertas",
            url: "https://shirlyv.github.io/2026/08/02/Warisan-Cinta-untuk-Masa-Pubertas/",
            excerpt:
              "Bekal cinta, pemahaman emosional, dan komunikasi terbuka bagi orang tua dalam mendampingi anak menyongsong masa akil baligh dan fase pubertas dengan tenang.",
          },
        ],
        archiveUrl: "https://shirlyv.github.io/archive/?tag=journal-umma",
        points: [
          "Ikhtiar Menjaga Keutuhan Cinta Saat Keluarga Bertumbuh (Oleh Shierly)",
          "Warisan Cinta untuk Masa Pubertas (Oleh Shierly)",
          "Koleksi Lengkap Arsip Journal Umma di Blog",
        ],
        note: "Artikel di atas merupakan karya asli yang ditulis oleh Shierly di Journal Umma. Anggota komunitas yang ingin berbagi tulisan dan pengalaman parenting juga dapat mengirimkan naskah ke Umma Shierly.",
      },
    },
  ] as ClassItem[],

  directory: [
    {
      id: "kesehatan",
      code: "A.",
      title: "Fasilitas Kesehatan",
      subtitle: "Dokter Spesialis Anak & Bidan",
      description:
        "Jadwal praktik dokter spesialis anak, obgyn, bidan, dan klinik terdekat di Cipanas dan sekitarnya.",
      subgroups: [
        {
          title: "Dokter Spesialis Anak & Bidan Rekomendasi",
          places: [
            {
              id: "dr-nina",
              name: "Dr. Nina Apotek Panca Farma",
              categoryTag: "Dokter Spesialis Anak",
              description:
                "Dokter Nina merupakan salah satu dokter spesialis anak yang berpraktik di Apotek Panca Farma, Cipanas. Beliau dikenal memiliki pendekatan yang ramah dan sabar saat memeriksa anak-anak, sehingga si kecil tidak mudah rewel. Ruang tunggunya cukup memadai bagi ibu dan anak yang sedang menunggu antrean pemeriksaan. Penjelasan yang diberikan mengenai kondisi kesehatan anak maupun resep obat selalu mudah dipahami oleh para orang tua. Jadwal praktiknya sangat bisa diandalkan untuk kebutuhan konsultasi rutin maupun penanganan sakit anak di area sekitar.",
              address: "Apotek Panca Farma, Jl. Raya Cipanas No. 12, Cipanas, Cianjur",
              schedule: "Praktik Sore: Senin – Sabtu (17.00 – 20.00 WIB)",
              review: {
                author: "Ibu Riana (Anggota Umma Cipanas)",
                text: "Dokter Nina sangat ramah dan sabar saat memeriksa si kecil, penjelasannya detail dan resepnya sangat cocok. Tidak terburu-buru saat konsultasi.",
                rating: 5,
              },
              contact: {
                person: "Admin Apotek Panca Farma / Janji Temu",
                phone: "087883370039 (via Umma Shierly)",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin meminta info kontak & jadwal praktik Dr. Nina di Apotek Panca Farma Cipanas.",
            },
            {
              id: "dr-abdurahman",
              name: "Dr. Abdurahman Apotek Ikana",
              categoryTag: "Dokter Spesialis Anak",
              description:
                "Praktik Dokter Abdurahman di Apotek Ikana menjadi pilihan tepercaya bagi banyak ibu di Cipanas untuk memeriksakan kesehatan buah hati. Beliau sangat teliti dalam mendiagnosis keluhan penyakit anak dan memberikan penanganan medis yang tepat sasaran. Lokasi praktiknya yang menyatu dengan apotek memudahkan orang tua untuk langsung menebus resep obat setelah sesi konsultasi selesai. Beliau juga terbuka untuk berdiskusi mengenai tumbuh kembang anak dan jadwal imunisasi dasar. Kehadirannya memberikan ketenangan bagi warga lokal yang membutuhkan akses layanan kesehatan anak yang cepat.",
              address: "Apotek Ikana, Jl. Raya Cipanas, Cipanas, Cianjur",
              schedule: "Praktik Sore: Senin – Jumat (Janji Temu & Konsultasi)",
              review: {
                author: "Ibu Maya (Ibu 2 Anak, Cipanas)",
                text: "Dokter Abdurahman sangat teliti mendiagnosis sakit anak. Tempatnya nyaman menyatu dengan apotek, obat langsung siap diambil.",
                rating: 5,
              },
              contact: {
                person: "Admin Apotek Ikana Cipanas",
                phone: "087883370039 (via Umma Shierly)",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin meminta info kontak & jadwal praktik Dr. Abdurahman di Apotek Ikana Cipanas.",
            },
            {
              id: "bidan-silvia",
              name: "Bidan Silvia Meilia A.Md di Praktek Bidan Mia Tarigu",
              categoryTag: "Bidan & Kesehatan Ibu-Anak",
              description:
                "Bidan Silvia Meilia menawarkan layanan kebidanan dan kesehatan ibu anak yang penuh kehangatan di Praktek Bidan Mia Tarigu. Pendekatannya yang personal dan kekeluargaan membuat para ibu merasa nyaman saat berkonsultasi mengenai kehamilan maupun pascapersalinan. Fasilitas praktiknya tertata rapi, bersih, dan mendukung kelancaran proses pemeriksaan kehamilan rutin. Beliau juga telaten dalam memberikan edukasi seputar ASI eksklusif dan perawatan bayi baru lahir bagi ibu baru. Keahliannya sangat membantu memastikan kesehatan ibu dan bayi di area Cipanas tetap terpantau dengan aman.",
              address: "Praktek Bidan Mia Tarigu, Cipanas, Cianjur",
              schedule: "Pemeriksaan Kehamilan, Nifas & Imunisasi Setiap Hari",
              review: {
                author: "Ibu Dinda (Ibu Baru, Cipanas)",
                text: "Bidan Silvia sangat hangat dan kebapakan/keibuan sekali. Konsultasi seputar menyusui dan perawatan bayi baru lahir sangat menenangkan.",
                rating: 5,
              },
              contact: {
                person: "Bidan Silvia Meilia A.Md",
                phone: "087883370039 (via Umma Shierly)",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin meminta info kontak Bidan Silvia Meilia di Praktek Bidan Mia Tarigu Cipanas.",
            },
          ],
        },
      ],
    },
    {
      id: "pendidikan",
      code: "B.",
      title: "Pendidikan & Anak",
      subtitle: "Kegiatan Informal, Pop Up Class & Olahraga",
      description:
        "Daftar wadah belajar anak, pop up class stimulasi, serta komunitas olahraga seru di area sekitar.",
      subgroups: [
        {
          title: "Kegiatan Informal & Pop Up Class",
          places: [
            {
              id: "artima-edu",
              name: "Artima Edu",
              categoryTag: "Coding & English (Online)",
              description:
                "Artima Edu adalah inisiatif pendidikan inovatif yang dikelola langsung oleh Founder Umma Motherhood, Shierly, dan beroperasi sepenuhnya secara online. Layanan daring ini berfokus pada kelas coding anak menggunakan logika pemrograman visual, serta instruksi bahasa Inggris yang interaktif. Selain untuk anak-anak, tersedia juga program edukasi untuk mendukung keterampilan para ibu yang dapat diakses dari rumah. Pendekatannya sangat modern karena menggabungkan teknologi digital dengan metode belajar jarak jauh yang menyenangkan. Kehadiran layanan online ini memudahkan orang tua untuk memberikan stimulasi pendidikan berkualitas tanpa batasan ruang.",
              address: "Layanan Daring / Online (Berpusat di Cipanas)",
              schedule: "Kelas Akhir Pekan & Sore Hari (Jadwal Fleksibel)",
              review: {
                author: "Ibu Sarah (Cipanas)",
                text: "Anak saya sangat senang belajar coding di Artima Edu! Metode visualnya mudah dicerna anak dan bahasa Inggrisnya sangat aplikatif.",
                rating: 5,
              },
              contact: {
                person: "Umma Shierly (Founder Artima Edu)",
                phone: "087883370039",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin informasi pendaftaran dan jadwal kelas di Artima Edu.",
            },
            {
              id: "tiny-roots",
              name: "Tiny Roots",
              categoryTag: "Pop Up Class & Sensori Motorik",
              description:
                "Tiny Roots merupakan wadah eksplorasi seru bagi anak-anak untuk mengembangkan kreativitas melalui kegiatan pop up class tatap muka. Program ini sering menghadirkan aktivitas sensorik dan motorik yang dirancang khusus untuk menstimulasi tumbuh kembang anak usia dini. Anak-anak diajak untuk bermain sambil belajar di lingkungan yang aman, menyenangkan, dan penuh warna. Setiap sesinya dipandu oleh fasilitator yang memahami kebutuhan psikologis serta tahap perkembangan anak balita. Kelas ini sangat cocok bagi ibu yang ingin memberikan variasi kegiatan edukatif akhir pekan di sekitar Cipanas.",
              address: "Lokasi Berpindah / Pop-up Area Cipanas & Sekitarnya",
              schedule: "Sesi Tematik Akhir Pekan (Sabtu & Minggu Berjadwal)",
              review: {
                author: "Ibu Kartika (Anggota Komunitas Umma)",
                text: "Kegiatan sensori motoriknya seru banget buat balita. Fasilitatornya ramah dan terlatih menghadapi anak yang aktif bereksplorasi.",
                rating: 5,
              },
              contact: {
                person: "Tim Fasilitator Tiny Roots",
                phone: "087883370039 (via Umma Shierly)",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin info jadwal pop up class Tiny Roots Cipanas terdekat.",
            },
            {
              id: "batutta",
              name: "Batutta",
              categoryTag: "Pendidikan Anak Informal & Praktik Nyata",
              description:
                "Batutta hadir sebagai penyelenggara kegiatan pendidikan anak informal yang mengedepankan pengalaman belajar langsung melalui praktik nyata. Berbagai tema pop up class yang diselenggarakan bertujuan untuk mengasah rasa ingin tahu dan kemandirian anak sedini mungkin. Lingkungan belajarnya dikemas dengan sangat santai agar anak tidak merasa terbebani seperti dalam sistem sekolah formal. Anak-anak bisa leluasa bereksplorasi, bersosialisasi dengan teman sebaya, dan membangun rasa percaya diri mereka di ruang publik. Kehadiran komunitas belajar ini menjadi angin segar bagi opsi aktivitas edukasi interaktif di wilayah Cipanas.",
              address: "Area Publik & Outdoor Cipanas, Cianjur",
              schedule: "Sesi Belajar Tematik Akhir Pekan",
              review: {
                author: "Ibu Nadia (Warga Cipanas)",
                text: "Pengalaman belajar langsungnya membentuk kemandirian dan rasa ingin tahu anak. Belajar di luar ruang kelas membuat anak tidak jenuh.",
                rating: 5,
              },
              contact: {
                person: "Koordinator Batutta Cipanas",
                phone: "087883370039 (via Umma Shierly)",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin info kegiatan dan jadwal kelas Batutta Cipanas.",
            },
          ],
        },
        {
          title: "Kegiatan Olahraga Anak",
          places: [
            {
              id: "push-bike",
              name: "Push Bike Cipanas",
              categoryTag: "Komunitas Sepeda Keseimbangan Balita",
              description:
                "Push Bike Cipanas adalah komunitas olahraga sepeda tanpa pedal yang sangat menyenangkan dan ramah bagi anak usia balita. Kegiatan ini sangat efektif untuk melatih keseimbangan, koordinasi motorik kasar, serta kelincahan anak sejak dini. Latihan rutin dilakukan di area yang aman dengan pengawasan langsung dari pelatih atau pendamping yang berpengalaman. Aktivitas fisik ini juga melatih mental keberanian dan sportivitas anak saat berinteraksi dengan teman-temannya di lintasan. Orang tua bisa menjadikan ajang ini sebagai momen bonding yang seru di sore hari atau akhir pekan.",
              address: "Lintasan Latihan Aman Cipanas, Cianjur",
              schedule: "Latihan Rutin: Sore Hari & Akhir Pekan",
              review: {
                author: "Ibu Farah (Cipanas)",
                text: "Olahraga sepeda keseimbangan ini terbukti melatih keberanian dan koordinasi motorik kasar si kecil. Teman-temannya banyak dan seru!",
                rating: 5,
              },
              contact: {
                person: "Pengurus Push Bike Cipanas",
                phone: "087883370039 (via Umma Shierly)",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin info bergabung dan jadwal latihan Push Bike Cipanas.",
            },
            {
              id: "dojo-katana",
              name: "Dojo Katana Karate Kids",
              categoryTag: "Bela Diri Karate Anak",
              description:
                "Dojo Katana Karate Kids menawarkan kelas bela diri karate yang dirancang khusus dengan pendekatan yang aman bagi anak-anak. Melalui latihan yang disiplin namun menyenangkan, anak-anak diajarkan teknik dasar perlindungan diri sekaligus melatih fokus konsentrasi. Para pelatih di sini sabar dalam membimbing karakter anak agar tumbuh menjadi individu yang tangguh, tangkas, dan santun. Olahraga ini sangat baik untuk menyalurkan energi aktif anak-anak ke arah yang positif dan terstruktur rapi. Ini adalah pilihan tepat bagi ibu yang ingin menanamkan nilai kedisiplinan dan kebugaran fisik pada buah hatinya.",
              address: "Dojo Katana Cipanas, Cianjur",
              schedule: "Sesi Latihan: Sore Hari (2x Seminggu)",
              review: {
                author: "Ibu Wulan (Cipanas)",
                text: "Anak saya jadi lebih disiplin, percaya diri, dan bisa menyalurkan energinya dengan sehat. Pelatihnya sabar dan berdedikasi.",
                rating: 5,
              },
              contact: {
                person: "Sensei / Pelatih Dojo Katana",
                phone: "087883370039 (via Umma Shierly)",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin info pendaftaran kelas Dojo Katana Karate Kids Cipanas.",
            },
            {
              id: "cipanas-archery",
              name: "Cipanas Archery",
              categoryTag: "Olahraga Panahan Anak & Remaja",
              description:
                "Cipanas Archery menyediakan fasilitas olahraga panahan yang melatih ketangkasan dan fokus pikiran bagi anak-anak maupun remaja. Kegiatan memanah ini sangat bermanfaat untuk melatih kesabaran, postur tubuh yang tegak, serta ketajaman mata. Fasilitas yang disediakan cukup memadai dan aman karena dipandu langsung oleh instruktur panahan yang terlatih. Anak-anak akan diajarkan teknik memegang busur dan melepaskan anak panah dengan presisi dalam suasana yang bersahabat. Olahraga ini bisa menjadi alternatif kegiatan fisik yang unik dan minim kontak tubuh di area Cipanas.",
              address: "Fasilitas Lapangan Panahan Cipanas, Cianjur",
              schedule: "Kelas Pemula & Latihan Terbuka Akhir Pekan",
              review: {
                author: "Ibu Ratna (Cipanas)",
                text: "Panahan sangat bagus untuk melatih ketenangan dan fokus konsentrasi anak. Fasilitasnya aman dan instrukturnya sabar membimbing.",
                rating: 5,
              },
              contact: {
                person: "Instruktur Cipanas Archery",
                phone: "087883370039 (via Umma Shierly)",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin info latihan panahan di Cipanas Archery.",
            },
          ],
        },
      ],
    },
    {
      id: "kebutuhan",
      code: "C.",
      title: "Kebutuhan Harian",
      subtitle: "Belanja & Katering Keluarga",
      description:
        "Rekomendasi tempat belanja bulanan ternyaman, toko perlengkapan bayi tepercaya, dan vendor katering keluarga.",
      subgroups: [
        {
          title: "Belanja & Katering Keluarga",
          places: [
            {
              id: "shierenity-scribe",
              name: "Shierenity Scribe",
              categoryTag: "Distributor Pakaian Bayi & Anak (Online)",
              description:
                "Shierenity Scribe adalah layanan distributor pakaian bayi dan anak milik Shierly yang melayani pembelian sepenuhnya secara online melalui WhatsApp. Toko daring ini menyediakan beragam koleksi baju berkualitas dari berbagai brand lokal pilihan, merek Eropa, hingga Singapura. Para ibu bisa dengan mudah memilih pakaian harian yang nyaman, stylish, dan awet untuk buah hati tanpa perlu repot keluar rumah. Pemesanannya sangat praktis, dan barang akan langsung dikirimkan dengan rapi ke alamat tujuan masing-masing. Layanan online ini menjadi solusi belanja busana anak hemat waktu yang sangat memanjakan ibu dengan mobilitas tinggi.",
              address: "Layanan Belanja Online / Pesan Antar Area Cipanas & Sekitarnya",
              schedule: "Pemesanan Setiap Hari via WhatsApp (Pengiriman Cepat)",
              review: {
                author: "Ibu Shinta (Cipanas)",
                text: "Koleksi pakaian bayi dan anaknya bagus-bagus banget, bahannya adem dan awet. Belanja online tinggal chat langsung dikirim rapi ke rumah.",
                rating: 5,
              },
              contact: {
                person: "Shierly (Owner Shierenity Scribe)",
                phone: "087883370039",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin melihat katalog busana anak di Shierenity Scribe.",
            },
            {
              id: "jan-baby-store",
              name: "Jan Baby Store Cipanas",
              categoryTag: "Toko Perlengkapan Bayi & Anak Terlengkap",
              description:
                "Jan Baby Store Cipanas merupakan toko fisik andalan warga lokal yang menyediakan aneka perlengkapan bayi dan anak secara komprehensif. Koleksi barang yang ditawarkan sangat lengkap, mulai dari pakaian harian, peralatan mandi, hingga perlengkapan makan dan MPASI. Susunan barang di tokonya tertata dengan rapi sehingga memudahkan para ibu dalam mencari barang yang sedang dibutuhkan. Pelayanan stafnya dikenal ramah dan responsif dalam membantu pelanggan memilihkan produk fisik terbaik untuk si kecil. Toko ini sangat bisa diandalkan untuk berbelanja kebutuhan bulanan bayi yang mendesak secara langsung.",
              address: "Jl. Raya Cipanas No. 88, Cipanas, Cianjur",
              schedule: "Buka Setiap Hari: 08.00 – 20.30 WIB",
              review: {
                author: "Ibu Gita (Cipanas)",
                text: "Toko perlengkapan bayi paling komplit di Cipanas. Mulai dari sabun, botol susu, sampai perlengkapan MPASI semua ada. Harganya ramah dan pelayanannya sigap.",
                rating: 5,
              },
              contact: {
                person: "Admin Jan Baby Store Cipanas",
                phone: "087883370039 (via Umma Shierly)",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin info lokasi dan kontak Jan Baby Store Cipanas.",
            },
            {
              id: "dapur-sangkilang",
              name: "Dapur Sangkilang",
              categoryTag: "Katering Harian Keluarga Sehat",
              description:
                "Dapur Sangkilang menyediakan layanan katering keluarga yang lezat, higienis, dan sangat praktis untuk mendukung aktivitas warga Cipanas. Pilihan menu yang disajikan selalu bervariasi, memastikan keluarga tidak merasa bosan dengan hidangan rumahan yang disajikan. Bahan-bahan yang digunakan dipastikan segar dan diolah dengan bumbu matang yang aman dikonsumsi oleh anak-anak maupun orang dewasa. Layanan pesan antarnya sangat bisa diandalkan untuk meringankan beban tugas ibu yang sedang tidak sempat memasak. Ini adalah solusi katering harian yang tepat untuk menjaga asupan gizi keluarga tanpa harus repot di dapur.",
              address: "Area Cipanas, Cianjur (Layanan Pesan Antar Makan Siang & Malam)",
              schedule: "Senin – Sabtu (Pesanan Antar Langsung ke Rumah)",
              review: {
                author: "Ibu Fitri (Cipanas)",
                text: "Katering penyelamat saat tidak sempat masak! Masakannya enak, rasanya rumahan asli, dan bumbunya aman tidak bikin batuk anak. Menunya ganti terus tiap hari.",
                rating: 5,
              },
              contact: {
                person: "Pengelola Dapur Sangkilang",
                phone: "087883370039 (via Umma Shierly)",
              },
              waMessage:
                "Halo Umma Shierly, saya ingin melihat menu dan berlangganan katering Dapur Sangkilang Cipanas.",
            },
          ],
        },
      ],
    },
  ] as DirectoryItem[],

  advertise: {
    bannerTitle: "Iklankan bisnis atau lembagamu di sini!",
    bannerSubtitle:
      "Jangkau ratusan ibu di area Cipanas yang sedang mencari rekomendasi tepercaya untuk keluarga.",
    price: "Rp 100.000 / Tahun",
    heroText:
      "Mari bertumbuh bersama Umma Motherhood Cipanas! Jangkau ratusan ibu di area Cipanas yang sedang mencari rekomendasi tepercaya untuk kebutuhan keluarga dan buah hati mereka.",
    requirements: [
      {
        title: "Testimoni Teruji (Bukan Klaim Sepihak)",
        desc: "Melampirkan minimal 5 (lima) tangkapan layar ulasan positif dan asli dari para ibu di area Cipanas yang sudah pernah merasakan langsung manfaat produk atau jasa Anda.",
      },
      {
        title: "Relevansi Kebutuhan Ibu & Anak",
        desc: "Bisnis, lembaga, atau jasa yang diiklankan harus berhubungan langsung dengan dunia keibuan, tumbuh kembang anak, pendidikan, kesehatan, atau kebutuhan rumah tangga keluarga.",
      },
      {
        title: "Kejelasan Informasi & Area Layanan",
        desc: "Memiliki identitas usaha yang jelas (seperti akun Instagram/Google Maps/Katalog WA) dan dipastikan beroperasi atau melayani area Cipanas dan sekitarnya agar mudah diakses oleh anggota komunitas.",
      },
    ],
    ctaButtonText: "Klik di Sini untuk Mendaftar via WA Umma Shierly",
  },

  helpAdvertise: {
    bannerTitle: "Iklankan Jasa Harianmu Gratis di Sini",
    bannerSubtitle:
      "Kami membuka ruang bagi warga Cipanas yang menyediakan jasa bantuan operasional harian di rumah untuk bergabung dalam direktori ini tanpa biaya pengiklanan.",
    price: "Gratis (0 Rupiah)",
    heroText:
      "Kami membuka ruang bagi warga Cipanas yang menyediakan jasa bantuan operasional harian di rumah untuk bergabung dalam direktori ini tanpa biaya pengiklanan.",
    requirements: [
      {
        title: "Bukti Testimoni",
        desc: "Wajib melampirkan tangkapan layar (screenshot) yang berisi ulasan atau testimoni positif dari pelanggan asli yang sudah pernah menggunakan jasa Anda.",
      },
      {
        title: "Relevansi Jasa",
        desc: "Layanan yang ditawarkan harus berkaitan langsung dengan kebutuhan harian ibu dan rumah tangga, seperti jasa bersih-bersih, ojek perempuan, atau asisten rumah tangga.",
      },
      {
        title: "Verifikasi Identitas",
        desc: "Bersedia memberikan foto kartu identitas (KTP) dan kejelasan domisili area Cipanas untuk verifikasi keamanan demi melindungi kenyamanan seluruh anggota Umma Motherhood.",
      },
    ],
    ctaButtonText: "Klik di Sini untuk Mendaftar via WA Umma Shierly",
    waUrl:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20mendaftarkan%20jasa%20harian%20saya%20di%20Direktori%20Bantuan%20Umma%20Motherhood%20Cipanas.",
  },

  umkmAdvertise: {
    bannerTitle: "Iklankan UMKM-mu di Sini",
    bannerSubtitle:
      "Mari bertumbuh bersama dan jangkau lebih banyak pembeli di lingkungan komunitas kita sendiri!",
    price: "Rp 55.000 / Tahun",
    heroText:
      "Mari bertumbuh bersama dan jangkau lebih banyak pembeli di lingkungan komunitas kita sendiri!",
    requirements: [
      {
        title: "Domisili Lokal",
        desc: "Pemilik usaha wajib berdomisili atau memiliki area operasional di wilayah Cipanas dan sekitarnya.",
      },
      {
        title: "Kualitas & Relevansi",
        desc: "Produk atau jasa yang ditawarkan dipastikan aman, berkualitas, dan relevan dengan kebutuhan sehari-hari keluarga, ibu, maupun anak.",
      },
      {
        title: "Katalog & Informasi Jelas",
        desc: "Wajib melampirkan foto produk yang jelas, deskripsi singkat, serta rentang harga untuk dimuat di dalam etalase website agar memudahkan calon pembeli.",
      },
    ],
    ctaButtonText: "Daftarkan Usahamu via WA Umma Shierly",
    waUrl:
      "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20ingin%20mendaftarkan%20usaha%20UMKM%20saya%20ke%20Lapak%20Umma%20Motherhood%20Cipanas.",
  },

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

  umkmList: [
    {
      id: "toshierba",
      name: "Toshierba (Toko Shierly Serba Ada)",
      category: "toserba",
      categoryLabel: "Toko Serba Ada",
      owner: "Shierly",
      priceRange: "Menunggu Detail Produk",
      location: "Cipanas & Sekitarnya",
      description:
        "Toko serba ada milik Shierly yang menyediakan aneka kebutuhan harian keluarga, perlengkapan ibu, dan produk pilihan di area Cipanas. Rincian daftar barang dan katalog lengkap sedang disiapkan.",
      waMessage:
        "Halo Umma Shierly, saya ingin bertanya seputar produk yang tersedia di Toshierba (Toko Shierly Serba Ada).",
    },
  ] as UmkmItem[],

  journalUmmaArchiveUrl: "https://shirlyv.github.io/archive/?tag=journal-umma",

  communityArticles: [
    {
      id: "ikhtiar-menjaga-keutuhan-cinta",
      title: "Ikhtiar Menjaga Keutuhan Cinta Saat Keluarga Bertumbuh",
      subtitle:
        "Catatan Reflektif & Peta Jalan Mempersiapkan Buah Hati Menyambut Kehadiran Adik Tanpa Merasa Tersisihkan",
      author: "Shierly",
      authorRole: "Founder Umma Motherhood Cipanas & Penulis Journal Umma",
      authorInstagram: "https://www.instagram.com/lindashirlyv/",
      date: "01 September 2026",
      readingTime: "±8 Menit Baca di Naskah Asli",
      category: "ruang-berbagi",
      categoryLabel: "Ruang Berbagi Sesama Ibu",
      tags: ["Journal Umma", "Pernikahan & Keluarga", "Parenting", "Sibling Without Rivalry"],
      excerpt:
        "Refleksi mendalam dan ikhtiar merawat rasa cinta, komunikasi pasangan, serta keharmonisan rumah tangga saat kehadiran buah hati menuntut adaptasi peran yang luar biasa.",
      quote:
        "Cinta saja tidak cukup; cinta membutuhkan ilmu dan strategi agar pesan kasih sayang kita sampai dengan utuh ke dalam tangki emosi anak.",
      overviewParagraphs: [
        "Pernahkah sebuah pertanyaan hening tiba-tiba melintas di kepala saat menatap wajah anak yang tertidur pulas: 'Nanti, kalau ada anggota keluarga baru, anakku akan merasa aku tidak adil tidak, ya?'",
        "Pertanyaan itu tampak sederhana di permukaan, namun menyimpan beban emosional yang sangat dalam. Tidak sedikit dari kita yang masih menyimpan serpihan luka masa kecil karena pernah merasa dibandingkan atau merasa tergeser di dalam rumah sendiri. Secara naluriah, kita tentu tidak ingin mewariskan rasa sakit yang sama kepada anak-anak kita.",
        "Kesadaran itulah yang menjadi titik tolak bagi Shierly dan suami (Huzair) untuk belajar dengan sangat serius. Membaca literatur psikologi perkembangan, mendalami konsep Sibling Without Rivalry, hingga berkonsultasi dengan psikolog serta praktisi pengasuhan anak. Persiapan tersebut diterjemahkan ke dalam langkah nyata yang dijalani dari hari ke hari.",
      ],
      keyTakeaways: [
        "Melibatkan anak pertama sejak hari pertama kehamilan, bukan memberi kejutan mendadak di akhir.",
        "Membangun pemahaman konkret lewat media buku cerita bergambar, sentuhan perut, dan obrolan ramah balita.",
        "Menjaga tangki emosi anak pertama tetap penuh agar rasa aman tidak terkikis oleh kehadiran adik bayi.",
        "Komunikasi terbuka dan pembagian peran yang sadar antara suami dan istri demi menjaga keharmonisan rumah tangga.",
      ],
      outsideReference: {
        platform: "Blog Pribadi Shierly (Journal Umma)",
        url: "https://shirlyv.github.io/2026/09/01/Ikhtiar-Menjaga-Keutuhan-Cinta-Saat-Keluarga-Bertumbuh/",
        description:
          "Naskah utuh dan lengkap dari tulisan ini dipublikasikan secara mandiri di blog pribadi Shierly. Anda dapat membaca seluruh paparan 4 langkah ikhtiar dan pengalaman personal keluarga Shierly melalui tautan referensi resmi berikut:",
        buttonLabel: "Buka & Baca Artikel Lengkap di Blog Penulis",
      },
      url: "https://shirlyv.github.io/2026/09/01/Ikhtiar-Menjaga-Keutuhan-Cinta-Saat-Keluarga-Bertumbuh/",
      isExternal: true,
      status: "published",
    },
    {
      id: "warisan-cinta-untuk-masa-pubertas",
      title: "Warisan Cinta untuk Masa Pubertas",
      subtitle:
        "Mempersiapkan Bekal Menghadapi Akil Baligh dan Pendidikan Seksualitas Sehat dengan Kehangatan Hati",
      author: "Shierly",
      authorRole: "Founder Umma Motherhood Cipanas & Penulis Journal Umma",
      authorInstagram: "https://www.instagram.com/lindashirlyv/",
      date: "02 Agustus 2026",
      readingTime: "±10 Menit Baca di Naskah Asli",
      category: "ruang-berbagi",
      categoryLabel: "Ruang Berbagi Sesama Ibu",
      tags: ["Journal Umma", "Parenting Anak & Remaja", "Pubertas", "Edukasi Tubuh"],
      excerpt:
        "Bekal cinta, pemahaman emosional, dan komunikasi terbuka bagi orang tua dalam mendampingi anak menyongsong masa akil baligh dan fase pubertas dengan tenang tanpa kecanggungan.",
      quote:
        "Pendidikan tentang tubuh dan kehormatan diri tidak boleh ditunda sampai anak belasan tahun. Semuanya harus ditanamkan sejak hari ini melalui kebiasaan sehari-hari di dalam rumah.",
      overviewParagraphs: [
        "Di tengah keheningan malam saat menatap wajah anak-anak yang tertidur lelap, sebuah kecemasan eksistensial bisa menyergap dada orang tua: 'Bagaimana jika umurku tidak sampai untuk mendampingi mereka memasuki gerbang kedewasaan? Siapa yang akan memeluk kebingungan dan menjawab rasa malu mereka saat tubuh mereka mulai berubah?'",
        "Pertanyaan sunyi itu mengingatkan kita bahwa usia adalah rahasia semesta. Di samping menyiapkan dana pendidikan dan warisan materi, pernahkah kita menyiapkan warisan ilmu tentang tubuh dan benteng adab saat anak-anak menghadapi pubertas?",
        "Bagi Shierly dan suami (Huzair), rasa takut tersebut diubah menjadi bahan bakar untuk bertindak sedini mungkin. Mereka merancang empat ikhtiar besar kurikulum pendidikan tubuh dan persiapan pubertas yang berakar pada nilai agama, sains biologis, dan kehangatan komunikasi di meja makan.",
      ],
      keyTakeaways: [
        "Menghapus tabu komunikasi tubuh: mengganti rasa canggung dengan percakapan ilmiah yang santun dan jujur.",
        "Mengenalkan konsep batasan privasi fisik (consent dan bodily autonomy) sejak balita.",
        "Menyiapkan perangkat panduan tertulis dan arsip cinta yang bisa dibaca anak saat memasuki masa akil baligh.",
        "Menjadikan rumah sebagai tempat pertama dan paling aman bagi anak untuk bertanya seputar perubahan tubuhnya.",
      ],
      outsideReference: {
        platform: "Blog Pribadi Shierly (Journal Umma)",
        url: "https://shirlyv.github.io/2026/08/02/Warisan-Cinta-untuk-Masa-Pubertas/",
        description:
          "Naskah komprehensif yang memaparkan 4 ikhtiar kurikulum pendidikan tubuh dan persiapan pubertas ini tersedia lengkap di blog pribadi Shierly. Silakan jelajahi tulisan aslinya melalui tautan referensi resmi berikut:",
        buttonLabel: "Buka & Baca Artikel Lengkap di Blog Penulis",
      },
      url: "https://shirlyv.github.io/2026/08/02/Warisan-Cinta-untuk-Masa-Pubertas/",
      isExternal: true,
      status: "published",
    },
    {
      id: "online-montessori-class-hasna",
      title: "Online Montessori Class with Hasna",
      subtitle:
        "Penerapan Prinsip Montessori yang Menyenangkan, Aplikatif, dan Mandiri di Rumah",
      author: "Hasna",
      authorRole: "Montessori Educator & Praktisi PAUD",
      speaker: "Hasna",
      date: "07 November 2026",
      eventDate: "07 November 2026",
      category: "kelas-profesional",
      categoryLabel: "Materi Kelas Profesional",
      tags: ["Montessori", "Pendidikan Anak Usia Dini", "Sensori & Kemandirian"],
      excerpt:
        "Sesi edukasi daring interaktif bersama praktisi Montessori Hasna mengenai stimulasi sensori anak usia dini dan aplikasi prinsip Montessori di rumah.",
      quote:
        "Esensi terdalam Montessori adalah menyiapkan lingkungan yang menghargai kemandirian alami anak: 'Bantu aku melakukannya sendiri'.",
      overviewParagraphs: [
        "Banyak orang tua mengira metode Montessori membutuhkan aparatus kayu impor yang mahal dan rumit. Padahal esensi terdalam filosofi Montessori berpusat pada penataan lingkungan yang ramah anak (prepared environment) dan penghormatan terhadap fase sensitif anak.",
        "Dalam kelas daring interaktif ini, Hasna akan mengupas tuntas cara praktis mengadaptasi prinsip Montessori menggunakan benda-benda sederhana di rumah untuk melatih motorik, fokus, dan kemandirian anak.",
        "Materi rangkuman digital dan rekaman sesi kelas akan diarsipkan secara rapi di ruang ini setelah kegiatan kelas selesai diselenggarakan pada 07 November 2026.",
      ],
      keyTakeaways: [
        "Memahami prinsip dasar 'Practical Life' dengan perlengkapan ramah anak di rumah.",
        "Stimulasi sensori alami tanpa ketergantungan pada gawai atau layar digital.",
        "Kiat mendampingi anak tanpa tergesa-gesa mengambil alih tugas belajarnya.",
        "Sesi tanya-jawab interaktif dan konsultasi studi kasus pengasuhan anak usia dini.",
      ],
      outsideReference: {
        platform: "Pendaftaran WhatsApp Resmi Komunitas",
        url: "https://wa.me/6287883370039?text=Halo%20Umma%20Shierly,%20saya%20tertarik%20untuk%20mendaftar%20dan%20meminta%20info%20Online%20Montessori%20Class%20with%20Hasna.",
        description:
          "Pendaftaran peserta dan pembagian tautan sesi interaktif Zoom dikoordinasikan langsung melalui WhatsApp Umma Shierly.",
        buttonLabel: "Daftar & Minta Info via WhatsApp Umma Shierly",
      },
      status: "coming-soon",
      materiStatus: "Coming Soon",
    },
  ] as CommunityArticle[],
};
