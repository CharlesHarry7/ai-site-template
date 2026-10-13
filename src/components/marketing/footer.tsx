import Link from "next/link";

import { homeLanding, toolLandings } from "@/config/landing";
import { siteConfig } from "@/config/site";

// Quiet footer (DESIGN.md v5): brand line, every tool page as an internal
// link (crawl paths for the long-tail pages), product and legal links.
const columns = [
  {
    title: "Tools",
    links: [homeLanding, ...toolLandings].map((page) => ({
      label: page.h1,
      href: page.slug ? `/tools/${page.slug}` : "/",
    })),
  },
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/signup" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t bg-(--band-bg) text-(--band-fg)">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 sm:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="font-serif text-2xl">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="link-pop mt-4 inline-block text-sm"
          >
            {siteConfig.supportEmail}
          </a>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="eyebrow mb-3">{column.title}</p>
            <ul className="grid gap-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto w-full max-w-6xl border-t px-6 py-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}
      </div>
    </footer>
  );
}
