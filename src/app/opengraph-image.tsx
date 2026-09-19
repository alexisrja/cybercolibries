import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} · ${siteConfig.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = readFile(join(process.cwd(), "public/brand/logo-512.png"), "base64");

export default async function OpengraphImage() {
  const logoSrc = `data:image/png;base64,${await logoData}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#060913", color: "#e7ecf6", padding: "56px 64px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", width: 650 }}>
            <div style={{ display: "flex", fontSize: 22, color: "#2fe3c8", marginBottom: 24 }}>COMUNIDAD DE CIBERSEGURIDAD</div>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: 0, lineHeight: 1.1 }}>{siteConfig.name}</div>
            <div style={{ display: "flex", marginTop: 24, fontSize: 34, lineHeight: 1.3, color: "#a0abc3" }}>{siteConfig.headline}</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={390} height={390} alt="" style={{ objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#2fe3c8", borderTop: "1px solid #30394e", paddingTop: 24 }}>{siteConfig.tagline}</div>
      </div>
    ),
    size,
  );
}
