import { SITE } from "@/config/site";

const SOCIAL_LABELS: Record<string, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  website: "Website",
};

export function SiteFooter() {
  const links = Object.entries(SITE.socials).filter(([, href]) => href);

  return (
    <footer className="mt-auto bg-navy">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-3 px-5 py-12 text-body-sm text-white/70">
        <span className="font-display text-title-md font-bold text-white">
          {SITE.authorName}
        </span>
        {links.length > 0 && (
          <nav className="flex flex-wrap gap-4">
            {links.map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white/80 hover:text-accent"
              >
                {SOCIAL_LABELS[key] ?? key}
              </a>
            ))}
          </nav>
        )}
        <p>
          © {SITE.authorName}. You&apos;ll be sent to your local Amazon store to
          complete any purchase.
        </p>
        {/*
          AFFILIATE DISCLOSURE: if you enable AFFILIATE_TAGS in config/site.ts,
          replace the line above with a clear affiliate disclosure, e.g.
          "As an Amazon Associate I earn from qualifying purchases."
        */}
      </div>
    </footer>
  );
}
