import Link from "next/link";
import { Label } from "@/components/ui";

const COLUMNS = [
  {
    head: "Shop",
    links: [
      { label: "All books", href: "/#browse" },
      { label: "Top sellers", href: "/#top-sellers" },
      { label: "Reading books", href: "/#series" },
    ],
  },
  {
    head: "Free fun",
    links: [
      { label: "Play a game", href: "/play" },
      { label: "Themes", href: "/#categories" },
    ],
  },
  {
    head: "Activity Bandits",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/**
 * Same-page anchors use a plain <a> so the browser scrolls natively —
 * next/link updates the hash without moving the page when you're already on
 * the target route.
 */
function FooterLink({ href, children }: { href: string; children: string }) {
  const cls = "text-nav text-canvas-soft hover:underline";
  return href.startsWith("/#") ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/**
 * `full` (home) shows the three link columns; `compact` (inner pages) shows a
 * single link row. Both share the ink band and the legal line.
 */
export function SiteFooter({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  if (variant === "compact") {
    return (
      <footer className="bg-ink px-6 py-12 text-canvas-soft">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5">
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {[
              { label: "All books", href: "/#browse" },
              { label: "Free fun", href: "/play" },
              { label: "About us", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </div>
          <p className="max-w-[70ch] text-caption text-mute">
            © Activity Bandits. You&apos;ll be sent to your local Amazon store
            to complete any purchase.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-ink px-6 py-12 text-canvas-soft">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
        <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {COLUMNS.map((col) => (
            <div key={col.head} className="flex flex-col gap-3">
              <Label className="!text-mute">{col.head}</Label>
              {col.links.map((l) => (
                <FooterLink key={l.href + l.label} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </div>
          ))}
        </div>
        <p className="max-w-[70ch] text-caption text-mute">
          © Activity Bandits. You&apos;ll be sent to your local Amazon store to
          complete any purchase. As an Amazon Associate we may earn from
          qualifying purchases.
        </p>
      </div>
    </footer>
  );
}
