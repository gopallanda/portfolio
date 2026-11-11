import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/** Initials on the brand gradient, used for the favicon and Apple touch icon. */
export function renderIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: size * 0.24,
          background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 55%, #3b1a7a 100%)",
          color: "white",
          fontSize: size * 0.42,
          fontWeight: 700,
          letterSpacing: -size * 0.02,
        }}
      >
        {site.initials}
      </div>
    ),
    { width: size, height: size },
  );
}
