import "server-only";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY. Add it to .env.local (see .env.example)."
  );
}

export const stripe = new Stripe(secretKey);
