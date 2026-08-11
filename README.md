# Unique Construction & Engineering Services — Website

Marketing site for **Unique Construction & Engineering Services (Pvt) Limited** — an
ISO-certified EPC contractor based in Sukkur, Sindh, Pakistan.

> **⚠️ This is a DEMO build for client review — not the finished site.**
> See [Demo status](#demo-status) below before treating anything here as final.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) + Lenis smooth scroll |
| Font | Bai Jamjuree (`next/font`) |
| Hosting | Vercel |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Pages

| Route | Description |
|---|---|
| `/` | Hero, about, client grid, services, scroll-driven project showcase, testimonials |
| `/about` | Company story, mission/vision/values, certifications, clients |
| `/services` | Eight service disciplines |
| `/projects` | Filterable project grid |
| `/projects/[slug]` | Scroll-driven project gallery with prev/next (16 pages, statically generated) |
| `/contact` | Enquiry form, offices, WhatsApp, map |

## Content

All content is **hard-coded** in `src/data/` — there is no CMS or database yet:

- `company.ts` — company details, offices, certifications, stats, clients
- `services.ts` — eight service disciplines
- `projects.ts` — 16 projects with client, location, scope and images
- `testimonials.ts` — placeholder testimonials

To change copy, edit these files and redeploy.

---

## Demo status

This build exists so the client can review the design and structure. The following
are **known and intentional** at this stage:

**Photography is placeholder.** The construction photos in `public/img/` were taken
from a different contractor's company profile (Eldad Engineering & Construction,
Kenya) purely to show what the layout looks like with real site photography. They do
**not** depict Unique Construction's projects and must be replaced with the client's
own photographs before this site is presented as the company's live website.

**Testimonials are placeholder.** `src/data/testimonials.ts` contains generic,
unattributed quotes. They are not real client references. Replace them with approved
testimonials before launch.

**The contact form does not send mail.** Submitting shows a success state only. Wiring
it to email (Resend → the company inbox) is a pending task.

**No admin panel.** Content is edited in code. A Supabase-backed admin panel where the
client can add and edit projects themselves is planned but not built.

## Roadmap

- [ ] Replace all photography with the client's own project photos
- [ ] Replace placeholder testimonials with approved client references
- [ ] Wire the contact form to email (Resend) and add spam protection
- [ ] Admin panel (Supabase auth + Postgres + image storage)
- [ ] Connect custom domain
