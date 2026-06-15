"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { ArrowRight, BookOpen, Users, Award, Heart, Star, TrendingUp, Clock } from "lucide-react"
import { PrayerTimes } from "@/components/prayer-times"

export default function Home() {
  const [latestArticles, setLatestArticles] = useState<any[]>([])
  const [latestCourses, setLatestCourses] = useState<any[]>([])
  const [surahCount, setSurahCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artSnap = await getDocs(collection(db, "articles"))
        setLatestArticles(artSnap.docs.map(d => ({ id: d.id, ...d.data() })).slice(0, 3))

        const courseSnap = await getDocs(collection(db, "courses"))
        setLatestCourses(courseSnap.docs.map(d => ({ id: d.id, ...d.data() })).slice(0, 3))

        const surahSnap = await getDocs(collection(db, "surahs"))
        setSurahCount(surahSnap.docs.length)
      } catch (e) { console.error(e) }
    }
    fetchData()
  }, [])

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-800 via-primary to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-[200px] font-bold">بِسْمِ</div>
          <div className="absolute bottom-10 right-10 text-[150px] font-bold">اللَّهِ</div>
        </div>
        <div className="container relative py-24 text-center">
          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur rounded-full text-sm mb-6">
            🕌 Platform Pembelajaran Al-Qur&apos;an #1
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Baca, Pelajari &<br />Hafal Al-Qur&apos;an
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
            Platform terpadu dengan tafsir, audio murottal, kelas online, dan komunitas Muslim
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/quran" className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition flex items-center gap-2 text-lg shadow-lg">
              Mulai Membaca <ArrowRight size={22} />
            </Link>
            <Link href="/auth/register" className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary transition text-lg">
              Daftar Gratis
            </Link>
          </div>
          <div className="flex justify-center gap-8 mt-12 text-sm opacity-80">
            <div className="flex items-center gap-2"><Star size={16} /> 4.9 Rating</div>
            <div className="flex items-center gap-2"><Users size={16} /> 10K+ Pengguna</div>
            <div className="flex items-center gap-2"><BookOpen size={16} /> {surahCount || 114} Surah</div>
          </div>
        </div>
      </section>

      {/* Prayer Times */}
      <section className="py-8">
        <div className="container"><PrayerTimes /></div>
      </section>

      {/* Quick Access Surah */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Surah Populer</h2>
            <Link href="/quran" className="text-primary font-semibold hover:underline text-sm">Lihat Semua →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { n: 1, name: "Al-Fatihah", ar: "الفاتحة", ayah: 7 },
              { n: 36, name: "Yasin", ar: "يس", ayah: 83 },
              { n: 55, name: "Ar-Rahman", ar: "الرحمن", ayah: 78 },
              { n: 56, name: "Al-Waqi'ah", ar: "الواقعة", ayah: 96 },
              { n: 67, name: "Al-Mulk", ar: "الملك", ayah: 30 },
              { n: 112, name: "Al-Ikhlas", ar: "الإخلاص", ayah: 4 },
            ].map(s => (
              <Link key={s.n} href={`/quran/surah/${s.n}`} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-lg hover:border-primary transition text-center">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2 text-sm">{s.n}</div>
                <p className="text-primary text-lg mb-1">{s.ar}</p>
                <p className="font-semibold text-sm">{s.name}</p>
                <p className="text-xs text-gray-500">{s.ayah} ayat</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Fitur Lengkap dalam Satu Platform</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Semua yang Anda butuhkan untuk perjalanan spiritual bersama Al-Qur&apos;an</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Baca Al-Qur'an", desc: "114 surah lengkap dengan terjemahan Indonesia, bookmark, dan progress tracking", href: "/quran", color: "text-green-600 bg-green-100" },
              { icon: Clock, title: "Jadwal Sholat", desc: "Jadwal adzan otomatis berdasarkan lokasi, countdown, dan tabel bulanan", href: "/prayer-times", color: "text-blue-600 bg-blue-100" },
              { icon: Users, title: "Kelas Online", desc: "Tahsin, Tahfidz, dan Webinar dengan ustadz berpengalaman", href: "/courses", color: "text-purple-600 bg-purple-100" },
              { icon: Heart, title: "Donasi", desc: "Dukung pendidikan Islam dan pembangunan infrastruktur dakwah", href: "/donate", color: "text-amber-600 bg-amber-100" },
              { icon: TrendingUp, title: "Progress Tracker", desc: "Pantau progress bacaan harian dan target khatam Anda", href: "/dashboard", color: "text-teal-600 bg-teal-100" },
              { icon: Star, title: "Artikel Islami", desc: "Konten edukasi berkualitas tentang Islam dan kehidupan", href: "/articles", color: "text-rose-600 bg-rose-100" },
              { icon: Award, title: "Sertifikat", desc: "Dapatkan sertifikat digital setelah menyelesaikan kelas", href: "/courses", color: "text-indigo-600 bg-indigo-100" },
              { icon: Users, title: "Komunitas", desc: "Forum diskusi, grup belajar, dan tanya jawab dengan ustadz", href: "/community", color: "text-cyan-600 bg-cyan-100" },
            ].map((f, i) => (
              <Link key={i} href={f.href} className="group p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-xl hover:border-primary/30 transition">
                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon size={24} />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-primary transition">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles from Firestore */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Artikel Terbaru</h2>
              <p className="text-gray-600 mt-1">Konten edukasi untuk memperdalam pemahaman Islam</p>
            </div>
            <Link href="/articles" className="hidden sm:inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold">Lihat Semua</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.length > 0 ? latestArticles.map((art, i) => (
              <article key={art.id} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition group">
                <div className={`h-48 ${["bg-gradient-to-br from-primary to-green-700", "bg-gradient-to-br from-purple-600 to-indigo-700", "bg-gradient-to-br from-amber-500 to-orange-600"][i % 3]} flex items-center justify-center`}>
                  <BookOpen size={48} className="text-white/30" />
                </div>
                <div className="p-6">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">{art.category}</span>
                  <h3 className="font-bold text-lg mt-3 mb-2 group-hover:text-primary transition line-clamp-2">{art.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{art.excerpt}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{art.views || 0} views</span>
                    <Link href={`/articles`} className="text-primary font-semibold hover:underline">Baca →</Link>
                  </div>
                </div>
              </article>
            )) : [1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6"><div className="h-4 bg-gray-200 rounded w-3/4 mb-3" /><div className="h-3 bg-gray-200 rounded w-1/2" /></div>
              </div>
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link href="/articles" className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold">Lihat Semua Artikel</Link>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Kelas Terbaru</h2>
              <p className="text-gray-600 mt-1">Belajar bersama ustadz berpengalaman</p>
            </div>
            <Link href="/courses" className="hidden sm:inline-block px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition text-sm font-semibold">Lihat Semua</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestCourses.length > 0 ? latestCourses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition group border border-gray-100">
                <div className="h-40 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <Award size={48} className="text-white/30" />
                </div>
                <div className="p-6">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${cls.type === "tahsin" ? "bg-green-100 text-green-700" : cls.type === "tahfidz" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                    {cls.type?.charAt(0).toUpperCase() + cls.type?.slice(1)}
                  </span>
                  <h3 className="font-bold text-lg mt-3 mb-2 group-hover:text-primary transition">{cls.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cls.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 flex items-center gap-1"><Users size={14} /> {cls.students || 0} siswa</span>
                    <Link href="/courses" className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition">Daftar</Link>
                  </div>
                </div>
              </div>
            )) : [1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow animate-pulse">
                <div className="h-40 bg-gray-200" />
                <div className="p-6"><div className="h-4 bg-gray-200 rounded w-3/4 mb-3" /><div className="h-3 bg-gray-200 rounded w-1/2" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-primary to-green-700 text-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">QuranBest dalam Angka</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "10K+", label: "Pengguna Aktif", icon: Users },
              { num: `${surahCount || 114}`, label: "Surah Al-Qur'an", icon: BookOpen },
              { num: "6,236", label: "Ayat Lengkap", icon: Star },
              { num: "100+", label: "Artikel Islami", icon: TrendingUp },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <s.icon size={32} className="mx-auto mb-3 opacity-80" />
                <div className="text-4xl font-bold mb-1">{s.num}</div>
                <p className="opacity-80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Apa Kata Pengguna Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Ahmad Fauzi", role: "Mahasiswa", text: "QuranBest membantu saya konsisten membaca Al-Qur'an setiap hari. Fitur progress tracker sangat memotivasi!" },
              { name: "Siti Aisyah", role: "Ibu Rumah Tangga", text: "Kelas tahsin online-nya sangat berkualitas. Sekarang saya bisa membaca Qur'an dengan tajwid yang lebih baik." },
              { name: "Ustadz Hasan", role: "Pengajar", text: "Platform yang luar biasa untuk dakwah digital. Fitur kelas online memudahkan saya mengajar dari mana saja." },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition">
                <div className="flex gap-1 mb-3">{[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-amber-400 fill-amber-400" />)}</div>
                <p className="text-gray-700 mb-4 leading-relaxed">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">{t.name[0]}</div>
                  <div><p className="font-semibold text-sm">{t.name}</p><p className="text-xs text-gray-500">{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-green-950 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Siap Memulai Perjalanan Anda?</h2>
          <p className="text-xl opacity-80 mb-10 max-w-xl mx-auto">Bergabung dengan ribuan Muslim lainnya dalam belajar dan memahami Al-Qur&apos;an</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/register" className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition text-lg shadow-lg">
              Daftar Sekarang — Gratis!
            </Link>
            <Link href="/quran" className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary transition text-lg">
              Baca Al-Qur&apos;an
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
