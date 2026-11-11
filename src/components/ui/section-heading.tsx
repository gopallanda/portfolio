import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "cn";
import { Reveal } from "@/components/motion/reveal";

export function SectionBadge({ icon: Icon, children }: { icon?: LucideIcon; children: ReactNode }) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-[0.14em] text-fg-muted uppercase">
      {Icon && <Icon aria-hidden className="size-3.5 text-brand-light" />}
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  id?: string;
  badge: ReactNode;
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

/** Badge + h2 + optional intro, revealed on scroll. Pass `id` for aria-labelledby. */
export function SectionHeading({ id, badge, icon, title, description, align = "center", className }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <SectionBadge icon={icon}>{badge}</SectionBadge>
      <h2 id={id} className="max-w-3xl text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && <p className="max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}
