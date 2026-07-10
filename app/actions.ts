"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getTicketProduct } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

const MIN_AMOUNT_CENTS = 100; // $1
const MAX_AMOUNT_CENTS = 99_999_900; // $999,999
const MAX_TICKET_QUANTITY = 20;

async function getOrigin() {
  return (await headers()).get("origin") ?? "http://localhost:3000";
}

export async function createDonationSession(formData: FormData) {
  const amountDollars = Number.parseFloat(String(formData.get("amount")));
  const monthly = formData.get("frequency") === "monthly";

  if (!Number.isFinite(amountDollars)) {
    throw new Error("Please enter a valid donation amount.");
  }

  const amountCents = Math.round(amountDollars * 100);
  if (amountCents < MIN_AMOUNT_CENTS || amountCents > MAX_AMOUNT_CENTS) {
    throw new Error("Donation amount must be between $1 and $999,999.");
  } 

  const origin = await getOrigin();

  const session = await getStripe().checkout.sessions.create({
    mode: monthly ? "subscription" : "payment",
    ...(monthly ? {} : { submit_type: "donate" as const }),
    metadata: {
      kind: "donation",
      frequency: monthly ? "monthly" : "once",
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: amountCents,
          product_data: {
            name: monthly
              ? "Set Free Gala — Monthly Gift"
              : "Set Free Gala — Donation",
            description: monthly
              ? "A recurring monthly gift toward freedom."
              : "A one-time gift toward freedom.",
          },
          ...(monthly ? { recurring: { interval: "month" as const } } : {}),
        },
      },
    ],
    success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/#donate`,
  });

  if (!session.url) {
    throw new Error("Unable to start checkout. Please try again.");
  }

  redirect(session.url);
}

export async function createTicketSession(formData: FormData) {
  const product = getTicketProduct(formData.get("productId"));

  if (!product) {
    throw new Error("Please choose a ticket or sponsorship option.");
  }

  const requestedQuantity = Number.parseInt(
    String(formData.get("quantity") ?? "1"),
    10
  );
  const quantity = product.quantityAllowed ? requestedQuantity : 1;

  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > MAX_TICKET_QUANTITY
  ) {
    throw new Error(`Quantity must be between 1 and ${MAX_TICKET_QUANTITY}.`);
  }

  const sponsorName = String(formData.get("sponsorName") ?? "").trim();
  const logoUrl = String(formData.get("logoUrl") ?? "").trim();

  if (product.requiresSponsorLogo && (!sponsorName || !logoUrl)) {
    throw new Error("Sponsor name and logo are required for sponsorships.");
  }

  const origin = await getOrigin();
  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.unitAmount,
          product_data: {
            name: product.stripeName,
            description: product.detail,
          },
        },
      },
    ],
    metadata: {
      kind: "ticket",
      productId: product.id,
      productTitle: product.title,
      quantity: String(quantity),
      ...(sponsorName ? { sponsorName } : {}),
      ...(logoUrl ? { logoUrl } : {}),
    },
    success_url: `${origin}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/#tickets`,
  });

  if (!session.url) {
    throw new Error("Unable to start checkout. Please try again.");
  }

  redirect(session.url);
}
