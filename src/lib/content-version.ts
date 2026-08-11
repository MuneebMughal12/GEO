import "server-only";
import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/mongodb";

const KEY = "public-site";

export async function getContentVersion(): Promise<string> {
  const db = await getDb();
  if (!db) return "static";
  const record = await db.collection("content_meta").findOne<{ version?: string }>({ key: KEY });
  return record?.version || "initial";
}

export async function touchContentVersion(): Promise<string> {
  const db = await getDb();
  if (!db) return "static";
  const version = `${Date.now()}-${randomUUID()}`;
  await db.collection("content_meta").updateOne(
    { key: KEY },
    { $set: { version, updatedAt: new Date().toISOString() } },
    { upsert: true },
  );
  return version;
}
