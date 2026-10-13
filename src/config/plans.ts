// Single source of truth for plans, prices, and credit amounts. The pricing
// page, checkout actions, and webhook grants all read from here — never
// hard-code a price or credit amount anywhere else. Changing anything in
// this file requires asking the repo owner first (AGENTS.md).

export type PaidPlanId = "pro" | "ultra";
export type PlanId = "free" | PaidPlanId;

export type Plan = {
  id: PlanId;
  name: string;
  /** USD cents per month. Money is integer cents — no floats, ever. */
  priceMonthlyCents: number;
  /** Credits granted on every paid subscription invoice (invoice.paid). */
  monthlyCredits: number;
  /** Name of the env var holding the Stripe Price ID; null for free. */
  priceEnvKey: "STRIPE_PRICE_PRO_MONTHLY" | "STRIPE_PRICE_ULTRA_MONTHLY" | null;
  /** Drives the pricing page rows. Concrete copy, no adjectives. */
  features: string[];
};

/** Credits granted once at signup, through the ledger (`welcome_{userId}`). */
export const WELCOME_CREDITS = 10;

/** Credits spent per image generation (the spend lands in M5). */
export const GENERATION_COST_CREDITS = 1;

export const plans: Record<PlanId, Plan> = {
  free: {
    id: "free",
    name: "Free",
    priceMonthlyCents: 0,
    monthlyCredits: 0,
    priceEnvKey: null,
    features: [
      `${WELCOME_CREDITS} welcome credits`,
      `${GENERATION_COST_CREDITS} credit per image generation`,
      "Full source code, MIT",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    priceMonthlyCents: 900,
    monthlyCredits: 200,
    priceEnvKey: "STRIPE_PRICE_PRO_MONTHLY",
    features: [
      "200 credits every month",
      "Credits accumulate — no expiry",
      "Cancel anytime in the portal",
    ],
  },
  ultra: {
    id: "ultra",
    name: "Ultra",
    priceMonthlyCents: 2900,
    monthlyCredits: 1000,
    priceEnvKey: "STRIPE_PRICE_ULTRA_MONTHLY",
    features: [
      "1,000 credits every month",
      "Credits accumulate — no expiry",
      "Cancel anytime in the portal",
    ],
  },
};

/** One-time credit packs (Checkout mode "payment"). Approved by the repo
 * owner 2026-10-13: $5 / 100, $15 / 400, $39 / 1,200. */
export type TopupPackId = "starter" | "standard" | "bulk";
export type TopupPack = {
  id: TopupPackId;
  name: string;
  credits: number;
  /** USD cents, one time. */
  priceCents: number;
  priceEnvKey: "STRIPE_PRICE_TOPUP_100" | "STRIPE_PRICE_TOPUP_400" | "STRIPE_PRICE_TOPUP_1200";
};

export const topupPacks: readonly TopupPack[] = [
  { id: "starter", name: "Starter pack", credits: 100, priceCents: 500, priceEnvKey: "STRIPE_PRICE_TOPUP_100" },
  { id: "standard", name: "Standard pack", credits: 400, priceCents: 1500, priceEnvKey: "STRIPE_PRICE_TOPUP_400" },
  { id: "bulk", name: "Bulk pack", credits: 1200, priceCents: 3900, priceEnvKey: "STRIPE_PRICE_TOPUP_1200" },
];

export const topupPackIds = ["starter", "standard", "bulk"] as const;

export function topupPackById(id: TopupPackId): TopupPack {
  const pack = topupPacks.find((p) => p.id === id);
  if (!pack) throw new Error(`Unknown top-up pack: ${id}`);
  return pack;
}
