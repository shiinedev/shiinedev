import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card"

const activity = [
  {
    icon: "⬡",
    iconClass: "bg-brand-subtle text-brand-subtle-foreground",
    title: "Shipped DevForge v2.1",
    sub: "CLI scaffolding toolkit · 2.4k stars",
    time: "2d ago",
  },
  {
    icon: "✍",
    iconClass: "bg-success-subtle text-success-subtle-foreground",
    title: "Published new guide",
    sub: "tRPC + Next.js 14 end-to-end types",
    time: "4d ago",
  },
  {
    icon: "◎",
    iconClass: "bg-warning-subtle text-warning-subtle-foreground",
    title: "Open-sourced ReadAPI",
    sub: "Auto-generated API docs from OpenAPI",
    time: "1w ago",
  },
]

const stats = [
  { n: "4+", l: "projects shipped" },
  { n: "500", l: "monthly readers" },
  { n: "2yr", l: "experience" },
]

const stack = [
  "Next.js",
  "TypeScript",
  "ShadCN",
  "Prisma",
  "Postgres",
  "Tailwind",
]

export function Hero() {
  return (
    <section className="border-b">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr]">
        {/* ── Left: identity ── */}
        <div className="flex flex-col justify-between gap-8 px-6 py-10 sm:px-9 sm:py-12">
          <div>
            <p className="mb-5 text-[11px] tracking-widest text-muted-foreground uppercase">
              Full-stack developer
            </p>
            <h1 className="mb-5 text-4xl leading-[1.05] font-medium tracking-[-0.03em] sm:text-[44px]">
              I build things
              <br />
              <span className="font-normal text-muted-foreground">
                for the <span className="text-brand">web.</span>
              </span>
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Product-minded engineer who ships full-stack apps and writes about
              what I learn — from architecture decisions to tiny TypeScript
              tricks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="sm">
              <Link href="#work">See my work</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="#blog">Read the blog</Link>
            </Button>
          </div>
        </div>

        {/* ── Vertical divider (desktop only) ── */}
        <div className="hidden bg-border lg:block" />

        {/* ── Right: activity card ── */}
        <div className="flex flex-col gap-4 border-t px-6 py-6 sm:px-7 sm:py-7 lg:border-t-0">
          {/* Activity feed */}
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-[10px] tracking-widest uppercase">
                Recent activity
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="divide-y divide-border">
                {activity.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border text-[11px] ${a.iconClass}`}
                    >
                      {a.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-medium">
                        {a.title}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {a.sub}
                      </p>
                    </div>
                    <span className="flex-shrink-0 font-mono text-[10px] text-muted-foreground">
                      {a.time}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Stats + stack */}
          <Card>
            <CardContent className="flex flex-col gap-4 pt-5">
              <div className="grid grid-cols-3 divide-x divide-border">
                {stats.map((s) => (
                  <div key={s.l} className="px-4 first:pl-0">
                    <p className="text-xl font-medium tracking-tight">{s.n}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {stack.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="rounded-full font-mono text-[10px]"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
