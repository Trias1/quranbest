import { create } from "zustand"

interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  role: "guest" | "member" | "teacher" | "admin"
}

interface AuthStore {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null, loading: false }),
}))
