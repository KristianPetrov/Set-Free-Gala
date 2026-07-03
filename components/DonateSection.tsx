"use client";

import { useState, useTransition } from "react";
import { createDonationSession } from "@/app/actions";
import { Reveal } from "./Reveal";

const presets = [50, 100, 250, 500, 1000, 5000];

function formatUsd(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function DonateSection() {
  const [amount, setAmount] = useState<number | null>(250);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const effectiveAmount = custom ? Number.parseFloat(custom) : amount;

  function submit() {
    setError(null);

    if (!effectiveAmount || !Number.isFinite(effectiveAmount) || effectiveAmount < 1) {
      setError("Please choose or enter an amount of at least $1.");
      return;
    }

    const formData = new FormData();
    formData.set("amount", String(effectiveAmount));
    formData.set("frequency", monthly ? "monthly" : "once");

    startTransition(async () => {
      try {
        await createDonationSession(formData);
      } catch {
        // redirect() is handled by the framework and never rejects here
        setError("Something went wrong starting checkout. Please try again.");
      }
    });
  }

  return (
    <section
      id="donate"
      className="scroll-mt-24 border-t border-line bg-paper text-ink"
    >
      <div className="mx-auto max-w-6xl px-6 py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.5em] text-ink/50">
              05 — Give
            </p>
            <h2 className="mt-8 font-display text-4xl leading-tight md:text-6xl">
              Your gift is{" "}
              <span className="font-serif-italic italic text-ink/50">
                someone&rsquo;s beginning.
              </span>
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-ink/60">
              Can&rsquo;t attend the gala? Give from anywhere. Every dollar
              funds food, clothes, and shelter, daily outreaches, and help
              for those struggling with mental health and substance use.
              Donations are processed securely through Stripe.
            </p>
            <p className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ink/40">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              Secured by Stripe
            </p>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-7">
            <div className="border border-ink/15 p-8 md:p-12">
              {/* Frequency toggle */}
              <div
                className="grid grid-cols-2 border border-ink"
                role="group"
                aria-label="Donation frequency"
              >
                {[
                  { label: "Give Once", value: false },
                  { label: "Give Monthly", value: true },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setMonthly(opt.value)}
                    aria-pressed={monthly === opt.value}
                    className={`py-3 text-[11px] uppercase tracking-[0.25em] transition-colors ${
                      monthly === opt.value
                        ? "bg-ink text-paper"
                        : "bg-transparent text-ink hover:bg-ink/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Preset amounts */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                {presets.map((preset) => {
                  const selected = !custom && amount === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setAmount(preset);
                        setCustom("");
                      }}
                      aria-pressed={selected}
                      className={`border py-4 font-display text-lg transition-colors ${
                        selected
                          ? "border-ink bg-ink text-paper"
                          : "border-ink/20 hover:border-ink"
                      }`}
                    >
                      {formatUsd(preset)}
                    </button>
                  );
                })}
              </div>

              {/* Custom amount */}
              <label className="mt-6 flex items-center gap-3 border-b border-ink/30 pb-2 focus-within:border-ink">
                <span className="font-display text-2xl text-ink/40">$</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  inputMode="decimal"
                  placeholder="Custom amount"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  className="w-full bg-transparent py-2 font-display text-2xl outline-none placeholder:text-ink/30"
                  aria-label="Custom donation amount in dollars"
                />
              </label>

              {error && (
                <p className="mt-4 text-sm text-ink" role="alert">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={submit}
                disabled={pending}
                className="mt-8 w-full bg-ink py-5 text-[11px] uppercase tracking-[0.3em] text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
              >
                {pending
                  ? "Opening Secure Checkout…"
                  : effectiveAmount && Number.isFinite(effectiveAmount) && effectiveAmount >= 1
                    ? `Donate ${formatUsd(effectiveAmount)}${monthly ? " / month" : ""}`
                    : "Donate"}
              </button>

              <p className="mt-4 text-center text-xs text-ink/40">
                You&rsquo;ll be redirected to Stripe&rsquo;s secure checkout to
                complete your gift.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
