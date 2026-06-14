# Firebase Setup Guide untuk QuranBest

Panduan lengkap untuk setup Firebase di project QuranBest.

## 1. Buat Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com)
2. Klik "Create a new project"
3. Masukkan nama project: `quran-best`
4. Pilih lokasi (Indonesia)
5. Klik "Create project"

## 2. Setup Authentication

1. Di Firebase Console, pilih project yang baru dibuat
2. Pergi ke **Authentication** → **Sign-in method**
3. Enable provider:
   - Email/Password
   - Google

## 3. Setup Firestore Database

1. Pergi ke **Firestore Database**
2. Klik "Create database"
3. Pilih lokasi: `asia-southeast1` (Jakarta)
4. Pilih mode: `Start in test mode` (untuk development)

### Create Collections

#### 1. Users Collection
```
Collection: users
Documents structure:
{
  uid: string (auto)
  email: string
  name: string
  photoURL: string (optional)
  role: "guest" | "member" | "teacher" | "admin"
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 2. Surahs Collection
```
Collection: surahs
Documents:
{
  number: number (1-114)
  nameAr: string (nama Arab)
  nameLatin: string
  meaning: string
  totalAyah: number
  revelation: "makkah" | "madina"
}
```

#### 3. Ayahs Collection
```
Collection: ayahs
Documents:
{
  surahId: string (reference ke surahs)
  surahNumber: number
  ayahNumber: number
  textAr: string (teks Arab)
  textInd: string (terjemahan Indonesia)
  textEn: string (terjemahan Inggris - optional)
}
```

#### 4. Bookmarks Collection
```
Collection: bookmarks
Documents:
{
  userId: string
  ayahId: string
  surahNumber: number
  ayahNumber: number
  createdAt: timestamp
}
```

#### 5. Reading Progress Collection
```
Collection: readingProgress
Documents:
{
  userId: string (unique)
  surahNumber: number
  ayahNumber: number
  lastRead: timestamp
}
```

#### 6. Articles Collection
```
Collection: articles
Documents:
{
  title: string
  slug: string
  content: string
  excerpt: string
  authorId: string
  category: string
  tags: array
  featured: boolean
  views: number
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 7. Courses Collection
```
Collection: courses
Documents:
{
  title: string
  slug: string
  description: string
  thumbnail: string (optional)
  instructorId: string
  type: "tahsin" | "tahfidz" | "webinar"
  status: "draft" | "published" | "archived"
  students: number
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 8. Donations Collection
```
Collection: donations
Documents:
{
  userId: string
  amount: number
  campaignId: string (optional)
  status: "pending" | "success" | "failed"
  transactionId: string (optional)
  createdAt: timestamp
}
```

## 4. Setup Firestore Rules (Security)

Pergi ke **Firestore Database** → **Rules** dan update dengan:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users - only self can read/write
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow create: if request.auth.uid == userId;
      allow update: if request.auth.uid == userId;
      allow delete: if false;
    }

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

## 5. Get Firebase Config

1. Pergi ke **Project Settings** (⚙️ icon)
2. Pilih tab **Your apps**
3. Klik aplikasi web
4. Copy config credentials

## 6. Update Environment Variables

Buat file `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 7. Setup Firebase Storage (Optional)

Untuk menyimpan file (images, audio, certificates):

1. Pergi ke **Storage**
2. Klik **Get started**
3. Setup security rules

## 8. Load Sample Data (Quran)

Untuk memuat data Quran, gunakan script berikut atau import dari CSV.

Data sample Quran dapat diunduh dari:
- [Quran JSON API](https://github.com/rn0x/quran-json)
- [Islamic Network Quran API](https://api.alquran.cloud/v1/quran)

## Testing

Untuk testing Firebase secara lokal:

```bash
firebase emulator:start
```

Pastikan Firestore Emulator berjalan di `localhost:8080`

---

## Troubleshooting

### "Permission denied" error
- Pastikan Firestore Rules sudah di-update
- Check uid user di Authentication

### Data tidak muncul
- Pastikan collection sudah dibuat
- Check console browser untuk error

### Firebase tidak connect
- Pastikan credentials di `.env.local` benar
- Check internet connection

---

Untuk bantuan lebih lanjut, lihat [Firebase Documentation](https://firebase.google.com/docs)
