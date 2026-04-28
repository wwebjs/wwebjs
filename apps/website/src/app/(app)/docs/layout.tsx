import type { ReactNode } from 'react'
import { DocsShellLayout } from '@/layouts/docs'

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsShellLayout>{children}</DocsShellLayout>
}
