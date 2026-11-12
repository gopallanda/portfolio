import { cn } from "cn";
import type { CSSProperties } from "react";

/**
 * Twinkling starfield with zero JavaScript and almost no markup.
 *
 * Each layer is ONE element whose background is a list of tiny radial
 * gradients (one per star), placed with a seeded random generator so the
 * output is identical on every render. Layers fade in and out on their own
 * timing; only opacity animates, so the work stays on the GPU compositor.
 */

// Mulberry32: tiny deterministic PRNG.
function prng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface LayerConfig {
  count: number;
  duration: string;
  delay: string;
  low: number;
  /** Extra layers only add density on larger screens. */
  desktopOnly?: boolean;
}

const LAYERS: LayerConfig[] = [
  { count: 18, duration: "4.2s", delay: "0s", low: 0.25 },
  { count: 16, duration: "5.8s", delay: "-2.1s", low: 0.15 },
  { count: 14, duration: "7.4s", delay: "-4.6s", low: 0.3 },
  { count: 10, duration: "3.4s", delay: "-1.3s", low: 0.1 },
  { count: 18, duration: "6.6s", delay: "-3.2s", low: 0.2, desktopOnly: true },
  { count: 16, duration: "4.8s", delay: "-0.7s", low: 0.25, desktopOnly: true },
];

const r2 = (n: number) => Math.round(n * 10) / 10;

// Each star is a tiny background tile (a few px square) placed by percentage,
// so the browser paints only those pixels. A full-size gradient per star would
// make it paint ~100 full-screen images, which is slow without a fast GPU.
function buildLayers() {
  const rand = prng(20261110);
  return LAYERS.map((layer) => {
    const images: string[] = [];
    const sizes: string[] = [];
    const positions: string[] = [];
    for (let i = 0; i < layer.count; i++) {
      const roll = rand();
      const x = r2(rand() * 100);
      // Bias stars towards the top; the horizon covers the bottom.
      const y = r2(Math.pow(rand(), 1.3) * 82);
      const tint = rand() > 0.72 ? "#cdbcff" : "#fff";
      if (roll > 0.93) {
        // Bright star with a soft halo
        images.push("radial-gradient(circle,#fff,rgb(205 188 255/.55) 30%,transparent 70%)");
        sizes.push("9px 9px");
      } else {
        const s = roll > 0.65 ? 3 : 2;
        images.push(`radial-gradient(circle,${tint} 45%,transparent 70%)`);
        sizes.push(`${s}px ${s}px`);
      }
      positions.push(`${x}% ${y}%`);
    }
    return {
      ...layer,
      backgroundImage: images.join(","),
      backgroundSize: sizes.join(","),
      backgroundPosition: positions.join(","),
    };
  });
}

const layers = buildLayers();

export function Starfield({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {layers.map((layer, i) => (
        <div
          key={i}
          className={cn("star-layer absolute inset-0 bg-no-repeat", layer.desktopOnly && "max-sm:hidden")}
          style={
            {
              backgroundImage: layer.backgroundImage,
              backgroundSize: layer.backgroundSize,
              backgroundPosition: layer.backgroundPosition,
              "--twinkle-duration": layer.duration,
              "--twinkle-delay": layer.delay,
              "--twinkle-low": layer.low,
            } as CSSProperties
          }
        />
      ))}

      {/* An occasional shooting star (transform + opacity only). */}
      <span className="shooting-star absolute top-[12%] right-[8%] h-px w-28 origin-right rounded-full bg-gradient-to-l from-white via-[#cdbcff]/70 to-transparent" />
    </div>
  );
}
