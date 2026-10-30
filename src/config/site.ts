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

export interface DirectoryPlaceItem {
  name: string;
  categoryTag: string;
  description: string;
  waMessage: string;
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
    instagram: "https://instagram.com/ummamotherhood",
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
      subtitle: "Dokter Spesialis Anak & Bidan",
      description:
        "Jadwal praktik dokter spesialis anak, obgyn, bidan, dan klinik terdekat di Cipanas dan sekitarnya.",
      subgroups: [
        {
          title: "Dokter Spesialis Anak & Bidan Rekomendasi",
          places: [
            {
              name: "Dr. Nina Apotek Panca Farma",
              categoryTag: "Dokter Spesialis Anak",
              description:
                "Dokter Nina merupakan salah satu dokter spesialis anak yang berpraktik di Apotek Panca Farma, Cipanas. Beliau dikenal memiliki pendekatan yang ramah dan sabar saat memeriksa anak-anak, sehingga si kecil tidak mudah rewel. Ruang tunggunya cukup memadai bagi ibu dan anak yang sedang menunggu antrean pemeriksaan. Penjelasan yang diberikan mengenai kondisi kesehatan anak maupun resep obat selalu mudah dipahami oleh para orang tua. Jadwal praktiknya sangat bisa diandalkan untuk kebutuhan konsultasi rutin maupun penanganan sakit anak di area sekitar.",
              waMessage:
                "Halo Umma Shierly, saya ingin meminta info kontak & jadwal praktik Dr. Nina di Apotek Panca Farma Cipanas.",
            },
            {
              name: "Dr. Abdurahman Apotek Ikana",
              categoryTag: "Dokter Spesialis Anak",
              description:
                "Praktik Dokter Abdurahman di Apotek Ikana menjadi pilihan tepercaya bagi banyak ibu di Cipanas untuk memeriksakan kesehatan buah hati. Beliau sangat teliti dalam mendiagnosis keluhan penyakit anak dan memberikan penanganan medis yang tepat sasaran. Lokasi praktiknya yang menyatu dengan apotek memudahkan orang tua untuk langsung menebus resep obat setelah sesi konsultasi selesai. Beliau juga terbuka untuk berdiskusi mengenai tumbuh kembang anak dan jadwal imunisasi dasar. Kehadirannya memberikan ketenangan bagi warga lokal yang membutuhkan akses layanan kesehatan anak yang cepat.",
              waMessage:
                "Halo Umma Shierly, saya ingin meminta info kontak & jadwal praktik Dr. Abdurahman di Apotek Ikana Cipanas.",
            },
            {
              name: "Bidan Silvia Meilia A.Md di Praktek Bidan Mia Tarigu",
              categoryTag: "Bidan & Kesehatan Ibu-Anak",
              description:
                "Bidan Silvia Meilia menawarkan layanan kebidanan dan kesehatan ibu anak yang penuh kehangatan di Praktek Bidan Mia Tarigu. Pendekatannya yang personal dan kekeluargaan membuat para ibu merasa nyaman saat berkonsultasi mengenai kehamilan maupun pascapersalinan. Fasilitas praktiknya tertata rapi, bersih, dan mendukung kelancaran proses pemeriksaan kehamilan rutin. Beliau juga telaten dalam memberikan edukasi seputar ASI eksklusif dan perawatan bayi baru lahir bagi ibu baru. Keahliannya sangat membantu memastikan kesehatan ibu dan bayi di area Cipanas tetap terpantau dengan aman.",
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
              name: "Artima Edu",
              categoryTag: "Coding & English (Online)",
              description:
                "Artima Edu adalah inisiatif pendidikan inovatif yang dikelola langsung oleh Founder Umma Motherhood, Shierly, dan beroperasi sepenuhnya secara online. Layanan daring ini berfokus pada kelas coding anak menggunakan logika pemrograman visual, serta instruksi bahasa Inggris yang interaktif. Selain untuk anak-anak, tersedia juga program edukasi untuk mendukung keterampilan para ibu yang dapat diakses dari rumah. Pendekatannya sangat modern karena menggabungkan teknologi digital dengan metode belajar jarak jauh yang menyenangkan. Kehadiran layanan online ini memudahkan orang tua untuk memberikan stimulasi pendidikan berkualitas tanpa batasan ruang.",
              waMessage:
                "Halo Umma Shierly, saya ingin informasi pendaftaran dan jadwal kelas di Artima Edu.",
            },
            {
              name: "Tiny Roots",
              categoryTag: "Pop Up Class & Sensori Motorik",
              description:
                "Tiny Roots merupakan wadah eksplorasi seru bagi anak-anak untuk mengembangkan kreativitas melalui kegiatan pop up class tatap muka. Program ini sering menghadirkan aktivitas sensorik dan motorik yang dirancang khusus untuk menstimulasi tumbuh kembang anak usia dini. Anak-anak diajak untuk bermain sambil belajar di lingkungan yang aman, menyenangkan, dan penuh warna. Setiap sesinya dipandu oleh fasilitator yang memahami kebutuhan psikologis serta tahap perkembangan anak balita. Kelas ini sangat cocok bagi ibu yang ingin memberikan variasi kegiatan edukatif akhir pekan di sekitar Cipanas.",
              waMessage:
                "Halo Umma Shierly, saya ingin info jadwal pop up class Tiny Roots Cipanas terdekat.",
            },
            {
              name: "Batutta",
              categoryTag: "Pendidikan Anak Informal & Praktik Nyata",
              description:
                "Batutta hadir sebagai penyelenggara kegiatan pendidikan anak informal yang mengedepankan pengalaman belajar langsung melalui praktik nyata. Berbagai tema pop up class yang diselenggarakan bertujuan untuk mengasah rasa ingin tahu dan kemandirian anak sedini mungkin. Lingkungan belajarnya dikemas dengan sangat santai agar anak tidak merasa terbebani seperti dalam sistem sekolah formal. Anak-anak bisa leluasa bereksplorasi, bersosialisasi dengan teman sebaya, dan membangun rasa percaya diri mereka di ruang publik. Kehadiran komunitas belajar ini menjadi angin segar bagi opsi aktivitas edukasi interaktif di wilayah Cipanas.",
              waMessage:
                "Halo Umma Shierly, saya ingin info kegiatan dan jadwal kelas Batutta Cipanas.",
            },
          ],
        },
        {
          title: "Kegiatan Olahraga Anak",
          places: [
            {
              name: "Push Bike Cipanas",
              categoryTag: "Komunitas Sepeda Keseimbangan Balita",
              description:
                "Push Bike Cipanas adalah komunitas olahraga sepeda tanpa pedal yang sangat menyenangkan dan ramah bagi anak usia balita. Kegiatan ini sangat efektif untuk melatih keseimbangan, koordinasi motorik kasar, serta kelincahan anak sejak dini. Latihan rutin dilakukan di area yang aman dengan pengawasan langsung dari pelatih atau pendamping yang berpengalaman. Aktivitas fisik ini juga melatih mental keberanian dan sportivitas anak saat berinteraksi dengan teman-temannya di lintasan. Orang tua bisa menjadikan ajang ini sebagai momen bonding yang seru di sore hari atau akhir pekan.",
              waMessage:
                "Halo Umma Shierly, saya ingin info bergabung dan jadwal latihan Push Bike Cipanas.",
            },
            {
              name: "Dojo Katana Karate Kids",
              categoryTag: "Bela Diri Karate Anak",
              description:
                "Dojo Katana Karate Kids menawarkan kelas bela diri karate yang dirancang khusus dengan pendekatan yang aman bagi anak-anak. Melalui latihan yang disiplin namun menyenangkan, anak-anak diajarkan teknik dasar perlindungan diri sekaligus melatih fokus konsentrasi. Para pelatih di sini sabar dalam membimbing karakter anak agar tumbuh menjadi individu yang tangguh, tangkas, dan santun. Olahraga ini sangat baik untuk menyalurkan energi aktif anak-anak ke arah yang positif dan terstruktur rapi. Ini adalah pilihan tepat bagi ibu yang ingin menanamkan nilai kedisiplinan dan kebugaran fisik pada buah hatinya.",
              waMessage:
                "Halo Umma Shierly, saya ingin info pendaftaran kelas Dojo Katana Karate Kids Cipanas.",
            },
            {
              name: "Cipanas Archery",
              categoryTag: "Olahraga Panahan Anak & Remaja",
              description:
                "Cipanas Archery menyediakan fasilitas olahraga panahan yang melatih ketangkasan dan fokus pikiran bagi anak-anak maupun remaja. Kegiatan memanah ini sangat bermanfaat untuk melatih kesabaran, postur tubuh yang tegak, serta ketajaman mata. Fasilitas yang disediakan cukup memadai dan aman karena dipandu langsung oleh instruktur panahan yang terlatih. Anak-anak akan diajarkan teknik memegang busur dan melepaskan anak panah dengan presisi dalam suasana yang bersahabat. Olahraga ini bisa menjadi alternatif kegiatan fisik yang unik dan minim kontak tubuh di area Cipanas.",
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
              name: "Shierenity Scribe",
              categoryTag: "Distributor Pakaian Bayi & Anak (Online)",
              description:
                "Shierenity Scribe adalah layanan distributor pakaian bayi dan anak milik Shierly yang melayani pembelian sepenuhnya secara online melalui WhatsApp. Toko daring ini menyediakan beragam koleksi baju berkualitas dari berbagai brand lokal pilihan, merek Eropa, hingga Singapura. Para ibu bisa dengan mudah memilih pakaian harian yang nyaman, stylish, dan awet untuk buah hati tanpa perlu repot keluar rumah. Pemesanannya sangat praktis, dan barang akan langsung dikirimkan dengan rapi ke alamat tujuan masing-masing. Layanan online ini menjadi solusi belanja busana anak hemat waktu yang sangat memanjakan ibu dengan mobilitas tinggi.",
              waMessage:
                "Halo Umma Shierly, saya ingin melihat katalog busana anak di Shierenity Scribe.",
            },
            {
              name: "Jan Baby Store Cipanas",
              categoryTag: "Toko Perlengkapan Bayi & Anak Terlengkap",
              description:
                "Jan Baby Store Cipanas merupakan toko fisik andalan warga lokal yang menyediakan aneka perlengkapan bayi dan anak secara komprehensif. Koleksi barang yang ditawarkan sangat lengkap, mulai dari pakaian harian, peralatan mandi, hingga perlengkapan makan dan MPASI. Susunan barang di tokonya tertata dengan rapi sehingga memudahkan para ibu dalam mencari barang yang sedang dibutuhkan. Pelayanan stafnya dikenal ramah dan responsif dalam membantu pelanggan memilihkan produk fisik terbaik untuk si kecil. Toko ini sangat bisa diandalkan untuk berbelanja kebutuhan bulanan bayi yang mendesak secara langsung.",
              waMessage:
                "Halo Umma Shierly, saya ingin info lokasi dan kontak Jan Baby Store Cipanas.",
            },
            {
              name: "Dapur Sangkilang",
              categoryTag: "Katering Harian Keluarga Sehat",
              description:
                "Dapur Sangkilang menyediakan layanan katering keluarga yang lezat, higienis, dan sangat praktis untuk mendukung aktivitas warga Cipanas. Pilihan menu yang disajikan selalu bervariasi, memastikan keluarga tidak merasa bosan dengan hidangan rumahan yang disajikan. Bahan-bahan yang digunakan dipastikan segar dan diolah dengan bumbu matang yang aman dikonsumsi oleh anak-anak maupun orang dewasa. Layanan pesan antarnya sangat bisa diandalkan untuk meringankan beban tugas ibu yang sedang tidak sempat memasak. Ini adalah solusi katering harian yang tepat untuk menjaga asupan gizi keluarga tanpa harus repot di dapur.",
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
