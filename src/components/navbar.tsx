"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { authService } from "@/lib/auth"
import { useAuthStore } from "@/store/authStore"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { user } = useAuth()
  const { logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary">📖 QuranBest</div>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm hover:text-primary transition">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/dashboard" className="text-sm hover:text-primary font-medium">
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
                className="px-4 py-1.5 text-primary border border-primary text-sm rounded-lg hover:bg-primary hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-green-700 transition"
              >
                Daftar
              </Link>
            </div>
          )}

          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container flex flex-col py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 px-2 rounded hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="flex gap-2 pt-2 border-t mt-2">
                <Link href="/auth/login" className="flex-1 text-center py-2 border border-primary text-primary rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/auth/register" className="flex-1 text-center py-2 bg-primary text-white rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  Daftar
                </Link>
              </div>
            )}
            {user && (
              <div className="flex gap-2 pt-2 border-t mt-2">
                <Link href="/dashboard" className="flex-1 text-center py-2 border border-primary text-primary rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false) }} className="flex-1 py-2 bg-red-500 text-white rounded-lg">
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
