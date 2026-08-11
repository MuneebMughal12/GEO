import { notFound, redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { isDbConfigured } from "@/lib/mongodb";
import { adminGetProject } from "@/lib/projects-admin";
import { getProject } from "@/lib/projects-repo";
import ProjectForm from "@/components/admin/ProjectForm";
import AdminShell from "@/components/admin/AdminShell";
export const dynamic="force-dynamic";
export default async function EditProjectPage({params}:{params:Promise<{slug:string}>}){if(!(await isAuthenticated()))redirect("/admin/login");const{slug}=await params;const project=isDbConfigured()?await adminGetProject(slug):await getProject(slug);if(!project)notFound();return <AdminShell title="Edit Project" subtitle={project.title}><div className="max-w-3xl"><ProjectForm initial={project}/></div></AdminShell>}
