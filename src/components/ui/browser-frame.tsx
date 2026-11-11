import type { ReactNode } from "react";
import { cn } from "cn";

interface BrowserFrameProps {
  /** Shown in the fake address bar. */
  url?: string;
  className?: string;
  children: ReactNode;
}

/** Minimal dark browser chrome around a screenshot. */
export function BrowserFrame({ url, className, children }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/12 bg-[#0b0814] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(0_0_0/0.4)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.08] bg-white/[0.03] px-3 py-2">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        {url && (
          <div className="mx-auto max-w-[60%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 text-center text-[11px] text-fg-muted">
            {url}
          </div>
        )}
        <span aria-hidden className="w-[42px]" />
      </div>
      <div className="relative overflow-hidden">{children}</div>
    </div>
  );
}
