# Mixq

Mixq is a minimalist ambient sound mixer for focus, relaxation, reading, and coding. The MVP is a frontend-only application built with React, TypeScript, Vite, Tailwind CSS, Lucide React, and Howler.js.

## Prerequisites

- Node.js 20.19 or newer
- npm

This project was bootstrapped with Node.js 25.9.0 and npm 11.12.1 through NVM for Windows.

## Local development

Install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite prints the local URL in the terminal, usually `http://localhost:5173`.

## Verification

Run the TypeScript compiler without emitting files:

```bash
npm run typecheck
```

Create a production build:

```bash
npm run build
```

Regenerate the original procedural audio loops:

```bash
npm run generate:audio
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

```text
src/
  components/
    layout/
    mixer/
    presets/
    timer/
    ui/
  hooks/
  data/
  types/
  utils/
  App.tsx
  main.tsx
public/
  audio/
  icons/
```

Audio playback lives in a custom hook instead of UI components. Data definitions and TypeScript models have dedicated directories so future milestones can add behavior without coupling it to presentation code.

The audio engine is implemented in `src/hooks/useAudioMixer.ts`. It owns every Howler instance and exposes typed playback and volume operations; sound cards remain presentational components. Audio asset provenance and loop-generation details are documented in `public/audio/README.md`.

Presets are represented by the explicit `Preset` model in `src/types/preset.ts`. The reusable `useLocalStorage` hook persists the default and user-created presets under the versioned `mixq.presets.v1` key, while the mixer hook applies saved sound states directly to the corresponding Howler instances.

Master audio controls reuse the same mixer hook: pausing preserves active sounds, stopping clears them, and Howler's global volume controls the final mix. The focus timer uses a wall-clock deadline instead of decrementing a counter, which keeps its remaining time accurate when the browser throttles background tabs. Timer and audio state remain independent.

Theme handling follows the operating-system preference on first visit and stores an explicit light or dark choice under `mixq.theme`. Semantic color tokens keep both themes consistent, while reduced-motion support disables decorative sound animation and shortens transitions for users who request it. Audio cards also expose loading and error states before playback is available.

The M5 layout was browser-verified at 360, 768, 1024, and 1440 pixels. All interactive controls remain inside the viewport, provide keyboard focus states, and expose accessible names for icon buttons and sliders.

## Deploy to Vercel

Mixq includes `vercel.json`, so Vercel can use the correct Vite build command, `dist` output directory, cache policy, and baseline security headers without extra environment variables.

1. Open [Vercel New Project](https://vercel.com/new) and sign in with GitHub.
2. Find and import the `hieutrungg/mixq` repository.
3. Confirm that the framework preset is **Vite** and the root directory is `./`.
4. Keep the detected build command as `npm run build` and output directory as `dist`.
5. Leave Environment Variables empty, then choose **Deploy**.
6. Open the generated URL and verify that every sound reaches the Ready state, playback works, theme preference survives refresh, and the page remains usable on mobile.

After the Git integration is connected, pushes to `main` create production deployments automatically, while pull requests and other branches receive preview deployments.

## Production notes

The six generated WAV loops total 4,608,264 bytes (about 4.4 MiB). They are core application content and preload so every sound is ready for immediate mixing; Vercel caches them with a one-day browser lifetime and a one-week stale-while-revalidate window. Content-hashed JavaScript and CSS assets use immutable caching. The interface does not ship decorative bitmap images.

Project progress and milestone scope are tracked in [`PLAN.md`](./PLAN.md).
