import { useState, type FormEvent } from 'react'
import { BookmarkPlus, FolderOpen, Sparkles, Trash2 } from 'lucide-react'

import type { Preset } from '../../types/preset'

type PresetPanelProps = {
  presets: Preset[]
  onSave: (name: string) => void
  onLoad: (preset: Preset) => void
  onDelete: (presetId: string) => void
}

function PresetPanel({ presets, onSave, onLoad, onDelete }: PresetPanelProps) {
  const [presetName, setPresetName] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedName = presetName.trim()
    if (!normalizedName) return

    onSave(normalizedName)
    setPresetName('')
  }

  return (
    <section aria-labelledby="presets-heading" className="mt-16 sm:mt-20">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)]">
        <div className="surface-card rounded-3xl border p-5 sm:p-6">
          <span className="grid size-11 place-items-center rounded-2xl border border-teal-300/20 bg-teal-300/10 text-teal-300">
            <BookmarkPlus aria-hidden="true" size={21} />
          </span>
          <h2 id="presets-heading" className="mt-6 text-2xl font-semibold tracking-[-0.025em]">
            Save this atmosphere
          </h2>
          <p className="copy-secondary mt-2 text-sm leading-6">
            Keep the active sounds and their current volumes for next time.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <label htmlFor="preset-name" className="copy-primary text-sm font-medium">
              Preset name
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <input
                id="preset-name"
                type="text"
                value={presetName}
                maxLength={40}
                autoComplete="off"
                placeholder="Quiet morning"
                onChange={(event) => setPresetName(event.target.value)}
                className="text-field min-h-11 min-w-0 flex-1 rounded-xl border px-4 text-base outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-300/15"
              />
              <button
                type="submit"
                disabled={!presetName.trim()}
                className="min-h-11 rounded-xl bg-teal-300 px-5 text-sm font-semibold text-[#09201e] transition hover:bg-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save mix
              </button>
            </div>
          </form>
        </div>

        <div className="surface-card rounded-3xl border p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="copy-muted text-sm font-medium uppercase tracking-[0.18em]">
                Your collection
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">Presets</h3>
            </div>
            <span className="copy-muted text-sm tabular-nums">{presets.length}</span>
          </div>

          {presets.length === 0 ? (
            <div className="empty-state copy-muted mt-6 rounded-2xl border border-dashed px-5 py-8 text-center text-sm">
              Save your current mix to create a preset.
            </div>
          ) : (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {presets.map((preset) => {
                const activeCount = Object.values(preset.sounds).filter(
                  (sound) => sound.isActive,
                ).length

                return (
                  <li
                    key={preset.id}
                    className="preset-row flex min-w-0 items-center gap-3 rounded-2xl border p-3.5"
                  >
                    <span className="surface-soft copy-secondary grid size-10 shrink-0 place-items-center rounded-xl">
                      {preset.isDefault ? (
                        <Sparkles aria-hidden="true" size={18} />
                      ) : (
                        <FolderOpen aria-hidden="true" size={18} />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="copy-primary truncate text-sm font-semibold">{preset.name}</p>
                      <p className="copy-muted mt-0.5 text-xs">
                        {activeCount} {activeCount === 1 ? 'sound' : 'sounds'}
                        {preset.isDefault ? ' · Built in' : ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onLoad(preset)}
                      className="secondary-control min-h-10 rounded-xl border px-3 text-sm font-medium transition hover:text-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                    >
                      Load
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${preset.name} preset`}
                      onClick={() => onDelete(preset.id)}
                      className="danger-icon grid size-10 shrink-0 place-items-center rounded-xl transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                    >
                      <Trash2 aria-hidden="true" size={17} />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default PresetPanel
