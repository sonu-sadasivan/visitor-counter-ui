# Visitor Counter Website

A Vite + React 19 single-page site that records one visit when loaded and shows the confirmed count from the Azure-hosted API.

## Design and architecture

`useVisitorCount` sends one `POST /api/visits` when the page mounts, including under React StrictMode. It does not retry automatically because a network failure can occur after the server has incremented the counter. The visitor may choose **Try again**, which sends one new request. `visitorService` validates the HTTP response before UI updates. `AnimatedNumber` animates that confirmed number with `requestAnimationFrame`; reduced-motion users see the final number immediately.

## Run locally

```sh
cd fe-website
npm install
copy .env.example .env
npm run dev
```

Set `VITE_API_BASE_URL` in `.env` to the API origin only, such as `http://localhost:3000` locally. Do not put secrets in Vite variables: values prefixed with `VITE_` are public browser configuration.

## Verify and build

```sh
npm run lint
npm test
npm run build
```

## Vercel

Import `fe-website` as the project root. Vercel detects Vite and uses `npm run build`, publishing `dist`. In each Vercel environment (Preview and Production), set `VITE_API_BASE_URL` to the matching Azure Container App HTTPS origin. Redeploy after changing it. Configure the backend's `FRONTEND_ORIGIN` to the corresponding Vercel site origin so browser CORS requests are allowed.
