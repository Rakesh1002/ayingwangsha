import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = "https://ayingwangsha.com/api/og";

  return {
    title: "Aying Wangsha | Professional Makeup Artist in Bangalore & Mumbai",
    description:
      "Award-winning makeup artist in Bangalore and Mumbai specializing in bridal, editorial, and fashion makeup. Expert in Asian beauty, HD techniques, and airbrush makeup for weddings, fashion shows, and special events.",
    keywords: [
      "makeup artist",
      "professional makeup artist",
      "bridal makeup",
      "wedding makeup artist",
      "editorial makeup",
      "fashion makeup",
      "Asian makeup artist",
      "HD makeup",
      "airbrush makeup",
      "Bangalore makeup artist",
      "Mumbai makeup artist",
      "Indian bridal makeup",
      "celebrity makeup artist",
      "fashion show makeup",
      "special event makeup",
      "Aying Wangsha",
    ],
    metadataBase: new URL("https://ayingwangsha.com"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "Aying Wangsha | Professional Makeup Artist in Bangalore & Mumbai",
      description:
        "Award-winning makeup artist specializing in bridal, editorial, and fashion makeup. Expert in Asian beauty and HD techniques.",
      url: "https://ayingwangsha.com",
      siteName: "Aying Wangsha - Professional Makeup Artist",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Aying Wangsha - Professional Makeup Artist",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Aying Wangsha | Professional Makeup Artist",
      description:
        "Award-winning makeup artist specializing in bridal, editorial, and fashion makeup.",
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    authors: [{ name: "Aying Wangsha" }],
    creator: "Aying Wangsha",
    publisher: "Aying Wangsha",
    category: "Beauty & Personal Care",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon-48x48.png"
          type="image/png"
          sizes="48x48"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E685A5" />
        <link
          rel="alternate"
          type="application/json+oembed"
          href="https://ayingwangsha.com/api/oembed"
        />
      </head>
      <body
        className={cn(
          playfair.variable,
          montserrat.variable,
          "min-h-screen bg-background font-sans antialiased",
        )}
      >
        {/* <Header /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://ayingwangsha.com",
              name: "Aying Wangsha Makeup Artist",
              image: "https://ayingwangsha.com/og-image.jpg",
              description:
                "Award-winning makeup artist in Bangalore and Mumbai specializing in bridal, editorial, and fashion makeup. Expert in Asian beauty, HD techniques, and airbrush makeup.",
              url: "https://ayingwangsha.com",
              telephone: "+918431786944",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Indiranagar, Bangalore",
                addressLocality: "Bangalore",
                addressRegion: "Karnataka",
                postalCode: "560038",
                addressCountry: "IN",
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
              priceRange: "₹₹₹",
              areaServed: [
                "Bangalore",
                "Karnataka",
                "Mumbai",
                "Maharashtra",
                "India",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Makeup Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Bridal Makeup",
                      description:
                        "Complete bridal makeup package with trials and HD airbrush techniques",
                    },
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      priceCurrency: "INR",
                      price: "29999.00",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Editorial Makeup",
                      description:
                        "Professional makeup for photoshoots, fashion shows, and editorial work",
                    },
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      priceCurrency: "INR",
                      price: "19999.00",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Special Events Makeup",
                      description:
                        "Makeup services for special occasions and events",
                    },
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      priceCurrency: "INR",
                      price: "14999.00",
                    },
                  },
                ],
              },
              review: {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                },
                author: {
                  "@type": "Person",
                  name: "Shenshen Wangsha",
                },
                reviewBody:
                  "Aying made my wedding day absolutely perfect! Her attention to detail and ability to enhance my natural features while keeping me looking like myself was incredible.",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
