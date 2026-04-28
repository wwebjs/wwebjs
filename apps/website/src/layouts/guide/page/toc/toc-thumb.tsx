'use client'

import { useEffect, useRef, type RefObject } from 'react'

import { getLineOffset } from '@/lib/toc-helpers'

export function TocThumb({
  containerRef,
  activeIds,
}: {
  containerRef: RefObject<HTMLDivElement | null>
  activeIds: string[]
}) {
  const thumbRef = useRef<HTMLDivElement>(null)

  function update() {
    const container = containerRef.current
    const thumb = thumbRef.current
    if (!container || !thumb) return

    if (activeIds.length === 0) {
      thumb.style.setProperty('--toc-height', '0px')
      return
    }

    let upper = Number.MAX_VALUE
    let lower = 0
    let firstEl: HTMLElement | null = null

    for (const id of activeIds) {
      const el = container.querySelector<HTMLElement>(`a[href="#${id}"]`)
      if (!el) continue
      if (!firstEl) firstEl = el

      const styles = getComputedStyle(el)
      upper = Math.min(upper, el.offsetTop + parseFloat(styles.paddingTop))
      lower = Math.max(lower, el.offsetTop + el.clientHeight - parseFloat(styles.paddingBottom))
    }

    if (!firstEl || upper === Number.MAX_VALUE) return

    thumb.style.setProperty('--toc-top', `${upper}px`)
    thumb.style.setProperty('--toc-height', `${lower - upper}px`)
  }

  useEffect(() => {
    update()
    // `update` is stable within this closure scope - adding it would require useCallback and re-create on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIds])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new ResizeObserver(update)
    observer.observe(container)
    return () => observer.disconnect()
    // `update` is stable within this closure scope - same reason as above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef])

  return (
    <div
      ref={thumbRef}
      className="absolute w-full bg-foreground transition-[top,height] [top:var(--toc-top,0px)] [height:var(--toc-height,0px)]"
    />
  )
}
