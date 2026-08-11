import Hero from "@/components/home/Hero";
import AboutBlock from "@/components/home/AboutBlock";
import DiagonalMarquee from "@/components/home/DiagonalMarquee";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import Testimonials from "@/components/home/Testimonials";
import PinnedProjects from "@/components/home/PinnedProjects";
import { getSiteSettings } from "@/lib/site-settings-repo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await getSiteSettings();
  return (
    <>
      <Hero image={settings.heroImage} />
      <AboutBlock />
      <DiagonalMarquee />
      <ServicesGrid />
      <ProjectShowcase />
      <Testimonials />
      <PinnedProjects />
    </>
  );
}
