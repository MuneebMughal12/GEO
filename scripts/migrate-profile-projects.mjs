import nextEnv from "@next/env";
import { MongoClient } from "mongodb";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

if (!process.env.MONGODB_URI) {
  const legacyEnv = resolve(process.cwd(), "backend", ".env");
  if (existsSync(legacyEnv)) {
    for (const line of readFileSync(legacyEnv, "utf8").split(/\r?\n/)) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match && !process.env[match[1].trim()]) process.env[match[1].trim()] = match[2].trim();
    }
  }
}

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing.");

const divisionMap = { SOIL: "geo-soil-testing", CONSTRUCTION: "geo-construction" };
const categoryMap = { SOIL: "Soil Testing", CONSTRUCTION: "Construction" };
const client = new MongoClient(process.env.MONGODB_URI);

try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "geogroup");
  const collection = db.collection("projects");
  const legacy = await collection.find({ division: { $in: Object.keys(divisionMap) } }).sort({ createdAt: 1 }).toArray();

  if (!legacy.length) {
    console.log("No legacy Soil or Construction profile projects found; nothing to migrate.");
  } else {
    const counters = { SOIL: 0, CONSTRUCTION: 0 };
    const now = new Date().toISOString();
    const operations = legacy.map((project) => {
      counters[project.division] += 1;
      const isSoil = project.division === "SOIL";
      const images = Array.isArray(project.images) ? project.images.filter(Boolean) : [];
      const status = String(project.status).toLowerCase() === "ongoing" ? "ongoing" : "completed";
      const normalized = {
        slug: project.slug,
        title: project.name,
        client: project.clientName,
        location: project.location,
        year: project.completionDate || "Company profile record",
        division: divisionMap[project.division],
        category: categoryMap[project.division],
        tags: isSoil ? ["Geotechnical Investigation", "Soil Testing", "Completed Assignment"] : [project.category || "Construction", "GEO Services Engineering", status === "ongoing" ? "Ongoing" : "Completed"],
        summary: project.description,
        scope: isSoil ? ["Field geotechnical investigation", "Soil sampling and testing", "Engineering analysis and reporting"] : ["Construction delivery", project.category || "Civil works", "Project management and quality control"],
        cover: images[0] || "",
        images,
        status,
        phases: [],
        pinned: project.division === "CONSTRUCTION" && counters.CONSTRUCTION <= 3,
        pinOrder: project.division === "CONSTRUCTION" && counters.CONSTRUCTION <= 3 ? counters.CONSTRUCTION + 3 : null,
        order: counters[project.division],
        updatedAt: now,
      };
      return { updateOne: { filter: { _id: project._id }, update: { $set: normalized, $unset: { name: "", clientName: "", description: "", completionDate: "", isFeatured: "", isPinnedHomepage: "", documents: "", videos: "", __v: "" } } } };
    });

    const result = await collection.bulkWrite(operations);
    await db.collection("team_members").updateOne(
      { id: "dr-babar-khan-gec" },
      { $set: { id: "dr-babar-khan-gec", name: "Dr. Babar Khan", role: "Chief Executive Officer · Geoservices Engineering Consultants", bio: "Ph.D. in Geological Engineering; former Logging Geologist with Halliburton Sperry-Sun Worldwide; active member of PAPG, PGES and ISSMGE.", photo: "", order: 1, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true },
    );
    await db.collection("content_meta").updateOne({ key: "public-site" }, { $set: { version: `${Date.now()}-profile-import`, updatedAt: now } }, { upsert: true });
    console.log(`Profile migration complete: ${counters.CONSTRUCTION} Construction and ${counters.SOIL} Soil projects (${result.modifiedCount} records updated).`);
  }
} finally {
  await client.close();
}
