import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import { buildJsonLd } from "@/lib/seo";

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
    title:
      "Aying Wangsha | Makeup & Hair Artist in Bangalore, Karnataka — Bridal, Editorial, Film & TV",
    description:
      "Professional makeup and hair artist based in Bangalore, serving Karnataka and Mumbai. Bridal and wedding makeup, fashion and editorial photoshoots, runway, and makeup and hair for movies, TV series and ad films. HD and airbrush techniques, Asian beauty specialist. Bridal from ₹34,999.",
    keywords: [
      "makeup artist Karnataka",
      "makeup and hair artist Bangalore",
      "bridal makeup artist Bangalore",
      "wedding makeup artist Karnataka",
      "hair stylist Bangalore",
      "editorial makeup artist",
      "fashion photoshoot makeup artist",
      "film makeup artist Karnataka",
      "TV series makeup artist",
      "movie makeup and hair artist India",
      "ad film makeup artist Bangalore",
      "runway makeup artist",
      "Mysore makeup artist",
      "Mangalore makeup artist",
      "Coorg destination wedding makeup",
      "Asian makeup artist",
      "HD makeup",
      "airbrush makeup",
      "Mumbai makeup artist",
      "celebrity makeup artist",
      "Aying Wangsha",
    ],
    metadataBase: new URL("https://ayingwangsha.com"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title:
        "Aying Wangsha | Makeup & Hair Artist in Bangalore, Karnataka — Bridal, Editorial, Film & TV",
      description:
        "Makeup and hair for brides, fashion and editorial photoshoots, runway, and film and TV productions across Karnataka and Mumbai.",
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
      title: "Aying Wangsha | Makeup & Hair Artist, Bangalore",
      description:
        "Bridal, editorial, runway, and film and TV makeup and hair across Karnataka and Mumbai.",
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
    <html
      lang="en"
      className={cn(playfair.variable, montserrat.variable, "dark scroll-smooth")}
      suppressHydrationWarning
    >
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
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
        {children}
        <GoogleAnalytics gaId="G-XCM5FSJXPH" />
      </body>
    </html>
  );
}
