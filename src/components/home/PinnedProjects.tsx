import Image from "next/image";
import Link from "next/link";
import { getPinnedProjects } from "@/lib/projects-repo";

export default async function PinnedProjects() {
  const projects = await getPinnedProjects(6);
  if (!projects.length) return null;

  return (
    <section className="border-t border-[#1f1f1f] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="eyebrow">Pinned from admin</p>
        <div className="mt-4 flex items-end justify-between gap-6">
          <h2 className="display text-[10vw] leading-[0.9] sm:text-[6vw] lg:text-[4vw]">
            <span className="lead">Featured</span>
            <span className="hot">projects</span>
          </h2>
          <Link href="/projects" className="hidden border-b border-[#4a4a4a] pb-1 text-sm text-[#c4c4c4] hover:border-[#d2a24c] sm:block">View all</Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group relative block overflow-hidden rounded-sm bg-[#111]">
              <div className="relative aspect-[4/3]">
                <Image src={project.cover} alt={project.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />
                <span className="absolute inset-0 border-2 border-transparent transition-colors group-hover:border-[#d2a24c]" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs text-[#d2a24c]">{project.projectCode ?? project.category}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-1 text-xs text-[#9a9a9a]">{project.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
