export const company = {
  name: "GEO Group of Companies",
  legalName: "GEO Group of Companies",
  short: "GEO Group",
  abbr: "GEO",
  tagline: "One Group. Three Disciplines.",
  founded: "",
  ceo: { name: "GEO Group Leadership", role: "Architecture · Engineering · Construction" },
  intro: "GEO Group of Companies brings soil testing, architectural designing, construction, real estate marketing and material supply together under one accountable team.",
  ethos: "From the first line on paper to evidence beneath the foundation and disciplined delivery on site, our specialists turn complex requirements into clear, buildable outcomes.",
  mission: ["Design purposeful, context-aware spaces.", "Deliver reliable geotechnical evidence before construction begins.", "Execute projects with quality, safety and visible accountability."],
  vision: "To be Pakistan's trusted integrated partner for design, testing, construction and property development.",
  values: "Creative thinking, technical evidence and disciplined execution - connected by one standard of quality.",
  stats: [
    { value: 3, suffix: "", label: "Core divisions" },
    { value: 30, suffix: "+", label: "Architecture projects" },
    { value: 5, suffix: "", label: "Integrated services" },
    { value: 1, suffix: "", label: "Accountable group" },
  ],
  certifications: [
    { code: "GEO ARC", title: "Architecture & Design", body: "Residential, commercial and institutional design" },
    { code: "GEO Soil Testing", title: "Geotechnical Laboratory", body: "Field investigation and laboratory analysis" },
    { code: "GEO Construction", title: "Civil & Construction", body: "Planning, execution and project delivery" },
  ],
  offices: [{ label: "Head Office", lines: ["House No. 1874-C, 3 Main Double Road", "I-14/3, Islamabad, 44000, Pakistan"], phones: ["000-0000000"] }],
  email: "info@geogroupofcompanies.com",
  website: "https://geogroupofcompanies.com",
  whatsapp: "000000000000",
  whatsappMessage: "Hello GEO Group, I would like to discuss a project with your team.",
  socials: [{ label: "Facebook", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "Instagram", href: "#" }],
} as const;

export const clients = ["Architecture", "Soil Investigation", "Residential", "Commercial", "Infrastructure", "Real Estate", "Material Supply", "Islamabad", "Rawalpindi", "Pakistan"] as const;
