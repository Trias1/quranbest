"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { ChevronLeft, Eye, Calendar, Tag } from "lucide-react"

export default function ArticleDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const q = query(collection(db, "articles"), where("slug", "==", slug))
        const snap = await getDocs(q)
        if (!snap.empty) {
          setArticle({ id: snap.docs[0].id, ...snap.docs[0].data() })
        }
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    fetchArticle()
  }, [slug])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!article) return (
    <div className="container py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Artikel tidak ditemukan</h1>
      <Link href="/articles" className="text-primary hover:underline">← Kembali ke daftar artikel</Link>
    </div>
  )

  return (
    <div className="container py-8 max-w-3xl">
      <Link href="/articles" className="inline-flex items-center gap-1 text-primary hover:underline mb-6 text-sm">
        <ChevronLeft size={18} /> Kembali
      </Link>

      <div className="h-64 bg-gradient-to-br from-primary to-green-700 rounded-2xl mb-8" />

      <div className="flex flex-wrap gap-3 mb-4">
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">{article.category}</span>
        {article.tags?.map((tag: string) => (
          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm flex items-center gap-1">
            <Tag size={12} /> {tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{article.title}</h1>

      <div className="flex gap-4 text-sm text-gray-500 mb-8">
        <span className="flex items-center gap-1"><Eye size={14} /> {article.views || 0} views</span>
        <span className="flex items-center gap-1"><Calendar size={14} /> {article.createdAt?.toDate ? new Date(article.createdAt.toDate()).toLocaleDateString("id-ID") : "Baru"}</span>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{article.content}</p>
      </div>

      <div className="mt-12 pt-8 border-t">
        <h3 className="font-bold text-lg mb-4">Bagikan Artikel</h3>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition">WhatsApp</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition">Facebook</button>
          <button className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-600 transition">Twitter</button>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link disalin!") }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition">Salin Link</button>
        </div>
      </div>
    </div>
  )
}
