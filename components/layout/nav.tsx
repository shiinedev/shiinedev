"use client"

import Link from "next/link"

const links = [
  { label: "Work", href: "#work" },
  { label: "Blog", href: "#blog" },
  { label: "Guides", href: "/guides" },
  { label: "Resources", href: "/resources" },
]

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-7 py-3.5">
        <Link
          href="/"
          className="flex items-center gap-2 text-[13px] font-medium"
        >
          <span className="bg-brand h-2 w-2 rounded-full" />
          shiined.dev
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[12px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] text-muted-foreground">
          <span className="bg-success pulse-dot h-1.5 w-1.5 rounded-full" />
          Open to work
        </div>
      </div>
    </header>
  )
}
