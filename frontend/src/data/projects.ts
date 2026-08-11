import type { Category, Project } from "@/lib/models";
import galleryData from "./geo-arc-galleries.json";

const galleries = galleryData as Record<string, string[]>;

type ArcSeed = [slug: string, title: string, code: string, plot: string, location: string, category: Category, summary?: string];

const arcSeeds: ArcSeed[] = [
  ["vision-flow-group-headquarters", "Vision Flow Group Headquarters", "GCE-044-26", "120' x 90'", "Park View City, Islamabad", "Commercial", "A luxury avant-garde headquarters combining sweeping organic geometry, white curved cladding, gold-tinted glass and an integrated landscaped entrance."],
  ["soneri-residencias", "Soneri Residencias", "GCE-027-26", "55' x 110'", "6th Road, Rawalpindi", "Commercial", "A contemporary mixed-use development with ground-floor commercial space, residential apartments and private rooftop terraces."],
  ["infinity-99", "Infinity 99", "GCE-040-26", "200' x 70'", "H-13, Islamabad", "Commercial", "A luxury high-rise tower with a prominent entrance podium, terraced upper levels, geometric cladding and landscaped balconies."],
  ["e16-mixed-use-arcade", "E-16 Mixed-Use Arcade", "GCE-048-26", "50' x 40'", "E-16, Islamabad", "Commercial"],
  ["shafaq-hadi-plaza", "Shafaq Hadi Plaza", "GCE-018-26", "45' x 60'", "PWD, Islamabad", "Commercial"],
  ["taj-residencia-neoclassical-villa", "Taj Residencia Neoclassical Villa", "GCE-024-26", "35' x 70'", "Taj Residencia, Rawalpindi", "Residential"],
  ["trag-mianwali-villa", "TRAG Mianwali Villa", "GCE-025-26", "35' x 70'", "TRAG, Mianwali", "Residential"],
  ["i14-classical-villa", "I-14 Classical Villa", "GCE-105-25", "30' x 60'", "I-14, Islamabad", "Residential"],
  ["i15-mediterranean-villa", "I-15 Mediterranean Villa", "GCE-028-26", "30' x 60'", "I-15, Islamabad", "Residential"],
  ["taj-residencia-corner-villa", "Taj Residencia Corner Villa", "GCE-122-26", "25' x 50'", "Taj Residencia, Rawalpindi", "Residential"],
  ["taj-residencia-neoclassical-villa-two", "Taj Residencia Neoclassical Villa II", "GCE-030-26", "25' x 50'", "Taj Residencia, Rawalpindi", "Residential"],
  ["rehbar-neoclassical-villa", "Rehbar Neoclassical Villa", "GCE-043-26", "25' x 50'", "Rehbar Housing Society, Rawalpindi", "Residential"],
  ["gulberg-greens-neoclassical-villa", "Gulberg Greens Neoclassical Villa", "GCE-016-26", "25' x 50'", "Gulberg Greens, Islamabad", "Residential"],
  ["taj-residencia-mediterranean-villa", "Taj Residencia Mediterranean Villa", "GCE-015-26", "35' x 70'", "Taj Residencia, Rawalpindi", "Residential"],
  ["taj-residencia-calligraphy-house", "Taj Residencia Calligraphy House", "GCE-008-26", "25' x 50'", "Taj Residencia, Rawalpindi", "Residential"],
  ["taj-residencia-contemporary-house", "Taj Residencia Contemporary House", "GCE-082-25", "25' x 50'", "Taj Residencia, Rawalpindi", "Residential"],
  ["i14-3-contemporary-residence", "I-14/3 Contemporary Residence", "GCE-097-25", "30' x 60'", "I-14/3, Islamabad", "Residential"],
  ["taj-residencia-35x70-residence", "Taj Residencia 35x70 Residence", "GCE-102-25", "35' x 70'", "Taj Residencia, Rawalpindi", "Residential"],
  ["taj-residencia-50x90-residence", "Taj Residencia 50x90 Residence", "GCE-099-25", "50' x 90'", "Taj Residencia, Rawalpindi", "Residential"],
  ["multi-gardens-b17-residence", "Multi Gardens B-17 Residence", "GCE-031-25", "50' x 90'", "Multi Gardens B-17, Islamabad", "Residential"],
  ["rehbar-40x60-contemporary-villa", "Rehbar 40x60 Contemporary Villa", "GCE-039-26", "40' x 60'", "Rehbar Housing Society, Rawalpindi", "Residential"],
  ["i15-corner-villa", "I-15 Corner Villa", "GCE-036-26", "30' x 60'", "I-15, Islamabad", "Residential"],
  ["taj-residencia-30x50-neoclassical-villa", "Taj Residencia 30x50 Neoclassical Villa", "GCE-020-26", "30' x 50'", "Taj Residencia, Rawalpindi", "Residential"],
  ["taj-residencia-25x50-contemporary-home", "Taj Residencia 25x50 Contemporary Home", "GCE-121-25", "25' x 50'", "Taj Residencia, Rawalpindi", "Residential"],
  ["i14-3-neoclassical-corner-villa", "I-14/3 Neoclassical Corner Villa", "GCE-106-25", "25' x 50'", "I-14/3, Islamabad", "Residential"],
  ["naval-anchorage-luxury-villa", "Naval Anchorage Luxury Villa", "GCE-086-24", "50' x 90'", "Naval Anchorage, Islamabad", "Residential"],
  ["taj-residencia-minimalist-villa", "Taj Residencia Minimalist Villa", "GCE-004-26", "25' x 50'", "Taj Residencia, Rawalpindi", "Residential"],
  ["taj-residencia-contemporary-corner-villa", "Taj Residencia Contemporary Corner Villa", "GCE-009-26", "35' x 70'", "Taj Residencia, Rawalpindi", "Residential"],
  ["taj-residencia-contemporary-villa-two", "Taj Residencia Contemporary Villa II", "GCE-120-25", "35' x 70'", "Taj Residencia, Rawalpindi", "Residential"],
  ["rehbar-25x50-contemporary-villa", "Rehbar 25x50 Contemporary Villa", "GCE-029-26", "25' x 50'", "Rehbar Housing Society, Rawalpindi", "Residential"],
];

export const projects: Project[] = arcSeeds.map(([slug, title, projectCode, plotSize, location, category, summary], index) => ({
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
  images: galleries[slug] ?? [`/geo-arc/${slug}.webp`],
  status: "completed",
  phases: [],
  pinned: index < 3,
  pinOrder: index < 3 ? index + 1 : undefined,
  order: index + 1,
}));

export const categories = Array.from(new Set(projects.map((project) => project.category)));
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
export const projectIndex = (slug: string) => projects.findIndex((project) => project.slug === slug);
