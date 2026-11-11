import { site } from "@/data/site";
import { stack } from "@/data/home";

/** Placeholder values ("TODO…" or example.com) are left out of structured data. */
const real = (value: string | undefined) =>
  value && !value.includes("TODO") && !value.includes("example.com") ? value : undefined;

export function personJsonLd() {
  // Profiles only: a WhatsApp chat link isn't a profile page.
  const sameAs = site.socials
    .filter((s) => s.platform !== "whatsapp" && real(s.href))
    .map((s) => s.href);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: real(site.url),
    image: real(site.url) ? `${site.url}${site.photo.src}` : undefined,
    email: real(site.email) ? `mailto:${site.email}` : undefined,
    telephone: `+${site.phoneDigits}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: sameAs.length ? sameAs : undefined,
    knowsAbout: stack.map((s) => s.name),
  };

  return data;
}

/** Serialise JSON-LD safely for a <script> tag. */
export const toJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
