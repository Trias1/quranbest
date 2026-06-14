# QuickStart Guide - QuranBest Platform

Panduan cepat untuk memulai development QuranBest.

## Prerequisites

- Node.js 18+
- npm atau yarn
- Firebase Project (free tier)
- Git

## Installation (5 menit)

### 1. Clone dan Setup
```bash
cd /Users/macbook/Project/project-new
cd quran-best
npm install
```

### 2. Setup Firebase

1. Buka [Firebase Console](https://console.firebase.google.com)
2. Create new project → Firestore Database → Authentication
3. Copy credentials

### 3. Environment Setup
```bash
# Copy template
cp .env.local.example .env.local

# Edit dan paste Firebase credentials
nano .env.local
```

### 4. Start Development
```bash
npm run dev
# Buka http://localhost:3000
```

## Project Structure

```
quran-best/
├── src/
│   ├── app/                 # Next.js pages
│   │   ├── page.tsx        # Homepage
│   │   ├── auth/           # Login/Register
│   │   ├── quran/          # Quran reader
│   │   ├── articles/       # Articles
│   │   ├── courses/        # Courses
│   │   ├── donate/         # Donations
│   │   ├── community/      # Community
│   │   ├── dashboard/      # User dashboard
│   │   ├── admin/          # Admin panel
│   │   └── api/            # API routes
│   ├── components/          # Reusable components
│   ├── lib/                # Utilities & configs
│   ├── services/           # Firestore services
│   ├── hooks/              # Custom hooks
│   ├── store/              # Zustand store
│   └── types/              # TypeScript types
├── public/                  # Static assets
├── .env.local.example      # Env template
└── package.json            # Dependencies
```

## Core Pages

| Page | Path | Status |
|------|------|--------|
| Homepage | `/` | ✅ |
| Quran Reader | `/quran` | ✅ |
| Surah Detail | `/quran/surah/[number]` | ✅ |
| Articles | `/articles` | ✅ |
| Courses | `/courses` | ✅ |
| Donations | `/donate` | ✅ |
| Community | `/community` | ✅ |
| Dashboard | `/dashboard` | ✅ |
| Admin | `/admin` | ✅ |
| Login | `/auth/login` | ✅ |
| Register | `/auth/register` | ✅ |

## Key Features

### Implemented ✅
- User authentication (Email & Google)
- Quran reader dengan bookmark
- Article management
- Course listing
- Donation page
- Community forum
- User dashboard
- Admin panel
- Responsive design
- Tailwind CSS styling

### To Implement ⏳
- Payment gateway integration
- Email notifications
- Advanced search (Meilisearch)
- File uploads
- Real-time chat
- Video course streaming
- Certificate generation
- Mobile app (Flutter)

## Development Workflow

### Adding New Page

```bash
# 1. Create directory
mkdir -p src/app/newpage

# 2. Create page.tsx
cat > src/app/newpage/page.tsx << 'EOL'
"use client"

export default function NewPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold">New Page</h1>
    </div>
  )
}
EOL

# 3. Access at http://localhost:3000/newpage
```

### Adding New Component

```bash
# Create component
cat > src/components/my-component.tsx << 'EOL'
interface Props {
  title: string
}

export function MyComponent({ title }: Props) {
  return <div className="p-4">{title}</div>
}
EOL

# Use in pages
import { MyComponent } from "@/components/my-component"
```

### Adding Service

```bash
# Add to src/services/firestoreService.ts
export const myService = {
  async getData() {
    const querySnapshot = await getDocs(collection(db, "mycollection"))
    return querySnapshot.docs.map(doc => doc.data())
  }
}
```

## Firebase Collections (To Create)

```
users/
surahs/
ayahs/
bookmarks/
readingProgress/
articles/
courses/
donations/
notifications/
```

Lihat `FIREBASE_SETUP.md` untuk detail lengkap.

## Available Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

## Troubleshooting

### Firebase Connection Error
- Check `.env.local` credentials
- Verify API keys di Firebase Console
- Pastikan billing enabled

### Page not loading
- Check browser console untuk errors
- Verify routing di Next.js
- Clear cache: `rm -rf .next`

### Build errors
- Delete `node_modules`: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear Next.js cache: `rm -rf .next`

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Next Steps

1. ✅ Setup Firebase project (lihat FIREBASE_SETUP.md)
2. ⏳ Load sample Quran data
3. ⏳ Setup payment gateway
4. ⏳ Configure email notifications
5. ⏳ Deploy to Vercel/AWS

## Support

Lihat dokumentasi lengkap:
- `README.md` - Overview
- `FIREBASE_SETUP.md` - Firebase configuration
- `PAYMENT_GATEWAY.md` - Payment integration
- `DEPLOYMENT.md` - Deployment guide
- `FEATURES.md` - Features documentation

Happy coding! 🚀
