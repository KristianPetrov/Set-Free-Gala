"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";

const MIN_AMOUNT_CENTS = 100; // $1
const MAX_AMOUNT_CENTS = 99_999_900; // $999,999

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

  const origin =
    (await headers()).get("origin") ?? "http://localhost:3000";

  const session = await getStripe().checkout.sessions.create({
    mode: monthly ? "subscription" : "payment",
    ...(monthly ? {} : { submit_type: "donate" as const }),
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
