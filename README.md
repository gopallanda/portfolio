# Portfolio 2026

Personal portfolio for a freelance full-stack developer (Next.js + Supabase). Built to win clients: problem-led copy, real project screenshots, case studies and a clear way to get in touch.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript (strict) · Tailwind CSS 4 · shadcn/ui (Base UI) · Motion (Framer Motion) · lucide-react · simple-icons. Deploys to Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # production build (must pass before deploying)
npm run start      # serve the production build
```

## Before you launch

Search the project for `TODO` and replace every placeholder:

- `src/data/site.ts`: the production URL (`url`). Name, contact details, address and socials are already filled in.
- `src/data/home.ts`: the testimonial (then set `placeholder: false`).
- `src/data/projects.ts`: case-study brief, timeline and result lines, plus the Peckers Website details.
- `public/images/profile.jpg`: your photo (used in the hero and the social share image).

## Edit content

All content lives in typed data files. Components never hard-code copy.

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Name, role, contact links, socials, navigation |
| `src/data/projects.ts` | Projects on the home page and the `/projects/[slug]` case studies |
| `src/data/home.ts` | Services, How I work steps, tech stack, testimonial, ticker words |

## Add a new project

1. Put screenshots in `public/projects/<project-slug>/` with kebab-case names, e.g. `public/projects/acme-crm/acme-crm-dashboard.png`.
2. Add an entry to the `projects` array in `src/data/projects.ts`:
   - `cover` (required) is the main screenshot. `coverBack` is an optional second screen layered behind it on the home card.
   - Give every screenshot its real `width` and `height` in pixels and a descriptive `alt`.
   - `tint` picks the card colour: `"violet" | "emerald" | "teal" | "red"` (add more in `src/lib/tints.ts`).
   - Add a `caseStudy` object to get a `/projects/<slug>` page, or set `liveUrl` instead to link straight to the live site.
3. Run `npm run build`. The case study page, sitemap entry and share metadata are generated automatically.

## Project structure

```
src/
  app/                    routes, metadata, sitemap.ts, robots.ts, OG/Twitter images, icons
    projects/[slug]/      case study pages (prerendered from projects.ts)
  components/
    layout/               navbar, mobile menu (lazy-loaded), footer, logo
    sections/             home page sections (hero, projects, services, process, stack, ...)
    case-study/           case study building blocks (header, problem cards, diagram, gallery)
    motion/               Reveal / Stagger wrappers, starfield, horizon, marquee, checklist
    ui/                   shadcn/ui components + shared pieces (ActionLink, BrowserFrame, ...)
  data/                   all site content (typed)
  lib/                    tints, SEO helpers (JSON-LD), share-image renderer
```

## Notes

- **Animation:** scroll reveals use Motion. The hero entrance, starfield, horizon and ticker are plain CSS so they start on first paint. Everything respects `prefers-reduced-motion`, and the ticker has a pause button.
- **Performance:** the Motion engine loads after the page is idle, and the mobile menu's dialog code loads on first open. Images go through `next/image` with AVIF/WebP.
- **Accessibility:** semantic landmarks, a skip link, visible focus rings, alt text on every screenshot, labelled icon buttons, and text colours that pass 4.5:1.
