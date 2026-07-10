import { siteUrl, siteName, siteDescription, event } from "@/lib/site";
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
import { ticketProducts } from "@/lib/products";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      "@id": `${siteUrl}/#event`,
      name: event.name,
      description: siteDescription,
      startDate: event.startDate,
      endDate: event.endDate,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: [`${siteUrl}/set-free-gala-logo.png`],
      url: siteUrl,
      location: {
        "@type": "Place",
        name: event.venue,
        address: {
          "@type": "PostalAddress",
          streetAddress: event.streetAddress,
          addressLocality: event.city,
          addressRegion: event.region,
          postalCode: event.postalCode,
          addressCountry: event.country,
        },
      },
      performer: {
        "@type": "Person",
        name: "Tim Storey",
      },
      organizer: { "@id": `${siteUrl}/#organization` },
      offers: ticketProducts.map((product) => ({
        "@type": "Offer",
        name: product.title,
        price: String(product.unitAmount / 100),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/#tickets`,
        validFrom: "2026-06-01T00:00:00-07:00",
      })),
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Set Free",
      url: siteUrl,
      logo: `${siteUrl}/set-free-gala-logo.png`,
      telephone: event.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.streetAddress,
        addressLocality: event.city,
        addressRegion: event.region,
        postalCode: event.postalCode,
        addressCountry: event.country,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <main className="grain">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
