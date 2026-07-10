import Image, { type StaticImageData } from "next/image";
import philGoToHeaven from "@/public/phil-go-to-heaven.png";
import timStoreyPortrait from "@/public/tim-storey.png";
import { Reveal } from "./Reveal";

type HostCard = {
  name: string;
  role: string;
  line: string;
  image: StaticImageData;
  imageAlt: string;
  imagePosition: string;
};

const hosts: HostCard[] = [
  {
    name: "Pastor Phil Aguilar",
    role: "Founder, Set Free",
    line: "Opening the doors of the Set Free Palace for a night of rescue, restoration, and welcome.",
    image: philGoToHeaven,
    imageAlt: "Pastor Phil Aguilar smiling in a black suit and sunglasses",
    imagePosition: "44% top",
  },
  {
    name: "Tim Storey",
    role: "Special Guest Speaker",
    line: "Bringing the comeback message to a gala dedicated to second chances.",
    image: timStoreyPortrait,
    imageAlt: "Tim Storey smiling in a black tuxedo",
    imagePosition: "50% top",
  },
];

export function Hosts() {
  return (
    <section
      id="hosts"
      className="relative scroll-mt-24 overflow-hidden border-t border-line"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.1]"
        style={{
          background: "radial-gradient(circle, #d4af5e 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
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

          <Reveal delay={150} className="lg:col-span-5">
            <p className="max-w-md text-sm leading-relaxed text-paper-dim lg:ml-auto">
              Pastor Phil Aguilar, founder of Set Free, opens the doors of the
              Set Free Palace for one unforgettable night — joined by special
              guest Tim Storey, world-renowned speaker and author. Two lives
              given to the work of restoration, together on one stage.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2">
          {hosts.map((host, index) => (
            <Reveal
              key={host.name}
              delay={250 + index * 100}
              className="min-w-0 bg-ink"
            >
              <article className="group flex h-full flex-col bg-ink">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-soft">
                  <Image
                    src={host.image}
                    alt={host.imageAlt}
                    fill
                    sizes="(max-width: 768px) calc(100vw - 3rem), 34rem"
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ objectPosition: host.imagePosition }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="font-display text-2xl uppercase tracking-widest text-paper md:text-3xl">
                      {host.name}
                    </p>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-gold">
                      {host.role}
                    </p>
                  </div>
                </div>
                <div className="border-t border-line p-6 md:p-8">
                  <p className="text-sm leading-relaxed text-paper-dim">
                    {host.line}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
