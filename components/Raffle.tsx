"use client";

import Image from "next/image";
import { useRef, useState, useTransition, type FormEvent } from "react";
import { createRaffleSession } from "@/app/actions";
import { raffleProducts, type RaffleProductId } from "@/lib/products";
import { Reveal } from "./Reveal";

const MAX_QUANTITY = 100;

function clampQuantity(value: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, value));
}

export function Raffle() {
  const checkoutRef = useRef<HTMLDivElement>(null);
  const [selectedProductId, setSelectedProductId] =
    useState<RaffleProductId>("fieldy_bass");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const selectedProduct =
    raffleProducts.find((product) => product.id === selectedProductId) ??
    raffleProducts[0];
  const total = selectedProduct.unitAmount * quantity;
  const totalLabel = (total / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const ticketLabel = quantity === 1 ? "Ticket" : "Tickets";

  function selectProduct(id: RaffleProductId) {
    setSelectedProductId(id);
    setError(null);

    requestAnimationFrame(() => {
      const checkout = checkoutRef.current;
      if (!checkout) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const checkoutTop = checkout.getBoundingClientRect().top;
      const needsScroll = checkoutTop > window.innerHeight * 0.4;

      if (needsScroll) {
        checkout.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.set("productId", selectedProductId);
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
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <Reveal>
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
              Two raffles · $25 per entry
            </p>
            <h2 className="gold-text mx-auto mt-5 max-w-5xl font-display text-4xl uppercase leading-tight tracking-[0.04em] md:mt-6 md:text-6xl lg:text-7xl">
              Choose Your Prize
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-serif-italic text-lg italic leading-relaxed text-paper-dim md:mt-6 md:text-2xl">
              Pick a drawing, enter your details, and checkout.
            </p>
          </div>
        </Reveal>

        <p className="mt-10 text-center text-[11px] uppercase tracking-[0.35em] text-paper-dim md:mt-14">
          Tap a prize to continue
        </p>

        <Reveal>
          <div
            className="mx-auto mt-4 grid max-w-3xl grid-cols-2 gap-3 md:mt-6 md:gap-5"
            role="radiogroup"
            aria-label="Choose a raffle prize"
          >
            {raffleProducts.map((product) => {
              const selected = product.id === selectedProductId;

              return (
                <button
                  key={product.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => selectProduct(product.id)}
                  className={`deco-frame relative flex flex-col overflow-hidden text-left transition-all duration-300 ${
                    selected
                      ? "scale-[1.02] border-gold bg-gold/10 ring-1 ring-gold"
                      : "bg-ink-soft opacity-55 hover:opacity-90"
                  }`}
                >
                  <span
                    className={`absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-[8px] uppercase tracking-[0.3em] transition-opacity md:px-3 md:text-[9px] ${
                      selected
                        ? "bg-gold text-ink opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    Selected
                  </span>

                  <div className="relative aspect-3/4 w-full overflow-hidden bg-ink">
                    <Image
                      src={product.imageSrc}
                      alt=""
                      width={product.imageWidth}
                      height={product.imageHeight}
                      sizes="(max-width: 768px) 45vw, 280px"
                      className={`h-full w-full object-cover transition-opacity ${
                        selected ? "opacity-100" : "opacity-70"
                      }`}
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-3 md:gap-3 md:p-5">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-gold md:text-[10px]">
                      {product.priceLabel} / ticket
                    </span>
                    <span
                      className={`font-display text-sm uppercase leading-snug tracking-[0.08em] md:text-xl md:tracking-widest ${
                        selected ? "text-gold-bright" : "text-paper"
                      }`}
                    >
                      {product.shortTitle}
                    </span>
                    <span className="hidden text-xs leading-relaxed text-paper-dim md:block">
                      {product.detail.replace("One entry to win ", "Win ")}
                    </span>
                    <span
                      className={`mt-auto pt-1 text-[9px] uppercase tracking-[0.25em] md:text-[10px] ${
                        selected ? "text-gold" : "text-paper-dim/70"
                      }`}
                    >
                      {selected ? "Checkout ↓" : "Tap to select"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form
            id="raffle-checkout"
            ref={checkoutRef}
            onSubmit={submit}
            className="mx-auto mt-8 max-w-3xl scroll-mt-24 border border-gold/50 bg-ink-soft p-5 shadow-[0_0_0_1px_rgba(212,175,94,0.2)] md:mt-12 md:p-10"
          >
            <div className="flex items-start gap-4 border-b border-line pb-5 md:gap-6 md:pb-6">
              <div className="relative h-20 w-14 shrink-0 overflow-hidden border border-line md:h-28 md:w-20">
                <Image
                  src={selectedProduct.imageSrc}
                  alt={selectedProduct.imageAlt}
                  width={selectedProduct.imageWidth}
                  height={selectedProduct.imageHeight}
                  sizes="80px"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                  Your Selection
                </p>
                <p className="mt-1 font-display text-xl uppercase tracking-widest text-paper md:text-3xl md:tracking-[0.08em]">
                  {selectedProduct.shortTitle}
                </p>
                <p className="mt-1 text-sm text-paper-dim">
                  {selectedProduct.priceLabel} per ticket
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 md:mt-6 md:gap-5">
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
                  className="mt-2 w-full border border-line bg-ink px-4 py-3.5 text-base text-paper outline-none placeholder:text-paper-dim/50 focus:border-gold"
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
                  className="mt-2 w-full border border-line bg-ink px-4 py-3.5 text-base text-paper outline-none placeholder:text-paper-dim/50 focus:border-gold"
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
                  className="mt-2 w-full border border-line bg-ink px-4 py-3.5 text-base text-paper outline-none placeholder:text-paper-dim/50 focus:border-gold"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between md:mt-6 md:pt-6">
              <div>
                <label
                  htmlFor="raffle-quantity"
                  className="text-[10px] uppercase tracking-[0.3em] text-paper-dim"
                >
                  Number of tickets
                </label>
                <div className="mt-2 flex items-stretch">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) => clampQuantity(current - 1))
                    }
                    disabled={quantity <= 1}
                    className="h-12 w-12 border border-line text-2xl text-gold transition-colors hover:border-gold disabled:opacity-30"
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
                      setQuantity(
                        clampQuantity(Number.isFinite(next) ? next : 1)
                      );
                    }}
                    className="h-12 w-16 border-y border-line bg-ink text-center font-display text-2xl text-paper outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) => clampQuantity(current + 1))
                    }
                    disabled={quantity >= MAX_QUANTITY}
                    className="h-12 w-12 border border-line text-2xl text-gold transition-colors hover:border-gold disabled:opacity-30"
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
                <p className="gold-text mt-1 font-display text-3xl md:text-4xl">
                  {totalLabel}
                </p>
              </div>
            </div>

            {error && (
              <p className="mt-5 text-center text-sm text-paper" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-6 w-full bg-gold px-6 py-5 text-[11px] uppercase tracking-[0.25em] text-ink transition-opacity hover:opacity-80 disabled:cursor-wait disabled:opacity-60 md:text-sm md:tracking-[0.2em]"
            >
              {pending
                ? "Opening Secure Checkout…"
                : `Buy ${quantity} ${ticketLabel} — ${totalLabel}`}
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-paper-dim">
              Secure checkout via Stripe. Confirmation is emailed after payment.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
