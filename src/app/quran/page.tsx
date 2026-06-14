"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { surahService } from "@/services/firestoreService"
import { BookOpen, Search } from "lucide-react"

interface Surah {
  id: string
  number: number
  nameAr: string
  nameLatin: string
  meaning: string
  totalAyah: number
}

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [filtered, setFiltered] = useState<Surah[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const data = await surahService.getAll()
        setSurahs(data as Surah[])
        setFiltered(data as Surah[])
      } catch (error) {
        console.error("Error fetching surahs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSurahs()
  }, [])

  useEffect(() => {
    const result = surahs.filter(
      (surah) =>
        surah.nameLatin.toLowerCase().includes(search.toLowerCase()) ||
        surah.meaning.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(result)
  }, [search, surahs])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Memuat...</div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Al-Qur'an</h1>
        <p className="text-gray-600 mb-6">Pilih Surah untuk mulai membaca</p>

        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 max-w-md">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Cari surah..."
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
              className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary text-white rounded flex items-center justify-center font-bold">
                  {surah.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{surah.nameLatin}</h3>
                  <p className="text-primary">{surah.nameAr}</p>
                  <p className="text-sm text-gray-600 mt-1">{surah.meaning}</p>
                  <p className="text-xs text-gray-500 mt-2">{surah.totalAyah} ayat</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">Surah tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
