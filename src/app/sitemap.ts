import type { MetadataRoute } from "next";

import { toolLandings } from "@/config/landing";
import { siteConfig } from "@/config/site";

// Public pages only — the (app) group is session-gated and noindexed.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...toolLandings.map((page) => `/tools/${page.slug}`),
    "/pricing",
  ];
  return paths.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : path.startsWith("/tools/") ? 0.8 : 0.6,
  }));
}
