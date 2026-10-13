// Keyword landing content — the ONE file to edit per site. The home page and
// every /tools/[slug] page render from here (DESIGN.md v5: H1 = the keyword in
// the user's words, the working tool in the first screen, then proof, steps,
// use cases, pricing, FAQ and links to sibling tool pages).
//
// The defaults below are placeholders for an AI image generator; replace them
// with the site's target keyword and its long-tail "说法" before launch.

export type LandingFaq = { q: string; a: string };
export type LandingStep = { title: string; body: string };
export type LandingUseCase = { title: string; body: string };
export type LandingExample = { image: string; prompt: string };

export type LandingContent = {
  /** Route segment for /tools/[slug]; empty for the home page. */
  slug: string;
  /** The exact search phrase this page targets. */
  keyword: string;
  /** <title> — keyword first, brand last (the layout appends the brand). */
  title: string;
  /** Meta description, ≤ 155 characters, says what the tool does. */
  description: string;
  eyebrow: string;
  h1: string;
  subhead: string;
  promptPlaceholder: string;
  ctaLabel: string;
  /** One-click prompts under the tool box. */
  examplePrompts: string[];
  examples: LandingExample[];
  steps: LandingStep[];
  useCases: LandingUseCase[];
  faqs: LandingFaq[];
};

const sharedExamples: LandingExample[] = [
  { image: "/illustrations/gallery-01.png", prompt: "Sunset over mountains" },
  { image: "/illustrations/gallery-02.png", prompt: "Retro city skyline" },
  { image: "/illustrations/gallery-03.png", prompt: "Ocean wave with sun" },
  { image: "/illustrations/gallery-04.png", prompt: "Space with planets" },
  { image: "/illustrations/gallery-05.png", prompt: "Forest cabin in snow" },
  { image: "/illustrations/gallery-06.png", prompt: "Coffee shop interior" },
];

const sharedSteps: LandingStep[] = [
  {
    title: "Describe it",
    body: "Write one sentence about the image you want. Plain words work.",
  },
  {
    title: "Generate",
    body: "Each image costs one credit. New accounts start with free credits.",
  },
  {
    title: "Download",
    body: "Save the full-size image. It stays in your history.",
  },
];

export const homeLanding: LandingContent = {
  slug: "",
  keyword: "ai image generator",
  title: "AI Image Generator — Turn Text into Images",
  description:
    "Free AI image generator: type a sentence, get a picture in seconds. Free credits to start, no card needed.",
  eyebrow: "Free credits to start",
  h1: "AI image generator",
  subhead:
    "Type what you want to see. Get an image in seconds — no design skills, no install.",
  promptPlaceholder: "A cozy reading nook by a rainy window, warm light",
  ctaLabel: "Generate image",
  examplePrompts: [
    "Watercolor fox in a forest",
    "Minimal logo of a paper plane",
    "Product photo of a ceramic mug",
  ],
  examples: sharedExamples,
  steps: sharedSteps,
  useCases: [
    {
      title: "Social posts",
      body: "Fresh visuals for every post without stock-photo fees.",
    },
    {
      title: "Blog headers",
      body: "A header image that matches the article, in one try.",
    },
    {
      title: "Product mockups",
      body: "Show an idea before anything is made.",
    },
    {
      title: "Presentations",
      body: "Slides that look designed, not clip-art.",
    },
  ],
  faqs: [
    {
      q: "Is the AI image generator free?",
      a: "Every new account gets free credits. One image costs one credit; buy a pack or subscribe when you need more.",
    },
    {
      q: "Can I use the images commercially?",
      a: "Yes. Images you generate are yours to use, including for commercial projects.",
    },
    {
      q: "What happens if a generation fails?",
      a: "The credit is refunded automatically. You only pay for images you get.",
    },
    {
      q: "Do credits expire?",
      a: "No. Credits from packs and subscriptions stay in your balance until you use them.",
    },
  ],
};

/** Sibling pages — one per long-tail phrasing (哥飞: 红海是需求，蓝海是说法). */
export const toolLandings: LandingContent[] = [
  {
    ...homeLanding,
    slug: "text-to-image",
    keyword: "text to image ai",
    title: "Text to Image AI — Free Online Generator",
    description:
      "Text to image AI that turns one sentence into a picture. Free credits, no install, full-size downloads.",
    h1: "Text to image AI",
    subhead: "One sentence in, one image out. Try it with free credits.",
  },
  {
    ...homeLanding,
    slug: "ai-logo-generator",
    keyword: "ai logo generator",
    title: "AI Logo Generator — Simple Logos from Text",
    description:
      "Describe your brand and get logo ideas in seconds with the AI logo generator. Free credits to start.",
    h1: "AI logo generator",
    subhead: "Describe your brand in a few words and get logo ideas to refine.",
    promptPlaceholder: "Minimal logo for a coffee roaster, a single bean, clay color",
    ctaLabel: "Generate logo",
  },
];

export function landingBySlug(slug: string): LandingContent | undefined {
  return toolLandings.find((page) => page.slug === slug);
}
