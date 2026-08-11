import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import ProjectForm from "@/components/admin/ProjectForm";
import AdminShell from "@/components/admin/AdminShell";
export const dynamic="force-dynamic";
export default async function NewProjectPage(){if(!(await isAuthenticated()))redirect("/admin/login");return <AdminShell title="New Project" subtitle="Add a project to any GEO division."><div className="max-w-3xl"><ProjectForm/></div></AdminShell>}
