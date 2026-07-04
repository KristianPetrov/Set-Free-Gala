import { Reveal } from "./Reveal";

const tiers = [
  {
    price: "$100",
    title: "Ticket",
    detail: "One seat for an unforgettable evening at the Set Free Palace.",
  },
  {
    price: "$1,000",
    title: "Table",
    detail: "A full table for your family, friends, church, or crew.",
  },
  {
    price: "$1,000",
    title: "Sponsor",
    detail: "One table for your party plus your logo featured on the banner.",
    badge: "Sponsorship",
  },
  {
    price: "$500",
    title: "Sponsor",
    detail: "Two tickets plus your logo featured on the banner.",
    badge: "Sponsorship",
  },
];

export function Tickets() {
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, i) => (
            <Reveal key={`${tier.title}-${tier.price}`} delay={i * 100}>
              <div className="deco-frame flex h-full flex-col gap-6 bg-ink p-8 pt-10 text-center transition-colors hover:bg-ink-soft">
                {tier.badge ? (
                  <span className="mx-auto -mt-2 text-[10px] uppercase tracking-[0.35em] text-gold">
                    {tier.badge}
                  </span>
                ) : (
                  <span className="mx-auto -mt-2 text-[10px] uppercase tracking-[0.35em] text-paper-dim">
                    Admission
                  </span>
                )}
                <span className="gold-text font-display text-5xl">
                  {tier.price}
                </span>
                <span className="font-display text-lg uppercase tracking-[0.25em] text-paper">
                  {tier.title}
                </span>
                <span className="text-sm leading-relaxed text-paper-dim">
                  {tier.detail}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 flex flex-col items-center gap-6 text-center">
            <p className="max-w-xl text-sm leading-relaxed text-paper-dim">
              A silent auction runs throughout the evening — come ready to bid.
              To reserve tickets, tables, or a sponsorship, text us and
              we&rsquo;ll take care of the rest.
            </p>
            <a
              href="sms:+17144004573"
              className="bg-gold px-10 py-5 text-[11px] uppercase tracking-[0.3em] text-ink transition-opacity hover:opacity-80"
            >
              Text +1 (714) 400-4573 for Tickets
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
