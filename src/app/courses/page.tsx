"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { courseService } from "@/services/firestoreService"
import { Users } from "lucide-react"

interface Course {
  id: string
  title: string
  slug: string
  description: string
  type: "tahsin" | "tahfidz" | "webinar"
  status: "draft" | "published" | "archived"
  students: number
  thumbnail?: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filtered, setFiltered] = useState<Course[]>([])
  const [selectedType, setSelectedType] = useState("all")
  const [loading, setLoading] = useState(true)

  const types = ["all", "tahsin", "tahfidz", "webinar"]

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAll()
        const published = (data as Course[]).filter((c) => c.status === "published")
        setCourses(published)
        setFiltered(published)
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    if (selectedType === "all") {
      setFiltered(courses)
    } else {
      setFiltered(courses.filter((course) => course.type === selectedType))
    }
  }, [selectedType, courses])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Memuat...</div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Kelas Online</h1>

      {/* Type Filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedType === type
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="h-48 bg-gradient-to-br from-secondary to-purple-700" />
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-secondary text-white text-xs rounded-full mb-3">
                  {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                </span>
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>{course.students} siswa terdaftar</span>
                </div>
                <button className="w-full mt-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition">
                  Daftar Kelas
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-600">
            Tidak ada kelas yang tersedia
          </div>
        )}
      </div>
    </div>
  )
}
