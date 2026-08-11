"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { company } from "@/data/company";

export default function Preloader() {
  const pathname = usePathname();
  // Project detail pages open straight away — no loading screen.
  if (pathname.startsWith("/projects/")) return null;
  return <Loader />;
}

let hasPlayed = false;

function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(hasPlayed);

  useEffect(() => {
    if (hasPlayed) return;
    // Runs on first load and again on every route change (keyed by pathname).
    document.body.style.overflow = "hidden";
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 7 + 4.5;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => {
          hasPlayed = true;
          setDone(true);
          document.body.style.overflow = "";
          window.scrollTo(0, 0);
        }, 260);
      }
      setPct(Math.floor(v));
    }, 72);
    return () => {
      clearInterval(id);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-end bg-[#e6e6e6] px-6 pb-8 sm:px-10 sm:pb-12"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* growing hairline */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-px -translate-x-1/2 -translate-y-1/2 bg-[#3a3a3a]"
            initial={{ height: 0 }}
            animate={{ height: `${pct * 0.55}%` }}
            transition={{ ease: "linear", duration: 0.12 }}
          />

          {/* red particle arc */}
          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            {Array.from({ length: 14 }).map((_, i) => {
              const a = (i / 14) * Math.PI * 1.15 - 0.35;
              const on = pct > (i / 14) * 100;
              return (
                <circle
                  key={i}
                  cx={`${58 + Math.cos(a) * 14}%`}
                  cy={`${42 + Math.sin(a) * 22}%`}
                  r={on ? 3 : 1.4}
                  fill="#d2a24c"
                  opacity={on ? 0.9 : 0.25}
                  style={{ transition: "all .35s ease" }}
                />
              );
            })}
          </svg>

          <div className="relative">
            <div className="text-[22vw] font-bold leading-[0.8] tracking-tighter text-[#c4c4c4] sm:text-[16vw]">
              {pct}%
            </div>
            <div className="mt-3 text-xs text-[#6a6a6a]">Loading…</div>
            <div className="text-sm font-semibold text-[#1a1a1a]">
              {company.short} <span className="font-normal text-[#8a8a8a]">Profile</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
