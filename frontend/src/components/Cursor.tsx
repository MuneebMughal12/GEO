"use client";

import { useEffect, useRef } from "react";

const TRAIL = 7;

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const trail = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.body.classList.add("has-cursor");

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const pts = Array.from({ length: TRAIL }, () => ({ ...pos }));
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest("a,button,[data-hover]");
      dot.current?.classList.toggle("scale-[2.4]", !!t);
      dot.current?.classList.toggle("opacity-60", !!t);
    };

    const loop = () => {
      let px = pos.x;
      let py = pos.y;
      pts.forEach((p, i) => {
        p.x += (px - p.x) * 0.32;
        p.y += (py - p.y) * 0.32;
        px = p.x;
        py = p.y;
        const el = trail.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%,-50%)`;
          el.style.opacity = String(0.5 - i * 0.06);
        }
      });
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trail.current[i] = el;
          }}
          className="absolute left-0 top-0 rounded-full bg-[#d2a24c]"
          style={{ width: 6 - i * 0.6, height: 6 - i * 0.6 }}
        />
      ))}
      <div
        ref={dot}
        className="absolute left-0 top-0 h-[7px] w-[7px] rounded-full bg-[#d2a24c] transition-[transform,opacity] duration-200"
      />
    </div>
  );
}
