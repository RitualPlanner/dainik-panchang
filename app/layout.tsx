import type React from "react"
import "./globals.css"
import "react-day-picker/dist/style.css"
import { LanguageProvider } from "./contexts/language-context"
import { Poppins, Cinzel } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-cinzel",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${cinzel.variable}`}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: "Dainik Panchang - Hindu Lunar Calendar Generator",
  description: "Create, customize, and share daily panchang details including tithi, nakshatra, yog, karan, sunrise/sunset times, and more. Features multilingual support, QR code generation, and PDF export.",
  icons: {
    icon: "https://res.cloudinary.com/db6qh4jsv/image/upload/v1784385541/logo_etlkxf.png",
    shortcut: "https://res.cloudinary.com/db6qh4jsv/image/upload/v1784385541/logo_etlkxf.png",
    apple: "https://res.cloudinary.com/db6qh4jsv/image/upload/v1784385541/logo_etlkxf.png",
  },
  generator: 'v0.app'
};
