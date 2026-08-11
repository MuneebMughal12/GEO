"use client";

import { motion } from "motion/react";
import { clients } from "@/data/company";

const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

export default function HexGrid() {
  const cells = [...clients, "Your area next"];

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="grid grid-cols-3 gap-x-2 gap-y-2">
        {cells.map((name, i) => {
          const isLast = i === cells.length - 1;
          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
              className={`group relative ${i % 2 === 1 ? "translate-y-[34%]" : ""}`}
            >
              <div
                data-hover
                style={{ clipPath: HEX }}
                className={`flex aspect-square items-center justify-center px-2 text-center transition-colors duration-300 ${
                  isLast
                    ? "bg-[#1a0e0c] text-[#d2a24c]"
                    : "bg-[#161616] text-[#c9c9c9] group-hover:bg-white group-hover:text-[#0a0a0a]"
                }`}
              >
                <span className="text-[11px] font-medium leading-tight sm:text-xs">{name}</span>
              </div>
              {/* red glow on hover */}
              <div
                aria-hidden
                style={{ clipPath: HEX }}
                className="pointer-events-none absolute inset-0 -z-10 scale-110 bg-[#d2a24c] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
