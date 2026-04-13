import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "../section-header"

const socials = [
  { label: "shiinedev96@gmail.com", href: "mailto:shiinedev96@gmail.com" },
  { label: "GitHub", href: "https://github.com/shiinedev" },
  { label: "Twitter / X", href: "https://twitter.com/shiinedev" },
  { label: "LinkedIn", href: "https://linkedin.com/in/shiinedev" },
]

export function FooterCta() {
  return (
    <section className="border-b px-4 py-10 sm:px-7">
      <SectionHeader label="06 — Contact" title="" />
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <h2 className="max-w-xs text-2xl leading-tight font-medium tracking-tight sm:text-[28px]">
              Got a project in mind?{" "}
              <span className="text-primary">Let&apos;s build</span> something
              great.
            </h2>
            <div className="flex flex-col items-start gap-2.5 sm:items-end">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  className="flex items-center gap-1 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                  <span className="opacity-50">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="flex flex-col items-start justify-between gap-1 px-4 py-5 sm:flex-row sm:items-center sm:px-7">
      <span className="font-mono text-[11px] text-muted-foreground">
        © 2026 shiinedev
      </span>
      <span className="text-[11px] text-muted-foreground">
        Made with intention.
      </span>
    </footer>
  )
}
