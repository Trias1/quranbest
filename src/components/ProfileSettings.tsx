"use client"

import { useState } from "react"
import { User, Save, Upload, X } from "lucide-react"
import { authService } from "@/lib/auth"
import { useAuthStore } from "@/store/authStore"

export function ProfileSettings() {
  const { user, setUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const currentUser = authService.getCurrentUser()
      if (!currentUser) throw new Error("Tidak ada user yang login")

      // Update profile di Firebase
      await import("firebase/auth").then(({ updateProfile }) => {
        return updateProfile(currentUser, {
          displayName: formData.displayName,
        })
      })

      // Update di store
      setUser({
        ...user!,
        displayName: formData.displayName,
      })

      setSuccess("Profil berhasil diperbarui!")
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message || "Gagal memperbarui profil")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-white">
        <User size={24} className="text-primary" />
        Profil Pengguna
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
          ❌ {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg text-sm">
          ✅ {success}
        </div>
      )}

      {!isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap</label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 dark:text-gray-200">
              {user?.displayName || "Belum diisi"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 dark:text-gray-200">
              {user?.email}
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <Upload size={18} />
            Edit Profil
          </button>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email tidak dapat diubah</p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin">⏳</div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Simpan
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsEditing(false)
                setFormData({
                  displayName: user?.displayName || "",
                  email: user?.email || "",
                })
              }}
              className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition flex items-center justify-center gap-2"
            >
              <X size={18} />
              Batal
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
