# Getting Started - QuranBest Platform

## 🎯 Quick Overview

QuranBest adalah platform pembelajaran Al-Qur'an terpadu yang dibangun dengan:
- **Frontend**: Next.js 15 + React 19 + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth

## ⚡ 5-Minute Setup

### 1. Prerequisites
```bash
# Pastikan installed:
- Node.js 18+ (download dari nodejs.org)
- npm atau yarn
- Git
- Firebase Account (gratis di firebase.google.com)
```

### 2. Clone Repository
```bash
cd /Users/macbook/Project/project-new
cd quran-best
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Firebase
```bash
# 1. Buka https://console.firebase.google.com
# 2. Create new project "quran-best"
# 3. Enable Firestore Database & Authentication
# 4. Copy project credentials
# 5. Create .env.local file:

cat > .env.local << 'EOL'
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
EOL
```

### 5. Start Development Server
```bash
npm run dev
# Open http://localhost:3000
```

## 📁 Project Structure

```
quran-best/
├── src/
│   ├── app/              # Next.js pages & routes
│   ├── components/       # Reusable React components
│   ├── lib/             # Utilities & config
│   ├── services/        # Firebase services
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand state
│   ├── types/           # TypeScript types
│   └── globals.css      # Global styles
├── public/              # Static files
├── .env.local.example   # Env template
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🚀 Available Pages

| Page | URL | Status |
|------|-----|--------|
| Homepage | `/` | ✅ Ready |
| Quran Reader | `/quran` | ✅ Ready |
| Surah Detail | `/quran/surah/1` | ✅ Ready |
| Articles | `/articles` | ✅ Ready |
| Courses | `/courses` | ✅ Ready |
| Donations | `/donate` | ✅ Ready |
| Community | `/community` | ✅ Ready |
| Dashboard | `/dashboard` | ✅ Ready (Login required) |
| Admin Panel | `/admin` | ✅ Ready (Admin only) |
| Login | `/auth/login` | ✅ Ready |
| Register | `/auth/register` | ✅ Ready |

## 🔧 Key Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Build & Deploy
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint --fix       # Fix linting errors

# Docker (Optional)
docker build -t quran-best .
docker run -p 3000:3000 quran-best
```

## 🔐 Firebase Setup Checklist

- [ ] Create Firebase project
- [ ] Enable Firestore Database
- [ ] Enable Authentication (Email & Google)
- [ ] Enable Firebase Storage (optional)
- [ ] Create collections (see FIREBASE_SETUP.md)
- [ ] Configure Firestore security rules
- [ ] Get credentials and add to .env.local
- [ ] Add Google OAuth credentials (for Google Sign-In)

## 📝 Common Tasks

### Add New Page
```bash
# Create directory
mkdir -p src/app/mypage

# Create page.tsx
cat > src/app/mypage/page.tsx << 'EOL'
"use client"
import { useAuth } from "@/hooks/useAuth"

export default function MyPage() {
  const { user, loading } = useAuth()

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold">My Page</h1>
    </div>
  )
}
EOL

# Access at http://localhost:3000/mypage
```

### Create New Component
```bash
cat > src/components/my-button.tsx << 'EOL'
interface Props {
  text: string
  onClick?: () => void
}

export function MyButton({ text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700"
    >
      {text}
    </button>
  )
}
EOL
```

### Add Firestore Service
```bash
# Edit src/services/firestoreService.ts
# Tambahkan:

export const myService = {
  async create(data: any) {
    const docRef = await addDoc(collection(db, "mycollection"), data)
    return docRef.id
  },

  async getAll() {
    const querySnapshot = await getDocs(collection(db, "mycollection"))
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }
}
```

## 🎨 Tailwind CSS Classes Reference

```jsx
// Container & Spacing
<div className="container py-12 px-4">

// Typography
<h1 className="text-4xl font-bold">
<p className="text-gray-600 text-sm">

// Colors
bg-primary        // Green (#10B981)
bg-secondary      // Purple (#8B5CF6)
bg-accent         // Amber (#F59E0B)
text-primary      // Green
text-gray-600     // Gray

// Layout
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
flex items-center justify-between gap-4

// Effects
hover:shadow-lg transition rounded-lg border border-gray-200
```

## 🔗 Component Examples

### Using Button Component
```jsx
import { Button } from "@/components/button"

<Button variant="primary" size="lg">
  Click Me
</Button>
```

### Using Card Component
```jsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Using Input Component
```jsx
import { Input } from "@/components/input"

<Input
  label="Email"
  type="email"
  placeholder="example@email.com"
  error={errors.email}
/>
```

## 🔑 Using Auth Hook

```jsx
"use client"
import { useAuth } from "@/hooks/useAuth"
import { authService } from "@/lib/auth"

export function MyComponent() {
  const { user, loading } = useAuth()

  const handleLogout = async () => {
    await authService.logout()
    // Redirect or update state
  }

  if (loading) return <div>Loading...</div>
  
  if (!user) return <div>Please login</div>

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
```

## 🐛 Troubleshooting

### Issue: "Firebase connection failed"
```
Solution:
1. Check .env.local file credentials
2. Verify Firebase project ID
3. Enable Firestore Database
4. Check internet connection
```

### Issue: "Cannot read property 'uid' of null"
```
Solution:
1. User not authenticated
2. Wrap component with useAuth check
3. Redirect to login if not authenticated
```

### Issue: "Build fails with 'Cannot find module'"
```
Solution:
1. npm install
2. Check import paths (use @/ alias)
3. Verify TypeScript types are correct
4. npm run build again
```

### Issue: "Page not loading"
```
Solution:
1. Check browser console for errors
2. Clear Next.js cache: rm -rf .next
3. Restart dev server: npm run dev
4. Check Firebase Firestore has data
```

## 📚 Documentation Files

- **README.md** - Project overview
- **QUICKSTART.md** - Quick start guide
- **FIREBASE_SETUP.md** - Firebase configuration
- **PAYMENT_GATEWAY.md** - Payment integration
- **DEPLOYMENT.md** - Deployment guide
- **ARCHITECTURE.md** - System architecture
- **FEATURES.md** - Features documentation
- **GETTING_STARTED.md** (this file)

## 🌐 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 📞 Need Help?

1. Check documentation files (*.md)
2. Search browser console for errors
3. Check Firebase Firestore data
4. Verify .env.local credentials
5. Check network tab in browser DevTools

## 🎯 Next Steps

After setup:
1. ✅ Load sample Quran data into Firestore
2. ✅ Create test user account
3. ✅ Try features on local dev server
4. ✅ Setup payment gateway (optional)
5. ✅ Deploy to Vercel/Production

## 🚀 Deployment

See DEPLOYMENT.md for detailed guide:
- Vercel (Recommended)
- AWS Amplify
- Docker
- VPS (DigitalOcean, Linode)

---

Happy coding! 🎉

For more details, see README.md and other documentation files.
