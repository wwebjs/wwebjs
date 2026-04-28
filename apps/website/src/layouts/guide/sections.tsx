import type { ComponentType } from 'react'
import { IconArchiveFilled, IconBookFilled, IconPaletteFilled } from '@tabler/icons-react'

export type GuideSection = {
  value: string
  base: string
  label: string
  displayName: string
  description: string
  icon: ComponentType<{ className?: string }>
}

export const GUIDE_SECTIONS = [
  {
    value: 'guide',
    base: '/guide',
    label: 'whatsapp-web.js',
    displayName: 'Guide',
    description: 'Latest Guide',
    icon: IconBookFilled,
  },
  {
    value: 'legacy',
    base: '/guide/legacy',
    label: 'whatsapp-web.js',
    displayName: 'Legacy',
    description: 'Legacy Guide',
    icon: IconArchiveFilled,
  },
  {
    value: 'formatters',
    base: '/guide/formatters',
    label: 'Formatters',
    displayName: 'Formatters',
    description: 'Message formatter',
    icon: IconPaletteFilled,
  },
] satisfies GuideSection[]

/** Returns `{ name, url }` for use as a breadcrumb root crumb. */
export function getSectionCrumb(value: string): { name: string; url: string } {
  const section = GUIDE_SECTIONS.find(s => s.value === value) ?? GUIDE_SECTIONS[0]
  return { name: section.displayName, url: section.base }
}

/** Returns the active section for a given pathname. Longer bases match first. */
export function getActiveSection(pathname: string): GuideSection {
  const sorted = [...GUIDE_SECTIONS].sort((a, b) => b.base.length - a.base.length)
  return (
    sorted.find(s => pathname === s.base || pathname.startsWith(s.base + '/')) ?? GUIDE_SECTIONS[0]
  )
}
