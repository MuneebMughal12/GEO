"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import { SiteSettings } from "@/lib/models";

export default function SiteSettingsForm({ initial }: { initial: SiteSettings }) {
  const router=useRouter(); const [heroImage,setHeroImage]=useState(initial.heroImage); const [footerImage,setFooterImage]=useState(initial.footerImage); const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
  async function save(){setBusy(true);setMessage("");const res=await fetch("/api/admin/settings",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({heroImage,footerImage})});setBusy(false);setMessage(res.ok?"Images saved. The public website is updated.":(await res.json().catch(()=>({}))).error||"Could not save.");if(res.ok)router.refresh();}
  return <div className="space-y-6">
    <section className="rounded-md border border-[#222] bg-[#0d0d0d] p-5 sm:p-7"><h2 className="text-lg font-semibold">Homepage hero image</h2><p className="mb-5 mt-1 text-sm text-[#777]">Large background image at the top of the homepage.</p><ImageUploader label="Hero image" multiple={false} value={heroImage?[heroImage]:[]} onChange={v=>setHeroImage(v[0]||"")}/></section>
    <section className="rounded-md border border-[#222] bg-[#0d0d0d] p-5 sm:p-7"><h2 className="text-lg font-semibold">Footer image</h2><p className="mb-5 mt-1 text-sm text-[#777]">Project image shown in the large website footer.</p><ImageUploader label="Footer image" multiple={false} value={footerImage?[footerImage]:[]} onChange={v=>setFooterImage(v[0]||"")}/></section>
    <div className="flex items-center gap-4"><button onClick={save} disabled={busy||!heroImage||!footerImage} className="rounded-full bg-[#d2a24c] px-6 py-3 text-sm font-medium text-black disabled:opacity-40">{busy?"Saving…":"Save site images"}</button>{message&&<p className="text-sm text-[#aaa]">{message}</p>}</div>
  </div>;
}
