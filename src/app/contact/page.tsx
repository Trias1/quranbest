export default function ContactPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Hubungi Kami</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 text-gray-700">
          <h2 className="text-xl font-bold text-black">Informasi Kontak</h2>
          <div className="space-y-3">
            <p>📧 Email: support@quranbest.com</p>
            <p>📱 WhatsApp: +62 812-3456-7890</p>
            <p>📍 Jakarta, Indonesia</p>
          </div>
          <div className="pt-4">
            <h3 className="font-bold text-black mb-2">Sosial Media</h3>
            <div className="flex gap-4">
              <a href="#" className="text-primary hover:underline">Instagram</a>
              <a href="#" className="text-primary hover:underline">Facebook</a>
              <a href="#" className="text-primary hover:underline">YouTube</a>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Kirim Pesan</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nama Anda"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <input
              type="email"
              placeholder="Email Anda"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <textarea
              rows={4}
              placeholder="Pesan Anda"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
            />
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
