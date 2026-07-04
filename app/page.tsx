import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Hosts } from "@/components/Hosts";
import { Tickets } from "@/components/Tickets";
import { Evening } from "@/components/Evening";
import { Impact } from "@/components/Impact";
import { DonateSection } from "@/components/DonateSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="grain">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Hosts />
      <Tickets />
      <Evening />
      <Impact />
      <DonateSection />
      <Footer />
    </main>
  );
}
