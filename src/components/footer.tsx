import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">QuranBest</h3>
            <p className="text-gray-400 text-sm">
              Platform pembelajaran Al-Qur'an terbaik untuk umat Muslim di seluruh dunia.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Fitur</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/quran" className="text-gray-400 hover:text-white">Baca Quran</Link></li>
              <li><Link href="/courses" className="text-gray-400 hover:text-white">Kelas</Link></li>
              <li><Link href="/articles" className="text-gray-400 hover:text-white">Artikel</Link></li>
              <li><Link href="/community" className="text-gray-400 hover:text-white">Komunitas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tentang</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white">Tentang Kami</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privasi</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Syarat & Ketentuan</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Hubungi Kami</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Sosial Media</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 QuranBest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
