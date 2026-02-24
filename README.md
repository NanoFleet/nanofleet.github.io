# nanofleet.github.io

Website for [NanoFleet](https://github.com/NanoFleet/nanofleet) — built with Astro 6 and Tailwind CSS v4, deployed to GitHub Pages at [nanofleet.ovh](https://nanofleet.ovh).

## Stack

- **[Astro 6](https://astro.build)** — static site generation
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling with OKLCH design tokens
- **[Velocity](https://github.com/southwellmedia/velocity)** — Astro starter kit (base template)

## Development

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:4321`.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm check` | Run Astro type checker |

## Deployment

Deployed automatically to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.
