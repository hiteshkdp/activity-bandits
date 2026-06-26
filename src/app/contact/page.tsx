import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.authorName}.`,
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[44rem] flex-1 px-5 py-12">
        <h1 className="text-display-sm font-bold text-ink sm:text-display-md">
          Contact
        </h1>
        <div className="mt-6 space-y-4 text-body-md leading-relaxed text-body">
          <p>
            Questions, feedback or just want to say hi? We&apos;d love to hear from
            you.
          </p>
          {/* TODO: Replace with your real contact email / form. */}
          <p>
            Email us at{" "}
            <a
              href="mailto:hello@example.com"
              className="font-bold text-primary hover:text-primary-strong"
            >
              hello@example.com
            </a>
          </p>
          <p className="text-body-sm text-muted">
            (Placeholder address — tell me the email you want here, or I can wire up
            a proper contact form.)
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
