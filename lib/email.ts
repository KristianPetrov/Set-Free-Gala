import "server-only";

import { createElement } from "react";
import { Resend } from "resend";
import type Stripe from "stripe";
import { DonationReceiptEmail } from "@/emails/donation-receipt";
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
  const { data, error } = await getResend().emails.send(
    {
      from: getFromAddress(),
      to: [to],
      subject: "Your Set Free Gala donation receipt",
      react: createElement(DonationReceiptEmail, {
        amount: formatSessionAmount(session),
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
      subject: "Your Set Free Gala ticket receipt",
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
