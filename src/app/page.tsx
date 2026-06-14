import Link from "next/link"
import { ArrowRight, BookOpen, Users, Award, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-green-700 text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Baca Al-Qur'an Online
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Platform pembelajaran Al-Qur'an terpadu dengan tafsir, audio, dan komunitas
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/quran"
              className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
            >
              Mulai Membaca <ArrowRight size={20} />
            </Link>
            <Link
              href="/auth/register"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <BookOpen className="text-primary mb-4" size={32} />
              <h3 className="font-bold mb-2">Baca Quran</h3>
              <p className="text-gray-600 text-sm">
                Baca Al-Qur'an dengan terjemahan multi bahasa
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <Users className="text-primary mb-4" size={32} />
              <h3 className="font-bold mb-2">Kelas Online</h3>
              <p className="text-gray-600 text-sm">
                Ikuti kelas Tahsin, Tahfidz, dan Webinar Islam
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <Award className="text-primary mb-4" size={32} />
              <h3 className="font-bold mb-2">Sertifikat</h3>
              <p className="text-gray-600 text-sm">
                Dapatkan sertifikat setelah menyelesaikan kelas
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <Heart className="text-primary mb-4" size={32} />
              <h3 className="font-bold mb-2">Donasi</h3>
              <p className="text-gray-600 text-sm">
                Dukung pendidikan Islam melalui program donasi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12">Artikel Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <div className="h-48 bg-gradient-to-r from-primary to-green-700" />
                <div className="p-6">
                  <h3 className="font-bold mb-2">Judul Artikel {i}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Deskripsi artikel tentang pembelajaran Islam dan Al-Qur'an...
                  </p>
                  <Link href="#" className="text-primary font-semibold hover:underline">
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <p>Pengguna Aktif</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">114</div>
              <p>Surah Al-Qur'an</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <p>Kelas Online</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <p>Artikel Islami</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Mulai Belajar?</h2>
          <p className="text-gray-600 mb-8">
            Bergabunglah dengan ribuan pengguna lainnya dalam perjalanan pembelajaran Al-Qur'an
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Daftar Sekarang
          </Link>
        </div>
      </section>
    </div>
  )
}
