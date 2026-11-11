import { Bot, ChartColumnBig, Layers, LayoutGrid, Smartphone, type LucideIcon } from "lucide-react";
import { services, type ServiceIcon } from "@/data/home";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const iconFor: Record<ServiceIcon, LucideIcon> = {
  dashboards: ChartColumnBig,
  tools: LayoutGrid,
  mobile: Smartphone,
  automation: Bot,
};

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 sm:py-32">
      {/* Glow behind the cards gives the glass something to blur. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[28rem] w-[min(60rem,100%)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.22),transparent)]"
      />
      <div className="container-page">
        <SectionHeading
          id="services-title"
          badge="What I provide"
          icon={Layers}
          title={
            <>
              Software for the work <span className="headline-accent">that slows you down</span>
            </>
          }
          description="Four kinds of problems I solve most. Each one starts with how your business runs today, not with a template."
        />

        <Stagger as="ul" className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {services.map((service) => {
            const Icon = iconFor[service.icon];
            return (
              <StaggerItem as="li" key={service.title} className="h-full">
                <article className="glass glow-hover group flex h-full flex-col rounded-3xl p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                  <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand/40 to-brand/10 ring-1 ring-brand-light/30 shadow-[0_8px_30px_-10px_var(--brand-glow)]">
                    <Icon aria-hidden className="size-5 text-brand-light" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{service.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Examples">
                    {service.examples.map((ex) => (
                      <li
                        key={ex}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-fg-muted"
                      >
                        {ex}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
