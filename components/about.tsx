import { siteConfig } from "@/lib/site-config"
import { Mail } from "lucide-react"

export const About = () =>{
    const {stats,author} = siteConfig
    return(
        <section id="about" className="surface-card px-6 py-10 sm:px-12">
        <p className="text-sm text-muted-foreground">About my self.</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">
           {author.about.title}
          </span>{" "}
         {author.about.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground">
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" /> {author.email}
          </span>
          <span className="text-muted-foreground">•</span>
          {/* <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" /> +(123) 254 587 00
          </span> */}
          {/* <span className="text-muted-foreground">•</span>
          <a href="#" className="flex items-center gap-2 hover:opacity-60">
            <Download className="h-4 w-4 text-muted-foreground" /> Download CV
          </a> */}
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-2xl font-semibold tracking-tight text-foreground">{s.value}</dt>
              <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>
    )
}