import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/config/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-nunito",
});

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
    <html
      lang="en"
      className={`${poppins.variable} ${nunito.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning={true}
        className="min-h-full flex flex-col font-body bg-canvas text-body"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
