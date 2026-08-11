export type Service = { slug: string; title: string; blurb: string; points: string[] };
export const services: Service[] = [
  { slug: "soil-testing", title: "Soil Testing", blurb: "Field investigation and laboratory testing that provides reliable evidence for safe, efficient foundation design.", points: ["Site investigation", "Soil sampling", "Laboratory analysis", "Technical reporting"] },
  { slug: "architectural-design", title: "Architectural Designing", blurb: "Planning, architecture, visualization and interiors for residential, commercial and institutional developments.", points: ["Architectural plans", "3D visualization", "Interior design", "Approval drawings"] },
  { slug: "construction", title: "Construction", blurb: "Accountable civil and construction delivery with clear milestones, quality controls and live progress reporting.", points: ["Residential", "Commercial", "Civil works", "Project management"] },
  { slug: "real-estate-marketing", title: "Real Estate Marketing", blurb: "Positioning, presentation and marketing support that helps quality developments reach the right buyers and investors.", points: ["Project positioning", "Campaigns", "Sales support", "Property marketing"] },
  { slug: "material-supply", title: "Material Suppliers", blurb: "Coordinated sourcing and supply of construction materials with attention to quality, specification and site schedules.", points: ["Material sourcing", "Quality checks", "Site delivery", "Vendor coordination"] },
];
