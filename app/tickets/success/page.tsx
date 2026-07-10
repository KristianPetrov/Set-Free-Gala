import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTicketProduct } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Ticket Order Confirmed",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function TicketSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    redirect("/#tickets");
  }

  const session = await getStripe().checkout.sessions.retrieve(sessionId);

  if (session.status !== "complete" || session.metadata?.kind !== "ticket") {
    redirect("/#tickets");
  }

  const product = getTicketProduct(session.metadata.productId ?? null);
  const quantity = Number.parseInt(session.metadata.quantity ?? "1", 10);
  const amount =
    session.amount_total != null
      ? (session.amount_total / 100).toLocaleString("en-US", {
          style: "currency",
          currency: (session.currency ?? "usd").toUpperCase(),
        })
      : null;
  const email = session.customer_details?.email;
  const sponsorName = session.metadata.sponsorName;

  return (
    <main className="grain flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
        Order Confirmed
      </p>

      <h1 className="mt-8 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
        <span className="gold-text uppercase tracking-[0.06em]">
          You&rsquo;re on the list.
        </span>
        <span className="mt-2 block font-serif-italic italic text-paper-dim">
          We&rsquo;ll see you at the Palace.
        </span>
      </h1>

      <div className="mt-10 border border-line px-8 py-6">
        <p className="text-[10px] uppercase tracking-[0.35em] text-paper-dim">
          {product?.requiresSponsorLogo ? "Sponsorship" : "Admission"}
        </p>
        <p className="mt-3 font-display text-2xl uppercase tracking-[0.12em]">
          {product?.title ?? session.metadata.productTitle ?? "Ticket Order"}
        </p>
        <p className="mt-2 text-sm text-paper-dim">
          Quantity {Number.isFinite(quantity) ? quantity : 1}
          {amount ? ` · ${amount}` : ""}
        </p>
        {sponsorName && (
          <p className="mt-4 text-sm text-paper-dim">
            Sponsor name: {sponsorName}
          </p>
        )}
      </div>

      <p className="mt-8 max-w-md text-sm leading-relaxed text-paper-dim">
        {email
          ? `A Set Free Gala receipt has been sent to ${email}.`
          : "A Set Free Gala receipt has been sent to your email."}{" "}
        Your order supports food, clothing, shelter, and daily outreach.
      </p>

      <Link
        href="/"
        className="mt-12 border border-gold px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        Back to the Gala
      </Link>
    </main>
  );
}
