import { readFile } from "node:fs/promises";
import nextEnv from "@next/env";
import { MongoClient } from "mongodb";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

const source = await readFile(new URL("../src/data/projects.ts", import.meta.url), "utf8");
const galleryMap = JSON.parse(await readFile(new URL("../src/data/geo-arc-galleries.json", import.meta.url), "utf8"));
const match = source.match(/const arcSeeds: ArcSeed\[\] = (\[[\s\S]*?\n\]);/);
if (!match) throw new Error("Could not read GEO ARC seeds.");

const seeds = Function(`"use strict"; return (${match[1]});`)();
const now = new Date().toISOString();
const projects = seeds.map(([slug, title, projectCode, plotSize, location, category, summary], index) => ({
  slug,
  title,
  projectCode,
  plotSize,
  client: index === 0 ? "Vision Flow Group" : "Private Client",
  location,
  year: projectCode.endsWith("-25") || projectCode.endsWith("-24") ? projectCode.slice(-2).padStart(4, "20") : "2026",
  division: "geo-arc",
  category,
  tags: [category, "Architectural Design", "3D Visualization"],
  summary: summary ?? `${title} is a GEO ARC architectural project shaped around efficient planning, natural light and a distinctive contemporary facade.`,
  scope: ["Concept development", "Architectural planning", "Facade design", "3D visualization"],
  cover: `/geo-arc/${slug}.webp`,
  images: galleryMap[slug] ?? [`/geo-arc/${slug}.webp`],
  status: "completed",
  phases: [],
  pinned: index < 3,
  pinOrder: index < 3 ? index + 1 : null,
  order: index + 1,
  updatedAt: now,
}));

const client = new MongoClient(process.env.MONGODB_URI);
try {
  await client.connect();
  const collection = client.db("geogroup").collection("projects");
  const operations = projects.map((project) => ({
    updateOne: {
      filter: { slug: project.slug },
      update: { $set: project, $setOnInsert: { createdAt: now } },
      upsert: true,
    },
  }));
  const result = await collection.bulkWrite(operations);
  console.log(`GEO ARC seed complete: ${projects.length} projects (${result.upsertedCount} inserted, ${result.modifiedCount} updated).`);
} finally {
  await client.close();
}
