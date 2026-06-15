# 🚀 Panduan Deploy QuranBest ke Vercel

## Ringkasan Issue yang Sudah Diperbaiki

### 1. **Firebase API Key Error** ❌ → ✅
**Masalah:** Error `auth/invalid-api-key` saat build
```
FirebaseError: Firebase: Error (auth/invalid-api-key)
```

**Root Cause:** Vercel environment variables tidak terakonfigurasi dengan baik

**Solusi:** Pastikan semua Firebase credentials sudah di-set di Vercel dashboard

---

## ✅ Pre-Deployment Checklist

### Local Setup
- [x] Firebase credentials sudah di `.env.local`
- [x] Build berhasil (`npm run build`)
- [x] Tidak ada ESLint errors/warnings
- [x] Git repository sudah initialized

### Fixes Applied
- [x] **prayer-times/page.tsx**: Wrap `fetchPrayerTimes` & `addMinutes` dengan `useCallback`
- [x] **layout.tsx**: Move custom fonts dari `<head>` ke `<style>` tag
- [x] Build output: ✓ Compiled successfully (no errors)

---

## 📋 Step-by-Step Deployment

### Step 1: Commit & Push ke GitHub

```bash
cd /Users/macbook/Project/project-new/quran-best

# Commit changes
git add src/app/layout.tsx src/app/prayer-times/page.tsx
git commit -m "fix: ESLint warnings & custom fonts setup"

# Push ke GitHub
git push origin main
```

### Step 2: Konfigurasi Environment Variables di Vercel

1. **Login ke Vercel:**
   - Buka: https://vercel.com/dashboard
   - Pilih project `quran-best`
   - Klik **Settings** → **Environment Variables**

2. **Tambahkan Firebase Credentials:**

   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyCNCLemLydv4FFvs9yyB_kdUo_jLlEN2PE` |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `newp-3d79f.firebaseapp.com` |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `newp-3d79f` |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `newp-3d79f.firebasestorage.app` |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `395960411721` |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:395960411721:web:ac40e6d5275ef2a0bfc198` |

3. **Set untuk semua environments:**
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development

### Step 3: Trigger Manual Deployment

1. Klik **Deployments**
2. Klik **...** (menu) pada latest deployment
3. Pilih **Redeploy**

Atau tunggu auto-deploy setelah push ke GitHub.

### Step 4: Verify Deployment

Akses URL deployment:
```
https://quran-best.vercel.app
```

**Test URLs:**
- ✅ Homepage: https://quran-best.vercel.app
- ✅ Quran Reader: https://quran-best.vercel.app/quran
- ✅ Prayer Times: https://quran-best.vercel.app/prayer-times
- ✅ Register: https://quran-best.vercel.app/auth/register
- ✅ API Health: https://quran-best.vercel.app/api/health
- ✅ Surahs API: https://quran-best.vercel.app/api/quran/surahs

---

## 🐛 Troubleshooting

### Error: `Firebase: Error (auth/invalid-api-key)`

**Solusi:**
1. Verifikasi API Key di Vercel Environment Variables
2. Pastikan prefix `NEXT_PUBLIC_` untuk client-side vars
3. Klik **Redeploy** setelah update env vars
4. Clear browser cache (Ctrl+Shift+Del)

### Build Timeout

**Solusi:**
1. Check Vercel build logs: https://vercel.com/dashboard
2. Optimize dependencies di `package.json`
3. Disable analytics jika perlu: `NEXT_PUBLIC_ANALYTICS_ID=`

### Firestore Connection Offline Warning

⚠️ Ini adalah **warning biasa** saat static generation:
```
@firebase/firestore: Could not reach Cloud Firestore backend
```

**Normal karena:**
- Static pages di-generate saat build (offline environment)
- Runtime akan connect normal ke Firebase
- Client-side requests akan work correctly

### Domain Configuration

Jika ingin custom domain:
1. Vercel Settings → Domains
2. Tambah domain Anda
3. Update DNS sesuai instruksi Vercel

---

## 📊 Monitoring

### Vercel Dashboard
- **Deployments**: History, logs, durations
- **Errors**: Real-time error tracking
- **Analytics**: Performance metrics
- **Functions**: Serverless API logs

### Firebase Console
1. Buka: https://console.firebase.google.com
2. Project: `newp-3d79f`
3. Monitor:
   - **Authentication**: User logins
   - **Firestore**: Data operations
   - **Security Rules**: Rule violations

---

## 🔄 Workflow Continuous Deployment

Setelah setup awal:

```bash
# 1. Develop locally
git checkout -b feature/new-feature
# ... edit files ...

# 2. Build test
npm run build

# 3. Commit & Push
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 4. GitHub → Pull Request
# Review & Merge ke main

# 5. Auto-deployment ke Vercel ✅
# Vercel akan auto-deploy setelah merge

# 6. Sync local
git checkout main
git pull origin main
```

---

## 🎯 Build Optimization

### Current Build Stats
```
Total Size: ~215 kB (First Load JS)
Static Pages: 20
Dynamic Routes: 3
Build Time: ~1-2 minutes
```

### Best Practices
- ✅ Use `next/image` untuk image optimization
- ✅ Code splitting via dynamic imports
- ✅ Caching headers via `next.config.js`
- ✅ Minify & compress assets

---

## 📱 Testing Checklist

Setelah deployment:

- [ ] Homepage loading
- [ ] Navigation working
- [ ] Quran reader loading surahs
- [ ] Prayer times fetching data
- [ ] User registration working
- [ ] Firebase authentication working
- [ ] API endpoints responding
- [ ] Images loading correctly
- [ ] Responsive design on mobile
- [ ] Performance acceptable (<3s load time)

---

## 🆘 Emergency Rollback

Jika ada issue di production:

1. Buka Vercel Dashboard
2. Klik **Deployments**
3. Pilih deployment sebelumnya yang stabil
4. Klik **...** → **Promote to Production**

---

## ✨ Next Steps

- [ ] Collect user feedback
- [ ] Monitor error logs
- [ ] Optimize images & fonts
- [ ] Add custom domain
- [ ] Set up error alerting (Sentry, etc)
- [ ] Plan Phase 2 features

---

**Status:** ✅ Ready for Production

**Last Updated:** 2026-06-15
**Build Version:** Next.js 14.2.35
**Environment:** Production
