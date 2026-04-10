import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/webapp-testing/"],
      },
    ],
    sitemap: "https://rocket4rpo.com/sitemap.xml",
  };
}
