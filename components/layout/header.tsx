"use client"
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Clock } from "./clock";
import { siteConfig } from "@/lib/site-config";
import { Menu, X as CloseIcon} from "lucide-react";
import Link from "next/link";


export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const {navLinks,socials} = siteConfig;

  return (
    <header className="surface-card sticky top-3 z-50 px-4 py-3 backdrop-blur-md sm:top-6 sm:px-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
        <div className="min-w-0">
         <Link href={("/")}>Abdihakim</Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-foreground md:flex">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="transition-opacity hover:opacity-60">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            {socials.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-foreground transition-colors hover:bg-secondary"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-3 border-t border-border pt-3 md:hidden">
          <nav className="flex flex-col gap-1 text-sm text-foreground">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 transition-colors hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 sm:hidden">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-foreground transition-colors hover:bg-secondary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

