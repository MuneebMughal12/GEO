import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteTeamMember, getTeamMember, updateTeamMember } from "@/lib/team-repo";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const member = await getTeamMember((await params).id);
  return member ? NextResponse.json(member) : NextResponse.json({ error: "Team member not found" }, { status: 404 });
}

export async function PUT(request: Request, { params }: Context) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.name?.trim() || !body.role?.trim()) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
    }
    const member = await updateTeamMember((await params).id, {
      name: body.name.trim(), role: body.role.trim(), bio: body.bio?.trim() || "",
      division: body.division || "geo-arc", isLead: Boolean(body.isLead),
      photo: body.photo?.trim() || "", order: Number(body.order) || 0,
    });
    return member ? NextResponse.json(member) : NextResponse.json({ error: "Team member not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update team member" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const removed = await deleteTeamMember((await params).id);
    return removed ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Team member not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete team member" }, { status: 400 });
  }
}
