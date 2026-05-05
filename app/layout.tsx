import type { Metadata } from "next"
import { Source_Sans_3, Merienda } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
})

const merienda = Merienda({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "BelaFlor - Floricultura Online",
  description:
    "A BelaFlor é uma floricultura online que oferece os mais belos arranjos e buquês de flores para todas as ocasiões. Entrega rápida e garantia de frescor.",
  keywords: "flores, buquês, arranjos, floricultura, entrega de flores, rosas",
  openGraph: {
    title: "BelaFlor - Floricultura Online",
    description:
      "Os mais belos arranjos e buquês de flores para todas as ocasiões.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${sourceSans.variable} ${merienda.variable} bg-background`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
