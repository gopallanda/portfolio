import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ViewTransition, type CSSProperties } from "react";
import { isFilled, type CaseStudy, type Project } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { TechBadge } from "@/components/ui/tech-badge";
import { Starfield } from "@/components/motion/starfield";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function CaseStudyHeader({ project, caseStudy }: { project: Project; caseStudy: CaseStudy }) {
  const meta: { label: string; value: string; sub?: string }[] = [
    project.kind === "Client"
      ? { label: "Client", value: project.client }
      : { label: "Product", value: project.client, sub: project.kind },
    { label: "My role", value: caseStudy.role },
    { label: "Timeline", value: caseStudy.timeline },
    { label: "Platforms", value: project.platforms },
  ].filter((item) => isFilled(item.value));
  const metaCols = meta.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3";

  return (
    <header className="relative isolate overflow-hidden pt-32 pb-12 sm:pt-40">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[46rem] bg-[radial-gradient(70%_60%_at_50%_0%,rgb(76_29_149/0.55),transparent_70%)]"
      />
      <Starfield className="-z-10 h-[40rem] opacity-60" />

      <div className="container-page">
        {/* Entrance uses the CSS .hero-in stagger so the top of the page paints without waiting for JS. */}
        <Link
          href="/#projects"
          className="hero-in group inline-flex items-center gap-2 rounded-full text-sm text-fg-muted transition-colors hover:text-fg"
          style={step(0)}
        >
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none"
          />
          All projects
        </Link>

        <p
          className="hero-in mt-8 text-xs font-semibold tracking-[0.18em] text-brand-light uppercase"
          style={step(1)}
        >
          Case study
        </p>
        <h1
          className="hero-in-lcp mt-3 max-w-4xl text-4xl leading-[1.02] font-bold tracking-[-0.035em] sm:text-6xl md:text-7xl"
          style={step(1)}
        >
          {project.title}
        </h1>
        <p
          className="hero-in mt-5 max-w-2xl font-serif text-2xl leading-snug text-fg-muted italic sm:text-3xl"
          style={step(2)}
        >
          {project.pitch}
        </p>

        {/* Meta row */}
        <dl
          className={`hero-in mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 ${metaCols}`}
          style={step(3)}
        >
          {meta.map((item) => (
            <div key={item.label} className="bg-surface/95 px-5 py-4">
              <dt className="text-[11px] font-semibold tracking-[0.16em] text-fg-muted uppercase">{item.label}</dt>
              <dd className="mt-1.5 text-sm leading-snug font-medium text-fg">
                {item.value}
                {item.sub && <span className="block text-xs font-normal text-fg-muted">{item.sub}</span>}
              </dd>
            </div>
          ))}
        </dl>

        <div className="hero-in mt-4 flex flex-wrap items-center gap-2" style={step(3)}>
          <span className="mr-1 text-[11px] font-semibold tracking-[0.16em] text-fg-muted uppercase">Stack</span>
          <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li key={tech}>
                <TechBadge>{tech}</TechBadge>
              </li>
            ))}
          </ul>
        </div>

        {/* Hero screenshot: the LCP element, so it loads eagerly at high priority. */}
        <figure className="hero-in-lcp mt-12 sm:mt-16" style={step(4)}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-x-6 -top-6 bottom-10 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_30%,rgb(139_92_246/0.35),transparent_75%)] blur-2xl"
            />
            {/* Pairs with the home page card cover: the screenshot morphs between them. */}
            <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
            <BrowserFrame url={project.liveUrl ? new URL(project.liveUrl).host : undefined}>
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.cover.width}
                height={project.cover.height}
                sizes="(min-width: 1152px) 1088px, 94vw"
                loading="eager"
                fetchPriority="high"
                className="h-auto w-full"
              />
            </BrowserFrame>
            </ViewTransition>
          </div>
          {project.cover.caption && (
            <figcaption className="mt-4 text-center text-sm text-fg-muted">{project.cover.caption}</figcaption>
          )}
        </figure>
      </div>
    </header>
  );
}
