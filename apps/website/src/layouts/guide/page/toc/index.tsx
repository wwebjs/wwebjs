'use client'

import { useState, useEffect, useRef, useMemo, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { smoothScroll, useActiveItems } from './use-active-items'
import { TocThumb } from './toc-thumb'
import { getLineOffset } from '@/lib/toc-helpers'

function getItemOffset(depth: number): number {
  if (depth <= 2) return 14
  if (depth === 3) return 26
  return 36
}

// TODO: Refactor the whole component, its too chunky

export function GuideTableOfContents({
  toc,
  className,
}: {
  toc: { title?: ReactNode; url: string; depth: number }[]
  className?: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const itemIds = useMemo(() => toc.map(item => item.url.replace('#', '')), [toc])
  const activeIds = useActiveItems(itemIds)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const scroll = scrollRef.current
    if (!scroll) return
    const onScroll = () => setIsScrolled(scroll.scrollTop > 0)
    scroll.addEventListener('scroll', onScroll, { passive: true })
    return () => scroll.removeEventListener('scroll', onScroll)
  }, [])

  // Center active item in TOC scroll container
  useEffect(() => {
    const scroll = scrollRef.current
    const activeId = activeIds[0]
    if (!scroll || !activeId) return

    const el = scroll.querySelector<HTMLElement>(`a[href="#${activeId}"]`)
    if (!el) return

    const elTop = el.getBoundingClientRect().top - scroll.getBoundingClientRect().top
    const targetScrollTop = scroll.scrollTop + elTop + el.clientHeight / 2 - scroll.clientHeight / 2

    smoothScroll(scroll, Math.max(0, targetScrollTop), rafRef)
  }, [activeIds])

  const [svg, setSvg] = useState<{ path: string; width: number; height: number }>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function onResize() {
      if (!container || container.clientHeight === 0) return
      let w = 0,
        h = 0
      const d: string[] = []

      for (let i = 0; i < toc.length; i++) {
        const el = container.querySelector<HTMLElement>(`a[href="${toc[i].url}"]`)
        if (!el) continue

        const styles = getComputedStyle(el)
        const offset = getLineOffset(toc[i].depth) + 1
        const top = el.offsetTop + parseFloat(styles.paddingTop)
        const bottom = el.offsetTop + el.clientHeight - parseFloat(styles.paddingBottom)

        w = Math.max(offset, w)
        h = Math.max(h, bottom)

        d.push(`${i === 0 ? 'M' : 'L'}${offset} ${top}`)
        d.push(`L${offset} ${bottom}`)
      }

      setSvg({ path: d.join(' '), width: w + 1, height: h })
    }

    const observer = new ResizeObserver(onResize)
    onResize()
    observer.observe(container)
    return () => observer.disconnect()
  }, [toc])

  if (!toc.length) return null

  return (
    <div className={cn('h-full flex flex-col gap-2 text-sm', className)}>
      <p className="h-6 shrink-0 text-xs font-medium text-muted-foreground">On This Page</p>
      <div
        ref={scrollRef}
        className={cn(
          'flex-1 min-h-0 overflow-y-auto no-scrollbar',
          isScrolled
            ? '[mask-image:linear-gradient(to_bottom,transparent_0%,black_20px,black_calc(100%-40px),transparent_100%)]'
            : '[mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]'
        )}
      >
        <div className="relative">
          {svg && (
            <div
              className="absolute start-0 top-0"
              style={{
                width: svg.width,
                height: svg.height,
                maskImage: `url("data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="1" fill="none" /></svg>`
                )}")`,
              }}
            >
              <TocThumb containerRef={containerRef} activeIds={activeIds} />
            </div>
          )}
          <div ref={containerRef} className="flex flex-col">
            {toc.map((item, i) => {
              const upper = toc[i - 1]?.depth ?? item.depth
              const lower = toc[i + 1]?.depth ?? item.depth
              const offset = getLineOffset(item.depth)
              const upperOffset = getLineOffset(upper)
              const lowerOffset = getLineOffset(lower)
              const isActive = activeIds.includes(item.url.replace('#', ''))

              return (
                <a
                  key={item.url}
                  href={item.url}
                  style={{ paddingInlineStart: getItemOffset(item.depth) }}
                  className={cn(
                    'relative py-1.5 text-[0.8rem] font-medium no-underline transition-colors first:pt-0 last:pb-0',
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {offset !== upperOffset && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      className="absolute -top-1.5 start-0 size-4"
                    >
                      <line
                        x1={upperOffset}
                        y1="0"
                        x2={offset}
                        y2="12"
                        className="stroke-foreground/10"
                        strokeWidth="1"
                      />
                    </svg>
                  )}
                  <div
                    className={cn(
                      'absolute inset-y-0 w-px bg-foreground/10',
                      offset !== upperOffset && 'top-1.5',
                      offset !== lowerOffset && 'bottom-1.5'
                    )}
                    style={{ insetInlineStart: offset }}
                  />
                  {item.title}
                </a>
              )
            })}
          </div>
          <div className="h-10 shrink-0" />
        </div>
      </div>
    </div>
  )
}
