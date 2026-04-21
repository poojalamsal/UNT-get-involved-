// Header Component for UNT Get Involved
// Assigned to: Ifunaya (Priority 5 - UI Polish)

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Bookmark, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  currentPage?: "events" | "clubs" | "saved"
}

export function Header({ currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Events", icon: Calendar, page: "events" as const },
    { href: "/clubs", label: "Clubs", icon: Users, page: "clubs" as const },
    { href: "/saved", label: "Saved", icon: Bookmark, page: "saved" as const },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">U</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold leading-none text-foreground">
              UNT Get Involved
            </h1>
            <p className="text-xs text-muted-foreground">
              Campus Events & Clubs
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.page} href={item.href}>
              <Button
                variant={currentPage === item.page ? "secondary" : "ghost"}
                className={cn(
                  "gap-2",
                  currentPage === item.page && "bg-secondary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link key={item.page} href={item.href}>
                <Button
                  variant={currentPage === item.page ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    currentPage === item.page && "bg-secondary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
