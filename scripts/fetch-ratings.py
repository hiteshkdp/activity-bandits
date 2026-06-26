#!/usr/bin/env python3
"""
Refresh book star ratings from Amazon.com.

Ratings are a SNAPSHOT — they change over time. Re-run this whenever you want to
update them (e.g. monthly), then rebuild/redeploy.

  python3 scripts/fetch-ratings.py

What it does:
  1. Reads every `defaultAsin` from src/data/books.ts
  2. Fetches amazon.com/dp/<ASIN> and parses the main product star rating
  3. Writes the rating back into each book's `rating:` field in books.ts
     (books with no Amazon reviews yet are left without a rating)

Notes:
  - amazon.co.uk tends to bot-wall; amazon.com works. Since these books share one
    ASIN across marketplaces, the .com rating is representative.
  - This is light scraping of a public page. Be polite (delays are built in). If
    Amazon ever changes its HTML, update the regex anchors below.
"""
import urllib.request, gzip, re, time, sys, os

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOOKS = os.path.join(ROOT, "src", "data", "books.ts")


def fetch(asin: str) -> str:
    req = urllib.request.Request(
        f"https://www.amazon.com/dp/{asin}",
        headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9",
                 "Accept-Encoding": "gzip, deflate"})
    with urllib.request.urlopen(req, timeout=25) as r:
        data = r.read()
        if r.headers.get("Content-Encoding") == "gzip":
            data = gzip.decompress(data)
        return data.decode("utf-8", "ignore")


def rating_of(asin: str):
    for attempt in range(3):
        try:
            html = fetch(asin)
            if "automated access" in html.lower() or len(html) < 20000:
                time.sleep(4 + attempt * 3)
                continue
            m = (re.search(r'id="acrPopover"[^>]*title="([0-9.]+) out of 5 stars"', html)
                 or re.search(r'acrPopover.*?([0-9.]+) out of 5 stars', html, re.S))
            return float(m.group(1)) if m else None
        except Exception:
            time.sleep(3 + attempt * 3)
    return None


def main():
    src = open(BOOKS).read()
    asins = list(dict.fromkeys(re.findall(r'defaultAsin:\s*"([^"]+)"', src)))
    print(f"Fetching ratings for {len(asins)} books…")
    updated = 0
    for i, asin in enumerate(asins, 1):
        r = rating_of(asin)
        print(f"  [{i}/{len(asins)}] {asin}: {r}")
        # Replace or insert a `rating:` line inside this book's block.
        block = re.search(r'(\{[^{}]*?defaultAsin:\s*"' + re.escape(asin) + r'"[^{}]*?\})', src, re.S)
        if block:
            b = block.group(1)
            b2 = re.sub(r'\n\s*rating:\s*[0-9.]+,', '', b)  # drop old rating
            if r:
                b2 = re.sub(r'(\n(\s*)ages:[^\n]*\n)', rf'\1\2rating: {r},\n', b2, count=1)
            if b2 != b:
                src = src.replace(b, b2)
                updated += 1
        time.sleep(1.6)
    open(BOOKS, "w").write(src)
    print(f"\nUpdated {updated} books in {BOOKS}")


if __name__ == "__main__":
    sys.exit(main())
