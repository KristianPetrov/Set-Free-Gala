import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cinzel } from "next/font/google";
import { siteUrl, siteName, siteTitle, siteDescription } from "@/lib/site";
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

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s — ${siteName}`,
  },
  description:
    "Join Set Free for its first annual gala at the Set Free Palace in Anaheim, featuring special guest Tim Storey. Black and white formal attire. Tables, tickets, and sponsorships available — every dollar funds food, clothing, shelter, and daily outreach.",
  applicationName: siteName,
  category: "events",
  keywords: [
    "Set Free Gala",
    "Set Free",
    "gala",
    "charity gala",
    "fundraiser",
    "Tim Storey",
    "Set Free Palace",
    "Anaheim",
    "black tie",
    "outreach",
    "donations",
    "Fieldy bass raffle",
    "Korn signed bass",
  ],
  authors: [{ name: "Set Free" }],
  creator: "Set Free",
  publisher: "Set Free",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    locale: "en_US",
    title: siteTitle,
    description:
      "An evening at the Set Free Palace with special guest Tim Storey. Silent auction, tables, tickets, and sponsorships — every dollar funds food, clothing, shelter, and daily outreach.",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cinzel.variable} h-full scroll-smooth bg-ink antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper selection:bg-gold selection:text-ink">
        {children}
      </body>
    </html>
  );
}
