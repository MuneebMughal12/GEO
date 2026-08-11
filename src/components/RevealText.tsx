"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

/**
 * Scroll-linked word reveal — words fade from dim to bright as the block
 * travels through the viewport.
 */
export default function RevealText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = children.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative mr-[0.25em]">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
