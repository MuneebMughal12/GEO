"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project, Category, CATEGORIES, ProjectStatus, makeDefaultPhases, Division, DIVISIONS } from "@/lib/models";
import ImageUploader from "./ImageUploader";
import PhasesEditor from "./PhasesEditor";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const empty: Project = {
  slug: "",
  title: "",
  projectCode: "",
  plotSize: "",
  client: "",
  location: "",
  year: new Date().getFullYear().toString(),
  period: "",
  division: "geo-arc",
  category: "Architecture",
  tags: [],
  summary: "",
  scope: [],
  cover: "",
  images: [],
  status: "completed",
  phases: [],
  pinned: false,
  pinOrder: 99,
};

export default function ProjectForm({ initial }: { initial?: Project }) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [p, setP] = useState<Project>(initial ?? empty);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof Project>(key: K, val: Project[K]) {
    setP((prev) => ({ ...prev, [key]: val }));
  }

  function onTitle(v: string) {
    setP((prev) => ({
      ...prev,
      title: v,
      slug: slugTouched ? prev.slug : slugify(v),
    }));
  }

  function onStatus(v: ProjectStatus) {
    setP((prev) => ({
      ...prev,
      status: v,
      phases: v === "ongoing" && prev.phases.length === 0 ? makeDefaultPhases() : prev.phases,
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!p.title || !p.slug) {
      setError("Title and slug are required.");
      return;
    }
    setBusy(true);
    const payload: Project = { ...p, cover: p.images[0] ?? p.cover };
    const res = await fetch(
      isEdit ? `/api/admin/projects/${initial!.slug}` : "/api/admin/projects",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    setBusy(false);
    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not save.");
    }
  }

  const field =
    "w-full rounded-sm border border-[#242424] bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none placeholder:text-[#5a5a5a] focus:border-[#d2a24c]";

  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-20">
      {/* basics */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Project details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="eyebrow">Title</label>
            <input className={`${field} mt-2`} value={p.title} onChange={(e) => onTitle(e.target.value)} placeholder="Modern Family Home" />
          </div>
          <div>
            <label className="eyebrow">Slug (URL)</label>
            <input className={`${field} mt-2`} value={p.slug}
              onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }}
              disabled={isEdit} placeholder="modern-family-home" />
          </div>
          <div>
            <label className="eyebrow">Client</label>
            <input className={`${field} mt-2`} value={p.client} onChange={(e) => set("client", e.target.value)} placeholder="Private Client" />
          </div>
          <div>
            <label className="eyebrow">Division</label>
            <select className={`${field} mt-2`} value={p.division} onChange={(e) => set("division", e.target.value as Division)}>
              {DIVISIONS.map((division) => <option key={division.value} value={division.value} className="bg-[#0f0f0f]">{division.label}</option>)}
            </select>
          </div>
          <div>
            <label className="eyebrow">Project code</label>
            <input className={`${field} mt-2`} value={p.projectCode ?? ""} onChange={(e) => set("projectCode", e.target.value)} placeholder="GCE-044-26" />
          </div>
          <div>
            <label className="eyebrow">Plot size</label>
            <input className={`${field} mt-2`} value={p.plotSize ?? ""} onChange={(e) => set("plotSize", e.target.value)} placeholder="120' x 90'" />
          </div>
          <div>
            <label className="eyebrow">Location</label>
            <input className={`${field} mt-2`} value={p.location} onChange={(e) => set("location", e.target.value)} placeholder="Bahria Town, Rawalpindi" />
          </div>
          <div>
            <label className="eyebrow">Year</label>
            <input className={`${field} mt-2`} value={p.year} onChange={(e) => set("year", e.target.value)} placeholder="2024" />
          </div>
          <div>
            <label className="eyebrow">Duration (optional)</label>
            <input className={`${field} mt-2`} value={p.period ?? ""} onChange={(e) => set("period", e.target.value)} placeholder="10 Months" />
          </div>
          <div>
            <label className="eyebrow">Category</label>
            <select className={`${field} mt-2`} value={p.category} onChange={(e) => set("category", e.target.value as Category)}>
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0f0f0f]">{c}</option>)}
            </select>
          </div>
          <div>
            <label className="eyebrow">Status</label>
            <select className={`${field} mt-2`} value={p.status} onChange={(e) => onStatus(e.target.value as ProjectStatus)}>
              <option value="completed" className="bg-[#0f0f0f]">Completed</option>
              <option value="ongoing" className="bg-[#0f0f0f]">Ongoing (live progress)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="eyebrow">Tags (comma separated)</label>
          <input className={`${field} mt-2`} value={p.tags.join(", ")}
            onChange={(e) => set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
            placeholder="Design, Grey Structure, Turnkey" />
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
          <label className="flex items-center gap-3 rounded-sm border border-[#242424] bg-[#0f0f0f] px-4 py-3 text-sm text-[#d4d4d4]">
            <input type="checkbox" checked={Boolean(p.pinned)} onChange={(e) => set("pinned", e.target.checked)} className="h-4 w-4 accent-[#d2a24c]" />
            Pin above the homepage footer
          </label>
          <div>
            <label className="eyebrow">Pin order</label>
            <input type="number" min={1} className={`${field} mt-2`} value={p.pinOrder ?? 99} onChange={(e) => set("pinOrder", Number(e.target.value))} />
          </div>
        </div>

        <div>
          <label className="eyebrow">Summary</label>
          <textarea className={`${field} mt-2 resize-none`} rows={3} value={p.summary}
            onChange={(e) => set("summary", e.target.value)} placeholder="One or two lines about the project." />
        </div>

        <div>
          <label className="eyebrow">Scope of work (one per line)</label>
          <textarea className={`${field} mt-2 resize-none`} rows={5} value={p.scope.join("\n")}
            onChange={(e) => set("scope", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
            placeholder={"Architectural design and 3D elevation\nExcavation and foundation\nGrey structure…"} />
        </div>
      </section>

      {/* photos */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Photos</h2>
        <p className="text-xs text-[#6a6a6a]">The first photo is used as the cover.</p>
        <ImageUploader value={p.images} onChange={(images) => set("images", images)} />
      </section>

      {/* phases */}
      {p.status === "ongoing" && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Construction phases</h2>
          <p className="text-xs text-[#6a6a6a]">
            Mark phases complete and add photos as work progresses. The overall percentage
            updates automatically on the public page.
          </p>
          <PhasesEditor phases={p.phases} onChange={(phases) => set("phases", phases)} />
        </section>
      )}

      {error && <p className="text-sm text-[#ff6b6b]">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={busy}
          className="rounded-full bg-[#d2a24c] px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-85 disabled:opacity-50">
          {busy ? "Saving…" : isEdit ? "Save changes" : "Create project"}
        </button>
        <button type="button" onClick={() => router.push("/admin/projects")}
          className="rounded-full border border-[#333] px-6 py-3 text-sm text-[#d4d4d4] transition-colors hover:border-white hover:text-white">
          Cancel
        </button>
      </div>
    </form>
  );
}
