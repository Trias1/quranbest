import { auth } from "./firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth"

// Set persistence
setPersistence(auth, browserLocalPersistence)

export const authService = {
  async register(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async logout() {
    try {
      await signOut(auth)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  getCurrentUser() {
    return auth.currentUser
  },

  onAuthStateChanged(callback: (user: any) => void) {
    return onAuthStateChanged(auth, callback)
  },
}
