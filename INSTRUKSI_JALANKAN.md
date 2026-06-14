# 🚀 Instruksi Menjalankan QuranBest di Local

## 1. Buka Terminal

```bash
cd /Users/macbook/Project/project-new/quran-best
```

## 2. Jalankan Development Server

```bash
npm run dev
```

## 3. Buka di Browser

Setelah terminal menampilkan:
```
✓ Ready in X.Xs
- Local: http://localhost:3000
```

**Buka salah satu URL berikut di browser Anda:**

### 📱 URL Utama:
- **Homepage**: http://localhost:3000
- **Quran Reader**: http://localhost:3000/quran
- **Articles**: http://localhost:3000/articles
- **Courses**: http://localhost:3000/courses
- **Donations**: http://localhost:3000/donate
- **Community**: http://localhost:3000/community

### 🔐 Authentication:
- **Login**: http://localhost:3000/auth/login
- **Register**: http://localhost:3000/auth/register

### 👤 User Features (setelah login):
- **Dashboard**: http://localhost:3000/dashboard
- **Admin Panel**: http://localhost:3000/admin

## 4. Status Terminal

Terminal akan menunjukkan:
```
  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 2.3s
 ✓ Compiled client and server successfully
```

## 5. Browser Local Development

Setiap kali Anda:
- Mengedit file → Browser auto-refresh
- Menambah page → Langsung bisa diakses
- Fix error → Auto compile

## 🛑 Untuk Menghentikan Server

Tekan di terminal:
```
Ctrl + C
```

## 📝 Catatan Penting

1. **Firebase tidak connected** (demo mode)
   - Fitur read-only bisa diakses
   - Login/Register akan error (normal)
   - Fitur yang perlu database akan blank

2. **Untuk fitur penuh**: Setup Firebase terlebih dahulu
   - Lihat file: `FIREBASE_SETUP.md`

3. **Port berbeda**?
   Jika port 3000 sudah digunakan:
   ```bash
   PORT=3001 npm run dev
   # Akses: http://localhost:3001
   ```

## ✅ Yang Bisa Ditest Sekarang

- ✅ Layout & UI semua halaman
- ✅ Navigation menu
- ✅ Responsive design (mobile/desktop)
- ✅ Component styling
- ✅ Page structure
- ❌ Database operations (tanpa Firebase)
- ❌ Login/Register (tanpa Firebase)

## 🔧 Troubleshooting

**Error: "Port 3000 already in use"**
```bash
# Gunakan port lain:
PORT=3001 npm run dev
# Buka: http://localhost:3001
```

**Error: "Cannot find module"**
```bash
npm install
npm run dev
```

**Build errors**
```bash
rm -rf .next
npm run build
npm run dev
```

## 📞 Fitur yang Siap Ditest

### Halaman Static (Tidak perlu Firebase):
✅ Homepage - http://localhost:3000
✅ Quran list - http://localhost:3000/quran (layout saja)
✅ Articles page - http://localhost:3000/articles (layout)
✅ Courses page - http://localhost:3000/courses (layout)
✅ Donations page - http://localhost:3000/donate (form layout)
✅ Community page - http://localhost:3000/community (tabs layout)
✅ Admin panel - http://localhost:3000/admin (dashboard layout)

### Halaman dengan Interaksi:
✅ Responsive navigation
✅ Mobile menu toggle
✅ Button hover effects
✅ Form inputs
✅ Tab switching (community page)
✅ Card components
✅ Gradient backgrounds

---

## 🎯 URL Shortcuts

Bookmark ini untuk quick access:

```
Homepage:     http://localhost:3000
Quran:        http://localhost:3000/quran
Articles:     http://localhost:3000/articles
Courses:      http://localhost:3000/courses
Donate:       http://localhost:3000/donate
Community:    http://localhost:3000/community
Login:        http://localhost:3000/auth/login
Register:     http://localhost:3000/auth/register
Dashboard:    http://localhost:3000/dashboard
Admin:        http://localhost:3000/admin
```

---

**Selamat menggunakan QuranBest! 🎉**

Jika ada pertanyaan, cek file dokumentasi lainnya atau lihat source code di `src/`.
