# 🚀 Deploy QuranBest ke Vercel

## Prerequisites

- ✅ GitHub Account
- ✅ Vercel Account (gratis)
- ✅ Firebase Project sudah siap (newp-3d79f)

## Step 1: Push ke GitHub

### 1.1 Initialize Git Repository

```bash
cd /Users/macbook/Project/project-new/quran-best

# Initialize git
git init
git add .
git commit -m "Initial commit - QuranBest Platform"
```

### 1.2 Create GitHub Repository

1. Buka https://github.com/new
2. Nama: `quran-best`
3. Description: "Platform pembelajaran Al-Qur'an"
4. **Jangan** initialize README (sudah ada)
5. Klik **Create repository**

### 1.3 Push ke GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/quran-best.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy ke Vercel

### 2.1 Connect GitHub ke Vercel

1. Buka https://vercel.com/new
2. Klik **Continue with GitHub**
3. Authorize Vercel
4. Import repository `quran-best`

### 2.2 Configure Project

**Environment Variables:**

Tambahkan di Vercel:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCNCLemLydv4FFvs9yyB_kdUo_jLlEN2PE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=newp-3d79f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=newp-3d79f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=newp-3d79f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=395960411721
NEXT_PUBLIC_FIREBASE_APP_ID=1:395960411721:web:ac40e6d5275ef2a0bfc198
```

### 2.3 Deploy

1. Klik **Deploy**
2. Tunggu build selesai (±2 menit)
3. URL production: `https://quran-best.vercel.app`

## Step 3: Verify Deployment

### Test URLs:
- Homepage: https://quran-best.vercel.app
- Quran Reader: https://quran-best.vercel.app/quran
- Register: https://quran-best.vercel.app/auth/register
- Admin: https://quran-best.vercel.app/admin

### Verify Firebase Connection

1. Buka https://quran-best.vercel.app/auth/register
2. Coba register dengan email baru
3. Buka Firebase Console → Authentication
4. User baru harus muncul

## Step 4: Custom Domain (Optional)

### 4.1 Set Domain di Vercel

1. Buka Project di Vercel
2. Settings → Domains
3. Tambah domain yang sudah dimiliki
4. Follow DNS configuration

### 4.2 Update DNS

Sesuaikan dengan registrar domain Anda (GoDaddy, Namecheap, etc)

## ✅ Deployment Checklist

- [ ] Repository sudah di GitHub
- [ ] Project sudah di Vercel
- [ ] Environment variables sudah di-set
- [ ] Build berhasil (no errors)
- [ ] Homepage bisa diakses
- [ ] Registration bisa test
- [ ] User muncul di Firebase Console

## 🔄 Auto-Deployment

Setelah setup:
- Setiap push ke `main` branch → auto-deploy
- URL akan selalu: https://quran-best.vercel.app

## Local Development + Vercel Sync

```bash
# Buat feature branch
git checkout -b feature/nama-fitur

# Edit & commit
git add .
git commit -m "Add new feature"

# Push ke GitHub
git push origin feature/nama-fitur

# Di GitHub: Buat Pull Request
# Review & Merge ke main
# Vercel auto-deploy

# Sync ke local
git checkout main
git pull origin main
```

## 🐛 Troubleshooting

**Build failed di Vercel**
- Check build logs di Vercel dashboard
- Biasanya: missing dependencies, env variables
- Run `npm run build` di local untuk debug

**Environment variables not working**
- Pastikan di Vercel Settings → Environment Variables
- Gunakan prefix `NEXT_PUBLIC_` untuk client-side vars
- Restart deployment setelah update env vars

**Firebase connection error**
- Cek credentials di `.env.local` sudah benar
- Vercel setting harus sama dengan local
- Check Firestore Security Rules

**Domain issues**
- DNS propagation bisa 24 jam
- Clear browser cache
- Test dengan incognito mode

## 📊 Monitoring

Akses Vercel Dashboard:
- Deployment history
- Build logs
- Performance analytics
- Error tracking

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Firebase + Next.js: https://firebase.google.com/docs

---

**Selamat! Platform sudah live! 🎉**

URL: https://quran-best.vercel.app

Share dengan orang lain sekarang!
