"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { surahService, ayahService, bookmarkService } from "@/services/firestoreService"
import { useAuth } from "@/hooks/useAuth"
import { Bookmark, Share2, Copy, ChevronLeft } from "lucide-react"

interface Surah {
  id: string
  number: number
  nameAr: string
  nameLatin: string
  meaning: string
  totalAyah: number
}

interface Ayah {
  id: string
  surahId: string
  ayahNumber: number
  textAr: string
  textInd: string
  textEn?: string
}

export default function SurahPage() {
  const params = useParams()
  const number = parseInt(params.number as string)
  const { user } = useAuth()

  const [surah, setSurah] = useState<Surah | null>(null)
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const surahData = await surahService.getByNumber(number)
        setSurah(surahData as Surah)

        if (surahData?.id) {
          const ayahsData = await ayahService.getBySurah(surahData.id)
          setAyahs(ayahsData as Ayah[])

          if (user) {
            const userBookmarks = await bookmarkService.getByUser(user.uid)
            const bookmarkIds = new Set(
              userBookmarks.map((b: any) => b.ayahId)
            )
            setBookmarks(bookmarkIds)
          }
        }
      } catch (error) {
        console.error("Error fetching surah:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [number, user])

  const toggleBookmark = async (ayahId: string) => {
    if (!user) {
      alert("Silakan login terlebih dahulu")
      return
    }

    try {
      if (bookmarks.has(ayahId)) {
        const bookmark = await bookmarkService.getByUser(user.uid)
        const toDelete = bookmark.find((b: any) => b.ayahId === ayahId)
        if (toDelete) {
          await bookmarkService.delete(toDelete.id)
        }
        setBookmarks((prev) => {
          const newSet = new Set(prev)
          newSet.delete(ayahId)
          return newSet
        })
      } else {
        const ayah = ayahs.find((a) => a.id === ayahId)
        if (ayah) {
          await bookmarkService.create(user.uid, ayahId, surah!.number, ayah.ayahNumber)
          setBookmarks((prev) => new Set(prev).add(ayahId))
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    }
  }

  const copyAyah = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Ayat berhasil disalin")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Memuat...</div>
      </div>
    )
  }

  if (!surah) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Surah tidak ditemukan</div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Link href="/quran" className="flex items-center gap-2 text-primary mb-6 hover:underline">
        <ChevronLeft size={20} />
        Kembali ke Daftar Surah
      </Link>

      <div className="bg-gradient-to-r from-primary to-green-700 text-white rounded-lg p-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">{surah.nameLatin}</h1>
          <p className="text-2xl mb-4">{surah.nameAr}</p>
          <p className="text-lg opacity-90">{surah.meaning}</p>
          <p className="text-sm mt-4">{surah.totalAyah} Ayat</p>
        </div>
      </div>

      <div className="space-y-6">
        {ayahs.map((ayah) => (
          <div
            key={ayah.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-primary text-white rounded flex items-center justify-center font-bold text-sm">
                {ayah.ayahNumber}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleBookmark(ayah.id)}
                  className={`p-2 rounded ${
                    bookmarks.has(ayah.id)
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-600"
                  } hover:opacity-80 transition`}
                >
                  <Bookmark size={20} />
                </button>
                <button
                  onClick={() => copyAyah(ayah.textAr)}
                  className="p-2 rounded bg-gray-200 text-gray-600 hover:opacity-80 transition"
                >
                  <Copy size={20} />
                </button>
                <button className="p-2 rounded bg-gray-200 text-gray-600 hover:opacity-80 transition">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <p className="text-2xl text-right mb-6 leading-loose font-arabic">
              {ayah.textAr}
            </p>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Terjemahan:</span> {ayah.textInd}
              </p>
              {ayah.textEn && (
                <p>
                  <span className="font-semibold">English:</span> {ayah.textEn}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
