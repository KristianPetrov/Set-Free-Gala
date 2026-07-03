import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32">
      <div className="grid gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
            01 — The Cause
          </p>
        </Reveal>

        <div className="md:col-span-8">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              Some doors only open{" "}
              <span className="font-serif-italic italic text-gold-bright">
                when we open them together.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 grid gap-8 text-sm leading-relaxed text-paper-dim md:grid-cols-2">
              <p>
                Set Free&rsquo;s first gala exists for one reason: to fund the
                work of freedom. Food, clothing, and shelter for those who
                need it most. Daily outreaches into the streets of our
                community. Walking beside people struggling with mental
                health and substance use — none of it happens without a room
                full of people who refuse to look away.
              </p>
              <p>
                This is not a dinner with a cause attached. It is a cause
                with a dinner attached. Every ticket, every table, every
                auction paddle, every quiet gift given that night goes
                directly toward setting someone free — and keeping them
                free.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
