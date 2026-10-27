"use server"
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/blog-content";
import { siteConfig } from "@/lib/site-config";



export const generateMetada = async() :Promise<Metadata> => {
  return {
  title: `Blog — Notes on Building Real world project | ${siteConfig.author.name}`,
  description:`Essays and field notes on Building Real world projects, design systems, conversion, and research from  ${siteConfig.author.name}.`,
  openGraph: {
    title: "Blog — Notes on Building Real world projects",
    description:
      "Essays and field notes on Building Real world projects, design systems, conversion, and research.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
}
};

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (

      <>

        <section className="surface-card px-6 py-10 sm:px-12 sm:py-14">
          <p className="text-sm text-muted-foreground">Writing</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Notes on Building real projects, strategy and building products people keep using.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Practical lessons from client work — what moved the numbers, what
            didn&apos;t, and the thinking behind it.
          </p>

          {featured ? (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-10 block border-t border-border pt-8"
            >
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{siteConfig.author.name}</span> •{" "}
                {featured.date} • {featured.readTime} • {featured.category}
              </p>
              <h2 className="mt-2 flex max-w-2xl items-center gap-1.5 text-xl font-semibold tracking-tight text-foreground">
                {featured.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
            </Link>
          ) : (
            <p className="mt-8 border-t border-border pt-8 text-sm text-muted-foreground">
              No articles have been published yet.
            </p>
          )}
        </section>

        {rest.length > 0 && (
          <section className="px-2 py-6 sm:px-4">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              All articles
            </h2>
            <div className="mt-6 divide-y divide-border">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-1 py-6"
                >
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{siteConfig.author.name}</span>{" "}
                    • {post.date} • {post.readTime} • {post.category}
                  </p>
                  <h3 className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground">
                    {post.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="surface-card bg-muted px-6 py-10 sm:px-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Have a project in mind?
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            I&apos;m always open to new opportunities, collaborations, and
            creative conversations.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </section>
      </>
    
  );
}