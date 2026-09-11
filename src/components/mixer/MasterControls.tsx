import { CircleStop, Pause, Play, Volume2 } from 'lucide-react'

type MasterControlsProps = {
  activeCount: number
  playingCount: number
  masterVolume: number
  onPlayAll: () => void
  onPauseAll: () => void
  onStopAll: () => void
  onMasterVolumeChange: (volume: number) => void
}

function MasterControls({
  activeCount,
  playingCount,
  masterVolume,
  onPlayAll,
  onPauseAll,
  onStopAll,
  onMasterVolumeChange,
}: MasterControlsProps) {
  return (
    <section
      aria-labelledby="master-controls-heading"
      className="surface-card rounded-3xl border p-5 sm:p-6"
    >
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="copy-muted text-sm font-medium uppercase tracking-[0.18em]">
            Session audio
          </p>
          <h2 id="master-controls-heading" className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
            Master controls
          </h2>
          <p className="copy-secondary mt-2 text-sm">
            {playingCount > 0
              ? `${playingCount} ${playingCount === 1 ? 'sound' : 'sounds'} playing`
              : activeCount > 0
                ? `${activeCount} ${activeCount === 1 ? 'sound' : 'sounds'} paused`
                : 'Choose a sound to begin'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={activeCount === 0 || playingCount === activeCount}
            onClick={onPlayAll}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-teal-300 px-4 text-sm font-semibold text-[#09201e] transition hover:bg-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Play aria-hidden="true" size={16} fill="currentColor" />
            Play active
          </button>
          <button
            type="button"
            disabled={playingCount === 0}
            onClick={onPauseAll}
            className="secondary-control inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Pause aria-hidden="true" size={16} fill="currentColor" />
            Pause all
          </button>
          <button
            type="button"
            disabled={activeCount === 0}
            onClick={onStopAll}
            className="secondary-control danger-control inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <CircleStop aria-hidden="true" size={16} />
            Stop all
          </button>
        </div>
      </div>

      <div className="theme-divider mt-7 flex items-center gap-3 border-t pt-5">
        <Volume2 aria-hidden="true" className="copy-muted shrink-0" size={18} />
        <label htmlFor="master-volume" className="copy-primary shrink-0 text-sm font-medium">
          Master volume
        </label>
        <input
          id="master-volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={masterVolume}
          onChange={(event) => onMasterVolumeChange(event.target.valueAsNumber)}
          className="sound-volume min-w-20 flex-1"
        />
        <span className="copy-muted w-10 text-right text-sm tabular-nums">
          {Math.round(masterVolume * 100)}%
        </span>
      </div>
    </section>
  )
}

export default MasterControls
