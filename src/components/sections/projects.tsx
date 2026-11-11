import { Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectRow } from "./project-row";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      {/* Soft violet wash behind the heading */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(50%_60%_at_50%_0%,rgb(124_58_237/0.14),transparent_70%)]"
      />
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          badge="Crafted projects"
          icon={Sparkles}
          title={
            <>
              Problems in. <span className="headline-accent">Products out.</span>
            </>
          }
          description="Real client work and my own product: the problem each one solved, what I built, and the stack behind it."
        />

        <div className="mt-16 flex flex-col gap-16 sm:mt-20 sm:gap-24">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
