import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
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
    featured: false,
    href: "#",
  },
  {
    icon: "◎",
    iconClass: "bg-warning-subtle text-warning-subtle-foreground",
    name: "ReadAPI",
    tagline: "Auto-generated API docs",
    desc: "Beautiful docs from your OpenAPI spec, zero config.",
    stack: ["React", "Tailwind"],
    featured: false,
    href: "#",
  },
  {
    icon: "◇",
    iconClass: "bg-brand-subtle text-brand-subtle-foreground",
    name: "LogSnap",
    tagline: "Edge logging dashboard",
    desc: "Minimal log viewer for Cloudflare Workers and serverless functions.",
    stack: ["Cloudflare", "Hono"],
    featured: false,
    href: "#",
  },
]

export function Projects() {
  return (
    <section id="work" className="border-b px-4 py-10 sm:px-7">
      <SectionHeader
        label="02 — Selected work"
        title="Projects"
        link="See all →"
        href="#"
      />

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Link
            key={p.name}
            href={p.href}
            className={i === 0 ? "sm:col-span-2" : ""}
          >
            <Card className="group h-full cursor-pointer transition-colors hover:border-ring/40">
              <CardHeader className="pb-2">
                <div
                  className={`mb-1 flex h-8 w-8 items-center justify-center rounded-md text-sm ${p.iconClass}`}
                >
                  {p.icon}
                </div>
                <CardTitle className="text-[13px]">{p.name}</CardTitle>
                <CardDescription className="text-[11px]">
                  {p.tagline}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-[12px] leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </CardContent>

              <CardFooter className="flex items-center gap-2 pt-2">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {p.stack.join(" · ")}
                </span>
                {p.badge && (
                  <Badge className={`ml-auto text-[10px] ${p.badgeClass}`}>
                    {p.badge}
                  </Badge>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
