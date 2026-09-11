import { useCallback, useEffect, useRef, useState } from 'react'
import { Howl, Howler } from 'howler'

import type { Preset } from '../types/preset'
import type { SoundDefinition, SoundId, SoundStateMap } from '../types/sound'

function createInitialState(definitions: readonly SoundDefinition[]): SoundStateMap {
  return Object.fromEntries(
    definitions.map((sound) => [
      sound.id,
      {
        id: sound.id,
        isActive: false,
        isPlaying: false,
        volume: sound.defaultVolume,
        error: null,
      },
    ]),
  ) as SoundStateMap
}

export function useAudioMixer(definitions: readonly SoundDefinition[]) {
  const howlsRef = useRef(new Map<SoundId, Howl>())
  const [soundStates, setSoundStates] = useState(() => createInitialState(definitions))
  const [masterVolume, setMasterVolumeState] = useState(1)
  const soundStatesRef = useRef(soundStates)

  useEffect(() => {
    soundStatesRef.current = soundStates
  }, [soundStates])

  const updateSoundState = useCallback((soundId: SoundId, updates: Partial<SoundStateMap[SoundId]>) => {
    setSoundStates((currentStates) => ({
      ...currentStates,
      [soundId]: { ...currentStates[soundId], ...updates },
    }))
  }, [])

  useEffect(() => {
    const howls = howlsRef.current

    definitions.forEach((sound) => {
      const howl = new Howl({
        src: [sound.audioSrc],
        format: ['wav'],
        loop: true,
        preload: true,
        volume: sound.defaultVolume,
        onplay: () => updateSoundState(sound.id, { isActive: true, isPlaying: true, error: null }),
        onpause: () => updateSoundState(sound.id, { isPlaying: false }),
        onstop: () => updateSoundState(sound.id, { isActive: false, isPlaying: false }),
        onloaderror: (_playbackId, error) => {
          updateSoundState(sound.id, {
            isActive: false,
            isPlaying: false,
            error: `Could not load this sound (${String(error)}).`,
          })
        },
        onplayerror: (_playbackId, error) => {
          updateSoundState(sound.id, {
            isActive: false,
            isPlaying: false,
            error: `Playback could not start (${String(error)}).`,
          })
        },
      })

      howls.set(sound.id, howl)
    })

    return () => {
      howls.forEach((howl) => {
        howl.off()
        howl.unload()
      })
      howls.clear()
    }
  }, [definitions, updateSoundState])

  const playSound = useCallback(
    (soundId: SoundId) => {
      const howl = howlsRef.current.get(soundId)
      if (!howl) return

      updateSoundState(soundId, { isActive: true, error: null })
      if (!howl.playing()) howl.play()
    },
    [updateSoundState],
  )

  const pauseSound = useCallback(
    (soundId: SoundId) => {
      const howl = howlsRef.current.get(soundId)
      if (!howl) return

      howl.pause()
      updateSoundState(soundId, { isPlaying: false })
    },
    [updateSoundState],
  )

  const stopSound = useCallback(
    (soundId: SoundId) => {
      const howl = howlsRef.current.get(soundId)
      if (!howl) return

      howl.stop()
      updateSoundState(soundId, { isActive: false, isPlaying: false })
    },
    [updateSoundState],
  )

  const toggleSound = useCallback(
    (soundId: SoundId) => {
      const state = soundStatesRef.current[soundId]

      if (state.isPlaying) {
        pauseSound(soundId)
        updateSoundState(soundId, { isActive: false })
      } else {
        playSound(soundId)
      }
    },
    [pauseSound, playSound, updateSoundState],
  )

  const setSoundVolume = useCallback(
    (soundId: SoundId, volume: number) => {
      const normalizedVolume = Math.min(1, Math.max(0, volume))
      howlsRef.current.get(soundId)?.volume(normalizedVolume)
      updateSoundState(soundId, { volume: normalizedVolume })
    },
    [updateSoundState],
  )

  const applyPreset = useCallback(
    (preset: Preset) => {
      definitions.forEach((sound) => {
        const settings = preset.sounds[sound.id]
        const howl = howlsRef.current.get(sound.id)
        if (!settings || !howl) return

        const volume = Math.min(1, Math.max(0, settings.volume))
        howl.volume(volume)
        updateSoundState(sound.id, {
          isActive: settings.isActive,
          isPlaying: settings.isActive,
          volume,
          error: null,
        })

        if (settings.isActive) {
          if (!howl.playing()) howl.play()
        } else {
          howl.stop()
        }
      })
    },
    [definitions, updateSoundState],
  )

  const playAll = useCallback(() => {
    definitions.forEach((sound) => {
      const state = soundStatesRef.current[sound.id]
      const howl = howlsRef.current.get(sound.id)
      if (state.isActive && howl && !howl.playing()) howl.play()
    })
  }, [definitions])

  const pauseAll = useCallback(() => {
    definitions.forEach((sound) => {
      const state = soundStatesRef.current[sound.id]
      const howl = howlsRef.current.get(sound.id)
      if (state.isActive && howl?.playing()) howl.pause()
    })

    setSoundStates((currentStates) => {
      const nextStates = { ...currentStates }
      definitions.forEach((sound) => {
        if (currentStates[sound.id].isActive) {
          nextStates[sound.id] = { ...currentStates[sound.id], isPlaying: false }
        }
      })
      return nextStates
    })
  }, [definitions])

  const stopAll = useCallback(() => {
    howlsRef.current.forEach((howl) => howl.stop())
    setSoundStates((currentStates) => {
      const nextStates = { ...currentStates }
      definitions.forEach((sound) => {
        nextStates[sound.id] = {
          ...currentStates[sound.id],
          isActive: false,
          isPlaying: false,
        }
      })
      return nextStates
    })
  }, [definitions])

  const setMasterVolume = useCallback((volume: number) => {
    const normalizedVolume = Math.min(1, Math.max(0, volume))
    Howler.volume(normalizedVolume)
    setMasterVolumeState(normalizedVolume)
  }, [])

  return {
    soundStates,
    masterVolume,
    toggleSound,
    playSound,
    pauseSound,
    stopSound,
    setSoundVolume,
    applyPreset,
    playAll,
    pauseAll,
    stopAll,
    setMasterVolume,
  }
}
