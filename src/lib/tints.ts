import type { ProjectTint } from "@/data/projects";

/** Colour treatment for each project's showcase card. */
export const tints: Record<
  ProjectTint,
  { card: string; glow: string; label: string; rim: string }
> = {
  violet: {
    card: "bg-[radial-gradient(120%_90%_at_15%_0%,#4c1d95_0%,#2a1160_38%,#140a2e_75%)]",
    glow: "rgb(139 92 246 / 0.55)",
    label: "text-[#d8ccff]",
    rim: "rgb(196 181 253 / 0.35)",
  },
  emerald: {
    card: "bg-[radial-gradient(120%_90%_at_15%_0%,#0f6b4f_0%,#0b3d30_40%,#071a16_78%)]",
    glow: "rgb(52 211 153 / 0.45)",
    label: "text-[#b7f5dc]",
    rim: "rgb(110 231 183 / 0.3)",
  },
  teal: {
    card: "bg-[radial-gradient(120%_90%_at_15%_0%,#0f6c72_0%,#0b3b42_40%,#06191d_78%)]",
    glow: "rgb(45 212 191 / 0.45)",
    label: "text-[#b4f1ea]",
    rim: "rgb(94 234 212 / 0.3)",
  },
  red: {
    card: "bg-[radial-gradient(120%_90%_at_15%_0%,#9f1d1d_0%,#5a1214_40%,#1f0809_78%)]",
    glow: "rgb(248 113 113 / 0.45)",
    label: "text-[#ffd1c7]",
    rim: "rgb(252 165 165 / 0.3)",
  },
};
