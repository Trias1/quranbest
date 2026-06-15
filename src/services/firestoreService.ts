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
  Timestamp,
  setDoc,
  orderBy,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import * as Types from "@/types"

// Helper to convert Firestore Timestamp to Date
const convertTimestampToDate = (data: any) => {
  if (data.createdAt instanceof Timestamp) {
    data.createdAt = data.createdAt.toDate()
  }
  if (data.updatedAt instanceof Timestamp) {
    data.updatedAt = data.updatedAt.toDate()
  }
  if (data.lastRead instanceof Timestamp) {
    data.lastRead = data.lastRead.toDate()
  }
  return data
}

// Users
export const userService = {
  async create(data: Omit<Types.User, "uid"> & { uid: string }) {
    const docRef = doc(db, "users", data.uid); // Use UID as document ID
    await setDoc(docRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  async getById(userId: string) {
    try {
      const docRef = doc(db, "users", userId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? convertTimestampToDate({ id: docSnap.id, ...docSnap.data() }) : null
    } catch (error) {
      console.error("Error getting user:", error)
      return null
    }
  },

  async update(userId: string, data: Partial<Types.User>) {
    try {
      await updateDoc(doc(db, "users", userId), {
        ...data,
        updatedAt: Timestamp.now(),
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
      const q = query(collection(db, "surahs"), orderBy("number")); // Order by surah number
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => convertTimestampToDate({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting surahs:", error)
      return []
    }
  },

  async getByNumber(surahNumber: number) {
    try {
      const q = query(collection(db, "surahs"), where("number", "==", surahNumber))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.length > 0 ? convertTimestampToDate({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() }) : null
    } catch (error) {
      console.error("Error getting surah by number:", error)
      return null
    }
  },
}

// Ayahs
export const ayahService = {
  async getBySurah(surahNumber: number) {
    try {
      const q = query(collection(db, "ayahs"), where("surahNumber", "==", surahNumber))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => convertTimestampToDate({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting ayahs:", error)
      return []
    }
  },

  async getById(ayahId: string) {
    try {
      const docRef = doc(db, "ayahs", ayahId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? convertTimestampToDate({ id: docSnap.id, ...docSnap.data() }) : null
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
      const docRef = doc(db, "bookmarks", `${userId}_${ayahId}`); // Use composite ID
      await setDoc(docRef, {
        userId,
        ayahId,
        surahNumber,
        ayahNumber,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating bookmark:", error)
      return ""
    }
  },

  async getByUser(userId: string) {
    try {
      const q = query(collection(db, "bookmarks"), where("userId", "==", userId))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => convertTimestampToDate({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting bookmarks:", error)
      return []
    }
  },

  async delete(bookmarkDocId: string) {
    try {
      await deleteDoc(doc(db, "bookmarks", bookmarkDocId))
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
      const docRef = doc(db, "readingProgress", userId); // Use userId as doc ID
      await setDoc(docRef, {
        userId,
        surahNumber,
        ayahNumber,
        lastRead: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating reading progress:", error)
      return ""
    }
  },

  async getByUser(userId: string) {
    try {
      const docSnap = await getDoc(doc(db, "readingProgress", userId))
      return docSnap.exists() ? convertTimestampToDate({ id: docSnap.id, ...docSnap.data() }) : null
    } catch (error) {
      console.error("Error getting reading progress:", error)
      return null
    }
  },

  async update(userId: string, surahNumber: number, ayahNumber: number) {
    try {
      const docRef = doc(db, "readingProgress", userId);
      await updateDoc(docRef, {
        surahNumber,
        ayahNumber,
        lastRead: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error updating reading progress:", error)
    }
  },
}

// Articles
export const articleService = {
  async create(data: Omit<Types.Article, "id" | "createdAt" | "updatedAt" | "views">) {
    try {
      const newDocRef = await addDoc(collection(db, "articles"), {
        ...data,
        views: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return newDocRef.id;
    } catch (error) {
      console.error("Error creating article:", error)
      return ""
    }
  },

  async getAll() {
    try {
      const q = query(collection(db, "articles"), orderBy("createdAt", "desc")); // Order by creation date descending
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => convertTimestampToDate({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting articles:", error)
      return []
    }
  },

  async getById(articleId: string) {
    try {
      const docRef = doc(db, "articles", articleId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? convertTimestampToDate({ id: docSnap.id, ...docSnap.data() }) : null
    } catch (error) {
      console.error("Error getting article:", error)
      return null
    }
  },

  async getBySlug(slug: string) {
    try {
      const q = query(collection(db, "articles"), where("slug", "==", slug))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.length > 0 ? convertTimestampToDate({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() }) : null
    } catch (error) {
      console.error("Error getting article by slug:", error)
      return null
    }
  },

  async update(articleId: string, data: Partial<Types.Article>) {
    try {
      await updateDoc(doc(db, "articles", articleId), {
        ...data,
        updatedAt: Timestamp.now(),
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
      const newDocRef = await addDoc(collection(db, "courses"), {
        ...data,
        students: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return newDocRef.id;
    } catch (error) {
      console.error("Error creating course:", error)
      return ""
    }
  },

  async getAll() {
    try {
      const q = query(collection(db, "courses"), orderBy("createdAt", "desc")); // Order by creation date descending
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => convertTimestampToDate({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting courses:", error)
      return []
    }
  },

  async getById(courseId: string) {
    try {
      const docRef = doc(db, "courses", courseId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? convertTimestampToDate({ id: docSnap.id, ...docSnap.data() }) : null
    } catch (error) {
      console.error("Error getting course:", error)
      return null
    }
  },

  async getByInstructor(instructorId: string) {
    try {
      const q = query(collection(db, "courses"), where("instructorId", "==", instructorId))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => convertTimestampToDate({ id: doc.id, ...doc.data() }))
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
      const newDocRef = await addDoc(collection(db, "donations"), {
        ...data,
        createdAt: Timestamp.now(),
      });
      return newDocRef.id;
    } catch (error) {
      console.error("Error creating donation:", error)
      return ""
    }
  },

  async getAll() {
    try {
      const q = query(collection(db, "donations"), orderBy("createdAt", "desc")); // Order by creation date descending
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => convertTimestampToDate({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting donations:", error)
      return []
    }
  },

  async getByUser(userId: string) {
    try {
      const q = query(collection(db, "donations"), where("userId", "==", userId))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => convertTimestampToDate({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting donations:", error)
      return []
    }
  },

  async update(donationId: string, status: string) {
    try {
      await updateDoc(doc(db, "donations", donationId), { status, updatedAt: Timestamp.now() })
    } catch (error) {
      console.error("Error updating donation:", error)
    }
  },
}

// Notifications
export const notificationService = {
  async create(data: Omit<Types.Notification, "id" | "createdAt">) {
    try {
      const newDocRef = await addDoc(collection(db, "notifications"), {
        ...data,
        read: false,
        createdAt: Timestamp.now(),
      });
      return newDocRef.id;
    } catch (error) {
      console.error("Error creating notification:", error)
      return ""
    }
  },

  async getByUser(userId: string) {
    try {
      const q = query(collection(db, "notifications"), where("userId", "==", userId))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => convertTimestampToDate({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting notifications:", error)
      return []
    }
  },

  async markAsRead(notificationId: string) {
    try {
      await updateDoc(doc(db, "notifications", notificationId), { read: true, updatedAt: Timestamp.now() })
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  },
}
