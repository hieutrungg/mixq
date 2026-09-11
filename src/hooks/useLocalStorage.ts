import { useCallback, useState, type SetStateAction } from 'react'

function readValue<T>(key: string, initialValue: T): T {
  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue === null ? initialValue : (JSON.parse(storedValue) as T)
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setStoredValue] = useState<T>(() => readValue(key, initialValue))

  const setValue = useCallback(
    (nextValue: SetStateAction<T>) => {
      setStoredValue((currentValue) => {
        const resolvedValue =
          typeof nextValue === 'function'
            ? (nextValue as (previousValue: T) => T)(currentValue)
            : nextValue

        try {
          window.localStorage.setItem(key, JSON.stringify(resolvedValue))
        } catch {
          // The UI still works in memory when storage is unavailable or full.
        }

        return resolvedValue
      })
    },
    [key],
  )

  return [value, setValue] as const
}

