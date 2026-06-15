"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/hooks/useAuth"
import { ChevronLeft, Users, Clock, BookOpen, Award, CheckCircle } from "lucide-react"

export default function CourseDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { user } = useAuth()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const q = query(collection(db, "courses"), where("slug", "==", slug))
        const snap = await getDocs(q)
        if (!snap.empty) setCourse({ id: snap.docs[0].id, ...snap.docs[0].data() })
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    fetchCourse()
  }, [slug])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!course) return (
    <div className="container py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Kelas tidak ditemukan</h1>
      <Link href="/courses" className="text-primary hover:underline">← Kembali ke daftar kelas</Link>
    </div>
  )

  const syllabus = [
    "Pengenalan dan persiapan belajar",
    "Materi dasar dan fondasi",
    "Praktek dan latihan terbimbing",
    "Evaluasi dan ujian tengah",
    "Materi lanjutan",
    "Praktek mandiri",
    "Ujian akhir dan sertifikasi",
  ]

  return (
    <div className="container py-8">
      <Link href="/courses" className="inline-flex items-center gap-1 text-primary hover:underline mb-6 text-sm">
        <ChevronLeft size={18} /> Kembali
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="h-64 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl mb-6 flex items-center justify-center">
            <BookOpen size={64} className="text-white/30" />
          </div>

          <span className={`text-sm px-3 py-1 rounded-full font-semibold ${course.type === "tahsin" ? "bg-green-100 text-green-700" : course.type === "tahfidz" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
            {course.type?.charAt(0).toUpperCase() + course.type?.slice(1)}
          </span>

          <h1 className="text-3xl font-bold mt-4 mb-4">{course.title}</h1>
          <p className="text-gray-700 leading-relaxed mb-8">{course.description}</p>

          {/* Syllabus */}
          <h2 className="text-xl font-bold mb-4">Silabus Kelas</h2>
          <div className="space-y-3 mb-8">
            {syllabus.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* What you will learn */}
          <h2 className="text-xl font-bold mb-4">Yang Akan Anda Pelajari</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {["Memahami dasar-dasar dengan benar", "Praktek langsung dengan bimbingan", "Evaluasi berkala untuk progress", "Sertifikat digital setelah lulus"].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24 shadow-lg">
            <div className="text-3xl font-bold text-primary mb-1">GRATIS</div>
            <p className="text-gray-500 text-sm mb-6">Akses penuh ke semua materi</p>

            <button
              onClick={() => {
                if (!user) { window.location.href = "/auth/login"; return }
                setEnrolled(true)
              }}
              disabled={enrolled}
              className={`w-full py-3 font-bold rounded-xl transition text-lg mb-4 ${enrolled ? "bg-green-100 text-green-700" : "bg-primary text-white hover:bg-green-700"}`}
            >
              {enrolled ? "✓ Sudah Terdaftar" : "Daftar Sekarang"}
            </button>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Tipe</span><span className="font-semibold capitalize">{course.type}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Siswa</span><span className="font-semibold flex items-center gap-1"><Users size={14} /> {course.students || 0}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Durasi</span><span className="font-semibold flex items-center gap-1"><Clock size={14} /> 7 Pertemuan</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Sertifikat</span><span className="font-semibold flex items-center gap-1"><Award size={14} /> Ya</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
