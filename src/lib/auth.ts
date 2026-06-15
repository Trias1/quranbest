import { auth } from "./firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"

const firebaseErrorMessages: Record<string, string> = {
  "auth/configuration-not-found": "Firebase Authentication belum diaktifkan. Silakan enable Email/Password di Firebase Console → Authentication → Sign-in method.",
  "auth/email-already-in-use": "Email sudah terdaftar. Silakan gunakan email lain atau login.",
  "auth/invalid-email": "Format email tidak valid.",
  "auth/operation-not-allowed": "Metode login ini belum diaktifkan di Firebase Console.",
  "auth/weak-password": "Password terlalu lemah. Gunakan minimal 6 karakter.",
  "auth/user-disabled": "Akun ini telah dinonaktifkan.",
  "auth/user-not-found": "Email tidak terdaftar.",
  "auth/wrong-password": "Password salah.",
  "auth/invalid-credential": "Email atau password salah.",
  "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi nanti.",
  "auth/network-request-failed": "Koneksi internet bermasalah. Periksa jaringan Anda.",
  "auth/popup-closed-by-user": "Login Google dibatalkan.",
}

function getErrorMessage(error: any): string {
  const code = error?.code || ""
  return firebaseErrorMessages[code] || error?.message || "Terjadi kesalahan. Silakan coba lagi."
}

export const authService = {
  async register(email: string, password: string, displayName?: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName && result.user) {
        await updateProfile(result.user, { displayName })
      }
      return result.user
    } catch (error: any) {
      throw new Error(getErrorMessage(error))
    }
  },

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error: any) {
      throw new Error(getErrorMessage(error))
    }
  },

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (error: any) {
      throw new Error(getErrorMessage(error))
    }
  },

  async logout() {
    try {
      await signOut(auth)
    } catch (error: any) {
      throw new Error(getErrorMessage(error))
    }
  },

  getCurrentUser() {
    return auth.currentUser
  },

  onAuthStateChanged(callback: (user: any) => void) {
    return onAuthStateChanged(auth, callback)
  },
}
