import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProject } from "@/lib/projects";
import { ProjectDetail } from "@/components/project-details";
import { siteConfig } from "@/lib/site-config";


type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: `Project not found — ${siteConfig.author.name.toLocaleUpperCase()}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${project.title} — Case Study`;

  return {
    title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      siteName: "Calib Harrison",
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}