"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type ProjectRow = {
  slug: string;
  title: string;
  division: string;
  category: string;
  status: string;
  cover: string;
  phaseCount: number;
  progress: number;
  pinned: boolean;
};

const divisions = [
  { value: "geo-arc", label: "GEO ARC", description: "Architecture & Designing" },
  { value: "geo-soil-testing", label: "GEO Soil Testing", description: "Laboratory & Geotechnical Projects" },
  { value: "geo-construction", label: "GEO Construction", description: "Civil Construction Projects" },
];

export default function DashboardClient({ rows, dbReady }: { rows: ProjectRow[]; dbReady: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState("");

  async function remove(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusy(slug);
    const res = await fetch(`/api/admin/projects/${slug}`, { method: "DELETE" });
    setBusy("");
    if (res.ok) router.refresh();
    else alert((await res.json().catch(() => ({}))).error || "Could not delete.");
  }

  async function togglePin(slug: string, pinned: boolean) {
    setBusy(`pin-${slug}`);
    const res = await fetch(`/api/admin/projects/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pinned: !pinned }),
    });
    setBusy("");
    if (res.ok) router.refresh();
    else alert("Could not update homepage pin.");
  }

  return (
    <div className="space-y-10">
      {divisions.map((division) => {
        const projects = rows.filter((row) => row.division === division.value);
        return (
          <section key={division.value} className="overflow-hidden rounded-lg border border-[#242424] bg-[#0b0b0b]">
            <header className="flex flex-col gap-3 border-b border-[#242424] bg-[#111] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d2a24c] shadow-[0_0_12px_rgba(210,162,76,0.55)]" />
                  <h2 className="text-lg font-semibold">{division.label}</h2>
                  <span className="rounded-full bg-[#252525] px-2.5 py-1 text-xs text-[#aaa]">{projects.length}</span>
                </div>
                <p className="ml-5 mt-1 text-xs text-[#707070]">{division.description}</p>
              </div>
              <Link href="/admin/projects/new" className="text-xs font-medium text-[#d2a24c] transition-colors hover:text-white">+ Add project</Link>
            </header>

            {projects.length === 0 ? (
              <div className="p-10 text-center text-sm text-[#666]">No projects in this division yet.</div>
            ) : (
              <div className="divide-y divide-[#202020]">
                {projects.map((project) => (
                  <div key={project.slug} className="flex flex-col gap-4 p-4 transition-colors hover:bg-[#101010] sm:flex-row sm:items-center">
                    <div className="relative h-20 w-full shrink-0 overflow-hidden rounded bg-[#151515] sm:w-28">
                      {project.cover && <Image src={project.cover} alt="" fill sizes="112px" className="object-cover" unoptimized />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-medium">{project.title}</p>
                        {project.pinned && <span className="rounded-full bg-[#d2a24c]/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#d2a24c]">Home</span>}
                      </div>
                      <p className="mt-1 text-xs text-[#777]">
                        {project.category} · {project.status === "ongoing" ? `${project.progress}% complete` : "Completed"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => togglePin(project.slug, project.pinned)} disabled={!dbReady || busy === `pin-${project.slug}`} className={`rounded border px-3 py-2 text-xs ${project.pinned ? "border-[#d2a24c] bg-[#d2a24c] text-black" : "border-[#333] text-[#bbb]"}`}>
                        {busy === `pin-${project.slug}` ? "Working…" : project.pinned ? "Pinned" : "Pin home"}
                      </button>
                      <Link href={`/admin/projects/${project.slug}/edit`} className="rounded border border-[#333] px-3 py-2 text-xs text-[#ddd] hover:border-white">Edit</Link>
                      <button onClick={() => remove(project.slug, project.title)} disabled={!dbReady || busy === project.slug} className="rounded border border-[#333] px-3 py-2 text-xs text-[#ff7777] hover:border-[#ff7777]">
                        {busy === project.slug ? "Working…" : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
