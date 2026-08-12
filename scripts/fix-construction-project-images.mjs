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

const textFirstPages = new Set([21, 22, 27, 28, 29, 30]);
const fallbackImages = [
  "https://res.cloudinary.com/ducq2epdj/image/upload/v1786547764/geo-group/profile-2026/construction/page-20-photo-1.jpg",
  "https://res.cloudinary.com/ducq2epdj/image/upload/v1786547773/geo-group/profile-2026/construction/page-23-photo-1.jpg",
];

const client = new MongoClient(process.env.MONGODB_URI);

try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "geogroup");
  const collection = db.collection("projects");
  const projects = await collection.find({ division: "geo-construction" }).toArray();
  const now = new Date().toISOString();

  const operations = projects.map((project) => {
    let images = (Array.isArray(project.images) ? project.images : []).filter((src) => src && !src.includes("-record."));
    const pageMatch = images[0]?.match(/page-(\d+)-photo/);
    const page = pageMatch ? Number(pageMatch[1]) : null;
    if (page && textFirstPages.has(page)) images = images.slice(1);
    if (!images.length) images = fallbackImages;

    return {
      updateOne: {
        filter: { _id: project._id },
        update: { $set: { cover: images[0], images, updatedAt: now } },
      },
    };
  });

  const result = await collection.bulkWrite(operations);
  await db.collection("content_meta").updateOne(
    { key: "public-site" },
    { $set: { version: `${Date.now()}-construction-image-fix`, updatedAt: now } },
    { upsert: true },
  );
  console.log(`Updated ${result.modifiedCount} Construction project image sets.`);
} finally {
  await client.close();
}
