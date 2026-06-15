const API_KEY = "AIzaSyCNCLemLydv4FFvs9yyB_kdUo_jLlEN2PE";
const PROJECT_ID = "newp-3d79f";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

async function fetchSurahFromAPI(surahNum) {
  // Fetch Arabic + Indonesian translation
  const [arRes, idRes] = await Promise.all([
    fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/ar.alafasy`),
    fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/id.indonesian`),
  ]);
  const arData = await arRes.json();
  const idData = await idRes.json();
  return { ar: arData.data, id: idData.data };
}

async function uploadAyah(surahNum, ayahNum, textAr, textInd) {
  const docId = `${surahNum}_${ayahNum}`;
  const body = {
    fields: {
      surahId: { stringValue: String(surahNum) },
      surahNumber: { integerValue: String(surahNum) },
      ayahNumber: { integerValue: String(ayahNum) },
      textAr: { stringValue: textAr },
      textInd: { stringValue: textInd },
    }
  };
  const res = await fetch(`${BASE}/ayahs/${docId}?key=${API_KEY}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.ok;
}

async function seedSurah(surahNum) {
  try {
    const { ar, id } = await fetchSurahFromAPI(surahNum);
    let success = 0;
    for (let i = 0; i < ar.ayahs.length; i++) {
      const ok = await uploadAyah(
        surahNum,
        ar.ayahs[i].numberInSurah,
        ar.ayahs[i].text,
        id.ayahs[i].text
      );
      if (ok) success++;
    }
    return { total: ar.ayahs.length, success };
  } catch (e) {
    return { total: 0, success: 0, error: e.message };
  }
}

async function main() {
  console.log("📖 Seeding ALL ayahs (114 surahs) ke Firestore...");
  console.log("   Sumber: api.alquran.cloud\n");
  
  let totalAyahs = 0;
  let totalSuccess = 0;

  for (let s = 1; s <= 114; s++) {
    const result = await seedSurah(s);
    totalAyahs += result.total;
    totalSuccess += result.success;
    
    if (result.error) {
      console.log(`  ✗ Surah ${s}: ERROR - ${result.error}`);
    } else {
      console.log(`  ✓ Surah ${s} — ${result.success}/${result.total} ayat`);
    }
  }

  console.log(`\n✅ Selesai! ${totalSuccess}/${totalAyahs} ayat berhasil di-upload`);
}

main();
