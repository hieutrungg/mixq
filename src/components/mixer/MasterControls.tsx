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
      className="rounded-3xl border border-white/[0.08] bg-[#11161a] p-5 sm:p-6"
    >
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
            Session audio
          </p>
          <h2 id="master-controls-heading" className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
            Master controls
          </h2>
          <p className="mt-2 text-sm text-stone-400">
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
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-medium text-stone-300 transition hover:border-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Pause aria-hidden="true" size={16} fill="currentColor" />
            Pause all
          </button>
          <button
            type="button"
            disabled={activeCount === 0}
            onClick={onStopAll}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-medium text-stone-400 transition hover:border-red-300/30 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <CircleStop aria-hidden="true" size={16} />
            Stop all
          </button>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-3 border-t border-white/[0.07] pt-5">
        <Volume2 aria-hidden="true" className="shrink-0 text-stone-500" size={18} />
        <label htmlFor="master-volume" className="shrink-0 text-sm font-medium text-stone-300">
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
        <span className="w-10 text-right text-sm tabular-nums text-stone-500">
          {Math.round(masterVolume * 100)}%
        </span>
      </div>
    </section>
  )
}

export default MasterControls

