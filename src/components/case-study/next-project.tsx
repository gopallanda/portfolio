import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "cn";
import type { Project } from "@/data/projects";
import { tints } from "@/lib/tints";
import { Reveal } from "@/components/motion/reveal";

export function NextProject({ project }: { project: Project }) {
  const tint = tints[project.tint];
  return (
    <Reveal>
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "group relative isolate grid overflow-hidden rounded-[2rem] border border-white/10 p-7 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:p-10",
          "transition-[box-shadow,border-color] duration-500 hover:border-[color:var(--card-rim)] hover:shadow-[0_30px_90px_-30px_var(--card-glow)]",
          tint.card,
        )}
        style={{ "--card-glow": tint.glow, "--card-rim": tint.rim } as CSSProperties}
      >
        <div>
          <p className={cn("text-xs font-semibold tracking-[0.18em] uppercase", tint.label)}>Next case study</p>
          <p className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">{project.title}</p>
          <p className="mt-2 max-w-lg text-white/75">{project.pitch}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
            Read case study
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </span>
        </div>
        <div className="relative mt-8 hidden w-72 overflow-hidden rounded-xl border border-white/15 shadow-2xl sm:mt-0 md:block">
          <Image
            src={project.cover.src}
            alt=""
            width={project.cover.width}
            height={project.cover.height}
            sizes="288px"
            className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        </div>
      </Link>
    </Reveal>
  );
}
