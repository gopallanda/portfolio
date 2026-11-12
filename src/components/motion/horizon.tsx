import { cn } from "cn";

/**
 * A huge dark ellipse rising from the bottom of the hero, with a glowing
 * violet rim. The glow is a separate layer whose opacity pulses softly.
 *
 * The glow is a radial-gradient ring rather than a big blurred box-shadow:
 * gradients are cheap to paint, while a 200px blur over a ~2700px-wide shape
 * kept the GPU busy for ~0.5s on load (worst on phones without a fast GPU).
 */
export function Horizon({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-[34vh] overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_35%)] sm:h-[52vh]", className)}>
      {/* Atmosphere: wide violet haze sitting just above the rim. */}
      <div className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,rgb(124_58_237/0.38),transparent_70%)]" />

      {/* Pulsing glow: the planet's ellipse stretched taller (scale-y), with a
          gradient ring that peaks just above the planet's top edge
          (1 / 1.3 ≈ 77% of the stretched radius) and fades outward. */}
      <div
        className="horizon-glow absolute left-1/2 top-[46%] aspect-[2.2/1] w-[280vw] scale-x-[1.04] scale-y-[1.3] rounded-[50%] sm:top-[48%] sm:aspect-[2.6/1] sm:w-[max(190vw,1300px)]"
        style={{
          background:
            "radial-gradient(closest-side, transparent 74%, rgb(196 181 253 / 0.85) 76.6%, rgb(139 92 246 / 0.55) 80%, rgb(124 58 237 / 0.22) 88%, transparent 100%)",
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
