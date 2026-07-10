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

/** Free-trial length. Must match trial_ends_at default in the DB migration. */
export const TRIAL_DAYS = 45;
/** Days a paid plan keeps working after renews_at passes. Matches the DB. */
export const PAID_GRACE_DAYS = 5;
/** Show the trial countdown banner when this many days (or fewer) remain. */
export const TRIAL_WARN_DAYS = 14;

export interface SubscriptionAccess {
  /** Can the store operate right now? */
  active: boolean;
  /** True when access is governed by the free trial. */
  isTrial: boolean;
  /** Whole days until access ends (0 when expired); null = no deadline. */
  daysLeft: number | null;
  /** The governing deadline, if any. */
  endsAt: string | null;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Client-side mirror of the database's subscription_is_active() — used for
 * the lock screen, countdown banner and storefront gate. Fails OPEN when
 * data is missing (the DB trigger is the real enforcement).
 */
export function getSubscriptionAccess(
  sub?: {
    plan?: string | null;
    renews_at?: string | null;
    trial_ends_at?: string | null;
  } | null,
): SubscriptionAccess {
  const now = Date.now();
  if (!sub) return { active: true, isTrial: false, daysLeft: null, endsAt: null };

  if (!sub.plan || sub.plan === "free") {
    if (!sub.trial_ends_at)
      return { active: true, isTrial: true, daysLeft: null, endsAt: null };
    const ends = new Date(sub.trial_ends_at).getTime();
    return {
      active: now < ends,
      isTrial: true,
      daysLeft: Math.max(0, Math.ceil((ends - now) / DAY_MS)),
      endsAt: sub.trial_ends_at,
    };
  }

  if (!sub.renews_at)
    return { active: true, isTrial: false, daysLeft: null, endsAt: null };
  const graceEnd =
    new Date(sub.renews_at).getTime() + PAID_GRACE_DAYS * DAY_MS;
  return {
    active: now < graceEnd,
    isTrial: false,
    daysLeft: Math.max(0, Math.ceil((graceEnd - now) / DAY_MS)),
    endsAt: sub.renews_at,
  };
}
