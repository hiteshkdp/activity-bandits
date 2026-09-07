import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { BTN_PRIMARY } from "@/components/ui";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions, feedback or just want to say hi? Get in touch with Activity Bandits.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-auto">
        <section className="bg-canvas px-6 py-16">
          <div className="mx-auto grid max-w-[1280px] items-start gap-12 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            <div className="flex flex-col items-start gap-6">
              <p className="text-label font-medium uppercase text-ink">
                Contact
              </p>
              <h1 className="text-hero">Contact</h1>
              <p className="max-w-[40ch] text-lead text-pretty text-body">
                Questions, feedback or just want to say hi? We&apos;d love to
                hear from you.
              </p>
              <a
                href={`mailto:${SITE.contactEmail}`}
                className={BTN_PRIMARY}
              >
                Email us at {SITE.contactEmail}
              </a>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter variant="compact" />
    </>
  );
}
