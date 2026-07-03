import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Set Free's 1st Gala — Sunday July 26 · 6 PM",
  description:
    "Join Set Free for its first annual gala at the Set Free Palace in Anaheim, featuring special guest Tim Storey. Black and white formal attire. Tables, tickets, and sponsorships available — every dollar funds food, clothing, shelter, and daily outreach.",
  openGraph: {
    title: "Set Free's 1st Gala — Sunday July 26 · 6 PM",
    description:
      "An evening at the Set Free Palace with special guest Tim Storey. Silent auction, tables, tickets, and sponsorships — every dollar funds food, clothing, shelter, and daily outreach.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cinzel.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper selection:bg-gold selection:text-ink">
        {children}
      </body>
    </html>
  );
}
