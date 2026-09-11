export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed'

export interface TimerState {
  selectedMinutes: number
  remainingSeconds: number
  status: TimerStatus
}

