# QuranBest Platform

Platform digital Islam yang menyediakan Al-Qur'an online, tafsir, audio murottal, pembelajaran tahsin dan tahfidz, artikel Islami, program donasi, serta manajemen komunitas.

## 🚀 Fitur Utama

- 📖 **Baca Al-Qur'an** - Baca online dengan terjemahan multi bahasa
- 🎤 **Audio Murottal** - Dengarkan Al-Qur'an dari berbagai qari
- 📚 **Kelas Online** - Tahsin, Tahfidz, dan Webinar Islam
- 📰 **Artikel Islami** - Konten pembelajaran dan dakwah
- 🎁 **Program Donasi** - Dukung pendidikan Islam
- 👥 **Komunitas** - Forum, grup belajar, dan tanya ustadz

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **State Management**: Zustand
- **UI Components**: Shadcn UI, Lucide Icons

## 📋 Prerequisites

- Node.js 18+
- npm atau yarn
- Firebase Project

## 🔧 Installation

1. Clone repository:
```bash
git clone <repository-url>
cd quran-best
```

2. Install dependencies:
```bash
npm install
```

3. Setup Firebase:
   - Buat project di [Firebase Console](https://console.firebase.google.com)
   - Copy credentials
   - Buat file `.env.local` berdasarkan `.env.local.example`:
```bash
cp .env.local.example .env.local
```

4. Tambahkan Firebase credentials ke `.env.local`

5. Run development server:
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Project

```
src/
├── app/              # Next.js App Router
├── components/       # Reusable components
├── lib/             # Utilities dan Firebase config
├── services/        # Firestore services
├── hooks/           # Custom hooks
├── store/           # Zustand store
└── types/           # TypeScript types
```

## 📖 Pages

- `/` - Homepage
- `/quran` - List Surah
- `/quran/surah/[number]` - Detail Surah & Ayah
- `/articles` - Artikel Islami
- `/courses` - Kelas Online
- `/donate` - Donasi
- `/community` - Komunitas
- `/dashboard` - User Dashboard
- `/auth/login` - Login
- `/auth/register` - Register

## 🔐 Firebase Setup

### Collections yang diperlukan:

1. **users** - Data pengguna
2. **surahs** - Data Surah Al-Qur'an
3. **ayahs** - Data Ayat Al-Qur'an
4. **bookmarks** - Bookmark pengguna
5. **readingProgress** - Progress bacaan pengguna
6. **articles** - Artikel Islami
7. **courses** - Kelas Online
8. **donations** - Data Donasi

## 🚀 Deployment

### Vercel
```bash
vercel deploy
```

### Docker
```bash
docker build -t quran-best .
docker run -p 3000:3000 quran-best
```

## 📝 Environment Variables

Lihat `.env.local.example` untuk konfigurasi lengkap.

## 🤝 Contributing

Kontribusi sangat diterima! Silakan buat Pull Request.

## 📄 License

MIT License

## 📞 Support

Untuk pertanyaan atau support, silakan buat issue di GitHub.

---

**Build with ❤️ untuk Umat Islam**
