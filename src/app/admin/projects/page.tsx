import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { isDbConfigured } from "@/lib/mongodb";
import { getProjects } from "@/lib/projects-repo";
import { computeProgress } from "@/lib/models";
import AdminShell from "@/components/admin/AdminShell";
import DashboardClient from "../DashboardClient";

export const dynamic = "force-dynamic";
export default async function ProjectsAdminPage(){
 if(!(await isAuthenticated())) redirect("/admin/login");
 const projects=await getProjects();
 const rows=projects.map(p=>({slug:p.slug,title:p.title,division:p.division,category:p.category,status:p.status,cover:p.cover,phaseCount:p.phases.length,progress:computeProgress(p.phases),pinned:Boolean(p.pinned)}));
 return <AdminShell title="Projects" subtitle={`${rows.length} projects across all divisions`} actions={<Link href="/admin/projects/new" className="rounded-full bg-[#d2a24c] px-5 py-2.5 text-sm font-medium text-black">+ Add project</Link>}><DashboardClient rows={rows} dbReady={isDbConfigured()}/></AdminShell>;
}
