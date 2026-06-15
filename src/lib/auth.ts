import { auth } from "./firebase"
import { tokenService } from "./tokenService"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
  getIdToken,
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
  "auth/unauthorized-domain": "Domain tidak diizinkan. Hubungi admin untuk menambahkan domain ke Firebase Console.",
  "auth/popup-blocked": "Pop-up browser terblok. Izinkan pop-up untuk domain ini.",
  "auth/invalid-oauth-provider": "Provider Google tidak valid.",
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

      // Get Firebase ID token
      const idToken = await getIdToken(result.user)

      // Store tokens
      tokenService.setTokens(idToken, idToken, 3600)

      return result.user
    } catch (error: any) {
      throw new Error(getErrorMessage(error))
    }
  },

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)

      // Get Firebase ID token
      const idToken = await getIdToken(result.user)

      // Store tokens
      tokenService.setTokens(idToken, idToken, 3600)

      return result.user
    } catch (error: any) {
      throw new Error(getErrorMessage(error))
    }
  },

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth, provider)

      // Get Firebase ID token
      const idToken = await getIdToken(result.user)

      // Store tokens
      tokenService.setTokens(idToken, idToken, 3600)

      return result.user
    } catch (error: any) {
      console.error("Google login error:", error)
      throw new Error(getErrorMessage(error))
    }
  },

  async logout() {
    try {
      await signOut(auth)
      tokenService.clearTokens()
    } catch (error: any) {
      throw new Error(getErrorMessage(error))
    }
  },

  getCurrentUser() {
    return auth.currentUser
  },

  onAuthStateChanged(callback: (user: any) => void) {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Refresh token if needed
        if (tokenService.isTokenExpired()) {
          const newToken = await tokenService.refreshToken()
          if (!newToken) {
            await this.logout()
            callback(null)
            return
          }
        }
      } else {
        tokenService.clearTokens()
      }
      callback(user)
    })
  },

  // Get current valid token
  async getToken(): Promise<string | null> {
    const user = auth.currentUser
    if (!user) return null

    try {
      return await getIdToken(user)
    } catch {
      return tokenService.getToken()
    }
  },
}
