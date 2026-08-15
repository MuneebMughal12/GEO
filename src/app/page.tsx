import Hero from "@/components/home/Hero";
import AboutBlock from "@/components/home/AboutBlock";
import DiagonalMarquee from "@/components/home/DiagonalMarquee";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import Testimonials from "@/components/home/Testimonials";
import PinnedProjects from "@/components/home/PinnedProjects";
import DivisionOverview from "@/components/home/DivisionOverview";
import { getSiteSettings } from "@/lib/site-settings-repo";
import { getProjects } from "@/lib/projects-repo";
import type { Division } from "@/lib/models";
import { getTeamMembers } from "@/lib/team-repo";
import DivisionTeams from "@/components/DivisionTeams";
import { getApprovedTestimonials } from "@/lib/testimonials-repo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, projects, team, testimonials] = await Promise.all([getSiteSettings(), getProjects(), getTeamMembers(), getApprovedTestimonials()]);
  const divisionOrder: Division[] = ["geo-arc", "geo-soil-testing", "geo-construction"];
  const showcaseProjects = divisionOrder.flatMap((division) => projects.filter((project) => project.division === division).slice(0, 2));
  return (
    <>
      <Hero image={settings.heroImage} />
      <AboutBlock />
      <DiagonalMarquee />
      <ServicesGrid />
      <DivisionOverview projects={projects} />
      <ProjectShowcase projects={showcaseProjects} />
      <Testimonials testimonials={testimonials} />
      <PinnedProjects />
      <DivisionTeams team={team} compact />
    </>
  );
}
