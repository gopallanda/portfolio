import {
  siCapacitor,
  siCloudflare,
  siFigma,
  siFirebase,
  siFramer,
  siGithub,
  siGooglegemini,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siShadcnui,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";
import type { StackItem } from "@/data/home";

type IconName = NonNullable<StackItem["icon"]>;

// Named imports keep only these 16 logos in the bundle.
const icons: Record<IconName, SimpleIcon> = {
  siCapacitor,
  siCloudflare,
  siFigma,
  siFirebase,
  siFramer,
  siGithub,
  siGooglegemini,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siShadcnui,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
};

/** Brand colours too dark to see on the background are shown in the text colour. */
function displayColor(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.09 ? "var(--fg)" : `#${hex}`;
}

/** Server-rendered brand logo from simple-icons (CC0). Ships no JavaScript. */
export function BrandLogo({ name, className }: { name: IconName; className?: string }) {
  const icon = icons[name];
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill={displayColor(icon.hex)}>
      <path d={icon.path} />
    </svg>
  );
}
