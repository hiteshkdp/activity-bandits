"use client";

import { useEffect } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics with a personal opt-out.
 *
 * Vercel has no "internal users" filter, so your own visits would otherwise
 * inflate Visitors and Page Views. `beforeSend` returning null drops an event
 * before it is ever sent.
 *
 * To stop counting yourself, visit once per device/browser:
 *     https://activitybandits.com/?notrack=1     ← opt out (persists)
 *     https://activitybandits.com/?notrack=0     ← start counting again
 *
 * The flag lives in localStorage, so it survives until that browser's site
 * data is cleared. It is per-device and per-browser — repeat it on your phone,
 * and again in a private window if you use one.
 */
const OPT_OUT_KEY = "ab-no-track";

function optedOut(): boolean {
  try {
    // Check the URL too, so the very page that sets the flag isn't counted.
    if (new URLSearchParams(window.location.search).get("notrack") === "1") {
      return true;
    }
    return window.localStorage.getItem(OPT_OUT_KEY) === "1";
  } catch {
    // Private mode / blocked storage — fall back to counting the visit.
    return false;
  }
}

export function Analytics() {
  useEffect(() => {
    try {
      const flag = new URLSearchParams(window.location.search).get("notrack");
      if (flag === "1") window.localStorage.setItem(OPT_OUT_KEY, "1");
      else if (flag === "0") window.localStorage.removeItem(OPT_OUT_KEY);
    } catch {
      // Nothing we can do without storage; analytics just stays on.
    }
  }, []);

  return <VercelAnalytics beforeSend={(event) => (optedOut() ? null : event)} />;
}
