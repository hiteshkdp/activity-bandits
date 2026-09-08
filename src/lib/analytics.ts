/**
 * "buy_click" conversion tracking.
 *
 * Fired from the /go/[slug] redirect via `after()`, so it never delays the
 * trip to Amazon. Three sinks, each independent and each fail-safe:
 *
 *   1. console.log  — structured line, visible in Vercel function logs.
 *   2. Vercel Web Analytics custom event — NOTE: custom events are a Pro
 *      feature, so on the Hobby plan this is collected but not shown.
 *   3. PostHog (server-side) — the one you can actually read on a free plan.
 *
 * PostHog runs SERVER-SIDE ONLY, on purpose: nothing executes in the
 * visitor's browser, so there are no cookies and no consent banner is needed,
 * it can't be blocked, and the API key never reaches the client (which is why
 * it is POSTHOG_KEY and not NEXT_PUBLIC_POSTHOG_KEY).
 *
 * Until POSTHOG_KEY is set this is a silent no-op — safe to ship as-is.
 */

import { randomUUID } from "node:crypto";
import { track } from "@vercel/analytics/server";
import { PostHog } from "posthog-node";

export type BuyClickEvent = {
  book: string;
  country: string;
  marketplace: string;
  utmSource?: string;
};

const POSTHOG_KEY = process.env.POSTHOG_KEY;
/** EU region by default — keeps data in the EU for UK/EU visitors. */
const POSTHOG_HOST = process.env.POSTHOG_HOST ?? "https://eu.i.posthog.com";

async function sendToPostHog(event: BuyClickEvent): Promise<void> {
  if (!POSTHOG_KEY) return; // not configured yet

  // On serverless the function can freeze the moment the response is done, so
  // flush immediately rather than batching, and await shutdown — otherwise the
  // event is silently dropped.
  const client = new PostHog(POSTHOG_KEY, {
    host: POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });

  try {
    client.capture({
      // Anonymous one-off: a random id plus $process_person_profile=false means
      // PostHog records the event without building a person profile, so we
      // never track individuals across visits.
      distinctId: randomUUID(),
      event: "buy_click",
      properties: {
        book: event.book,
        country: event.country,
        marketplace: event.marketplace,
        source: event.utmSource ?? "direct",
        $process_person_profile: false,
      },
    });
    await client.shutdown();
  } catch {
    // Analytics must never break the redirect.
  }
}

export async function logBuyClick(event: BuyClickEvent): Promise<void> {
  // Structured single-line log → easy to grep in Vercel logs.
  console.log("buy_click", JSON.stringify(event));

  await Promise.allSettled([
    track("buy_click", {
      book: event.book,
      country: event.country,
      marketplace: event.marketplace,
      source: event.utmSource ?? "direct",
    }),
    sendToPostHog(event),
  ]);
}
