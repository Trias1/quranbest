"use client"

import { useAuth } from "@/hooks/useAuth"

import { readingProgressService, bookmarkService, donationService } from "@/services/firestoreService"
import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Bookmark, Heart, BarChart3, LogIn } from "lucide-react"

export default function DashboardPage() {
  
  const { user, loading } = useAuth()
  const [progress, setProgress] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalRead: 0,
    totalBookmarks: 0,
    totalDonations: 0,
  })

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const userProgress = await readingProgressService.getByUser(user.uid)
          setProgress(userProgress)

          const userBookmarks = await bookmarkService.getByUser(user.uid)
          setBookmarks(userBookmarks)

          const userDonations = await donationService.getByUser(user.uid)

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Not logged in - show login prompt
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full mx-4">
          <LogIn size={48} className="mx-auto text-primary mb-4" />
          <h1 className="text-2xl font-bold mb-2">Masuk ke Dashboard</h1>
          <p className="text-gray-600 mb-6">
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
              className="w-full py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-green-50 transition text-center"
            >
              Daftar Akun Baru
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        Assalamu&apos;alaikum, {user.displayName || user.email} 👋
      </h1>
      <p className="text-gray-600 mb-8">Selamat datang kembali di QuranBest</p>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-primary hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Terakhir Dibaca</p>
              <p className="text-2xl font-bold">
                {progress ? `${progress.surahNumber}:${progress.ayahNumber}` : "-"}
              </p>
            </div>
            <BookOpen size={36} className="text-primary opacity-40" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Bookmark</p>
              <p className="text-2xl font-bold">{stats.totalBookmarks}</p>
            </div>
            <Bookmark size={36} className="text-purple-500 opacity-40" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-amber-500 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Donasi</p>
              <p className="text-2xl font-bold">{stats.totalDonations}</p>
            </div>
            <Heart size={36} className="text-amber-500 opacity-40" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-600 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Progress Khatam</p>
              <p className="text-2xl font-bold">0%</p>
            </div>
            <BarChart3 size={36} className="text-green-600 opacity-40" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-2xl font-bold mb-6">Aksi Cepat</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Link
          href="/quran"
          className="p-8 bg-gradient-to-br from-primary to-green-700 text-white rounded-2xl hover:shadow-xl transition"
        >
          <BookOpen size={28} className="mb-3" />
          <h3 className="font-bold text-lg mb-1">Lanjutkan Membaca</h3>
          <p className="opacity-80 text-sm">Baca Al-Qur&apos;an dari terakhir dibaca</p>
        </Link>

        <Link
          href="/courses"
          className="p-8 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-2xl hover:shadow-xl transition"
        >
          <BarChart3 size={28} className="mb-3" />
          <h3 className="font-bold text-lg mb-1">Ikuti Kelas</h3>
          <p className="opacity-80 text-sm">Daftar kelas Tahsin atau Tahfidz</p>
        </Link>

        <Link
          href="/donate"
          className="p-8 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl hover:shadow-xl transition"
        >
          <Heart size={28} className="mb-3" />
          <h3 className="font-bold text-lg mb-1">Berdonasi</h3>
          <p className="opacity-80 text-sm">Dukung pendidikan Islam digital</p>
        </Link>
      </div>

      {/* Recent Bookmarks */}
      <h2 className="text-2xl font-bold mb-6">Bookmark Terbaru</h2>
      {bookmarks.length > 0 ? (
        <div className="grid gap-4">
          {bookmarks.slice(0, 5).map((bm) => (
            <Link
              key={bm.id}
              href={`/quran/surah/${bm.surahNumber}`}
              className="p-5 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition flex justify-between items-center group"
            >
              <div>
                <p className="font-semibold">Surah {bm.surahNumber} : Ayat {bm.ayahNumber}</p>
                <p className="text-gray-500 text-sm">
                  {bm.createdAt?.toDate
                    ? new Date(bm.createdAt.toDate()).toLocaleDateString("id-ID")
                    : "Baru saja"}
                </p>
              </div>
              <span className="text-primary">→</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-gray-50 rounded-2xl text-gray-500">
          Belum ada bookmark.{" "}
          <Link href="/quran" className="text-primary font-semibold hover:underline">
            Mulai membaca Al-Qur&apos;an
          </Link>
        </div>
      )}
      </div>
    </div>
  )
}
