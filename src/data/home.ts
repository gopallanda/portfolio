/**
 * Copy for the home page sections below the projects. Edit freely.
 * Icons are names from lucide-react (services) or simple-icons slugs (stack),
 * resolved in the components so this file stays plain data.
 */

export type ServiceIcon = "dashboards" | "tools" | "mobile" | "automation";

export interface Service {
  icon: ServiceIcon;
  title: string;
  description: string;
  examples: string[];
}

export const services: Service[] = [
  {
    icon: "dashboards",
    title: "Dashboards & analytics",
    description:
      "Your numbers from the till, the bank and the spreadsheets, synced automatically into one place you can actually read.",
    examples: ["Sales & labour", "Cash flow", "Multi-branch reports"],
  },
  {
    icon: "tools",
    title: "Internal tools & SaaS",
    description:
      "Software shaped around how your team already works, from a single back-office tool to a multi-tenant product.",
    examples: ["Rotas & staff", "Cost tracking", "Multi-tenant SaaS"],
  },
  {
    icon: "mobile",
    title: "Web → mobile apps",
    description:
      "Turn a web app into Android and iOS apps from one codebase, with geofencing, reminders and push notifications.",
    examples: ["Capacitor", "Push alerts", "App Store releases"],
  },
  {
    icon: "automation",
    title: "Automations & AI",
    description:
      "Scheduled syncs, invoice reading and data clean-up that remove the copy-paste work from your week.",
    examples: ["Scheduled jobs", "AI document reading", "Data matching"],
  },
];

export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Understand the problem",
    description: "A short call about what's slowing you down, what it costs, and what “fixed” looks like.",
  },
  {
    title: "Plan & quote",
    description: "A clear plan with milestones and a written quote, so you know the cost before anything is built.",
  },
  {
    title: "Build in weekly demos",
    description: "You see working software every week and steer it while it's still cheap to change.",
  },
  {
    title: "Launch & support",
    description: "I deploy, hand over, and stay on hand for fixes and the next round of improvements.",
  },
];

export interface StackItem {
  name: string;
  /** simple-icons export name; omitted when no logo exists. */
  icon?:
    | "siNextdotjs"
    | "siReact"
    | "siTypescript"
    | "siTailwindcss"
    | "siShadcnui"
    | "siFramer"
    | "siSupabase"
    | "siPostgresql"
    | "siNodedotjs"
    | "siFirebase"
    | "siCapacitor"
    | "siVercel"
    | "siCloudflare"
    | "siGooglegemini"
    | "siGithub"
    | "siFigma";
}

export const stack: StackItem[] = [
  { name: "Next.js", icon: "siNextdotjs" },
  { name: "React", icon: "siReact" },
  { name: "TypeScript", icon: "siTypescript" },
  { name: "Tailwind CSS", icon: "siTailwindcss" },
  { name: "shadcn/ui", icon: "siShadcnui" },
  { name: "Framer Motion", icon: "siFramer" },
  { name: "Supabase", icon: "siSupabase" },
  { name: "PostgreSQL", icon: "siPostgresql" },
  { name: "Node.js", icon: "siNodedotjs" },
  { name: "Firebase", icon: "siFirebase" },
  { name: "Capacitor", icon: "siCapacitor" },
  { name: "Vercel", icon: "siVercel" },
  { name: "Cloudflare R2", icon: "siCloudflare" },
  { name: "Gemini API", icon: "siGooglegemini" },
  { name: "GitHub", icon: "siGithub" },
  { name: "Figma", icon: "siFigma" },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Set to true until a real quote replaces the placeholder. */
  placeholder: boolean;
}

export const testimonial: Testimonial = {
  quote:
    "TODO: A short quote from a client about the problem you solved for them and what changed afterwards.",
  name: "TODO: Client name",
  role: "TODO: Role, Company",
  placeholder: true,
};

/** Words in the scrolling ticker, after your name. */
export const tickerWords = ["Dashboards", "SaaS", "Mobile apps", "Automations"];
