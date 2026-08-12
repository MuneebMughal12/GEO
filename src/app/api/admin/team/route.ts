import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createTeamMember, getTeamMembers } from "@/lib/team-repo";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getTeamMembers());
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.name?.trim() || !body.role?.trim()) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
    }
    const member = await createTeamMember({
      name: body.name.trim(), role: body.role.trim(), bio: body.bio?.trim() || "",
      division: body.division || "geo-arc", isLead: Boolean(body.isLead),
      photo: body.photo?.trim() || "", order: Number(body.order) || 0,
    });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to add team member" }, { status: 400 });
  }
}
