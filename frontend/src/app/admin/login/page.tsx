"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setBusy(false);
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed.");
    }
  }

  const field =
    "w-full rounded-sm border border-[#242424] bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#5a5a5a] focus:border-[#d2a24c]";

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-lg font-bold uppercase tracking-tight">
            <span className="gold-text">GEO</span> Group of Companies
          </p>
          <p className="mt-1 text-xs tracking-[0.2em] text-[#8a8a8a]">ADMIN PANEL</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-sm border border-[#1f1f1f] bg-[#0c0c0c] p-6">
          <div>
            <label htmlFor="u" className="eyebrow">Username</label>
            <input id="u" className={`${field} mt-2`} value={username}
              onChange={(e) => setUsername(e.target.value)} placeholder="admin" autoComplete="username" />
          </div>
          <div>
            <label htmlFor="p" className="eyebrow">Password</label>
            <input id="p" type="password" className={`${field} mt-2`} value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
          </div>

          {error && <p className="text-sm text-[#ff6b6b]">{error}</p>}

          <button type="submit" disabled={busy}
            className="w-full rounded-full bg-[#d2a24c] px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-85 disabled:opacity-50">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-[#4a4a4a]">
          Authorised access only.
        </p>
      </div>
    </div>
  );
}
