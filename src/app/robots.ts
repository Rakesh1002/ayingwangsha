import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/#about",
          "/#portfolio",
          "/#services",
          "/#testimonials",
          "/#contact",
        ],
        disallow: [
          "/api/",
          "/_next/",
          "/*.json$",
          "/private/",
          "/admin/",
          "/temp/",
          "/draft/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/portfolio/", "/about/"],
        disallow: ["/api/", "/temp/"],
      },
    ],
    sitemap: "https://ayingwangsha.com/sitemap.xml",
    host: "https://ayingwangsha.com",
  };
}
