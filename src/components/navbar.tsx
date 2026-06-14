"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { authService } from "@/lib/auth"
import { useAuthStore } from "@/store/authStore"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { user, loading } = useAuth()
  const { logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await authService.logout()
    logout()
  }

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary">📖 QuranBest</div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/quran" className="hover:text-primary transition">
            Quran
          </Link>
          <Link href="/articles" className="hover:text-primary transition">
            Artikel
          </Link>
          <Link href="/courses" className="hover:text-primary transition">
            Kelas
          </Link>
          <Link href="/donate" className="hover:text-primary transition">
            Donasi
          </Link>
          <Link href="/community" className="hover:text-primary transition">
            Komunitas
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm hover:text-primary">
                {user.displayName || user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-primary border border-primary rounded hover:bg-primary hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700 transition"
              >
                Daftar
              </Link>
            </div>
          )}

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container flex flex-col py-4 gap-2">
            <Link href="/quran" className="py-2">Quran</Link>
            <Link href="/articles" className="py-2">Artikel</Link>
            <Link href="/courses" className="py-2">Kelas</Link>
            <Link href="/donate" className="py-2">Donasi</Link>
            <Link href="/community" className="py-2">Komunitas</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
