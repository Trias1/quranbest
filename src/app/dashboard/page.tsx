"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { readingProgressService, bookmarkService, donationService } from "@/services/firestoreService"
import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Bookmark, Heart, BarChart3 } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [progress, setProgress] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalRead: 0,
    totalBookmarks: 0,
    totalDonations: 0,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

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
        <div className="text-xl text-gray-600">Memuat...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Selamat Datang, {user.displayName || user.email}!</h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">Bacaan Hari Ini</p>
              <p className="text-3xl font-bold">
                {progress?.surahNumber || 0}:{progress?.ayahNumber || 0}
              </p>
            </div>
            <BookOpen size={40} className="text-primary opacity-50" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-secondary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">Total Bookmark</p>
              <p className="text-3xl font-bold">{stats.totalBookmarks}</p>
            </div>
            <Bookmark size={40} className="text-secondary opacity-50" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">Total Donasi</p>
              <p className="text-3xl font-bold">Rp{(stats.totalDonations * 50000).toLocaleString()}</p>
            </div>
            <Heart size={40} className="text-amber-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">Progress Khatam</p>
              <p className="text-3xl font-bold">0%</p>
            </div>
            <BarChart3 size={40} className="text-green-600 opacity-50" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link
          href="/quran"
          className="p-6 bg-gradient-to-br from-primary to-green-700 text-white rounded-lg hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg mb-2">Lanjutkan Membaca</h3>
          <p className="opacity-90">Lanjutkan bacaan Al-Qur&apos;an Anda</p>
        </Link>

        <Link
          href="/courses"
          className="p-6 bg-gradient-to-br from-secondary to-purple-700 text-white rounded-lg hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg mb-2">Ikuti Kelas</h3>
          <p className="opacity-90">Daftar ke kelas Tahsin atau Tahfidz</p>
        </Link>

        <Link
          href="/donate"
          className="p-6 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg mb-2">Berdonasi</h3>
          <p className="opacity-90">Dukung pendidikan Islam</p>
        </Link>
      </div>

      {/* Recent Bookmarks */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Bookmark Terbaru</h2>
        {bookmarks.length > 0 ? (
          <div className="grid gap-4">
            {bookmarks.slice(0, 5).map((bookmark) => (
              <div key={bookmark.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                <p className="font-semibold">
                  Surah {bookmark.surahNumber} : Ayat {bookmark.ayahNumber}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {bookmark.createdAt?.toDate ? new Date(bookmark.createdAt.toDate()).toLocaleDateString("id-ID") : "Recently"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center bg-gray-50 rounded-lg text-gray-600">
            Belum ada bookmark. <Link href="/quran" className="text-primary font-semibold">Mulai membaca</Link>
          </div>
        )}
      </div>
    </div>
  )
}
