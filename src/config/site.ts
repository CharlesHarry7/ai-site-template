// Site-wide constants — set per site before launch (brand, canonical URL,
// support email). Landing copy lives in src/config/landing.ts.
export const siteConfig = {
  name: "Brand",
  description:
    "AI tools that run on credits: free credits to start, pay only for what you use.",
  /** Canonical production URL — set to the site's domain before launch. */
  url: "https://example.com",
  supportEmail: "support@example.com",
} as const;
