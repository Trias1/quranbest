"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { collection, query, where, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/hooks/useAuth"
import { Bookmark, Copy, ChevronLeft, Play, Pause, Loader2, ArrowRight, Info, BookOpen } from "lucide-react"

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
  audioUrl?: string
  tafsir?: string
}

export default function SurahPage() {
  const params = useParams()
  const surahNumber = parseInt(params.number as string)
  const { user } = useAuth()

  const [surah, setSurah] = useState<SurahData | null>(null)
  const [ayahs, setAyahs] = useState<AyahData[]>([])
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({})

  // Audio state
  const [playingAyahId, setPlayingAyahId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Tafsir state
  const [showTafsir, setShowTafsir] = useState<string | null>(null)

  const fetchBookmarks = useCallback(async (userId: string) => {
    const q = query(collection(db, "bookmarks"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    return new Set(querySnapshot.docs.map((d) => d.data().ayahId))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const surahQuery = query(collection(db, "surahs"), where("number", "==", surahNumber))
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

          const ayahQuery = query(collection(db, "ayahs"), where("surahNumber", "==", surahNumber))
          const ayahSnap = await getDocs(ayahQuery)
          const ayahList = ayahSnap.docs
            .map((doc) => {
              const data = doc.data()
              // Simulasi audio URL (dari AlQuran Cloud API)
              const paddedSurah = String(surahNumber).padStart(3, '0');
              const paddedAyah = String(data.ayahNumber).padStart(3, '0');
              const audioUrl = `https://everyayah.com/data/Mishary_Rashid_Alafasy_192kbps/${paddedSurah}${paddedAyah}.mp3`
              
              // Simulasi Tafsir Kemenag (Placeholder)
              const tafsir = `Ini adalah penjelasan tafsir (Kemenag) untuk surah ${surahData.nameLatin} ayat ke-${data.ayahNumber}. Tafsir ini menjelaskan makna mendalam dari ayat tersebut berdasarkan riwayat yang sahih dan pemahaman ulama tafsir.`

              return {
                id: doc.id,
                surahId: data.surahId,
                surahNumber: Number(data.surahNumber),
                ayahNumber: Number(data.ayahNumber),
                textAr: data.textAr,
                textInd: data.textInd,
                textEn: data.textEn,
                audioUrl,
                tafsir,
              }
            })
            .sort((a, b) => a.ayahNumber - b.ayahNumber)
          setAyahs(ayahList)
        } else {
          setSurah(null)
          setAyahs([])
        }

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

    const bookmarkId = `${user.uid}_${ayah.id}`
    try {
      if (bookmarks.has(ayah.id)) {
        await deleteDoc(doc(db, "bookmarks", bookmarkId))
        setBookmarks((prev) => {
          const newSet = new Set(prev)
          newSet.delete(ayah.id)
          return newSet
        })
      } else {
        await addDoc(collection(db, "bookmarks"), {
          id: bookmarkId,
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

  const toggleAudio = (ayahId: string, audioUrl: string) => {
    if (playingAyahId === ayahId) {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setPlayingAyahId(null)
    } else {
      // Play new audio
      if (audioRef.current) {
        audioRef.current.pause()
      }
      const newAudio = new Audio(audioUrl)
      newAudio.onended = () => setPlayingAyahId(null)
      newAudio.play().catch(e => console.error("Error playing audio", e))
      audioRef.current = newAudio
      setPlayingAyahId(ayahId)
    }
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])


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
    <div className="container py-8 max-w-4xl">
      <Link href="/quran" className="inline-flex items-center gap-2 text-primary mb-6 hover:underline font-medium transition-colors">
        <ChevronLeft size={20} />
        Daftar Surah
      </Link>

      {/* Surah Header - Redesigned */}
      <div className="bg-gradient-to-br from-green-700 via-primary to-green-600 text-white rounded-3xl p-10 mb-10 shadow-2xl relative overflow-hidden group">
        {/* Decorative Islamic Pattern placeholder */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 transition-opacity duration-700"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="text-center relative z-10">
          <p className="text-6xl font-arabic mb-4 tracking-wider drop-shadow-md">{surah.nameAr}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">{surah.nameLatin}</h1>
          <p className="text-xl opacity-90 font-medium">{surah.meaning}</p>
          
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/20 text-sm font-medium">
            <span className="bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-inner">{surah.totalAyah} Ayat</span>
            <span className="bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-inner capitalize">{surah.revelation}</span>
          </div>
        </div>
      </div>

      {/* Bismillah */}
      {surahNumber !== 1 && surahNumber !== 9 && (
        <div className="text-center py-8 mb-8 border-b border-gray-100">
          <p className="text-4xl font-arabic leading-loose text-gray-800">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="text-gray-500 mt-3 font-medium">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang</p>
        </div>
      )}

      {/* Ayahs List */}
      {ayahs.length > 0 ? (
        <div className="space-y-8">
          {ayahs.map((ayah) => (
            <div
              key={ayah.id}
              className="border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 bg-white group relative"
            >
              {/* Ayah Actions Toolbar */}
              <div className="flex justify-between items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg shadow-sm border border-primary/20">
                  {ayah.ayahNumber}
                </div>
                <div className="flex gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => toggleAudio(ayah.id, ayah.audioUrl || "")}
                    className={`p-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                      playingAyahId === ayah.id
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-600 hover:bg-white hover:shadow-sm hover:text-primary"
                    }`}
                    title={playingAyahId === ayah.id ? "Jeda Audio" : "Putar Audio"}
                  >
                    {playingAyahId === ayah.id ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                  </button>
                  <div className="w-px h-6 bg-gray-200 self-center mx-1"></div>
                  
                  <button
                    onClick={() => setShowTafsir(showTafsir === ayah.id ? null : ayah.id)}
                    className={`p-2.5 rounded-lg transition-colors ${showTafsir === ayah.id ? 'bg-amber-100 text-amber-700' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
                    title="Tafsir"
                  >
                    <Info size={18} />
                  </button>

                  <button
                    onClick={() => toggleBookmark(ayah)}
                    className={`p-2.5 rounded-lg transition-colors ${
                      bookmarks.has(ayah.id)
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:bg-white hover:shadow-sm"
                    }`}
                    title="Bookmark"
                  >
                    <Bookmark size={18} className={bookmarks.has(ayah.id) ? "fill-current" : ""} />
                  </button>
                  <button
                    onClick={() => copyAyah(`${ayah.textAr}\n\n${ayah.textInd}`, ayah.id)}
                    className={`p-2.5 rounded-lg transition-colors ${
                      copyStatus[ayah.id]
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-white hover:shadow-sm"
                    }`}
                    title={copyStatus[ayah.id] ? "Disalin!" : "Salin Ayat"}
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              {/* Arabic Text */}
              <p className="text-3xl md:text-4xl text-right mb-8 leading-[2.8] font-arabic text-gray-900 tracking-wide" dir="rtl" lang="ar">
                {ayah.textAr}
              </p>

              {/* Translation */}
              <div className="space-y-3 bg-gray-50 p-5 rounded-xl border border-gray-100">
                <p className="text-gray-800 text-lg leading-relaxed">
                  {ayah.textInd}
                </p>
                {ayah.textEn && (
                  <p className="text-gray-500 text-sm italic leading-relaxed border-t border-gray-200 pt-3">{ayah.textEn}</p>
                )}
              </div>

              {/* Tafsir Panel */}
              {showTafsir === ayah.id && (
                <div className="mt-4 p-5 bg-amber-50 rounded-xl border border-amber-200 fade-in relative">
                  <button 
                    onClick={() => setShowTafsir(null)}
                    className="absolute top-3 right-3 text-amber-600 hover:text-amber-800"
                  >
                    Tutup
                  </button>
                  <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                    <BookOpen size={16} /> Tafsir Kemenag
                  </h4>
                  <p className="text-amber-900/80 text-sm leading-relaxed text-justify">
                    {ayah.tafsir}
                  </p>
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
          <Loader2 size={48} className="mx-auto text-gray-300 mb-4 animate-spin" />
          <p className="text-gray-600 text-lg mb-2 font-medium">Memuat ayat...</p>
          <p className="text-gray-400 text-sm">Mengambil data dari server</p>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
        {surahNumber > 1 ? (
          <Link
            href={`/quran/surah/${surahNumber - 1}`}
            className="group flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all font-medium text-gray-700"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            <div>
              <span className="text-xs text-gray-400 block mb-0.5">Surah Sebelumnya</span>
              Surah {surahNumber - 1}
            </div>
          </Link>
        ) : <div />}
        
        {surahNumber < 114 ? (
          <Link
            href={`/quran/surah/${surahNumber + 1}`}
            className="group flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all font-medium"
          >
            <div className="text-right">
               <span className="text-xs text-green-200 block mb-0.5">Surah Berikutnya</span>
               Surah {surahNumber + 1}
            </div>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
