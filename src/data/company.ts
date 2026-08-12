export const company = {
  name: "GEO Group of Companies",
  legalName: "GEO Group of Companies",
  short: "GEO Group",
  abbr: "GEO",
  tagline: "One Group. Three Disciplines.",
  founded: "3 August 2008",
  ceo: { name: "Dr. Babar Khan", role: "Chairman, GEO Group of Companies" },
  intro: "GEO Group of Companies brings soil testing, architectural designing, construction, real estate marketing and material supply together under one accountable team.",
  ethos: "From the first line on paper to evidence beneath the foundation and disciplined delivery on site, our specialists turn complex requirements into clear, buildable outcomes.",
  mission: ["Design purposeful, context-aware spaces.", "Deliver reliable geotechnical evidence before construction begins.", "Execute projects with quality, safety and visible accountability."],
  vision: "To be Pakistan's trusted integrated partner for design, testing, construction and property development.",
  values: "Creative thinking, technical evidence and disciplined execution - connected by one standard of quality.",
  stats: [
    { value: 3, suffix: "", label: "Core divisions" },
    { value: 78, suffix: "+", label: "Verified project records" },
    { value: 12, suffix: "+", label: "Integrated capabilities" },
    { value: 1, suffix: "", label: "Accountable group" },
  ],
  certifications: [
    { code: "GEO ARC", title: "Architecture & Design", body: "Residential, commercial and institutional design" },
    { code: "PEC 52036", title: "Geotechnical & Material Testing", body: "Geoservices Engineering Consultants" },
    { code: "PEC 19870 · C4/E", title: "Civil & Construction", body: "GEO Services Engineering profile record" },
  ],
  offices: [
    { label: "Head Office", lines: ["Office No. 1874-C, Main Double Road", "Sector I-14/3, Islamabad, Pakistan"], phones: ["0333-3404585", "0333-1634888", "051-5582017"] },
    { label: "Material Testing Lab", lines: ["Geo House, New Fort Road", "Old Chakra, Rawalpindi, Pakistan"], phones: ["0333-3404585"] },
  ],
  email: "geoservices.gec@gmail.com",
  website: "https://geogroupofcompanies.com",
  whatsapp: "000000000000",
  whatsappMessage: "Hello GEO Group, I would like to discuss a project with your team.",
  socials: [{ label: "Facebook", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "Instagram", href: "#" }],
} as const;

export const clients = ["Architecture", "Soil Investigation", "Residential", "Commercial", "Infrastructure", "Real Estate", "Material Supply", "Islamabad", "Rawalpindi", "Pakistan"] as const;
