"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import { TeamMember } from "@/lib/models";

export default function TeamForm({ initial }: { initial?: TeamMember }) {
 const router=useRouter(); const [name,setName]=useState(initial?.name||""); const [role,setRole]=useState(initial?.role||""); const [bio,setBio]=useState(initial?.bio||""); const [photo,setPhoto]=useState(initial?.photo||""); const [order,setOrder]=useState(initial?.order||0); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError("");const res=await fetch(initial?`/api/admin/team/${initial.id}`:"/api/admin/team",{method:initial?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,role,bio,photo,order})});setBusy(false);if(res.ok){router.push("/admin/team");router.refresh()}else setError((await res.json().catch(()=>({}))).error||"Could not save team member.")}
 const input="mt-2 w-full rounded-md border border-[#303030] bg-[#111] px-4 py-3 text-sm outline-none focus:border-[#d2a24c]";
 return <form onSubmit={submit} className="space-y-6 rounded-md border border-[#222] bg-[#0d0d0d] p-5 sm:p-7">
   <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm text-[#aaa]">Full name<input className={input} value={name} onChange={e=>setName(e.target.value)} required/></label><label className="text-sm text-[#aaa]">Role / designation<input className={input} value={role} onChange={e=>setRole(e.target.value)} required/></label></div>
   <label className="block text-sm text-[#aaa]">Short profile<textarea className={`${input} min-h-28 resize-y`} value={bio} onChange={e=>setBio(e.target.value)}/></label>
   <label className="block max-w-xs text-sm text-[#aaa]">Display order<input type="number" className={input} value={order} onChange={e=>setOrder(Number(e.target.value))}/></label>
   <ImageUploader label="Team member photo" multiple={false} value={photo?[photo]:[]} onChange={v=>setPhoto(v[0]||"")}/>
   {error&&<p className="text-sm text-[#ff7777]">{error}</p>}<div className="flex gap-3"><button disabled={busy} className="rounded-full bg-[#d2a24c] px-6 py-3 text-sm font-medium text-black">{busy?"Saving…":initial?"Update member":"Add member"}</button><button type="button" onClick={()=>router.push("/admin/team")} className="rounded-full border border-[#333] px-6 py-3 text-sm text-[#aaa]">Cancel</button></div>
 </form>;
}
