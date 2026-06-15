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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');
        `}</style>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
