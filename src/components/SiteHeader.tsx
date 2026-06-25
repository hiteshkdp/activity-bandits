import Link from "next/link";
import { SITE } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="border-b border-hairline-on-dark">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-title-sm font-bold tracking-tight text-on-dark"
        >
          {SITE.authorName}
        </Link>
      </div>
    </header>
  );
}
