const API_KEY = "AIzaSyCNCLemLydv4FFvs9yyB_kdUo_jLlEN2PE";
const PROJECT_ID = "newp-3d79f";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const surahs = [
{number:1,nameAr:"الفاتحة",nameLatin:"Al-Fatihah",meaning:"Pembukaan",totalAyah:7,revelation:"makkah"},
{number:2,nameAr:"البقرة",nameLatin:"Al-Baqarah",meaning:"Sapi Betina",totalAyah:286,revelation:"madina"},
{number:3,nameAr:"آل عمران",nameLatin:"Ali 'Imran",meaning:"Keluarga Imran",totalAyah:200,revelation:"madina"},
{number:4,nameAr:"النساء",nameLatin:"An-Nisa'",meaning:"Wanita",totalAyah:176,revelation:"madina"},
{number:5,nameAr:"المائدة",nameLatin:"Al-Ma'idah",meaning:"Hidangan",totalAyah:120,revelation:"madina"},
{number:6,nameAr:"الأنعام",nameLatin:"Al-An'am",meaning:"Hewan Ternak",totalAyah:165,revelation:"makkah"},
{number:7,nameAr:"الأعراف",nameLatin:"Al-A'raf",meaning:"Tempat Tertinggi",totalAyah:206,revelation:"makkah"},
{number:8,nameAr:"الأنفال",nameLatin:"Al-Anfal",meaning:"Harta Rampasan Perang",totalAyah:75,revelation:"madina"},
{number:9,nameAr:"التوبة",nameLatin:"At-Taubah",meaning:"Pengampunan",totalAyah:129,revelation:"madina"},
{number:10,nameAr:"يونس",nameLatin:"Yunus",meaning:"Yunus",totalAyah:109,revelation:"makkah"},
{number:11,nameAr:"هود",nameLatin:"Hud",meaning:"Hud",totalAyah:123,revelation:"makkah"},
{number:12,nameAr:"يوسف",nameLatin:"Yusuf",meaning:"Yusuf",totalAyah:111,revelation:"makkah"},
{number:13,nameAr:"الرعد",nameLatin:"Ar-Ra'd",meaning:"Guruh",totalAyah:43,revelation:"madina"},
{number:14,nameAr:"إبراهيم",nameLatin:"Ibrahim",meaning:"Ibrahim",totalAyah:52,revelation:"makkah"},
{number:15,nameAr:"الحجر",nameLatin:"Al-Hijr",meaning:"Batu Karang",totalAyah:99,revelation:"makkah"},
{number:16,nameAr:"النحل",nameLatin:"An-Nahl",meaning:"Lebah",totalAyah:128,revelation:"makkah"},
{number:17,nameAr:"الإسراء",nameLatin:"Al-Isra'",meaning:"Perjalanan Malam",totalAyah:111,revelation:"makkah"},
{number:18,nameAr:"الكهف",nameLatin:"Al-Kahf",meaning:"Gua",totalAyah:110,revelation:"makkah"},
{number:19,nameAr:"مريم",nameLatin:"Maryam",meaning:"Maryam",totalAyah:98,revelation:"makkah"},
{number:20,nameAr:"طه",nameLatin:"Taha",meaning:"Taha",totalAyah:135,revelation:"makkah"},
{number:21,nameAr:"الأنبياء",nameLatin:"Al-Anbiya'",meaning:"Para Nabi",totalAyah:112,revelation:"makkah"},
{number:22,nameAr:"الحج",nameLatin:"Al-Hajj",meaning:"Haji",totalAyah:78,revelation:"madina"},
{number:23,nameAr:"المؤمنون",nameLatin:"Al-Mu'minun",meaning:"Orang-orang Mukmin",totalAyah:118,revelation:"makkah"},
{number:24,nameAr:"النور",nameLatin:"An-Nur",meaning:"Cahaya",totalAyah:64,revelation:"madina"},
{number:25,nameAr:"الفرقان",nameLatin:"Al-Furqan",meaning:"Pembeda",totalAyah:77,revelation:"makkah"},
{number:26,nameAr:"الشعراء",nameLatin:"Asy-Syu'ara'",meaning:"Para Penyair",totalAyah:227,revelation:"makkah"},
{number:27,nameAr:"النمل",nameLatin:"An-Naml",meaning:"Semut",totalAyah:93,revelation:"makkah"},
{number:28,nameAr:"القصص",nameLatin:"Al-Qasas",meaning:"Kisah-kisah",totalAyah:88,revelation:"makkah"},
{number:29,nameAr:"العنكبوت",nameLatin:"Al-'Ankabut",meaning:"Laba-laba",totalAyah:69,revelation:"makkah"},
{number:30,nameAr:"الروم",nameLatin:"Ar-Rum",meaning:"Romawi",totalAyah:60,revelation:"makkah"},
{number:31,nameAr:"لقمان",nameLatin:"Luqman",meaning:"Luqman",totalAyah:34,revelation:"makkah"},
{number:32,nameAr:"السجدة",nameLatin:"As-Sajdah",meaning:"Sujud",totalAyah:30,revelation:"makkah"},
{number:33,nameAr:"الأحزاب",nameLatin:"Al-Ahzab",meaning:"Golongan-golongan",totalAyah:73,revelation:"madina"},
{number:34,nameAr:"سبأ",nameLatin:"Saba'",meaning:"Saba'",totalAyah:54,revelation:"makkah"},
{number:35,nameAr:"فاطر",nameLatin:"Fatir",meaning:"Pencipta",totalAyah:45,revelation:"makkah"},
{number:36,nameAr:"يس",nameLatin:"Yasin",meaning:"Yasin",totalAyah:83,revelation:"makkah"},
{number:37,nameAr:"الصافات",nameLatin:"As-Saffat",meaning:"Yang Bershaf-shaf",totalAyah:182,revelation:"makkah"},
{number:38,nameAr:"ص",nameLatin:"Sad",meaning:"Sad",totalAyah:88,revelation:"makkah"},
{number:39,nameAr:"الزمر",nameLatin:"Az-Zumar",meaning:"Rombongan-rombongan",totalAyah:75,revelation:"makkah"},
{number:40,nameAr:"غافر",nameLatin:"Ghafir",meaning:"Yang Mengampuni",totalAyah:85,revelation:"makkah"},
{number:41,nameAr:"فصلت",nameLatin:"Fussilat",meaning:"Yang Dijelaskan",totalAyah:54,revelation:"makkah"},
{number:42,nameAr:"الشورى",nameLatin:"Asy-Syura",meaning:"Musyawarah",totalAyah:53,revelation:"makkah"},
{number:43,nameAr:"الزخرف",nameLatin:"Az-Zukhruf",meaning:"Perhiasan Emas",totalAyah:89,revelation:"makkah"},
{number:44,nameAr:"الدخان",nameLatin:"Ad-Dukhan",meaning:"Kabut",totalAyah:59,revelation:"makkah"},
{number:45,nameAr:"الجاثية",nameLatin:"Al-Jasiyah",meaning:"Yang Berlutut",totalAyah:37,revelation:"makkah"},
{number:46,nameAr:"الأحقاف",nameLatin:"Al-Ahqaf",meaning:"Bukit-bukit Pasir",totalAyah:35,revelation:"makkah"},
{number:47,nameAr:"محمد",nameLatin:"Muhammad",meaning:"Muhammad",totalAyah:38,revelation:"madina"},
{number:48,nameAr:"الفتح",nameLatin:"Al-Fath",meaning:"Kemenangan",totalAyah:29,revelation:"madina"},
{number:49,nameAr:"الحجرات",nameLatin:"Al-Hujurat",meaning:"Kamar-kamar",totalAyah:18,revelation:"madina"},
{number:50,nameAr:"ق",nameLatin:"Qaf",meaning:"Qaf",totalAyah:45,revelation:"makkah"},
{number:51,nameAr:"الذاريات",nameLatin:"Az-Zariyat",meaning:"Angin yang Menerbangkan",totalAyah:60,revelation:"makkah"},
{number:52,nameAr:"الطور",nameLatin:"At-Tur",meaning:"Bukit Tur",totalAyah:49,revelation:"makkah"},
{number:53,nameAr:"النجم",nameLatin:"An-Najm",meaning:"Bintang",totalAyah:62,revelation:"makkah"},
{number:54,nameAr:"القمر",nameLatin:"Al-Qamar",meaning:"Bulan",totalAyah:55,revelation:"makkah"},
{number:55,nameAr:"الرحمن",nameLatin:"Ar-Rahman",meaning:"Yang Maha Pemurah",totalAyah:78,revelation:"madina"},
{number:56,nameAr:"الواقعة",nameLatin:"Al-Waqi'ah",meaning:"Hari Kiamat",totalAyah:96,revelation:"makkah"},
{number:57,nameAr:"الحديد",nameLatin:"Al-Hadid",meaning:"Besi",totalAyah:29,revelation:"madina"},
{number:58,nameAr:"المجادلة",nameLatin:"Al-Mujadalah",meaning:"Gugatan",totalAyah:22,revelation:"madina"},
{number:59,nameAr:"الحشر",nameLatin:"Al-Hasyr",meaning:"Pengusiran",totalAyah:24,revelation:"madina"},
{number:60,nameAr:"الممتحنة",nameLatin:"Al-Mumtahanah",meaning:"Wanita yang Diuji",totalAyah:13,revelation:"madina"},
{number:61,nameAr:"الصف",nameLatin:"As-Saff",meaning:"Barisan",totalAyah:14,revelation:"madina"},
{number:62,nameAr:"الجمعة",nameLatin:"Al-Jumu'ah",meaning:"Hari Jum'at",totalAyah:11,revelation:"madina"},
{number:63,nameAr:"المنافقون",nameLatin:"Al-Munafiqun",meaning:"Orang-orang Munafik",totalAyah:11,revelation:"madina"},
{number:64,nameAr:"التغابن",nameLatin:"At-Tagabun",meaning:"Hari Ditampakkan Kesalahan",totalAyah:18,revelation:"madina"},
{number:65,nameAr:"الطلاق",nameLatin:"At-Talaq",meaning:"Talak",totalAyah:12,revelation:"madina"},
{number:66,nameAr:"التحريم",nameLatin:"At-Tahrim",meaning:"Mengharamkan",totalAyah:12,revelation:"madina"},
{number:67,nameAr:"الملك",nameLatin:"Al-Mulk",meaning:"Kerajaan",totalAyah:30,revelation:"makkah"},
{number:68,nameAr:"القلم",nameLatin:"Al-Qalam",meaning:"Pena",totalAyah:52,revelation:"makkah"},
{number:69,nameAr:"الحاقة",nameLatin:"Al-Haqqah",meaning:"Hari Kiamat",totalAyah:52,revelation:"makkah"},
{number:70,nameAr:"المعارج",nameLatin:"Al-Ma'arij",meaning:"Tempat-tempat Naik",totalAyah:44,revelation:"makkah"},
{number:71,nameAr:"نوح",nameLatin:"Nuh",meaning:"Nuh",totalAyah:28,revelation:"makkah"},
{number:72,nameAr:"الجن",nameLatin:"Al-Jinn",meaning:"Jin",totalAyah:28,revelation:"makkah"},
{number:73,nameAr:"المزمل",nameLatin:"Al-Muzzammil",meaning:"Orang yang Berselimut",totalAyah:20,revelation:"makkah"},
{number:74,nameAr:"المدثر",nameLatin:"Al-Muddassir",meaning:"Orang yang Berkemul",totalAyah:56,revelation:"makkah"},
{number:75,nameAr:"القيامة",nameLatin:"Al-Qiyamah",meaning:"Hari Kiamat",totalAyah:40,revelation:"makkah"},
{number:76,nameAr:"الإنسان",nameLatin:"Al-Insan",meaning:"Manusia",totalAyah:31,revelation:"madina"},
{number:77,nameAr:"المرسلات",nameLatin:"Al-Mursalat",meaning:"Malaikat yang Diutus",totalAyah:50,revelation:"makkah"},
{number:78,nameAr:"النبأ",nameLatin:"An-Naba'",meaning:"Berita Besar",totalAyah:40,revelation:"makkah"},
{number:79,nameAr:"النازعات",nameLatin:"An-Nazi'at",meaning:"Malaikat yang Mencabut",totalAyah:46,revelation:"makkah"},
{number:80,nameAr:"عبس",nameLatin:"'Abasa",meaning:"Bermuka Masam",totalAyah:42,revelation:"makkah"},
{number:81,nameAr:"التكوير",nameLatin:"At-Takwir",meaning:"Menggulung",totalAyah:29,revelation:"makkah"},
{number:82,nameAr:"الانفطار",nameLatin:"Al-Infitar",meaning:"Terbelah",totalAyah:19,revelation:"makkah"},
{number:83,nameAr:"المطففين",nameLatin:"Al-Mutaffifin",meaning:"Orang-orang yang Curang",totalAyah:36,revelation:"makkah"},
{number:84,nameAr:"الانشقاق",nameLatin:"Al-Insyiqaq",meaning:"Terbelah",totalAyah:25,revelation:"makkah"},
{number:85,nameAr:"البروج",nameLatin:"Al-Buruj",meaning:"Gugusan Bintang",totalAyah:22,revelation:"makkah"},
{number:86,nameAr:"الطارق",nameLatin:"At-Tariq",meaning:"Yang Datang di Malam Hari",totalAyah:17,revelation:"makkah"},
{number:87,nameAr:"الأعلى",nameLatin:"Al-A'la",meaning:"Yang Paling Tinggi",totalAyah:19,revelation:"makkah"},
{number:88,nameAr:"الغاشية",nameLatin:"Al-Gasyiyah",meaning:"Hari Pembalasan",totalAyah:26,revelation:"makkah"},
{number:89,nameAr:"الفجر",nameLatin:"Al-Fajr",meaning:"Fajar",totalAyah:30,revelation:"makkah"},
{number:90,nameAr:"البلد",nameLatin:"Al-Balad",meaning:"Negeri",totalAyah:20,revelation:"makkah"},
{number:91,nameAr:"الشمس",nameLatin:"Asy-Syams",meaning:"Matahari",totalAyah:15,revelation:"makkah"},
{number:92,nameAr:"الليل",nameLatin:"Al-Lail",meaning:"Malam",totalAyah:21,revelation:"makkah"},
{number:93,nameAr:"الضحى",nameLatin:"Ad-Duha",meaning:"Waktu Dhuha",totalAyah:11,revelation:"makkah"},
{number:94,nameAr:"الشرح",nameLatin:"Asy-Syarh",meaning:"Melapangkan",totalAyah:8,revelation:"makkah"},
{number:95,nameAr:"التين",nameLatin:"At-Tin",meaning:"Buah Tin",totalAyah:8,revelation:"makkah"},
{number:96,nameAr:"العلق",nameLatin:"Al-'Alaq",meaning:"Segumpal Darah",totalAyah:19,revelation:"makkah"},
{number:97,nameAr:"القدر",nameLatin:"Al-Qadr",meaning:"Kemuliaan",totalAyah:5,revelation:"makkah"},
{number:98,nameAr:"البينة",nameLatin:"Al-Bayyinah",meaning:"Bukti yang Nyata",totalAyah:8,revelation:"madina"},
{number:99,nameAr:"الزلزلة",nameLatin:"Az-Zalzalah",meaning:"Kegoncangan",totalAyah:8,revelation:"madina"},
{number:100,nameAr:"العاديات",nameLatin:"Al-'Adiyat",meaning:"Kuda Perang",totalAyah:11,revelation:"makkah"},
{number:101,nameAr:"القارعة",nameLatin:"Al-Qari'ah",meaning:"Hari Kiamat",totalAyah:11,revelation:"makkah"},
{number:102,nameAr:"التكاثر",nameLatin:"At-Takasur",meaning:"Bermegah-megahan",totalAyah:8,revelation:"makkah"},
{number:103,nameAr:"العصر",nameLatin:"Al-'Asr",meaning:"Masa",totalAyah:3,revelation:"makkah"},
{number:104,nameAr:"الهمزة",nameLatin:"Al-Humazah",meaning:"Pengumpat",totalAyah:9,revelation:"makkah"},
{number:105,nameAr:"الفيل",nameLatin:"Al-Fil",meaning:"Gajah",totalAyah:5,revelation:"makkah"},
{number:106,nameAr:"قريش",nameLatin:"Quraisy",meaning:"Suku Quraisy",totalAyah:4,revelation:"makkah"},
{number:107,nameAr:"الماعون",nameLatin:"Al-Ma'un",meaning:"Barang-barang Berguna",totalAyah:7,revelation:"makkah"},
{number:108,nameAr:"الكوثر",nameLatin:"Al-Kausar",meaning:"Nikmat yang Berlimpah",totalAyah:3,revelation:"makkah"},
{number:109,nameAr:"الكافرون",nameLatin:"Al-Kafirun",meaning:"Orang-orang Kafir",totalAyah:6,revelation:"makkah"},
{number:110,nameAr:"النصر",nameLatin:"An-Nasr",meaning:"Pertolongan",totalAyah:3,revelation:"madina"},
{number:111,nameAr:"المسد",nameLatin:"Al-Masad",meaning:"Gejolak Api",totalAyah:5,revelation:"makkah"},
{number:112,nameAr:"الإخلاص",nameLatin:"Al-Ikhlas",meaning:"Memurnikan Keesaan Allah",totalAyah:4,revelation:"makkah"},
{number:113,nameAr:"الفلق",nameLatin:"Al-Falaq",meaning:"Waktu Subuh",totalAyah:5,revelation:"makkah"},
{number:114,nameAr:"الناس",nameLatin:"An-Nas",meaning:"Manusia",totalAyah:6,revelation:"makkah"},
];

async function seed() {
  console.log("🕌 Seeding 114 surahs ke Firestore...\n");
  let success = 0;
  let failed = 0;

  for (const surah of surahs) {
    const body = {
      fields: {
        number: { integerValue: String(surah.number) },
        nameAr: { stringValue: surah.nameAr },
        nameLatin: { stringValue: surah.nameLatin },
        meaning: { stringValue: surah.meaning },
        totalAyah: { integerValue: String(surah.totalAyah) },
        revelation: { stringValue: surah.revelation },
      }
    };

    try {
      const res = await fetch(
        `${BASE}/surahs/${surah.number}?key=${API_KEY}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (res.ok) {
        success++;
        if (success % 10 === 0 || success === 1) console.log(`  ✓ ${success}/114 surahs uploaded...`);
      } else {
        failed++;
        const err = await res.json();
        console.log(`  ✗ Surah ${surah.number} (${surah.nameLatin}): ${err.error?.message}`);
      }
    } catch (e) {
      failed++;
      console.log(`  ✗ Surah ${surah.number}: ${e.message}`);
    }
  }

  console.log(`\n✅ Done! ${success} success, ${failed} failed\n`);
}

seed();
