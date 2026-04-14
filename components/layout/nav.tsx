"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { cn } from "@/lib/utils"

const links = [
  { label: "Work", href: "/#work" },
  { label: "Blog", href: "/blog" },
  { label: "Guides", href: "/guides" },
  { label: "Resources", href: "/resources" },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-sm">
      {/* Main bar */}
      <div className="flex h-14 items-center justify-between px-4 sm:px-7">
        <Link
          href="/"
          className="flex items-center gap-2 text-[13px] font-medium"
          onClick={() => setOpen(false)}
        >
          <span className="bg-brand h-2 w-2 rounded-full" />
          shiinedev
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={cn(
                "text-[12px] transition-colors",
                pathname === l.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] text-muted-foreground sm:flex">
            <span className="bg-success pulse-dot h-1.5 w-1.5 rounded-full" />
            Open to work
          </div>

          <ThemeToggle />

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown — inline, no portal/sheet */}
      {open && (
        <div className="border-t bg-background md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm transition-colors",
                  pathname === l.href
                    ? "bg-accent font-medium text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 border-t px-7 py-3">
            <span className="bg-success pulse-dot h-1.5 w-1.5 rounded-full" />
            <span className="text-[12px] text-muted-foreground">
              Open to work
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
