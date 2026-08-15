"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@/lib/models";

export default function TestimonialsAdminClient({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const pending = testimonials.filter((item) => item.status === "pending");
  const approved = testimonials.filter((item) => item.status === "approved");

  async function setStatus(item: Testimonial, status: "pending" | "approved") {
    setBusy(item.id);
    const response = await fetch(`/api/admin/testimonials/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setBusy("");
    if (response.ok) router.refresh(); else alert("Could not update testimonial.");
  }
  async function remove(item: Testimonial) {
    if (!confirm(`Permanently delete ${item.name}'s testimonial?`)) return;
    setBusy(item.id);
    const response = await fetch(`/api/admin/testimonials/${item.id}`, { method: "DELETE" });
    setBusy("");
    if (response.ok) router.refresh(); else alert("Could not delete testimonial.");
  }

  return <div className="space-y-12"><TestimonialGroup title={`Pending approval (${pending.length})`} empty="No testimonials are waiting for approval." items={pending} busy={busy} onStatus={setStatus} onDelete={remove} /><TestimonialGroup title={`Approved & live (${approved.length})`} empty="No approved testimonials yet." items={approved} busy={busy} onStatus={setStatus} onDelete={remove} /></div>;
}

function TestimonialGroup({ title, empty, items, busy, onStatus, onDelete }: { title: string; empty: string; items: Testimonial[]; busy: string; onStatus: (item: Testimonial, status: "pending" | "approved") => void; onDelete: (item: Testimonial) => void }) {
  return <section><h2 className="text-lg font-semibold text-white">{title}</h2>{items.length === 0 ? <div className="mt-4 rounded-md border border-dashed border-[#292929] p-8 text-sm text-[#777]">{empty}</div> : <div className="mt-4 space-y-4">{items.map((item) => <article key={item.id} className="rounded-md border border-[#242424] bg-[#0d0d0d] p-5 sm:p-6"><div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-3xl"><div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-white">{item.name}</p><span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider ${item.status === "approved" ? "bg-[#12301e] text-[#70db91]" : "bg-[#3b2b0a] text-[#e5bd62]"}`}>{item.status}</span><span className="text-xs text-[#d2a24c]">{"★".repeat(item.rating)}</span></div><p className="mt-1 text-xs text-[#888]">{item.role}{item.organization ? ` · ${item.organization}` : ""}{item.location ? ` · ${item.location}` : ""}</p><blockquote className="mt-4 text-sm leading-relaxed text-[#c0c0c0]">“{item.quote}”</blockquote><div className="mt-4 grid gap-1 text-xs text-[#666] sm:grid-cols-2"><p>Private contact: <span className="text-[#aaa]">{item.contact}</span></p><p>Submitted: {new Date(item.submittedAt).toLocaleString()}</p></div></div><div className="flex shrink-0 flex-wrap gap-2">{item.status === "pending" ? <button disabled={busy === item.id} onClick={() => onStatus(item, "approved")} className="rounded-full bg-[#d2a24c] px-4 py-2 text-xs font-medium text-black disabled:opacity-50">Approve & publish</button> : <button disabled={busy === item.id} onClick={() => onStatus(item, "pending")} className="rounded-full border border-[#444] px-4 py-2 text-xs text-[#ddd] disabled:opacity-50">Move to pending</button>}<button disabled={busy === item.id} onClick={() => onDelete(item)} className="rounded-full border border-[#4b2525] px-4 py-2 text-xs text-[#ff8585] disabled:opacity-50">Delete</button></div></div></article>)}</div>}</section>;
}
