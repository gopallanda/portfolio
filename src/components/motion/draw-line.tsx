"use client";

import * as m from "motion/react-m";

/** A line that draws itself in when scrolled into view (scale only, GPU-friendly). */
export function DrawLine({ axis = "x", className }: { axis?: "x" | "y"; className?: string }) {
  const from = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const to = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };
  return (
    <m.div
      aria-hidden
      className={className}
      style={{ originX: 0, originY: 0 }}
      initial={from}
      whileInView={to}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    />
  );
}
