"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Typewriter from "../Typewriter";
import { company } from "@/data/company";

const capabilities = [
  "Soil Testing",
  "Architectural Designing",
  "Construction",
  "Real Estate Marketing",
  "Material Suppliers",
];

export default function Hero({ image = "/geo-arc/vision-flow-group-headquarters.webp" }: { image?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.82, 0]);
  const railX = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-24">
      {/* backdrop */}
      <motion.div
        style={{ y: backdropY, scale: backdropScale }}
        className="absolute -inset-[8%] will-change-transform"
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
        <div className="glow absolute inset-0" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[18, 34, 57, 76, 88].map((left, i) => (
          <motion.span
            key={left}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: [0, 0.9, 0.25], y: [18, 0, -34] }}
            transition={{ duration: 2.8 + i * 0.35, delay: 0.8 + i * 0.22, repeat: Infinity, repeatDelay: 1.4 }}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#d2a24c] shadow-[0_0_14px_#d2a24c]"
            style={{ left: `${left}%`, top: `${28 + (i % 3) * 18}%` }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1400px] flex-col justify-between px-5 pb-10 will-change-transform sm:px-8"
      >
        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.35fr_1fr]">
          {/* headline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="eyebrow"
            >
              {company.tagline} · Islamabad, Pakistan
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="display mt-4 text-[13vw] leading-[0.88] sm:text-[9vw] lg:text-[6.4vw]"
            >
              <span className="lead">We investigate</span>
              <span className="lead">design &amp; build</span>
              <span className="hot">
                <Typewriter
                  words={["FOUNDATIONS", "SPACES", "FUTURES"]}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-7 max-w-lg text-sm leading-relaxed text-[#b4b4b4] sm:text-base"
            >
              {company.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/projects"
                className="rounded-full bg-[#d2a24c] px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-85"
              >
                View our projects
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#2e2e2e] px-6 py-3 text-sm text-[#d4d4d4] transition-colors hover:border-white hover:text-white"
              >
                Request a quote
              </Link>
            </motion.div>
          </div>

          {/* capability list */}
          <motion.div
            style={{ x: railX }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="lg:justify-self-end"
          >
            <p className="eyebrow">What we do</p>
            <ul className="mt-4 space-y-1.5">
              {capabilities.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.06 }}
                  className="text-sm text-[#9a9a9a] transition-colors hover:text-white sm:text-base"
                >
                  {c}
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 h-px w-full max-w-xs bg-gradient-to-r from-[#d2a24c] to-transparent" />

            <p className="mt-5 text-xs text-[#6a6a6a]">Integrated divisions</p>
            <p className="mt-1 text-sm text-[#d4d4d4]">GEO ARC · Architecture</p>
            <p className="mt-1 text-sm text-[#d4d4d4]">GEO Soil Testing · Laboratory</p>
            <p className="mt-1 text-sm text-[#d4d4d4]">GEO Construction · Civil</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-3 text-xs text-[#6a6a6a]"
        >
          <span className="h-8 w-px bg-gradient-to-b from-transparent to-[#d2a24c]" />
          Scroll down
        </motion.div>
      </motion.div>
    </section>
  );
}
