import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
})
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })

export const metadata: Metadata = {
  title: "Vedant Naikwadi — Full Stack Developer & UI/UX Designer",
  description:
    "Portfolio of Vedant Naikwadi, a Full Stack Developer skilled in React, Node.js, and MongoDB. Building responsive UIs, reusable components, and secure backend systems.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon.webp",
        media: "(prefers-color-scheme: light)",
        type: "image/webp",
      },
      {
        url: "/favicon.webp",
        media: "(prefers-color-scheme: dark)",
        type: "image/webp",
      },
      {
        url: "/favicon.webp",
        type: "image/webp",
      },
    ],
    apple: "/favicon.webp",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${ibmPlexSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
