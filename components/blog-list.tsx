"use client"

import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { posts, categories, type Category } from "@/lib/blog-data"

const categoryColors: Record<Category, string> = {
  TypeScript:
    "bg-brand-subtle text-brand-subtle-foreground hover:bg-brand-subtle",
  React:
    "bg-success-subtle text-success-subtle-foreground hover:bg-success-subtle",
  "AI Agents":
    "bg-warning-subtle text-warning-subtle-foreground hover:bg-warning-subtle",
}

export function BlogList() {
  const [active, setActive] = useState<Category | "All">("All")

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active)
  const featured = posts.filter((p) => p.featured)

  return (
    <div>
      {/* ── Page header ── */}
      <div className="border-b px-4 pt-10 pb-8 sm:px-7">
        <p className="mb-3 text-[11px] tracking-widest text-muted-foreground uppercase">
          Writing
        </p>
        <h1 className="mb-3 text-3xl font-medium tracking-tight sm:text-4xl">
          Blog
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Practical articles on TypeScript, React patterns, and building with AI
          agents. No fluff, just things I&apos;ve actually shipped or struggled
          with.
        </p>
      </div>

      {/* ── Featured posts ── */}
      <div className="border-b px-4 py-8 sm:px-7">
        <p className="mb-4 text-[10px] tracking-widest text-muted-foreground uppercase">
          Featured
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {featured.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full cursor-pointer transition-colors hover:border-ring/40">
                <CardHeader className="pb-2">
                  <Badge
                    className={`mb-1 w-fit rounded-full text-[10px] ${categoryColors[post.category]}`}
                  >
                    {post.category}
                  </Badge>
                  <CardTitle className="group-hover:text-brand text-[13px] leading-snug transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 text-[12px] leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="gap-2 pt-0 text-[11px] text-muted-foreground">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Filter + all posts ── */}
      <div className="px-4 py-8 sm:px-7">
        {/* Category filter */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Button
            variant={active === "All" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 rounded-full text-xs"
            onClick={() => setActive("All")}
          >
            All ({posts.length})
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={active === cat ? "secondary" : "ghost"}
              size="sm"
              className="h-7 rounded-full text-xs"
              onClick={() => setActive(cat)}
            >
              {cat} ({posts.filter((p) => p.category === cat).length})
            </Button>
          ))}
        </div>

        {/* Post list */}
        <div className="flex flex-col gap-3">
          {filtered.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="cursor-pointer transition-colors hover:border-ring/40">
                <CardContent className="pt-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                    {/* Category + tags */}
                    <div className="flex items-center gap-2 sm:w-28 sm:flex-shrink-0 sm:flex-col sm:items-start">
                      <Badge
                        className={`rounded-full text-[10px] ${categoryColors[post.category]}`}
                      >
                        {post.category}
                      </Badge>
                    </div>

                    {/* Title + excerpt */}
                    <div className="min-w-0 flex-1">
                      <h3 className="group-hover:text-brand mb-1.5 text-[13px] leading-snug font-medium transition-colors">
                        {post.title}
                      </h3>
                      <p className="line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="rounded-full font-mono text-[10px]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Date + read time */}
                    <div className="flex gap-2 text-[11px] whitespace-nowrap text-muted-foreground sm:flex-col sm:gap-0.5 sm:text-right">
                      <span>{post.date}</span>
                      <span className="opacity-60">·</span>
                      <span>{post.readTime} read</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              No posts in this category yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
