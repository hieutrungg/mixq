import { CloudRain, Coffee, Flame, Keyboard, Trees, Waves } from 'lucide-react'

import Header from './components/layout/Header'
import MasterControls from './components/mixer/MasterControls'
import SoundCard from './components/mixer/SoundCard'
import PresetPanel from './components/presets/PresetPanel'
import FocusTimer from './components/timer/FocusTimer'
import { defaultPresets } from './data/defaultPresets'
import { sounds } from './data/sounds'
import { useAudioMixer } from './hooks/useAudioMixer'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTheme } from './hooks/useTheme'
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
  const { theme, toggleTheme } = useTheme()
  const {
    soundStates,
    masterVolume,
    toggleSound,
    setSoundVolume,
    applyPreset,
    playAll,
    pauseAll,
    stopAll,
    setMasterVolume,
  } = useAudioMixer(sounds)
  const [presets, setPresets] = useLocalStorage<Preset[]>('mixq.presets.v1', defaultPresets)
  const soundStateList = Object.values(soundStates)
  const activeCount = soundStateList.filter((sound) => sound.isActive).length
  const playingCount = soundStateList.filter((sound) => sound.isPlaying).length

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
    <div id="top" className="app-shell min-h-screen">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:px-10">
        <section className="mb-10 max-w-2xl sm:mb-12">
          <p className="accent-text mb-4 text-sm font-medium uppercase tracking-[0.22em]">
            Your ambient space
          </p>
          <h1 className="copy-primary text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            Create your perfect atmosphere.
          </h1>
          <p className="copy-secondary mt-5 max-w-xl text-base leading-7 sm:text-lg">
            Mix sounds. Focus. Relax.
          </p>
        </section>

        <div className="mb-12 grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(19rem,0.75fr)]">
          <MasterControls
            activeCount={activeCount}
            playingCount={playingCount}
            masterVolume={masterVolume}
            onPlayAll={playAll}
            onPauseAll={pauseAll}
            onStopAll={stopAll}
            onMasterVolumeChange={setMasterVolume}
          />
          <FocusTimer />
        </div>

        <section aria-labelledby="soundscapes-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 id="soundscapes-heading" className="copy-primary text-xl font-semibold">
                Soundscapes
              </h2>
              <p className="copy-muted mt-1 text-sm">Choose one or layer a few together.</p>
            </div>
            <p className="copy-muted hidden text-sm sm:block">6 sounds</p>
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
                  isLoaded={state.isLoaded}
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
