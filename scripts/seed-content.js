const API_KEY = "AIzaSyCNCLemLydv4FFvs9yyB_kdUo_jLlEN2PE";
const PROJECT_ID = "newp-3d79f";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const articles = [
  { id: "art1", title: "Keutamaan Membaca Al-Qur'an", slug: "keutamaan-membaca-quran", excerpt: "Membaca Al-Qur'an memiliki banyak keutamaan yang luar biasa bagi kehidupan seorang Muslim.", content: "Membaca Al-Qur'an adalah salah satu ibadah yang paling utama. Rasulullah SAW bersabda: 'Sebaik-baik kalian adalah yang belajar Al-Qur'an dan mengajarkannya.' (HR. Bukhari). Setiap huruf yang dibaca bernilai satu kebaikan, dan satu kebaikan dilipat gandakan menjadi sepuluh kebaikan.", category: "akidah", tags: ["quran","ibadah","keutamaan"], views: 150 },
  { id: "art2", title: "Panduan Sholat yang Benar", slug: "panduan-sholat-benar", excerpt: "Pelajari tata cara sholat yang sesuai dengan sunnah Rasulullah SAW.", content: "Sholat adalah tiang agama. Ia merupakan ibadah pertama yang akan dihisab pada hari kiamat. Sholat yang benar dimulai dari niat yang ikhlas, berwudhu dengan sempurna, menghadap kiblat, dan melaksanakan setiap rukun dengan khusyuk.", category: "fiqih", tags: ["sholat","ibadah","fiqih"], views: 230 },
  { id: "art3", title: "Adab dan Akhlak dalam Islam", slug: "adab-akhlak-islam", excerpt: "Islam mengajarkan adab dan akhlak mulia dalam setiap aspek kehidupan.", content: "Akhlak yang baik adalah cerminan keimanan seorang Muslim. Rasulullah SAW bersabda: 'Sesungguhnya aku diutus untuk menyempurnakan akhlak yang mulia.' Akhlak meliputi kejujuran, amanah, kesabaran, dan kasih sayang terhadap sesama.", category: "akhlak", tags: ["akhlak","adab","islam"], views: 180 },
  { id: "art4", title: "Tafsir Surah Al-Fatihah", slug: "tafsir-surah-al-fatihah", excerpt: "Memahami makna mendalam dari Surah Al-Fatihah, surah yang dibaca setiap rakaat sholat.", content: "Surah Al-Fatihah adalah surah pertama dalam Al-Qur'an yang terdiri dari 7 ayat. Surah ini disebut juga Ummul Qur'an (Induk Al-Qur'an) karena mengandung pokok-pokok ajaran Islam: tauhid, ibadah, dan petunjuk jalan yang lurus.", category: "tafsir", tags: ["tafsir","al-fatihah","quran"], views: 320 },
  { id: "art5", title: "Sejarah Turunnya Al-Qur'an", slug: "sejarah-turunnya-quran", excerpt: "Mengenal sejarah wahyu Al-Qur'an yang diturunkan selama 23 tahun.", content: "Al-Qur'an diturunkan kepada Nabi Muhammad SAW melalui perantaraan Malaikat Jibril selama kurang lebih 23 tahun. Wahyu pertama turun di Gua Hira pada malam 17 Ramadhan, yaitu lima ayat pertama Surah Al-Alaq.", category: "sejarah", tags: ["sejarah","quran","wahyu"], views: 275 },
  { id: "art6", title: "Tips Menghafal Al-Qur'an", slug: "tips-menghafal-quran", excerpt: "Cara efektif menghafal Al-Qur'an dengan metode yang mudah dan konsisten.", content: "Menghafal Al-Qur'an membutuhkan kesabaran dan konsistensi. Beberapa tips: 1) Niatkan karena Allah, 2) Baca berulang minimal 20 kali, 3) Hafal setelah Subuh, 4) Muraja'ah setiap hari, 5) Cari teman menghafal, 6) Gunakan satu mushaf.", category: "akidah", tags: ["hafalan","quran","tips"], views: 410 },
];

const courses = [
  { id: "cls1", title: "Tahsin Al-Qur'an Level Dasar", slug: "tahsin-dasar", description: "Pelajari cara membaca Al-Qur'an dengan benar sesuai kaidah tajwid. Cocok untuk pemula yang ingin memperbaiki bacaan.", type: "tahsin", status: "published", students: 45 },
  { id: "cls2", title: "Tahfidz Juz 30", slug: "tahfidz-juz-30", description: "Program menghafal Juz 30 (Juz Amma) dengan metode talaqqi bersama ustadz berpengalaman.", type: "tahfidz", status: "published", students: 32 },
  { id: "cls3", title: "Webinar: Memahami Tafsir Ibnu Katsir", slug: "webinar-tafsir-ibnu-katsir", description: "Seri webinar mingguan membahas tafsir Al-Qur'an berdasarkan kitab Tafsir Ibnu Katsir.", type: "webinar", status: "published", students: 120 },
  { id: "cls4", title: "Tahsin Al-Qur'an Level Menengah", slug: "tahsin-menengah", description: "Lanjutan dari level dasar. Fokus pada hukum tajwid lanjutan: idgham, ikhfa, iqlab, dan waqaf.", type: "tahsin", status: "published", students: 28 },
  { id: "cls5", title: "Tahfidz Surah-Surah Pilihan", slug: "tahfidz-surah-pilihan", description: "Hafal surah-surah pilihan: Yasin, Ar-Rahman, Al-Mulk, Al-Waqi'ah dengan bimbingan.", type: "tahfidz", status: "published", students: 56 },
  { id: "cls6", title: "Webinar: Fiqih Ibadah Sehari-hari", slug: "webinar-fiqih-ibadah", description: "Pembahasan fiqih praktis seputar thaharah, sholat, puasa, dan zakat.", type: "webinar", status: "published", students: 89 },
];

async function seedArticles() {
  console.log("📰 Seeding articles...");
  for (const art of articles) {
    const body = {
      fields: {
        title: { stringValue: art.title },
        slug: { stringValue: art.slug },
        excerpt: { stringValue: art.excerpt },
        content: { stringValue: art.content },
        category: { stringValue: art.category },
        authorId: { stringValue: "system" },
        tags: { arrayValue: { values: art.tags.map(t => ({ stringValue: t })) } },
        featured: { booleanValue: false },
        views: { integerValue: String(art.views) },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() },
      }
    };
    const res = await fetch(`${BASE}/articles/${art.id}?key=${API_KEY}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) console.log(`  ✓ Article: ${art.title}`);
    else console.log(`  ✗ Article ${art.title}: ${(await res.json()).error?.message}`);
  }
}

async function seedCourses() {
  console.log("\n🎓 Seeding courses...");
  for (const cls of courses) {
    const body = {
      fields: {
        title: { stringValue: cls.title },
        slug: { stringValue: cls.slug },
        description: { stringValue: cls.description },
        instructorId: { stringValue: "system" },
        type: { stringValue: cls.type },
        status: { stringValue: cls.status },
        students: { integerValue: String(cls.students) },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() },
      }
    };
    const res = await fetch(`${BASE}/courses/${cls.id}?key=${API_KEY}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) console.log(`  ✓ Course: ${cls.title}`);
    else console.log(`  ✗ Course ${cls.title}: ${(await res.json()).error?.message}`);
  }
}

async function main() {
  await seedArticles();
  await seedCourses();
  console.log("\n✅ All content seeded!\n");
}

main();
