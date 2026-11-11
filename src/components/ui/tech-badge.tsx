import { cn } from "cn";

export function TechBadge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-fg shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)]",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-brand-light/80" />
      {children}
    </span>
  );
}
