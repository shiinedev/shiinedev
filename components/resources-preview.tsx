import Link from "next/link"
import { SectionHeader } from "./section-header"

const resources = [
  {
    type: "Guide series",
    title: "Next.js from zero to prod",
    sub: "6-part series · Beginner friendly",
    progress: 75,
    progressClass: "bg-primary",
    href: "#",
  },
  {
    type: "Cheatsheet",
    title: "TypeScript patterns I actually use",
    sub: "Generics, guards, utility types",
    progress: 100,
    progressClass: "bg-success-foreground",
    href: "#",
  },
  {
    type: "Video guide",
    title: "ShadCN theming deep dive",
    sub: "Custom tokens · Dark mode · Tips",
    progress: 40,
    progressClass: "bg-warning-subtle-foreground",
    href: "#",
  },
  {
    type: "Starter template",
    title: "My Next.js + Prisma boilerplate",
    sub: "Auth · DB · UI · Deploy ready",
    progress: 100,
    progressClass: "bg-brand",
    href: "#",
  },
]

export function ResourcesPreview() {
  return (
    <section className="border-b px-7 py-10">
      <SectionHeader
        label="05 — Learn"
        title="Resources"
        link="All resources →"
        href="/resources"
      />
      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {resources.map((r) => (
          <Link
            key={r.title}
            href={r.href}
            className="group rounded-lg border p-5 transition-colors hover:bg-accent/50"
          >
            <div className="mb-2 text-[10px] tracking-widest text-muted-foreground uppercase">
              {r.type}
            </div>
            <div className="group-hover:text-brand mb-1 text-[13px] font-medium transition-colors">
              {r.title}
            </div>
            <div className="mb-4 text-[11px] text-muted-foreground">
              {r.sub}
            </div>
            <div className="h-0.5 overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full ${r.progressClass} transition-all`}
                style={{ width: `${r.progress}%` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
