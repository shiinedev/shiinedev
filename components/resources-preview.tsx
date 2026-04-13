import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
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
    progressClass: "bg-violet-500",
    href: "#",
  },
  {
    type: "Video guide",
    title: "ShadCN theming deep dive",
    sub: "Custom tokens · Dark mode · Tips",
    progress: 40,
    progressClass: "bg-rose-500",
    href: "#",
  },
  {
    type: "Starter template",
    title: "My Next.js + Prisma boilerplate",
    sub: "Auth · DB · UI · Deploy ready",
    progress: 100,
    progressClass: "bg-yellow-500",
    href: "#",
  },
]

export function ResourcesPreview() {
  return (
    <section className="border-b px-4 py-10 sm:px-7">
      <SectionHeader
        label="05 — Learn"
        title="Resources"
        link="All resources →"
        href="/resources"
      />
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {resources.map((r) => (
          <Link key={r.title} href={r.href} className="group">
            <Card className="h-full cursor-pointer transition-colors hover:border-ring/40">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] tracking-widest uppercase">
                  {r.type}
                </CardDescription>
                <CardTitle className="group-hover:text-brand text-[13px] transition-colors">
                  {r.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 pt-0">
                <p className="text-[11px] text-muted-foreground">{r.sub}</p>
                <div className="h-0.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full transition-all ${r.progressClass} `}
                    style={{ width: `${r.progress}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
