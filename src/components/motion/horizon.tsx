import { cn } from "cn";

/**
 * A huge dark ellipse rising from the bottom of the hero, with a glowing
 * violet rim. The glow is a separate layer whose opacity and scale pulse
 * softly; the planet itself never repaints.
 */
export function Horizon({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-[34vh] overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_35%)] sm:h-[52vh]", className)}>
      {/* Atmosphere: wide violet haze sitting just above the rim. */}
      <div className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,rgb(124_58_237/0.38),transparent_70%)]" />

      {/* Pulsing glow, same footprint as the planet. */}
      <div
        className="horizon-glow absolute left-1/2 top-[46%] sm:top-[48%] aspect-[2.2/1] w-[280vw] sm:aspect-[2.6/1] sm:w-[max(190vw,1300px)] rounded-[50%] will-change-transform"
        style={{
          boxShadow:
            "0 -6px 30px 2px rgb(167 139 250 / 0.75), 0 -30px 90px 10px rgb(139 92 246 / 0.55), 0 -80px 200px 40px rgb(124 58 237 / 0.35)",
        }}
      />

      {/* The planet: page-coloured so it blends into the next section. */}
      <div
        className="absolute left-1/2 top-[46%] sm:top-[48%] aspect-[2.2/1] w-[280vw] sm:aspect-[2.6/1] sm:w-[max(190vw,1300px)] -translate-x-1/2 rounded-[50%] bg-bg"
        style={{
          borderTop: "1.5px solid rgb(216 204 255 / 0.85)",
          boxShadow: "inset 0 14px 40px -12px rgb(167 139 250 / 0.55), inset 0 2px 6px rgb(233 230 242 / 0.35)",
        }}
      />
    </div>
  );
}
