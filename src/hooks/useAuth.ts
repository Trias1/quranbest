"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/authStore"
import { authService } from "@/lib/auth"

export function useAuth() {
  const { user, loading, setUser } = useAuthStore()

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          role: "member",
        })
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [setUser])

  return { user, loading }
}
