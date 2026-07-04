import { Reveal } from "./Reveal";

export function Hosts() {
  return (
    <section
      id="hosts"
      className="relative scroll-mt-24 overflow-hidden border-t border-line"
    >
      <div className="mx-auto max-w-3xl px-6 py-32">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
            02 — The Hosts
          </p>
          <h2 className="mt-8 font-display text-4xl leading-tight md:text-6xl">
            Two voices,{" "}
            <span className="font-serif-italic italic text-gold-bright">
              one message of freedom.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-10 max-w-md text-sm leading-relaxed text-paper-dim">
            Pastor Phil Aguilar, founder of Set Free, opens the doors of the
            Set Free Palace for one unforgettable night — joined by special
            guest Tim Storey, world-renowned speaker and author. Two lives
            given to the work of restoration, together on one stage.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="border-l border-gold/40 pl-5">
              <p className="font-display text-xl uppercase tracking-widest text-paper">
                Pastor Phil Aguilar
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-paper-dim">
                Founder, Set Free
              </p>
            </div>
            <div className="border-l border-gold/40 pl-5">
              <p className="font-display text-xl uppercase tracking-widest text-paper">
                Tim Storey
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-paper-dim">
                Special Guest Speaker
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
