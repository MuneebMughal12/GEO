"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  { href: "/admin", label: "Dashboard", mark: "D" },
  { href: "/admin/projects", label: "Projects", mark: "P" },
  { href: "/admin/settings", label: "Site Images", mark: "I" },
  { href: "/admin/team", label: "Team", mark: "T" },
];

export default function AdminShell({ title, subtitle, actions, children }: {
  title: string; subtitle?: string; actions?: React.ReactNode; children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login"); router.refresh();
  }
  return (
    <div className="min-h-screen bg-[#080808] text-white lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-[#202020] bg-[#0d0d0d] lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-5 lg:block lg:px-6 lg:py-7">
          <Link href="/admin" className="block">
            <p className="text-lg font-bold"><span className="text-[#d2a24c]">GEO</span> Group</p>
            <p className="mt-0.5 text-[10px] tracking-[0.24em] text-[#696969]">CONTENT MANAGER</p>
          </Link>
          <Link href="/" target="_blank" className="text-xs text-[#8a8a8a] hover:text-white lg:mt-5 lg:inline-block">View website ↗</Link>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-1 lg:px-3 lg:pb-0">
          {navigation.map((item) => {
            const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
            return <Link key={item.href} href={item.href} className={`flex shrink-0 items-center gap-3 rounded-md px-3 py-3 text-sm transition-colors ${active ? "bg-[#d2a24c] text-black" : "text-[#9a9a9a] hover:bg-[#171717] hover:text-white"}`}>
              <span className={`grid h-6 w-6 place-items-center rounded text-[10px] font-bold ${active ? "bg-black/10" : "bg-[#202020]"}`}>{item.mark}</span>{item.label}
            </Link>;
          })}
        </nav>
        <button onClick={logout} className="m-6 hidden text-sm text-[#777] transition-colors hover:text-white lg:absolute lg:bottom-0 lg:block">Log out</button>
      </aside>
      <main className="min-w-0">
        <header className="border-b border-[#1e1e1e] px-5 py-6 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-5">
            <div><h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>{subtitle && <p className="mt-1 text-sm text-[#777]">{subtitle}</p>}</div>
            {actions}
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
