import { NextResponse } from "next/server";
import { sendDonationReceipt, sendTicketReceipt } from "@/lib/email";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  const body = await request.text();
  let event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Invalid Stripe webhook signature:", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      if (session.metadata?.kind === "donation") {
        await sendDonationReceipt(session);
      } else if (session.metadata?.kind === "ticket") {
        await sendTicketReceipt(session);
      } else {
        console.info(`Ignoring Checkout Session ${session.id} without kind.`);
      }
    } catch (error) {
      console.error(`Receipt handling failed for ${session.id}:`, error);
    }
  }

  return NextResponse.json({ received: true });
}
