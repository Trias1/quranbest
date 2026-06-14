"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { articleService } from "@/services/firestoreService"
import { Search } from "lucide-react"

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string[]
  createdAt: any
  views: number
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filtered, setFiltered] = useState<Article[]>([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  const categories = ["all", "akidah", "fiqih", "akhlak", "tafsir", "sejarah"]

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articleService.getAll()
        setArticles(data as Article[])
        setFiltered(data as Article[])
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  useEffect(() => {
    let result = articles

    if (selectedCategory !== "all") {
      result = result.filter((article) => article.category === selectedCategory)
    }

    if (search) {
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(search.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFiltered(result)
  }, [search, selectedCategory, articles])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Memuat...</div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Artikel Islami</h1>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 max-w-md">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Cari artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="h-48 bg-gradient-to-br from-primary to-green-700" />
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full">
                    {article.category}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{article.views} views</span>
                  <span>
                    {article.createdAt?.toDate
                      ? new Date(article.createdAt.toDate()).toLocaleDateString("id-ID")
                      : "Recently"}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-600">
            Artikel tidak ditemukan
          </div>
        )}
      </div>
    </div>
  )
}
