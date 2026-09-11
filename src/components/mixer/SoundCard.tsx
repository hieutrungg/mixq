import { LoaderCircle, Pause, Play, Volume2, type LucideIcon } from 'lucide-react'

type SoundCardProps = {
  name: string
  icon: LucideIcon
  iconClassName: string
  isActive: boolean
  isPlaying: boolean
  isLoaded: boolean
  volume: number
  error: string | null
  onToggle: () => void
  onVolumeChange: (volume: number) => void
}

function SoundCard({
  name,
  icon: Icon,
  iconClassName,
  isActive,
  isPlaying,
  isLoaded,
  volume,
  error,
  onToggle,
  onVolumeChange,
}: SoundCardProps) {
  return (
    <article
      data-active={isActive}
      data-playing={isPlaying}
      aria-busy={!isLoaded}
      className="sound-card group rounded-3xl border p-5 transition duration-200 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className="sound-icon-tile grid size-12 place-items-center rounded-2xl border"
        >
          <Icon aria-hidden="true" className={`sound-icon ${iconClassName}`} size={23} strokeWidth={1.8} />
        </span>

        <button
          type="button"
          aria-label={`${isPlaying ? 'Pause' : 'Play'} ${name}`}
          aria-pressed={isActive}
          disabled={!isLoaded || Boolean(error)}
          onClick={onToggle}
          className={`grid size-11 place-items-center rounded-full transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300 ${
            isPlaying
              ? 'bg-teal-300 text-[#09201e] hover:bg-teal-200'
              : 'secondary-control border disabled:cursor-not-allowed disabled:opacity-40'
          }`}
        >
          {!isLoaded && !error ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
          ) : isPlaying ? (
            <Pause aria-hidden="true" size={18} fill="currentColor" />
          ) : (
            <Play aria-hidden="true" className="translate-x-px" size={18} fill="currentColor" />
          )}
        </button>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="copy-primary text-lg font-semibold tracking-[-0.02em]">{name}</h3>
            <p
              role={error ? 'alert' : undefined}
              className={`mt-1 text-sm ${isPlaying ? 'accent-text' : 'copy-muted'}`}
            >
              {error
                ? 'Unavailable'
                : !isLoaded
                  ? 'Loading…'
                  : isPlaying
                    ? 'Playing'
                    : isActive
                      ? 'Paused'
                      : 'Ready'}
            </p>
          </div>
          <span className="copy-muted text-sm tabular-nums">{Math.round(volume * 100)}%</span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Volume2 aria-hidden="true" className="copy-muted shrink-0" size={17} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            aria-label={`${name} volume`}
            onChange={(event) => onVolumeChange(event.target.valueAsNumber)}
            className="sound-volume w-full"
          />
        </div>
      </div>
    </article>
  )
}

export default SoundCard
