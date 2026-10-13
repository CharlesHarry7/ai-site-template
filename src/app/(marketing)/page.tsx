import type { Metadata } from "next";

import { homeLanding } from "@/config/landing";
import { KeywordLanding } from "@/components/site/keyword-landing";

export const metadata: Metadata = {
  title: { absolute: homeLanding.title },
  description: homeLanding.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <KeywordLanding page={homeLanding} />;
}
