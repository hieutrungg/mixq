import type { SoundId } from './sound'

export interface PresetSoundSettings {
  isActive: boolean
  volume: number
}

export type PresetSoundMap = Record<SoundId, PresetSoundSettings>

export interface Preset {
  id: string
  name: string
  sounds: PresetSoundMap
  createdAt: string
  isDefault?: boolean
}

