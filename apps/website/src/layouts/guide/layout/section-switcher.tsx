'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { GUIDE_SECTIONS, getActiveSection } from '@/layouts/guide/sections'
import { SidebarSwitcher } from '@/layouts/shared/sidebar-switcher'

const SWITCHER_ITEMS = GUIDE_SECTIONS.map(s => ({
  value: s.value,
  label: s.label,
  description: s.description,
  icon: s.icon,
  href: s.base,
}))

export function DocsSwitcher() {
  const pathname = usePathname()
  const selected = useMemo(() => getActiveSection(pathname), [pathname])

  return <SidebarSwitcher items={SWITCHER_ITEMS} value={selected.value} />
}
