export const SITE_URL = "https://ayingwangsha.com";

export const SERVICE_AREAS = [
  "Bangalore",
  "Mysore",
  "Mangalore",
  "Udupi",
  "Hubli",
  "Belgaum",
  "Coorg",
  "Karnataka",
  "Mumbai",
  "India",
] as const;

export const SERVICE_CATALOG = [
  {
    name: "Bridal Makeup & Hair",
    description:
      "Complete bridal makeup and hair with consultation, trial session, day-of application, touch-up kit and optional bridal party services. HD and airbrush techniques.",
    price: "34999.00",
  },
  {
    name: "Editorial & Fashion Photoshoot Makeup & Hair",
    description:
      "Makeup and hair for editorial, lookbook, campaign and runway shoots. Concept development, multiple looks per session, high-definition makeup and on-location work.",
    price: "24999.00",
  },
  {
    name: "Special Events Makeup & Hair",
    description:
      "Makeup and hair for receptions, parties and special occasions, with long-lasting application and false lash work.",
    price: "19999.00",
  },
  {
    name: "Film & TV Series Makeup and Hair",
    description:
      "Makeup and hair for feature films, television series, ad films and music videos, including continuity across shoot days and HD-safe camera-ready looks. Quoted per project.",
  },
] as const;

/**
 * Rendered verbatim by the FAQ section and emitted as FAQPage schema.
 * Google requires the schema answers to match on-page text, so both read
 * from here rather than keeping two copies in sync by hand.
 */
export const FAQS = [
  {
    q: "Which areas of Karnataka do you serve?",
    a: "I am based in Indiranagar, Bangalore and work across Karnataka, including Mysore, Mangalore, Udupi, Hubli, Belgaum and Coorg. I also travel to Mumbai and take destination weddings and shoots elsewhere in India. Travel and stay for outstation work is quoted separately.",
  },
  {
    q: "Do you do hair styling as well as makeup?",
    a: "Yes. Makeup and hair are handled together as a single service, so you do not need to book a separate hairstylist. That covers bridal hair, editorial and runway styling, and camera-ready looks for film and television.",
  },
  {
    q: "Do you take fashion and editorial photoshoots?",
    a: "Yes. I work with photographers, designers, brands and magazines on editorial, lookbook, campaign and runway shoots. Editorial bookings start from ₹24,999 and include concept development, multiple looks per session, high-definition makeup and on-location work.",
  },
  {
    q: "Do you work on movies and TV series?",
    a: "Yes. I take film and television projects, including features, series, ad films and music videos, covering continuity makeup and hair across shoot days and HD-safe looks built for camera. Project rates depend on shoot length and crew size, so please get in touch with your schedule for a quote.",
  },
  {
    q: "How much does bridal makeup cost?",
    a: "Bridal packages start from ₹34,999 and include a consultation and trial session, day-of makeup application, a touch-up kit, and optional services for the bridal party. Special events start from ₹19,999. Final pricing depends on the number of looks, location and travel.",
  },
  {
    q: "How far in advance should I book?",
    a: "For weddings, three to six months ahead is ideal, particularly for dates in the Karnataka wedding season, as peak dates book out first. Editorial shoots and film projects can often be arranged at shorter notice depending on availability.",
  },
  {
    q: "Is there a bridal trial before the wedding day?",
    a: "Yes. The bridal package includes a consultation and trial session so we can settle on the look, test how it wears and photographs, and make adjustments well before the day itself.",
  },
  {
    q: "What makeup techniques do you specialise in?",
    a: "High-definition and airbrush makeup that holds up under photography, video and long event days. I specialise in Asian beauty and in matching skin tones and eye shapes across South Asian and North East Indian features.",
  },
  {
    q: "How do I book a session?",
    a: "Use the booking form on this site with your date, preferred time and service, and the enquiry reaches me directly on WhatsApp. You can also reach me on +91 84317 86944.",
  },
] as const;

export function buildJsonLd() {
  const business = {
    "@type": ["BeautySalon", "ProfessionalService"],
    "@id": `${SITE_URL}/#business`,
    name: "Aying Wangsha — Makeup & Hair Artist",
    image: `${SITE_URL}/api/og`,
    description:
      "Professional makeup and hair artist based in Bangalore, serving Karnataka and Mumbai. Bridal, fashion and editorial photoshoots, runway, and makeup and hair for movies, TV series and ad films.",
    url: SITE_URL,
    telephone: "+918431786944",
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Indiranagar, Bangalore",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      postalCode: "560038",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9784,
      longitude: 77.6408,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://instagram.com/makeupandhairbyaying",
      "https://facebook.com/ayingwangsha",
    ],
    areaServed: [
      { "@type": "State", name: "Karnataka" },
      ...SERVICE_AREAS.filter((a) => a !== "Karnataka" && a !== "India").map(
        (name) => ({ "@type": "City", name }),
      ),
      { "@type": "Country", name: "India" },
    ],
    knowsAbout: [
      "Bridal makeup",
      "Hair styling",
      "Editorial and fashion photoshoot makeup",
      "Runway and fashion show makeup",
      "Film and television makeup",
      "HD makeup",
      "Airbrush makeup",
      "Asian beauty",
    ],
    founder: { "@id": `${SITE_URL}/#artist` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Makeup & Hair Services",
      itemListElement: SERVICE_CATALOG.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          areaServed: { "@type": "State", name: "Karnataka" },
          provider: { "@id": `${SITE_URL}/#business` },
        },
        ...("price" in s
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "INR",
                price: s.price,
                valueAddedTaxIncluded: false,
              },
            }
          : {}),
      })),
    },
  };

  const artist = {
    "@type": "Person",
    "@id": `${SITE_URL}/#artist`,
    name: "Aying Wangsha",
    jobTitle: "Makeup & Hair Artist",
    url: SITE_URL,
    image: `${SITE_URL}/about.jpg`,
    worksFor: { "@id": `${SITE_URL}/#business` },
    sameAs: ["https://instagram.com/makeupandhairbyaying"],
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Aying Wangsha — Makeup & Hair Artist",
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [business, artist, faq, website],
  };
}
