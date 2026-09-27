# Ayzan Group

A responsive corporate website built with **Next.js 16 App Router**, React 19, TypeScript and Three.js. Content comes from the supplied Ayzan Group knowledge base. Brand colors are pink, black and white; the logo is the requested placeholder “A”.

## Run locally

Requires Node.js 20.9 or later (Node.js 22 LTS recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:4173.

```sh
npm run typecheck
npm run build
npm start
```

## Deploy to Vercel

Import this repository into Vercel. Framework: **Next.js**. Build command: `npm run build`. Use the repository root as the root directory and leave the output directory at the Next.js default. No environment variables or backend services are required.

Alternatively, from an authenticated Vercel CLI:

```sh
npx vercel link
npx vercel deploy --prod
```

## Edit the website

- `src/lib/content.ts`: the five businesses, service descriptions, FAQs and contact email.
- `src/app/page.tsx`: homepage sections and copy.
- `src/app/globals.css`: responsive layout, colors, typography and scroll-reveal styles.
- `src/components/Header.tsx`: navigation and placeholder logo.
- `src/app/page.tsx`: footer placeholder logo.
- `public/favicon.svg`: placeholder browser icon.
- `src/components/HeroScene.tsx` and `src/lib/create-scene.ts`: interactive 3D sculpture and static fallback.
- `public/assets/connected-sculpture.webp`: original generated brand illustration.
- `src/app/layout.tsx`: metadata and locally hosted DM Sans font.

## Behavior and accessibility

The page includes five expandable business sections, native FAQ disclosures, a mobile navigation menu, section anchors and direct email links. It has no simulated form submissions, booking, payment or newsletter backend. Email links open the visitor's email application.

The Three.js sculpture is dynamically loaded, responds to pointer movement, and supports accessible rotation and pause controls. Animation pauses when offscreen or the browser tab is hidden. Reduced-motion preferences are respected. The image fallback remains visible when WebGL is unavailable. DOM content is server-rendered, and disclosures continue to work without JavaScript.

An optional WebMCP `explore_ayzan_business` tool uses the same visible portfolio; it does not send enquiries. Unsupported browsers use normal navigation.

## Content decisions

Names use the primary variants in the supplied brief. Unverified app-store claims, payment processing, travel-office claims, performance statistics, unrelated template content and placeholder addresses/phone numbers have been omitted. The confirmed contact is `support@ayzangroup.com`. No registration status, regulatory approval or service outcome guarantees are asserted.

## Verification in this workspace

- Dependency installation: successful; lockfile included.
- TypeScript: `npm run typecheck` passed.
- Production build: attempted with Turbopack and webpack; both were blocked by the execution environment's missing resident-memory system interface (`uv_resident_set_memory`) before application compilation.
- Browser preview: unavailable because the managed preview service is absent. Responsive rendering, WebGL and browser-only WebMCP execution still require a live browser check.
- Deployment: not completed. The connected Vercel deployment action is unavailable, and no authenticated CLI is configured.

These limitations are not represented as successful production or browser tests. Run the production build and check desktop/mobile interaction on Vercel before launch.

## Assets

DM Sans is self-hosted using `next/font/local`; its license is included in `src/app/fonts/OFL.txt`. The pink/silver sculpture is original generated brand art, not a photograph of company premises, products or actual community work.
