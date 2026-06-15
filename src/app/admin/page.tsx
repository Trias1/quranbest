"use client"

import { useAuth } from "@/hooks/useAuth"
import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"
import { Users, BookOpen, GraduationCap, DollarSign, FileText, TrendingUp, Eye, ShieldAlert } from "lucide-react"

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const [stats, setStats] = useState({ users: 0, articles: 0, courses: 0, surahs: 0, ayahs: 0, donations: 0 })
  const [recentArticles, setRecentArticles] = useState<any[]>([])
  const [recentCourses, setRecentCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersSnap, articlesSnap, coursesSnap, surahsSnap, ayahsSnap, donationsSnap] = await Promise.all([
          getDocs(collection(db, "users")),
          getDocs(collection(db, "articles")),
          getDocs(collection(db, "courses")),
          getDocs(collection(db, "surahs")),
          getDocs(collection(db, "ayahs")),
          getDocs(collection(db, "donations")),
        ])
        setStats({
          users: usersSnap.size,
          articles: articlesSnap.size,
          courses: coursesSnap.size,
          surahs: surahsSnap.size,
          ayahs: ayahsSnap.size,
          donations: donationsSnap.size,
        })
        setRecentArticles(articlesSnap.docs.map(d => ({ id: d.id, ...d.data() })).slice(0, 5))
        setRecentCourses(coursesSnap.docs.map(d => ({ id: d.id, ...d.data() })).slice(0, 5))
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    if (user?.role === "admin") { // Only fetch if admin
      fetchStats()
    }
  }, [user]) // Depend on user to re-fetch when user object changes

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full mx-4">
          <ShieldAlert size={48} className="mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Akses Ditolak</h1>
          <p className="text-gray-600 mb-6">
            Anda tidak memiliki izin untuk mengakses halaman admin. Silakan login dengan akun admin.
          </p>
          <Link
            href="/auth/login"
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition text-center inline-block"
          >
            Login Sekarang
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Kelola platform QuranBest</p>
          </div>
          <div className="flex items-center gap-2 text-sm bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-semibold">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> System Online
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Users", value: stats.users, icon: Users, color: "border-blue-500", iconColor: "text-blue-500" },
            { label: "Artikel", value: stats.articles, icon: FileText, color: "border-purple-500", iconColor: "text-purple-500" },
            { label: "Kelas", value: stats.courses, icon: GraduationCap, color: "border-green-500", iconColor: "text-green-500" },
            { label: "Surah", value: stats.surahs, icon: BookOpen, color: "border-amber-500", iconColor: "text-amber-500" },
            { label: "Ayat", value: stats.ayahs.toLocaleString(), icon: Eye, color: "border-teal-500", iconColor: "text-teal-500" },
            { label: "Donasi", value: stats.donations, icon: DollarSign, color: "border-rose-500", iconColor: "text-rose-500" },
          ].map((s, i) => (
            <div key={i} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${s.color}`}>
              <s.icon size={20} className={`${s.iconColor} mb-2`} />
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-gray-500 text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Management Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Kelola Pengguna", desc: "Lihat & edit data user", icon: Users, color: "from-blue-500 to-blue-700", href: "#" },
            { title: "Kelola Artikel", desc: "CRUD artikel Islami", icon: FileText, color: "from-purple-500 to-purple-700", href: "#" },
            { title: "Kelola Kelas", desc: "Manajemen kelas online", icon: GraduationCap, color: "from-green-500 to-green-700", href: "#" },
            { title: "Kelola Donasi", desc: "Laporan & transaksi", icon: DollarSign, color: "from-amber-500 to-amber-700", href: "#" },
          ].map((m, i) => (
            <Link key={i} href={m.href} className={`bg-gradient-to-br ${m.color} text-white p-6 rounded-2xl hover:shadow-lg transition group`}>
              <m.icon size={28} className="mb-3 opacity-80 group-hover:opacity-100 transition" />
              <h3 className="font-bold text-lg">{m.title}</h3>
              <p className="text-sm opacity-80">{m.desc}</p>
            </Link>
          ))}
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Articles */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FileText size={20} className="text-purple-500" /> Artikel Terbaru</h2>
            <div className="space-y-3">
              {recentArticles.map((art) => (
                <div key={art.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-sm">{art.title}</p>
                    <p className="text-xs text-gray-500">{art.category} • {art.views || 0} views</p>
                  </div>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Published</span>
                </div>
              ))}
              {recentArticles.length === 0 && <p className="text-gray-500 text-sm text-center py-4">Belum ada artikel</p>}
            </div>
          </div>

          {/* Recent Courses */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><GraduationCap size={20} className="text-green-500" /> Kelas Terbaru</h2>
            <div className="space-y-3">
              {recentCourses.map((cls) => (
                <div key={cls.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-sm">{cls.title}</p>
                    <p className="text-xs text-gray-500">{cls.type} • {cls.students || 0} siswa</p>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${cls.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {cls.status || "draft"}
                  </span>
                </div>
              ))}
              {recentCourses.length === 0 && <p className="text-gray-500 text-sm text-center py-4">Belum ada kelas</p>}
            </div>
          </div>
        </div>

        {/* Quick Stats Chart Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp size={20} className="text-primary" /> Statistik Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-3xl font-bold text-primary">{stats.surahs}</p>
              <p className="text-sm text-gray-600">Surah di Database</p>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2"><div className="bg-primary h-2 rounded-full" style={{ width: `${(stats.surahs / 114) * 100}%` }} /></div>
              <p className="text-xs text-gray-500 mt-1">{Math.round((stats.surahs / 114) * 100)}% dari 114</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-3xl font-bold text-blue-600">{stats.ayahs.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Ayat di Database</p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min((stats.ayahs / 6236) * 100, 100)}%` }} /></div>
              <p className="text-xs text-gray-500 mt-1">{Math.round((stats.ayahs / 6236) * 100)}% dari 6,236</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <p className="text-3xl font-bold text-purple-600">{stats.articles + stats.courses}</p>
              <p className="text-sm text-gray-600">Total Konten</p>
              <div className="flex gap-2 mt-2 text-xs text-gray-500">
                <span>{stats.articles} artikel</span>
                <span>•</span>
                <span>{stats.courses} kelas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
