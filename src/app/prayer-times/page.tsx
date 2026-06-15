"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock, MapPin, Calendar, Bell, BellOff } from "lucide-react"
import { notificationService } from "@/lib/notificationService"

interface PrayerTime {
  name: string
  nameAr: string
  time: string
}

export default function PrayerTimesPage() {
  const [prayers, setPrayers] = useState<PrayerTime[]>([])
  const [hijriDate, setHijriDate] = useState("")
  const [gregorianDate, setGregorianDate] = useState("")
  const [location, setLocation] = useState("Jakarta, Indonesia")
  const [loading, setLoading] = useState(true)
  const [monthlySchedule, setMonthlySchedule] = useState<any[]>([])
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>("default")

  const addMinutes = useCallback((time: string, mins: number): string => {
    const [h, m] = time.split(":").map(Number)
    const total = h * 60 + m + mins
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
  }, [])

  const fetchPrayerTimes = useCallback(async (lat: number, lng: number) => {
    try {
      const today = new Date()
      const dd = String(today.getDate()).padStart(2, "0")
      const mm = String(today.getMonth() + 1).padStart(2, "0")
      const yyyy = today.getFullYear()

      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=20`
      )
      const data = await res.json()

      if (data.code === 200) {
        const t = data.data.timings
        const prayersList: PrayerTime[] = [
          { name: "Imsak", nameAr: "الإمساك", time: t.Imsak?.substring(0, 5) || "--:--" },
          { name: "Subuh", nameAr: "الفجر", time: t.Fajr.substring(0, 5) },
          { name: "Terbit", nameAr: "الشروق", time: t.Sunrise.substring(0, 5) },
          { name: "Dhuha", nameAr: "الضحى", time: t.Sunrise ? addMinutes(t.Sunrise.substring(0, 5), 15) : "--:--" },
          { name: "Dzuhur", nameAr: "الظهر", time: t.Dhuhr.substring(0, 5) },
          { name: "Ashar", nameAr: "العصر", time: t.Asr.substring(0, 5) },
          { name: "Maghrib", nameAr: "المغرب", time: t.Maghrib.substring(0, 5) },
          { name: "Isya", nameAr: "العشاء", time: t.Isha.substring(0, 5) },
        ]
        setPrayers(prayersList)

        const hijri = data.data.date.hijri
        setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year} H`)
        const greg = data.data.date.gregorian
        setGregorianDate(`${greg.weekday.en}, ${greg.date}`)
      }

      const monthRes = await fetch(
        `https://api.aladhan.com/v1/calendar/${yyyy}/${parseInt(mm)}?latitude=${lat}&longitude=${lng}&method=20`
      )
      const monthData = await monthRes.json()
      if (monthData.code === 200) {
        setMonthlySchedule(monthData.data)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }, [addMinutes])

  const handleEnableNotifications = async () => {
    if (!notificationService.isSupported()) {
      alert("Browser Anda tidak support notifikasi")
      return
    }

    try {
      const permitted = await notificationService.requestPermission()
      setPermissionStatus(notificationService.getPermissionStatus())

      if (permitted) {
        setNotificationsEnabled(true)
        // Schedule all prayer notifications
        notificationService.scheduleAllNotifications(prayers)
        alert("✅ Notifikasi adzan sudah aktif!")
      } else {
        alert("⚠️ Izin notifikasi ditolak. Ubah di settings browser Anda.")
      }
    } catch (error) {
      console.error("Error enabling notifications:", error)
    }
  }

  useEffect(() => {
    setPermissionStatus(notificationService.getPermissionStatus())

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchPrayerTimes(pos.coords.latitude, pos.coords.longitude)
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=id`)
            .then(r => r.json())
            .then(d => { if (d.city || d.locality) setLocation(`${d.city || d.locality}, ${d.countryName}`) })
            .catch(() => {})
        },
        () => fetchPrayerTimes(-6.2088, 106.8456)
      )
    } else {
      fetchPrayerTimes(-6.2088, 106.8456)
    }
  }, [fetchPrayerTimes])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">Jadwal Sholat</h1>
        <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2 flex-wrap">
            <MapPin size={18} />
            <span>{location}</span>
            <span className="mx-2 hidden sm:inline">•</span>
            <Calendar size={18} />
            <span>{hijriDate}</span>
          </div>
          <p className="text-sm">{gregorianDate}</p>
        </div>
      </div>

      {/* Notification Control */}
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <button
          onClick={handleEnableNotifications}
          disabled={notificationsEnabled || permissionStatus === "denied"}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
            notificationsEnabled || permissionStatus === "denied"
              ? "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-green-700"
          }`}
        >
          {notificationsEnabled ? (
            <>
              <Bell size={20} className="text-green-500" />
              <span>Notifikasi Aktif ✅</span>
            </>
          ) : permissionStatus === "denied" ? (
            <>
              <BellOff size={20} />
              <span>Notifikasi Ditolak</span>
            </>
          ) : (
            <>
              <Bell size={20} />
              <span>Aktifkan Notifikasi Adzan</span>
            </>
          )}
        </button>
      </div>

      {/* Today's Schedule */}
      <div className="bg-gradient-to-br from-green-800 to-green-950 text-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
          <Clock size={24} />
          Jadwal Hari Ini
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {prayers.map((p) => (
            <div key={p.name} className="bg-white/10 backdrop-blur rounded-xl p-3 md:p-4 text-center hover:bg-white/20 transition">
              <p className="text-green-300 text-xs md:text-sm">{p.nameAr}</p>
              <p className="font-bold text-sm md:text-base">{p.name}</p>
              <p className="text-xl md:text-2xl font-bold mt-2">{p.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Table */}
      {monthlySchedule.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 dark:text-white">
            <Calendar size={24} />
            Jadwal Bulan Ini
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm dark:bg-gray-800">
              <thead>
                <tr className="bg-primary text-white dark:bg-primary/80">
                  <th className="py-3 px-3 md:px-4 text-left text-xs md:text-sm">Tanggal</th>
                  <th className="py-3 px-2 md:px-3 text-center text-xs md:text-sm">Subuh</th>
                  <th className="py-3 px-2 md:px-3 text-center text-xs md:text-sm">Terbit</th>
                  <th className="py-3 px-2 md:px-3 text-center text-xs md:text-sm">Dzuhur</th>
                  <th className="py-3 px-2 md:px-3 text-center text-xs md:text-sm">Ashar</th>
                  <th className="py-3 px-2 md:px-3 text-center text-xs md:text-sm">Maghrib</th>
                  <th className="py-3 px-2 md:px-3 text-center text-xs md:text-sm">Isya</th>
                </tr>
              </thead>
              <tbody>
                {monthlySchedule.map((day, i) => {
                  const isToday = parseInt(day.date.gregorian.day) === new Date().getDate()
                  return (
                    <tr
                      key={i}
                      className={`border-t dark:border-gray-700 ${
                        isToday ? "bg-green-50 dark:bg-green-900/20 font-bold" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <td className="py-2 px-3 md:px-4">
                        <span className={isToday ? "text-primary font-bold" : "dark:text-gray-300"}>
                          {day.date.gregorian.day} — {day.date.hijri.day}
                        </span>
                      </td>
                      <td className="py-2 px-2 md:px-3 text-center text-xs md:text-sm dark:text-gray-300">{day.timings.Fajr.substring(0, 5)}</td>
                      <td className="py-2 px-2 md:px-3 text-center text-xs md:text-sm dark:text-gray-300">{day.timings.Sunrise.substring(0, 5)}</td>
                      <td className="py-2 px-2 md:px-3 text-center text-xs md:text-sm dark:text-gray-300">{day.timings.Dhuhr.substring(0, 5)}</td>
                      <td className="py-2 px-2 md:px-3 text-center text-xs md:text-sm dark:text-gray-300">{day.timings.Asr.substring(0, 5)}</td>
                      <td className="py-2 px-2 md:px-3 text-center text-xs md:text-sm dark:text-gray-300">{day.timings.Maghrib.substring(0, 5)}</td>
                      <td className="py-2 px-2 md:px-3 text-center text-xs md:text-sm dark:text-gray-300">{day.timings.Isha.substring(0, 5)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
