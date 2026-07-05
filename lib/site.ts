export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://setfreegala.com";

export const siteName = "Set Free Gala";

export const siteTitle = "Set Free's 1st Gala — Sunday July 26 · 6 PM";

export const siteDescription =
  "Set Free's first annual gala at the Set Free Palace in Anaheim with special guest Tim Storey. Tickets, tables, and sponsorships — every dollar funds food, clothing, shelter, and daily outreach.";

export const event = {
  name: "Set Free's 1st Gala",
  startDate: "2026-07-26T18:00:00-07:00",
  endDate: "2026-07-26T22:00:00-07:00",
  venue: "The Set Free Palace",
  streetAddress: "1171 N West St",
  city: "Anaheim",
  region: "CA",
  postalCode: "92801",
  country: "US",
  phone: "+1-714-400-4573",
  dressCode: "Black and White Formal Attire",
} as const;

export const ogImageAlt =
  "Set Free Gala — gold lettering on black. Sunday July 26 at 6 PM, The Set Free Palace, Anaheim, with special guest Tim Storey.";
