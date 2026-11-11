"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Load the animation engine only after the page has loaded and the browser is
 * idle. Nothing above the fold depends on it (the hero entrance is CSS), so
 * this keeps ~30KB of JS out of the critical path. Elements simply sit in their
 * initial state until it arrives, a fraction of a second later.
 */
const loadFeatures = () =>
  new Promise<void>((resolve) => {
    const idle = () => {
      // Safari has no requestIdleCallback; fall back to a short timeout.
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => resolve(), { timeout: 1500 });
      } else {
        setTimeout(resolve, 200);
      }
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  }).then(() => import("./features").then((mod) => mod.default));

/**
 * - LazyMotion + `m.*` components keep the initial bundle small.
 * - reducedMotion="user" turns off transform/layout animation for people who
 *   ask for reduced motion, while keeping opacity fades so content still ends
 *   up visible.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
