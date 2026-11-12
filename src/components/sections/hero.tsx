import Image from "next/image";
import { ArrowRight, ChevronRight, Mail } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "cn";
import { mailtoHref, site } from "@/data/site";
import { actionLinkClass } from "@/components/ui/action-link";
import { Starfield } from "@/components/motion/starfield";
import { Horizon } from "@/components/motion/horizon";

/** Stagger index for the CSS entrance animation (see .hero-in in globals.css). */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[linear-gradient(180deg,#050308_0%,#0c0619_38%,#170d33_72%,#1f1247_100%)]"
    >
      <Starfield />
      <Horizon />

      <div className="container-page relative z-10 flex flex-col items-center pt-28 pb-[21vh] text-center sm:pt-36 sm:pb-[30vh] md:pb-[28vh]">
        {/* Badge */}
        <a
          href="#projects"
          className="hero-in glass-flat group inline-flex items-center gap-2.5 rounded-full py-1.5 pr-3 pl-1.5 text-[13px] text-fg-muted transition-colors hover:border-white/20 hover:text-fg sm:text-sm"
          style={step(0)}
        >
          <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-white shadow-[0_0_16px_-2px_var(--brand-glow)]">
            New
          </span>
          <span>
            Real problems, real fixes<span className="max-sm:hidden">: see the case studies</span>
          </span>
          <ChevronRight
            aria-hidden
            className="size-4 text-brand-light transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </a>

        {/* Headline */}
        <h1
          id="hero-title"
          className="hero-in-lcp mt-7 max-w-4xl text-[2.6rem] leading-[1.02] font-bold tracking-[-0.035em] text-fg sm:mt-10 sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          style={step(1)}
        >
          Building software that{" "}
          <span className="headline-accent block pt-1 text-[1.08em] leading-[0.95] tracking-[-0.02em]">
            solves real business problems
          </span>
        </h1>

        {/* Name line */}
        <p
          className="hero-in mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-lg text-fg sm:mt-10 sm:text-xl"
          style={step(2)}
        >
          <span>Hello, I&rsquo;m</span>
          <span className="relative inline-block -skew-x-12 rounded-md bg-gradient-to-r from-brand to-brand-glow px-3 py-1 shadow-[0_8px_30px_-8px_var(--brand-glow),inset_0_1px_0_0_rgb(255_255_255/0.25)]">
            <span className="inline-block skew-x-12 font-heading font-semibold text-white">{site.name}</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-light/50 ring-offset-2 ring-offset-[#0c0619]">
              <Image
                src={site.photo.src}
                alt={site.photo.alt}
                width={site.photo.width}
                height={site.photo.height}
                sizes="44px"
                loading="eager"
                className="size-full object-cover object-[50%_22%]"
              />
            </span>
            <span className="text-fg-muted">
              a <span className="text-fg">{site.role}</span>
            </span>
          </span>
        </p>

        {/* Sub-text */}
        <p
          className="hero-in mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
          style={step(3)}
        >
          {site.description}
        </p>

        {/* Actions */}
        <div
          className="hero-in mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
          style={step(4)}
        >
          <a href="#contact" className={cn(actionLinkClass("glass", "lg"), "gap-3 pr-1.5 pl-6")}>
            Let&rsquo;s Connect
            <span className="grid size-9 place-items-center rounded-full bg-white text-[#0b0614] shadow-[0_0_20px_-4px_rgb(255_255_255/0.6)]">
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-out group-hover/action:translate-x-0.5 motion-reduce:transition-none"
              />
            </span>
          </a>
          <a
            href={mailtoHref("Project enquiry")}
            className="group inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm text-fg-muted transition-colors hover:text-fg sm:text-base"
          >
            <Mail aria-hidden className="size-4 text-brand-light" />
            <span className="underline decoration-white/20 underline-offset-4 transition-[text-decoration-color] group-hover:decoration-brand-light">
              {site.email}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
