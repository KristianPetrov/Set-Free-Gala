import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

/**
 * Lazily create the Stripe client so importing this module never throws
 * (e.g. during `next build` page-data collection when env vars are absent).
 */
export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "Missing STRIPE_SECRET_KEY. Add it to .env.local (see .env.example)."
    );
  }

  client ??= new Stripe(secretKey);
  return client;
}
