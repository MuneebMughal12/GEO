"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { services } from "@/data/services";

export default function ServicesGrid() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headingX = useTransform(scrollYProgress, [0, 0.5, 1], [-28, 0, 24]);
  const progressScale = useTransform(scrollYProgress, [0.08, 0.88], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="eyebrow">Capabilities</p>
        <motion.h2 style={{ x: headingX }} className="display mt-5 text-[11vw] leading-[0.9] will-change-transform sm:text-[7vw] lg:text-[4.6vw]">
          <span className="lead">What we</span>
          <span>deliver on</span>
          <span className="hot">site</span>
        </motion.h2>

        <div className="mt-10 h-px bg-[#1f1f1f]">
          <motion.div style={{ scaleX: progressScale }} className="h-full origin-left bg-[#d2a24c]" />
        </div>

        <div className="mt-4 grid gap-px overflow-hidden rounded-sm bg-[#1f1f1f] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 64, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.72, delay: (i % 4) * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/services#${s.slug}`}
                className="group relative flex h-full flex-col bg-[#0a0a0a] p-6 transition-colors duration-300 hover:bg-[#120c0b] sm:p-7"
              >
                <span className="absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-[#d2a24c]" />
                <span className="text-xs text-[#4a4a4a]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#8a8a8a]">
                  {s.blurb}
                </p>
                <span className="mt-5 text-sm text-[#d2a24c] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
