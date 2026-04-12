import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "./section-header"

const primary = ["Next.js", "TypeScript", "React", "Node.js"]
const secondary = [
  "PostgreSQL",
  "Prisma ORM",
  "Tailwind CSS",
  "ShadCN UI",
  "Docker",
  "AWS / Vercel",
  "Redis",
  "REST / tRPC",
]

export function Skills() {
  return (
    <section className="border-b px-7 py-10">
      <SectionHeader label="03 — Skills" title="Stack" />
      <div className="mt-5 flex flex-wrap gap-2">
        {primary.map((s) => (
          <Badge
            key={s}
            variant="secondary"
            className="rounded-md px-3 py-1.5 text-[12px] font-medium"
            // className="rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-center text-[12px] font-medium dark:border-neutral-700 dark:bg-neutral-900"
          >
            {s}
          </Badge>
        ))}
        {secondary.map((s) => (
          <Badge
            key={s}
            variant="outline"
            className="rounded-md px-3 py-1.5 text-[12px] text-muted-foreground"
          >
            {s}
          </Badge>
        ))}
      </div>
    </section>
  )
}
