import type { Metadata } from "next";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { getProjects } from "@/lib/projects-repo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore architecture and engineering work by GEO Group of Companies across Islamabad, Rawalpindi and Pakistan.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <section className="relative pb-28 pt-32 sm:pt-40">
      <div className="glow pointer-events-none absolute inset-x-0 top-0 h-[60vh]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="eyebrow">Portfolio</p>
        <h1 className="display mt-5 text-[13vw] leading-[0.9] sm:text-[8vw] lg:text-[5.2vw]">
          <span className="lead">Our</span>
          <span>
            recent <span className="hot">projects</span>
          </span>
          <span>Architecture &amp; Engineering</span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#9a9a9a] sm:text-lg">
          A growing record of residential, commercial and institutional work delivered
          through GEO ARC, GEO Soil Testing and GEO Construction.
        </p>

        <div className="mt-16">
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
