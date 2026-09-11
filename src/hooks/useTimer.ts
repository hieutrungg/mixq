import { useCallback, useEffect, useRef, useState } from 'react'

import type { TimerState } from '../types/timer'

export const focusDurations = [25, 45, 60] as const

export function useTimer(initialMinutes = focusDurations[0]) {
  const [timerState, setTimerState] = useState<TimerState>({
    selectedMinutes: initialMinutes,
    remainingSeconds: initialMinutes * 60,
    status: 'idle',
  })
  const deadlineRef = useRef<number | null>(null)

  const tick = useCallback(() => {
    if (deadlineRef.current === null) return

    const remainingSeconds = Math.max(
      0,
      Math.ceil((deadlineRef.current - Date.now()) / 1_000),
    )

    setTimerState((currentState) => {
      if (remainingSeconds === currentState.remainingSeconds) return currentState

      return {
        ...currentState,
        remainingSeconds,
        status: remainingSeconds === 0 ? 'completed' : 'running',
      }
    })

    if (remainingSeconds === 0) deadlineRef.current = null
  }, [])

  useEffect(() => {
    if (timerState.status !== 'running') return

    tick()
    const intervalId = window.setInterval(tick, 250)
    return () => window.clearInterval(intervalId)
  }, [tick, timerState.status])

  const selectDuration = useCallback((minutes: number) => {
    deadlineRef.current = null
    setTimerState({
      selectedMinutes: minutes,
      remainingSeconds: minutes * 60,
      status: 'idle',
    })
  }, [])

  const start = useCallback(() => {
    setTimerState((currentState) => {
      const remainingSeconds =
        currentState.remainingSeconds > 0
          ? currentState.remainingSeconds
          : currentState.selectedMinutes * 60

      deadlineRef.current = Date.now() + remainingSeconds * 1_000
      return { ...currentState, remainingSeconds, status: 'running' }
    })
  }, [])

  const pause = useCallback(() => {
    setTimerState((currentState) => {
      if (currentState.status !== 'running' || deadlineRef.current === null) {
        return currentState
      }

      const remainingSeconds = Math.max(
        0,
        Math.ceil((deadlineRef.current - Date.now()) / 1_000),
      )
      deadlineRef.current = null

      return {
        ...currentState,
        remainingSeconds,
        status: remainingSeconds === 0 ? 'completed' : 'paused',
      }
    })
  }, [])

  const reset = useCallback(() => {
    deadlineRef.current = null
    setTimerState((currentState) => ({
      ...currentState,
      remainingSeconds: currentState.selectedMinutes * 60,
      status: 'idle',
    }))
  }, [])

  return { timerState, selectDuration, start, pause, reset }
}

