import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

// Use system fonts for better compatibility
const systemFont = {
  className: "font-system",
}

export const metadata: Metadata = {
  title: "الوجهة الضبابية - اكتشف معالم القصيم التراثية",
  description:
    "لعبة تفاعلية مميزة لاكتشاف المعالم السياحية والتراثية في منطقة القصيم بالمملكة العربية السعودية مع تصميم تراثي أصيل",
  keywords: "القصيم، السياحة، المعالم، السعودية، لعبة، تفاعلية، تراث، نخيل، صحراء",
  authors: [{ name: "الوجهة الضبابية" }],
  creator: "الوجهة الضبابية",
  publisher: "الوجهة الضبابية",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://qassim-tourism.vercel.app"),
  openGraph: {
    title: "الوجهة الضبابية - اكتشف معالم القصيم التراثية",
    description: "لعبة تفاعلية مميزة لاكتشاف المعالم السياحية والتراثية في منطقة القصيم",
    url: "https://qassim-tourism.vercel.app",
    siteName: "الوجهة الضبابية",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "الوجهة الضبابية - اكتشف معالم القصيم",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "الوجهة الضبابية - اكتشف معالم القصيم التراثية",
    description: "لعبة تفاعلية مميزة لاكتشاف المعالم السياحية والتراثية في منطقة القصيم",
    images: ["/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#8B4513",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-system">{children}</body>
    </html>
  )
}
