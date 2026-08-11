"use client";

import { Phase, PhaseStatus } from "@/lib/models";
import ImageUploader from "./ImageUploader";

const STATUS: { value: PhaseStatus; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "active", label: "In progress" },
  { value: "done", label: "Completed" },
];

export default function PhasesEditor({
  phases,
  onChange,
}: {
  phases: Phase[];
  onChange: (phases: Phase[]) => void;
}) {
  function update(i: number, patch: Partial<Phase>) {
    onChange(phases.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }
  function remove(i: number) {
    onChange(phases.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...phases, { name: "New phase", status: "upcoming", percent: 0, images: [] }]);
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= phases.length) return;
    const next = [...phases];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  const field =
    "w-full rounded-sm border border-[#242424] bg-[#0f0f0f] px-3 py-2 text-sm text-white outline-none focus:border-[#d2a24c]";

  return (
    <div className="space-y-4">
      {phases.map((p, i) => (
        <div key={i} className="rounded-sm border border-[#1f1f1f] bg-[#0c0c0c] p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-[#6a6a6a]">#{i + 1}</span>
            <input
              className={`${field} flex-1`}
              value={p.name}
              onChange={(e) => update(i, { name: e.target.value })}
              placeholder="Phase name"
            />
            <select
              className={field}
              value={p.status}
              onChange={(e) => update(i, { status: e.target.value as PhaseStatus })}
            >
              {STATUS.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#0f0f0f]">
                  {s.label}
                </option>
              ))}
            </select>
            <div className="flex gap-1">
              <button type="button" onClick={() => move(i, -1)} className="rounded border border-[#242424] px-2 text-sm text-[#8a8a8a]">↑</button>
              <button type="button" onClick={() => move(i, 1)} className="rounded border border-[#242424] px-2 text-sm text-[#8a8a8a]">↓</button>
              <button type="button" onClick={() => remove(i)} className="rounded border border-[#242424] px-2 text-sm text-[#ff6b6b]">✕</button>
            </div>
          </div>

          {p.status === "active" && (
            <div className="mt-3 flex items-center gap-3">
              <label className="text-xs text-[#8a8a8a]">Progress</label>
              <input
                type="range"
                min={0}
                max={100}
                value={p.percent}
                onChange={(e) => update(i, { percent: Number(e.target.value) })}
                className="flex-1 accent-[#d2a24c]"
              />
              <span className="w-10 text-right text-sm text-[#d2a24c]">{p.percent}%</span>
            </div>
          )}

          <input
            className={`${field} mt-3`}
            value={p.note ?? ""}
            onChange={(e) => update(i, { note: e.target.value })}
            placeholder="Short note (optional) — e.g. First-floor slab in progress"
          />

          <div className="mt-3">
            <ImageUploader
              label="Phase photos"
              value={p.images}
              onChange={(images) => update(i, { images })}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="rounded-full border border-[#333] px-5 py-2 text-sm text-[#d4d4d4] transition-colors hover:border-[#d2a24c] hover:text-white"
      >
        + Add phase
      </button>
    </div>
  );
}
