# Bingo Lottery Drawing System

A modern Next.js dealer/operator console for drawing unique bingo or lottery balls from 1 to 90. It is designed for live operators, not player gameplay.

## Features

- One animated lottery ball mixer inspired by Thai lottery machines
- Unique random draws from 1-90 with duplicate prevention
- Drawn number board with draw-order and numerical sorting
- Dealer controls for new game, draw, undo, winner record, reset, fullscreen, and auto draw
- Winner modal with prize amount, card count, notes, and prize round
- Local game history with CSV and JSON export
- LocalStorage persistence, no backend required
- Sound effects using the Web Audio API
- Confetti animation after winner recording
- Responsive desktop and tablet layout

## Keyboard Shortcuts

- `Space`: draw ball
- `U`: undo last draw
- `W`: open winner form
- `F`: toggle fullscreen

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
```

The production build is exported to the `out` directory.

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Keep the default framework preset as Next.js.
4. Build command: `npm run build`
5. Output is handled by Next.js automatically.

## Deploy to Cloudflare Pages

This app is fully static and does not need Workers, Wrangler, or OpenNext.

Use these Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `out`
- Deploy command: leave empty
- Node.js version: `22`

If Cloudflare currently has `npx wrangler deploy` in the deploy command field, remove it. That command deploys as a Worker and can create a failing OpenNext service binding.
