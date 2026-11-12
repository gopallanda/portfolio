import { Route } from "lucide-react";
import { processSteps } from "@/data/home";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          badge="How I work"
          icon={Route}
          title={
            <>
              Simple process. <span className="headline-accent">No surprises.</span>
            </>
          }
        />

        <div className="relative mt-14 sm:mt-16">
          {/* Connector: a faint track plus a bright line that fills as you scroll
              (CSS scroll-driven; vertical on mobile, horizontal on desktop). */}
          <div aria-hidden className="absolute top-6 bottom-6 left-6 w-px bg-white/[0.07] md:hidden">
            <div className="process-line-y h-full w-full bg-gradient-to-b from-brand-light via-brand to-brand-light/30" />
          </div>
          <div aria-hidden className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-white/[0.07] md:block">
            <div className="process-line-x h-full w-full bg-gradient-to-r from-brand-light via-brand to-brand-light/40 shadow-[0_0_12px_var(--brand-glow)]" />
          </div>

          <Stagger as="ol" className="relative grid gap-10 md:grid-cols-4 md:gap-6" stagger={0.15}>
            {processSteps.map((step, i) => (
              <StaggerItem
                as="li"
                key={step.title}
                className="relative flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center"
              >
                <span className="process-step relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-brand-light/50 bg-raised font-heading text-base font-bold text-fg shadow-[0_0_0_6px_var(--bg),0_0_30px_-6px_var(--brand-glow)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:mt-6">
                  <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-fg-muted md:mx-auto">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
