/**
 * Subscription plans — the single source of truth for pricing and limits
 * shown in the app. The product limits are ALSO enforced server-side by
 * the `products_enforce_plan_limit` database trigger; if you change a
 * limit here, update `plan_product_limit()` in the database to match
 * (see supabase/migrations/20260705000000_subscription_plans.sql).
 */

export type PlanId = "free" | "pro" | "max";

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  /** Monthly price in USD. */
  priceMonthly: number;
  priceLabel: string;
  /** Maximum number of products; null = unlimited. */
  productLimit: number | null;
  tagline: string;
  features: string[];
  /** Visually emphasized ("most popular") card. */
  highlight?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    priceLabel: "$0",
    productLimit: 50,
    tagline: "For getting started",
    features: [
      "Up to 50 products",
      "Online storefront",
      "POS & inventory management",
      "Order management",
      "Sales reports",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 55,
    priceLabel: "$55",
    productLimit: 500,
    tagline: "For growing shops",
    highlight: true,
    features: [
      "Up to 500 products",
      "Everything in Free",
      "Financial dashboard & profit tracking",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    id: "max",
    name: "Max",
    priceMonthly: 149,
    priceLabel: "$149",
    productLimit: null,
    tagline: "For high-volume businesses",
    features: [
      "Unlimited products",
      "Everything in Pro",
      "Multiple staff accounts",
      "Dedicated support",
      "Early access to new features",
    ],
  },
];

export function getPlan(id: string | null | undefined): SubscriptionPlan {
  return (
    SUBSCRIPTION_PLANS.find((p) => p.id === id) ?? SUBSCRIPTION_PLANS[0]
  );
}

export function formatProductLimit(limit: number | null): string {
  return limit === null ? "Unlimited" : limit.toLocaleString();
}

/** WhatsApp number that receives upgrade requests (platform operator). */
export const BILLING_WHATSAPP = "254722261776";
