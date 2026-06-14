"use client"

import { useState } from "react"
import { MessageSquare, Users, HelpCircle } from "lucide-react"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("forum")

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Komunitas</h1>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab("forum")}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === "forum"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          <MessageSquare className="inline mr-2" size={20} />
          Forum Diskusi
        </button>
        <button
          onClick={() => setActiveTab("groups")}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === "groups"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          <Users className="inline mr-2" size={20} />
          Grup Belajar
        </button>
        <button
          onClick={() => setActiveTab("ask")}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === "ask"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          <HelpCircle className="inline mr-2" size={20} />
          Tanya Ustadz
        </button>
      </div>

      {/* Forum Tab */}
      {activeTab === "forum" && (
        <div className="space-y-6">
          <button className="w-full md:w-auto px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition">
            + Buat Topik Baru
          </button>

          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2">Topik Diskusi {i}</h3>
              <p className="text-gray-600 mb-4">
                Ini adalah konten dari topik diskusi yang bisa diikuti oleh semua anggota komunitas...
              </p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>👤 Pengguna {i}</span>
                <span>💬 {i * 5} balasan</span>
                <span>👁️ {i * 10} views</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Groups Tab */}
      {activeTab === "groups" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2">Grup Belajar {i}</h3>
              <p className="text-gray-600 mb-4">
                Grup untuk belajar bersama Al-Qur'an dan berbagi pengetahuan...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">👥 {i * 20} anggota</span>
                <button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition">
                  Bergabung
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ask Tab */}
      {activeTab === "ask" && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
            <h3 className="font-bold mb-2">📚 Tanya Ustadz</h3>
            <p className="text-gray-700">
              Ajukan pertanyaan Anda tentang Al-Qur'an, Islam, dan pembelajaran kepada para ustadz kami yang berpengalaman.
            </p>
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="mb-4">
                  <h4 className="font-bold">Pertanyaan: Bagaimana cara tepat melafalkan Quran? {i}</h4>
                  <p className="text-gray-600 text-sm mt-1">Ditanya oleh Pengguna {i}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-900 text-sm mb-2">Jawaban dari Ustadz:</p>
                  <p className="text-gray-700">
                    Untuk melafalkan Quran dengan benar, Anda perlu belajar tajweed yang mencakup makhrijul huruf (tempat keluarnya huruf)...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
