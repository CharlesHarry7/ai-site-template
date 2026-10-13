import type { Metadata } from "next";
import Link from "next/link";

import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { SignupForm } from "@/components/auth/signup-form";
import { features } from "@/lib/env";

export const metadata: Metadata = { title: "Create account" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  // Same-origin paths only — never redirect to a caller-supplied host.
  const safeNext =
    next?.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

  return (
    <div className="grid gap-6">
      <div>
        <p className="eyebrow">Create account</p>
        <h1 className="mt-2 text-2xl">Start with 10 free credits</h1>
      </div>
      <OAuthButtons
        google={features.googleOAuth}
        github={features.githubOAuth}
        next={safeNext}
      />
      <SignupForm requiresVerification={features.email} next={safeNext} />
      <p className="text-sm text-muted-foreground">
        Already registered?{" "}
        <Link href="/login" className="link-pop">
          Sign in
        </Link>
      </p>
    </div>
  );
}
