import { Reveal } from "./Reveal";

const schedule = [
  {
    time: "6:00 PM",
    title: "Doors Open",
    detail: "Arrival, reception, and the silent auction opens.",
  },
  {
    time: "6:30 PM",
    title: "Dinner Is Served",
    detail: "A seated dinner at the Set Free Palace.",
  },
  {
    time: "7:00 PM",
    title: "Tim Storey",
    detail: "An evening with our special guest speaker.",
  },
  {
    time: "7:30 PM",
    title: "Stories of Freedom",
    detail: "Hear directly from lives changed by this work.",
  },
  {
    time: "8:00 PM",
    title: "Silent Auction Closes",
    detail: "Final bids, and the moment the room becomes a movement.",
  },
];

export function Evening() {
  return (
    <section
      id="evening"
      className="scroll-mt-24 border-t border-line bg-ink-soft"
    >
      <div className="mx-auto max-w-6xl px-6 py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
              03 — The Evening
            </p>
            <h2 className="mt-8 font-display text-4xl leading-tight md:text-5xl">
              One night,{" "}
              <span className="font-serif-italic italic text-gold-bright">
                measured in lives.
              </span>
            </h2>
            <div className="mt-10 space-y-1 text-[11px] uppercase tracking-[0.3em] text-paper-dim">
              <p className="text-paper">Sunday, July 26 · 6 PM</p>
              <p>The Set Free Palace</p>
              <p>1171 N West St, Anaheim</p>
              <p className="pt-2 text-gold">Black &amp; White Formal Attire</p>
            </div>
          </Reveal>

          <div className="md:col-span-8">
            <ol>
              {schedule.map((item, i) => (
                <Reveal key={item.time} delay={i * 80}>
                  <li className="group grid gap-2 border-b border-line py-8 transition-colors first:border-t hover:bg-gold/[0.04] md:grid-cols-12 md:items-baseline md:gap-6">
                    <span className="font-mono text-xs text-gold md:col-span-2">
                      {item.time}
                    </span>
                    <span className="font-display text-2xl md:col-span-4">
                      {item.title}
                    </span>
                    <span className="text-sm leading-relaxed text-paper-dim md:col-span-6">
                      {item.detail}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
