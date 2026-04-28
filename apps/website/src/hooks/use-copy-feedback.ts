'use client'

import { useCallback, useState } from 'react'

import { copyToClipboard } from '@/lib/copy-to-clipboard'

export function useCopyFeedback(duration = 2000) {
  const [hasCopied, setHasCopied] = useState(false)

  const trigger = useCallback(() => {
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), duration)
  }, [duration])

  const copy = useCallback(
    async (value: string) => {
      const copied = await copyToClipboard(value)
      if (copied) trigger()
    },
    [trigger]
  )

  return { hasCopied, copy, trigger }
}
