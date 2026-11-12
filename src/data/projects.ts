/**
 * Projects shown on the home page and as case studies at /projects/[slug].
 *
 * To add a project: drop screenshots in /public/projects/<slug>/ and add an
 * entry below. Projects without `caseStudy` link to their live site instead.
 */

export type ProjectTint = "violet" | "emerald" | "teal" | "red";

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface ProblemCase {
  problem: string;
  built: string;
  result: string;
}

export interface ArchitectureNode {
  label: string;
  detail?: string;
}

/** Left-to-right columns of boxes; arrows are drawn between columns. */
export type Architecture = ArchitectureNode[][];

export interface CaseStudy {
  role: string;
  timeline: string;
  /** The brief in the client's own words. */
  brief: string;
  problems: ProblemCase[];
  architecture: Architecture;
}

export interface Project {
  slug: string;
  title: string;
  /** "Client" for client work, "My own product" for products I own. */
  kind: "Client" | "My own product";
  client: string;
  platforms: string;
  pitch: string;
  tagline: string;
  description: string;
  problemsSolved: string[];
  stack: string[];
  tint: ProjectTint;
  cover: Screenshot;
  /** Optional second screenshot layered behind the cover on the home card. */
  coverBack?: Screenshot;
  gallery: Screenshot[];
  liveUrl?: string;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "peckers-cash-flow",
    title: "Peckers Cash Flow",
    kind: "Client",
    client: "UK restaurant brand",
    platforms: "Web + Android/iOS",
    pitch: "Sales, labour and cash flow for every branch, in one app.",
    tagline: "Analytics, rota and cash flow for a multi-branch restaurant brand",
    description:
      "An analytics and cash-flow platform for a multi-branch UK restaurant brand (Hitchin & Stevenage), plus a staff app for clocking in on site.",
    problemsSolved: [
      "Daily EPOS sales sync into Supabase automatically: a scheduled job calls a secured Vercel API route, and daily and weekly schedules share one auth layer.",
      "Fixed failing sync jobs (a 503 from a broken deploy, a 401 from missing credentials) and a silent Vercel CPU-quota deploy block.",
      "Turned the web app into Android/iOS apps with Capacitor: geofenced clock-in/out, shift reminders and real-time alerts via Firebase.",
      "Built and signed the iOS app in the cloud with Codemagic, with no Mac needed.",
      "Executive, Product Analysis and Delivery Platform dashboards across multiple years.",
    ],
    stack: ["Next.js", "Supabase", "Vercel", "Capacitor", "Firebase", "Codemagic"],
    tint: "violet",
    cover: {
      src: "/projects/peckers-cash-flow/cashflow-live-dashboard.png",
      alt: "Live daily dashboard showing staff on shift, wages so far and clock-in status for two restaurant branches",
      width: 1750,
      height: 899,
      caption: "Live daily dashboard: who is on shift right now, across both stores",
    },
    coverBack: {
      src: "/projects/peckers-cash-flow/cashflow-shift-rota.png",
      alt: "Weekly shift rota grid with hours per employee and cover driver overview",
      width: 1756,
      height: 895,
    },
    gallery: [
      {
        src: "/projects/peckers-cash-flow/cashflow-live-dashboard.png",
        alt: "Live daily dashboard showing staff on shift, wages so far and clock-in status for two restaurant branches",
        width: 1750,
        height: 899,
        caption: "Live daily dashboard, refreshed every 30 seconds",
      },
      {
        src: "/projects/peckers-cash-flow/cashflow-shift-rota.png",
        alt: "Weekly shift rota grid with hours per employee and cover driver overview",
        width: 1756,
        height: 895,
        caption: "Weekly shift rota with staff borrowed from other stores",
      },
    ],
    caseStudy: {
      role: "Sole developer: design, build, deploy and support",
      timeline: "TODO: e.g. 2025 – present",
      brief: "TODO: the client's brief in their own words.",
      // TODO: confirm. The "problem" lines are drafted from your bullet points.
      problems: [
        {
          problem: "Sales figures were copied out of the EPOS by hand, so reports were always behind.",
          built:
            "A scheduled job (cron-job.org) calls a secured Vercel API route with a secret header. Daily and weekly syncs share one auth layer and write straight into Supabase.",
          result: "TODO: e.g. sales land in the dashboard every morning with no manual work.",
        },
        {
          problem: "Sync jobs started failing quietly: a 503, then a 401, then deploys stopped going out.",
          built:
            "Traced the 503 to a broken deploy, the 401 to missing credentials, and the blocked deploys to a silent Vercel Hobby CPU quota. Fixed all three.",
          result: "TODO: e.g. syncs have run reliably since.",
        },
        {
          problem: "Managers couldn't trust timesheets: staff clocked in from anywhere, or forgot.",
          built:
            "Wrapped the web app in Capacitor for Android and iOS, with geofenced clock-in/out, shift reminders and real-time alerts through Firebase.",
          result: "TODO: e.g. clock-ins only count on site, and late shifts are flagged live.",
        },
        {
          problem: "Shipping an iOS app normally needs a Mac and a lot of manual signing.",
          built: "Set up Codemagic to build and sign the iOS app in the cloud.",
          result: "iOS releases go out without a Mac.",
        },
        {
          problem: "Owners had no single view of how each branch was doing across the years.",
          built: "Executive, Product Analysis and Delivery Platform dashboards spanning multiple years of data.",
          result: "TODO: e.g. weekly reviews now take minutes, not hours.",
        },
      ],
      architecture: [
        [
          { label: "EPOS", detail: "Daily sales" },
          { label: "cron-job.org", detail: "Daily + weekly schedules" },
        ],
        [{ label: "Vercel API route", detail: "Secret-header auth" }],
        [{ label: "Supabase", detail: "Postgres + Auth" }],
        [
          { label: "Next.js dashboards", detail: "Web" },
          { label: "Capacitor app", detail: "Android + iOS" },
        ],
        [
          { label: "Firebase", detail: "Real-time alerts" },
          { label: "Codemagic", detail: "Cloud iOS builds" },
        ],
      ],
    },
  },
  {
    slug: "renovatrack",
    title: "RenovaTrack",
    kind: "Client",
    client: "Renovation business",
    platforms: "Web",
    pitch: "Upload an invoice. Every line item lands in the right project.",
    tagline: "Renovation cost tracking with AI-read supplier invoices",
    description:
      "Renovation cost tracking where supplier invoices are read by AI instead of typed in by hand.",
    problemsSolved: [
      "Invoice line items are extracted by a vision AI model (Gemini Flash). PDFs that already have a text layer are detected first with unpdf to save cost.",
      "The same supplier or material under many spellings now maps to one canonical record through alias tables.",
      "Inline supplier creation is guarded by VAT-number matching and an \"unverified\" flag.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Gemini"],
    tint: "emerald",
    cover: {
      src: "/projects/renovatrack/renovatrack-project-overview.png",
      alt: "Renovation project overview showing cost to date against budget and items that cost more than last time",
      width: 1900,
      height: 981,
      caption: "Project overview: cost to date, budget and price rises",
    },
    coverBack: {
      src: "/projects/renovatrack/renovatrack-invoices.png",
      alt: "Invoices page with upload and manual entry options and a list of invoices received by email",
      width: 1915,
      height: 987,
    },
    gallery: [
      {
        src: "/projects/renovatrack/renovatrack-project-overview.png",
        alt: "Renovation project overview showing cost to date against budget and items that cost more than last time",
        width: 1900,
        height: 981,
        caption: "Project overview with price-rise alerts",
      },
      {
        src: "/projects/renovatrack/renovatrack-invoices.png",
        alt: "Invoices page with upload and manual entry options and a list of invoices received by email",
        width: 1915,
        height: 987,
        caption: "Invoices arrive by email or upload and are read automatically",
      },
    ],
    caseStudy: {
      role: "Sole developer",
      timeline: "TODO: e.g. 2026",
      brief: "TODO: the client's brief in their own words.",
      // TODO: confirm. The "problem" lines are drafted from your bullet points.
      problems: [
        {
          problem: "Every supplier invoice was typed in line by line.",
          built:
            "Invoices are read by Gemini Flash. PDFs with a text layer are detected first with unpdf so the vision model only runs when it's needed.",
          result: "TODO: e.g. an invoice takes seconds to check instead of minutes to type.",
        },
        {
          problem: "The same supplier and material appeared under many spellings, so totals didn't add up.",
          built: "Canonical supplier and material records with alias tables that absorb every spelling.",
          result: "TODO: e.g. price history per material is finally accurate.",
        },
        {
          problem: "Creating suppliers on the fly risked duplicates and fake entries.",
          built: "Inline supplier creation guarded by VAT-number matching and an \"unverified\" flag for review.",
          result: "TODO",
        },
      ],
      architecture: [
        [
          { label: "Upload", detail: "Photo or PDF" },
          { label: "Mailbox", detail: "Invoices by email" },
        ],
        [{ label: "unpdf", detail: "Text-layer check" }],
        [{ label: "Gemini Flash", detail: "Vision extraction" }],
        [{ label: "Alias matching", detail: "Suppliers + materials" }],
        [{ label: "Supabase", detail: "Projects, costs, history" }],
      ],
    },
  },
  {
    slug: "hms",
    title: "HMS: Hospital Management System",
    kind: "My own product",
    client: "Healthcare SaaS for India",
    platforms: "Web",
    pitch: "Know which doctors are in OPD right now, live.",
    tagline: "Multi-hospital SaaS with a live doctor status board",
    description:
      "A multi-hospital SaaS for Indian hospitals, with live doctor clock-in and OPD status as its key feature.",
    problemsSolved: [
      "Many hospitals share one database with zero data leaks: shared Postgres with Row-Level Security, and hospital_id carried in JWT claims.",
      "Real-time doctor clock-in and an OPD status board.",
      "Data schema aligned with ABDM / FHIR from day one.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Cloudflare R2"],
    tint: "teal",
    cover: {
      src: "/projects/hms/hms-overview.png",
      alt: "Hospital admin overview with departments, staff, doctors taking OPD and quick actions",
      width: 1917,
      height: 986,
      caption: "Hospital overview with quick actions for the front desk",
    },
    coverBack: {
      src: "/projects/hms/hms-new-vs-return.png",
      alt: "New versus returning patients report with weekly bar chart",
      width: 1917,
      height: 987,
    },
    gallery: [
      {
        src: "/projects/hms/hms-overview.png",
        alt: "Hospital admin overview with departments, staff, doctors taking OPD and quick actions",
        width: 1917,
        height: 986,
        caption: "Admin overview",
      },
      {
        src: "/projects/hms/hms-new-vs-return.png",
        alt: "New versus returning patients report with weekly bar chart",
        width: 1917,
        height: 987,
        caption: "New vs returning patients report",
      },
    ],
    caseStudy: {
      role: "Founder and sole developer",
      timeline: "TODO: e.g. 2026 – present",
      brief: "TODO: the problem in a hospital's own words.",
      // TODO: confirm. The "problem" lines are drafted from your bullet points.
      problems: [
        {
          problem: "Each hospital's data has to stay private, but running a database per hospital is expensive.",
          built: "One shared Postgres with Row-Level Security; hospital_id travels in JWT claims so every query is scoped.",
          result: "TODO",
        },
        {
          problem: "Patients and front desks never know which doctors are actually in OPD.",
          built: "Real-time doctor clock-in feeding a live OPD status board.",
          result: "TODO",
        },
        {
          problem: "India's digital health stack (ABDM) needs standard records.",
          built: "Data schema aligned with ABDM / FHIR from day one.",
          result: "TODO",
        },
      ],
      architecture: [
        [
          { label: "Front desk", detail: "Register, bill, queue" },
          { label: "Doctors", detail: "Clock-in, my queue" },
        ],
        [{ label: "Next.js app", detail: "Per-hospital workspace" }],
        [
          { label: "Supabase Auth", detail: "hospital_id in JWT" },
          { label: "Postgres + RLS", detail: "One DB, many hospitals" },
        ],
        [
          { label: "Realtime", detail: "Live OPD board" },
          { label: "Cloudflare R2", detail: "Files and reports" },
        ],
      ],
    },
  },
  {
    slug: "peckers-website",
    title: "Peckers Website",
    kind: "Client",
    client: "UK restaurant brand",
    platforms: "Web",
    pitch: "A restaurant website that grows with every new branch.",
    tagline: "Multi-location restaurant website",
    description: "The public website for a growing UK restaurant brand, built to add new branches easily.", // TODO: refine
    problemsSolved: [
      "Added the new Welwyn Garden City branch to the multi-location site.",
      // TODO: more improvements
    ],
    stack: ["Next.js"], // TODO: confirm stack
    tint: "red",
    liveUrl: "https://peckerschicken.co.uk",
    cover: {
      src: "/projects/peckers-website/peckers-home.png",
      alt: "Peckers restaurant homepage with the headline Seriously Good Chicken over a close-up of fried chicken",
      width: 1917,
      height: 982,
    },
    coverBack: {
      src: "/projects/peckers-website/peckers-menu.png",
      alt: "Peckers menu page showing a wings carousel",
      width: 1917,
      height: 978,
    },
    gallery: [
      {
        src: "/projects/peckers-website/peckers-home.png",
        alt: "Peckers restaurant homepage with the headline Seriously Good Chicken",
        width: 1917,
        height: 982,
      },
      {
        src: "/projects/peckers-website/peckers-menu.png",
        alt: "Peckers menu page showing a wings carousel",
        width: 1917,
        height: 978,
      },
      {
        src: "/projects/peckers-website/peckers-sauces.png",
        alt: "Peckers sauces page featuring Peanut Sweet Chilli",
        width: 1917,
        height: 985,
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** True once a value has real content. "TODO…" placeholders are hidden on the live site. */
export const isFilled = (value: string | undefined): value is string =>
  Boolean(value && value.trim() && !value.trim().startsWith("TODO"));

export const caseStudyProjects = () => projects.filter((p) => p.caseStudy);
