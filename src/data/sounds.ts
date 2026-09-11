import type { SoundDefinition } from '../types/sound'

export const sounds = [
  {
    id: 'rain',
    name: 'Rain',
    audioSrc: '/audio/rain.wav',
    icon: 'rain',
    iconClassName: 'text-sky-300',
    defaultVolume: 0.68,
  },
  {
    id: 'cafe',
    name: 'Café',
    audioSrc: '/audio/cafe.wav',
    icon: 'cafe',
    iconClassName: 'text-amber-300',
    defaultVolume: 0.44,
  },
  {
    id: 'fireplace',
    name: 'Fireplace',
    audioSrc: '/audio/fireplace.wav',
    icon: 'fireplace',
    iconClassName: 'text-orange-300',
    defaultVolume: 0.52,
  },
  {
    id: 'forest',
    name: 'Forest',
    audioSrc: '/audio/forest.wav',
    icon: 'forest',
    iconClassName: 'text-emerald-300',
    defaultVolume: 0.36,
  },
  {
    id: 'ocean-waves',
    name: 'Ocean Waves',
    audioSrc: '/audio/ocean-waves.wav',
    icon: 'ocean',
    iconClassName: 'text-cyan-300',
    defaultVolume: 0.58,
  },
  {
    id: 'keyboard',
    name: 'Keyboard',
    audioSrc: '/audio/keyboard.wav',
    icon: 'keyboard',
    iconClassName: 'text-violet-300',
    defaultVolume: 0.32,
  },
] as const satisfies readonly SoundDefinition[]

