import { getDb } from "./mongodb";
import { normalizeProject, Project } from "./models";

/** Write operations used by the admin panel. These require MongoDB. */

const COLLECTION = "projects";

async function db() {
  const d = await getDb();
  if (!d) throw new Error("Database not configured. Add MONGODB_URI to .env.local");
  return d;
}

export async function adminListProjects(): Promise<Project[]> {
  const d = await db();
  const projects = await d
    .collection<Project>(COLLECTION)
    .find({}, { projection: { _id: 0 } })
    .sort({ order: 1, createdAt: -1 })
    .toArray();
  return projects.map(normalizeProject);
}

export async function adminGetProject(slug: string): Promise<Project | null> {
  const d = await db();
  const project = await d.collection<Project>(COLLECTION).findOne({ slug }, { projection: { _id: 0 } });
  return project ? normalizeProject(project) : null;
}

export async function adminCreateProject(project: Project): Promise<void> {
  const d = await db();
  const exists = await d.collection(COLLECTION).findOne({ slug: project.slug });
  if (exists) throw new Error(`A project with slug "${project.slug}" already exists.`);
  const now = new Date().toISOString();
  await d.collection(COLLECTION).insertOne({
    ...project,
    createdAt: now,
    updatedAt: now,
  });
}

export async function adminUpdateProject(slug: string, patch: Partial<Project>): Promise<void> {
  const d = await db();
  const { ...rest } = patch;
  await d
    .collection(COLLECTION)
    .updateOne({ slug }, { $set: { ...rest, updatedAt: new Date().toISOString() } });
}

export async function adminDeleteProject(slug: string): Promise<void> {
  const d = await db();
  await d.collection(COLLECTION).deleteOne({ slug });
}
