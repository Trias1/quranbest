"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { donationService } from "@/services/firestoreService"
import { Heart, AlertCircle } from "lucide-react"

export default function DonatePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [amount, setAmount] = useState("50000")
  const [isMonthly, setIsMonthly] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState("")

  const presetAmounts = ["10000", "25000", "50000", "100000", "250000", "500000"]

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/auth/login")
      return
    }

    setProcessing(true)
    setError("")

    try {
      await donationService.create({
        userId: user.uid,
        amount: parseInt(amount),
        status: "pending",
      })

      alert("Donasi berhasil diproses!")
      setAmount("50000")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Heart size={48} className="mx-auto text-amber-500 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Berdonasi untuk Islam</h1>
          <p className="text-gray-600 text-lg">
            Bantu kami mengembangkan platform pembelajaran Al-Qur&apos;an terbaik
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex gap-2">
              <AlertCircle size={20} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleDonate} className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block font-semibold mb-4">Pilih Jumlah Donasi</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`py-2 px-4 rounded-lg font-semibold transition ${
                      amount === preset
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Rp{parseInt(preset).toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="relative">
                <label className="text-sm text-gray-600">atau masukkan jumlah lain</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Masukkan jumlah"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMonthly}
                  onChange={(e) => setIsMonthly(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="font-semibold">Donasi berulang setiap bulan</span>
              </label>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Jumlah Donasi</span>
                <span className="font-bold">Rp{parseInt(amount).toLocaleString()}</span>
              </div>
              {isMonthly && (
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Frekuensi</span>
                  <span>Setiap bulan</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">
                  Rp{parseInt(amount).toLocaleString()}
                  {isMonthly && "/bulan"}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Heart size={20} />
              {processing ? "Memproses..." : "Lanjutkan ke Pembayaran"}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
            <p className="font-semibold mb-2">💡 Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Donasi Anda akan membantu pengembangan platform</li>
              <li>Semua donasi akan dicatat dan transparan</li>
              <li>Anda akan menerima bukti donasi melalui email</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
