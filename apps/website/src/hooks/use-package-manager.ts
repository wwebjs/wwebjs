'use client'

import { useLocalStorage } from './use-local-storage'

export type PackageManager = 'npm' | 'yarn' | 'pnpm'

const STORAGE_KEY = 'preferred-package-manager'
const VALID: PackageManager[] = ['npm', 'yarn', 'pnpm']

export function usePackageManager() {
  const [raw, setRaw] = useLocalStorage<string>(STORAGE_KEY, 'pnpm')
  const packageManager: PackageManager = (
    VALID.includes(raw as PackageManager) ? raw : 'pnpm'
  ) as PackageManager

  return [packageManager, setRaw as (v: PackageManager) => void] as const
}
