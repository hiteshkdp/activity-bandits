import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.authorName} — Fun Activity Books for Kids`,
    template: `%s — ${SITE.authorName}`,
  },
  description: SITE.tagline,
  openGraph: {
    type: "website",
    siteName: SITE.authorName,
    title: `${SITE.authorName} — Fun Activity Books for Kids`,
    description: SITE.tagline,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        suppressHydrationWarning={true}
        className="flex min-h-full flex-col bg-canvas text-ink"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
