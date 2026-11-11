"use client";

import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import { cn } from "cn";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const badge: Variants = {
  hidden: { scale: 0.4, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 420, damping: 22 } },
};

const tick: Variants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 0.35, ease: "easeOut", delay: 0.12 } },
};

/** "Problems solved" list: each check pops in and draws itself, one by one. */
export function AnimatedChecklist({ items, className }: { items: string[]; className?: string }) {
  return (
    <m.ul
      className={cn("flex flex-col gap-3.5", className)}
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {items.map((text) => (
        <m.li key={text} variants={item} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
          <m.span
            variants={badge}
            aria-hidden
            className="mt-[3px] grid size-5 shrink-0 place-items-center rounded-full bg-brand/25 ring-1 ring-brand-light/40"
          >
            <svg viewBox="0 0 24 24" className="size-3 text-brand-light" fill="none">
              <m.path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={tick}
              />
            </svg>
          </m.span>
          <span>{text}</span>
        </m.li>
      ))}
    </m.ul>
  );
}
