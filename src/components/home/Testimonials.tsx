"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Testimonial } from "@/lib/models";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [allOpen, setAllOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [active, setActive] = useState(0);
  const visible = testimonials.slice(0, 3);

  useEffect(() => {
    if (!allOpen && !formOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setAllOpen(false); setFormOpen(false); } };
    document.addEventListener("keydown", close);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", close); document.body.style.overflow = previous; };
  }, [allOpen, formOpen]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="eyebrow">Verified client experiences</p><h2 className="display mt-5 text-[11vw] leading-[0.9] sm:text-[7vw] lg:text-[4.6vw]"><span>Results that</span><span><span className="hot">speak</span> for</span><span className="lead">themselves</span></h2></div>
          <div className="flex flex-wrap gap-3">
            {testimonials.length > 0 && <button onClick={() => { setActive(0); setAllOpen(true); }} className="rounded-full border border-[#3a3a3a] px-5 py-2.5 text-sm text-white transition-colors hover:border-[#d2a24c]">See all ({testimonials.length})</button>}
            <button onClick={() => setFormOpen(true)} className="rounded-full bg-[#d2a24c] px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-85">Share your experience</button>
          </div>
        </div>

        {visible.length > 0 ? <div className="mt-16 divide-y divide-[#3c2c10] border-y border-[#3c2c10]">{visible.map((testimonial, index) => <TestimonialRow key={testimonial.id} testimonial={testimonial} index={index} />)}</div> : <div className="mt-14 rounded-sm border border-[#252525] bg-[#0f0f0f] p-8 sm:p-12"><p className="text-xl font-semibold text-white">Real client testimonials will appear here after approval.</p><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#888]">No placeholder reviews are displayed. If you have worked with GEO Group, submit your experience for admin verification.</p></div>}
      </div>

      <AnimatePresence>
        {allOpen && testimonials.length > 0 && <Modal onClose={() => setAllOpen(false)} label="All approved testimonials"><div className="flex min-h-[520px] flex-col p-6 sm:p-10"><div className="flex items-start justify-between gap-5"><div><p className="eyebrow">Client testimonial</p><p className="mt-2 text-xs text-[#666]">{active + 1} of {testimonials.length}</p></div><CloseButton onClick={() => setAllOpen(false)} /></div><AnimatePresence mode="wait"><motion.div key={testimonials[active].id} initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -35 }} transition={{ duration: 0.3 }} className="my-auto py-12"><div className="text-lg tracking-[0.2em] text-[#d2a24c]" aria-label={`${testimonials[active].rating} out of 5 stars`}>{"★".repeat(testimonials[active].rating)}<span className="text-[#333]">{"★".repeat(5 - testimonials[active].rating)}</span></div><blockquote className="mt-6 max-w-4xl text-xl leading-relaxed text-white sm:text-3xl">“{testimonials[active].quote}”</blockquote><div className="mt-9"><p className="font-semibold text-white">{testimonials[active].name}</p><p className="mt-1 text-sm text-[#d2a24c]">{testimonials[active].role}{testimonials[active].organization ? ` · ${testimonials[active].organization}` : ""}</p>{testimonials[active].location && <p className="mt-1 text-xs text-[#777]">{testimonials[active].location}</p>}</div></motion.div></AnimatePresence><div className="flex items-center justify-between border-t border-[#292929] pt-5"><button onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)} className="rounded-full border border-[#333] px-5 py-2.5 text-sm text-white hover:border-[#d2a24c]">← Previous</button><div className="hidden gap-1.5 sm:flex">{testimonials.map((item, index) => <button key={item.id} onClick={() => setActive(index)} aria-label={`View testimonial ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-[#d2a24c]" : "w-2 bg-[#444]"}`} />)}</div><button onClick={() => setActive((active + 1) % testimonials.length)} className="rounded-full border border-[#333] px-5 py-2.5 text-sm text-white hover:border-[#d2a24c]">Next →</button></div></div></Modal>}
        {formOpen && <TestimonialForm onClose={() => setFormOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}

function TestimonialRow({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }} className="relative grid items-start gap-6 py-9 sm:grid-cols-[240px_1fr_auto] sm:py-11"><div className="flex items-center gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#2a2a2a] bg-[#141414] text-lg font-semibold text-[#d2a24c]">{testimonial.name.charAt(0)}</div><div><p className="text-sm font-semibold text-white">{testimonial.name}</p><p className="text-xs text-[#d2a24c]">{testimonial.role}</p>{testimonial.organization && <p className="text-xs text-[#666]">{testimonial.organization}</p>}</div></div><div><div className="mb-3 text-xs tracking-[0.14em] text-[#d2a24c]">{"★".repeat(testimonial.rating)}</div><p className="max-w-3xl text-sm leading-relaxed text-[#b4b4b4] sm:text-base">{testimonial.quote}</p></div><span className="pointer-events-none absolute right-0 top-4 text-7xl font-bold text-[#171717] sm:static lg:text-8xl">{String(index + 1).padStart(2, "0")}</span></motion.article>;
}

