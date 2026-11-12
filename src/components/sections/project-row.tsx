import { cn } from "cn";
import type { Project } from "@/data/projects";
import { ActionLink } from "@/components/ui/action-link";
import { TechBadge } from "@/components/ui/tech-badge";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { AnimatedChecklist } from "@/components/motion/animated-checklist";
import { ProjectShowcase } from "./project-showcase";

/** The home page shows the top highlights; the full list lives in the case study. */
const MAX_HIGHLIGHTS = 3;

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const hasCaseStudy = Boolean(project.caseStudy);
  const href = hasCaseStudy ? `/projects/${project.slug}` : (project.liveUrl ?? "#projects");
  const reversed = index % 2 === 1;
  const titleId = `project-${project.slug}`;
  const highlights = project.problemsSolved.slice(0, MAX_HIGHLIGHTS);
  const more = project.problemsSolved.length - highlights.length;

  return (
    <article aria-labelledby={titleId} className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
      <div className={cn("lg:sticky lg:top-28 lg:self-start", reversed && "lg:order-last")}>
        <ProjectShowcase project={project} href={href} />
      </div>

      <Reveal delay={0.1} className="h-full">
        <Spotlight className="glass-flat flex h-full flex-col rounded-[2rem] p-6 sm:p-9">
          <p className="text-xs font-medium tracking-[0.16em] text-fg-muted uppercase">
            <span className="text-brand-light">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden> · </span>
            {project.kind} · {project.client}
          </p>

          <h3 id={titleId} className="mt-4 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
            <span aria-hidden className="h-0.5 w-7 shrink-0 rounded-full bg-gradient-to-r from-brand-light to-brand" />
            {project.title}
          </h3>
          <p className="mt-4 leading-relaxed text-fg-muted">{project.description}</p>

          <div className="my-7 h-px bg-gradient-to-r from-white/10 via-white/[0.06] to-transparent" aria-hidden />

          <h4 className="text-xs font-semibold tracking-[0.16em] text-fg uppercase">Problems solved</h4>
          <AnimatedChecklist items={highlights} className="mt-4" />
          {more > 0 && hasCaseStudy && (
            <p className="mt-3 pl-8 text-sm text-fg-muted">
              + {more} more in the case study
            </p>
          )}

          <div className="mt-auto pt-8">
            <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <TechBadge>{tech}</TechBadge>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              {hasCaseStudy ? (
                <ActionLink href={href} variant="brand" prefetch>
                  Read case study
                  <span className="sr-only">: {project.title}</span>
                </ActionLink>
              ) : (
                <ActionLink href={href} variant="glass" icon="external">
                  Visit live site
                  <span className="sr-only">: {project.title}</span>
                </ActionLink>
              )}
            </div>
          </div>
        </Spotlight>
      </Reveal>
    </article>
  );
}
