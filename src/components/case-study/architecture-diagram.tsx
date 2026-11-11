import { Fragment } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { Architecture } from "@/data/projects";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/**
 * Simple left-to-right flow (top-to-bottom on mobile) built from styled boxes.
 * Each column can hold several boxes; arrows sit between columns.
 */
export function ArchitectureDiagram({ architecture, title }: { architecture: Architecture; title: string }) {
  const description = architecture
    .map((col) => col.map((n) => (n.detail ? `${n.label} (${n.detail})` : n.label)).join(" and "))
    .join(", then ");

  return (
    <figure className="glass-flat relative overflow-hidden rounded-[2rem] p-5 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgb(255_255_255)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <Stagger
        className="relative flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-2"
        stagger={0.12}
      >
        {architecture.map((column, ci) => (
          <Fragment key={ci}>
            {ci > 0 && (
              <StaggerItem className="flex shrink-0 items-center justify-center text-brand-light/80 lg:w-8">
                <ArrowDown aria-hidden className="size-5 lg:hidden" />
                <ArrowRight aria-hidden className="hidden size-5 lg:block" />
              </StaggerItem>
            )}
            <StaggerItem className="flex flex-1 flex-col gap-2 sm:flex-row lg:flex-col">
              {column.map((node) => (
                <div
                  key={node.label}
                  className="flex-1 rounded-2xl border border-white/12 bg-[#120c20]/90 px-4 py-3.5 text-center shadow-[inset_0_1px_0_0_rgb(255_255_255/0.08),0_10px_30px_-15px_rgb(124_58_237/0.6)]"
                >
                  <p className="font-heading text-sm font-semibold text-fg">{node.label}</p>
                  {node.detail && <p className="mt-0.5 text-xs text-fg-muted">{node.detail}</p>}
                </div>
              ))}
            </StaggerItem>
          </Fragment>
        ))}
      </Stagger>
      <figcaption className="sr-only">
        How {title} fits together: {description}.
      </figcaption>
    </figure>
  );
}
