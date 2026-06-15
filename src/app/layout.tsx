import type { Metadata, Viewport } from "next"
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
    url: "https://quranbest-website.vercel.app",
    title: "QuranBest",
    description: "Platform Pembelajaran Al-Qur'an Terbaik",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "QuranBest",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: "#10B981",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');
          
          html.dark {
            color-scheme: dark;
          }
          
          @media (max-width: 640px) {
            body {
              padding-bottom: env(safe-area-inset-bottom);
            }
          }
        `}</style>
        <Navbar />
        <main className="min-h-screen dark:bg-gray-900">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
