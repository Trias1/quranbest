"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authService } from "@/lib/auth"
import { useAuthStore } from "@/store/authStore"
import { userService } from "@/services/firestoreService"
import { Mail, Lock, User, Loader } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Kata sandi tidak cocok")
      setLoading(false)
      return
    }

    try {
      const firebaseUser = await authService.register(email, password)
      
      await userService.create({
        email: firebaseUser.email || "",
        name: name,
        displayName: name,
        photoURL: null,
        role: "member",
      })

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: name,
        photoURL: null,
        role: "member",
      })
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-green-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">QuranBest</h1>
          <p className="text-gray-600">Buat akun baru</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nama Lengkap</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <User size={20} className="text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="ml-2 flex-1 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <Mail size={20} className="text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="ml-2 flex-1 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Kata Sandi</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <Lock size={20} className="text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="ml-2 flex-1 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Konfirmasi Kata Sandi</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <Lock size={20} className="text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="ml-2 flex-1 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader size={20} className="animate-spin" />}
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="text-primary font-semibold hover:underline">
            Masuk sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}
