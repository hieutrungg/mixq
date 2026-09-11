import { soundIds, type SoundId } from '../types/sound'
import type { Preset, PresetSoundMap } from '../types/preset'

function createPresetSounds(activeSounds: Partial<Record<SoundId, number>>): PresetSoundMap {
  return Object.fromEntries(
    soundIds.map((soundId) => [
      soundId,
      {
        isActive: soundId in activeSounds,
        volume: activeSounds[soundId] ?? 0.5,
      },
    ]),
  ) as PresetSoundMap
}

export const defaultPresets = [
  {
    id: 'default-deep-focus',
    name: 'Deep Focus',
    sounds: createPresetSounds({ rain: 0.42, forest: 0.24, keyboard: 0.34 }),
    createdAt: '2026-01-01T00:00:00.000Z',
    isDefault: true,
  },
  {
    id: 'default-rainy-cafe',
    name: 'Rainy Café',
    sounds: createPresetSounds({ rain: 0.64, cafe: 0.48 }),
    createdAt: '2026-01-01T00:00:00.000Z',
    isDefault: true,
  },
  {
    id: 'default-night-coding',
    name: 'Night Coding',
    sounds: createPresetSounds({ fireplace: 0.26, rain: 0.2, keyboard: 0.46 }),
    createdAt: '2026-01-01T00:00:00.000Z',
    isDefault: true,
  },
] satisfies Preset[]

