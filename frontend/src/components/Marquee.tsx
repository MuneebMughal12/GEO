"use client";

import { ReactNode } from "react";

export default function Marquee({
  children,
  speed = 30,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center whitespace-nowrap will-change-transform"
          style={{
            animation: `ue-marquee ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
      <style jsx global>{`
        @keyframes ue-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
