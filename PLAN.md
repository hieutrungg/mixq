# Mixq Development Plan

Mixq is a lightweight ambient sound mixer built with React, TypeScript, Tailwind CSS, and Howler.js.

The goal of the first release is to build a polished frontend-only MVP and deploy it to Vercel.

---

# M0 — Project Bootstrap

## Project setup

- [x] Create Vite React TypeScript project
- [x] Verify Node.js and npm environment
- [x] Install project dependencies
- [x] Configure Tailwind CSS
- [x] Install Lucide React
- [x] Install Howler.js
- [x] Enable TypeScript strict mode
- [x] Verify development server
- [x] Verify production build

## Project structure

- [x] Create `components` directory
- [x] Create `hooks` directory
- [x] Create `data` directory
- [x] Create `types` directory
- [x] Create `utils` directory
- [x] Create `public/audio` directory

## Documentation

- [x] Add README.md
- [x] Add PLAN.md

Definition of done:

- `npm run dev` works
- `npm run build` succeeds
- no TypeScript errors

---

# M1 — Static Application UI

## Application shell

- [x] Create top navigation
- [x] Add Mixq branding
- [x] Add theme toggle placeholder
- [x] Build responsive page container

## Hero

- [x] Add headline
- [x] Add supporting description

Suggested copy:

Create your perfect atmosphere.

Mix sounds. Focus. Relax.

## Sound grid

Create static sound cards for:

- [x] Rain
- [x] Café
- [x] Fireplace
- [x] Forest
- [x] Ocean Waves
- [x] Keyboard

Each card should display:

- [x] icon
- [x] name
- [x] play/pause button
- [x] volume slider
- [x] active visual state

## Responsive layout

- [x] Desktop grid
- [x] Tablet layout
- [x] Mobile layout

Definition of done:

- UI matches intended layout
- components are reusable
- mobile layout remains usable
- no audio behavior required yet

---

# M2 — Audio Mixer Engine

## Audio assets

- [x] Add licensed or royalty-free audio loops
- [x] Store audio files under `public/audio`
- [x] Verify seamless looping

## Sound definitions

- [x] Create `SoundDefinition` type
- [x] Create sound configuration data
- [x] Map UI cards from sound configuration

## Audio mixer

Create:

`src/hooks/useAudioMixer.ts`

Responsibilities:

- [x] initialize Howler audio instances
- [x] toggle sound
- [x] play sound
- [x] pause sound
- [x] stop sound
- [x] loop audio
- [x] update individual volume
- [x] track active sounds

## UI integration

- [x] Connect play button
- [x] Connect volume slider
- [x] Display active state
- [x] Support multiple simultaneous sounds

Definition of done:

- multiple sounds can play simultaneously
- each sound has independent volume
- looping works correctly
- UI accurately reflects playback state

---

# M3 — Presets

## Data model

Create a `Preset` type containing:

- [x] id
- [x] name
- [x] sound configuration
- [x] creation timestamp

## Default presets

Create:

- [x] Deep Focus
- [x] Rainy Café
- [x] Night Coding

## Preset controls

- [x] Save current mix
- [x] Name preset
- [x] Load preset
- [x] Delete preset

## Persistence

- [x] Create reusable `useLocalStorage` hook
- [x] Persist custom presets
- [x] Restore presets after refresh

Definition of done:

- user-created presets survive page reload
- loading a preset reproduces the saved mix

---

# M4 — Session Controls

## Master controls

- [ ] Play active sounds
- [ ] Pause all
- [ ] Stop all
- [ ] Master volume slider

## Focus timer

Create:

`src/hooks/useTimer.ts`

Timer features:

- [ ] 25-minute preset
- [ ] 45-minute preset
- [ ] 60-minute preset
- [ ] Start
- [ ] Pause
- [ ] Reset
- [ ] Remaining-time display

Definition of done:

- timer remains accurate
- timer controls work correctly
- audio playback is independent from timer state

---

# M5 — UX Polish

## Theme

- [ ] Light mode
- [ ] Dark mode
- [ ] System theme detection
- [ ] Persist theme preference

## Interaction polish

- [ ] Hover states
- [ ] Focus states
- [ ] Active sound animation
- [ ] Smooth transitions
- [ ] Loading state where needed

## Accessibility

- [ ] Keyboard navigation
- [ ] Proper button labels
- [ ] aria-label for icon-only buttons
- [ ] slider labels
- [ ] sufficient contrast

## Responsive verification

Test:

- [ ] 360px mobile
- [ ] 768px tablet
- [ ] 1024px laptop
- [ ] 1440px desktop

Definition of done:

- no overflow
- no broken layouts
- all controls usable on mobile
- keyboard navigation works

---

# M6 — Production & Vercel

## Production verification

Run:

```bash
npm run build
```

Verify:

- [ ] production build succeeds
- [ ] no TypeScript errors
- [ ] no console errors
- [ ] audio assets load correctly

## Metadata

- [ ] page title
- [ ] meta description
- [ ] favicon
- [ ] Open Graph metadata where applicable

## Performance

- [ ] inspect audio asset sizes
- [ ] avoid unnecessarily large images
- [ ] lazy-load resources where useful

## Vercel

- [ ] Push project to GitHub
- [ ] Import repository into Vercel
- [ ] Configure build settings
- [ ] Deploy production version
- [ ] Verify production URL
- [ ] Test audio on deployed version
- [ ] Test mobile production version

Definition of done:

Mixq is publicly accessible on Vercel and all MVP functionality works correctly.

---

# Post-MVP Ideas

Do not implement these before M6.

Possible future features:

- [ ] shareable mixes
- [ ] custom uploaded sounds
- [ ] Pomodoro history
- [ ] session statistics
- [ ] keyboard shortcuts
- [ ] offline PWA
- [ ] account sync
- [ ] cloud presets
- [ ] collaborative rooms
- [ ] animated ambient backgrounds

---

# MVP Scope Rule

If a proposed feature does not directly improve:

1. mixing ambient sounds,
2. saving mixes,
3. running a focus session,

it should probably wait until after the MVP.
