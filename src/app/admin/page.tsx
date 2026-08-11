import { redirect } from "next/navigation";
import { isAuthenticated, usingDefaultCredentials } from "@/lib/auth";
import { isDbConfigured } from "@/lib/mongodb";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { getProjects } from "@/lib/projects-repo";
import { computeProgress } from "@/lib/models";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const projects = await getProjects();
  const rows = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    division: p.division,
    category: p.category,
    status: p.status,
    cover: p.cover,
    phaseCount: p.phases.length,
    progress: computeProgress(p.phases),
    pinned: Boolean(p.pinned),
  }));

  return (
    <DashboardClient
      rows={rows}
      dbReady={isDbConfigured()}
      cloudReady={isCloudinaryConfigured()}
      defaultCreds={usingDefaultCredentials()}
    />
  );
}
