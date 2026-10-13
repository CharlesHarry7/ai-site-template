import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { landingBySlug, toolLandings } from "@/config/landing";
import { KeywordLanding } from "@/components/site/keyword-landing";

// One static page per long-tail phrasing in src/config/landing.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return toolLandings.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const page = landingBySlug((await params).slug);
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: `/tools/${page.slug}` },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = landingBySlug((await params).slug);
  if (!page) notFound();
  return <KeywordLanding page={page} />;
}
