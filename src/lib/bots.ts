/**
 * Crude user-agent bot detection, used to keep automated traffic out of the
 * buy-click analytics. Deliberately conservative in effect: a bot still gets
 * its redirect (so link previews and archivers work), we simply don't record
 * the click. Misclassifying a human only costs one missing event.
 */
const BOT = new RegExp(
  [
    "bot", "crawl", "spider", "slurp", "scrape", "monitor", "headless",
    "preview", "facebookexternalhit", "embedly", "quora link preview",
    "whatsapp", "telegram", "discord", "slackbot", "linkedinbot", "twitterbot",
    "pinterest", "curl", "wget", "python-requests", "python-urllib",
    "node-fetch", "axios", "go-http-client", "java/", "okhttp", "libwww",
    "lighthouse", "pagespeed", "gtmetrix", "ahrefs", "semrush", "mj12",
    "dotbot", "petalbot", "bytespider", "applebot", "google-inspectiontool",
  ].join("|"),
  "i",
);

export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true; // no UA at all is almost always automated
  return BOT.test(userAgent);
}
