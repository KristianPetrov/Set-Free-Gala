import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getRaffleProduct } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Raffle Purchase Confirmed",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RaffleSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    redirect("/#raffle");
  }

  const session = await getStripe().checkout.sessions.retrieve(sessionId);

  if (session.status !== "complete" || session.metadata?.kind !== "raffle") {
    redirect("/#raffle");
  }

  const quantity = Number.parseInt(session.metadata.quantity ?? "1", 10);
  const safeQuantity = Number.isFinite(quantity) ? quantity : 1;
  const amount =
    session.amount_total != null
      ? (session.amount_total / 100).toLocaleString("en-US", {
          style: "currency",
          currency: (session.currency ?? "usd").toUpperCase(),
          maximumFractionDigits: 0,
        })
      : null;
  const email =
    session.metadata.buyerEmail || session.customer_details?.email;
  const buyerName = session.metadata.buyerName;
  const product = getRaffleProduct(session.metadata.productId ?? null);
  const productTitle =
    product?.shortTitle ??
    session.metadata.productTitle ??
    "Fieldy’s Signed Bass";

  return (
    <main className="grain flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
        Raffle Purchase Confirmed
      </p>

      <h1 className="mt-8 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
        <span className="gold-text uppercase tracking-[0.06em]">
          You&rsquo;re in the drawing.
        </span>
        <span className="mt-3 block font-serif-italic text-2xl italic text-paper-dim md:text-3xl">
          Good luck{buyerName ? `, ${buyerName}` : ""}.
        </span>
      </h1>

      <div className="mt-10 border border-line px-8 py-6">
        <p className="text-[10px] uppercase tracking-[0.35em] text-paper-dim">
          {productTitle}
        </p>
        <p className="mt-3 font-display text-2xl uppercase tracking-[0.12em]">
          {safeQuantity} Raffle {safeQuantity === 1 ? "Ticket" : "Tickets"}
        </p>
        {amount && <p className="mt-2 text-sm text-paper-dim">{amount}</p>}
      </div>

      <p className="mt-8 max-w-md text-sm leading-relaxed text-paper-dim">
        {email
          ? `A confirmation has been sent to ${email}.`
          : "A confirmation has been sent to your email."}{" "}
        Your purchase supports Set Free and its community outreach.
      </p>

      <Link
        href="/#raffle"
        className="mt-12 border border-gold px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        Back to the Raffle
      </Link>
    </main>
  );
}
