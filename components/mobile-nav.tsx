"use client"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

const MobileNav = () => {
    const [open, setOpen] = useState(false)

    const handleLinkClick = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 cursor-pointer md:hidden" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <Link href="/" className="text-lg text-[#362864] font-semibold" onClick={handleLinkClick}>
            Citizens Reporting
          </Link>
          <Link href="/#features" className="text-lg text-[#362864]" onClick={handleLinkClick}>
            Features
          </Link>
          <Link href="/#benefits" className="text-lg text-[#362864]" onClick={handleLinkClick}>
            Benefits
          </Link>
          <Link href="/report" className="text-lg text-[#362864]" onClick={handleLinkClick}>
            Report Issue
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav

