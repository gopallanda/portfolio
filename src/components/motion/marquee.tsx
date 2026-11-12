"use client";

import { Pause, Play } from "lucide-react";
import { Fragment, useState } from "react";
import { cn } from "cn";

interface MarqueeProps {
  name: string;
  words: string[];
}

function Row({ name, words }: MarqueeProps) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      <span className="bg-gradient-to-r from-white to-brand-light bg-clip-text text-transparent">{name}</span>
      {words.map((word, i) => (
        <Fragment key={word}>
          <span aria-hidden className="text-[0.55em] text-brand-light">✦</span>
          <span className={cn(i % 2 === 0 ? "text-outline" : "text-fg")}>{word}</span>
        </Fragment>
      ))}
      <span aria-hidden className="text-[0.55em] text-brand-light">✦</span>
    </div>
  );
}

/**
 * Infinite ticker. CSS does the moving; this component only adds a pause
 * button so the motion can be stopped (it never moves with reduced motion).
 */
export function Marquee({ name, words }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const label = [name, ...words].join(", ");

  return (
    <div
      className="marquee relative overflow-hidden border-y border-white/[0.08] bg-white/[0.015] py-6 sm:py-8"
      data-paused={paused}
    >
      <p className="sr-only">{label}</p>
      <div
        aria-hidden
        className="marquee-track flex font-heading text-4xl font-bold tracking-[-0.02em] whitespace-nowrap uppercase sm:text-6xl lg:text-7xl"
      >
        <Row name={name} words={words} />
        <Row name={name} words={words} />
      </div>

      {/* Edge fades */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent sm:w-32" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent sm:w-32" />

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play ticker" : "Pause ticker"}
        className="glass-flat absolute right-3 bottom-2 grid size-8 place-items-center rounded-full text-fg-muted transition-colors hover:text-fg motion-reduce:hidden sm:right-5"
      >
        {paused ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
      </button>
    </div>
  );
}
