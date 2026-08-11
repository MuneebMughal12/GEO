"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { company } from "@/data/company";
import Marquee from "./Marquee";
import RevealText from "./RevealText";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [90, -18]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const wa = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    company.whatsappMessage
  )}`;

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={ref} className="relative min-h-[100svh] overflow-hidden border-t border-[#161616] bg-[#0a0a0a]">
      <div className="glow pointer-events-none absolute inset-0" />

      {/* ethos line, centred */}
      <div className="relative mx-auto max-w-4xl px-5 pt-24 text-center sm:px-8 sm:pt-28">
        <RevealText className="justify-center text-base leading-relaxed text-[#c4c4c4] sm:text-lg">
          {company.values}
        </RevealText>
      </div>

      {/* ghosted email marquee */}
      <div className="pointer-events-none absolute inset-x-0 top-[46%] -translate-y-1/2 select-none">
        <Marquee speed={44}>
          <span className="px-6 text-[9vw] font-bold leading-none tracking-tight text-[#2a2a2a]">
            {company.email.split("@")[0]}
            <span className="text-[#d2a24c]/70">@</span>
            {company.email.split("@")[1]}
          </span>
          <span className="px-6 text-[9vw] font-bold leading-none text-[#1f1f1f]">·</span>
        </Marquee>
      </div>

      {/* centred image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        style={{ y: imageY, scale: imageScale }}
        className="relative mx-auto mt-12 h-[38svh] w-full max-w-2xl will-change-transform sm:mt-16"
      >
        <Image
          src="/geo-arc/vision-flow-group-headquarters.webp"
          alt="GEO Group architecture project"
          fill
          sizes="(max-width: 768px) 100vw, 42rem"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </motion.div>

      {/* bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto -mt-10 grid max-w-[1500px] gap-10 px-5 pb-8 sm:px-8 md:grid-cols-[1fr_auto_1fr] md:items-end"
      >
        <div>
          <p className="text-sm font-semibold text-white">Got a project in mind?</p>
          <p className="mt-2 max-w-xs text-2xl leading-tight text-[#8a8a8a] sm:text-3xl">
            Let&rsquo;s build it <br />
            together.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-full bg-[#d2a24c] px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-85"
          >
            Start a conversation
          </Link>
        </div>

        <button
          onClick={toTop}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#3a3a3a] px-6 py-3 text-sm text-[#d4d4d4] transition-colors hover:border-[#d2a24c] hover:bg-[#d2a24c] hover:text-[#0a0a0a]"
        >
          <span aria-hidden>↑</span> Back to top
        </button>

        <div className="grid grid-cols-2 gap-8 md:justify-items-end">
          <div>
            <p className="text-sm text-[#d2a24c]">Offices</p>
            <ul className="mt-3 space-y-1 text-sm text-[#8a8a8a]">
              {company.offices[0].lines.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-sm text-[#d2a24c]">Contact</p>
            <ul className="mt-3 space-y-1 text-sm text-[#8a8a8a]">
              <li>
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-white">
                  Email
                </a>
              </li>
              <li>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.offices[0].phones[0]}`}
                  className="transition-colors hover:text-white"
                >
                  {company.offices[0].phones[0]}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="relative mx-auto flex max-w-[1500px] flex-col gap-2 border-t border-[#161616] px-5 py-5 text-xs text-[#4a4a4a] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {company.legalName}
        </p>
        <p>Soil Testing · Designing · Construction · Real Estate · Material Supply</p>
      </div>
    </footer>
  );
}
