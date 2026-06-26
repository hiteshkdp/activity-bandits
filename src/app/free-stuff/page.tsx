import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Stuff",
  description: `Free printable activities from ${SITE.authorName}.`,
};

export default function FreeStuffPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[44rem] flex-1 px-5 py-12">
        <h1 className="text-display-sm font-bold text-ink sm:text-display-md">
          Free Stuff
        </h1>
        <div className="mt-6 space-y-4 text-body-md leading-relaxed text-body">
          <p>
            Free printable activity pages — mazes, colouring sheets and puzzles your
            kids can start right now.
          </p>
          <p className="text-body-sm text-muted">
            Coming soon. This is the perfect spot for a free downloadable activity
            pack in exchange for an email — a great way to build a mailing list you
            can tell about new books. Want me to set that up next?
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
