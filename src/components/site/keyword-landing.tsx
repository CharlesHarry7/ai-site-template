import Image from "next/image";
import Link from "next/link";

import { WELCOME_CREDITS } from "@/config/plans";
import { homeLanding, toolLandings, type LandingContent } from "@/config/landing";
import { siteConfig } from "@/config/site";
import { PricingSection } from "@/components/marketing/pricing-section";

// One keyword landing page (DESIGN.md v5): H1 = keyword, the working tool in
// the first screen, then proof → steps → use cases → pricing → FAQ → sibling
// tool pages. Server component; the prompt box is a plain GET form so it
// works before hydration and for crawlers.

function generateHref(prompt: string): string {
  return `/generate?prompt=${encodeURIComponent(prompt)}`;
}

function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <h2 className="text-title max-w-2xl">{title}</h2>
      {intro ? (
        <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>
      ) : null}
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function KeywordLanding({ page }: { page: LandingContent }) {
  const siblings = [homeLanding, ...toolLandings].filter(
    (p) => p.slug !== page.slug,
  );
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${page.h1} — ${siteConfig.name}`,
    url: page.slug ? `${siteConfig.url}/tools/${page.slug}` : siteConfig.url,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    description: page.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([appJsonLd, faqJsonLd]),
        }}
      />

      {/* 1. The tool, first screen. */}
      <section className="mx-auto w-full max-w-4xl px-6 pt-16 pb-10 text-center sm:pt-24">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 className="text-display mt-4">{page.h1}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          {page.subhead}
        </p>

        <form
          action="/generate"
          method="get"
          className="mx-auto mt-10 max-w-2xl rounded-2xl border bg-card p-3 text-left shadow-hard"
        >
          <label htmlFor="hero-prompt" className="sr-only">
            Describe the image
          </label>
          <textarea
            id="hero-prompt"
            name="prompt"
            rows={3}
            required
            minLength={3}
            maxLength={1000}
            placeholder={page.promptPlaceholder}
            className="w-full resize-none bg-transparent px-3 py-2 text-base leading-relaxed outline-none placeholder:text-muted-foreground"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t px-1 pt-3">
            <span className="text-sm text-muted-foreground">
              {WELCOME_CREDITS} free credits · no card needed
            </span>
            <button
              type="submit"
              className="press rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {page.ctaLabel}
            </button>
          </div>
        </form>

        <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Try an example">
          {page.examplePrompts.map((prompt) => (
            <li key={prompt}>
              <Link
                href={generateHref(prompt)}
                className="inline-block rounded-full border bg-card px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-[color:var(--clay)] hover:text-foreground"
              >
                {prompt}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Proof: what it makes. */}
      <section aria-label="Examples" className="mx-auto w-full max-w-6xl px-6 pb-6">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {page.examples.map((ex) => (
            <li key={ex.image}>
              <figure className="overflow-hidden rounded-xl border bg-card">
                <Image
                  src={ex.image}
                  alt={`${page.keyword} example: ${ex.prompt}`}
                  width={600}
                  height={600}
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="px-3 py-2.5 text-sm text-muted-foreground">
                  {ex.prompt}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. How it works. */}
      <Section id="how-it-works" title={`How to use the ${page.keyword}`}>
        <ol className="grid gap-6 sm:grid-cols-3">
          {page.steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border bg-card p-6">
              <span className="font-mono text-sm text-[color:var(--clay-deep)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 4. Use cases. */}
      <Section id="use-cases" title="What people make with it">
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {page.useCases.map((u) => (
            <li key={u.title} className="border-t pt-5">
              <h3 className="text-xl">{u.title}</h3>
              <p className="mt-2 text-muted-foreground">{u.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. Pricing (credits). */}
      <PricingSection />

      {/* 6. FAQ. */}
      <Section id="faq" title="Questions">
        <div className="max-w-3xl divide-y border-y">
          {page.faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 text-lg font-medium marker:content-none">
                {f.q}
                <span
                  aria-hidden
                  className="text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 7. Sibling tool pages (internal links). */}
      {siblings.length ? (
        <Section id="more-tools" title="More tools">
          <ul className="grid gap-4 sm:grid-cols-3">
            {siblings.map((p) => (
              <li key={p.slug || "home"}>
                <Link
                  href={p.slug ? `/tools/${p.slug}` : "/"}
                  className="block h-full rounded-xl border bg-card p-5 transition-shadow hover:shadow-hard"
                >
                  <span className="font-serif text-lg">{p.h1}</span>
                  <span className="mt-1.5 block text-sm text-muted-foreground">
                    {p.subhead}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 8. Closing call to action. */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="rounded-2xl border bg-[color:var(--clay-wash)] px-8 py-12 text-center">
          <h2 className="text-title">Start with free credits</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {WELCOME_CREDITS} credits on sign-up. Buy more only when you need them.
          </p>
          <Link
            href="/signup"
            className="press mt-7 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Create a free account
          </Link>
        </div>
      </section>
    </>
  );
}
