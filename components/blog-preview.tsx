import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "./section-header"

const posts = [
  {
    num: "01",
    title: "Building a type-safe API with tRPC and Next.js 14",
    date: "Apr 8, 2026",
    readTime: "8 min read",
    category: "Guide",
    href: "#",
  },
  {
    num: "02",
    title: "Why I ditched CSS-in-JS for Tailwind (and don't regret it)",
    date: "Mar 22, 2026",
    readTime: "5 min read",
    category: "Opinion",
    href: "#",
  },
  {
    num: "03",
    title: "The complete guide to Next.js App Router data fetching",
    date: "Mar 10, 2026",
    readTime: "12 min read",
    category: "Deep dive",
    href: "#",
  },
]

export function BlogPreview() {
  return (
    <section id="blog" className="border-b px-7 py-10">
      <SectionHeader
        label="04 — Writing"
        title="Latest posts"
        link="All articles →"
        href="/blog"
      />
      <ul className="mt-4 divide-y divide-border">
        {posts.map((p) => (
          <li key={p.num}>
            <Link
              href={p.href}
              className="group -mx-2 flex items-start gap-4 rounded-lg px-2 py-4 transition-colors hover:bg-accent/50"
            >
              <span className="w-5 flex-shrink-0 pt-0.5 font-mono text-[11px] text-muted-foreground">
                {p.num}
              </span>
              <div className="min-w-0 flex-1">
                <div className="group-hover:text-brand text-[13px] leading-snug font-medium transition-colors">
                  {p.title}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {p.date} · {p.readTime}
                </div>
              </div>
              <Badge
                variant="outline"
                className="mt-0.5 flex-shrink-0 rounded-full text-[10px]"
              >
                {p.category}
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
