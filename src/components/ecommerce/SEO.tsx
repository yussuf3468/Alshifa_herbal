import { useEffect } from "react";
import { useLocation } from "../../hooks/useLocation";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "product" | "article";
}

export default function SEO({
  title = "Al-Shifa Herbal - Your Trusted Herbal Wellness Partner",
  description = "Al-Shifa Herbal - Natural herbal remedies, wellness teas, raw honey and immunity boosters in Eastleigh, Nairobi. Trusted herbal partner for families and communities. Shop online with secure checkout and reliable delivery.",
  keywords = "Al-Shifa Herbal, herbal shop Kenya, natural remedies Nairobi, Eastleigh herbal, raw honey Kenya, wellness teas, black seed oil, immunity boosters, natural supplements Kenya",
  image = "/og-image.jpg",
  url,
  type = "website",
}: SEOProps) {
  const location = useLocation();
  const fullUrl =
    url || `https://alshifaherbal.co.ke${location?.pathname || ""}`;

  useEffect(() => {
    // Set document title
    document.title = title;

    // Set meta tags
    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords },

      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:url", content: fullUrl },
      { property: "og:type", content: type },
      { property: "og:site_name", content: "Al-Shifa Herbal" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },

      // Additional SEO
      { name: "robots", content: "index, follow" },
      { name: "language", content: "English" },
      { name: "author", content: "Al-Shifa Herbal" },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attribute = property ? "property" : "name";
      const value = property || name;

      if (!value) return;

      let element = document.querySelector(
        `meta[${attribute}="${value}"]`,
      ) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }

      element.content = content;
    });

    // Set canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;
  }, [title, description, keywords, image, fullUrl, type]);

  return null;
}
