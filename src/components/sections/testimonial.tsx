import { Quote } from "lucide-react";
import { cn } from "cn";
import { testimonial } from "@/data/home";
import { Reveal } from "@/components/motion/reveal";

export function Testimonial() {
  return (
    <section aria-label="Client testimonial" className="relative py-20 sm:py-28">
      <div className="container-page">
        <Reveal
          className={cn(
            "glass-flat relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] px-6 py-12 text-center sm:px-14 sm:py-16",
            // A dashed edge marks the slot as a placeholder until a real quote is in.
            testimonial.placeholder && "border-dashed",
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.35),transparent)]"
          />
          <Quote aria-hidden className="mx-auto size-9 text-brand-light" />
          <figure className="mt-6">
            <blockquote className="font-serif text-2xl leading-snug text-fg italic sm:text-[2rem]">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-1">
              <span className="font-heading font-semibold text-fg">{testimonial.name}</span>
              <span className="text-sm text-fg-muted">{testimonial.role}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
