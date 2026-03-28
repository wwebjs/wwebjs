import * as React from 'react'

export function useInView(options?: IntersectionObserverInit) {
  const [inView, setInView] = React.useState(false)
  const observerRef = React.useRef<IntersectionObserver | null>(null)
  const optionsRef = React.useRef(options)

  function ref(el: HTMLDivElement | null) {
    observerRef.current?.disconnect()
    if (!el) return
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observerRef.current?.disconnect()
      }
    }, optionsRef.current)
    observerRef.current.observe(el)
  }

  return { ref, inView }
}
