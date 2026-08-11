import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { adminListProjects, adminCreateProject } from "@/lib/projects-admin";
import { Project } from "@/lib/models";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  try {
    const projects = await adminListProjects();
    return NextResponse.json({ projects });
  } catch (e) {
    return NextResponse.json({ error: msg(e) }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  let body: Project;
  try {
    body = (await req.json()) as Project;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body.slug || !body.title) {
    return NextResponse.json({ error: "Title and slug are required." }, { status: 400 });
  }
  try {
    await adminCreateProject(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: msg(e) }, { status: 400 });
  }
}

function msg(e: unknown) {
  return e instanceof Error ? e.message : "Something went wrong.";
}
