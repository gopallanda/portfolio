import { Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, mailtoHref, site, telHref } from "@/data/site";
import { SocialIcon } from "@/components/ui/social-icon";
import { Logo } from "./logo";

async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-brand-light/50 to-transparent"
      />
      <div className="container-page flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-4">
          <Logo showName />
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
            {site.role} building dashboards, internal tools, mobile apps and SaaS for businesses.
          </p>
          <address className="flex flex-col gap-2 text-sm text-fg-muted not-italic">
            <span className="flex items-start gap-2">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-light" />
              {fullAddress}
            </span>
            <a href={telHref} className="flex items-center gap-2 rounded transition-colors hover:text-fg">
              <Phone aria-hidden className="size-4 shrink-0 text-brand-light" />
              {site.phone}
            </a>
            <a href={mailtoHref()} className="flex items-center gap-2 rounded transition-colors hover:text-fg">
              <Mail aria-hidden className="size-4 shrink-0 text-brand-light" />
              {site.email}
            </a>
          </address>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
          {site.nav.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              className="rounded text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ul className="flex items-center gap-2" aria-label="Social links">
          {site.socials.map((s) => (
            <li key={s.platform}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} (opens in a new tab)`}
                className="glass-flat glow-hover grid size-11 place-items-center rounded-full text-fg-muted transition-colors hover:text-fg"
              >
                <SocialIcon platform={s.platform} className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-fg-muted sm:flex-row">
          <p>
            © <CurrentYear /> {site.name}. All rights reserved.
          </p>
          <p>Built with Next.js and Tailwind CSS. Hosted on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
