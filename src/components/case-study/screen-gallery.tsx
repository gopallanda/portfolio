"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import type { Screenshot } from "@/data/projects";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/** Grid of screenshots; each opens full size in a dialog with previous/next controls. */
export function ScreenGallery({ screens, projectTitle }: { screens: Screenshot[]; projectTitle: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const current = index !== null ? screens[index] : null;
  const many = screens.length > 1;

  const go = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + screens.length) % screens.length));

  const onKeyDown = (e: KeyboardEvent) => {
    if (!many) return;
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <>
      <Stagger as="ul" className="grid gap-5 sm:grid-cols-2" stagger={0.1}>
        {screens.map((screen, i) => (
          <StaggerItem as="li" key={screen.src}>
            <figure>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-surface text-left shadow-[0_20px_60px_-25px_rgb(0_0_0/0.9)] transition-[border-color,box-shadow] duration-300 hover:border-brand-light/40 hover:shadow-[0_20px_60px_-20px_rgb(139_92_246/0.5)]"
              >
                <span className="sr-only">Enlarge screenshot: {screen.alt}</span>
                <Image
                  src={screen.src}
                  alt=""
                  width={screen.width}
                  height={screen.height}
                  sizes="(min-width: 1152px) 540px, (min-width: 640px) 46vw, 94vw"
                  className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
                />
                <span
                  aria-hidden
                  className="glass absolute top-3 right-3 grid size-9 place-items-center rounded-full text-fg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
                >
                  <Maximize2 className="size-4" />
                </span>
              </button>
              {screen.caption && <figcaption className="mt-3 text-sm text-fg-muted">{screen.caption}</figcaption>}
            </figure>
          </StaggerItem>
        ))}
      </Stagger>

      <Dialog open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent
          onKeyDown={onKeyDown}
          className="w-[min(96vw,80rem)] max-w-none gap-3 border border-white/10 bg-[#0b0814] p-3 ring-0 sm:max-w-none sm:p-4"
        >
          {current && (
            <>
              <DialogTitle className="pr-10 text-sm font-medium text-fg">
                {projectTitle}
                {many && (
                  <span className="ml-2 text-fg-muted">
                    {(index ?? 0) + 1} / {screens.length}
                  </span>
                )}
              </DialogTitle>
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="96vw"
                  className="max-h-[78vh] w-full object-contain"
                />
                {many && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous screenshot"
                      className="glass absolute top-1/2 left-2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-fg hover:bg-white/15"
                    >
                      <ChevronLeft aria-hidden className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next screenshot"
                      className="glass absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-fg hover:bg-white/15"
                    >
                      <ChevronRight aria-hidden className="size-5" />
                    </button>
                  </>
                )}
              </div>
              <DialogDescription className="text-sm text-fg-muted">{current.caption ?? current.alt}</DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
