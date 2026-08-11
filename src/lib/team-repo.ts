import "server-only";
import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/mongodb";
import { TeamMember } from "@/lib/models";
import { touchContentVersion } from "@/lib/content-version";

type TeamInput = Omit<TeamMember, "id" | "createdAt" | "updatedAt">;

function normalize(member: Partial<TeamMember>): TeamMember {
  return {
    id: member.id || "",
    name: member.name || "",
    role: member.role || "",
    bio: member.bio || "",
    photo: member.photo || "",
    order: Number(member.order) || 0,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
  };
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.collection<TeamMember>("team_members").find({}).sort({ order: 1, createdAt: 1 }).toArray();
  return rows.map(normalize);
}

export async function getTeamMember(id: string): Promise<TeamMember | null> {
  const db = await getDb();
  if (!db) return null;
  const member = await db.collection<TeamMember>("team_members").findOne({ id });
  return member ? normalize(member) : null;
}

export async function createTeamMember(input: TeamInput): Promise<TeamMember> {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured");
  const now = new Date().toISOString();
  const member: TeamMember = normalize({ ...input, id: randomUUID(), createdAt: now, updatedAt: now });
  await db.collection<TeamMember>("team_members").insertOne(member);
  await touchContentVersion();
  return member;
}

export async function updateTeamMember(id: string, input: TeamInput): Promise<TeamMember | null> {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured");
  const update = normalize({ ...input, id, updatedAt: new Date().toISOString() });
  delete update.createdAt;
  const result = await db.collection<TeamMember>("team_members").findOneAndUpdate(
    { id },
    { $set: update },
    { returnDocument: "after" },
  );
  if (result) await touchContentVersion();
  return result ? normalize(result) : null;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured");
  const result = await db.collection<TeamMember>("team_members").deleteOne({ id });
  if (result.deletedCount === 1) await touchContentVersion();
  return result.deletedCount === 1;
}
