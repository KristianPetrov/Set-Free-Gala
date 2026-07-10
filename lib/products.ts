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
