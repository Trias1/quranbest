import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import * as Types from "@/types"

// Users
export const userService = {
  async create(data: Omit<Types.User, "uid">) {
    const docRef = await addDoc(collection(db, "users"), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return docRef.id
  },

  async getById(userId: string) {
    try {
      const docRef = doc(db, "users", userId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? docSnap.data() : null
    } catch (error) {
      console.error("Error getting user:", error)
      return null
    }
  },

  async update(userId: string, data: Partial<Types.User>) {
    try {
      await updateDoc(doc(db, "users", userId), {
        ...data,
        updatedAt: new Date(),
      })
    } catch (error) {
      console.error("Error updating user:", error)
    }
  },
}

// Surahs
export const surahService = {
  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, "surahs"))
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting surahs:", error)
      return []
    }
  },

  async getById(surahId: string) {
    try {
      const docRef = doc(db, "surahs", surahId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? docSnap.data() : null
    } catch (error) {
      console.error("Error getting surah:", error)
      return null
    }
  },

  async getByNumber(number: number) {
    try {
      const q = query(collection(db, "surahs"), where("number", "==", number))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.length > 0 ? querySnapshot.docs[0].data() : null
    } catch (error) {
      console.error("Error getting surah by number:", error)
      return null
    }
  },
}

// Ayahs
export const ayahService = {
  async getBySurah(surahId: string) {
    try {
      const q = query(collection(db, "ayahs"), where("surahId", "==", surahId))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting ayahs:", error)
      return []
    }
  },

  async getById(ayahId: string) {
    try {
      const docRef = doc(db, "ayahs", ayahId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? docSnap.data() : null
    } catch (error) {
      console.error("Error getting ayah:", error)
      return null
    }
  },
}

// Bookmarks
export const bookmarkService = {
  async create(userId: string, ayahId: string, surahNumber: number, ayahNumber: number) {
    try {
      const docRef = await addDoc(collection(db, "bookmarks"), {
        userId,
        ayahId,
        surahNumber,
        ayahNumber,
        createdAt: new Date(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating bookmark:", error)
      return ""
    }
  },

  async getByUser(userId: string) {
    try {
      const q = query(collection(db, "bookmarks"), where("userId", "==", userId))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting bookmarks:", error)
      return []
    }
  },

  async delete(bookmarkId: string) {
    try {
      await deleteDoc(doc(db, "bookmarks", bookmarkId))
    } catch (error) {
      console.error("Error deleting bookmark:", error)
    }
  },

  async exists(userId: string, ayahId: string) {
    try {
      const q = query(
        collection(db, "bookmarks"),
        where("userId", "==", userId),
        where("ayahId", "==", ayahId)
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.length > 0
    } catch (error) {
      console.error("Error checking bookmark:", error)
      return false
    }
  },
}

// Reading Progress
export const readingProgressService = {
  async create(userId: string, surahNumber: number, ayahNumber: number) {
    try {
      const docRef = await addDoc(collection(db, "readingProgress"), {
        userId,
        surahNumber,
        ayahNumber,
        lastRead: new Date(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating reading progress:", error)
      return ""
    }
  },

  async getByUser(userId: string) {
    try {
      const q = query(collection(db, "readingProgress"), where("userId", "==", userId))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.length > 0
        ? { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() }
        : null
    } catch (error) {
      console.error("Error getting reading progress:", error)
      return null
    }
  },

  async update(userId: string, surahNumber: number, ayahNumber: number) {
    try {
      const q = query(collection(db, "readingProgress"), where("userId", "==", userId))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.docs.length > 0) {
        const docId = querySnapshot.docs[0].id
        await updateDoc(doc(db, "readingProgress", docId), {
          surahNumber,
          ayahNumber,
          lastRead: new Date(),
        })
      } else {
        await this.create(userId, surahNumber, ayahNumber)
      }
    } catch (error) {
      console.error("Error updating reading progress:", error)
    }
  },
}

// Articles
export const articleService = {
  async create(data: Omit<Types.Article, "id" | "createdAt" | "updatedAt" | "views">) {
    try {
      const docRef = await addDoc(collection(db, "articles"), {
        ...data,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating article:", error)
      return ""
    }
  },

  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, "articles"))
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting articles:", error)
      return []
    }
  },

  async getById(articleId: string) {
    try {
      const docRef = doc(db, "articles", articleId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? docSnap.data() : null
    } catch (error) {
      console.error("Error getting article:", error)
      return null
    }
  },

  async getBySlug(slug: string) {
    try {
      const q = query(collection(db, "articles"), where("slug", "==", slug))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.length > 0 ? querySnapshot.docs[0].data() : null
    } catch (error) {
      console.error("Error getting article by slug:", error)
      return null
    }
  },

  async update(articleId: string, data: Partial<Types.Article>) {
    try {
      await updateDoc(doc(db, "articles", articleId), {
        ...data,
        updatedAt: new Date(),
      })
    } catch (error) {
      console.error("Error updating article:", error)
    }
  },
}

// Courses
export const courseService = {
  async create(data: Omit<Types.Course, "id" | "students" | "createdAt" | "updatedAt">) {
    try {
      const docRef = await addDoc(collection(db, "courses"), {
        ...data,
        students: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating course:", error)
      return ""
    }
  },

  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"))
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting courses:", error)
      return []
    }
  },

  async getById(courseId: string) {
    try {
      const docRef = doc(db, "courses", courseId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? docSnap.data() : null
    } catch (error) {
      console.error("Error getting course:", error)
      return null
    }
  },

  async getByInstructor(instructorId: string) {
    try {
      const q = query(collection(db, "courses"), where("instructorId", "==", instructorId))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting courses by instructor:", error)
      return []
    }
  },
}

// Donations
export const donationService = {
  async create(data: Omit<Types.Donation, "id" | "createdAt">) {
    try {
      const docRef = await addDoc(collection(db, "donations"), {
        ...data,
        createdAt: new Date(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating donation:", error)
      return ""
    }
  },

  async getByUser(userId: string) {
    try {
      const q = query(collection(db, "donations"), where("userId", "==", userId))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting donations:", error)
      return []
    }
  },

  async update(donationId: string, status: string) {
    try {
      await updateDoc(doc(db, "donations", donationId), { status })
    } catch (error) {
      console.error("Error updating donation:", error)
    }
  },
}
