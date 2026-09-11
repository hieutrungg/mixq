import { useState } from 'react'
import { CloudRain, Coffee, Flame, Keyboard, Trees, Waves } from 'lucide-react'

import Header from './components/layout/Header'
import SoundCard from './components/mixer/SoundCard'

const sounds = [
  { id: 'rain', name: 'Rain', icon: CloudRain, iconClassName: 'text-sky-300' },
  { id: 'cafe', name: 'Café', icon: Coffee, iconClassName: 'text-amber-300' },
  { id: 'fireplace', name: 'Fireplace', icon: Flame, iconClassName: 'text-orange-300' },
  { id: 'forest', name: 'Forest', icon: Trees, iconClassName: 'text-emerald-300' },
  { id: 'ocean-waves', name: 'Ocean Waves', icon: Waves, iconClassName: 'text-cyan-300' },
  { id: 'keyboard', name: 'Keyboard', icon: Keyboard, iconClassName: 'text-violet-300' },
] as const

type SoundId = (typeof sounds)[number]['id']

type SoundUiState = {
  isActive: boolean
  volume: number
}

const initialSoundStates: Record<SoundId, SoundUiState> = {
  rain: { isActive: true, volume: 68 },
  cafe: { isActive: false, volume: 44 },
  fireplace: { isActive: false, volume: 52 },
  forest: { isActive: true, volume: 36 },
  'ocean-waves': { isActive: false, volume: 58 },
  keyboard: { isActive: false, volume: 32 },
}

function App() {
  const [soundStates, setSoundStates] = useState(initialSoundStates)

  const toggleSound = (soundId: SoundId) => {
    setSoundStates((currentStates) => ({
      ...currentStates,
      [soundId]: {
        ...currentStates[soundId],
        isActive: !currentStates[soundId].isActive,
      },
    }))
  }

  const setVolume = (soundId: SoundId, volume: number) => {
    setSoundStates((currentStates) => ({
      ...currentStates,
      [soundId]: { ...currentStates[soundId], volume },
    }))
  }

  return (
    <div className="min-h-screen bg-[#0b0f12] text-stone-100">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:px-10">
        <section className="mb-10 max-w-2xl sm:mb-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal-300">
            Your ambient space
          </p>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
            Create your perfect atmosphere.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-400 sm:text-lg">
            Mix sounds. Focus. Relax.
          </p>
        </section>

        <section aria-labelledby="soundscapes-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 id="soundscapes-heading" className="text-xl font-semibold text-stone-100">
                Soundscapes
              </h2>
              <p className="mt-1 text-sm text-stone-500">Choose one or layer a few together.</p>
            </div>
            <p className="hidden text-sm text-stone-500 sm:block">6 sounds</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sounds.map((sound) => {
              const state = soundStates[sound.id]

              return (
                <SoundCard
                  key={sound.id}
                  name={sound.name}
                  icon={sound.icon}
                  iconClassName={sound.iconClassName}
                  isActive={state.isActive}
                  volume={state.volume}
                  onToggle={() => toggleSound(sound.id)}
                  onVolumeChange={(volume) => setVolume(sound.id, volume)}
                />
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
