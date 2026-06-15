# 🔥 Firebase Setup untuk QuranBest

## ✅ Status: Firebase Project Sudah Ada!

Project ID: **newp-3d79f**
- ✅ Firebase Auth sudah tersedia
- ✅ Firestore Database siap digunakan
- ✅ Firebase Storage siap digunakan

## 📋 Langkah Setup Firebase

### 1. Buka Firebase Console
https://console.firebase.google.com/project/newp-3d79f

### 2. Enable Firestore Database

**Langkah:**
1. Di sidebar, pilih **Firestore Database**
2. Klik **Create Database**
3. Pilih lokasi: **asia-southeast1** (Singapore - terdekat)
4. Mode: **Start in test mode** (untuk development)
5. Klik **Create**

### 3. Create Firestore Collections

Buat collection berikut dengan menambahkan document:

#### Collection: `surahs`
```
Contoh document:
{
  number: 1
  nameAr: "الفاتحة"
  nameLatin: "Al-Fatihah"
  meaning: "The Opening"
  totalAyah: 7
  revelation: "makkah"
}
```

Untuk load semua surah, gunakan script Python ini:

```python
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Download JSON key dari Firebase Console
# Project Settings → Service Accounts → Generate New Private Key

cred = credentials.Certificate('path/to/serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Data Surah (sediakan data lengkap)
surahs = [
    {
        "number": 1,
        "nameAr": "الفاتحة",
        "nameLatin": "Al-Fatihah",
        "meaning": "The Opening",
        "totalAyah": 7,
        "revelation": "makkah"
    },
    # ... tambahkan semua 114 surah
]

for surah in surahs:
    db.collection('surahs').document(str(surah['number'])).set(surah)
```

#### Collection: `ayahs`
```
Contoh document:
{
  surahId: "1"
  surahNumber: 1
  ayahNumber: 1
  textAr: "بسم الله الرحمن الرحيم"
  textInd: "Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang."
  textEn: "In the name of Allah, the Most Gracious, the Most Merciful."
}
```

