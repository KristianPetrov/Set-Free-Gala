"use client";

import { useState, useTransition } from "react";
import { createTicketSession } from "@/app/actions";
import { ticketProducts, type TicketProductId } from "@/lib/products";
import { Reveal } from "./Reveal";

function validateLogo(file: File | null) {
  if (!file) {
    return "Please upload your sponsor logo.";
  }

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    return "Logo must be a PNG or JPG image.";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "Logo must be 5MB or smaller.";
  }

  return null;
}

export function Tickets() {
  const [selectedId, setSelectedId] = useState<TicketProductId>("ticket");
  const [quantity, setQuantity] = useState(1);
  const [sponsorName, setSponsorName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const selectedProduct =
    ticketProducts.find((product) => product.id === selectedId) ??
    ticketProducts[0];
  const total = selectedProduct.unitAmount * quantity;
  const totalLabel = (total / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  function submit() {
    setError(null);

    if (selectedProduct.requiresSponsorLogo) {
      const name = sponsorName.trim();
      const logoError = validateLogo(logoFile);

      if (!name) {
        setError("Please enter the sponsor or company name.");
        return;
      }

      if (logoError) {
        setError(logoError);
        return;
      }
    }

    startTransition(async () => {
      try {
        let logoUrl = "";

        if (selectedProduct.requiresSponsorLogo && logoFile) {
          const uploadFormData = new FormData();
          uploadFormData.set("file", logoFile);

          const response = await fetch("/api/upload-logo", {
            method: "POST",
            body: uploadFormData,
          });
          const payload = (await response.json()) as {
            url?: string;
            error?: string;
          };

          if (!response.ok || !payload.url) {
            setError(payload.error ?? "Unable to upload logo. Please try again.");
            return;
          }

          logoUrl = payload.url;
        }

        const formData = new FormData();
        formData.set("productId", selectedProduct.id);
        formData.set("quantity", String(quantity));
        formData.set("sponsorName", sponsorName.trim());
        formData.set("logoUrl", logoUrl);

        await createTicketSession(formData);
      } catch {
        setError("Something went wrong starting checkout. Please try again.");
      }
    });
  }

  return (
    <section
      id="tickets"
      className="scroll-mt-24 border-t border-line bg-ink-soft"
    >
      <div className="mx-auto max-w-6xl px-6 py-32">
        <Reveal>
          <p className="text-center text-[11px] uppercase tracking-[0.5em] text-gold">
            03 — Tickets &amp; Sponsorships
          </p>
          <h2 className="gold-text mx-auto mt-8 max-w-3xl text-center font-display text-4xl uppercase leading-tight tracking-[0.06em] md:text-6xl">
            Reserve Your Seat
          </h2>
          <div className="deco-divider mx-auto mt-8 max-w-xs text-sm" aria-hidden>
            ◆
          </div>
        </Reveal>

        <p className="mt-14 text-center text-[11px] uppercase tracking-[0.35em] text-paper-dim">
          Choose an option below
        </p>

        <div
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          role="radiogroup"
          aria-label="Ticket and sponsorship options"
        >
          {ticketProducts.map((tier, i) => {
            const selected = tier.id === selectedId;

            return (
              <Reveal key={tier.id} delay={i * 100}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => {
                    setSelectedId(tier.id);
                    setQuantity(1);
                    setError(null);
                  }}
                  className={`deco-frame relative flex h-full w-full flex-col gap-6 p-8 pt-12 text-center transition-all duration-300 ${
                    selected
                      ? "scale-[1.02] border-gold bg-gold/10 ring-1 ring-gold"
                      : "bg-ink opacity-50 hover:opacity-80 hover:bg-ink-soft"
                  }`}
                >
                  <span
                    className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-3 py-1 text-[9px] uppercase tracking-[0.35em] transition-opacity ${
                      selected
                        ? "bg-gold text-ink opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    Selected
                  </span>
                  <span
                    className={`mx-auto text-[10px] uppercase tracking-[0.35em] ${
                      selected || tier.requiresSponsorLogo
                        ? "text-gold"
                        : "text-paper-dim"
                    }`}
                  >
                    {tier.categoryLabel}
                  </span>
                  <span className="gold-text font-display text-5xl">
                    {tier.priceLabel}
                  </span>
                  <span
                    className={`font-display text-lg uppercase tracking-[0.25em] ${
                      selected ? "text-gold-bright" : "text-paper"
                    }`}
                  >
                    {tier.title}
                  </span>
                  <span className="text-sm leading-relaxed text-paper-dim">
                    {tier.detail}
                  </span>
                  <span
                    className={`mt-auto text-[10px] uppercase tracking-[0.3em] ${
                      selected ? "text-gold" : "text-paper-dim/70"
                    }`}
                  >
                    {selected ? "Ready to purchase ↓" : "Tap to select"}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div
            id="ticket-checkout"
            className="mx-auto mt-16 max-w-3xl border border-gold/50 bg-ink p-8 shadow-[0_0_0_1px_rgba(212,175,94,0.2)] md:p-12"
          >
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                  Your Selection
                </p>
                <p className="mt-2 font-display text-2xl uppercase tracking-[0.18em] text-paper md:text-3xl">
                  {selectedProduct.title}
                </p>
                <p className="mt-2 font-display text-xl text-gold">
                  {selectedProduct.priceLabel}
                  {selectedProduct.quantityAllowed && quantity > 1
                    ? ` × ${quantity}`
                    : ""}
                </p>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-dim">
                  {selectedProduct.detail}
                </p>
              </div>

              {selectedProduct.quantityAllowed && (
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">
                    Quantity
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    inputMode="numeric"
                    value={quantity}
                    onChange={(event) => {
                      const next = Number.parseInt(event.target.value, 10);
                      setQuantity(Number.isFinite(next) ? next : 1);
                    }}
                    className="mt-3 w-28 border border-line bg-transparent px-4 py-3 text-center font-display text-2xl text-paper outline-none focus:border-gold"
                    aria-label="Quantity"
                  />
                </label>
              )}
            </div>

            {selectedProduct.requiresSponsorLogo && (
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">
                    Sponsor Name
                  </span>
                  <input
                    type="text"
                    value={sponsorName}
                    onChange={(event) => setSponsorName(event.target.value)}
                    placeholder="Company, church, or family name"
                    className="mt-3 w-full border border-line bg-transparent px-4 py-4 text-sm text-paper outline-none placeholder:text-paper-dim/60 focus:border-gold"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">
                    Sponsor Logo
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(event) =>
                      setLogoFile(event.target.files?.[0] ?? null)
                    }
                    className="mt-3 w-full border border-line bg-transparent px-4 py-3 text-sm text-paper file:mr-4 file:border-0 file:bg-gold file:px-4 file:py-2 file:text-[10px] file:uppercase file:tracking-[0.25em] file:text-ink"
                  />
                  <span className="mt-2 block text-xs text-paper-dim">
                    PNG or JPG, 5MB max.
                  </span>
                </label>
              </div>
            )}

            {error && (
              <p className="mt-6 text-center text-sm text-paper" role="alert">
                {error}
              </p>
            )}

            <div className="mt-10 flex flex-col items-center gap-4 border-t border-line pt-8 text-center">
              <p className="text-[11px] uppercase tracking-[0.35em] text-paper-dim">
                Total due today
              </p>
              <p className="gold-text font-display text-4xl md:text-5xl">
                {totalLabel}
              </p>
              <button
                type="button"
                onClick={submit}
                disabled={pending || quantity < 1 || quantity > 20}
                className="w-full bg-gold px-10 py-5 text-[11px] uppercase tracking-[0.3em] text-ink transition-opacity hover:opacity-80 disabled:opacity-50 md:w-auto"
              >
                {pending
                  ? "Opening Secure Checkout..."
                  : `Buy ${selectedProduct.title} — ${totalLabel}`}
              </button>
              <p className="max-w-xl text-xs leading-relaxed text-paper-dim">
                You&rsquo;ll be redirected to Stripe&rsquo;s secure checkout.
                Receipts are sent by email after payment.
              </p>
              <a
                href="sms:+17144004573"
                className="text-[10px] uppercase tracking-[0.3em] text-gold underline underline-offset-4"
              >
                Prefer to text? +1 (714) 400-4573
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-12 text-center">
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-paper-dim">
              A silent auction runs throughout the evening — come ready to bid.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
