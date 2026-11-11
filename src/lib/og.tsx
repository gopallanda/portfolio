import { ImageResponse } from "next/og";
import { cacheLife } from "next/cache";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${site.name}, ${site.role}: ${site.tagline}`;

const fontDir = join(process.cwd(), "node_modules/@fontsource");

// File reads are "uncached IO" under Cache Components and would make the image
// render on every request. Caching them lets the image be prerendered at build.
async function loadAssets() {
  "use cache";
  cacheLife("max");
  const [display, body, photo] = await Promise.all([
    readFile(join(fontDir, "bricolage-grotesque/files/bricolage-grotesque-latin-700-normal.woff")),
    readFile(join(fontDir, "inter/files/inter-latin-400-normal.woff")),
    readFile(join(process.cwd(), "public", site.photo.src)),
  ]);
  return {
    display: display.toString("base64"),
    body: body.toString("base64"),
    photo: photo.toString("base64"),
  };
}

/** Shared social card used by both opengraph-image and twitter-image. */
export async function renderOgImage() {
  const assets = await loadAssets();
  const display = Buffer.from(assets.display, "base64");
  const body = Buffer.from(assets.body, "base64");
  const photoSrc = `data:image/jpeg;base64,${assets.photo}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(180deg, #050308 0%, #120a2a 55%, #24145a 100%)",
          color: "#E9E6F2",
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Horizon arc */}
        <div
          style={{
            position: "absolute",
            left: -300,
            right: -300,
            top: 470,
            height: 900,
            borderRadius: "50%",
            background: "#050308",
            borderTop: "3px solid rgba(216,204,255,0.85)",
            boxShadow: "0 -30px 90px 10px rgba(139,92,246,0.6)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #A78BFA, #7C3AED 55%, #3b1a7a)",
              fontFamily: "Bricolage",
              fontSize: 26,
              color: "white",
            }}
          >
            {site.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Bricolage", fontSize: 30 }}>{site.name}</div>
            <div style={{ fontSize: 22, color: "#B8B0CC" }}>{`${site.role} · Next.js & Supabase`}</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
          <img
            src={photoSrc}
            alt=""
            width={112}
            height={112}
            style={{
              marginLeft: "auto",
              borderRadius: 999,
              objectFit: "cover",
              objectPosition: "50% 22%",
              border: "3px solid rgba(167,139,250,0.7)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginBottom: 120 }}>
          <div style={{ fontFamily: "Bricolage", fontSize: 76, lineHeight: 1.02, letterSpacing: -2.5 }}>
            Building software that
          </div>
          <div style={{ fontFamily: "Bricolage", fontSize: 76, lineHeight: 1.02, letterSpacing: -2.5, color: "#A78BFA" }}>
            solves real business problems
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: display, style: "normal", weight: 700 },
        { name: "Inter", data: body, style: "normal", weight: 400 },
      ],
    },
  );
}
