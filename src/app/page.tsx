import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { LazyLoad } from "@/components/ui/LazyLoad";
import { InstagramFeed } from "@/components/ui/InstagramFeed";
import { S3_KEYS } from "@/lib/constants";
import {
  HeroSection,
  AboutSection,
  PortfolioSection,
  ServicesSection,
  Contact,
  // Testimonials,
} from "@/components/sections";
import type { PortfolioItem } from "@/lib/types";

type PortfolioCategory = keyof typeof S3_KEYS.portfolio;

// Helper function to create portfolio items for a category
function createPortfolioItems(category: PortfolioCategory) {
  const titles: Record<PortfolioCategory, string[]> = {
    bridal: [
      "Classic Bridal",
      "Modern Bride",
      "Natural Glow",
      "Elegant Sophistication",
      "Romantic Look",
      "Timeless Beauty",
      "Soft Glam",
      "Ethereal Beauty",
      "Radiant Bride",
      "Glamorous Bride",
      "Minimalist Chic",
      "Bohemian Beauty",
    ],
    celebrity: [
      "Red Carpet Glam",
      "Star Power",
      "Spotlight Ready",
      "Award Show",
      "Magazine Cover",
      "Press Event",
    ],
    editorial: [
      "High Fashion",
      "Avant-Garde",
      "Fashion Story",
      "Creative Vision",
    ],
    model: [
      "Portfolio Shot",
      "Campaign Look",
      "Fashion Week",
      "Beauty Editorial",
      "Commercial Beauty",
      "Runway Ready",
      "Studio Session",
      "Location Shoot",
      "Natural Light",
      "Fashion Story",
      "Beauty Close-up",
      "Lifestyle Shot",
      "Catalog Look",
      "Print Campaign",
      "Digital Content",
      "Social Media",
      "Brand Campaign",
      "Fashion Editorial",
      "Beauty Campaign",
      "Lookbook",
      "E-commerce",
      "Fashion Film",
      "Beauty Series",
      "Collection Shot",
    ],
    runway: [
      "Fashion Week",
      "Designer Show",
      "Catwalk Ready",
      "Runway Glam",
      "Show Makeup",
      "Collection Look",
      "Backstage Beauty",
      "Designer Vision",
      "Show Stopper",
      "Fashion Statement",
      "Couture Show",
      "Fashion Event",
    ],
  };

  const images = S3_KEYS.portfolio[category];
  const categoryTitles = titles[category];

  return images.map((s3Key, index) => ({
    id: `${category}-${index + 1}`,
    title: categoryTitles[index] || `${category} ${index + 1}`,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    s3Key,
  }));
}

// Create portfolio items for all categories
const portfolioItems: PortfolioItem[] = [
  ...createPortfolioItems("bridal"),
  ...createPortfolioItems("celebrity"),
  ...createPortfolioItems("editorial"),
  ...createPortfolioItems("model"),
  ...createPortfolioItems("runway"),
];

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <main>
        <HeroSection />
        <AboutSection />

        <LazyLoad>
          <PortfolioSection items={portfolioItems} />
        </LazyLoad>

        <LazyLoad>
          <ServicesSection />
        </LazyLoad>

        <LazyLoad>
          <Contact />
        </LazyLoad>

        {/* <LazyLoad>
          <Testimonials />
        </LazyLoad> */}

        <Section>
          <Container>
            <InstagramFeed />
          </Container>
        </Section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
