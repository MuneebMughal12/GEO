export type Division = "geo-arc" | "geo-soil-testing" | "geo-construction";
export type Category = "Architecture" | "Residential" | "Commercial" | "Institutional" | "Interior" | "Soil Testing" | "Construction";
export type ProjectStatus = "ongoing" | "completed";
export type PhaseStatus = "done" | "active" | "upcoming";

export type Phase = { name: string; status: PhaseStatus; percent: number; note?: string; images: string[]; completedAt?: string };

export type Project = {
  slug: string;
  title: string;
  projectCode?: string;
  plotSize?: string;
  client: string;
  contractor?: string;
  location: string;
  year: string;
  period?: string;
  division: Division;
  category: Category;
  tags: string[];
  summary: string;
  scope: string[];
  cover: string;
  images: string[];
  status: ProjectStatus;
  phases: Phase[];
  pinned?: boolean;
  pinOrder?: number;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type SiteSettings = {
  heroImage: string;
  footerImage: string;
  updatedAt?: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  heroImage: "/geo-arc/vision-flow-group-headquarters.webp",
  footerImage: "/geo-arc/vision-flow-group-headquarters.webp",
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
};

export const DIVISIONS: Array<{ value: Division; label: string }> = [
  { value: "geo-arc", label: "GEO ARC" },
  { value: "geo-soil-testing", label: "GEO Soil Testing" },
  { value: "geo-construction", label: "GEO Construction" },
];

export const CATEGORIES: Category[] = ["Architecture", "Residential", "Commercial", "Institutional", "Interior", "Soil Testing", "Construction"];
export const DEFAULT_PHASES = ["Planning & Approvals", "Site Mobilization", "Foundation", "Structural Works", "MEP & Finishes", "Testing & Handover"];

export function computeProgress(phases: Phase[]): number {
  if (!phases.length) return 0;
  const per = 100 / phases.length;
  return Math.round(phases.reduce((total, phase) => phase.status === "done" ? total + per : phase.status === "active" ? total + per * Math.min(100, Math.max(0, phase.percent)) / 100 : total, 0));
}

export function makeDefaultPhases(): Phase[] {
  return DEFAULT_PHASES.map((name, index) => ({ name, status: index === 0 ? "active" : "upcoming", percent: 0, images: [] }));
}

/** Keeps older database records usable as the admin schema evolves. */
export function normalizeProject(project: Project): Project {
  return {
    ...project,
    client: project.client ?? "Private Client",
    location: project.location ?? "Islamabad, Pakistan",
    year: project.year ?? new Date().getFullYear().toString(),
    division: project.division ?? "geo-arc",
    category: project.category ?? "Architecture",
    tags: project.tags ?? [],
    summary: project.summary ?? "",
    scope: project.scope ?? [],
    cover: project.cover ?? project.images?.[0] ?? "",
    images: project.images ?? (project.cover ? [project.cover] : []),
    status: project.status ?? "completed",
    phases: project.phases ?? [],
    pinned: Boolean(project.pinned),
  };
}
