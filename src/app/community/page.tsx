"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { MessageSquare, Users, HelpCircle, Send, Heart, MessageCircle, Clock, Share2 } from "lucide-react"

export default function CommunityPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("forum")
  const [newPost, setNewPost] = useState("")

  const [posts] = useState([
    { id: 1, author: "Ahmad Fauzi", avatar: "A", time: "2 jam lalu", content: "Alhamdulillah hari ini khatam juz 30. Ada tips untuk mulai menghafal juz 29? Mohon bimbingannya.", likes: 12, comments: 5, tags: ["Tahfidz", "Tips"] },
    { id: 2, author: "Siti Sarah", avatar: "S", time: "5 jam lalu", content: "Bagaimana cara mengatur waktu untuk tilawah di sela-sela kesibukan kerja? Saya sering skip tilawah kalau sedang banyak kerjaan kantor.", likes: 34, comments: 18, tags: ["Tilawah", "Produktivitas"] },
    { id: 3, author: "Budi Santoso", avatar: "B", time: "1 hari lalu", content: "Mencari teman untuk setoran hafalan online setiap ba'da subuh. Ada yang berminat gabung grup kecil?", likes: 8, comments: 3, tags: ["Partner Belajar"] }
  ])

  const [qna] = useState([
    { id: 1, q: "Hukum membaca Al-Qur'an terjemahan tanpa wudhu?", asker: "Hamba Allah", time: "1 hari lalu", a: "Membaca terjemahan atau tafsir Al-Qur'an (bukan mushaf murni) diperbolehkan tanpa wudhu, karena ia dihukumi sebagai buku biasa, bukan mushaf.", ustadz: "Ust. Khalid", aTime: "12 jam lalu" },
    { id: 2, q: "Cara membaca Ikhfa yang benar?", asker: "Irfan", time: "3 hari lalu", a: "Ikhfa Haqiqi dibaca dengan menyamarkan bunyi Nun sukun atau Tanwin ke dalam huruf Ikhfa yang 15. Suaranya diiringi dengung (ghunnah) sepanjang 2 harakat.", ustadz: "Ust. Abdul", aTime: "2 hari lalu" }
  ])

  return (
    <div className="container py-8 max-w-5xl">
      <div className="bg-gradient-to-r from-primary to-green-700 rounded-3xl p-8 md:p-12 text-white mb-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20"><Users size={120} /></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Komunitas Muslim</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Saling mengingatkan dalam kebaikan, berbagi ilmu, dan berdiskusi seputar Al-Qur&apos;an dan Islam.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        {[
          { id: "forum", icon: MessageSquare, label: "Forum Diskusi" },
          { id: "groups", icon: Users, label: "Grup Belajar" },
          { id: "ask", icon: HelpCircle, label: "Tanya Ustadz" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <tab.icon size={20} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Forum Tab */}
          {activeTab === "forum" && (
            <>
              {/* Create Post */}
              {user ? (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {user.displayName?.[0] || user.email?.[0] || "U"}
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Bagikan pemikiran atau pertanyaan Anda..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                        rows={3}
                      />
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex gap-2">
                          <button className="text-gray-400 hover:text-primary px-2 py-1 rounded"># Tambah Tag</button>
                        </div>
                        <button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                          <Send size={16} /> Posting
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-100 p-6 rounded-2xl text-center">
                  <p className="text-green-800 mb-4">Login untuk ikut berdiskusi di forum komunitas.</p>
                  <button onClick={() => window.location.href='/auth/login'} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-green-700">Login Sekarang</button>
                </div>
              )}

              {/* Feed */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary/30 transition">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 rounded-full flex items-center justify-center font-bold text-lg border border-gray-300">
                          {post.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{post.author}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12}/> {post.time}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex gap-6 border-t border-gray-50 pt-4 mt-2">
                      <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"><Heart size={18} /> {post.likes}</button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition"><MessageCircle size={18} /> {post.comments}</button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition"><Share2 size={18} /> Bagikan</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Ask Tab */}
          {activeTab === "ask" && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
                <h3 className="font-bold text-amber-800 text-xl mb-2 flex items-center gap-2"><HelpCircle/> Ajukan Pertanyaan</h3>
                <p className="text-amber-700 mb-4 text-sm">Pertanyaan Anda akan dijawab oleh ustadz/ustadzah yang kompeten.</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Tulis pertanyaan Anda disini..." className="flex-1 px-4 py-3 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  <button className="px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition">Kirim</button>
                </div>
              </div>

              {qna.map(q => (
                <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="mb-6">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold flex-shrink-0">Q</div>
                      <div>
                        <h4 className="font-bold text-lg">{q.q}</h4>
                        <p className="text-xs text-gray-500 mt-1">Ditanya oleh {q.asker} • {q.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-5 rounded-xl border border-green-100 ml-4 md:ml-10 relative">
                    <div className="absolute -left-3 top-5 w-6 h-6 bg-green-500 transform rotate-45"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">A</div>
                        <span className="font-bold text-green-800 text-sm">Dijawab oleh {q.ustadz}</span>
                        <span className="text-xs text-green-600 ml-auto">{q.aTime}</span>
                      </div>
                      <p className="text-gray-800 leading-relaxed text-sm">{q.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Groups Tab */}
          {activeTab === "groups" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: "Pejuang Subuh", desc: "Setoran hafalan juz 30 setiap ba'da subuh.", members: 124 },
                { name: "Kajian Fiqih Wanita", desc: "Membahas kitab-kitab fiqih khusus muslimah.", members: 340 },
                { name: "Tahsin Pemula", desc: "Grup latihan makhrijul huruf bersama.", members: 56 },
                { name: "Tadabbur Al-Kahfi", desc: "Mengkaji makna surah Al-Kahfi setiap Jumat.", members: 89 },
              ].map((g, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary transition">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4"><Users size={24}/></div>
                  <h3 className="font-bold text-lg mb-2">{g.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 h-10">{g.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-semibold">{g.members} Anggota</span>
                    <button className="px-4 py-1.5 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition">Gabung</button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Topik Populer</h3>
            <div className="flex flex-wrap gap-2">
              {["#Tajwid Dasar", "#HafalanJuz30", "#FiqihSholat", "#TafsirAlBaqarah", "#KajianSunnah", "#SedekahSubuh"].map(t => (
                <a key={t} href="#" className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-primary hover:text-white transition">{t}</a>
              ))}
            </div>
          </div>
          <div className="bg-primary p-6 rounded-2xl shadow-sm text-white">
            <h3 className="font-bold text-lg mb-2">Punya Ilmu untuk Dibagikan?</h3>
            <p className="text-sm opacity-90 mb-4">Jadilah kontributor aktif. Setiap tulisan yang bermanfaat akan menjadi amal jariyah.</p>
            <button className="w-full py-2 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition">Tulis Artikel Baru</button>
          </div>
        </div>
      </div>
    </div>
  )
}
