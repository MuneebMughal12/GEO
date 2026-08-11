import { getDb, isDbConfigured } from "./mongodb";
import { normalizeProject, type Division, type Project } from "./models";
import { projects as seed } from "@/data/projects";

const COLLECTION = "projects";

export async function getProjects(): Promise<Project[]> {
  if (isDbConfigured()) {
    const db = await getDb();
    if (db) {
      const docs = await db.collection<Project>(COLLECTION).find({}, { projection: { _id: 0 } }).sort({ order: 1, createdAt: -1 }).toArray();
      const current = docs.filter((project) =>
        project.division === "geo-arc" || project.division === "geo-soil-testing" || project.division === "geo-construction"
      );
      if (current.length) return current.map(normalizeProject);
      if (docs.length) return docs.map(normalizeProject);
    }
  }
  return [...seed].map(normalizeProject).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function getProjectsByDivision(division: Division) {
  return (await getProjects()).filter((project) => project.division === division);
}

export async function getPinnedProjects(limit = 6) {
  return (await getProjects()).filter((project) => project.pinned).sort((a, b) => (a.pinOrder ?? 999) - (b.pinOrder ?? 999)).slice(0, limit);
}

export async function getProject(slug: string): Promise<Project | null> {
  return (await getProjects()).find((project) => project.slug === slug) ?? null;
}
