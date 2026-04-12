import { Nav } from "@/components/layout/nav"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { BlogPreview } from "@/components/blog-preview"
import { ResourcesPreview } from "@/components/resources-preview"
import { FooterCta, Footer } from "@/components/layout/footer"

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-full border-x border-neutral-200 dark:border-neutral-800">
      <Nav />
      <Hero />
      <Projects />
      <Skills />
      <BlogPreview />
      <ResourcesPreview />
      <FooterCta />
      <Footer />
    </main>
  )
}
