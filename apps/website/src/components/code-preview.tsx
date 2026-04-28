import type { ReactNode } from 'react'

import { highlightCode } from '@/lib/highlight-code'
import { cn } from '@/lib/utils'

import { CodePreviewClient } from './code-preview-client'

type Props = {
  preview: ReactNode
  code: string
  language?: string
  align?: 'center' | 'start' | 'end'
  className?: string
}

export async function CodePreview({ preview, code, language, align, className }: Props) {
  const highlighted = await highlightCode(code, language ?? 'tsx')
  return (
    <CodePreviewClient
      preview={preview}
      highlightedCode={highlighted}
      rawCode={code}
      align={align}
      className={className}
    />
  )
}
