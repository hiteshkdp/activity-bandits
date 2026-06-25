import { SITE } from "@/config/site";

const SOCIAL_LABELS: Record<string, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  website: "Website",
};

export function SiteFooter() {
  const links = Object.entries(SITE.socials).filter(([, href]) => href);

  return (
    <footer className="mt-auto border-t border-hairline-on-dark">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-5 py-8 text-body-sm text-muted">
        {links.length > 0 && (
          <nav className="flex flex-wrap gap-4">
            {links.map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {SOCIAL_LABELS[key] ?? key}
              </a>
            ))}
          </nav>
        )}
        <p>
          © {SITE.authorName}. As an Amazon customer you&apos;ll be sent to your
          local Amazon store to complete any purchase.
        </p>
        {/*
          AFFILIATE DISCLOSURE: if you ever enable AFFILIATE_TAGS in config/site.ts,
          replace the line above with a clear affiliate disclosure, e.g.
          "As an Amazon Associate I earn from qualifying purchases."
        */}
      </div>
    </footer>
  );
}
