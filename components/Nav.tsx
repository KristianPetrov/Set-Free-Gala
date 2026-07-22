import Link from "next/link";

const links = [
  { href: "#raffle", label: "Bass Raffle" },
  { href: "#about", label: "The Cause" },
  { href: "#hosts", label: "The Hosts" },
  { href: "#tickets", label: "Tickets" },
  { href: "#evening", label: "The Evening" },
  { href: "#impact", label: "Impact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink pt-[env(safe-area-inset-top,0px)] before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-screen before:bg-ink before:content-['']">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="gold-text font-display text-lg uppercase tracking-[0.15em]"
        >
          Set&nbsp;Free&rsquo;s&nbsp;1st&nbsp;Gala
        </Link>

        <div className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-paper-dim md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-gold-bright"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#donate"
          className="border border-gold px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Donate
        </a>
      </nav>
    </header>
  );
}
