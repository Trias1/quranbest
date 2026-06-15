"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock, MapPin, Calendar } from "lucide-react"

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

      // Today's prayer
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=20`
      )
      const data = await res.json()

      if (data.code === 200) {
        const t = data.data.timings
        setPrayers([
          { name: "Imsak", nameAr: "الإمساك", time: t.Imsak?.substring(0, 5) || "--:--" },
          { name: "Subuh", nameAr: "الفجر", time: t.Fajr.substring(0, 5) },
          { name: "Terbit", nameAr: "الشروق", time: t.Sunrise.substring(0, 5) },
          { name: "Dhuha", nameAr: "الضحى", time: t.Sunrise ? addMinutes(t.Sunrise.substring(0, 5), 15) : "--:--" },
          { name: "Dzuhur", nameAr: "الظهر", time: t.Dhuhr.substring(0, 5) },
          { name: "Ashar", nameAr: "العصر", time: t.Asr.substring(0, 5) },
          { name: "Maghrib", nameAr: "المغرب", time: t.Maghrib.substring(0, 5) },
          { name: "Isya", nameAr: "العشاء", time: t.Isha.substring(0, 5) },
        ])

        const hijri = data.data.date.hijri
        setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year} H`)
        const greg = data.data.date.gregorian
        setGregorianDate(`${greg.weekday.en}, ${greg.date}`)
      }

      // Monthly schedule
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

  useEffect(() => {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-2">Jadwal Sholat</h1>
      <div className="flex items-center gap-2 text-gray-600 mb-8">
        <MapPin size={18} />
        <span>{location}</span>
        <span className="mx-2">•</span>
        <Calendar size={18} />
        <span>{hijriDate}</span>
      </div>

      {/* Today's Schedule */}
      <div className="bg-gradient-to-br from-green-800 to-green-950 text-white rounded-2xl p-8 mb-8 shadow-xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Clock size={22} />
          Jadwal Hari Ini — {gregorianDate}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {prayers.map((p) => (
            <div key={p.name} className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition">
              <p className="text-green-300 text-sm">{p.nameAr}</p>
              <p className="font-bold text-lg">{p.name}</p>
              <p className="text-2xl font-bold mt-2">{p.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Table */}
      {monthlySchedule.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar size={22} />
            Jadwal Bulan Ini
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left">Tanggal</th>
                  <th className="py-3 px-3 text-center">Subuh</th>
                  <th className="py-3 px-3 text-center">Terbit</th>
                  <th className="py-3 px-3 text-center">Dzuhur</th>
                  <th className="py-3 px-3 text-center">Ashar</th>
                  <th className="py-3 px-3 text-center">Maghrib</th>
                  <th className="py-3 px-3 text-center">Isya</th>
                </tr>
              </thead>
              <tbody>
                {monthlySchedule.map((day, i) => {
                  const isToday = parseInt(day.date.gregorian.day) === new Date().getDate()
                  return (
                    <tr
                      key={i}
                      className={`border-t ${isToday ? "bg-green-50 font-bold" : "hover:bg-gray-50"}`}
                    >
                      <td className="py-2 px-4">
                        <span className={isToday ? "text-primary" : ""}>
                          {day.date.gregorian.day} — {day.date.hijri.day} {day.date.hijri.month.en}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">{day.timings.Fajr.substring(0, 5)}</td>
                      <td className="py-2 px-3 text-center">{day.timings.Sunrise.substring(0, 5)}</td>
                      <td className="py-2 px-3 text-center">{day.timings.Dhuhr.substring(0, 5)}</td>
                      <td className="py-2 px-3 text-center">{day.timings.Asr.substring(0, 5)}</td>
                      <td className="py-2 px-3 text-center">{day.timings.Maghrib.substring(0, 5)}</td>
                      <td className="py-2 px-3 text-center">{day.timings.Isha.substring(0, 5)}</td>
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
