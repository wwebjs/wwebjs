'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface MacWindowGroupState {
  activeKey: string | null
  claim: (key: string) => boolean
  release: (key: string) => void
}

export const MacWindowGroupContext = createContext<MacWindowGroupState | null>(null)

export function useMacWindowGroup() {
  return useContext(MacWindowGroupContext)
}

export function MacWindowGroup({ children }: { children: ReactNode }) {
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const claim = (key: string) => {
    if (activeKey !== null) return false
    setActiveKey(key)
    return true
  }

  const release = (key: string) => {
    if (activeKey === key) setActiveKey(null)
  }

  return (
    <MacWindowGroupContext.Provider value={{ activeKey, claim, release }}>
      {children}
    </MacWindowGroupContext.Provider>
  )
}