function TestimonialForm({ onClose }: { onClose: () => void }) {
  const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [done, setDone] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setBusy(true); setError(""); const form = new FormData(event.currentTarget); const response = await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form.entries())) }); const result = await response.json().catch(() => ({})); setBusy(false); if (response.ok) setDone(true); else setError(result.error || "Could not submit testimonial."); }
  const input = "mt-2 w-full rounded-md border border-[#303030] bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-[#d2a24c]";
  return <Modal onClose={onClose} label="Submit a testimonial"><div className="p-6 sm:p-9"><div className="flex items-start justify-between gap-5"><div><p className="eyebrow">Your experience</p><h3 className="mt-3 text-2xl font-semibold text-white">Submit a testimonial</h3></div><CloseButton onClick={onClose} /></div>{done ? <div className="py-20 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#d2a24c] text-2xl text-black">✓</div><h4 className="mt-5 text-xl font-semibold text-white">Thank you</h4><p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#999]">Your testimonial was received and will appear here after admin approval.</p><button onClick={onClose} className="mt-7 rounded-full border border-[#444] px-6 py-2.5 text-sm text-white">Close</button></div> : <form onSubmit={submit} className="mt-8 space-y-5"><input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" /><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm text-[#aaa]">Full name *<input name="name" required maxLength={80} className={input} /></label><label className="text-sm text-[#aaa]">Email or phone *<input name="contact" required maxLength={120} className={input} /><span className="mt-1.5 block text-[11px] text-[#5f5f5f]">Private—used only by admin for verification.</span></label></div><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm text-[#aaa]">Role / relationship<input name="role" maxLength={80} placeholder="Client, consultant, partner…" className={input} /></label><label className="text-sm text-[#aaa]">Company / organization<input name="organization" maxLength={100} className={input} /></label></div><div className="grid gap-5 sm:grid-cols-[1fr_180px]"><label className="text-sm text-[#aaa]">Location<input name="location" maxLength={100} className={input} /></label><label className="text-sm text-[#aaa]">Rating<select name="rating" defaultValue="5" className={input}><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></label></div><label className="block text-sm text-[#aaa]">Your testimonial *<textarea name="quote" required minLength={20} maxLength={800} className={`${input} min-h-36 resize-y`} /></label>{error && <p className="text-sm text-[#ff7777]">{error}</p>}<div className="flex flex-wrap gap-3"><button disabled={busy} className="rounded-full bg-[#d2a24c] px-6 py-3 text-sm font-medium text-black disabled:opacity-50">{busy ? "Submitting…" : "Submit for approval"}</button><button type="button" onClick={onClose} className="rounded-full border border-[#333] px-6 py-3 text-sm text-[#aaa]">Cancel</button></div></form>}</div></Modal>;
}

function Modal({ children, onClose, label }: { children: React.ReactNode; onClose: () => void; label: string }) {
  return <motion.div role="dialog" aria-modal="true" aria-label={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md"><motion.div initial={{ opacity: 0, y: 25, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} className="my-auto w-full max-w-5xl overflow-hidden rounded-xl border border-[#303030] bg-[#0b0b0b] shadow-2xl shadow-black">{children}</motion.div></motion.div>;
}

function CloseButton({ onClick }: { onClick: () => void }) { return <button onClick={onClick} aria-label="Close" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#333] text-xl text-[#aaa] hover:border-[#d2a24c] hover:text-white">×</button>; }
