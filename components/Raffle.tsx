"use client";

import Image from "next/image";
import { useState, useTransition, type FormEvent } from "react";
import { createRaffleSession } from "@/app/actions";
import { raffleProduct } from "@/lib/products";
import { Reveal } from "./Reveal";

const MAX_QUANTITY = 100;

function clampQuantity(value: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, value));
}

export function Raffle() {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const total = raffleProduct.unitAmount * quantity;
  const totalLabel = (total / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const ticketLabel = quantity === 1 ? "Ticket" : "Tickets";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.set("quantity", String(quantity));

    startTransition(async () => {
      try {
        await createRaffleSession(formData);
      } catch {
        setError(
          "We couldn’t start checkout. Please check your details and try again."
        );
      }
    });
  }

  return (
    <section id="raffle" className="scroll-mt-24 border-y border-gold/40 bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
              One-of-a-kind raffle · $25 each
            </p>
            <h2 className="gold-text mx-auto mt-6 max-w-5xl font-display text-4xl uppercase leading-tight tracking-[0.04em] md:text-6xl lg:text-7xl">
              Win Fieldy&rsquo;s Signed Bass
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-serif-italic text-xl italic leading-relaxed text-paper-dim md:text-2xl">
              Take home an Ibanez GIO bass signed by Fieldy of Korn—and help
              Set Free keep showing up for the community.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <Reveal>
            <div className="deco-frame bg-ink-soft p-3 md:p-5">
              <Image
                src="/fieldy-bass-raffle.png"
                alt="Set Free Gala raffle flyer featuring an Ibanez GIO bass signed by Fieldy of Korn"
                width={1024}
                height={1536}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={submit}
              className="deco-frame bg-ink-soft p-6 md:p-10 lg:p-12"
            >
              <div className="flex flex-col gap-5 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                    Raffle entry
                  </p>
                  <p className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-paper md:text-4xl">
                    {raffleProduct.priceLabel} per ticket
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-paper-dim sm:max-w-48 sm:text-right">
                  Buy one or several entries in a single secure checkout.
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">
                    Full Name
                  </span>
                  <input
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder="Your full name"
                    className="mt-3 w-full border border-line bg-ink px-4 py-4 text-base text-paper outline-none placeholder:text-paper-dim/50 focus:border-gold"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder="you@example.com"
                    className="mt-3 w-full border border-line bg-ink px-4 py-4 text-base text-paper outline-none placeholder:text-paper-dim/50 focus:border-gold"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">
                    Phone Number
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    maxLength={30}
                    placeholder="(714) 555-0123"
                    className="mt-3 w-full border border-line bg-ink px-4 py-4 text-base text-paper outline-none placeholder:text-paper-dim/50 focus:border-gold"
                  />
                </label>
              </div>

              <div className="mt-8 border-y border-line py-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <label
                      htmlFor="raffle-quantity"
                      className="text-[10px] uppercase tracking-[0.3em] text-paper-dim"
                    >
                      Number of tickets
                    </label>
                    <div className="mt-3 flex items-stretch">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((current) => clampQuantity(current - 1))
                        }
                        disabled={quantity <= 1}
                        className="h-14 w-14 border border-line text-2xl text-gold transition-colors hover:border-gold disabled:opacity-30"
                        aria-label="Remove one raffle ticket"
                      >
                        −
                      </button>
                      <input
                        id="raffle-quantity"
                        type="number"
                        min="1"
                        max={MAX_QUANTITY}
                        inputMode="numeric"
                        value={quantity}
                        onChange={(event) => {
                          const next = Number.parseInt(event.target.value, 10);
                          setQuantity(clampQuantity(Number.isFinite(next) ? next : 1));
                        }}
                        className="h-14 w-20 border-y border-line bg-ink text-center font-display text-2xl text-paper outline-none focus:border-gold"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((current) => clampQuantity(current + 1))
                        }
                        disabled={quantity >= MAX_QUANTITY}
                        className="h-14 w-14 border border-line text-2xl text-gold transition-colors hover:border-gold disabled:opacity-30"
                        aria-label="Add one raffle ticket"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">
                      Total due today
                    </p>
                    <p className="gold-text mt-2 font-display text-4xl md:text-5xl">
                      {totalLabel}
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <p className="mt-6 text-center text-sm text-paper" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="mt-8 w-full bg-gold px-6 py-6 font-display text-sm uppercase tracking-[0.18em] text-ink transition-all hover:bg-gold-bright disabled:cursor-wait disabled:opacity-60 md:text-base md:tracking-[0.25em]"
              >
                {pending
                  ? "Opening Secure Checkout…"
                  : `Buy ${quantity} Raffle ${ticketLabel} — ${totalLabel}`}
              </button>

              <p className="mt-5 text-center text-xs leading-relaxed text-paper-dim">
                Secure checkout is powered by Stripe. After payment, we&rsquo;ll
                email your confirmation and send your entry details to Set Free.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
