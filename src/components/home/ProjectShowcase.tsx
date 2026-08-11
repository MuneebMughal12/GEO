"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { projects } from "@/data/projects";

const featured = projects.slice(0, 6);
const COUNT = featured.length;

export default function ProjectShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT)));
    setI((prev) => {
      if (idx !== prev) setDir(idx > prev ? 1 : -1);
      return idx;
    });
  });

  const p = featured[i];

  return (
    <section ref={ref} style={{ height: `${COUNT * 100}vh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* blurred backdrop of the current project */}
        {featured.map((f, idx) => (
          <motion.div
            key={f.slug + "-bg"}
            aria-hidden
            initial={false}
            animate={{ opacity: idx === i ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-0"
          >
            {/* heavily blurred — a tiny source is plenty */}
            <Image
              src={f.cover}
              alt=""
              fill
              loading="eager"
              quality={30}
              sizes="128px"
              className="scale-110 object-cover blur-3xl"
            />
          </motion.div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-[#0a0a0a]/86" />

        <div className="relative flex h-full flex-col justify-center px-5 pt-16 sm:px-8">
          <div className="mx-auto w-full max-w-[1500px]">
            <div className="grid gap-5 lg:grid-cols-[92px_1fr_300px] lg:gap-8">
              {/* ---- left rail: active thumbnail + counter ---- */}
              <div className="order-2 flex items-center gap-4 lg:order-1 lg:h-[54svh] lg:flex-col lg:items-stretch lg:justify-start lg:gap-0">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm border-2 border-[#d2a24c] lg:h-20 lg:w-full">
                  {featured.map((f, idx) => (
                    <motion.div
                      key={f.slug}
                      aria-hidden
                      initial={false}
                      animate={{ opacity: idx === i ? 1 : 0, y: idx === i ? 0 : dir * 20 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image src={f.cover} alt="" fill loading="eager" sizes="92px" className="object-cover" />
                    </motion.div>
                  ))}
                </div>

                {/* thin ticks — one per project, active one red */}
                <div className="flex flex-1 gap-1.5 lg:mt-4 lg:flex-col lg:gap-2">
                  {featured.map((f, idx) => (
                    <span
                      key={f.slug}
                      className={`block h-[2px] flex-1 transition-colors duration-300 lg:h-[2px] lg:w-full lg:flex-none ${
                        idx === i ? "bg-[#d2a24c]" : "bg-[#2a2a2a]"
                      }`}
                    />
                  ))}
                </div>

                <div className="shrink-0 lg:mt-auto lg:pt-8">
                  <p className="text-sm">
                    <span className="text-lg font-bold text-[#d2a24c]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#5a5a5a]">/{String(COUNT).padStart(2, "0")}</span>
                  </p>
                  <Link
                    href="/projects"
                    className="mt-1 hidden whitespace-nowrap border-b border-[#4a4a4a] pb-0.5 text-xs text-[#c4c4c4] transition-colors hover:border-[#d2a24c] hover:text-white lg:inline-block"
                  >
                    View All Projects
                  </Link>
                </div>
              </div>

              {/* ---- centre: big image ---- */}
              <div className="order-1 lg:order-2">
                <div className="relative h-[30svh] overflow-hidden rounded-sm bg-[#111] sm:h-[38svh] lg:h-[54svh]">
                  {/* every image stays mounted — we only cross-fade the active one */}
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={p.slug}
                      initial={{
                        opacity: 0.3,
                        scale: 1.09,
                        x: dir * 70,
                        clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
                      }}
                      animate={{ opacity: 1, scale: 1, x: 0, clipPath: "inset(0 0% 0 0%)" }}
                      exit={{
                        opacity: 0,
                        scale: 0.98,
                        x: dir * -45,
                        clipPath: dir > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
                      }}
                      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        loading="eager"
                        sizes="(max-width: 1024px) 100vw, 900px"
                        className="object-cover"
                      />
                      <motion.span
                        initial={{ x: dir > 0 ? "-120%" : "120%" }}
                        animate={{ x: dir > 0 ? "120%" : "-120%" }}
                        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#d2a24c]/30 to-transparent mix-blend-screen"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* ---- right: info panel ---- */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.slug + "-i"}
                  initial={{ opacity: 0, x: 28, y: 18 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -18, y: -12 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="order-3 space-y-3 lg:space-y-4"
                >
                  <div>
                    <p className="text-sm text-[#8a8a8a]">Worked For</p>
                    <p className="mt-1.5 text-sm font-semibold text-white">{p.client}</p>
                    <p className="text-sm text-[#d2a24c]">{p.year}</p>
                  </div>

                  <div className="h-px bg-[#2a2a2a]" />

                  <p className="line-clamp-4 text-sm leading-relaxed text-[#9a9a9a] lg:line-clamp-6">
                    {p.summary}
                  </p>

                  <div className="hidden h-px bg-[#2a2a2a] lg:block" />

                  <div className="hidden lg:block">
                    <p className="text-sm text-[#8a8a8a]">Location</p>
                    <p className="mt-1.5 text-sm text-[#c4c4c4]">{p.location}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[#1c1c1c] px-3 py-1 text-xs text-[#9a9a9a]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ---- big title under the image ---- */}
            <div className="mt-5 lg:ml-[124px]">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={p.slug + "-t"}
                  initial={{ opacity: 0, y: 38, clipPath: "inset(100% 0 0 0)" }}
                  animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                  exit={{ opacity: 0, y: -22, clipPath: "inset(0 0 100% 0)" }}
                  transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                  className="line-clamp-2 text-2xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-[3.2rem]"
                >
                  {p.title}
                </motion.h2>
              </AnimatePresence>

              <Link
                href="/projects"
                className="mt-4 inline-block border-b border-[#4a4a4a] pb-0.5 text-sm text-[#c4c4c4] transition-colors hover:border-[#d2a24c] hover:text-white lg:hidden"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
