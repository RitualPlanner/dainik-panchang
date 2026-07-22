import type React from "react"
import "./globals.css"
import "react-day-picker/dist/style.css"
import { LanguageProvider } from "./contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"
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
    <html lang="en" className={`${poppins.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: "Dainik Panchang - Hindu Lunar Calendar Generator",
  description: "Create, customize, and share daily panchang details including tithi, nakshatra, yog, karan, sunrise/sunset times, and more. Features multilingual support, QR code generation, and PDF export.",
  icons: {
    icon: "https://res.cloudinary.com/db6qh4jsv/image/upload/v1784730633/image1_s0xbfv.png",
    shortcut: "https://res.cloudinary.com/db6qh4jsv/image/upload/v1784730633/image1_s0xbfv.png",
    apple: "https://res.cloudinary.com/db6qh4jsv/image/upload/v1784730633/image1_s0xbfv.png",
  },
  generator: 'v0.app'
};
