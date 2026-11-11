import { CircleAlert, Hammer, TrendingUp, type LucideIcon } from "lucide-react";
import type { ProblemCase } from "@/data/projects";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const rows: { key: keyof ProblemCase; label: string; icon: LucideIcon; tone: string }[] = [
  { key: "problem", label: "Problem", icon: CircleAlert, tone: "text-[#fca5a5]" },
  { key: "built", label: "What I built", icon: Hammer, tone: "text-brand-light" },
  { key: "result", label: "Result", icon: TrendingUp, tone: "text-[#6ee7b7]" },
];

export function ProblemCards({ problems }: { problems: ProblemCase[] }) {
  return (
    <Stagger as="ol" className="grid gap-5 md:grid-cols-2" stagger={0.1}>
      {problems.map((p, i) => (
        <StaggerItem
          as="li"
          key={p.problem}
          className="glass-flat glow-hover flex flex-col rounded-3xl p-6 sm:p-7"
        >
          <span className="font-heading text-sm font-bold text-brand-light">{String(i + 1).padStart(2, "0")}</span>
          <dl className="mt-4 flex flex-col gap-5">
            {/* Each <div> holds only a <dt>/<dd> pair, as <dl> requires. */}
            {rows.map(({ key, label, icon: Icon, tone }) => (
              <div key={key}>
                <dt className="flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.16em] text-fg-muted uppercase">
                  <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon aria-hidden className={`size-4 ${tone}`} />
                  </span>
                  {label}
                </dt>
                <dd
                  className={
                    key === "problem"
                      ? "mt-1.5 pl-[2.875rem] font-medium text-fg"
                      : "mt-1.5 pl-[2.875rem] leading-relaxed text-fg-muted"
                  }
                >
                  {p[key]}
                </dd>
              </div>
            ))}
          </dl>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
