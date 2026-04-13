import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card"
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
    <section className="border-b px-4 py-10 sm:px-7">
      <SectionHeader label="03 — Skills" title="Stack" />
      <Card className="mt-5">
        <CardHeader className="pb-2">
          <CardDescription className="text-[11px]">Core stack</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {primary.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="rounded-md px-3 py-1 text-xs font-medium"
            >
              {s}
            </Badge>
          ))}
          <div className="my-1 h-px w-full bg-border" />
          {secondary.map((s) => (
            <Badge
              key={s}
              variant="outline"
              className="rounded-md px-3 py-1 text-xs text-muted-foreground"
            >
              {s}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
