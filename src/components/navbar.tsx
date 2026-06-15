"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { authService } from "@/lib/auth"
import { useAuthStore } from "@/store/authStore"
import { useThemeStore } from "@/store/themeStore"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

export function Navbar() {
  const { user } = useAuth()
  const { logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    await authService.logout()
    logout()
  }

  const navLinks = [
    { href: "/quran", label: "Quran" },
    { href: "/prayer-times", label: "Jadwal Sholat" },
    { href: "/articles", label: "Artikel" },
    { href: "/courses", label: "Kelas" },
    { href: "/donate", label: "Donasi" },
    { href: "/community", label: "Komunitas" },
  ]

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-800 shadow-md z-50 transition-colors">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary dark:text-green-400">📖 QuranBest</div>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-green-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              aria-label="Toggle theme"
              title={theme === "light" ? "Dark Mode" : "Light Mode"}
            >
              {theme === "light" ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} />
              )}
            </button>
          )}

          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link 
                href="/dashboard" 
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-green-400 font-medium transition"
              >
                {user.displayName || user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex gap-2">
              <Link
                href="/auth/login"
                className="px-4 py-1.5 text-primary dark:text-green-400 border border-primary dark:border-green-400 text-sm rounded-lg hover:bg-primary hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-1.5 bg-primary dark:bg-green-500 text-white text-sm rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition"
              >
                Daftar
              </Link>
            </div>
          )}

          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="container flex flex-col py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 px-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="flex gap-2 pt-2 border-t dark:border-gray-700 mt-2">
                <Link 
                  href="/auth/login" 
                  className="flex-1 text-center py-2 border border-primary dark:border-green-400 text-primary dark:text-green-400 rounded-lg transition" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register" 
                  className="flex-1 text-center py-2 bg-primary dark:bg-green-500 text-white rounded-lg transition" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Daftar
                </Link>
              </div>
            )}
            {user && (
              <div className="flex gap-2 pt-2 border-t dark:border-gray-700 mt-2">
                <Link 
                  href="/dashboard" 
                  className="flex-1 text-center py-2 border border-primary dark:border-green-400 text-primary dark:text-green-400 rounded-lg transition" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => { handleLogout(); setMobileMenuOpen(false) }} 
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
