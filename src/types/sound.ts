export const soundIds = [
  'rain',
  'cafe',
  'fireplace',
  'forest',
  'ocean-waves',
  'keyboard',
] as const

export type SoundId = (typeof soundIds)[number]

export type SoundIconName = 'rain' | 'cafe' | 'fireplace' | 'forest' | 'ocean' | 'keyboard'

export interface SoundDefinition {
  id: SoundId
  name: string
  audioSrc: string
  icon: SoundIconName
  iconClassName: string
  defaultVolume: number
}

export interface SoundState {
  id: SoundId
  isActive: boolean
  isPlaying: boolean
  volume: number
  error: string | null
}

export type SoundStateMap = Record<SoundId, SoundState>

