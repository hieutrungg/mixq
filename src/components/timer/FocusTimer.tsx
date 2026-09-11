import { Pause, Play, RotateCcw, TimerReset } from 'lucide-react'

import { focusDurations, useTimer } from '../../hooks/useTimer'

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

function FocusTimer() {
  const { timerState, selectDuration, start, pause, reset } = useTimer()
  const isRunning = timerState.status === 'running'

  return (
    <section
      aria-labelledby="focus-timer-heading"
      className="rounded-3xl border border-white/[0.08] bg-[#11161a] p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
            Focus session
          </p>
          <h2 id="focus-timer-heading" className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
            Timer
          </h2>
        </div>
        <span className="grid size-11 place-items-center rounded-2xl border border-violet-300/20 bg-violet-300/10 text-violet-300">
          <TimerReset aria-hidden="true" size={21} />
        </span>
      </div>

      <p
        aria-live="off"
        aria-label={`${Math.floor(timerState.remainingSeconds / 60)} minutes ${timerState.remainingSeconds % 60} seconds remaining`}
        className="mt-6 text-5xl font-semibold tracking-[-0.045em] tabular-nums text-white"
      >
        {formatTime(timerState.remainingSeconds)}
      </p>
      <p className="mt-2 text-sm capitalize text-stone-500">
        {timerState.status === 'completed' ? 'Session complete' : timerState.status}
      </p>

      <div className="mt-6 flex gap-2" aria-label="Focus duration">
        {focusDurations.map((minutes) => (
          <button
            key={minutes}
            type="button"
            aria-pressed={timerState.selectedMinutes === minutes}
            onClick={() => selectDuration(minutes)}
            className={`min-h-10 flex-1 rounded-xl border px-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 ${
              timerState.selectedMinutes === minutes
                ? 'border-violet-300/40 bg-violet-300/10 text-violet-200'
                : 'border-white/[0.08] text-stone-500 hover:border-white/15 hover:text-stone-300'
            }`}
          >
            {minutes} min
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        {isRunning ? (
          <button
            type="button"
            onClick={pause}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-300 text-sm font-semibold text-[#1b102d] transition hover:bg-violet-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          >
            <Pause aria-hidden="true" size={16} fill="currentColor" />
            Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={start}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-300 text-sm font-semibold text-[#1b102d] transition hover:bg-violet-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          >
            <Play aria-hidden="true" size={16} fill="currentColor" />
            {timerState.status === 'paused' ? 'Resume' : 'Start'}
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 text-stone-400 transition hover:border-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          aria-label="Reset focus timer"
        >
          <RotateCcw aria-hidden="true" size={17} />
        </button>
      </div>
    </section>
  )
}

export default FocusTimer

