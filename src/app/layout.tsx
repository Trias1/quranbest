import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "QuranBest - Platform Pembelajaran Al-Qur'an Terbaik",
  description: "Baca Al-Qur'an online, tafsir, audio murottal, tahsin, tahfidz, dan komunitas belajar Islam",
  keywords: "Quran, Al-Qur'an, tafsir, murottal, tahsin, tahfidz, islam, pembelajaran",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://quran-best.com",
    title: "QuranBest",
    description: "Platform Pembelajaran Al-Qur'an Terbaik",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-white text-foreground">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
