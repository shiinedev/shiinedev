import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Markdown } from "@/components/layout/markdown";
import { siteConfig } from "@/lib/site-config";
import { getPost, getPosts } from "@/lib/blog-content";


type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: `Article not found — ${siteConfig.author.name}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${post.title} — ${siteConfig.author.name}`;
  const url = `/blog/${post.slug}`;

  return {
    title,
    description: post.excerpt,
    authors: [{ name: siteConfig.author.name }],
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.excerpt,
      type: "article",
      url,
      siteName: "${siteConfig.author.name}",
      authors: [siteConfig.author.name],
      publishedTime: post.isoDate,
      section: post.category,
    },
    twitter: {
      title,
      description: post.excerpt,
      card: "summary_large_image",
    },
    other: {
      "article:author": siteConfig.author.name,
      "article:published_time": post.isoDate,
      "article:section": post.category,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPost(slug), getPosts()]);

  if (!post) notFound();

  const others = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    articleSection: post.category,
    author: { "@type": "Person", name: siteConfig.author.name },
    mainEntityOfPage: `/blog/${post.slug}`,
  };

  return (
    
      <>
       

        <article className="surface-card px-6 py-10 sm:px-12 sm:py-14">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to blog
          </Link>

          <p className="mt-8 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{siteConfig.author.name}</span> •{" "}
            {post.date} • {post.readTime} • {post.category}
          </p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-xl border-b border-border pb-8 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-4">
            <Markdown>{post.content}</Markdown>
          </div>
        </article>

        {others.length > 0 && (
          <section className="px-2 py-6 sm:px-4">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              More writing
            </h2>
            <div className="mt-4 divide-y divide-border">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group flex flex-col gap-1 py-5"
                >
                  <p className="text-xs text-muted-foreground">
                    {item.category} • {item.readTime}
                  </p>
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-foreground">
                    {item.title}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

    </>
  );
}