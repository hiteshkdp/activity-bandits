import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Home } from "@/components/home/Home";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <Home />
      <SiteFooter />
    </>
  );
}
