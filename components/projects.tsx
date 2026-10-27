import { projects } from "@/lib/projects"
import Link from "next/link"


export const Projects = () =>{
    return(
        <section id="projects" className="px-2 py-8 sm:px-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Case Studies &amp; Projects
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          A selection of projects showcasing strategy, design thinking, and measurable impact.
        </p>

        <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/rpojects/${p.slug}`}
             
              className="group"
            >
              <div className="overflow-hidden rounded-2xl bg-muted">
                <video
                  src={p.video}
                  poster={p.img}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={p.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{p.tag}</p>
              <h3 className="mt-1 text-sm font-semibold text-foreground">{p.title}</h3>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Read the Blog
          </Link>
        </div>
      </section>
    )
}