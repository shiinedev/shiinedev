import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const activity = [
  {
    icon: "⬡",
    iconClass: "bg-brand-subtle text-brand-subtle-foreground border-border",
    title: "Shipped DevForge v2.1",
    sub: "CLI scaffolding toolkit · 2.4k stars",
    time: "2d ago",
  },
  {
    icon: "✍",
    iconClass: "bg-success-subtle text-success-subtle-foreground border-border",
    title: "Published new guide",
    sub: "tRPC + Next.js 14 end-to-end types",
    time: "4d ago",
  },
  {
    icon: "◎",
    iconClass: "bg-warning-subtle text-warning-subtle-foreground border-border",
    title: "Open-sourced ReadAPI",
    sub: "Auto-generated API docs from OpenAPI",
    time: "1w ago",
  },
]

const stats = [
  { n: "24+", l: "projects shipped" },
  { n: "12k", l: "monthly readers" },
  { n: "3yr", l: "experience" },
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
    <section className="grid min-h-[380px] border-b md:grid-cols-[1fr_1px_1fr]">
      {/* Left */}
      <div className="flex flex-col justify-between px-9 py-12">
        <div>
          <p className="mb-5 text-[11px] tracking-widest text-muted-foreground uppercase">
            Full-stack developer — London
          </p>
          <h1 className="mb-5 text-[44px] leading-[1.05] font-medium tracking-[-0.03em]">
            I build things
            <br />
            <span className="font-normal text-muted-foreground">
              for the <span className="text-brand">web.</span>
            </span>
          </h1>
          <p className="mb-10 max-w-[300px] text-[13px] leading-relaxed text-muted-foreground">
            Product-minded engineer who ships full-stack apps and writes about
            what I learn — from architecture decisions to tiny TypeScript
            tricks.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button asChild size="sm">
              <Link href="#work">See my work</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="#blog">Read the blog</Link>
            </Button>
          </div>
          <span className="hidden text-[11px] tracking-wide text-muted-foreground lg:block">
            scroll ↓
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden bg-border md:block" />

      {/* Right */}
      <div className="flex flex-col">
        <div className="flex-1 border-b px-7 py-7">
          <p className="mb-4 text-[10px] tracking-widest text-muted-foreground uppercase">
            Recent activity
          </p>
          <ul className="flex flex-col divide-y divide-border">
            {activity.map((a, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                <span
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border text-[11px] ${a.iconClass}`}
                >
                  {a.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-medium">
                    {a.title}
                  </div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {a.sub}
                  </div>
                </div>
                <span className="flex-shrink-0 font-mono text-[10px] text-muted-foreground">
                  {a.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 px-7 py-5">
          <div className="grid grid-cols-3 divide-x divide-border">
            {stats.map((s) => (
              <div key={s.l} className="px-4 first:pl-0">
                <div className="text-[22px] font-medium tracking-tight">
                  {s.n}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {s.l}
                </div>
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
        </div>
      </div>
    </section>
  )
}
