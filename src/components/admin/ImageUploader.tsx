"use client";

import { useRef, useState } from "react";
import Image from "next/image";

/**
 * Pick images straight from the computer. Each file is uploaded to Cloudinary
 * via /api/admin/upload, which returns a hosted URL — the URL is added to the
 * list automatically. No manual link pasting.
 */
export default function ImageUploader({
  value,
  onChange,
  label = "Photos",
  multiple = true,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setBusy(true);
    setError("");
    const added: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.url) added.push(data.url);
        else setError(data.error || "Upload failed.");
      } catch {
        setError("Upload failed. Check your connection.");
      }
    }
    if (added.length) onChange(multiple ? [...value, ...added] : [added[added.length - 1]]);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeAt(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div>
      <p className="eyebrow mb-2">{label}</p>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="rounded-sm border border-dashed border-[#333] bg-[#0f0f0f] p-5 text-center"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="rounded-full bg-[#d2a24c] px-5 py-2.5 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {busy ? "Uploading…" : "Choose photos from computer"}
        </button>
        <p className="mt-2 text-xs text-[#6a6a6a]">or drag &amp; drop images here · max 8 MB each</p>
      </div>

      {error && <p className="mt-2 text-sm text-[#ff6b6b]">{error}</p>}

      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((url, i) => (
            <div key={url + i} className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-[#242424]">
              <Image src={url} alt="" fill sizes="200px" className="object-cover" unoptimized />
              <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button type="button" onClick={() => move(i, -1)} className="rounded bg-black/60 px-1.5 text-xs text-white">←</button>
                <button type="button" onClick={() => removeAt(i)} className="rounded bg-[#d2a24c] px-1.5 text-xs text-black">✕</button>
                <button type="button" onClick={() => move(i, 1)} className="rounded bg-black/60 px-1.5 text-xs text-white">→</button>
              </div>
              {i === 0 && (
                <span className="absolute left-1 top-1 rounded bg-[#d2a24c] px-1.5 py-0.5 text-[10px] font-medium text-black">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
