import { Cpu } from "lucide-react";
import { stack } from "@/data/home";
import { SectionHeading } from "@/components/ui/section-heading";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function TechStack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="stack-title"
          badge="My tech stack"
          icon={Cpu}
          title={
            <>
              Proven tools, <span className="headline-accent">picked to stay lean</span>
            </>
          }
          description="A small, modern stack that's quick to build with and cheap to run, from the database to the App Store."
        />

        <Stagger
          as="ul"
          className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-3 sm:mt-16"
          stagger={0.04}
        >
          {stack.map((item) => (
            <StaggerItem as="li" key={item.name}>
              <span className="glass-flat glow-hover flex items-center gap-2.5 rounded-full py-2.5 pr-5 pl-3 text-sm font-medium text-fg transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 sm:text-[15px]">
                <span className="grid size-7 place-items-center rounded-full bg-white/[0.06]">
                  {item.icon ? (
                    <BrandLogo name={item.icon} className="size-4" />
                  ) : (
                    <span aria-hidden className="size-2 rounded-full bg-brand-light" />
                  )}
                </span>
                {item.name}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
