import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ayingwangsha.com";
  const lastModified = new Date();

  // Main sections
  const mainRoutes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#portfolio`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#testimonials`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // Portfolio categories
  const portfolioCategories = [
    "bridal",
    "editorial",
    "fashion",
    "special-events",
  ].map((category) => ({
    url: `${baseUrl}/#portfolio/${category}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Service categories
  const serviceCategories = [
    "bridal-makeup",
    "editorial-makeup",
    "special-events-makeup",
  ].map((service) => ({
    url: `${baseUrl}/#services/${service}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...mainRoutes, ...portfolioCategories, ...serviceCategories];
}
