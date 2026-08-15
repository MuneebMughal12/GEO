import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteTestimonial, setTestimonialApproval } from "@/lib/testimonials-repo";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const testimonial = await setTestimonialApproval((await params).id, body.status === "approved");
    return testimonial ? NextResponse.json(testimonial) : NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not update testimonial" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const deleted = await deleteTestimonial((await params).id);
    return deleted ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not delete testimonial" }, { status: 400 });
  }
}
