import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated, usingDefaultCredentials } from "@/lib/auth";
import { isDbConfigured } from "@/lib/mongodb";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { getProjects } from "@/lib/projects-repo";
import { getTeamMembers } from "@/lib/team-repo";
import AdminShell from "@/components/admin/AdminShell";
import { getAllTestimonials } from "@/lib/testimonials-repo";

export const dynamic = "force-dynamic";
export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const [projects, team, testimonials] = await Promise.all([getProjects(), getTeamMembers(), getAllTestimonials()]);
  const cards = [
    {label:"Projects",value:projects.length,href:"/admin/projects",note:"Add, edit, pin or delete"},
    {label:"Pinned on home",value:projects.filter(p=>p.pinned).length,href:"/admin/projects",note:"Featured above the footer"},
    {label:"Team members",value:team.length,href:"/admin/team",note:"Manage the About page team"},
    {label:"Pending testimonials",value:testimonials.filter(item=>item.status === "pending").length,href:"/admin/testimonials",note:"Review and approve client submissions"},
    {label:"Site images",value:2,href:"/admin/settings",note:"Hero and footer backgrounds"},
  ];
  return <AdminShell title="Dashboard" subtitle="Manage the GEO Group website from one place.">
    {(!isDbConfigured()||!isCloudinaryConfigured()||usingDefaultCredentials())&&<div className="mb-7 rounded-md border border-[#4b3b19] bg-[#171205] p-4 text-sm text-[#d8c18a]">Setup warning: {!isDbConfigured()?"MongoDB ":""}{!isCloudinaryConfigured()?"Cloudinary ":""}{usingDefaultCredentials()?"secure admin credentials ":""}need configuration.</div>}
    <div className="grid gap-4 sm:grid-cols-2">{cards.map(c=><Link href={c.href} key={c.label} className="group rounded-md border border-[#202020] bg-[#0d0d0d] p-6 transition-colors hover:border-[#d2a24c]/60"><p className="text-sm text-[#888]">{c.label}</p><p className="mt-2 text-4xl font-semibold text-[#d2a24c]">{c.value}</p><p className="mt-5 text-xs text-[#666] group-hover:text-[#aaa]">{c.note} →</p></Link>)}</div>
  </AdminShell>;
}
