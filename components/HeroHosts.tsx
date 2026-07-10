"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import chiefTimGala from "@/public/chief-tim-gala.png";
import philGoToHeaven from "@/public/phil-go-to-heaven.png";
import timStoreyPortrait from "@/public/tim-storey.png";

type HostId = "phil" | "tim";
type HostStory = {
  name: string;
  role: string;
  quote: string;
  paragraphs: string[];
  image: StaticImageData;
  imageAlt: string;
  imagePosition: string;
};

const stories: Record<HostId, HostStory> = {
  phil: {
    name: "Pastor Phil Aguilar",
    role: "Founder, Set Free",
    quote: "If God can set me free, He can set anybody free.",
    image: philGoToHeaven,
    imageAlt: "Pastor Phil Aguilar smiling in a black suit and sunglasses",
    imagePosition: "44% top",
    paragraphs: [
      "Phil's story doesn't begin in a church — it begins on the streets of Southern California. Gangs, drugs, violence, and eventually a prison cell: by the world's measure, his life was already written off. It was behind bars, at his lowest, that God reached him — and everything changed.",
      "In 1982 he founded Set Free in Anaheim, a church for the people most churches overlooked — bikers, addicts, gang members, ex-cons, and the homeless. With tattoos, a Harley, and a message of radical grace, Pastor Phil built a ministry that meets people exactly where they are.",
      "More than four decades later, the man they call “Chief” has watched thousands walk through Set Free's doors and into new life — through its homes, its ranches, and a family that never gives up on anyone. The Set Free Palace stands as proof of what one surrendered life can become.",
    ],
  },
  tim: {
    name: "Tim Storey",
    role: "Special Guest Speaker",
    quote: "A setback is a setup for a comeback.",
    image: timStoreyPortrait,
    imageAlt: "Tim Storey smiling in a black tuxedo",
    imagePosition: "50% top",
    paragraphs: [
      "Tim Storey learned about loss early. Raised in a small home in Southern California, one of five children, he lost his father in a car accident when he was just ten years old. Out of that heartbreak grew an unshakable conviction: God specializes in comebacks.",
      "Today Tim is an acclaimed author, speaker, and life coach — the original “Comeback Coach” — who has inspired audiences in more than seventy-five countries. From world leaders and Hall of Fame athletes to Hollywood's biggest names, he has helped people at every level turn their setbacks into comebacks.",
      "As founder of The Congregation, his Orange County church, Tim carries one message everywhere he goes: your best days are not behind you. It's the same message he brings to the Set Free Gala stage — a night dedicated to second chances.",
    ],
  },
};

export function HeroHosts() {
  const [openHost, setOpenHost] = useState<HostId | null>(null);

  useEffect(() => {
    if (!openHost) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenHost(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openHost]);

  const story = openHost ? stories[openHost] : null;

  return (
    <>
      <div
        className="relative mx-auto mt-16 w-full max-w-md animate-fade-up"
        style={{ animationDelay: "840ms" }}
      >
        {/* Gold radial glow rising behind the pair */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-160 w-160 -translate-x-1/2 translate-y-1/4 rounded-full opacity-[0.14]"
          style={{
            background: "radial-gradient(circle, #d4af5e 0%, transparent 62%)",
          }}
        />

        <div className="relative">
          <Image
            src={chiefTimGala}
            alt="Pastor Phil Aguilar and Tim Storey smiling in black tuxedos"
            sizes="(max-width: 768px) 85vw, 28rem"
            className="w-full drop-shadow-[0_-8px_48px_rgba(212,175,94,0.18)]"
          />
          <button
            type="button"
            onClick={() => setOpenHost("phil")}
            aria-haspopup="dialog"
            aria-label="Read Pastor Phil Aguilar's story"
            className="group absolute inset-y-0 left-0 w-1/2 cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold/60"
          >
            <span className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 border border-gold/60 bg-ink/85 px-4 py-2 text-[10px] uppercase tracking-[0.3em] whitespace-nowrap text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              Pastor Phil ◆ His Story
            </span>
          </button>
          <button
            type="button"
            onClick={() => setOpenHost("tim")}
            aria-haspopup="dialog"
            aria-label="Read Tim Storey's story"
            className="group absolute inset-y-0 right-0 w-1/2 cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold/60"
          >
            <span className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 border border-gold/60 bg-ink/85 px-4 py-2 text-[10px] uppercase tracking-[0.3em] whitespace-nowrap text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              Tim Storey ◆ His Story
            </span>
          </button>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setOpenHost("phil")}
            aria-haspopup="dialog"
            className="cursor-pointer border border-line px-4 py-3 transition-colors hover:border-gold"
          >
            <span className="block font-display text-sm tracking-widest text-paper uppercase">
              Pastor Phil Aguilar
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] text-gold">
              Read His Story
            </span>
          </button>
          <button
            type="button"
            onClick={() => setOpenHost("tim")}
            aria-haspopup="dialog"
            className="cursor-pointer border border-line px-4 py-3 transition-colors hover:border-gold"
          >
            <span className="block font-display text-sm tracking-widest text-paper uppercase">
              Tim Storey
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] text-gold">
              Read His Story
            </span>
          </button>
        </div>
      </div>

      {story && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${story.name} — his story`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        >
          <button
            type="button"
            aria-label="Close story"
            onClick={() => setOpenHost(null)}
            className="absolute inset-0 cursor-default bg-black/85 backdrop-blur-sm"
          />
          <div className="deco-frame relative grid max-h-[88svh] w-full max-w-5xl overflow-y-auto bg-ink-soft text-left md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <button
              type="button"
              autoFocus
              aria-label="Close story"
              onClick={() => setOpenHost(null)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center border border-line bg-ink/80 text-gold transition-colors hover:border-gold hover:text-gold-bright"
            >
              ✕
            </button>
            <div className="relative min-h-[22rem] overflow-hidden border-b border-line md:min-h-[38rem] md:border-r md:border-b-0">
              <Image
                src={story.image}
                alt={story.imageAlt}
                fill
                sizes="(max-width: 768px) calc(100vw - 2rem), 26rem"
                placeholder="blur"
                className="object-cover"
                style={{ objectPosition: story.imagePosition }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-soft via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-ink-soft/70"
              />
            </div>
            <div className="px-6 py-9 md:px-10 md:py-12">
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
                {story.role}
              </p>
              <h3 className="mt-4 pr-12 font-display text-3xl tracking-widest text-paper uppercase md:text-4xl">
                {story.name}
              </h3>
              <div className="deco-divider mt-6 max-w-40 text-xs" aria-hidden>
                ◆
              </div>
              <p className="mt-8 font-serif-italic text-xl leading-snug italic text-gold-bright md:text-2xl">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-paper-dim">
                {story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
