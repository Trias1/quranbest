"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { collection, query, where, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/hooks/useAuth"
import { Bookmark, Share2, Copy, ChevronLeft, Play, Loader2, ArrowRight } from "lucide-react" // Added ArrowRight

interface SurahData {
  id: string
  number: number
  nameAr: string
  nameLatin: string
  meaning: string
  totalAyah: number
  revelation: string
}

interface AyahData {
  id: string
  surahId: string
  surahNumber: number
  ayahNumber: number
  textAr: string
  textInd: string
  textEn?: string
}

export default function SurahPage() {
  const params = useParams()
  const surahNumber = parseInt(params.number as string)
  const { user } = useAuth()

  const [surah, setSurah] = useState<SurahData | null>(null)
  const [ayahs, setAyahs] = useState<AyahData[]>([])
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({}) // Track copy status per ayah

  const fetchBookmarks = useCallback(async (userId: string) => {
    const q = query(collection(db, "bookmarks"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    return new Set(querySnapshot.docs.map((d) => d.data().ayahId))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch surah by number
        const surahQuery = query(
          collection(db, "surahs"),
          where("number", "==", surahNumber)
        )
        const surahSnap = await getDocs(surahQuery)

        if (!surahSnap.empty) {
          const surahDoc = surahSnap.docs[0]
          const surahData = surahDoc.data()
          setSurah({
            id: surahDoc.id,
            number: Number(surahData.number),
            nameAr: surahData.nameAr,
            nameLatin: surahData.nameLatin,
            meaning: surahData.meaning,
            totalAyah: Number(surahData.totalAyah),
            revelation: surahData.revelation,
          })

          // Fetch ayahs for this surah
          const ayahQuery = query(
            collection(db, "ayahs"),
            where("surahNumber", "==", surahNumber)
          )
          const ayahSnap = await getDocs(ayahQuery)
          const ayahList = ayahSnap.docs
            .map((doc) => {
              const data = doc.data()
              return {
                id: doc.id, // Firestore document ID is used as ayahId
                surahId: data.surahId,
                surahNumber: Number(data.surahNumber),
                ayahNumber: Number(data.ayahNumber),
                textAr: data.textAr,
                textInd: data.textInd,
                textEn: data.textEn,
              }
            })
            .sort((a, b) => a.ayahNumber - b.ayahNumber)
          setAyahs(ayahList)
        } else {
          setSurah(null)
          setAyahs([])
        }

        // Fetch user bookmarks if logged in
        if (user?.uid) {
          const userBookmarks = await fetchBookmarks(user.uid)
          setBookmarks(userBookmarks)
        }
      } catch (error) {
        console.error("Error fetching surah or ayahs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [surahNumber, user?.uid, fetchBookmarks])

  const toggleBookmark = async (ayah: AyahData) => {
    if (!user) {
      alert("Silakan login terlebih dahulu untuk bookmark ayat.")
      return
    }

    const bookmarkId = `${user.uid}_${ayah.id}` // Unique bookmark ID

    try {
      if (bookmarks.has(ayah.id)) {
        // Remove bookmark
        await deleteDoc(doc(db, "bookmarks", bookmarkId))
        setBookmarks((prev) => {
          const newSet = new Set(prev)
          newSet.delete(ayah.id)
          return newSet
        })
      } else {
        // Add bookmark
        await addDoc(collection(db, "bookmarks"), {
          id: bookmarkId, // Store specific ID
          userId: user.uid,
          ayahId: ayah.id,
          surahNumber: ayah.surahNumber,
          ayahNumber: ayah.ayahNumber,
          createdAt: new Date(),
        })
        setBookmarks((prev) => new Set(prev).add(ayah.id))
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error)
      alert("Gagal menyimpan bookmark. Coba lagi nanti.")
    }
  }

  const copyAyah = (text: string, ayahId: string) => {
    navigator.clipboard.writeText(text)
    setCopyStatus((prev) => ({ ...prev, [ayahId]: true }))
    setTimeout(() => setCopyStatus((prev) => ({ ...prev, [ayahId]: false })), 2000)
  }

  if (loading) {
    return (
      <div className="container py-20 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-xl text-gray-600 ml-4">Memuat Surah...</p>
      </div>
    )
  }

  if (!surah) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-2xl font-semibold text-gray-700">Surah tidak ditemukan 😔</p>
        <Link href="/quran" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-700 transition">
          ← Kembali ke daftar surah
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Link href="/quran" className="inline-flex items-center gap-2 text-primary mb-6 hover:underline font-medium">
        <ChevronLeft size={20} />
        Kembali ke Daftar Surah
      </Link>

      {/* Surah Header */}
      <div className="bg-gradient-to-r from-primary to-green-700 text-white rounded-2xl p-8 mb-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 text-[100px] font-bold opacity-50">بِسْمِ</div>
          <div className="absolute bottom-0 right-0 text-[80px] font-bold opacity-50">اللَّهِ</div>
        </div>
        <div className="text-center relative z-10">
          <p className="text-5xl font-arabic mb-3">{surah.nameAr}</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-1">{surah.nameLatin}</h1>
          <p className="text-lg opacity-90">{surah.meaning}</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm opacity-80">
            <span>{surah.totalAyah} Ayat</span>
            <span>•</span>
            <span className="capitalize">{surah.revelation}</span>
          </div>
        </div>
      </div>

      {/* Bismillah */}
      {surahNumber !== 1 && surahNumber !== 9 && (
        <div className="text-center py-6 mb-6">
          <p className="text-3xl font-arabic leading-loose">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="text-gray-600 mt-2">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang</p>
        </div>
      )}

      {/* Ayahs */}
      {ayahs.length > 0 ? (
        <div className="space-y-6">
          {ayahs.map((ayah) => (
            <div
              key={ayah.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition bg-white group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {ayah.ayahNumber}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleBookmark(ayah)}
                    className={`p-2 rounded-lg transition ${
                      bookmarks.has(ayah.id)
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title="Bookmark"
                  >
                    <Bookmark size={18} />
                  </button>
                  <button
                    onClick={() => copyAyah(ayah.textAr, ayah.id)}
                    className={`p-2 rounded-lg transition ${
                      copyStatus[ayah.id]
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title={copyStatus[ayah.id] ? "Disalin!" : "Salin Ayat"}
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    title="Putar Audio"
                  >
                    <Play size={18} />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    title="Share Ayat"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-3xl md:text-4xl text-right mb-6 leading-relaxed font-arabic">
                {ayah.textAr}
              </p>

              <div className="space-y-2 border-t pt-4">
                <p className="text-gray-800">
                  <span className="font-semibold text-primary">{ayah.ayahNumber}.</span>{" "}
                  {ayah.textInd}
                </p>
                {ayah.textEn && (
                  <p className="text-gray-500 text-sm italic mt-2">{ayah.textEn}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <Loader2 size={48} className="mx-auto text-gray-300 mb-4 animate-spin" />
          <p className="text-gray-600 text-lg mb-2">Memuat ayat...</p>
          <p className="text-gray-400 text-sm">Jika lama, mungkin data ayat belum terisi penuh.</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t">
        {surahNumber > 1 ? (
          <Link
            href={`/quran/surah/${surahNumber - 1}`}
            className="px-5 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 font-medium"
          >
            <ChevronLeft size={20} /> Surah {surahNumber - 1}
          </Link>
        ) : <div />}
        {surahNumber < 114 ? (
          <Link
            href={`/quran/surah/${surahNumber + 1}`}
            className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-medium"
          >
            Surah {surahNumber + 1} <ArrowRight size={20} />
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
