const API_KEY = "AIzaSyCNCLemLydv4FFvs9yyB_kdUo_jLlEN2PE";
const PROJECT_ID = "newp-3d79f";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const ayahs = [
  // Al-Fatihah (Surah 1)
  {surahId:"1",surahNumber:1,ayahNumber:1,textAr:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",textInd:"Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",textEn:"In the name of Allah, the Most Gracious, the Most Merciful."},
  {surahId:"1",surahNumber:1,ayahNumber:2,textAr:"الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",textInd:"Segala puji bagi Allah, Tuhan seluruh alam.",textEn:"All praise is due to Allah, Lord of the worlds."},
  {surahId:"1",surahNumber:1,ayahNumber:3,textAr:"الرَّحْمَٰنِ الرَّحِيمِ",textInd:"Yang Maha Pengasih, Maha Penyayang.",textEn:"The Most Gracious, the Most Merciful."},
  {surahId:"1",surahNumber:1,ayahNumber:4,textAr:"مَالِكِ يَوْمِ الدِّينِ",textInd:"Pemilik hari pembalasan.",textEn:"Master of the Day of Judgment."},
  {surahId:"1",surahNumber:1,ayahNumber:5,textAr:"إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",textInd:"Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.",textEn:"You alone we worship, and You alone we ask for help."},
  {surahId:"1",surahNumber:1,ayahNumber:6,textAr:"اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",textInd:"Tunjukilah kami jalan yang lurus,",textEn:"Guide us to the straight path."},
  {surahId:"1",surahNumber:1,ayahNumber:7,textAr:"صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",textInd:"(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",textEn:"The path of those upon whom You have bestowed favor, not of those who have earned anger nor of those who are astray."},

  // An-Nas (Surah 114)
  {surahId:"114",surahNumber:114,ayahNumber:1,textAr:"قُلْ أَعُوذُ بِرَبِّ النَّاسِ",textInd:"Katakanlah, \"Aku berlindung kepada Tuhannya manusia,",textEn:"Say, \"I seek refuge in the Lord of mankind,"},
  {surahId:"114",surahNumber:114,ayahNumber:2,textAr:"مَلِكِ النَّاسِ",textInd:"Raja manusia,",textEn:"The Sovereign of mankind,"},
  {surahId:"114",surahNumber:114,ayahNumber:3,textAr:"إِلَٰهِ النَّاسِ",textInd:"Sesembahan manusia,",textEn:"The God of mankind,"},
  {surahId:"114",surahNumber:114,ayahNumber:4,textAr:"مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",textInd:"dari kejahatan (bisikan) setan yang bersembunyi,",textEn:"From the evil of the retreating whisperer,"},
  {surahId:"114",surahNumber:114,ayahNumber:5,textAr:"الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",textInd:"yang membisikkan (kejahatan) ke dalam dada manusia,",textEn:"Who whispers in the breasts of mankind,"},
  {surahId:"114",surahNumber:114,ayahNumber:6,textAr:"مِنَ الْجِنَّةِ وَالنَّاسِ",textInd:"dari (golongan) jin dan manusia.\"",textEn:"From among the jinn and mankind.\""},

  // Al-Ikhlas (Surah 112)
  {surahId:"112",surahNumber:112,ayahNumber:1,textAr:"قُلْ هُوَ اللَّهُ أَحَدٌ",textInd:"Katakanlah (Muhammad), \"Dialah Allah, Yang Maha Esa.",textEn:"Say, \"He is Allah, the One.\""},
  {surahId:"112",surahNumber:112,ayahNumber:2,textAr:"اللَّهُ الصَّمَدُ",textInd:"Allah tempat meminta segala sesuatu.",textEn:"Allah, the Eternal Refuge."},
  {surahId:"112",surahNumber:112,ayahNumber:3,textAr:"لَمْ يَلِدْ وَلَمْ يُولَدْ",textInd:"(Allah) tidak beranak dan tidak pula diperanakkan.",textEn:"He neither begets nor is born."},
  {surahId:"112",surahNumber:112,ayahNumber:4,textAr:"وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",textInd:"Dan tidak ada sesuatu yang setara dengan Dia.\"",textEn:"Nor is there to Him any equivalent.\""},

  // Al-Falaq (Surah 113)
  {surahId:"113",surahNumber:113,ayahNumber:1,textAr:"قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",textInd:"Katakanlah, \"Aku berlindung kepada Tuhan yang menguasai subuh,",textEn:"Say, \"I seek refuge in the Lord of daybreak,"},
  {surahId:"113",surahNumber:113,ayahNumber:2,textAr:"مِن شَرِّ مَا خَلَقَ",textInd:"dari kejahatan (makhluk yang) Dia ciptakan,",textEn:"From the evil of that which He created,"},
  {surahId:"113",surahNumber:113,ayahNumber:3,textAr:"وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",textInd:"dan dari kejahatan malam apabila telah gelap gulita,",textEn:"And from the evil of darkness when it settles,"},
  {surahId:"113",surahNumber:113,ayahNumber:4,textAr:"وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",textInd:"dan dari kejahatan (perempuan-perempuan) peniup pada buhul-buhul (tali),",textEn:"And from the evil of the blowers in knots,"},
  {surahId:"113",surahNumber:113,ayahNumber:5,textAr:"وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",textInd:"dan dari kejahatan orang yang dengki apabila dia dengki.\"",textEn:"And from the evil of an envier when he envies.\""},

  // Al-Kausar (Surah 108)
  {surahId:"108",surahNumber:108,ayahNumber:1,textAr:"إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",textInd:"Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak.",textEn:"Indeed, We have granted you al-Kawthar."},
  {surahId:"108",surahNumber:108,ayahNumber:2,textAr:"فَصَلِّ لِرَبِّكَ وَانْحَرْ",textInd:"Maka laksanakanlah sholat karena Tuhanmu, dan berkurbanlah.",textEn:"So pray to your Lord and sacrifice."},
  {surahId:"108",surahNumber:108,ayahNumber:3,textAr:"إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",textInd:"Sungguh, orang-orang yang membencimu dialah yang terputus (dari rahmat Allah).",textEn:"Indeed, your enemy is the one cut off."},

  // Al-'Asr (Surah 103)
  {surahId:"103",surahNumber:103,ayahNumber:1,textAr:"وَالْعَصْرِ",textInd:"Demi masa,",textEn:"By time,"},
  {surahId:"103",surahNumber:103,ayahNumber:2,textAr:"إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",textInd:"sungguh, manusia berada dalam kerugian,",textEn:"Indeed, mankind is in loss,"},
  {surahId:"103",surahNumber:103,ayahNumber:3,textAr:"إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",textInd:"kecuali orang-orang yang beriman dan mengerjakan kebajikan serta saling menasihati untuk kebenaran dan saling menasihati untuk kesabaran.",textEn:"Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience."},

  // Yasin (Surah 36) - first 5 ayat
  {surahId:"36",surahNumber:36,ayahNumber:1,textAr:"يس",textInd:"Ya Sin.",textEn:"Ya, Sin."},
  {surahId:"36",surahNumber:36,ayahNumber:2,textAr:"وَالْقُرْآنِ الْحَكِيمِ",textInd:"Demi Al-Qur'an yang penuh hikmah,",textEn:"By the wise Qur'an."},
  {surahId:"36",surahNumber:36,ayahNumber:3,textAr:"إِنَّكَ لَمِنَ الْمُرْسَلِينَ",textInd:"sungguh, engkau (Muhammad) adalah salah seorang dari rasul-rasul,",textEn:"Indeed you are from among the messengers,"},
  {surahId:"36",surahNumber:36,ayahNumber:4,textAr:"عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",textInd:"(yang berada) di atas jalan yang lurus,",textEn:"On a straight path."},
  {surahId:"36",surahNumber:36,ayahNumber:5,textAr:"تَنزِيلَ الْعَزِيزِ الرَّحِيمِ",textInd:"(sebagai wahyu) yang diturunkan oleh (Allah) Yang Mahaperkasa, Maha Penyayang,",textEn:"A revelation of the Exalted in Might, the Merciful."},
];

async function seed() {
  console.log("📖 Seeding ayahs ke Firestore...\n");
  let success = 0;
  for (const ayah of ayahs) {
    const docId = `${ayah.surahNumber}_${ayah.ayahNumber}`;
    const body = {
      fields: {
        surahId: { stringValue: ayah.surahId },
        surahNumber: { integerValue: String(ayah.surahNumber) },
        ayahNumber: { integerValue: String(ayah.ayahNumber) },
        textAr: { stringValue: ayah.textAr },
        textInd: { stringValue: ayah.textInd },
        textEn: { stringValue: ayah.textEn },
      }
    };
    try {
      const res = await fetch(`${BASE}/ayahs/${docId}?key=${API_KEY}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        success++;
        console.log(`  ✓ Surah ${ayah.surahNumber}:${ayah.ayahNumber}`);
      } else {
        console.log(`  ✗ ${docId}: ${(await res.json()).error?.message}`);
      }
    } catch (e) {
      console.log(`  ✗ ${docId}: ${e.message}`);
    }
  }
  console.log(`\n✅ Done! ${success} ayahs seeded\n`);
}

seed();
