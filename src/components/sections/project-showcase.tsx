"use client";

import Image from "next/image";
import Link from "next/link";
import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { cn } from "cn";
import type { Project } from "@/data/projects";
import { tints } from "@/lib/tints";
import { BrowserFrame } from "@/components/ui/browser-frame";

// Only real, public addresses go in the fake address bar.
const hostFor = (p: Project) => (p.liveUrl ? new URL(p.liveUrl).host : undefined);

/**
 * The coloured half of a project row: pitch line plus the real screenshot in a
 * browser frame, with a second screen layered behind it. Lifts and glows on
 * hover; the screenshots drift slightly with scroll (off for reduced motion).
 */
export function ProjectShowcase({ project, href }: { project: Project; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const frontY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [36, -28]);
  const backY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -50]);
  const tint = tints[project.tint];
  const isExternal = href.startsWith("http");

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* The whole card is a shortcut to the same destination as the panel button.
          It is skipped by keyboard and screen readers to avoid a duplicate link. */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          "group relative isolate flex h-[26rem] flex-col overflow-hidden rounded-[2rem] border border-white/10 p-6 sm:h-[34rem] sm:p-9",
          "transition-[translate,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 motion-reduce:hover:translate-y-0",
          "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.12)] hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.16),0_30px_90px_-30px_var(--card-glow)] hover:border-[color:var(--card-rim)]",
          tint.card,
        )}
        style={{ "--card-glow": tint.glow, "--card-rim": tint.rim } as CSSProperties}
      >
        {/* Fine grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
        />

        <p className={cn("text-xs font-semibold tracking-[0.16em] uppercase", tint.label)}>
          {project.kind} · {project.platforms}
        </p>
        <p className="mt-3 max-w-md font-heading text-2xl leading-tight font-semibold tracking-tight text-white sm:text-[1.75rem]">
          {project.pitch}
        </p>

        {/* Screens */}
        <div className="relative mt-8 flex-1 sm:mt-10">
          {project.coverBack && (
            <m.div style={{ y: backY }} className="absolute -top-2 right-[-14%] w-[78%] opacity-55 sm:-top-4">
              <BrowserFrame className="rotate-[3deg] scale-95">
                <Image
                  src={project.coverBack.src}
                  alt=""
                  width={project.coverBack.width}
                  height={project.coverBack.height}
                  sizes="(min-width: 1024px) 400px, 70vw"
                  className="h-auto w-full"
                />
              </BrowserFrame>
            </m.div>
          )}

          <m.div style={{ y: frontY }} className="relative mt-12 w-[112%] sm:mt-16">
            <BrowserFrame url={hostFor(project)}>
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.cover.width}
                height={project.cover.height}
                sizes="(min-width: 1024px) 620px, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </BrowserFrame>
          </m.div>
        </div>

        {/* Bottom fade so the frame melts into the card edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent"
        />
      </Link>
    </m.div>
  );
}
