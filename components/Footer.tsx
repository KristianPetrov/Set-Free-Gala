export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="gold-text font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-none tracking-[0.06em]">
          Set them free.
        </p>

        <div className="mt-10 space-y-1 text-[11px] uppercase tracking-[0.3em] text-paper-dim">
          <p className="text-paper">Sunday July 26th · 6 PM · The Set Free Palace</p>
          <p>1171 N West St, Anaheim, CA</p>
          <p>
            Text{" "}
            <a
              href="sms:+17144004573"
              className="text-gold transition-colors hover:text-gold-bright"
            >
              +1 (714) 400-4573
            </a>{" "}
            for tickets
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-line pt-8 text-[11px] uppercase tracking-[0.25em] text-paper-dim md:flex-row md:items-center md:justify-between">
          <span>Set Free&rsquo;s 1st Gala · Presented by Magic House</span>
          <div className="flex gap-8">
            <a href="#about" className="transition-colors hover:text-gold-bright">
              The Cause
            </a>
            <a href="#tickets" className="transition-colors hover:text-gold-bright">
              Tickets
            </a>
            <a href="#donate" className="transition-colors hover:text-gold-bright">
              Donate
            </a>
          </div>
          <span>© {new Date().getFullYear()} Set Free</span>
        </div>
      </div>
    </footer>
  );
}
