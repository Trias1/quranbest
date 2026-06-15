import Link from "next/link"
import { BookOpen, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2 mb-4">
              <BookOpen size={28} /> QuranBest
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Platform pembelajaran Al-Qur&apos;an terbaik untuk umat Muslim di seluruh dunia. Baca, pelajari, dan hafal Al-Qur&apos;an dengan mudah.
            </p>
            <div className="flex gap-3">
              {["Facebook", "Instagram", "YouTube", "Twitter"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition text-xs font-bold">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Fitur</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/quran", label: "Baca Al-Qur'an" },
                { href: "/prayer-times", label: "Jadwal Sholat" },
                { href: "/courses", label: "Kelas Online" },
                { href: "/articles", label: "Artikel Islami" },
                { href: "/donate", label: "Donasi" },
                { href: "/community", label: "Komunitas" },
              ].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-gray-400 hover:text-primary transition">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Surah Populer</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/quran/surah/1", label: "Al-Fatihah" },
                { href: "/quran/surah/36", label: "Yasin" },
                { href: "/quran/surah/55", label: "Ar-Rahman" },
                { href: "/quran/surah/67", label: "Al-Mulk" },
                { href: "/quran/surah/112", label: "Al-Ikhlas" },
                { href: "/quran/surah/114", label: "An-Nas" },
              ].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-gray-400 hover:text-primary transition">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Informasi</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/about", label: "Tentang Kami" },
                { href: "/privacy", label: "Kebijakan Privasi" },
                { href: "/terms", label: "Syarat & Ketentuan" },
                { href: "/contact", label: "Hubungi Kami" },
              ].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-gray-400 hover:text-primary transition">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} QuranBest. All rights reserved.</p>
          <p className="text-gray-500 text-sm flex items-center gap-1">Made with <Heart size={14} className="text-red-500" /> for the Muslim Ummah</p>
        </div>
      </div>
    </footer>
  )
}
