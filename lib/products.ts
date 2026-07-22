export type TicketProductId =
  | "ticket"
  | "table"
  | "sponsor_table"
  | "sponsor_tickets";

export type TicketProduct = {
  id: TicketProductId;
  title: string;
  priceLabel: string;
  unitAmount: number;
  stripeName: string;
  detail: string;
  categoryLabel: string;
  requiresSponsorLogo: boolean;
  quantityAllowed: boolean;
};

export type RaffleProductId =
  | "fieldy_bass"
  | "wellness_spa";

export type RaffleProduct = {
  id: RaffleProductId;
  title: string;
  shortTitle: string;
  unitAmount: number;
  priceLabel: string;
  detail: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export const raffleProducts = [
  {
    id: "fieldy_bass",
    title: "Fieldy Signed Bass Raffle Ticket",
    shortTitle: "Fieldy’s Signed Bass",
    unitAmount: 2_500,
    priceLabel: "$25",
    detail: "One entry to win an Ibanez GIO bass signed by Fieldy of Korn.",
    imageSrc: "/fieldy-bass-raffle.png",
    imageAlt:
      "Set Free Gala raffle flyer featuring an Ibanez GIO bass signed by Fieldy of Korn",
    imageWidth: 1024,
    imageHeight: 1536,
  },
  {
    id: "wellness_spa",
    title: "Massage Envy Wellness Basket Raffle Ticket",
    shortTitle: "Massage Envy Wellness Basket",
    unitAmount: 2_500,
    priceLabel: "$25",
    detail: "One entry to win a Massage Envy wellness basket.",
    imageSrc: "/massage-envy-wellness-basket-raffle.png",
    imageAlt:
      "Set Free Gala raffle flyer featuring a Massage Envy wellness basket",
    imageWidth: 1009,
    imageHeight: 1559,
  },
] as const satisfies readonly RaffleProduct[];

export function getRaffleProduct(id: FormDataEntryValue | null) {
  if (typeof id !== "string") {
    return null;
  }

  return raffleProducts.find((product) => product.id === id) ?? null;
}

export const ticketProducts = [
  {
    id: "ticket",
    title: "Ticket",
    priceLabel: "$100",
    unitAmount: 10_000,
    stripeName: "Set Free Gala Ticket",
    detail: "One seat for an unforgettable evening at the Set Free Palace.",
    categoryLabel: "Admission",
    requiresSponsorLogo: false,
    quantityAllowed: true,
  },
  {
    id: "table",
    title: "Table",
    priceLabel: "$1,000",
    unitAmount: 100_000,
    stripeName: "Set Free Gala Table",
    detail: "A full table for your family, friends, church, or crew.",
    categoryLabel: "Admission",
    requiresSponsorLogo: false,
    quantityAllowed: true,
  },
  {
    id: "sponsor_table",
    title: "Sponsor Table",
    priceLabel: "$1,000",
    unitAmount: 100_000,
    stripeName: "Set Free Gala Sponsor Table",
    detail: "One table for your party plus your logo featured on the banner.",
    categoryLabel: "Sponsorship",
    requiresSponsorLogo: true,
    quantityAllowed: false,
  },
  {
    id: "sponsor_tickets",
    title: "Sponsor Tickets",
    priceLabel: "$500",
    unitAmount: 50_000,
    stripeName: "Set Free Gala Sponsor Tickets",
    detail: "Two tickets plus your logo featured on the banner.",
    categoryLabel: "Sponsorship",
    requiresSponsorLogo: true,
    quantityAllowed: false,
  },
] as const satisfies readonly TicketProduct[];

export function getTicketProduct(id: FormDataEntryValue | null) {
  if (typeof id !== "string") {
    return null;
  }

  return ticketProducts.find((product) => product.id === id) ?? null;
}

export function formatUsd(cents: number) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
