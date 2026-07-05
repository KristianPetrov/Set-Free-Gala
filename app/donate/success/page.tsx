import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Thank You",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DonationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    redirect("/#donate");
  }

  const session = await getStripe().checkout.sessions.retrieve(sessionId);

  if (session.status !== "complete") {
    redirect("/#donate");
  }

  const amount =
    session.amount_total != null
      ? (session.amount_total / 100).toLocaleString("en-US", {
          style: "currency",
          currency: (session.currency ?? "usd").toUpperCase(),
        })
      : null;

  const monthly = session.mode === "subscription";
  const email = session.customer_details?.email;

  return (
    <main className="grain flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
        Gift Received
      </p>

      <h1 className="mt-8 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
        <span className="gold-text uppercase tracking-[0.06em]">Thank you.</span>
        <span className="mt-2 block font-serif-italic italic text-paper-dim">
          Someone&rsquo;s story just changed.
        </span>
      </h1>

      {amount && (
        <p className="mt-10 border border-line px-8 py-4 font-display text-2xl">
          {amount}
          {monthly && (
            <span className="text-base italic text-paper-dim"> / month</span>
          )}
        </p>
      )}

      <p className="mt-8 max-w-md text-sm leading-relaxed text-paper-dim">
        {email
          ? `A receipt has been sent to ${email}.`
          : "A receipt has been sent to your email."}{" "}
        Your generosity funds food, clothes, shelter, and daily outreach to
        those still finding their way to freedom.
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
