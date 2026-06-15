"use client"

import { useAuth } from "@/hooks/useAuth"
import { readingProgressService, bookmarkService, donationService } from "@/services/firestoreService"
import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Bookmark, Heart, BarChart3, LogIn } from "lucide-react"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState({
    totalRead: 0,
    totalBookmarks: 0,
    totalDonations: 0,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const userProgress = await readingProgressService.getByUser(user.uid)
          const userBookmarks = await bookmarkService.getByUser(user.uid)
          const userDonations = await donationService.getByUser(user.uid)

          setBookmarks(userBookmarks)
          setStats({
            totalRead: userProgress ? 1 : 0,
            totalBookmarks: userBookmarks.length,
            totalDonations: userDonations.length,
          })
        } catch (error) {
          console.error("Error fetching dashboard data:", error)
        }
      }
      fetchData()
    }
  }, [user])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full">
          <LogIn size={48} className="mx-auto text-primary mb-4" />
          <h1 className="text-2xl font-bold mb-2 dark:text-white">Masuk ke Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Silakan login untuk melihat dashboard dan progress belajar Anda
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/auth/login"
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition text-center"
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="w-full py-3 border border-primary dark:border-green-400 text-primary dark:text-green-400 font-semibold rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition text-center"
            >
              Daftar Akun Baru
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">Selamat Datang, {user.displayName || user.email}! 👋</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Kelola progress belajar Qur'an Anda</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Sudah Dibaca</p>
              <p className="text-4xl font-bold text-primary mt-2">{stats.totalRead}</p>
            </div>
            <BookOpen size={48} className="text-primary/20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Bookmark</p>
              <p className="text-4xl font-bold text-secondary mt-2">{bookmarks.length}</p>
            </div>
            <Bookmark size={48} className="text-secondary/20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-accent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Donasi</p>
              <p className="text-4xl font-bold text-accent mt-2">{stats.totalDonations}</p>
            </div>
            <Heart size={48} className="text-accent/20" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-white">
          <BarChart3 size={28} className="text-primary" />
          Akses Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/quran"
            className="p-6 bg-gradient-to-br from-green-100 dark:from-green-900/30 to-primary/10 dark:to-primary/20 rounded-xl hover:shadow-lg transition border border-primary/20"
          >
            <BookOpen size={32} className="text-primary mb-3" />
            <h3 className="font-bold text-lg dark:text-white">Baca Qur'an</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Mulai membaca Qur'an online</p>
          </Link>

          <Link
            href="/prayer-times"
            className="p-6 bg-gradient-to-br from-blue-100 dark:from-blue-900/30 to-blue-600/10 dark:to-blue-500/20 rounded-xl hover:shadow-lg transition border border-blue-200 dark:border-blue-800"
          >
            <div className="text-2xl mb-3">🕌</div>
            <h3 className="font-bold text-lg dark:text-white">Jadwal Sholat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Lihat waktu sholat Anda</p>
          </Link>

          <Link
            href="/courses"
            className="p-6 bg-gradient-to-br from-purple-100 dark:from-purple-900/30 to-purple-600/10 dark:to-purple-500/20 rounded-xl hover:shadow-lg transition border border-purple-200 dark:border-purple-800"
          >
            <div className="text-2xl mb-3">📚</div>
            <h3 className="font-bold text-lg dark:text-white">Kelas Online</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Ikuti kelas pembelajaran</p>
          </Link>

          <Link
            href="/community"
            className="p-6 bg-gradient-to-br from-amber-100 dark:from-amber-900/30 to-amber-600/10 dark:to-amber-500/20 rounded-xl hover:shadow-lg transition border border-amber-200 dark:border-amber-800"
          >
            <div className="text-2xl mb-3">👥</div>
            <h3 className="font-bold text-lg dark:text-white">Komunitas</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Bergabung dengan komunitas</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
