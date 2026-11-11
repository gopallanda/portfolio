import { Starfield } from "@/components/motion/starfield";
import { ActionLink } from "@/components/ui/action-link";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80svh] place-items-center overflow-hidden pt-24">
      <Starfield className="-z-10" />
      <div className="container-page text-center">
        <p className="font-heading text-7xl font-bold text-brand-light/80 sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Lost in space. <span className="headline-accent">This page doesn&rsquo;t exist.</span>
        </h1>
        <div className="mt-8 flex justify-center">
          <ActionLink href="/" variant="glass">
            Back to home
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
