"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Phase, computeProgress } from "@/lib/models";

export default function ProgressTracker({ phases }: { phases: Phase[] }) {
  const progress = computeProgress(phases);

  return (
    <section className="relative bg-[#0a0a0a] py-16 sm:py-20">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Live construction status</p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Track the progress</h2>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-[#d2a24c] sm:text-5xl">{progress}%</p>
            <p className="text-xs text-[#8a8a8a]">complete</p>
          </div>
        </div>

        {/* overall bar */}
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#161616]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-[#8a6224] via-[#d2a24c] to-[#f0dca6]"
          />
        </div>

        {/* phase timeline */}
        <div className="mt-12 space-y-4">
          {phases.map((phase, i) => {
            const done = phase.status === "done";
            const active = phase.status === "active";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                className={`rounded-sm border p-5 ${
                  active ? "border-[#d2a24c] bg-[#120e05]" : "border-[#1f1f1f] bg-[#0c0c0c]"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* status dot */}
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      done
                        ? "bg-[#d2a24c] text-[#0a0a0a]"
                        : active
                          ? "border-2 border-[#d2a24c] text-[#d2a24c]"
                          : "border border-[#2e2e2e] text-[#5a5a5a]"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className={`font-medium ${done || active ? "text-white" : "text-[#7a7a7a]"}`}>
                        {phase.name}
                      </p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] ${
                          done
                            ? "bg-[#161206] text-[#e8ce93]"
                            : active
                              ? "bg-[#d2a24c] text-[#0a0a0a]"
                              : "bg-[#161616] text-[#6a6a6a]"
                        }`}
                      >
                        {done ? "Completed" : active ? `In progress · ${phase.percent}%` : "Upcoming"}
                      </span>
                    </div>
                    {phase.note && <p className="mt-1 text-sm text-[#8a8a8a]">{phase.note}</p>}
                    {phase.completedAt && done && (
                      <p className="mt-1 text-xs text-[#5a5a5a]">Completed {phase.completedAt}</p>
                    )}
                  </div>
                </div>

                {/* active phase mini-bar */}
                {active && (
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#161616]">
                    <div className="h-full rounded-full bg-[#d2a24c]" style={{ width: `${phase.percent}%` }} />
                  </div>
                )}

                {/* phase photos */}
                {phase.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {phase.images.map((src, j) => (
                      <div key={j} className="relative aspect-[4/3] overflow-hidden rounded-sm">
                        <Image src={src} alt={`${phase.name} photo`} fill sizes="200px" className="object-cover" unoptimized />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
