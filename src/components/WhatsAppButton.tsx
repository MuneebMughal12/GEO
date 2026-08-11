"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { company } from "@/data/company";

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const href = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    company.whatsappMessage
  )}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group fixed bottom-5 right-5 z-[400] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/40 sm:bottom-7 sm:right-7"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
          <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.548 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.585 0 11.946-5.359 11.949-11.945a11.87 11.87 0 00-3.421-8.4" />
          </svg>
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#0a0a0a] opacity-0 transition-opacity group-hover:opacity-100 sm:block">
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
