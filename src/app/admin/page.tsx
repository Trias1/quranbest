"use client"

import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { Users, BookOpen, GraduationCap, DollarSign, BarChart3 } from "lucide-react"

export default function AdminPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Memuat...</div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Anda tidak memiliki akses ke halaman ini</div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Pengguna</p>
              <p className="text-3xl font-bold">1,250</p>
            </div>
            <Users size={40} className="text-primary opacity-50" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Artikel</p>
              <p className="text-3xl font-bold">145</p>
            </div>
            <BookOpen size={40} className="text-blue-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Kelas</p>
              <p className="text-3xl font-bold">52</p>
            </div>
            <GraduationCap size={40} className="text-green-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Donasi</p>
              <p className="text-3xl font-bold">Rp25M</p>
            </div>
            <DollarSign size={40} className="text-amber-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Analytics</p>
              <p className="text-3xl font-bold">View</p>
            </div>
            <BarChart3 size={40} className="text-purple-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Management Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/users"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border-t-4 border-primary"
        >
          <Users size={32} className="text-primary mb-4" />
          <h3 className="font-bold text-lg mb-2">Kelola Pengguna</h3>
          <p className="text-gray-600 text-sm">Lihat, edit, atau hapus data pengguna</p>
        </Link>

        <Link
          href="/admin/articles"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border-t-4 border-blue-500"
        >
          <BookOpen size={32} className="text-blue-500 mb-4" />
          <h3 className="font-bold text-lg mb-2">Kelola Artikel</h3>
          <p className="text-gray-600 text-sm">Buat, edit, atau publikasikan artikel</p>
        </Link>

        <Link
          href="/admin/courses"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border-t-4 border-green-500"
        >
          <GraduationCap size={32} className="text-green-500 mb-4" />
          <h3 className="font-bold text-lg mb-2">Kelola Kelas</h3>
          <p className="text-gray-600 text-sm">Kelola kelas online dan materi pembelajaran</p>
        </Link>

        <Link
          href="/admin/donations"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border-t-4 border-amber-500"
        >
          <DollarSign size={32} className="text-amber-500 mb-4" />
          <h3 className="font-bold text-lg mb-2">Kelola Donasi</h3>
          <p className="text-gray-600 text-sm">Lihat laporan dan kampanye donasi</p>
        </Link>

        <Link
          href="/admin/content"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border-t-4 border-purple-500"
        >
          <BookOpen size={32} className="text-purple-500 mb-4" />
          <h3 className="font-bold text-lg mb-2">Kelola Konten Quran</h3>
          <p className="text-gray-600 text-sm">Kelola Surah, Ayat, dan Tafsir</p>
        </Link>

        <Link
          href="/admin/analytics"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border-t-4 border-red-500"
        >
          <BarChart3 size={32} className="text-red-500 mb-4" />
          <h3 className="font-bold text-lg mb-2">Analytics</h3>
          <p className="text-gray-600 text-sm">Lihat statistik dan laporan platform</p>
        </Link>
      </div>
    </div>
  )
}
