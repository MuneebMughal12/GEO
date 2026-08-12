import nextEnv from "@next/env";
import { MongoClient } from "mongodb";
import { existsSync, readFileSync } from "node:fs";

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.MONGODB_URI && existsSync("backend/.env")) {
  for (const line of readFileSync("backend/.env", "utf8").split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) process.env[match[1].trim()] = match[2].trim();
  }
}
if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing.");

const members = [
  { id: "geo-arc-amin-aziz", name: "Amin Aziz", role: "Chief Executive Officer", division: "geo-arc", isLead: true, order: 1 },
  { id: "geo-arc-ahsan-aziz", name: "Ahsan Aziz", role: "Architect", division: "geo-arc", isLead: false, order: 2 },
  { id: "geo-arc-mudassir", name: "Mudassir", role: "Draftsman", division: "geo-arc", isLead: false, order: 3 },
  { id: "geo-arc-yassir", name: "Yassir", role: "Draftsman", division: "geo-arc", isLead: false, order: 4 },
  { id: "dr-babar-khan-gec", name: "Dr. Babar Khan", role: "Chief Executive Officer", division: "geo-soil-testing", isLead: true, order: 1, bio: "Ph.D. in Geological Engineering; former Logging Geologist with Halliburton Sperry-Sun Worldwide; active member of PAPG, PGES and ISSMGE." },
  { id: "geo-soil-murad-ali", name: "Murad Ali", role: "Team Member", division: "geo-soil-testing", isLead: false, order: 2 },
  { id: "geo-soil-sheryar", name: "Sheryar", role: "Team Member", division: "geo-soil-testing", isLead: false, order: 3 },
  { id: "geo-construction-site-engineer", name: "Site Engineer", role: "Site Engineer", division: "geo-construction", isLead: false, order: 1 },
];

const client = new MongoClient(process.env.MONGODB_URI);
try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "geogroup");
  const now = new Date().toISOString();
  await db.collection("team_members").bulkWrite(members.map((member) => ({
    updateOne: {
      filter: { id: member.id },
      update: { $set: { ...member, bio: member.bio || "", photo: "", updatedAt: now }, $setOnInsert: { createdAt: now } },
      upsert: true,
    },
  })));
  await db.collection("content_meta").updateOne({ key: "public-site" }, { $set: { version: `${Date.now()}-division-teams`, updatedAt: now } }, { upsert: true });
  console.log(`Seeded ${members.length} division team members. Construction CEO intentionally left empty.`);
} finally {
  await client.close();
}
