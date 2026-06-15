"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock, MapPin } from "lucide-react"

interface PrayerTime {
  name: string
  nameAr: string
  time: string
}

export function PrayerTimes() {
  const [prayers, setPrayers] = useState<PrayerTime[]>([])
  const [hijriDate, setHijriDate] = useState("")
  const [gregorianDate, setGregorianDate] = useState("")
  const [location, setLocation] = useState("Jakarta, Indonesia")
  const [loading, setLoading] = useState(true)
  const [nextPrayer, setNextPrayer] = useState("")
  const [countdown, setCountdown] = useState("")

  const fetchPrayerTimes = useCallback(async (lat: number, lng: number) => {
    try {
      const today = new Date()
      const dd = String(today.getDate()).padStart(2, "0")
      const mm = String(today.getMonth() + 1).padStart(2, "0")
      const yyyy = today.getFullYear()
      const res = await fetch(`https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=20`)
      const data = await res.json()
      if (data.code === 200) {
        const t = data.data.timings
        setPrayers([
          { name: "Subuh", nameAr: "الفجر", time: t.Fajr.substring(0, 5) },
          { name: "Terbit", nameAr: "الشروق", time: t.Sunrise.substring(0, 5) },
          { name: "Dzuhur", nameAr: "الظهر", time: t.Dhuhr.substring(0, 5) },
          { name: "Ashar", nameAr: "العصر", time: t.Asr.substring(0, 5) },
          { name: "Maghrib", nameAr: "المغرب", time: t.Maghrib.substring(0, 5) },
          { name: "Isya", nameAr: "العشاء", time: t.Isha.substring(0, 5) },
        ])
        const h = data.data.date.hijri
        setHijriDate(`${h.day} ${h.month.en} ${h.year} H`)
        const g = data.data.date.gregorian
        setGregorianDate(`${g.weekday.en}, ${g.date}`)
      }
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchPrayerTimes(pos.coords.latitude, pos.coords.longitude)
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=id`)
            .then(r => r.json()).then(d => { if (d.city || d.locality) setLocation(`${d.city || d.locality}, ${d.countryName || "Indonesia"}`) }).catch(() => {})
        },
        () => fetchPrayerTimes(-6.2088, 106.8456)
      )
    } else { fetchPrayerTimes(-6.2088, 106.8456) }
  }, [fetchPrayerTimes])

  useEffect(() => {
    if (prayers.length === 0) return
    const update = () => {
      const now = new Date()
      const cur = now.getHours() * 60 + now.getMinutes()
      const pm = prayers.filter(p => p.name !== "Terbit").map(p => { const [h, m] = p.time.split(":").map(Number); return { ...p, minutes: h * 60 + m } })
      let next = pm.find(p => p.minutes > cur) || pm[0]
      setNextPrayer(next.name)
      let diff = next.minutes - cur; if (diff < 0) diff += 1440
      const hrs = Math.floor(diff / 60), mins = diff % 60
      setCountdown(hrs > 0 ? `${hrs}j ${mins}m lagi` : `${mins} menit lagi`)
    }
    update()
    const iv = setInterval(update, 60000)
    return () => clearInterval(iv)
  }, [prayers])

  if (loading) return (
    <div className="bg-gradient-to-br from-green-800 to-green-950 text-white rounded-2xl p-6 animate-pulse">
      <div className="h-6 bg-white/20 rounded w-40 mb-4" />
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">{[1,2,3,4,5,6].map(i => <div key={i} className="h-20 bg-white/10 rounded-xl" />)}</div>
    </div>
  )

  return (
    <div className="bg-gradient-to-br from-green-800 to-green-950 text-white rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2"><Clock size={20} />Jadwal Sholat</h2>
          <div className="flex items-center gap-1 text-green-300 text-sm mt-1"><MapPin size={14} />{location}</div>
        </div>
        <div className="text-left sm:text-right text-sm">
          <p className="text-green-200">{hijriDate}</p>
          <p className="text-green-400">{gregorianDate}</p>
        </div>
      </div>
      {nextPrayer && (
        <div className="bg-white/10 backdrop-blur rounded-xl p-3 mb-4 flex justify-between items-center">
          <div><p className="text-green-300 text-xs">Sholat berikutnya</p><p className="text-lg font-bold">{nextPrayer}</p></div>
          <div className="text-right"><p className="text-xl font-bold">{prayers.find(p => p.name === nextPrayer)?.time}</p><p className="text-green-300 text-xs">{countdown}</p></div>
        </div>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {prayers.map(p => (
          <div key={p.name} className={`rounded-xl p-3 text-center transition ${p.name === nextPrayer ? "bg-primary text-white shadow-lg" : "bg-white/10 hover:bg-white/15"}`}>
            <p className="text-xs opacity-80">{p.nameAr}</p>
            <p className="font-semibold text-sm">{p.name}</p>
            <p className="text-lg font-bold mt-1">{p.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
