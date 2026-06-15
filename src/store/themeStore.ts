import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeStore {
  theme: "light" | "dark"
  isHydrated: boolean
  setTheme: (theme: "light" | "dark") => void
  toggleTheme: () => void
  initializeTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      isHydrated: false,
      setTheme: (theme) => {
        set({ theme })
        if (typeof document !== "undefined") {
          if (theme === "dark") {
            document.documentElement.classList.add("dark")
          } else {
            document.documentElement.classList.remove("dark")
          }
        }
      },
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light"
          if (typeof document !== "undefined") {
            if (newTheme === "dark") {
              document.documentElement.classList.add("dark")
            } else {
              document.documentElement.classList.remove("dark")
            }
          }
          return { theme: newTheme }
        }),
      initializeTheme: () => {
        set({ isHydrated: true })
        if (typeof document !== "undefined") {
          const stored = localStorage.getItem("theme-store")
          if (stored) {
            try {
              const parsed = JSON.parse(stored)
              const theme = parsed.state?.theme || "light"
              if (theme === "dark") {
                document.documentElement.classList.add("dark")
              }
            } catch (error) {
              console.error("Error parsing theme store:", error)
            }
          }
        }
      },
    }),
    {
      name: "theme-store",
      onRehydrateStorage: () => (state) => {
        state?.initializeTheme()
      },
    }
  )
)
