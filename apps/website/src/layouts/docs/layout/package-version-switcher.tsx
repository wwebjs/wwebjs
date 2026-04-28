'use client'

import { useState } from 'react'
import {
  IconDeviceFloppyFilled,
  IconFlask2Filled,
  IconPinFilled,
  IconTagFilled,
} from '@tabler/icons-react'
import { SidebarSwitcher, type SwitcherItem } from '@/layouts/shared/sidebar-switcher'

const PACKAGES: SwitcherItem[] = [
  {
    value: 'whatsapp-web.js',
    label: 'whatsapp-web.js',
    description: 'Main library',
    icon: IconDeviceFloppyFilled,
  },
  {
    value: '@wwebjs/formatters',
    label: '@wwebjs/formatters',
    description: 'Message formatter',
    icon: IconDeviceFloppyFilled,
  },
  {
    value: '@wwebjs/create-app',
    label: '@wwebjs/create-app',
    description: 'Project scaffolding',
    icon: IconDeviceFloppyFilled,
  },
]

const VERSIONS: SwitcherItem[] = [
  { value: 'main', label: 'main', icon: IconPinFilled },
  { value: '1.26.0', label: '1.26.0 (latest)', icon: IconTagFilled },
  { value: '1.25.0', label: '1.25.0', icon: IconTagFilled },
  { value: '1.26.0-alpha.1', label: '1.26.0-alpha.1', icon: IconFlask2Filled },
]

export function PackageVersionSwitcher() {
  const [pkg, setPkg] = useState(PACKAGES[0].value)
  const [version, setVersion] = useState(VERSIONS[1].value)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <p className="px-0.5 text-xs text-muted-foreground">Package</p>
        <SidebarSwitcher items={PACKAGES} value={pkg} onValueChange={setPkg} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="px-0.5 text-xs text-muted-foreground">Version</p>
        <SidebarSwitcher items={VERSIONS} value={version} onValueChange={setVersion} />
      </div>
    </div>
  )
}
