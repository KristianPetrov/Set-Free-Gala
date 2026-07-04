import { Reveal } from "./Reveal";

const stats = [
  { value: "Food", label: "Warm meals for anyone who shows up hungry — no questions asked." },
  { value: "Clothes", label: "Clothing and essentials for men and women rebuilding from nothing." },
  { value: "Shelter", label: "A safe place to sleep, and a path from the street to a home." },
  { value: "Outreach", label: "Daily outreaches meeting people in the middle of mental health and substance use struggles." },
];

export function Impact() {
  return (
    <section id="impact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
          04 — Where It Goes
        </p>
        <h2 className="mt-8 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
          Every dollar has{" "}
          <span className="font-serif-italic italic text-gold-bright">
            a face and a name.
          </span>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.value} delay={i * 100} className="min-w-0 bg-ink">
            <div className="@container flex h-full flex-col justify-between gap-10 p-8 transition-colors hover:bg-ink-soft">
              <span className="gold-text font-display text-[clamp(1.375rem,10cqw,2.25rem)] uppercase tracking-[0.06em]">
                {stat.value}
              </span>
              <span className="text-sm leading-relaxed text-paper-dim">
                {stat.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
