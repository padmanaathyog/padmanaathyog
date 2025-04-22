import type React from "react"
import type { Metadata } from "next"
import { Lato, Roboto, Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ContentProtection from "@/components/content-protection"
// Add the EventPopup import
import EventPopup from "@/components/event-popup"

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
})

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "700", "900"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | Padmanaath Yog",
    default: "Padmanaath Yog | Ancient Wisdom for Modern Wellness",
  },
  description:
    "Discover the authentic practice of Padmanaath Yog, rooted in ancient Sanatan traditions. Transform your mind, body, and spirit through therapeutic yoga practices.",
  keywords: [
    "yoga",
    "padmanaath yog",
    "therapeutic yoga",
    "sanatan",
    "yoga protocol",
    "digestive health",
    "wellness",
    "yoga classes",
    "mindfulness",
    "yoga studio",
    "Indian yoga",
    "traditional yoga",
    "Hatha yoga",
    "Ashtanga yoga",
  ],
  authors: [{ name: "Padmanaath Yog" }],
  creator: "Yog Sadhak Umesh",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://padmanaathyog.com",
    title: "Padmanaath Yog | Ancient Wisdom for Modern Wellness",
    description: "Discover the authentic practice of Padmanaath Yog, rooted in ancient Sanatan traditions.",
    siteName: "Padmanaath Yog",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Padmanaath Yog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Padmanaath Yog | Ancient Wisdom for Modern Wellness",
    description: "Discover the authentic practice of Padmanaath Yog, rooted in ancient Sanatan traditions.",
    images: ["/images/twitter-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.variable} ${lato.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ContentProtection />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <EventPopup />
        </ThemeProvider>
      </body>
    </html>
  )
}
