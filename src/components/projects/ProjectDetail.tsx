"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import type { Project } from "@/lib/models";
import ProgressTracker from "./ProgressTracker";

export default function ProjectDetail({
  project,
  prev,
  next,
  backHref,
  backLabel,
  origin,
}: {
  project: Project;
  prev: Project;
  next: Project;
  backHref: string;
  backLabel: string;
  origin: string;
}) {
  const gallery = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const shots = project.images.length;

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(shots - 1, Math.max(0, Math.floor(v * shots)));
    setActive((prevIdx) => {
      if (idx !== prevIdx) setDir(idx > prevIdx ? 1 : -1);
      return idx;
    });
  });

  return (
    <div className="relative">
      {/* blurred backdrop follows the active image */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {project.images.map((src, idx) => (
          <motion.div
            key={src + idx + "-bg"}
            aria-hidden
            initial={false}
            animate={{ opacity: idx === active ? 1 : 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0"
          >
            {/* heavily blurred — a tiny source is plenty */}
            <Image
              src={src}
              alt=""
              fill
              loading="eager"
              quality={30}
              sizes="128px"
              className="scale-110 object-cover blur-3xl"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
      </div>

      {/* ---------- scroll-driven gallery ---------- */}
      <section ref={gallery} style={{ height: `${shots * 100}vh` }} className="relative">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center px-5 pt-20 sm:px-8">
          <div className="mx-auto w-full max-w-[1500px]">
            <Link
              href={backHref}
              className="fixed left-5 top-[4.75rem] z-[510] inline-flex items-center gap-2 rounded-full border border-[#3a3a3a] bg-[#0a0a0a]/90 px-4 py-2 text-xs text-[#f0f0f0] shadow-lg shadow-black/40 backdrop-blur-md transition-colors hover:border-white sm:hidden"
            >
              <span aria-hidden>‹</span> {backLabel}
            </Link>
            <div aria-hidden className="mb-5 h-10 sm:hidden" />
            <Link
              href={backHref}
              className="mb-5 hidden items-center gap-2 rounded-full border border-[#3a3a3a] bg-[#0a0a0a]/50 px-5 py-2.5 text-sm text-[#d4d4d4] backdrop-blur transition-colors hover:border-white hover:text-white sm:inline-flex"
            >
              <span aria-hidden>‹</span> {backLabel}
            </Link>

            <div className="grid gap-5 lg:grid-cols-[92px_1fr_300px] lg:gap-8">
              {/* left rail */}
              <div className="order-2 flex items-center gap-4 lg:order-1 lg:flex-col lg:items-stretch lg:justify-start lg:gap-0">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm border-2 border-[#d2a24c] lg:h-20 lg:w-full">
                  {project.images.map((src, idx) => (
                    <motion.div
                      key={src + idx + "-th"}
                      aria-hidden
                      initial={false}
                      animate={{ opacity: idx === active ? 1 : 0, y: idx === active ? 0 : dir * 20 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image src={src} alt="" fill loading="eager" sizes="92px" className="object-cover" />
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-1 gap-1.5 lg:mt-4 lg:flex-col lg:gap-2">
                  {project.images.map((s, idx) => (
                    <span
                      key={s + idx}
                      className={`block h-[2px] flex-1 transition-colors duration-300 lg:w-full lg:flex-none ${
                        idx === active ? "bg-[#d2a24c]" : "bg-[#2a2a2a]"
                      }`}
                    />
                  ))}
                </div>

                <p className="shrink-0 text-sm lg:mt-6">
                  <span className="text-lg font-bold text-[#d2a24c]">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#5a5a5a]">/{String(shots).padStart(2, "0")}</span>
                </p>
              </div>

              {/* centre image */}
              <div className="order-1 lg:order-2">
                <div className="relative h-[30svh] overflow-hidden rounded-sm bg-[#111] sm:h-[38svh] lg:h-[54svh]">
                  {project.images.map((src, idx) => (
                    <motion.div
                      key={src + idx}
                      aria-hidden={idx !== active}
                      initial={false}
                      animate={{
                        opacity: idx === active ? 1 : 0,
                        scale: idx === active ? 1 : 1.06,
                        x: idx === active ? 0 : dir * 36,
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={src}
                        alt={idx === active ? project.title : ""}
                        fill
                        loading="eager"
                        sizes="(max-width: 1024px) 100vw, 900px"
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* right info */}
              <aside className="order-3 space-y-3 lg:space-y-4">
                <div>
                  <p className="text-sm text-[#8a8a8a]">Worked For</p>
                  <p className="mt-1.5 text-sm font-semibold text-white">{project.client}</p>
                  <p className="text-sm text-[#d2a24c]">{project.year}</p>
                </div>

                {(project.projectCode || project.plotSize) && (
                  <div className="grid grid-cols-2 gap-4">
                    {project.projectCode && <div><p className="text-sm text-[#8a8a8a]">Project Code</p><p className="mt-1 text-sm text-[#c4c4c4]">{project.projectCode}</p></div>}
                    {project.plotSize && <div><p className="text-sm text-[#8a8a8a]">Plot Size</p><p className="mt-1 text-sm text-[#c4c4c4]">{project.plotSize}</p></div>}
                  </div>
                )}

                {project.contractor && (
                  <div>
                    <p className="text-sm text-[#8a8a8a]">Main Contractor</p>
                    <p className="mt-1.5 text-sm text-[#c4c4c4]">{project.contractor}</p>
                  </div>
                )}

                <div className="h-px bg-[#2a2a2a]" />
                <p className="line-clamp-4 text-sm leading-relaxed text-[#9a9a9a] lg:line-clamp-6">
                  {project.summary}
                </p>

                <div className="hidden h-px bg-[#2a2a2a] lg:block" />

                <div className="hidden lg:block">
                  <p className="text-sm text-[#8a8a8a]">Location</p>
                  <p className="mt-1.5 text-sm text-[#c4c4c4]">{project.location}</p>
                </div>

                {project.period && (
                  <div className="hidden lg:block">
                    <p className="text-sm text-[#8a8a8a]">Duration</p>
                    <p className="mt-1.5 text-sm text-[#c4c4c4]">{project.period}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[#1c1c1c] px-3 py-1 text-xs text-[#9a9a9a]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </aside>
            </div>

            {/* prev / next pills + big title */}
            <div className="mt-5 grid gap-4 lg:grid-cols-[92px_1fr] lg:gap-8">
              <div className="flex gap-2 lg:flex-col">
                <Link
                  href={`/projects/${prev.slug}?from=${origin}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#3a3a3a] bg-[#0a0a0a]/50 px-4 py-2 text-xs text-[#d4d4d4] backdrop-blur transition-colors hover:border-[#d2a24c] hover:bg-[#d2a24c] hover:text-[#0a0a0a]"
                >
                  <span aria-hidden>‹</span> Previous
                </Link>
                <Link
                  href={`/projects/${next.slug}?from=${origin}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#3a3a3a] bg-[#0a0a0a]/50 px-4 py-2 text-xs text-[#d4d4d4] backdrop-blur transition-colors hover:border-[#d2a24c] hover:bg-[#d2a24c] hover:text-[#0a0a0a]"
                >
                  Next <span aria-hidden>›</span>
                </Link>
              </div>

              <h1 className="line-clamp-2 text-2xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-[3.2rem]">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- scope ---------- */}
      <section className="relative bg-[#0a0a0a] pb-24 pt-20">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <div className="grid gap-10 border-t border-[#1f1f1f] pt-14 lg:grid-cols-[1fr_300px] lg:gap-16">
            <div>
              <p className="eyebrow">Scope of work</p>
              <ul className="mt-5 space-y-3">
                {project.scope.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3 text-sm leading-relaxed text-[#b4b4b4] sm:text-base"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#d2a24c]" />
                    {s}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <div>
                <p className="eyebrow">Category</p>
                <p className="mt-1.5 text-sm text-[#c4c4c4]">{project.category}</p>
              </div>
              <div>
                <p className="eyebrow">Division</p>
                <p className="mt-1.5 text-sm capitalize text-[#c4c4c4]">{project.division.replaceAll("-", " ")}</p>
              </div>
              <div>
                <p className="eyebrow">Location</p>
                <p className="mt-1.5 text-sm text-[#c4c4c4]">{project.location}</p>
              </div>
              <Link
                href="/contact"
                className="inline-block rounded-full bg-[#d2a24c] px-5 py-2.5 text-sm text-[#0a0a0a] transition-opacity hover:opacity-85"
              >
                Discuss a similar project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* live progress tracker for ongoing projects */}
      {project.status === "ongoing" && project.phases.length > 0 && (
        <ProgressTracker phases={project.phases} />
      )}
    </div>
  );
}
