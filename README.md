# Ghosted — Waitlist

Single-screen WebGL waitlist landing page for **Ghosted**: a glassmorphic React UI over a React Three Fiber liquid-glass centerpiece.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion
- Three.js + `@react-three/fiber` + `@react-three/drei`

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start the Vite dev server |
| `npm run build`   | Typecheck + production build |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run oxlint               |

## Notes

Waitlist submit is a client-side mock: email validation, animated success state, and a deterministic fake queue position. No backend is required.
