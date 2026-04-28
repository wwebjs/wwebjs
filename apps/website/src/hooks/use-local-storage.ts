'use client'

import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [stored, setStored] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = localStorage.getItem(key)
      return item !== null ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      const item = localStorage.getItem(key)
      if (item !== null) setStored(JSON.parse(item) as T)
    } catch {
      // ignore parse errors - keep initialValue
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return
      try {
        setStored(e.newValue !== null ? (JSON.parse(e.newValue) as T) : initialValue)
      } catch {
        // ignore parse errors
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const setValue = useCallback(
    (value: T) => {
      setStored(value)
      try {
        const serialized = JSON.stringify(value)
        localStorage.setItem(key, serialized)
        window.dispatchEvent(new StorageEvent('storage', { key, newValue: serialized }))
      } catch {
        // ignore write errors (private browsing, storage full)
      }
    },
    [key]
  )

  return [stored, setValue]
}
