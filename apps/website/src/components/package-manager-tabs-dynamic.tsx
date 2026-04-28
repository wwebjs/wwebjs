'use client'

import dynamic from 'next/dynamic'

export const PackageManagerTabs = dynamic(
  () => import('./package-manager-tabs').then(m => m.PackageManagerTabs),
  { ssr: false }
)
