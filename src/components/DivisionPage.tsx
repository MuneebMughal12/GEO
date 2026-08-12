import Image from "next/image";
import Link from "next/link";
import { divisions } from "@/data/divisions";
import { getProjectsByDivision } from "@/lib/projects-repo";
import type { Division } from "@/lib/models";

export default async function DivisionPage({ division }: { division: Division }) {
  const details = divisions.find((item) => item.slug === division);
  if (!details) return null;

  const projects = await getProjectsByDivision(division);

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <div className="glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <p className="eyebrow">Division {details.number} &middot; {details.eyebrow}</p>
          <h1 className="display mt-5 text-[13vw] leading-[0.9] sm:text-[8vw] lg:text-[5.2vw]">
            <span className="lead">GEO Group</span>
            <span className="hot">{details.name}</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-[#9a9a9a] sm:text-lg">
            {details.description}
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm bg-[#1f1f1f] sm:grid-cols-2 lg:grid-cols-4">
            {details.facts.map((fact) => (
              <div key={fact.label} className="bg-[#0a0a0a]/95 p-5 sm:p-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#6f6f6f]">{fact.label}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-white">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {details.leader && (
        <section className="border-t border-[#1f1f1f] py-14 sm:py-16">
          <div className="mx-auto grid max-w-[1400px] gap-6 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="eyebrow">Division leadership</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{details.leader.name}</h2>
              <p className="mt-2 text-sm font-medium text-[#d2a24c]">{details.leader.role}</p>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-[#9a9a9a] sm:text-base">{details.leader.bio}</p>
          </div>
        </section>
      )}

      <section className="border-y border-[#1f1f1f] py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <p className="eyebrow">Capabilities</p>
          <div className="mt-8 grid gap-px overflow-hidden bg-[#1f1f1f] sm:grid-cols-2 lg:grid-cols-3">
            {details.services.map((service, index) => (
              <div key={service} className="bg-[#0a0a0a] p-6 sm:p-8">
                <span className="text-xs text-[#d2a24c]">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-lg font-semibold text-white">{service}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">{details.name} projects</h2>
            </div>
            {projects.length > 0 && <p className="text-sm text-[#8a8a8a]">{projects.length} projects</p>}
          </div>

          {projects.length ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#111]">
                    <Image src={project.cover} alt={project.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    {project.pinned && <span className="absolute left-3 top-3 rounded-full bg-[#d2a24c] px-3 py-1 text-[11px] font-medium text-[#0a0a0a]">Featured</span>}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-xs text-[#d2a24c]">{project.projectCode ?? project.category}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{project.title}</h3>
                      <p className="mt-1 text-xs text-[#9a9a9a]">{project.plotSize ? `${project.plotSize} · ` : ""}{project.location}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-10 border border-[#242424] bg-[#0f0f0f] p-8 sm:p-12">
              <p className="text-lg text-white">Projects are ready to be added.</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#8a8a8a]">
                New work published from the admin panel will appear here automatically under this division.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
