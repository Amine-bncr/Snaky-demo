# Snaky DZ

A one-page showcase and ordering website for Snaky DZ, an Algerian company making
fully vegan, natural food products ("Produits végétaliens & naturels, Made in DZ").

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

## Deploy to Netlify

1. Push this repository to GitHub.
2. In the Netlify dashboard, import the site from Git.
3. Build settings are already configured in [`netlify.toml`](netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `dist`

No backend, no database, no analytics. Orders are sent straight to WhatsApp.

## Where to edit

- **Products, prices, badges, images:** [`src/data/products.ts`](src/data/products.ts).
  `priceDA` is `number | null` — set the price in Algerian dinars (DA) when the
  client confirms it. `packSize` is the number of units per carton (Professionnel
  mode). `getProducts()` is the single entry point, so a future Supabase source
  can replace it without touching components.
- **WhatsApp number, social links, delivery and payment notes:**
  [`src/config/site.ts`](src/config/site.ts).
- **Order state and message builder:** [`src/hooks/useOrder.ts`](src/hooks/useOrder.ts)
  and [`src/lib/whatsapp.ts`](src/lib/whatsapp.ts).
- **Design tokens (colours, fonts):** [`src/index.css`](src/index.css) Tailwind theme.
- **Favicon:** [`public/favicon.svg`](public/favicon.svg).
- **Logo:** `public/logo.png` (trimmed copy of the original; the original in
  `images/` is never modified).

## Assets

Product photos are copied and converted to WebP by `scripts/build-assets.cjs`.
Run it again if the originals change. Never edit the files in `images/`.

## Notes

- This is a demo: `index.html` contains `<meta name="robots"
  content="noindex, nofollow">` and `public/robots.txt` disallows all. Remove both
  at launch.
- All visible copy is in French. Code, comments and identifiers are in English.