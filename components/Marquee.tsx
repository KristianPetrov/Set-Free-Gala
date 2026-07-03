const words = ["Freedom", "Food", "Clothes", "Shelter", "Outreach", "Hope", "Restoration"];

export function Marquee() {
  const strip = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-gold-deep bg-gold py-4 text-ink">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10" aria-hidden={half === 1}>
            {strip.map((word, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-10">
                <span className="font-display text-2xl uppercase tracking-[0.1em]">{word}</span>
                <span className="text-lg">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
