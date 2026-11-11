"use client";

import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const viewport = { once: true, amount: 0.2 } as const;

const tags = {
  div: m.div,
  section: m.section,
  article: m.article,
  header: m.header,
  li: m.li,
  ul: m.ul,
  ol: m.ol,
  p: m.p,
} as const;

type Tag = keyof typeof tags;

interface BaseProps {
  as?: Tag;
  className?: string;
  children?: ReactNode;
  id?: string;
}

/* ------------------------------------------------------------------------ */
/* Reveal: fades and slides a single block up as it enters the viewport.    */
/* ------------------------------------------------------------------------ */

interface RevealProps extends BaseProps {
  delay?: number;
  /** Distance in px the element travels upwards. */
  y?: number;
}

export function Reveal({ as = "div", className, children, id, delay = 0, y = 24 }: RevealProps) {
  const Component = tags[as];
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------------ */
/* Stagger + StaggerItem: reveal a list one child after another.            */
/* ------------------------------------------------------------------------ */

interface StaggerProps extends BaseProps {
  /** Seconds between each child. */
  stagger?: number;
  delay?: number;
}

export function Stagger({ as = "div", className, children, id, stagger = 0.08, delay = 0 }: StaggerProps) {
  const Component = tags[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <Component
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </Component>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerItem({ as = "div", className, children, id }: BaseProps) {
  const Component = tags[as];
  return (
    <Component id={id} className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
