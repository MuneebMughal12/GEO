"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { company } from "@/data/company";
import { divisions } from "@/data/divisions";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [divisionOpen, setDivisionOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const active = (href: string) => href === "/" ? path === "/" : path.startsWith(href);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[500] transition-colors duration-300 ${solid ? "bg-[#0a0a0a]/85 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="group flex flex-col leading-none">
            <span className="text-sm font-bold uppercase tracking-tight sm:text-base"><span className="gold-text">GEO</span> Group of Companies</span>
            <span className="mt-1 hidden text-[10px] tracking-[0.18em] text-[#8a8a8a] sm:block">SOIL TESTING · DESIGNING · CONSTRUCTION</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.slice(0, 2).map((link) => <DesktopLink key={link.href} {...link} active={active(link.href)} />)}
            <div className="relative" onMouseEnter={() => setDivisionOpen(true)} onMouseLeave={() => setDivisionOpen(false)}>
              <button className={`relative py-3 text-sm transition-colors ${path.startsWith("/geo-") ? "text-white" : "text-[#8a8a8a] hover:text-white"}`}>Divisions <span className="text-[#d2a24c]">⌄</span></button>
              <AnimatePresence>{divisionOpen && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute left-1/2 top-10 w-72 -translate-x-1/2 rounded-sm border border-[#2a2a2a] bg-[#0a0a0a] p-2 shadow-2xl">{divisions.map((division) => <Link key={division.slug} href={`/${division.slug}`} className="block rounded-sm px-4 py-3 transition-colors hover:bg-[#161206]"><span className="block text-sm font-semibold text-white">{division.name}</span><span className="text-[10px] uppercase tracking-[.16em] text-[#8a8a8a]">{division.eyebrow}</span></Link>)}</motion.div>}</AnimatePresence>
            </div>
            {links.slice(2).map((link) => <DesktopLink key={link.href} {...link} active={active(link.href)} />)}
          </nav>

          <div className="flex items-center gap-3"><a href={`tel:${company.offices[0].phones[0]}`} className="hidden text-sm text-[#8a8a8a] hover:text-white md:block">{company.offices[0].phones[0]}</a><Link href="/contact" className="hidden rounded-full border border-[#d2a24c] px-4 py-2 text-sm text-[#d2a24c] hover:bg-[#d2a24c] hover:text-[#0a0a0a] sm:block">Get a Quote</Link><button onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" className="relative z-[600] h-10 w-10 text-2xl lg:hidden">{open ? "×" : "☰"}</button></div>
        </div>
      </header>

      <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[550] bg-[#0a0a0a] lg:hidden"><div className="glow absolute inset-0" /><nav className="relative flex h-full flex-col justify-center px-8"><p className="eyebrow mb-3">Main menu</p>{links.slice(0, 2).map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-1 text-4xl font-bold uppercase">{link.label}</Link>)}<p className="eyebrow mb-2 mt-6">Divisions</p>{divisions.map((division) => <Link key={division.slug} href={`/${division.slug}`} onClick={() => setOpen(false)} className="py-1 text-2xl font-semibold">{division.name}</Link>)}{links.slice(2).map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-1 text-4xl font-bold uppercase">{link.label}</Link>)}</nav></motion.div>}</AnimatePresence>
    </>
  );
}

function DesktopLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return <Link href={href} className={`relative text-sm transition-colors ${active ? "text-white" : "text-[#8a8a8a] hover:text-white"}`}>{label}{active && <motion.span layoutId="nav-dot" className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#d2a24c]" />}</Link>;
}
