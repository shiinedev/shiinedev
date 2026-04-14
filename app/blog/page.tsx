import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"
import { BlogList } from "@/components/blog-list"

export const metadata = {
  title: "Blog — Alex",
  description: "Writing on TypeScript, React, and AI Agents.",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[960px] border-x border-border">
        <main>
          <BlogList />
        </main>
      </div>
    </div>
  )
}
