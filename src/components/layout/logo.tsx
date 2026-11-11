import Link from "next/link";
import { cn } from "cn";
import { site } from "@/data/site";

// The accessible name comes from the text content ("Landa Gopal, home") so it
// always matches what sighted users see (WCAG 2.5.3 Label in Name).
export function Logo({ showName = false }: { showName?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5 rounded-xl">
      <span
        aria-hidden
        className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-light via-brand to-[#3b1a7a] font-heading text-sm font-bold text-white shadow-[0_6px_24px_-6px_var(--brand-glow),inset_0_1px_0_0_rgb(255_255_255/0.35)] transition-transform duration-300 group-hover:-rotate-6 motion-reduce:transition-none"
      >
        {site.initials}
      </span>
      {/* In the navbar the name only shows from lg up; the footer always shows it. */}
      <span
        className={cn(
          "font-heading text-[15px] font-semibold tracking-tight text-fg",
          !showName && "sr-only lg:not-sr-only",
        )}
      >
        {site.name}
      </span>
      <span className="sr-only">, home</span>
    </Link>
  );
}
