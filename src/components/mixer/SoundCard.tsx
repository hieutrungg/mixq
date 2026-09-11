import { Pause, Play, Volume2, type LucideIcon } from 'lucide-react'

type SoundCardProps = {
  name: string
  icon: LucideIcon
  iconClassName: string
  isActive: boolean
  volume: number
  onToggle: () => void
  onVolumeChange: (volume: number) => void
}

function SoundCard({
  name,
  icon: Icon,
  iconClassName,
  isActive,
  volume,
  onToggle,
  onVolumeChange,
}: SoundCardProps) {
  return (
    <article
      className={`group rounded-3xl border p-5 transition duration-200 sm:p-6 ${
        isActive
          ? 'border-teal-300/35 bg-[#141d1e] shadow-[0_18px_60px_-36px_rgba(94,234,212,0.55)]'
          : 'border-white/[0.08] bg-[#11161a] hover:border-white/15 hover:bg-[#13191d]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid size-12 place-items-center rounded-2xl border bg-black/15 ${
            isActive ? 'border-white/10' : 'border-white/[0.06]'
          }`}
        >
          <Icon aria-hidden="true" className={iconClassName} size={23} strokeWidth={1.8} />
        </span>

        <button
          type="button"
          aria-label={`${isActive ? 'Pause' : 'Play'} ${name}`}
          aria-pressed={isActive}
          onClick={onToggle}
          className={`grid size-11 place-items-center rounded-full transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300 ${
            isActive
              ? 'bg-teal-300 text-[#09201e] hover:bg-teal-200'
              : 'border border-white/10 bg-white/[0.04] text-stone-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white'
          }`}
        >
          {isActive ? (
            <Pause aria-hidden="true" size={18} fill="currentColor" />
          ) : (
            <Play aria-hidden="true" className="translate-x-px" size={18} fill="currentColor" />
          )}
        </button>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-stone-100">{name}</h3>
            <p className={`mt-1 text-sm ${isActive ? 'text-teal-300' : 'text-stone-500'}`}>
              {isActive ? 'Playing' : 'Paused'}
            </p>
          </div>
          <span className="text-sm tabular-nums text-stone-500">{volume}%</span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Volume2 aria-hidden="true" className="shrink-0 text-stone-500" size={17} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            aria-label={`${name} volume`}
            onChange={(event) => onVolumeChange(Number(event.target.value))}
            className="sound-volume w-full"
          />
        </div>
      </div>
    </article>
  )
}

export default SoundCard
