import type React from "react"
import "./globals.css"
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
      generator: 'v0.app'
    };
