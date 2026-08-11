import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-[#1f1f1f]">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-4">
          <Link href="/admin" className="text-sm text-[#8a8a8a] transition-colors hover:text-white">‹ Back</Link>
          <h1 className="text-sm font-semibold">New project</h1>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-8">
        <ProjectForm />
      </main>
    </div>
  );
}
