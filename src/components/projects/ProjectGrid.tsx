"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, type Category, type Project } from "@/lib/models";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const categories = CATEGORIES;
  const [filter, setFilter] = useState<Category | "All">("All");
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const wrap = useRef<HTMLDivElement>(null);

  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const onMove = (e: React.MouseEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <>
      {/* filters */}
      <div className="mb-10 flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              filter === c
                ? "border-[#d2a24c] bg-[#d2a24c] text-[#0a0a0a]"
                : "border-[#242424] text-[#8a8a8a] hover:border-[#4a4a4a] hover:text-white"
            }`}
          >
            {c}
            <span className="ml-2 text-xs opacity-60">
              {c === "All" ? projects.length : projects.filter((p) => p.category === c).length}
            </span>
          </button>
        ))}
      </div>

      <div ref={wrap} onMouseMove={onMove} className="relative">
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
              >
                <Link
                  href={`/projects/${p.slug}?from=projects`}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className="group relative block overflow-hidden rounded-sm"
                >
                  <div className="relative aspect-[4/3] bg-[#111]">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />
                    <span className="pointer-events-none absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-[#d2a24c]" />
                  </div>

                  {p.status === "ongoing" && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#d2a24c] px-2.5 py-1 text-[11px] font-medium text-[#0a0a0a]">
                      ● Live · Ongoing
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs text-[#d2a24c]">{p.category}</p>
                    <h3 className="mt-1 text-base font-semibold leading-tight text-white sm:text-lg">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#8a8a8a]">
                      {p.client} · {p.year}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* cursor-following tooltip */}
        <AnimatePresence>
          {hover !== null && list[hover] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              style={{ left: pos.x + 18, top: pos.y + 18 }}
              className="pointer-events-none absolute z-30 hidden max-w-[240px] rounded-sm bg-[#141414] px-4 py-3 shadow-xl shadow-black/50 lg:block"
            >
              <p className="text-sm font-medium text-white">{list[hover].title}</p>
              <p className="mt-0.5 text-xs text-[#8a8a8a]">{list[hover].location}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
