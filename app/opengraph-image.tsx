import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ogImageAlt } from "@/lib/site";

export const alt = ogImageAlt;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const [logo, cinzel] = await Promise.all([
    readFile(join(process.cwd(), "public/set-free-gala-logo.png")),
    readFile(join(process.cwd(), "assets/fonts/Cinzel-SemiBold.ttf")),
  ]);

  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          fontFamily: "Cinzel",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={660}
          height={440}
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            marginTop: 8,
            display: "flex",
            fontSize: 34,
            letterSpacing: "0.35em",
            color: "#f2ede3",
          }}
        >
          SUNDAY JULY 26 · 6 PM
        </div>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            fontSize: 21,
            letterSpacing: "0.3em",
            color: "#d4af5e",
          }}
        >
          THE SET FREE PALACE · ANAHEIM, CA
        </div>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            fontSize: 19,
            letterSpacing: "0.25em",
            color: "#9c9284",
          }}
        >
          SPECIAL GUEST TIM STOREY
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cinzel",
          data: cinzel,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
