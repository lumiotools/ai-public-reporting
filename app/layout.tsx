import "./globals.css"
import { Poppins } from "next/font/google"
import Link from "next/link"
import type { Metadata } from "next"
import type React from "react" // Import React
import MobileNav from "@/components/mobile-nav"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "AI-Powered Public Reporting System",
  description: "Report local issues easily with our AI-powered system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <div className="min-h-screen bg-gradient-to-br to-[#FFD5EB] via-[#FAEBF0] from-[#CFC6FF] bg-white">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="container mx-auto flex h-14 items-center justify-between">
              <Link href="/" className="flex items-center">
                <span className="font-semibold text-[#25313D]">Citizens Reporting</span>
              </Link>
              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/#features" className="text-[#362864] hover:underline">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/#benefits" className="text-[#362864] hover:underline">
                      Benefits
                    </Link>
                  </li>
                  <li>
                    <Link href="/report" className="text-[#362864] hover:underline">
                      Report Issue
                    </Link>
                  </li>
                </ul>
              </nav>
              <MobileNav />
            </div>
          </header>
          <main className="container mx-auto pb-10">{children}</main>
          <footer className="bg-[#362864] text-white py-8">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 Citizens Reporting. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

