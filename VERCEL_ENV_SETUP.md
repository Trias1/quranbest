# 📝 Konfigurasi Environment Variables di Vercel

## 🔐 Firebase Configuration Variables

Salin & paskan variables ini di Vercel Dashboard:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCNCLemLydv4FFvs9yyB_kdUo_jLlEN2PE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=newp-3d79f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=newp-3d79f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=newp-3d79f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=395960411721
NEXT_PUBLIC_FIREBASE_APP_ID=1:395960411721:web:ac40e6d5275ef2a0bfc198
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://newp-3d79f-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-0KEVRK95Y7
```

---

## 📋 Step-by-Step Setup di Vercel

### 1. Login ke Vercel Dashboard
- Buka: https://vercel.com/dashboard
- Pilih project **quran-best**

### 2. Buka Settings → Environment Variables
- Klik **Settings** tab
- Klik **Environment Variables** di sidebar kiri

### 3. Tambahkan Setiap Variable

Untuk setiap baris di atas, lakukan:

1. Klik **Add New**
2. Paste nama variable di field **Name** (contoh: `NEXT_PUBLIC_FIREBASE_API_KEY`)
3. Paste value di field **Value**
4. Pastikan **Production**, **Preview**, dan **Development** semuanya di-cek ✓
5. Klik **Save**

### 4. Contoh Input

**Variable 1:**
- Name: `NEXT_PUBLIC_FIREBASE_API_KEY`
- Value: `AIzaSyCNCLemLydv4FFvs9yyB_kdUo_jLlEN2PE`
- ✓ Production
- ✓ Preview
- ✓ Development

**Variable 2:**
- Name: `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- Value: `newp-3d79f.firebaseapp.com`
- ✓ Production
- ✓ Preview
- ✓ Development

*...dst untuk semua variables*

---

## 🎯 Environment Checklist

```
[ ] NEXT_PUBLIC_FIREBASE_API_KEY
[ ] NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
[ ] NEXT_PUBLIC_FIREBASE_PROJECT_ID
[ ] NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
[ ] NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
[ ] NEXT_PUBLIC_FIREBASE_APP_ID
[ ] NEXT_PUBLIC_FIREBASE_DATABASE_URL
[ ] NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

---

## 🔄 Deploy Setelah Setup

Setelah semua variables di-set:

### Option 1: Auto Deploy (jika sudah connect GitHub)
- Push ke GitHub → Vercel auto-deploy

### Option 2: Manual Redeploy
1. Buka Vercel Dashboard
2. Klik **Deployments** tab
3. Klik **...** pada latest deployment
4. Pilih **Redeploy**

---

## ✅ Verify Deployment

Setelah deploy selesai:

1. Cek build logs di Vercel
   - Status harus **✓ Success**
   - Tidak ada Firebase errors

2. Test API endpoint:
   ```
   curl https://quran-best.vercel.app/api/quran/surahs
   ```
   - Harus return JSON array of surahs
   - Status code: 200

3. Test di browser:
   - https://quran-best.vercel.app/
   - https://quran-best.vercel.app/quran
   - https://quran-best.vercel.app/auth/register

---

## 🐛 Troubleshooting

### Masih Error `auth/invalid-api-key`?

**Solusi:**
1. Pastikan **semua 8 variables** sudah di-set
2. Cek spelling (case-sensitive!)
3. Jangan ada space di awal/akhir value
4. Pastikan Production/Preview/Development all checked
5. Tunggu 2-3 menit setelah save (cache propagation)
6. Lakukan redeploy manual

### Environment Variables tidak terdeteksi?

**Solusi:**
1. Clear Vercel cache:
   - Settings → **Deployment** → Clear Production Deployments
2. Redeploy dengan klik **Redeploy** button
3. Tunggu build selesai

### Build masih gagal?

1. Buka Vercel build logs
2. Cari error message
3. Pastikan `.env.local.example` sudah ter-update
4. Check file `src/lib/firebase.ts` sudah benar

---

## 📌 Important Notes

⚠️ **JANGAN:**
- ❌ Commit `.env.local` ke GitHub (sudah ada di `.gitignore`)
- ❌ Share API key publik ke orang lain
- ❌ Hardcode environment variables di source code

✅ **DO:**
- ✓ Set semua variables di Vercel dashboard
- ✓ Keep `.env.local` untuk local development saja
- ✓ Use `.env.local.example` sebagai reference
- ✓ Redeploy setelah perubahan env variables

---

## 🔗 Firebase Config Reference

Ini adalah config Firebase project **newp-3d79f**:

```javascript
// Untuk referensi saja
const firebaseConfig = {
  apiKey: "AIzaSyCNCLemLydv4FFvs9yyB_kdUo_jLlEN2PE",
  authDomain: "newp-3d79f.firebaseapp.com",
  databaseURL: "https://newp-3d79f-default-rtdb.firebaseio.com",
  projectId: "newp-3d79f",
  storageBucket: "newp-3d79f.firebasestorage.app",
  messagingSenderId: "395960411721",
  appId: "1:395960411721:web:ac40e6d5275ef2a0bfc198",
  measurementId: "G-0KEVRK95Y7"
};
```

---

**Status:** ✅ Ready for Manual Setup
**Last Updated:** 2026-06-15
