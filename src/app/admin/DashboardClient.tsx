"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type ProjectRow = { slug:string; title:string; division:string; category:string; status:string; cover:string; phaseCount:number; progress:number; pinned:boolean };

export default function DashboardClient({ rows, dbReady }: { rows: ProjectRow[]; dbReady: boolean }) {
  const router = useRouter(); const [busy, setBusy] = useState("");
  async function remove(slug:string,title:string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusy(slug); const res=await fetch(`/api/admin/projects/${slug}`,{method:"DELETE"}); setBusy("");
    if(res.ok) router.refresh(); else alert((await res.json().catch(()=>({}))).error||"Could not delete.");
  }
  async function togglePin(slug:string,pinned:boolean) {
    setBusy(`pin-${slug}`); const res=await fetch(`/api/admin/projects/${slug}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({pinned:!pinned})}); setBusy("");
    if(res.ok) router.refresh(); else alert("Could not update homepage pin.");
  }
  if (!rows.length) return <div className="rounded-md border border-dashed border-[#292929] p-12 text-center text-[#777]">No projects yet.</div>;
  return <div className="space-y-3">{rows.map(r=><div key={r.slug} className="flex flex-col gap-4 rounded-md border border-[#202020] bg-[#0d0d0d] p-4 sm:flex-row sm:items-center">
    <div className="relative h-20 w-full shrink-0 overflow-hidden rounded bg-[#151515] sm:w-28">{r.cover&&<Image src={r.cover} alt="" fill sizes="112px" className="object-cover" unoptimized/>}</div>
    <div className="min-w-0 flex-1"><p className="truncate font-medium">{r.title}</p><p className="mt-1 text-xs capitalize text-[#777]">{r.division.replaceAll("-"," ")} · {r.category}{r.status==="ongoing"&&` · ${r.progress}% complete`}</p></div>
    <div className="flex flex-wrap gap-2">
      <button onClick={()=>togglePin(r.slug,r.pinned)} disabled={!dbReady||busy===`pin-${r.slug}`} className={`rounded border px-3 py-2 text-xs ${r.pinned?"border-[#d2a24c] bg-[#d2a24c] text-black":"border-[#333] text-[#bbb]"}`}>{r.pinned?"Pinned":"Pin home"}</button>
      <Link href={`/admin/projects/${r.slug}/edit`} className="rounded border border-[#333] px-3 py-2 text-xs text-[#ddd] hover:border-white">Edit</Link>
      <button onClick={()=>remove(r.slug,r.title)} disabled={!dbReady||busy===r.slug} className="rounded border border-[#333] px-3 py-2 text-xs text-[#ff7777] hover:border-[#ff7777]">{busy===r.slug?"Working…":"Delete"}</button>
    </div>
  </div>)}</div>;
}
