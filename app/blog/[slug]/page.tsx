import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer-cta"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PostBody } from "@/components/post-body"
import { posts, type Category } from "@/lib/blog-data"

const categoryColors: Record<Category, string> = {
  TypeScript:
    "bg-brand-subtle text-brand-subtle-foreground hover:bg-brand-subtle",
  React:
    "bg-success-subtle text-success-subtle-foreground hover:bg-success-subtle",
  "AI Agents":
    "bg-warning-subtle text-warning-subtle-foreground hover:bg-warning-subtle",
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: `${post.title} — Alex`, description: post.excerpt }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[960px] border-x border-border">
        <main>
          {/* ── Header ── */}
          <div className="border-b px-4 pt-8 pb-0 sm:px-7">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to blog
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge
                className={`rounded-full text-[10px] ${categoryColors[post.category]}`}
              >
                {post.category}
              </Badge>
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

            <h1 className="mb-4 max-w-2xl text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
              {post.title}
            </h1>

            <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 pb-6 text-[12px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="bg-brand-subtle text-brand-subtle-foreground flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium">
                  A
                </div>
                <span>Alex</span>
              </div>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime} read</span>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="px-4 py-10 sm:px-7">
            <PostBody content={post.content} />
          </div>

          {/* ── Related posts ── */}
          {related.length > 0 && (
            <div className="border-t px-4 pt-8 pb-10 sm:px-7">
              <p className="mb-4 text-[10px] tracking-widest text-muted-foreground uppercase">
                More in {post.category}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                    <Card className="h-full cursor-pointer transition-colors hover:border-ring/40">
                      <CardContent className="pt-5 pb-4">
                        <p className="group-hover:text-brand mb-2 text-[12px] leading-snug font-medium transition-colors">
                          {r.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {r.date} · {r.readTime} read
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
