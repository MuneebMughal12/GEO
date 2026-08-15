import { NextResponse } from "next/server";
import { submitTestimonial } from "@/lib/testimonials-repo";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true }, { status: 201 });
    const name = String(body.name || "").trim();
    const contact = String(body.contact || "").trim();
    const quote = String(body.quote || "").trim();
    if (name.length < 2 || name.length > 80) return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
    if (contact.length < 5 || contact.length > 120) return NextResponse.json({ error: "Email or phone is required for private verification." }, { status: 400 });
    if (quote.length < 20 || quote.length > 800) return NextResponse.json({ error: "Review must be between 20 and 800 characters." }, { status: 400 });
    await submitTestimonial({
      name,
      contact,
      quote,
      role: String(body.role || "Client").trim().slice(0, 80),
      organization: String(body.organization || "").trim().slice(0, 100),
      location: String(body.location || "").trim().slice(0, 100),
      rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
    });
    return NextResponse.json({ ok: true, message: "Thank you. Your testimonial is awaiting admin approval." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not submit testimonial." }, { status: 400 });
  }
}
