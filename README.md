# Northline Supply

Northline Supply is a responsive direct-to-consumer commerce storefront built as a **portfolio demonstration**. It presents a fictional catalog of modern desk essentials, lighting, audio equipment, seating, and organization products through a polished search-to-checkout experience.

This is not a real client project or active retailer. Product names, prices, specifications, ratings, review counts, promotions, inventory states, order references, and brand claims are fictional demo content. Checkout does not process payment, contact and newsletter forms do not transmit data, and no real orders are created.

[Live demo](https://northline-storefront.vercel.app) · [GitHub repository](https://github.com/lizhangfei843-svg/northline-storefront)

## Highlights

- Next.js 16 App Router with React 19 and strict TypeScript
- Tailwind CSS 4 with a responsive, accessible design system
- 12 typed local products across five categories
- Search, category, minimum/maximum price, and sort controls
- URL query parameters that preserve catalog filters
- Desktop filter sidebar and accessible mobile filter drawer
- Static product routes with dynamic metadata, image galleries, variants, quantity controls, specifications, and related products
- Zustand cart with localStorage persistence, quantity updates, removal, clearing, totals, simulated shipping, and tax
- Front-end-only checkout validation, shipping options, `DESK10` demo promo code, and local confirmation state
- Validated contact and newsletter demo forms that do not send data
- Global metadata, Open Graph image, robots.txt, sitemap.xml, custom 404, loading states, and error state
- Keyboard navigation, visible focus styles, semantic landmarks, labels, alt text, and reduced-motion support
- Vitest unit coverage and Playwright user-flow plus visual checks
- Production deployment on Vercel and GitHub Actions CI

## Tech stack

- Next.js 16.2.10
- React 19.2.4
- TypeScript 5 (strict mode)
- Tailwind CSS 4
- Zustand 5
- lucide-react
- Vitest + Testing Library
- Playwright

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Brand home, hero, categories, featured products, values, best sellers, newsletter demo |
| `/shop` | Searchable and filterable product catalog |
| `/shop/[slug]` | Static product detail pages with dynamic metadata |
| `/cart` | Persistent cart and calculated demo totals |
| `/checkout` | Mock checkout with local validation and no payment fields |
| `/order-confirmation` | Local-only demo completion state |
| `/about` | Fictional brand and portfolio transparency statement |
| `/contact` | Front-end-only validated contact form |

## Local setup

Requirements: Node.js 22+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is occupied, use:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3210
```

## Quality commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Playwright uses `http://127.0.0.1:3210` internally and starts the development server automatically. Install its browser once when needed:

```bash
npx playwright install chromium
```

Latest local verification on 2026-07-21:

- ESLint: passed
- TypeScript strict check: passed
- Vitest: 5 tests passed
- Playwright: 13 tests passed (critical flows, product interactions, overflow checks, and responsive visual checks)
- Next.js production build: passed; 24 static/SSG routes generated

## Architecture notes

- `src/data/products.ts` is the single source of truth for the fictional catalog.
- `src/types/product.ts` defines product, image, variant, category, and inventory types.
- `src/store/cart-store.ts` owns cart mutations and versioned localStorage persistence under `northline-cart`.
- `src/lib/commerce.ts` contains pure filtering, sorting, currency, discount, shipping, tax, and total helpers.
- Server Components render metadata and static catalog content; focused Client Components handle filters, forms, image selection, and cart interactions.
- Product routes are prerendered with `generateStaticParams`; no database or runtime API is needed.
- Checkout stores only a short-lived fictional confirmation summary in `sessionStorage`. Form field values are not submitted to a server.

## Screenshots

- [Desktop home — 1440×900](artifacts/screenshots/home-desktop-1440x900.png)
- [Tablet home — 1024×768](artifacts/screenshots/home-tablet-1024x768.png)
- [Mobile home — 390×844](artifacts/screenshots/home-mobile-390x844.png)
- [Desktop catalog](artifacts/screenshots/shop-desktop-1440x900.png)
- [Mobile filter drawer](artifacts/screenshots/shop-mobile-filter-390x844.png)
- [Mobile cart](artifacts/screenshots/cart-mobile-390x844.png)
- [Mobile checkout](artifacts/screenshots/checkout-mobile-390x844.png)

Visual tests verify zero horizontal overflow, non-overlapping navigation, visible hero copy and imagery, stable first-row product-card height, contained long names, working mobile filters, loaded visible images, and non-overlapping mobile cart/checkout layouts.

## Image sources

Catalog and editorial photography is loaded from [Unsplash](https://unsplash.com/license) through fixed `images.unsplash.com` asset IDs. Images are representative editorial imagery and do not depict a real Northline product line or imply photographer endorsement.

| Usage | Unsplash photo IDs |
| --- | --- |
| Home hero / workplace editorial | `photo-1497366754035-f200968a6e72`, `photo-1524758631624-e2822e304c36` |
| Axis Desk Mat | `photo-1494438639946-1ebd1d20bf85`, `photo-1497366811353-6870744d04b2` |
| Arc Laptop Stand | `photo-1527443224154-c4a3942d3acf`, `photo-1524758631624-e2822e304c36` |
| Field Keyboard | `photo-1587829741301-dc798b83add3`, `photo-1595225476474-87563907a212` |
| Beam Task Lamp | `photo-1507473885765-e6ed057f782c`, `photo-1513506003901-1e6a229e2d15` |
| Halo Table Light | `photo-1517991104123-1d56a6e81ed9`, `photo-1543198126-a8ad8e47fb22` |
| Studio Headphones | `photo-1505740420928-5e560c06d30e`, `photo-1484704849700-f032a568e944` |
| Nearfield Speakers | `photo-1545454675-3531b543be5d`, `photo-1558537348-c0f8e733989d` |
| Signal Microphone | `photo-1590602847861-f357a9332bbc`, `photo-1589903308904-1010c2294adc` |
| Form Work Chair | `photo-1580480055273-228ff5388ef8`, `photo-1503602642458-232111445657` |
| Perch Stool | `photo-1530018607912-eff2daa1bac4`, `photo-1532372320572-cda25653a26d` |
| Rail Organizer | `photo-1497215842964-222b430dc094`, `photo-1524863479829-916d8e77f114` |
| Line Cable Kit | `photo-1517336714731-489689fd1ca8`, `photo-1484480974693-6ca0a78fb36b` |

`public/og.png` is an original AI-generated social preview created specifically for this portfolio demo. Final generation prompt: “Create a premium editorial product-photography Open Graph card for Northline Supply using white, light gray, charcoal, and forest green; show a mechanical keyboard, task lamp, headphones, and desk organizer; include the exact text NORTHLINE SUPPLY, Modern workspace essentials, and Portfolio demonstration; no people, metrics, watermark, gradients, or invented claims.”

## Deploy to Vercel

Production deployment: [northline-storefront.vercel.app](https://northline-storefront.vercel.app)

Source repository: [github.com/lizhangfei843-svg/northline-storefront](https://github.com/lizhangfei843-svg/northline-storefront)

The production project is currently deployed from the Vercel CLI. To enable automatic deployments for future GitHub pushes, add the GitHub account under **Vercel Account Settings → Authentication** and connect this repository from the project settings.

1. Clone the repository and run the local verification commands above.
2. In Vercel, choose **Add New → Project** and import the repository, or run `vercel --prod` from the project directory.
3. Keep **Framework Preset** as Next.js and use the default build command `npm run build`.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin, such as `https://northline-storefront.vercel.app`.
5. Deploy, then verify `/`, `/shop`, a product page, `/robots.txt`, and `/sitemap.xml`.

No database, payment, authentication, or private environment variables are required.

## Portfolio copy

**Portfolio description**

Built and deployed a responsive Next.js commerce storefront with strict TypeScript and Tailwind CSS, featuring URL-backed product search, category and price filtering, dynamic product pages, variant selection, persistent Zustand cart state, mock checkout validation, accessible responsive layouts, SEO metadata, automated Vitest/Playwright coverage, and Vercel production deployment.

**Freelancer proposal option 1**

I recently built and deployed Northline Supply, a polished Next.js commerce demo with responsive product discovery, URL-persistent filters, dynamic product pages, variant selection, a localStorage cart, and a fully validated mock checkout—showing I can take a storefront from typed data architecture through browser testing and production delivery.

**Freelancer proposal option 2**

My commerce portfolio includes a production-built Next.js and TypeScript storefront with reusable components, accessible mobile filters, persistent cart state, SEO routes, responsive visual QA at desktop/tablet/mobile sizes, and automated Playwright coverage for the complete browse-to-checkout journey.

**English résumé bullet**

- Built, tested, and deployed a responsive Next.js 16 commerce storefront with TypeScript, Tailwind CSS, URL-backed catalog filters, static product routes, Zustand localStorage cart persistence, mock checkout validation, SEO metadata, and Vercel production delivery.

**中文简历 bullet**

- 使用 Next.js 16、TypeScript 与 Tailwind CSS 构建、测试并部署响应式电商前端，涵盖 URL 商品筛选、静态商品详情、Zustand 购物车持久化、模拟结账校验、SEO 元数据、Playwright 自动化测试及 Vercel 生产部署。

**Suggested GitHub description**

Responsive Next.js commerce portfolio demo with typed catalog filters, dynamic product pages, persistent cart, mock checkout, SEO, and Playwright coverage.

## License and use

Code is intended for portfolio and educational demonstration. Review third-party image licenses before republishing or adapting the catalog for commercial use.
