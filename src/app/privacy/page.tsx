export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Kebijakan Privasi</h1>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>Terakhir diperbarui: Juni 2024</p>
        <h2 className="text-2xl font-bold text-black pt-4">1. Informasi yang Kami Kumpulkan</h2>
        <p>
          Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti nama,
          alamat email, dan data profil saat mendaftar akun.
        </p>
        <h2 className="text-2xl font-bold text-black pt-4">2. Penggunaan Informasi</h2>
        <p>Informasi Anda digunakan untuk:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Menyediakan dan meningkatkan layanan</li>
          <li>Menyimpan progress bacaan Al-Qur&apos;an</li>
          <li>Mengirim notifikasi terkait kelas dan konten</li>
          <li>Memproses transaksi donasi</li>
        </ul>
        <h2 className="text-2xl font-bold text-black pt-4">3. Keamanan Data</h2>
        <p>
          Kami menggunakan Firebase Authentication dan Firestore dengan enkripsi
          untuk melindungi data Anda. Data tersimpan di server Google Cloud yang aman.
        </p>
        <h2 className="text-2xl font-bold text-black pt-4">4. Hak Pengguna</h2>
        <p>
          Anda berhak mengakses, memperbarui, atau menghapus data pribadi Anda
          kapan saja melalui dashboard akun.
        </p>
      </div>
    </div>
  )
}
