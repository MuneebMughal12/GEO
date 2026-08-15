import "server-only";
import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/mongodb";
import { touchContentVersion } from "@/lib/content-version";
import type { Testimonial } from "@/lib/models";

const COLLECTION = "testimonials";

function normalize(row: Partial<Testimonial>): Testimonial {
  return {
    id: row.id || "",
    name: row.name || "",
    role: row.role || "",
    organization: row.organization || "",
    location: row.location || "",
    contact: row.contact || "",
    quote: row.quote || "",
    rating: Math.min(5, Math.max(1, Number(row.rating) || 5)),
    status: row.status === "approved" ? "approved" : "pending",
    submittedAt: row.submittedAt || new Date().toISOString(),
    approvedAt: row.approvedAt,
    updatedAt: row.updatedAt,
  };
}

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.collection<Testimonial>(COLLECTION).find({ status: "approved" }).sort({ approvedAt: -1, submittedAt: -1 }).toArray();
  return rows.map(normalize);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.collection<Testimonial>(COLLECTION).find({}).sort({ submittedAt: -1 }).toArray();
  return rows.map(normalize);
}

export async function submitTestimonial(input: Omit<Testimonial, "id" | "status" | "submittedAt" | "approvedAt" | "updatedAt">): Promise<Testimonial> {
  const db = await getDb();
  if (!db) throw new Error("Testimonials are temporarily unavailable.");
  const now = new Date().toISOString();
  const testimonial = normalize({ ...input, id: randomUUID(), status: "pending", submittedAt: now, updatedAt: now });
  await db.collection<Testimonial>(COLLECTION).insertOne(testimonial);
  return testimonial;
}

export async function setTestimonialApproval(id: string, approved: boolean): Promise<Testimonial | null> {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured.");
  const now = new Date().toISOString();
  const update = approved
    ? { $set: { status: "approved" as const, approvedAt: now, updatedAt: now } }
    : { $set: { status: "pending" as const, updatedAt: now }, $unset: { approvedAt: "" as const } };
  const result = await db.collection<Testimonial>(COLLECTION).findOneAndUpdate(
    { id },
    update,
    { returnDocument: "after" },
  );
  if (result) await touchContentVersion();
  return result ? normalize(result) : null;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured.");
  const result = await db.collection<Testimonial>(COLLECTION).deleteOne({ id });
  if (result.deletedCount) await touchContentVersion();
  return result.deletedCount === 1;
}
