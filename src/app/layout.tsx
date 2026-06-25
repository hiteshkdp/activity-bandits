import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.authorName} — Books`,
    template: `%s — ${SITE.authorName}`,
  },
  description: SITE.tagline,
  openGraph: {
    type: "website",
    siteName: SITE.authorName,
    title: `${SITE.authorName} — Books`,
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
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexSans.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning={true}
        className="min-h-full flex flex-col font-display bg-canvas-dark text-body"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
