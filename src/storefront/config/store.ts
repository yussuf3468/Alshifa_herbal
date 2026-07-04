import type { StoreConfig } from "./types";

/* ═══════════════════════════════════════════════════════════════
   AL-SHIFA HERBAL — a Lenzro storefront.

   This file is the ONLY place that knows this store sells herbal
   remedies. Swap this config (or load one per tenant) and the exact
   same experience serves electronics, fashion, groceries, hardware…
   ═══════════════════════════════════════════════════════════════ */

const alShifaHerbal: StoreConfig = {
  name: "Al-Shifa Herbal",
  monogram: "A",
  tagline: "Nature's remedy, trusted care.",
  positioning:
    "Eastleigh's trusted home of natural herbal remedies, wellness teas and pure honey — helping Nairobi families heal the natural way.",
  poweredBy: { label: "Lenzro", url: "https://lenzro.com" },

  theme: {
    accent: "#1d5c45",
    accentDeep: "#123c2d",
    accentInk: "#ffffff",
    accentSoft: "rgba(29, 92, 69, 0.09)",
    accentGlow: "rgba(46, 143, 108, 0.35)",
    gold: "#b9863a",
  },

  currency: { code: "KES", symbol: "KSh", locale: "en-KE" },

  contact: {
    phone: "+254 722 979 547",
    whatsapp: "254722979547",
    email: "info@alshifaherbal.co.ke",
    address: "2nd Street, 3rd Avenue, Eastleigh, Nairobi",
    mapsUrl: "https://maps.google.com/?q=2nd+Street+3rd+Avenue+Eastleigh+Nairobi",
    hours: [
      { days: "Monday – Saturday", time: "8:00 AM – 8:00 PM" },
      { days: "Sunday", time: "9:00 AM – 6:00 PM" },
    ],
  },

  hero: {
    eyebrow: "Eastleigh · Nairobi",
    headline: "Where healing feels *natural*",
    subline:
      "Herbal remedies, wellness teas and pure honey — carefully sourced, honestly priced and delivered to your door across Nairobi.",
    primaryCta: "Shop remedies",
    secondaryCta: "Explore categories",
  },

  ticker: [
    "Free delivery on orders over KSh 2,000",
    "Same-day delivery in Nairobi",
    "M-Pesa, card & cash accepted",
    "100% natural & authentic",
    "Trusted by 10,000+ customers",
  ],

  categories: [
    {
      slug: "remedies",
      label: "Herbal Remedies",
      keywords: ["remedy", "herb", "tincture", "extract", "cure", "treatment"],
      tagline: "Time-tested herbal formulas for everyday ailments.",
      image:
        "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=640&q=75&auto=format&fit=crop",
    },
    {
      slug: "teas",
      label: "Herbal Teas & Infusions",
      keywords: ["tea", "infusion", "brew", "leaf", "chai"],
      tagline: "Soothing blends for digestion, calm and wellness.",
      image:
        "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=640&q=75&auto=format&fit=crop",
    },
    {
      slug: "honey",
      label: "Honey & Bee Products",
      keywords: ["honey", "bee", "propolis", "royal jelly", "nectar"],
      tagline: "Raw honey, propolis and pure bee products.",
      image:
        "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=640&q=75&auto=format&fit=crop",
    },
    {
      slug: "oils",
      label: "Oils & Extracts",
      keywords: ["oil", "essential", "aroma", "black seed", "olive", "extract"],
      tagline: "Pure essential and carrier oils for body and mind.",
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=640&q=75&auto=format&fit=crop",
    },
    {
      slug: "supplements",
      label: "Vitamins & Supplements",
      keywords: ["supplement", "vitamin", "capsule", "tablet", "mineral"],
      tagline: "Natural supplements to fill the gaps in your diet.",
      image:
        "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=640&q=75&auto=format&fit=crop",
    },
    {
      slug: "immunity",
      label: "Immunity & Wellness",
      keywords: ["immune", "immunity", "wellness", "ginger", "garlic", "detox", "spice"],
      tagline: "Ginger, garlic and boosters that keep defences strong.",
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=640&q=75&auto=format&fit=crop",
    },
    {
      slug: "skincare",
      label: "Natural Skin & Hair Care",
      keywords: ["skin", "hair", "cream", "balm", "soap", "beauty", "care"],
      tagline: "Gentle, plant-based care from root to skin.",
      image:
        "https://images.unsplash.com/photo-1556228578-567ba127e37f?w=640&q=75&auto=format&fit=crop",
    },
  ],
  fallbackCategoryImage:
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=640&q=75&auto=format&fit=crop",

  collections: [
    {
      slug: "editors-picks",
      title: "Herbalist's Picks",
      tagline: "Our shelf, curated",
      description:
        "The remedies our team recommends first — proven favourites customers come back for.",
      rule: { type: "featured" },
    },
    {
      slug: "just-arrived",
      title: "Just Arrived",
      tagline: "Fresh on the shelf",
      description: "The newest additions to the store, added in the last month.",
      rule: { type: "new", days: 30 },
    },
    {
      slug: "under-500",
      title: "Under KSh 500",
      tagline: "Small prices, big wellness",
      description:
        "Quality picks that keep your budget intact — perfect for topping up an order.",
      rule: { type: "under-price", max: 500 },
      isOffer: true,
    },
    {
      slug: "immunity-essentials",
      title: "Immunity Essentials",
      tagline: "The daily wellness edit",
      description:
        "Remedies, teas and boosters — the complete kit to keep your body's defences strong.",
      rule: { type: "categories", slugs: ["remedies", "teas", "immunity"] },
    },
  ],

  offer: {
    eyebrow: "Limited time",
    title: "Free delivery over KSh 2,000",
    body: "Fill your basket and we'll bring it to your door anywhere in Nairobi — no delivery fee, no catch.",
    cta: "Start shopping",
  },

  valueProps: [
    {
      icon: "shield",
      title: "Natural & authentic",
      body: "Every product is sourced directly from trusted growers and suppliers. Pure, natural and never adulterated.",
    },
    {
      icon: "truck",
      title: "Same-day delivery",
      body: "Order before 3 PM and receive it today anywhere in Nairobi. Countrywide delivery within 48 hours.",
    },
    {
      icon: "wallet",
      title: "Fair prices",
      body: "We negotiate hard with suppliers so you don't have to. Transparent pricing, no hidden fees.",
    },
    {
      icon: "headset",
      title: "Real human support",
      body: "Call or WhatsApp us any day of the week — a real person who knows the remedies will answer.",
    },
  ],

  testimonials: [
    {
      quote:
        "Their herbal cough remedy cleared what pharmacy syrups couldn't. Ordered in the morning and it arrived before lunch. Genuine and effective.",
      name: "Amina W.",
      detail: "Parent · South C",
    },
    {
      quote:
        "The only shop in Eastleigh where I trust the honey is truly raw. The staff actually know what each remedy is for.",
      name: "Brian K.",
      detail: "Regular customer",
    },
    {
      quote:
        "I order my family's immunity teas and black seed oil here every month. Quality is consistent and delivery is always on time.",
      name: "Halima A.",
      detail: "Homemaker · Eastleigh",
    },
  ],

  story: {
    eyebrow: "Our story",
    title: "A neighbourhood remedy shop with a big promise",
    paragraphs: [
      "Al-Shifa Herbal began as a single shelf of remedies and raw honey on 3rd Avenue, Eastleigh. The promise was simple: natural products, honest prices, and real advice.",
      "Today we serve thousands of families across Nairobi — same values, much bigger shelves. When you buy from us, you're buying from neighbours who care whether you truly get well.",
    ],
    stats: [
      { value: "10,000+", label: "Happy customers" },
      { value: "1,500+", label: "Remedies in stock" },
      { value: "Same-day", label: "Nairobi delivery" },
      { value: "7 days", label: "Open every week" },
    ],
  },

  faqs: [
    {
      question: "How fast is delivery?",
      answer:
        "Orders placed before 3 PM are delivered the same day within Nairobi. Orders outside Nairobi arrive within 24–48 hours via courier. Delivery is free for orders over KSh 2,000.",
    },
    {
      question: "How do I pay?",
      answer:
        "We accept M-Pesa, card, bank transfer, and cash on delivery. For M-Pesa you'll receive payment details at checkout and can attach your confirmation.",
    },
    {
      question: "Are your herbal products natural and safe?",
      answer:
        "Yes — we source our herbs, honey and oils directly from trusted growers and suppliers, and store them properly. Our products are natural, but they are not a substitute for professional medical care. If you are pregnant, nursing, on medication or managing a chronic condition, please consult a qualified doctor before use.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes — unopened products in original condition can be returned or exchanged within 7 days. Just bring your receipt or order number, or call us and we'll arrange pickup.",
    },
    {
      question: "Do you supply clinics, shops and offices?",
      answer:
        "Absolutely. We handle bulk orders for clinics, resellers and offices with special pricing. Call or WhatsApp us with your list and we'll quote within the hour.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Every order gets an order number at checkout. Use the Track Order page — or the link in your confirmation — to see live status from confirmation to delivery.",
    },
  ],

  delivery: {
    freeThreshold: 2000,
    promise: "Same-day delivery within Nairobi · 24–48h countrywide",
    returns: "7-day hassle-free returns on unopened items",
    payment: "M-Pesa, card, bank transfer or cash on delivery",
  },

  newsletter: {
    title: "First to know",
    body: "New arrivals, restocks and subscriber-only wellness tips. One short email a week — no noise.",
    placeholder: "Your email address",
    cta: "Subscribe",
  },

  newProductDays: 30,
};

export const storeConfig: StoreConfig = alShifaHerbal;
