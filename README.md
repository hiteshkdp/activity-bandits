# Book Hub

A fast, public, mobile-first website that lists all your KDP books and sends each
visitor to the **correct Amazon marketplace** for their country — built for low-friction
TikTok → purchase.

## How it works

```
TikTok bio / video link
        │
        ▼
  yourdomain.com            home — grid of book cards
        │
        ▼
  /book/<slug>              cover, blurb, rating, "Buy on Amazon"
        │  (Buy →)
        ▼
  /go/<slug>                detects country → picks marketplace → looks up ASIN → 302
        ▼
  amazon.<correct-tld>/dp/<correct-asin>
```

Everything is driven by data files — adding a book is a data edit, not a code change.

## Editing your catalogue

- **`src/data/books.ts`** — your books. Each entry: title, blurb, optional rating, the
  ASIN per marketplace, and a `defaultAsin` fallback. **This is the main file you edit.**
- **`src/config/site.ts`** — your author/brand name, tagline, social links, and (later)
  Amazon Associates affiliate tags.
- **`src/data/marketplaces.ts`** — the country → Amazon store routing table. Rarely needs
  changing.

### Covers
By default a book's cover is pulled from Amazon, derived from its ASIN.
**Caveat (verified):** Amazon only serves real covers for **print** ASINs (ASIN = ISBN-10,
e.g. paperbacks / low-content books). **Kindle (B0…) ASINs return a blank image.** So:

- Print book → covers just work.
- Print + Kindle → set `coverAsin` to the **paperback** ASIN.
- Kindle-only → self-host: drop `public/covers/<slug>.jpg` and set `cover:
  "/covers/<slug>.jpg"` on that book.

Switching any book to a self-hosted cover later is a one-line change.

### ASINs
Find each book's ASIN in its Amazon "Product details" section or your KDP Bookshelf.
List only the marketplaces where the book is actually published; unlisted marketplaces
fall back to `defaultAsin`.

## Develop

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
```

### Test the geo-redirect locally
Spoof a country with the same header Vercel sets in production:

```bash
curl -i -H "x-vercel-ip-country: GB" http://localhost:3000/go/<slug>   # → amazon.co.uk
curl -i -H "x-vercel-ip-country: DE" http://localhost:3000/go/<slug>   # → amazon.de
curl -i http://localhost:3000/go/<slug>                                # → amazon.com (fallback)
```

You can also use `?country=FR` in dev instead of the header.

## Deploy (Vercel) + domain

1. Push this folder to its own GitHub repo.
2. Import it into [Vercel](https://vercel.com) → it autodetects Next.js → Deploy.
3. Country detection (`x-vercel-ip-country`) and Web Analytics work automatically on Vercel.
4. Buy a domain (Cloudflare Registrar = at-cost, or Namecheap), then in Vercel →
   Project → Settings → Domains → add it and set the DNS records Vercel shows. HTTPS is
   automatic.

## Analytics

- Page views: **Vercel Web Analytics** (already wired via `<Analytics />`). Enable it in
  the Vercel dashboard.
- Buy clicks: the `/go/<slug>` route logs a structured `buy_click` event (book, country,
  marketplace, utm_source) to the server logs. Swap `src/lib/analytics.ts` for a DB/KV
  write if you want exportable rows later.

## Affiliate (off by default)

`src/lib/affiliate.ts` + `AFFILIATE_TAGS` in `src/config/site.ts` are a ready hook. Add
per-marketplace Associates tags to start appending `?tag=…`. If you enable it, add a
visible affiliate disclosure (see `SiteFooter.tsx`).
