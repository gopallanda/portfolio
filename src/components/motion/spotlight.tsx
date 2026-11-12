"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "cn";

const tags = { div: "div", article: "article", span: "span", li: "li" } as const;

interface SpotlightProps {
  as?: keyof typeof tags;
  className?: string;
  children?: ReactNode;
}

/**
 * Card wrapper with a soft violet glow and a lit border that follow the
 * pointer. The handler only writes two CSS variables (no React re-render);
 * the visuals are pure CSS in globals.css (.spotlight) and only show on
 * devices that can hover.
 */
export function Spotlight({ as = "div", className, children }: SpotlightProps) {
  const Tag = tags[as];
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag onPointerMove={onPointerMove} className={cn("spotlight", className)}>
      {children}
    </Tag>
  );
}
