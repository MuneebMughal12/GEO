import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { getProjects } from "@/lib/projects-repo";

// Revalidate so admin changes appear without a redeploy.
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: { images: project.cover ? [project.cover] : [] },
  };
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { slug } = await params;
  const { from } = await searchParams;
  const projects = await getProjects();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();

  const project = projects[i];
  const divisionProjects = projects.filter((item) => item.division === project.division);
  const divisionIndex = divisionProjects.findIndex((item) => item.slug === slug);
  const prev = divisionProjects[(divisionIndex - 1 + divisionProjects.length) % divisionProjects.length];
  const next = divisionProjects[(divisionIndex + 1) % divisionProjects.length];

  const origins: Record<string, { href: string; label: string }> = {
    home: { href: "/", label: "Back to Home" },
    projects: { href: "/projects", label: "Back to Projects" },
    "geo-arc": { href: "/geo-arc", label: "Back to GEO ARC" },
    "geo-soil-testing": { href: "/geo-soil-testing", label: "Back to Soil Testing" },
    "geo-construction": { href: "/geo-construction", label: "Back to Construction" },
  };
  const origin = from && origins[from] ? from : "projects";
  const back = origins[origin];

  return <ProjectDetail project={project} prev={prev} next={next} backHref={back.href} backLabel={back.label} origin={origin} />;
}
