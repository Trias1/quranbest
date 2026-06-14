# QuranBest Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER (Browser)                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  React Components (Pages, Layouts, Components)               │   │
│  │  - Navbar, Footer, Cards, Buttons, Inputs                   │   │
│  └──────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  State Management (Zustand)                                  │   │
│  │  - Auth Store, User Store                                   │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────────────┐
│                       SERVER LAYER (Next.js)                         │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  API Routes (app/api/*)                                      │   │
│  │  - Quran endpoints, Bookmark endpoints, etc                 │   │
│  └──────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Server Actions & Middleware                                │   │
│  │  - Authentication, Authorization                             │   │
│  └──────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Services (lib/*, services/*)                                │   │
│  │  - Firebase Auth, Firestore Services                         │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                              ↕ SDK/REST
┌─────────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER (Firebase)                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Firebase Authentication                                      │   │
│  │  - Email/Password, Google OAuth                             │   │
│  └──────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Firestore Database                                          │   │
│  │  - Users, Surahs, Ayahs, Articles, Courses, etc             │   │
│  └──────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Firebase Storage (Optional)                                 │   │
│  │  - Images, Audio, Documents                                 │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Zustand
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js (API Routes)
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Storage**: Firebase Storage (optional)

### Development Tools
- **Build Tool**: Next.js
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**: ESLint
- **Containerization**: Docker

## Data Flow

### User Registration Flow
```
User (Register Page)
    ↓
Form Submission
    ↓
authService.register()
    ↓
Firebase Auth
    ↓
Create User Document in Firestore
    ↓
Update Auth Store
    ↓
Redirect to Dashboard
```

### Quran Reading Flow
```
User (Quran Page)
    ↓
surahService.getAll()
    ↓
Firestore Query
    ↓
Display Surahs List
    ↓
User Selects Surah
    ↓
ayahService.getBySurah()
    ↓
Display Ayahs
    ↓
User Bookmarks/Reads
    ↓
Update Progress & Bookmarks
```

### Donation Flow
```
User (Donate Page)
    ↓
Select Amount
    ↓
Submit Form
    ↓
donationService.create()
    ↓
Save to Firestore (pending)
    ↓
Redirect to Payment Gateway (Midtrans/Xendit)
    ↓
User Completes Payment
    ↓
Webhook from Payment Gateway
    ↓
Update Donation Status (success/failed)
```

## Authentication Flow

```
┌─────────────────────────────────────────┐
│       1. User Registers/Logs In         │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  2. Firebase Auth verifies credentials  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  3. Firebase returns user object + ID   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 4. Create/Update user in Firestore      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 5. Store in Zustand (useAuthStore)      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 6. JWT token stored in localStorage     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 7. User can access protected routes     │
└─────────────────────────────────────────┘
```

## API Route Structure

```
/api
├── health
│   └── route.ts          # Health check
├── quran
│   ├── surahs
│   │   └── route.ts      # GET all surahs
│   ├── surah/[id]
│   │   └── route.ts      # GET surah details
│   └── search
│       └── route.ts      # Search functionality
├── bookmarks
│   ├── route.ts          # POST, GET bookmarks
│   └── [id]
│       └── route.ts      # DELETE bookmark
├── articles
│   ├── route.ts          # GET articles
│   └── [slug]
│       └── route.ts      # GET article by slug
├── courses
│   ├── route.ts          # GET courses
│   └── [id]
│       └── route.ts      # GET course details
├── donations
│   ├── route.ts          # POST, GET donations
│   └── webhook
│       └── route.ts      # Payment webhook
└── admin
    ├── users
    │   └── route.ts      # User management
    ├── analytics
    │   └── route.ts      # Analytics data
    └── reports
        └── route.ts      # Report generation
```

## Database Schema

### Users Collection
```
users/
├── uid (document ID)
├── email: string
├── name: string
├── photoURL?: string
├── role: enum (guest, member, teacher, admin)
├── createdAt: timestamp
└── updatedAt: timestamp
```

### Surahs Collection
```
surahs/
├── id (document ID)
├── number: number (1-114)
├── nameAr: string
├── nameLatin: string
├── meaning: string
├── totalAyah: number
└── revelation: enum (makkah, madina)
```

### Ayahs Collection
```
ayahs/
├── id (document ID)
├── surahId: string (reference)
├── surahNumber: number
├── ayahNumber: number
├── textAr: string
├── textInd: string
└── textEn?: string
```

### Additional Collections
```
bookmarks/          # User bookmarks
readingProgress/    # User reading progress
articles/           # Islamic articles
courses/            # Online courses
donations/          # Donation records
notifications/      # User notifications
comments/           # Article comments
```

## File Organization

```
src/
├── app/                     # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── auth/               # Authentication pages
│   ├── quran/              # Quran reader
│   ├── articles/           # Articles pages
│   ├── courses/            # Courses pages
│   ├── community/          # Community pages
│   ├── dashboard/          # User dashboard
│   ├── admin/              # Admin panel
│   ├── api/                # API routes
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── lib/                    # Utilities & configs
│   ├── firebase.ts         # Firebase config
│   ├── auth.ts             # Auth service
│   └── midtrans.ts         # Payment integration
├── services/               # Business logic
│   └── firestoreService.ts # Firestore operations
├── hooks/                  # Custom React hooks
│   └── useAuth.ts
├── store/                  # Zustand state management
│   └── authStore.ts
├── types/                  # TypeScript types
│   └── index.ts
└── public/                 # Static assets
```

## Performance Considerations

### Optimization Strategies
1. **Code Splitting**: Lazy load pages with dynamic imports
2. **Image Optimization**: Use Next.js Image component
3. **Caching**: Implement cache headers
4. **Database Indexing**: Index frequently queried fields
5. **Pagination**: Load data in batches
6. **CDN**: Use Cloudflare for static assets

### Scalability
- Firestore auto-scales based on usage
- Next.js can run on multiple servers
- Use Redis for session management (future)
- Implement load balancing

## Security Measures

1. **Authentication**: Firebase Auth with email/password and OAuth
2. **Authorization**: Role-based access control (RBAC)
3. **Firestore Security Rules**: Document-level security
4. **Input Validation**: Zod/React Hook Form validation
5. **HTTPS**: Enforced in production
6. **Environment Variables**: Secrets in .env files
7. **CSRF Protection**: Built-in Next.js protection
8. **Rate Limiting**: Implement via middleware

## Error Handling

```
Try/Catch Blocks
    ↓
Log to Console/Sentry
    ↓
User-Friendly Error Message
    ↓
Fallback UI
    ↓
Error Recovery Options
```

## Monitoring & Logging

- **Console Logging**: Development
- **Sentry**: Error tracking (production)
- **Firebase Analytics**: User behavior
- **Custom Dashboard**: Admin analytics

## CI/CD Pipeline

```
Git Push
    ↓
GitHub Actions
    ↓
Run Tests
    ↓
Build Project
    ↓
Deploy to Vercel/Production
    ↓
Health Check
```

## Future Architecture Improvements

1. Microservices for specific domains
2. GraphQL API layer
3. Real-time features with WebSockets
4. Advanced caching with Redis
5. Message queue for notifications
6. Separate frontend and backend repos
7. Mobile app (Flutter) integration

