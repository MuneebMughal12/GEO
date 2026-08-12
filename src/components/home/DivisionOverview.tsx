import Image from "next/image";
import Link from "next/link";
import { divisions } from "@/data/divisions";
import type { Project } from "@/lib/models";

export default function DivisionOverview({ projects }: { projects: Project[] }) {
  return (
    <section className="border-y border-[#1f1f1f] bg-[#0d0d0d] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="eyebrow">One group · Three specialist divisions</p>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display text-[11vw] leading-[0.9] sm:text-[7vw] lg:text-[4.5vw]">
            <span className="lead">Complete</span>
            <span className="hot">capability</span>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[#9a9a9a] sm:text-base">Architecture, geotechnical investigation and construction delivery—presented together with real portfolio work from every GEO division.</p>
        </div>

        <div className="mt-14 space-y-16">
          {divisions.map((division) => {
            const divisionProjects = projects.filter((project) => project.division === division.slug).slice(0, 3);
            return (
              <article key={division.slug} className="grid gap-7 border-t border-[#2a2a2a] pt-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#d2a24c]">Division {division.number} · {division.eyebrow}</p>
                  <h3 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{division.name}</h3>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#9a9a9a] sm:text-base">{division.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {division.services.slice(0, 4).map((service) => <span key={service} className="rounded-full border border-[#303030] px-3 py-1.5 text-xs text-[#b5b5b5]">{service}</span>)}
                  </div>
                  <Link href={`/${division.slug}`} className="mt-7 inline-flex border-b border-[#d2a24c] pb-1 text-sm text-white">Explore division</Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {divisionProjects.map((project) => (
                    <Link key={project.slug} href={`/projects/${project.slug}?from=home`} className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#171717]">
                        <Image src={project.cover} alt={project.title} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <p className="line-clamp-2 text-sm font-semibold text-white">{project.title}</p>
                          <p className="mt-1 text-[11px] text-[#c2c2c2]">{project.location}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
