"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { BookOpen, Search } from "lucide-react"

interface Surah {
  id: string
  number: number
  nameAr: string
  nameLatin: string
  meaning: string
  totalAyah: number
  revelation: string
}

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [filtered, setFiltered] = useState<Surah[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "surahs"))
        const data = querySnapshot.docs
          .map((doc) => {
            const d = doc.data()
            return {
              id: doc.id,
              number: Number(d.number),
              nameAr: d.nameAr,
              nameLatin: d.nameLatin,
              meaning: d.meaning,
              totalAyah: Number(d.totalAyah),
              revelation: d.revelation || "makkah",
            }
          })
          .sort((a, b) => a.number - b.number)

        setSurahs(data)
        setFiltered(data)
      } catch (error) {
        console.error("Error fetching surahs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSurahs()
  }, [])

  useEffect(() => {
    if (!search) {
      setFiltered(surahs)
      return
    }
    const q = search.toLowerCase()
    setFiltered(
      surahs.filter(
        (s) =>
          s.nameLatin.toLowerCase().includes(q) ||
          s.meaning.toLowerCase().includes(q) ||
          String(s.number) === q
      )
    )
  }, [search, surahs])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Memuat daftar surah...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Al-Qur&apos;an</h1>
        <p className="text-gray-600 mb-6">Pilih surah untuk mulai membaca</p>

        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-3 max-w-md focus-within:border-primary transition">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Cari surah atau arti..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((surah) => (
            <Link
              key={surah.id}
              href={`/quran/surah/${surah.number}`}
              className="p-4 border border-gray-200 rounded-xl hover:shadow-lg hover:border-primary transition cursor-pointer bg-white"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                  {surah.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{surah.nameLatin}</h3>
                      <p className="text-sm text-gray-600">{surah.meaning}</p>
                    </div>
                    <p className="text-primary text-lg">{surah.nameAr}</p>
                  </div>
                  <div className="flex gap-2 mt-2 text-xs text-gray-500">
                    <span>{surah.totalAyah} ayat</span>
                    <span>•</span>
                    <span className="capitalize">{surah.revelation}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">Surah tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
