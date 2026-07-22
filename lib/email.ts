import "server-only";

import { createElement } from "react";
import { Resend } from "resend";
import type Stripe from "stripe";
import { DonationNotifyEmail } from "@/emails/donation-notify";
import { DonationReceiptEmail } from "@/emails/donation-receipt";
import { RaffleReceiptEmail } from "@/emails/raffle-receipt";
import { TicketReceiptEmail } from "@/emails/ticket-receipt";
import { formatUsd, getTicketProduct } from "@/lib/products";

let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is required to send receipt emails.");
    }

    resend = new Resend(apiKey);
  }

  return resend;
}

function getFromAddress() {
  const from = process.env.RESEND_FROM;

  if (!from) {
    throw new Error("RESEND_FROM is required to send receipt emails.");
  }

  return from;
}

function getCustomerEmail(session: Stripe.Checkout.Session) {
  return session.customer_details?.email ?? session.customer_email ?? undefined;
}

function formatSessionAmount(session: Stripe.Checkout.Session) {
  if (session.amount_total == null) {
    return formatUsd(0);
  }

  return (session.amount_total / 100).toLocaleString("en-US", {
    style: "currency",
    currency: (session.currency ?? "usd").toUpperCase(),
    maximumFractionDigits: 0,
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendDonationReceipt(session: Stripe.Checkout.Session) {
  const to = getCustomerEmail(session);

  if (!to) {
    console.warn(`No customer email for donation session ${session.id}.`);
    return;
  }

  const frequency =
    session.metadata?.frequency === "monthly" ? "monthly" : "once";
  const amount = formatSessionAmount(session);
  const customerName = session.customer_details?.name || undefined;

  const { data, error } = await getResend().emails.send(
    {
      from: getFromAddress(),
      to: [to],
      subject: "Your Set Free Gala donation receipt",
      react: createElement(DonationReceiptEmail, {
        amount,
        frequency,
        customerEmail: to,
      }),
    },
    { idempotencyKey: `receipt/${session.id}` }
  );

  if (error) {
    console.error("Failed to send donation receipt:", error);
    return;
  }

  console.info(`Sent donation receipt ${data?.id} for ${session.id}.`);

  await sendDonationNotification({
    session,
    amount,
    frequency,
    customerEmail: to,
    customerName,
  });
}

async function sendDonationNotification({
  session,
  amount,
  frequency,
  customerEmail,
  customerName,
}: {
  session: Stripe.Checkout.Session;
  amount: string;
  frequency: "once" | "monthly";
  customerEmail: string;
  customerName?: string;
}) {
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!notifyEmail) {
    return;
  }

  const monthly = frequency === "monthly";
  const { error } = await getResend().emails.send(
    {
      from: getFromAddress(),
      to: [notifyEmail],
      subject: `New Set Free Gala donation: ${amount}${monthly ? "/mo" : ""}`,
      react: createElement(DonationNotifyEmail, {
        amount,
        frequency,
        customerEmail,
        customerName,
        sessionId: session.id,
      }),
    },
    { idempotencyKey: `notify/${session.id}` }
  );

  if (error) {
    console.error("Failed to send donation notification:", error);
  }
}

export async function sendTicketReceipt(session: Stripe.Checkout.Session) {
  const to = getCustomerEmail(session);

  if (!to) {
    console.warn(`No customer email for ticket session ${session.id}.`);
    return;
  }

  const product = getTicketProduct(session.metadata?.productId ?? null);
  const productTitle =
    product?.title ?? session.metadata?.productTitle ?? "Ticket Order";
  const quantity = Number.parseInt(session.metadata?.quantity ?? "1", 10);
  const sponsorName = session.metadata?.sponsorName || undefined;
  const logoUrl = session.metadata?.logoUrl || undefined;

  const { data, error } = await getResend().emails.send(
    {
      from: getFromAddress(),
      to: [to],
      subject: `Your Set Free Gala ${productTitle.toLowerCase()} receipt`,
      react: createElement(TicketReceiptEmail, {
        productTitle,
        quantity: Number.isFinite(quantity) ? quantity : 1,
        amount: formatSessionAmount(session),
        customerEmail: to,
        sponsorName,
        logoReceived: Boolean(logoUrl),
      }),
    },
    { idempotencyKey: `receipt/${session.id}` }
  );

  if (error) {
    console.error("Failed to send ticket receipt:", error);
    return;
  }

  console.info(`Sent ticket receipt ${data?.id} for ${session.id}.`);

  await sendOrderNotification({
    session,
    productTitle,
    quantity: Number.isFinite(quantity) ? quantity : 1,
    customerEmail: to,
    sponsorName,
    logoUrl,
  });
}

async function sendOrderNotification({
  session,
  productTitle,
  quantity,
  customerEmail,
  sponsorName,
  logoUrl,
}: {
  session: Stripe.Checkout.Session;
  productTitle: string;
  quantity: number;
  customerEmail: string;
  sponsorName?: string;
  logoUrl?: string;
}) {
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!notifyEmail) {
    return;
  }

  const lines = [
    `<p><strong>Order:</strong> ${escapeHtml(productTitle)}</p>`,
    `<p><strong>Quantity:</strong> ${quantity}</p>`,
    `<p><strong>Total:</strong> ${escapeHtml(formatSessionAmount(session))}</p>`,
    `<p><strong>Customer:</strong> ${escapeHtml(customerEmail)}</p>`,
    sponsorName
      ? `<p><strong>Sponsor:</strong> ${escapeHtml(sponsorName)}</p>`
      : "",
    logoUrl
      ? `<p><strong>Logo:</strong> <a href="${escapeHtml(logoUrl)}">${escapeHtml(logoUrl)}</a></p>`
      : "",
    `<p><strong>Stripe session:</strong> ${escapeHtml(session.id)}</p>`,
  ].join("");

  const { error } = await getResend().emails.send(
    {
      from: getFromAddress(),
      to: [notifyEmail],
      subject: `New Set Free Gala order: ${productTitle}`,
      html: lines,
    },
    { idempotencyKey: `notify/${session.id}` }
  );

  if (error) {
    console.error("Failed to send order notification:", error);
  }
}

export async function sendRaffleReceipt(session: Stripe.Checkout.Session) {
  const buyerEmail =
    session.metadata?.buyerEmail || getCustomerEmail(session);

  if (!buyerEmail) {
    console.warn(`No customer email for raffle session ${session.id}.`);
    return;
  }

  const buyerName = session.metadata?.buyerName || "Raffle supporter";
  const buyerPhone = session.metadata?.buyerPhone || "Not provided";
  const parsedQuantity = Number.parseInt(session.metadata?.quantity ?? "1", 10);
  const quantity = Number.isFinite(parsedQuantity) ? parsedQuantity : 1;
  const amount = formatSessionAmount(session);

  const { data, error } = await getResend().emails.send(
    {
      from: getFromAddress(),
      to: [buyerEmail],
      subject: "Your Fieldy signature bass raffle purchase",
      react: createElement(RaffleReceiptEmail, {
        buyerName,
        quantity,
        amount,
        customerEmail: buyerEmail,
      }),
    },
    { idempotencyKey: `raffle-receipt/${session.id}` }
  );

  if (error) {
    console.error("Failed to send raffle receipt:", error);
  } else {
    console.info(`Sent raffle receipt ${data?.id} for ${session.id}.`);
  }

  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!notifyEmail) {
    return;
  }

  const lines = [
    `<p><strong>Raffle:</strong> Fieldy Signature Bass</p>`,
    `<p><strong>Name:</strong> ${escapeHtml(buyerName)}</p>`,
    `<p><strong>Phone:</strong> ${escapeHtml(buyerPhone)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(buyerEmail)}</p>`,
    `<p><strong>Tickets:</strong> ${quantity}</p>`,
    `<p><strong>Total:</strong> ${escapeHtml(amount)}</p>`,
    `<p><strong>Stripe session:</strong> ${escapeHtml(session.id)}</p>`,
  ].join("");

  const { error: notifyError } = await getResend().emails.send(
    {
      from: getFromAddress(),
      to: [notifyEmail],
      subject: `New bass raffle purchase: ${quantity} ticket${quantity === 1 ? "" : "s"} — ${buyerName}`,
      html: lines,
    },
    { idempotencyKey: `raffle-notify/${session.id}` }
  );

  if (notifyError) {
    console.error("Failed to send raffle notification:", notifyError);
  }
}
