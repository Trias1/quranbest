"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authService } from "@/lib/auth"
import { useAuthStore } from "@/store/authStore"
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

    if (password.length < 6) {
      setError("Password minimal 6 karakter")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Kata sandi tidak cocok")
      setLoading(false)
      return
    }

    try {
      const firebaseUser = await authService.register(email, password, name)

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
    <div className="min-h-screen bg-gradient-to-br from-primary to-green-700 dark:from-green-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary dark:text-green-400 mb-2">QuranBest</h1>
          <p className="text-gray-600 dark:text-gray-400">Buat akun baru</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-200">Nama Lengkap</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus-within:border-primary dark:focus-within:border-green-400 transition bg-white dark:bg-gray-700">
              <User size={20} className="text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="ml-2 flex-1 outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-200">Email</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus-within:border-primary dark:focus-within:border-green-400 transition bg-white dark:bg-gray-700">
              <Mail size={20} className="text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="ml-2 flex-1 outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-200">Kata Sandi</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus-within:border-primary dark:focus-within:border-green-400 transition bg-white dark:bg-gray-700">
              <Lock size={20} className="text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="ml-2 flex-1 outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
                minLength={6}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-200">Konfirmasi Kata Sandi</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus-within:border-primary dark:focus-within:border-green-400 transition bg-white dark:bg-gray-700">
              <Lock size={20} className="text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi"
                className="ml-2 flex-1 outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary dark:bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 dark:hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader size={20} className="animate-spin" />}
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6 text-sm">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="text-primary dark:text-green-400 font-semibold hover:underline">
            Masuk sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}
