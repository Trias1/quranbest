"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { authService } from "@/lib/auth"

export function useAuth() {
  const { user, setUser } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    let mounted = true

    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      if (!mounted) return

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

      setLoading(false)
      setInitialized(true)
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [setUser])

  return { user, loading: loading || !initialized }
}
