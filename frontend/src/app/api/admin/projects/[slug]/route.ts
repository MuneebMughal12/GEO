import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { adminGetProject, adminUpdateProject, adminDeleteProject } from "@/lib/projects-admin";
import { Project } from "@/lib/models";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  const { slug } = await ctx.params;
  try {
    const project = await adminGetProject(slug);
    if (!project) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ project });
  } catch (e) {
    return NextResponse.json({ error: msg(e) }, { status: 503 });
  }
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  const { slug } = await ctx.params;
  let patch: Partial<Project>;
  try {
    patch = (await req.json()) as Partial<Project>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  try {
    await adminUpdateProject(slug, patch);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: msg(e) }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  const { slug } = await ctx.params;
  try {
    await adminDeleteProject(slug);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: msg(e) }, { status: 400 });
  }
}

function msg(e: unknown) {
  return e instanceof Error ? e.message : "Something went wrong.";
}
