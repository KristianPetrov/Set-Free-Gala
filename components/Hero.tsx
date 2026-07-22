import { HeroHosts } from "./HeroHosts";

export function Hero() {
  return (
    <section className="deco-rays relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Faint gold radial glow behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[85vmin] w-[85vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #d4af5e 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl text-center">
        <p className="animate-fade-up text-[11px] uppercase tracking-[0.6em] text-gold">
          Magic House Presents
        </p>

        <div
          className="deco-divider mx-auto mt-6 max-w-xs animate-fade-up text-sm"
          style={{ animationDelay: "80ms" }}
          aria-hidden
        >
          ◆
        </div>

        <h1 className="mt-8 font-display uppercase leading-[1.02] tracking-[0.06em]">
          <span
            className="gold-text block animate-fade-up text-[clamp(3rem,10vw,8rem)]"
            style={{ animationDelay: "140ms" }}
          >
            Set Free&rsquo;s
          </span>
          <span
            className="gold-text block animate-fade-up text-[clamp(3rem,10vw,8rem)]"
            style={{ animationDelay: "280ms" }}
          >
            1st Gala
          </span>
        </h1>

        <p
          className="mt-8 animate-fade-up font-display text-lg uppercase tracking-[0.35em] text-paper md:text-2xl"
          style={{ animationDelay: "420ms" }}
        >
          Sunday July 26th · 6 PM
        </p>

        <p
          className="mt-4 animate-fade-up font-serif-italic text-xl italic text-gold-bright md:text-3xl"
          style={{ animationDelay: "500ms" }}
        >
          Special Guest Tim Storey
        </p>

        <div
          className="mt-10 flex animate-fade-up flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-paper-dim"
          style={{ animationDelay: "580ms" }}
        >
          <span className="text-paper">The Set Free Palace</span>
          <span>1171 N West St · Anaheim, CA</span>
          <span className="mt-3 border border-line px-6 py-2 text-gold">
            Black and White Formal Attire
          </span>
        </div>

        <div
          className="mx-auto mt-12 flex max-w-2xl animate-fade-up flex-col items-center gap-4"
          style={{ animationDelay: "680ms" }}
        >
          <a
            href="#raffle"
            className="flex w-full flex-col bg-gold px-8 py-6 text-ink transition-colors hover:bg-gold-bright"
          >
            <span className="font-display text-sm uppercase tracking-[0.22em] md:text-base md:tracking-[0.3em]">
              Buy Raffle Tickets · $25 Each
            </span>
            <span className="mt-2 text-[9px] uppercase tracking-[0.3em] opacity-75 md:text-[10px]">
              Win Fieldy&rsquo;s Signed Bass
            </span>
          </a>
          <a
            href="#donate"
            className="border border-gold px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Give Now
          </a>
        </div>

        <p
          className="mt-10 animate-fade-up text-[11px] uppercase tracking-[0.3em] text-paper-dim"
          style={{ animationDelay: "760ms" }}
        >
          Text{" "}
          <a
            href="sms:+17144004573"
            className="text-gold transition-colors hover:text-gold-bright"
          >
            +1 (714) 400-4573
          </a>{" "}
          for tickets
        </p>

        <HeroHosts />
      </div>
    </section>
  );
}
