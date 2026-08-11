import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getSiteSettings } from "@/lib/site-settings-repo";
import AdminShell from "@/components/admin/AdminShell";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
export const dynamic="force-dynamic";
export default async function SettingsPage(){if(!(await isAuthenticated()))redirect("/admin/login");return <AdminShell title="Site Images" subtitle="Change important website images without editing code."><SiteSettingsForm initial={await getSiteSettings()}/></AdminShell>}
