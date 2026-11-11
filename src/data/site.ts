/**
 * Everything personal lives here. Replace every `TODO:` value before launch.
 */

export type SocialPlatform = "github" | "linkedin" | "instagram" | "whatsapp";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface Address {
  city: string;
  region: string;
  country: string;
  postalCode: string;
}

export interface SiteConfig {
  name: string;
  /** Short mark shown in the navbar, e.g. "JD". */
  initials: string;
  role: string;
  tagline: string;
  description: string;
  url: string;
  address: Address;
  email: string;
  /** Human-readable phone number. */
  phone: string;
  /** International format, digits only (country code first), used for tel: and WhatsApp links. */
  phoneDigits: string;
  photo: { src: string; alt: string; width: number; height: number };
  socials: SocialLink[];
  nav: NavItem[];
}

const name = "Landa Gopal";
const phoneDigits = "918260967408"; // +91 India

export const site: SiteConfig = {
  name,
  initials: "LG",
  role: "Full-Stack Developer",
  tagline: "Building software that solves real business problems",
  description:
    "Dashboards, internal tools, mobile apps and SaaS on Next.js & Supabase. Lean to build, cheap to run, and made for how your business actually works.",
  url: "https://example.com", // TODO: your production domain (no trailing slash)
  address: {
    city: "Berhampur",
    region: "Odisha",
    country: "India",
    postalCode: "761010",
  },
  email: "landagopal98@gmail.com",
  phone: "+91 82609 67408",
  phoneDigits,
  photo: {
    src: "/images/profile.jpg",
    alt: `Portrait of ${name}`,
    width: 2252,
    height: 2429,
  },
  socials: [
    { platform: "github", label: "GitHub", href: "https://github.com/gopallanda" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/landa-gopal-247613290" },
    { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/gopal_landa98" },
    { platform: "whatsapp", label: "WhatsApp", href: `https://wa.me/${phoneDigits}` },
  ],
  nav: [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "stack", label: "Stack" },
    { id: "contact", label: "Contact" },
  ],
};

/** "Berhampur, Odisha, India 761010" */
export const fullAddress = `${site.address.city}, ${site.address.region}, ${site.address.country} ${site.address.postalCode}`;

export const whatsappHref = (message?: string) =>
  `https://wa.me/${site.phoneDigits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const telHref = `tel:+${site.phoneDigits}`;

export const mailtoHref = (subject?: string) =>
  `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
