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

Project progress and milestone scope are tracked in [`PLAN.md`](./PLAN.md).
