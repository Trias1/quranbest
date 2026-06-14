export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  name?: string
  role: "guest" | "member" | "teacher" | "admin"
  createdAt?: Date
  updatedAt?: Date
}

export interface Surah {
  id: string
  number: number
  nameAr: string
  nameLatin: string
  meaning: string
  totalAyah: number
  revelation?: "makkah" | "madina"
}

export interface Ayah {
  id: string
  surahId: string
  ayahNumber: number
  textAr: string
  textInd: string
  textEn?: string
}

export interface Bookmark {
  id: string
  userId: string
  ayahId: string
  surahNumber: number
  ayahNumber: number
  createdAt?: Date
}

export interface ReadingProgress {
  id: string
  userId: string
  surahNumber: number
  ayahNumber: number
  lastRead?: Date
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  thumbnail?: string
  instructorId: string
  type: "tahsin" | "tahfidz" | "webinar"
  status: "draft" | "published" | "archived"
  students: number
  createdAt?: Date
  updatedAt?: Date
}

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  authorId: string
  category: string
  tags: string[]
  featured?: boolean
  views: number
  createdAt?: Date
  updatedAt?: Date
}

export interface Donation {
  id: string
  userId: string
  amount: number
  campaignId?: string
  status: "pending" | "success" | "failed"
  transactionId?: string
  createdAt?: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "email" | "push" | "in-app"
  read: boolean
  createdAt?: Date
}
