import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import ChatWidget from "@/components/ChatWidget"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "AURA — Luxury beauty products for radiant skin.",
  description: "Crafted with nature, designed for elegance — skincare that transforms.",
  generator: "v0.app",
  alternates: {
    canonical: "https://aura.example/",
  },
  openGraph: {
    siteName: "AURA",
    title: "Luxury beauty products for radiant skin. | AURA",
    description: "Crafted with nature, designed for elegance — skincare that transforms.",
    type: "website",
    url: "https://aura.example/",
    images: [
      {
        url: "/images/opengraph-AURA.jpeg",
        alt: "AURA luxury beauty — premium skincare crafted with nature",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury beauty products for radiant skin. | AURA",
    description: "Crafted with nature, designed for elegance — skincare that transforms.",
    images: [
      {
        url: "/images/opengraph-AURA.jpeg",
        alt: "AURA luxury beauty — premium skincare crafted with nature",
      },
    ],
    site: "@aurabeauty",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">
        <Header />
        <main className="pt-20">{children}</main>
        <ChatWidget />
      </body>
    </html>
  )
}

