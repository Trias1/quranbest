interface PrayerNotification {
  name: string
  time: string
  audio?: HTMLAudioElement
}

export const notificationService = {
  // Request notification permission
  async requestPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.log("Browser tidak support notifications")
      return false
    }

    if (Notification.permission === "granted") {
      return true
    }

    if (Notification.permission !== "denied") {
      try {
        const permission = await Notification.requestPermission()
        return permission === "granted"
      } catch (error) {
        console.error("Error requesting notification permission:", error)
        return false
      }
    }

    return false
  },

  // Create adzan audio
  createAzanAudio(): HTMLAudioElement {
    const audio = new Audio()
    audio.src = "https://cdn.jsdelivr.net/gh/iyakaizen/azan-audio@main/adhan.wav"
    audio.preload = "auto"
    return audio
  },

  // Send prayer notification
  sendPrayerNotification(prayer: PrayerNotification) {
    if (Notification.permission !== "granted") {
      console.log("Notification permission not granted")
      return
    }

    try {
      const notification = new Notification(`🕌 ${prayer.name}`, {
        body: `Waktu ${prayer.name} sudah tiba: ${prayer.time}`,
        icon: "https://cdn-icons-png.flaticon.com/512/2801/2801941.png",
        tag: `prayer-${prayer.name}`,
        requireInteraction: true,
      })

      if (prayer.audio) {
        prayer.audio.play().catch((err) => {
          console.error("Error playing adzan:", err)
        })
      }

      setTimeout(() => {
        notification.close()
      }, 30000)

      notification.onclick = () => {
        window.focus()
        notification.close()
      }
    } catch (error) {
      console.error("Error sending notification:", error)
    }
  },

  // Setup prayer notification for a specific time
  scheduleNotification(prayerTime: string, prayerName: string) {
    const [hours, minutes] = prayerTime.split(":").map(Number)
    const now = new Date()
    const prayerDate = new Date()
    prayerDate.setHours(hours, minutes, 0, 0)

    if (prayerDate < now) {
      prayerDate.setDate(prayerDate.getDate() + 1)
    }

    const timeUntilPrayer = prayerDate.getTime() - now.getTime()

    if (timeUntilPrayer > 0) {
      setTimeout(() => {
        const audio = this.createAzanAudio()
        this.sendPrayerNotification({
          name: prayerName,
          time: prayerTime,
          audio,
        })
      }, timeUntilPrayer)

      return timeUntilPrayer
    }

    return 0
  },

  // Setup all prayer notifications
  scheduleAllNotifications(prayers: Array<{ name: string; time: string }>) {
    const schedules: { [key: string]: number } = {}

    prayers.forEach((prayer) => {
      const timeUntil = this.scheduleNotification(prayer.time, prayer.name)
      if (timeUntil > 0) {
        schedules[prayer.name] = timeUntil
      }
    })

    return schedules
  },

  // Check if notification is supported
  isSupported(): boolean {
    return "Notification" in window && "serviceWorker" in navigator
  },

  // Get notification permission status
  getPermissionStatus(): NotificationPermission {
    if (!("Notification" in window)) {
      return "denied"
    }
    return Notification.permission
  },
}
