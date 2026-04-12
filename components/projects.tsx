import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "./section-header"

const projects = [
  {
    icon: "⬡",
    iconClass: "bg-brand-subtle text-brand-subtle-foreground",
    name: "DevForge",
    tagline: "CLI scaffolding toolkit",
    desc: "Command-line toolkit for scaffolding full-stack projects in seconds. Used by 2k+ developers across 40 countries.",
    stack: ["TypeScript", "Node.js", "Bash"],
    badge: "Open source",
    badgeClass:
      "bg-success-subtle text-success-subtle-foreground hover:bg-success-subtle",
    featured: true,
    href: "#",
  },
  {
    icon: "◈",
    iconClass: "bg-success-subtle text-success-subtle-foreground",
    name: "Flowdesk",
    tagline: "Task management for async teams",
    desc: "Built with Next.js App Router and real-time sync via Pusher.",
    stack: ["Next.js", "Prisma"],
    href: "#",
  },
  {
    icon: "◎",
    iconClass: "bg-warning-subtle text-warning-subtle-foreground",
    name: "ReadAPI",
    tagline: "Auto-generated API docs",
    desc: "Beautiful docs from your OpenAPI spec, zero config.",
    stack: ["React", "Tailwind"],
    href: "#",
  },
  {
    icon: "◇",
    iconClass: "bg-brand-subtle text-brand-subtle-foreground",
    name: "LogSnap",
    tagline: "Edge logging dashboard",
    desc: "Minimal log viewer for Cloudflare Workers and serverless functions.",
    stack: ["Cloudflare", "Hono"],
    href: "#",
  },
]

export function Projects() {
  return (
    <section id="work" className="border-b px-7 py-10">
      <SectionHeader
        label="02 — Selected work"
        title="Projects"
        link="See all →"
        href="#"
      />
      <div className="mt-5 grid grid-cols-1 gap-2.5 md:grid-cols-3">
        {projects.map((p, i) => (
          <Link
            key={p.name}
            href={p.href}
            className={[
              "group flex flex-col gap-3 rounded-lg border p-5 transition-colors",
              "hover:border-border/80 hover:bg-accent/40",
              i === 0 ? "bg-secondary md:col-span-2" : "bg-card",
            ].join(" ")}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-md text-[14px] ${p.iconClass}`}
            >
              {p.icon}
            </div>
            <div>
              <div className="text-[13px] font-medium">{p.name}</div>
              <div className="text-[11px] text-muted-foreground">
                {p.tagline}
              </div>
            </div>
            <p className="flex-1 text-[12px] leading-relaxed text-muted-foreground">
              {p.desc}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground">
                {p.stack.join(" · ")}
              </span>
              {p.badge && (
                <Badge className={`ml-auto text-[10px] ${p.badgeClass}`}>
                  {p.badge}
                </Badge>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