#### Collection: `users`
```
Auto-created ketika user register via Firebase Auth
{
  uid: "user-id-from-auth"
  email: "user@example.com"
  name: "User Name"
  displayName: "User Name"
  photoURL: null
  role: "member"
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### Collection: `bookmarks`
```
{
  userId: "uid-user"
  ayahId: "ayah-id"
  surahNumber: 1
  ayahNumber: 1
  createdAt: timestamp
}
```

#### Collection: `readingProgress`
```
{
  userId: "uid-user"
  surahNumber: 1
  ayahNumber: 7
  lastRead: timestamp
}
```

#### Collection: `articles`
```
{
  title: "Judul Artikel"
  slug: "judul-artikel"
  content: "Isi artikel..."
  excerpt: "Ringkasan singkat..."
  authorId: "uid-author"
  category: "akidah"
  tags: ["islam", "pembelajaran"]
  featured: false
  views: 0
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### Collection: `courses`
```
{
  title: "Tahsin Quran Level 1"
  slug: "tahsin-level-1"
  description: "Belajar tajweed dasar..."
  thumbnail: "url-image"
  instructorId: "uid-instructor"
  type: "tahsin"
  status: "published"
  students: 0
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### Collection: `donations`
```
{
  userId: "uid-user"
  amount: 100000
  campaignId: "campaign-id"
  status: "pending"
  transactionId: "txn-id"
  createdAt: timestamp
}
```

### 4. Enable Authentication

**Langkah:**
1. Di sidebar, pilih **Authentication**
2. Klik **Get started**
3. Enable providers:
   - **Email/Password**
   - **Google**

### 5. Configure Firestore Security Rules

**Langkah:**
1. Buka **Firestore Database** → **Rules**
2. Ganti dengan rules berikut:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read only
    match /surahs/{document=**} {
      allow read: if true;
      allow write: if false;
    }

    match /ayahs/{document=**} {
      allow read: if true;
      allow write: if false;
    }

    match /articles/{document=**} {
      allow read: if true;
      allow write: if false;
    }

    match /courses/{document=**} {
      allow read: if true;
      allow write: if false;
    }

    // Users - only self can read/write
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow create: if request.auth.uid == userId;
      allow update: if request.auth.uid == userId;
      allow delete: if false;
    }

    // Bookmarks - user can only access their own
    match /bookmarks/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
    }

    // Reading Progress - user can only access their own
    match /readingProgress/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
      allow write: if request.auth.uid == request.resource.data.userId;
    }

    // Donations - user can only access their own
    match /donations/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }

    // Notifications - user can only access their own
    match /notifications/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
      allow write: if false;
    }
  }
}
```

3. Klik **Publish**

### 6. Test Koneksi

Jalankan di terminal:
```bash
cd /Users/macbook/Project/project-new/quran-best
npm run dev
```

Buka browser: **http://localhost:3000/auth/register**

Coba register dengan email baru. Jika berhasil, user akan muncul di Firebase Console → Authentication.

## 🔑 Cara Get Data Sample Quran

### Option 1: Download dari API

```bash
# Download Quran data JSON
curl -o quran.json https://api.alquran.cloud/v1/quran/quran-kemenag

# Parse dan upload ke Firestore
# (gunakan Firebase Admin SDK atau import manual)
```

### Option 2: Manual Setup (Singkat)

Hanya tambahkan beberapa surah untuk testing:

1. Buka Firebase Console → Firestore Database
2. Klik **+ Start collection** → beri nama `surahs`
3. Tambah document:
   - Document ID: `1`
   - Data:
   ```
   number: 1
   nameAr: الفاتحة
   nameLatin: Al-Fatihah
   meaning: The Opening
   totalAyah: 7
   revelation: makkah
   ```

4. Buat collection `ayahs` dan tambah ayat sample

## ✅ Checklist Setup

- [ ] Login ke Firebase Console (newp-3d79f)
- [ ] Firestore Database sudah diaktifkan
- [ ] Collections sudah dibuat (surahs, ayahs, users, etc)
- [ ] Authentication (Email/Password + Google) sudah diaktifkan
- [ ] Firestore Security Rules sudah di-update
- [ ] Test register di http://localhost:3000/auth/register
- [ ] Cek user muncul di Firebase Console

## 🧪 Testing

Setelah setup selesai:

### Test Registration
```
1. Buka: http://localhost:3000/auth/register
2. Isi email & password
3. Klik Daftar
4. Cek Firebase Console → Authentication (user akan muncul)
```

### Test Quran Reader
```
1. Buka: http://localhost:3000/quran
2. Harus menampilkan daftar Surah dari Firestore
```

### Test Bookmark
```
1. Login terlebih dahulu
2. Buka surah
3. Bookmark suatu ayat
4. Data akan disimpan di collection 'bookmarks'
```

## 🐛 Troubleshooting

**Error: "Firebase not initialized"**
- Pastikan .env.local sudah punya credentials yang benar
- Restart: `npm run dev`

**Error: "Permission denied"**
- Buka Firestore Database → Rules
- Pastikan rules sudah di-publish dengan benar

**User tidak muncul di Authentication**
- Cek apakah Email/Password provider sudah diaktifkan
- Lihat console browser untuk error details

**Surah tidak muncul di halaman Quran**
- Pastikan collection `surahs` sudah dibuat
- Minimal tambah 1 document untuk testing
- Cek browser console untuk error Firebase

## 📞 Bantuan Lebih Lanjut

1. Firebase Documentation: https://firebase.google.com/docs
2. Firestore Setup: https://firebase.google.com/docs/firestore/quickstart
3. Authentication: https://firebase.google.com/docs/auth/web/start

---

**Sudah siap? Jalankan:**
```bash
npm run dev
```

**Akses:** http://localhost:3000

Selamat! 🎉
