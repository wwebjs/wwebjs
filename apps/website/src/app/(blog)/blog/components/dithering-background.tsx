'use client'

import { Dithering } from '@paper-design/shaders-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

function DitheringBackgroundInner() {
  const { resolvedTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="size-full overflow-hidden">
      {isVisible && (
        <Dithering
          colorBack={resolvedTheme === 'dark' ? '#0a0a0a' : '#fafafa'}
          colorFront={resolvedTheme === 'dark' ? '#e8e8e8' : '#1a1a1a'}
          shape="warp"
          type="4x4"
          speed={0.15}
          className="size-full"
          minPixelRatio={1}
        />
      )}
    </div>
  )
}

export const DitheringBackground = dynamic(() => Promise.resolve(DitheringBackgroundInner), {
  ssr: false,
  loading: () => <div className="size-full bg-muted/20 animate-pulse" />,
})
