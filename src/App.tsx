import { CloudRain, Coffee, Flame, Keyboard, Trees, Waves } from 'lucide-react'

import Header from './components/layout/Header'
import SoundCard from './components/mixer/SoundCard'
import PresetPanel from './components/presets/PresetPanel'
import { defaultPresets } from './data/defaultPresets'
import { sounds } from './data/sounds'
import { useAudioMixer } from './hooks/useAudioMixer'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Preset, PresetSoundMap } from './types/preset'
import type { SoundIconName } from './types/sound'

const soundIcons = {
  rain: CloudRain,
  cafe: Coffee,
  fireplace: Flame,
  forest: Trees,
  ocean: Waves,
  keyboard: Keyboard,
} satisfies Record<SoundIconName, typeof CloudRain>

function App() {
  const { soundStates, toggleSound, setSoundVolume, applyPreset } = useAudioMixer(sounds)
  const [presets, setPresets] = useLocalStorage<Preset[]>('mixq.presets.v1', defaultPresets)

  const savePreset = (name: string) => {
    const presetSounds = Object.fromEntries(
      sounds.map((sound) => [
        sound.id,
        {
          isActive: soundStates[sound.id].isActive,
          volume: soundStates[sound.id].volume,
        },
      ]),
    ) as PresetSoundMap

    const preset: Preset = {
      id:
        typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `preset-${Date.now().toString(36)}`,
      name,
      sounds: presetSounds,
      createdAt: new Date().toISOString(),
    }

    setPresets((currentPresets) => [...currentPresets, preset])
  }

  const deletePreset = (presetId: string) => {
    setPresets((currentPresets) =>
      currentPresets.filter((preset) => preset.id !== presetId),
    )
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
                  icon={soundIcons[sound.icon]}
                  iconClassName={sound.iconClassName}
                  isActive={state.isActive}
                  isPlaying={state.isPlaying}
                  volume={state.volume}
                  error={state.error}
                  onToggle={() => toggleSound(sound.id)}
                  onVolumeChange={(volume) => setSoundVolume(sound.id, volume)}
                />
              )
            })}
          </div>
        </section>

        <PresetPanel
          presets={presets}
          onSave={savePreset}
          onLoad={applyPreset}
          onDelete={deletePreset}
        />
      </main>
    </div>
  )
}

export default App
