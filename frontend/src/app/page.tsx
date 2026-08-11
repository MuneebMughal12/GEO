import Hero from "@/components/home/Hero";
import AboutBlock from "@/components/home/AboutBlock";
import DiagonalMarquee from "@/components/home/DiagonalMarquee";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import Testimonials from "@/components/home/Testimonials";
import PinnedProjects from "@/components/home/PinnedProjects";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutBlock />
      <DiagonalMarquee />
      <ServicesGrid />
      <ProjectShowcase />
      <Testimonials />
      <PinnedProjects />
    </>
  );
}
