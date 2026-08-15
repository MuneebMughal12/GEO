import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getAllTestimonials } from "@/lib/testimonials-repo";
import AdminShell from "@/components/admin/AdminShell";
import TestimonialsAdminClient from "@/components/admin/TestimonialsAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const testimonials = await getAllTestimonials();
  return <AdminShell title="Testimonials" subtitle="Verify submissions before publishing them on the Home page."><TestimonialsAdminClient testimonials={testimonials} /></AdminShell>;
}
