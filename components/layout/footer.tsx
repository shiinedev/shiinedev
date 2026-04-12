import Link from "next/link"
import { SectionHeader } from "../projects"

const socials = [
  { label: "hello@alex.dev", href: "mailto:hello@alex.dev" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Twitter / X", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
]

export function FooterCta() {
  return (
    <section className="border-b border-neutral-200 px-7 py-10 dark:border-neutral-800">
      <SectionHeader label="06 — Contact" title="" />
      <div className="mt-2 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="max-w-xs text-[28px] leading-tight font-medium tracking-tight">
          Got a project in mind?{" "}
          <span className="text-[#7f77dd]">Let&apos;s build</span> something
          great.
        </h2>
        <div className="flex flex-col items-start gap-2 md:items-end">
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="flex items-center gap-1 text-[12px] text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              {s.label}
              <span className="text-neutral-400">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="flex items-center justify-between px-7 py-5">
      <span className="font-mono text-[11px] text-neutral-400">
        © 2026 shiinedev
      </span>
      <span className="text-[11px] text-neutral-400">Made with intention.</span>
    </footer>
  )
}
