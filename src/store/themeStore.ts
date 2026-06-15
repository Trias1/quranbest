import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeStore {
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => {
        set({ theme })
        // Apply theme to document
        if (typeof window !== "undefined") {
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
          if (typeof window !== "undefined") {
            if (newTheme === "dark") {
              document.documentElement.classList.add("dark")
            } else {
              document.documentElement.classList.remove("dark")
            }
          }
          return { theme: newTheme }
        }),
    }),
    {
      name: "theme-store",
    }
  )
)
