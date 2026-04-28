import { highlightCode } from '@/lib/highlight-code'
import { getFileBadgeLabel } from '@/lib/code-helpers'

import { CodeBlockHeader } from './block-header'

type Props = {
  code: string
  language?: string
  filename?: string
  className?: string
}

export async function CodeBlock({ code, language, filename, className }: Props) {
  const highlighted = await highlightCode(code, language ?? 'tsx')
  const label = filename ?? language
  const badgeLabel = label ? getFileBadgeLabel(label) : null

  return (
    <figure data-rehype-pretty-code-figure="" className={className}>
      {label && badgeLabel && (
        <figcaption data-rehype-pretty-code-title="" className="border-0 p-0">
          <CodeBlockHeader
            icon={
              <span className="font-mono text-[9px] font-bold leading-none text-code">
                {badgeLabel}
              </span>
            }
            copyValue={code}
          >
            <span>{label}</span>
          </CodeBlockHeader>
        </figcaption>
      )}
      {/* HTML is Shiki output - sanitized at highlight time, not user input */}
      <div dangerouslySetInnerHTML={{ __html: highlighted }} />
    </figure>
  )
}
