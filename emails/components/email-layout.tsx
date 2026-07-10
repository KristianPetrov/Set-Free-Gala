import type { ReactNode } from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "@react-email/components";
import { event, siteUrl } from "@/lib/site";

export function EmailLayout({
  preview,
  children,
}: {
  preview: string;
  children: ReactNode;
}) {
  return (
    <Html lang="en">
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                ink: "#050505",
                paper: "#f3ead7",
                "paper-dim": "#a89a7c",
                gold: "#d4af5e",
                line: "rgba(212, 175, 94, 0.28)",
              },
              fontFamily: {
                display: ["Cinzel", "Georgia", "serif"],
                serif: ["Georgia", "serif"],
                sans: ["Arial", "sans-serif"],
              },
            },
          },
        }}
      >
        <Head>
          <Font
            fontFamily="Cinzel"
            fallbackFontFamily="Georgia"
            webFont={{
              url: "https://fonts.gstatic.com/s/cinzel/v25/8vIU7ww63mVu7gtR-kwKxNvkNOjw-tbnTYrvDE5ZdqU.woff2",
              format: "woff2",
            }}
          />
        </Head>
        <Body className="m-0 bg-ink px-0 py-0 font-sans text-paper">
          <Preview>{preview}</Preview>
          <Container className="mx-auto my-0 max-w-[600px] px-[24px] py-[40px]">
            <Section className="border border-solid border-line px-[28px] py-[32px] text-center">
              <Img
                src={`${siteUrl}/set-free-gala-logo.png`}
                alt="Set Free Gala"
                width="140"
                className="mx-auto mb-[28px]"
              />
              {children}
              <Hr className="my-[32px] border-solid border-line" />
              <Text className="m-0 font-display text-[13px] uppercase leading-[22px] tracking-[3px] text-gold">
                {event.name}
              </Text>
              <Text className="m-0 mt-[10px] text-[13px] leading-[22px] text-paper-dim">
                Sunday, July 26, 2026 · 6-10 PM
                <br />
                {event.venue}, {event.streetAddress}, {event.city}, {event.region}
                <br />
                Dress Code: {event.dressCode}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
